'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { UserRole, CourseStatus, CourseAccess, LessonType, LessonAccess, Course } from '@/lib/database.types'
import { PAID_COURSE_PRODUCTS } from '@/lib/course-products'

// Generates a human-readable code: ITUWA-XXXX-XXXX (uppercase, no ambiguous chars)
function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `ITUWA-${seg(4)}-${seg(4)}`
}

async function assertSuperAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized: Authentication required.')
  }

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const profile = rawProfile as { role: UserRole } | null

  if (profile?.role !== 'admin') {
    throw new Error('Forbidden: Administrator privileges required.')
  }

  return user
}

export interface CreateCoursePayload {
  title: string
  slug?: string
  description?: string
  academy: string
  status?: CourseStatus
  access?: CourseAccess
  moduleTitle?: string
  firstLessonTitle?: string
  firstLessonSlug?: string
  lessonType?: LessonType
  youtubeVideoId?: string
  lessonBody?: string
  takeaway?: string
}

export type CreateCourseResult =
  | { success: true; course: Course }
  | { success: false; error: string }

export async function createCourseAction(payload: CreateCoursePayload): Promise<CreateCourseResult> {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  // Generate clean slug from title if not explicitly provided
  const courseSlug =
    payload.slug?.trim() ||
    payload.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  // 1. Insert Course
  const { data: newCourse, error: courseError } = await adminClient
    .from('courses')
    .insert({
      title: payload.title.trim(),
      slug: courseSlug,
      description: payload.description?.trim() || null,
      academy: payload.academy,
      status: payload.status || 'published',
      access: payload.access || 'free',
      thumbnail_url: null,
    })
    .select()
    .single()

  if (courseError || !newCourse) {
    return { success: false, error: courseError?.message || 'Failed to create course' }
  }

  // 2. If module details provided, create starter module
  if (payload.moduleTitle?.trim()) {
    const { data: newModule, error: moduleError } = await adminClient
      .from('modules')
      .insert({
        course_id: newCourse.id,
        title: payload.moduleTitle.trim(),
        position: 1,
      })
      .select()
      .single()

    // 3. If first lesson provided, create starter lesson
    if (!moduleError && newModule && payload.firstLessonTitle?.trim()) {
      const lessonSlug =
        payload.firstLessonSlug?.trim() ||
        payload.firstLessonTitle
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')

      await adminClient.from('lessons').insert({
        course_id: newCourse.id,
        module_id: newModule.id,
        slug: lessonSlug,
        title: payload.firstLessonTitle.trim(),
        position: 1,
        lesson_type: payload.lessonType || 'text',
        access_level: (payload.access as LessonAccess) || 'free',
        youtube_video_id: payload.youtubeVideoId?.trim() || null,
        video_duration: payload.youtubeVideoId ? '12:00' : null,
        body: payload.lessonBody?.trim() || 'Practical lesson guide and core framework.',
        takeaway: payload.takeaway?.trim() || 'Ship one concrete output for your portfolio.',
        read_time_min: 5,
        status: payload.status || 'published',
      })
    }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  revalidatePath(`/courses/${courseSlug}`)

  return { success: true, course: newCourse as Course }
}

export async function updateUserRoleAction(targetUserId: string, newRole: UserRole) {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  const { error } = await adminClient
    .from('profiles')
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq('id', targetUserId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateCourseStatusAction(courseId: string, newStatus: CourseStatus) {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  const { error } = await adminClient
    .from('courses')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', courseId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  return { success: true }
}

export async function grantPaidCourseEnrollmentAction(input: {
  email: unknown
  courseSlug: unknown
}) {
  const adminUser = await assertSuperAdmin()

  if (typeof input.email !== 'string' || typeof input.courseSlug !== 'string') {
    return { success: false, error: 'Enter a learner email and select a paid course.' }
  }

  const email = input.email.trim().toLowerCase()
  const courseProduct = PAID_COURSE_PRODUCTS.find(
    (course) => course.slug === input.courseSlug
  )

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !courseProduct) {
    return { success: false, error: 'Enter a valid learner email and select a paid course.' }
  }

  const adminClient: any = await createAdminClient()
  const { data: profile, error: profileError } = await adminClient
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (profileError) {
    console.error('Unable to find a learner for manual course enrollment:', profileError)
    return { success: false, error: 'Unable to find that learner account.' }
  }
  if (!profile) {
    return { success: false, error: 'No learner account matches that email.' }
  }

  const { data: course, error: courseError } = await adminClient
    .from('courses')
    .select('id, access')
    .eq('slug', courseProduct.databaseSlug)
    .maybeSingle()

  if (courseError) {
    console.error('Unable to load a course for manual enrollment:', courseError)
    return { success: false, error: 'Unable to load the selected course.' }
  }
  if (!course || course.access !== 'paid') {
    return { success: false, error: 'The selected course is not configured as paid.' }
  }

  const { data: existingEnrollment, error: enrollmentCheckError } = await adminClient
    .from('enrollments')
    .select('id, payment_verified_at')
    .eq('user_id', profile.id)
    .eq('course_id', course.id)
    .maybeSingle()

  if (enrollmentCheckError) {
    console.error('Unable to check an existing course enrollment:', enrollmentCheckError)
    return { success: false, error: 'Unable to verify the learner enrollment.' }
  }
  if (existingEnrollment) {
    if (existingEnrollment.payment_verified_at) {
      return { success: true, alreadyEnrolled: true }
    }

    const { error: verificationError } = await adminClient
      .from('enrollments')
      .update({
        payment_verified_at: new Date().toISOString(),
        payment_verified_by: adminUser.id,
      })
      .eq('id', existingEnrollment.id)

    if (verificationError) {
      console.error('Unable to record manual payment verification:', verificationError)
      return { success: false, error: 'Unable to record payment verification.' }
    }

    revalidatePath('/admin')
    revalidatePath('/admin/courses')
    revalidatePath('/dashboard')
    return { success: true, alreadyEnrolled: true }
  }

  const { error: insertError } = await adminClient.from('enrollments').insert({
    user_id: profile.id,
    course_id: course.id,
    payment_verified_at: new Date().toISOString(),
    payment_verified_by: adminUser.id,
  })

  if (insertError) {
    console.error('Unable to grant a manually verified course enrollment:', insertError)
    return { success: false, error: 'Unable to record the enrollment.' }
  }

  // Generate a one-time access code the admin can send to the learner
  const code = generateAccessCode()
  const { error: codeError } = await adminClient.from('access_codes').insert({
    code,
    course_id: course.id,
    user_id: profile.id,
    created_by: adminUser.id,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  })

  if (codeError) {
    console.error('Enrollment granted but access code generation failed:', codeError)
    // Enrollment already written : don't fail the whole action
  }

  revalidatePath('/admin')
  revalidatePath('/admin/courses')
  revalidatePath('/dashboard')
  return { success: true, alreadyEnrolled: false, accessCode: codeError ? null : code }
}

export async function redeemAccessCodeAction(input: { code: unknown; courseSlug: unknown }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Sign in to redeem an access code.' }

  if (typeof input.code !== 'string' || typeof input.courseSlug !== 'string') {
    return { success: false, error: 'Invalid code format.' }
  }

  const code = input.code.trim().toUpperCase()
  if (!/^ITUWA-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return { success: false, error: "That code doesn't look right. Check the format and try again." }
  }

  const adminClient: any = await createAdminClient()

  const { data: accessCode, error: lookupError } = await adminClient
    .from('access_codes')
    .select('id, course_id, user_id, redeemed_at, expires_at')
    .eq('code', code)
    .maybeSingle()

  if (lookupError) {
    console.error('Access code lookup failed:', lookupError)
    return { success: false, error: 'Unable to verify that code right now. Try again shortly.' }
  }
  if (!accessCode) {
    return { success: false, error: 'Code not found. Double-check and try again.' }
  }
  if (accessCode.user_id !== user.id) {
    return { success: false, error: 'This code was issued to a different account.' }
  }
  if (accessCode.redeemed_at) {
    return { success: false, error: 'This code has already been used.' }
  }
  if (new Date(accessCode.expires_at) < new Date()) {
    return { success: false, error: 'This code has expired. Contact support.' }
  }

  // Mark redeemed
  const { error: redeemError } = await adminClient
    .from('access_codes')
    .update({ redeemed_at: new Date().toISOString() })
    .eq('id', accessCode.id)

  if (redeemError) {
    console.error('Failed to mark access code as redeemed:', redeemError)
    return { success: false, error: 'Unable to redeem that code. Try again.' }
  }

  // Upsert enrollment with payment verified
  const { error: enrollError } = await adminClient
    .from('enrollments')
    .upsert(
      {
        user_id: user.id,
        course_id: accessCode.course_id,
        payment_verified_at: new Date().toISOString(),
        payment_verified_by: adminClient.id,
      },
      { onConflict: 'user_id,course_id' }
    )

  if (enrollError) {
    console.error('Access code redeemed but enrollment upsert failed:', enrollError)
    return { success: false, error: 'Code accepted but enrollment failed. Contact support.' }
  }

  revalidatePath('/courses')
  revalidatePath('/dashboard')
  return { success: true }
}

export interface AdminLessonData {
  id: string
  course_id: string
  module_id: string | null
  slug: string
  title: string
  position: number
  lesson_type: LessonType
  access_level: LessonAccess
  status: CourseStatus
  youtube_video_id: string | null
  video_duration: string | null
  body: string | null
  takeaway: string | null
  read_time_min: number | null
}

export async function getCourseLessonsAction(courseId: string) {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  const { data: lessons, error } = await adminClient
    .from('lessons')
    .select('id, course_id, module_id, slug, title, position, lesson_type, access_level, status, youtube_video_id, video_duration, body, takeaway, read_time_min')
    .eq('course_id', courseId)
    .order('position', { ascending: true })

  if (error) {
    console.error('Failed to load lessons for admin course:', error)
    return { success: false, error: error.message, lessons: [] }
  }

  return { success: true, lessons: (lessons ?? []) as AdminLessonData[] }
}

export interface UpdateLessonPayload {
  lessonId: string
  courseId: string
  courseSlug: string
  lessonSlug: string
  title: string
  body: string
  takeaway?: string
  youtubeVideoId?: string
  accessLevel?: LessonAccess
  status?: CourseStatus
  readTimeMin?: number
}

export async function updateLessonContentAction(payload: UpdateLessonPayload) {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  // Clean payload and ensure no em dashes are saved
  const cleanBody = (payload.body || '').replace(/—/g, ':').trim()
  const cleanTakeaway = (payload.takeaway || '').replace(/—/g, ':').trim()
  const cleanTitle = (payload.title || '').replace(/—/g, ':').trim()

  const updateFields: Record<string, any> = {
    title: cleanTitle,
    body: cleanBody,
    takeaway: cleanTakeaway || null,
    updated_at: new Date().toISOString(),
  }

  if (payload.youtubeVideoId !== undefined) {
    updateFields.youtube_video_id = payload.youtubeVideoId.trim() || null
  }
  if (payload.accessLevel) {
    updateFields.access_level = payload.accessLevel
  }
  if (payload.status) {
    updateFields.status = payload.status
  }
  if (payload.readTimeMin) {
    updateFields.read_time_min = payload.readTimeMin
  }

  const { error } = await adminClient
    .from('lessons')
    .update(updateFields)
    .eq('id', payload.lessonId)
    .eq('course_id', payload.courseId)

  if (error) {
    console.error('Failed to update lesson content:', error)
    return { success: false, error: error.message }
  }

  // Revalidate lesson and course paths
  revalidatePath(`/learn/${payload.courseSlug}/${payload.lessonSlug}`)
  revalidatePath(`/courses/${payload.courseSlug}`)
  revalidatePath('/admin/courses')
  revalidatePath('/admin')

  return { success: true }
}

export interface BulkLessonUpdateItem {
  slug?: string
  position?: number
  title?: string
  body?: string
  takeaway?: string
  youtubeVideoId?: string
  accessLevel?: LessonAccess
  readTimeMin?: number
}

export async function bulkUpsertCourseLessonsAction(
  courseId: string,
  courseSlug: string,
  items: BulkLessonUpdateItem[]
) {
  await assertSuperAdmin()
  const adminClient: any = await createAdminClient()

  if (!items || items.length === 0) {
    return { success: false, error: 'No lesson data provided for bulk update.' }
  }

  // Get current lessons for course to match by slug or position
  const { data: existingLessons, error: fetchErr } = await adminClient
    .from('lessons')
    .select('id, slug, position, course_id, module_id')
    .eq('course_id', courseId)

  if (fetchErr) {
    return { success: false, error: `Failed to fetch existing lessons: ${fetchErr.message}` }
  }

  const existingMapBySlug = new Map<string, any>()
  const existingMapByPos = new Map<number, any>()
  for (const l of existingLessons || []) {
    if (l.slug) existingMapBySlug.set(l.slug.toLowerCase().trim(), l)
    if (l.position) existingMapByPos.set(l.position, l)
  }

  let updatedCount = 0
  const errors: string[] = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const pos = item.position || (i + 1)
    const slug = (item.slug || `lesson-${pos}`).toLowerCase().trim()

    // Find existing lesson
    const existing = existingMapBySlug.get(slug) || existingMapByPos.get(pos)

    if (!existing) {
      errors.push(`Lesson not found for slug "${slug}" or position ${pos}.`)
      continue
    }

    const cleanTitle = item.title ? item.title.replace(/—/g, ':').trim() : undefined
    const cleanBody = item.body ? item.body.replace(/—/g, ':').trim() : undefined
    const cleanTakeaway = item.takeaway ? item.takeaway.replace(/—/g, ':').trim() : undefined

    const updateFields: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (cleanTitle) updateFields.title = cleanTitle
    if (cleanBody) updateFields.body = cleanBody
    if (cleanTakeaway !== undefined) updateFields.takeaway = cleanTakeaway || null
    if (item.youtubeVideoId !== undefined) updateFields.youtube_video_id = item.youtubeVideoId.trim() || null
    if (item.accessLevel) updateFields.access_level = item.accessLevel
    if (item.readTimeMin) updateFields.read_time_min = Number(item.readTimeMin)

    const { error: updateErr } = await adminClient
      .from('lessons')
      .update(updateFields)
      .eq('id', existing.id)
      .eq('course_id', courseId)

    if (updateErr) {
      errors.push(`Error updating ${slug}: ${updateErr.message}`)
    } else {
      updatedCount++
    }
  }

  revalidatePath(`/courses/${courseSlug}`)
  revalidatePath('/admin/courses')
  revalidatePath('/admin')

  return {
    success: updatedCount > 0,
    updatedCount,
    totalAttempted: items.length,
    errors: errors.length > 0 ? errors : undefined,
  }
}


