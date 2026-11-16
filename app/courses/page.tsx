'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock3, Play, Search, BookOpen, CheckCircle2, X } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { useUser } from '@/hooks/use-user'
import { COURSE_PRODUCTS, type CourseProduct, formatDualPrice, getActivePrice, LAUNCH_PROMO_ACTIVE } from '@/lib/course-products'
import CoursePurchaseButton from '@/components/course-purchase-button'

type CourseItem = CourseProduct

const catalogue: CourseItem[] = COURSE_PRODUCTS

const categories = [
  'All',
  'AI Foundations',
  'AI Video Creation',
  'AI Content Marketing',
  'AI App Development',
  'Creator Economy & YouTube',
  'AI Graphic Design',
]

function getCourseLink(course: CourseItem) {
  return `/courses/${course.slug}`
}

export default function CoursesPage() {
  const { isAuthenticated } = useUser()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [courseStatuses, setCourseStatuses] = useState<Record<string, 'published' | 'in-development'>>({})
  const [enrolledCourseSlugs, setEnrolledCourseSlugs] = useState<string[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/course-status', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Course status could not be refreshed.')
        const data: unknown = await response.json()
        if (!data || typeof data !== 'object') throw new Error('Course status response was invalid.')

        const statuses: Record<string, 'published' | 'in-development'> = {}
        if ('courseStatuses' in data && data.courseStatuses && typeof data.courseStatuses === 'object') {
          for (const [slug, status] of Object.entries(data.courseStatuses)) {
            if (status === 'published' || status === 'in-development') {
              statuses[slug] = status
            }
          }
        }
        setCourseStatuses(statuses)
        if (
          'enrolledCourseSlugs' in data &&
          Array.isArray(data.enrolledCourseSlugs) &&
          data.enrolledCourseSlugs.every((slug) => typeof slug === 'string')
        ) {
          setEnrolledCourseSlugs(data.enrolledCourseSlugs)
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Unable to refresh course availability:', error)
      })

    return () => controller.abort()
  }, [])

  const filteredCourses = useMemo(() => {
    return catalogue.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.academy === selectedCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.academy.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const freeCount = catalogue.filter((course) => course.price === null).length
  const paidCount = catalogue.length - freeCount

  return (
    <main className={`catalog-page ${isAuthenticated ? 'has-app-bottom-nav' : ''}`}>
      {/* ── Native Play Store Quality App Header ── */}
      <header className="catalog-nav">
        <Link href="/" className="catalog-back" aria-label="Back to home">
          <ArrowLeft size={18} />
          <span>ituwaAfrica</span>
        </Link>
        <div className="catalog-brand-wrap">
          <Brand />
        </div>
        <div className="catalog-nav-actions">
          {isAuthenticated ? (
            <Link href="/dashboard" className="catalog-login">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="catalog-login">
              Log in
            </Link>
          )}
        </div>
      </header>

      {/* ── Prominent Hero ── */}
      <section className="catalog-hero">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          <span>COURSES THAT HELP WITH REAL WORK</span>
        </div>
        <h1>
          Learn a practical skill<br />
          <em>one course at a time.</em>
        </h1>
        <p>
          Start with free AI foundations or choose from five paid specialist courses, including exclusive business courses in content marketing and app development. Paid courses are currently in development.
        </p>

        {/* Feature badges bar */}
        <div className="catalog-count-bar">
          <span className="catalog-count-pill">
            <CheckCircle2 size={14} className="catalog-pill-icon" /> {freeCount} Free Course
          </span>
          <span className="catalog-count-pill">
            <BookOpen size={14} className="catalog-pill-icon" /> {paidCount} Paid Courses
          </span>
          <span className="catalog-count-pill">
            <Clock3 size={14} className="catalog-pill-icon" /> Self-Paced & Practical
          </span>
        </div>
      </section>

      {/* ── Catalog Body ── */}
      <section className="catalog-content">
        {/* Search & Category Filter Toolbar */}
        <div className="catalog-toolbar-wrap">
          <div className="catalog-search-row">
            <div className="catalog-search-input-box">
              <Search size={18} className="catalog-search-icon" />
              <input
                type="text"
                placeholder="Search courses, skills, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="catalog-search-clear"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="catalog-status-note">
              <span>{filteredCourses.length} course{filteredCourses.length === 1 ? '' : 's'} found</span>
            </div>
          </div>

          {/* Category Chips Scroll */}
          <div className="catalog-chips-scroll" role="tablist" aria-label="Course categories">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`catalog-filter-pill ${isActive ? 'active' : ''}`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Course Grid */}
        <div className="catalog-grid">
          {filteredCourses.map((course) => {
            const courseLink = getCourseLink(course)
            const isFree = course.price === null
            const isInDevelopment =
              !isFree && courseStatuses[course.slug] !== 'published'
            const priceInfo = formatDualPrice(getActivePrice(course))
            const basePrice = priceInfo.nairaText
            const equivalentPrice = priceInfo.usdText

            return (
              <article key={course.title} className="catalog-card">
                {/* Visual Art Header */}
                <Link
                  href={courseLink}
                  className={`catalog-art catalog-${course.tone}`}
                  aria-label={course.title}
                >
                  <div className="catalog-art-top">
                    <small>ITUWA / {course.academy.toUpperCase()}</small>
                    <span className="catalog-art-foot">PRACTICAL SERIES</span>
                  </div>
                  <span className="catalog-art-mark">{course.symbol}</span>
                  <span className="catalog-art-arrow">
                    <ArrowRight size={18} />
                  </span>
                </Link>

                {/* Card Content Details */}
                <div className="catalog-card-details">
                  <div className="catalog-card-top">
                    <span className="catalog-academy-badge">{course.academy}</span>
                    <span className={isFree ? 'access-free' : 'access-soon'}>
                      {isFree ? 'Free' : isInDevelopment ? 'In development' : 'Published'}
                    </span>
                  </div>

                  <h2><Link href={courseLink}>{course.title}</Link></h2>
                  {course.exclusive && (
                    <span className="catalog-exclusive-badge">Exclusive specialist course</span>
                  )}

                  <p>{course.description}</p>

                  <div className="catalog-card-stats">
                    <span className="stat-level">{course.level}</span>
                    {isFree ? (
                      <>
                        <span className="stat-item"><Play size={14} /> 8 lessons</span>
                        <span className="stat-item"><Clock3 size={14} /> 2h 15m</span>
                      </>
                    ) : (
                      <span className="stat-item">One-time payment</span>
                    )}
                  </div>

                  {isFree ? (
                    <Link href={courseLink} className="catalog-open">
                      <span>Start course</span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <div className="catalog-purchase">
                      <div className="catalog-price-row">
                        <strong className="catalog-price-main">{basePrice}</strong>
                        <span className="catalog-price-equiv">{equivalentPrice}</span>
                      </div>
                      {LAUNCH_PROMO_ACTIVE && course.launchPrice && (
                        <span className="catalog-launch-badge">LAUNCH PRICE</span>
                      )}
                      {isInDevelopment && (
                        <span className="catalog-development-note">
                          Pre-order · lessons unlock after publication
                        </span>
                      )}
                      <CoursePurchaseButton
                        course={course}
                        isEnrolled={enrolledCourseSlugs.includes(course.slug)}
                      />
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="catalog-empty-box">
            <p>No courses match your search or filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="button button-dark"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* ── Closing Call to Action ── */}
      <section className="catalog-cta">
        <span className="eyebrow">NOT SURE WHERE TO BEGIN?</span>
        <h2>Not sure where to begin?</h2>
        <p>Answer a few questions about your interests and experience to see which academy may suit you.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quiz" className="button button-dark">
            Find a skill to start with <ArrowRight size={16} />
          </Link>
          <Link href="/" className="button button-light">
            Back to home
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="catalog-footer">
        <span>© 2026 ituwaAfrica · Real practical projects</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/quiz">Skill Assessment</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>

      {/* Fixed bottom navigation for authenticated mobile users */}
      {isAuthenticated && <AppBottomNav active="courses" />}
    </main>
  )
}
