'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { UserRole, CourseStatus, CourseAccess, LessonType, LessonAccess, Course } from '@/lib/database.types'

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

  if (profile?.role !== 'admin' && user.email !== 'gigsdev007@gmail.com') {
    throw new Error('Forbidden: Super Administrator privileges required.')
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
