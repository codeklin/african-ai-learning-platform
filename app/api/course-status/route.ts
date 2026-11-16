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
  const { data: courses, error } = await supabase
    .from('courses')
    .select('slug, status')
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

  return NextResponse.json(courseStatuses, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
