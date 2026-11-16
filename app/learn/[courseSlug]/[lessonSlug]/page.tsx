import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Clock3, Lock, Play } from 'lucide-react'
import { createAdminClient, createClient } from '@/lib/supabase/server'
import Brand from '@/components/brand'
import YouTubeEmbed from '@/components/youtube-embed'
import LessonPreview from '@/components/lesson-preview'
import type { Course, Enrollment, Lesson } from '@/lib/database.types'
import { getCourseProduct } from '@/lib/course-products'

// Static course slugs that are served from the legacy LessonPreview component
// (until their lessons are seeded into the database)
const LEGACY_COURSES = [
  'ai-toolkit-practical-start',
  'prompting-better-work',
  'build-a-helpful-ai-app',
  'youtube-business-fundamentals',
  'starting-a-faceless-youtube-channel',
  'youtube-automation-monetization-masterclass',
  'ai-powered-youtube-content-production',
  'youtube-shorts-growth-strategy',
  'youtube-seo-and-analytics',
  'youtube-monetization-policies-and-copyright',
  'building-a-creator-business-beyond-ad-revenue',
]

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>
}) {
  const { courseSlug, lessonSlug } = await params

  // ── Authentication check ──────────────────────────────────────
  // Video content and lesson progress require a registered account.
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Preserve the destination so we can redirect back after login
    redirect(`/login?next=/learn/${courseSlug}/${lessonSlug}`)
  }

  // ── Validate slug format ──────────────────────────────────────
  if (!/^lesson-\d+$/.test(lessonSlug)) notFound()

  const product = getCourseProduct(courseSlug)
  const databaseSlug = product?.databaseSlug ?? courseSlug
  let accessibleCourse = (await supabase
    .from('courses')
    .select('id, title, status, access')
    .eq('slug', databaseSlug)
    .maybeSingle()).data as Pick<Course, 'id' | 'title' | 'status' | 'access'> | null

  if (!accessibleCourse && product?.price) {
    const adminClient: any = await createAdminClient()
    const { data: draftCourse } = await adminClient
      .from('courses')
      .select('id, title, status, access')
      .eq('slug', databaseSlug)
      .maybeSingle()
    accessibleCourse = draftCourse as Pick<Course, 'id' | 'title' | 'status' | 'access'> | null
  }

  if (!accessibleCourse || accessibleCourse.status === 'archived') notFound()
  if (accessibleCourse.status !== 'published') {
    return <CourseInDevelopment courseTitle={accessibleCourse.title} courseSlug={courseSlug} />
  }

  if (accessibleCourse.access === 'paid') {
    const { data: rawEnrollment } = await supabase
      .from('enrollments')
      .select('id, payment_verified_at')
      .eq('user_id', user.id)
      .eq('course_id', accessibleCourse.id)
      .maybeSingle()
    const enrollment = rawEnrollment as Pick<Enrollment, 'id' | 'payment_verified_at'> | null

    if (!enrollment?.payment_verified_at) {
      return <LockedLesson courseSlug={courseSlug} courseTitle={accessibleCourse.title} />
    }
  }

  // ── Legacy demo courses — serve existing LessonPreview ────────
  if (LEGACY_COURSES.includes(courseSlug)) {
    return <LessonPreview slug={courseSlug} userId={user.id} />
  }

  // ── Database-driven lesson ────────────────────────────────────
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*, courses(*)')
    .eq('slug', lessonSlug)
    .single() as { data: (Lesson & { courses: Course }) | null }

  if (!lesson || lesson.status !== 'published') notFound()

  const course = lesson.courses

  // Access enforcement
  // free lessons → any authenticated user
  // paid lessons → must have an enrollment record
  if (lesson.access_level === 'paid' || course.access === 'paid') {
    const { data: rawEnrollment } = await supabase
      .from('enrollments')
      .select('id, payment_verified_at')
      .eq('user_id', user.id)
      .eq('course_id', lesson.course_id)
      .single()
    const enrollment = rawEnrollment as Pick<Enrollment, 'id' | 'payment_verified_at'> | null

    if (!enrollment?.payment_verified_at) {
      return <LockedLesson courseSlug={courseSlug} courseTitle={course.title} />
    }
  }

  // Fetch sibling lessons for prev/next navigation
  type SiblingLesson = Pick<Lesson, 'id' | 'slug' | 'title' | 'position' | 'access_level'>
  const { data: rawSiblings } = await supabase
    .from('lessons')
    .select('id, slug, title, position, access_level')
    .eq('course_id', lesson.course_id)
    .eq('status', 'published')
    .order('position', { ascending: true })
  const siblings = rawSiblings as SiblingLesson[] | null

  const currentIdx = siblings?.findIndex((s) => s.id === lesson.id) ?? 0
  const prev = siblings?.[currentIdx - 1] ?? null
  const next = siblings?.[currentIdx + 1] ?? null

  return (
    <div className="lesson-app">
      <header className="lesson-header">
        <Link href={`/courses/${courseSlug}`} className="lesson-back">
          <ArrowLeft size={15} /><span>Course overview</span>
        </Link>
        <Brand />
        <span className="lesson-header-progress" aria-label="Lesson position in course">
          {currentIdx + 1} / {siblings?.length ?? 1}
        </span>
      </header>

      <div className="lesson-layout">
        {/* Sidebar */}
        <aside className="lesson-sidebar">
          <Link href={`/courses/${courseSlug}`} className="lesson-course-title">
            <span>{course.title}</span>
          </Link>
          <div className="lesson-sidebar-label">
            LESSON POSITION
            <span>{currentIdx + 1} / {siblings?.length ?? 1}</span>
          </div>
          <div className="lesson-progress-line">
            <span style={{ width: `${((currentIdx + 1) / (siblings?.length ?? 1)) * 100}%` }} />
          </div>
          <div className="lesson-list">
            {siblings?.map((s, i) => (
              <Link
                key={s.id}
                href={`/learn/${courseSlug}/${s.slug}`}
                className={s.id === lesson.id ? 'lesson-item selected' : 'lesson-item'}
              >
                <span className={s.id === lesson.id ? 'lesson-state current' : 'lesson-state'}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  {s.title}
                  <small>LESSON {String(i + 1).padStart(2, '0')}</small>
                </span>
                {s.access_level === 'paid' && i > currentIdx && (
                  <Lock size={12} className="lesson-lock-icon" aria-label="Paid lesson" />
                )}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <section className="lesson-main">
          <div className="lesson-reading">
            <div className="lesson-breadcrumb">
              <span>{course.title}</span>
              <span>/</span>
              <span>LESSON {String(currentIdx + 1).padStart(2, '0')}</span>
            </div>

            <span className="lesson-type">
              {lesson.lesson_type === 'video' || lesson.lesson_type === 'mixed'
                ? <><Play size={12} /> VIDEO LESSON</>
                : <><Clock3 size={12} /> TEXT LESSON · {lesson.read_time_min ?? 6} MIN</>
              }
            </span>

            <h1>{lesson.title}</h1>

            {/* ── YouTube video (free, registered users only) ── */}
            {lesson.youtube_video_id && (
              <div className="lesson-video-wrap">
                <YouTubeEmbed
                  videoId={lesson.youtube_video_id}
                  title={lesson.title}
                  duration={lesson.video_duration}
                />
                <p className="lesson-video-note">
                  This video is part of your free course materials.
                  Sign in is required to access it.
                </p>
              </div>
            )}

            {/* Text body */}
            {lesson.body && (
              <>
                <div className="lesson-rule" />
                <p className="lesson-lead">{lesson.body}</p>
              </>
            )}

            {lesson.takeaway && (
              <div className="lesson-callout">
                <div>
                  <b>Key takeaway</b>
                  <p>{lesson.takeaway}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="lesson-pagination">
              {prev ? (
                <Link href={`/learn/${courseSlug}/${prev.slug}`} className="lesson-nav-btn">
                  <ArrowLeft size={14} /> Previous
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/learn/${courseSlug}/${next.slug}`} className="lesson-nav-btn lesson-nav-btn--next">
                  Next <ArrowRight size={14} />
                </Link>
              ) : (
                <Link href={`/courses/${courseSlug}`} className="lesson-nav-btn lesson-nav-btn--next">
                  Finish course <Check size={14} />
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function CourseInDevelopment({ courseTitle, courseSlug }: { courseTitle: string; courseSlug: string }) {
  return (
    <div className="lesson-locked">
      <div className="lesson-locked-card">
        <h1>{courseTitle} is in development</h1>
        <p>Lessons will become available after the course is published. No release date is promised.</p>
        <Link href={`/courses/${courseSlug}`} className="button button-dark">
          View course details <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}

/** Shown when a paid lesson is accessed without verified enrollment */
function LockedLesson({ courseSlug, courseTitle }: { courseSlug: string; courseTitle: string }) {
  return (
    <div className="lesson-locked">
      <div className="lesson-locked-card">
        <Lock size={32} className="lesson-locked-icon" aria-hidden="true" />
        <h1>This lesson is available to enrolled learners</h1>
        <p>
        Review <strong>{courseTitle}</strong> to see its lessons and available access options.
        </p>
        <Link href={`/courses/${courseSlug}`} className="button button-dark">
          View course <ArrowRight size={15} />
        </Link>
        <Link href="/courses" className="auth-back-link" style={{ marginTop: 12 }}>
          <ArrowLeft size={14} /> Browse all courses
        </Link>
      </div>
    </div>
  )
}
