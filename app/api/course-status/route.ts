import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PAID_COURSE_PRODUCTS } from '@/lib/course-products'

export const dynamic = 'force-dynamic'

function isPublishedCourse(value: unknown): value is { slug: string; status: 'published' } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'status' in value &&
    value.status === 'published'
  )
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, slug, status')
    .in('slug', PAID_COURSE_PRODUCTS.map((course) => course.databaseSlug))

  if (error) {
    console.error('Unable to load public course statuses:', error)
    return NextResponse.json(
      { error: 'Course availability could not be refreshed.' },
      { status: 503 }
    )
  }

  const courseRows: unknown[] = courses ?? []
  const publishedCourseSlugs = new Set(
    courseRows.filter(isPublishedCourse).map((course) => course.slug)
  )
  const courseStatuses = Object.fromEntries(
    PAID_COURSE_PRODUCTS.map((product) => {
      return [
        product.slug,
        publishedCourseSlugs.has(product.databaseSlug) ? 'published' : 'in-development',
      ]
    })
  )

  const courseIdsBySlug = new Map(
    courseRows
      .filter(
        (course): course is { id: string; slug: string; status: string } =>
          typeof course === 'object' &&
          course !== null &&
          'id' in course &&
          typeof course.id === 'string' &&
          'slug' in course &&
          typeof course.slug === 'string' &&
          'status' in course &&
          typeof course.status === 'string'
      )
      .map((course) => [course.slug, course.id])
  )

  let enrolledCourseSlugs: string[] = []
  if (user) {
    const { data: enrollments, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id)
      .not('payment_verified_at', 'is', null)

    if (enrollmentError) {
      console.error('Unable to load learner course access:', enrollmentError)
      return NextResponse.json(
        { error: 'Course access could not be refreshed.' },
        { status: 503 }
      )
    }

    const enrolledCourseIds = new Set((enrollments ?? []).map((enrollment) => enrollment.course_id))
    enrolledCourseSlugs = [...courseIdsBySlug]
      .filter(([, courseId]) => enrolledCourseIds.has(courseId))
      .map(([slug]) => {
        return PAID_COURSE_PRODUCTS.find((product) => product.databaseSlug === slug)?.slug ?? slug
      })
  }

  return NextResponse.json({ courseStatuses, enrolledCourseSlugs }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
