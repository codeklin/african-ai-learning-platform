'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock3, Play, Search, Sparkles, CheckCircle2 } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { useUser } from '@/hooks/use-user'

interface CourseItem {
  title: string
  academy: string
  level: string
  lessons: number
  duration: string
  access: 'Free' | 'Coming soon'
  tone: 'lilac' | 'green' | 'orange' | 'blue' | 'peach' | 'lavender'
  description: string
  symbol: string
}

const catalogue: CourseItem[] = [
  { title: 'Your AI Toolkit: A Practical Start', academy: 'AI Foundations', level: 'Beginner', lessons: 8, duration: '2h 15m', access: 'Free', tone: 'lilac', symbol: 'AI', description: 'Too much AI talk and not sure what matters? Learn what the tools can do and try the basics for yourself.' },
  { title: 'Prompting for Better Work', academy: 'AI Foundations', level: 'Beginner', lessons: 12, duration: '3h 10m', access: 'Free', tone: 'green', symbol: '✳', description: 'Tired of vague answers? Learn how to give clear instructions and get a better first draft.' },
  { title: 'The Freelance AI Content Studio', academy: 'AI Content Creation', level: 'Intermediate', lessons: 16, duration: '4h 30m', access: 'Coming soon', tone: 'orange', symbol: '✦', description: 'Turn a client brief into clear content and build samples you can show when pitching.' },
  { title: 'Build Your First AI Workflow', academy: 'AI Automation', level: 'Intermediate', lessons: 10, duration: '3h 45m', access: 'Coming soon', tone: 'blue', symbol: '↗', description: 'Stop repeating the same task by hand. Pick one routine job and build a simple workflow.' },
  { title: 'AI for Your Freelance Business', academy: 'AI Freelancing', level: 'Beginner', lessons: 14, duration: '4h', access: 'Coming soon', tone: 'peach', symbol: 'K.', description: 'Not sure what to sell? Find one problem you can solve and turn it into a clear offer.' },
  { title: 'Build a Helpful AI App', academy: 'AI App Development', level: 'Advanced', lessons: 18, duration: '6h 20m', access: 'Coming soon', tone: 'lavender', symbol: '01', description: 'Have an idea but not sure how to build it? Make a first version you can test with people.' },
  { title: 'YouTube Business Fundamentals', academy: 'Creator Economy & YouTube', level: 'Beginner', lessons: 8, duration: '2h 30m', access: 'Free', tone: 'blue', symbol: 'YT', description: 'Want to start a channel but unsure how it earns? Learn the basics, costs, and realistic ways creators make money.' },
  { title: 'Starting a Faceless YouTube Channel', academy: 'Creator Economy & YouTube', level: 'Beginner', lessons: 8, duration: '3h', access: 'Free', tone: 'lilac', symbol: '02', description: 'Want to make videos but not appear on camera? Plan a channel with its own clear point of view.' },
  { title: 'YouTube Automation & Monetization Masterclass', academy: 'Creator Economy & YouTube', level: 'Intermediate', lessons: 8, duration: '4h', access: 'Free', tone: 'green', symbol: '03', description: 'Save time on repeat tasks without handing over your creative decisions.' },
  { title: 'AI-Powered YouTube Content Production', academy: 'Creator Economy & YouTube', level: 'Intermediate', lessons: 8, duration: '3h 30m', access: 'Free', tone: 'orange', symbol: '04', description: 'Use AI to get past the blank page, then shape the final video in your own voice.' },
  { title: 'YouTube Shorts Growth Strategy', academy: 'Creator Economy & YouTube', level: 'Beginner', lessons: 8, duration: '2h 45m', access: 'Free', tone: 'peach', symbol: '05', description: 'Make short videos around what your audience cares about. Views are never guaranteed.' },
  { title: 'YouTube SEO and Analytics', academy: 'Creator Economy & YouTube', level: 'Intermediate', lessons: 8, duration: '3h', access: 'Free', tone: 'blue', symbol: '06', description: 'See what people search for, read your channel stats, and decide what to try next.' },
  { title: 'YouTube Monetization Policies and Copyright', academy: 'Creator Economy & YouTube', level: 'Intermediate', lessons: 8, duration: '3h 15m', access: 'Free', tone: 'lavender', symbol: '07', description: 'Know what you can use, what needs credit, and where to check the latest rules.' },
  { title: 'Building a Creator Business Beyond Ad Revenue', academy: 'Creator Economy & YouTube', level: 'Intermediate', lessons: 8, duration: '3h 30m', access: 'Free', tone: 'green', symbol: '08', description: 'Ad income can be unpredictable. Explore services, products, and partnerships that fit your audience.' },
]

const categories = [
  'All',
  'AI Foundations',
  'Creator Economy & YouTube',
  'AI Content Creation',
  'AI Automation',
  'AI Freelancing',
  'AI App Development',
]

function getCourseLink(course: CourseItem, index: number) {
  if (course.access !== 'Free') return '/courses'
  if (course.academy === 'Creator Economy & YouTube') {
    return `/courses/${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  }
  return `/courses/${index === 0 ? 'ai-toolkit-practical-start' : 'prompting-better-work'}`
}

export default function CoursesPage() {
  const { isAuthenticated } = useUser()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

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

  const freeCount = catalogue.filter((c) => c.access === 'Free').length

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
          Find your next<br />
          <em>useful skill.</em>
        </h1>
        <p>
          Overwhelmed by choices? Start with a free course, build something practical, and decide what to learn next.
        </p>

        {/* Feature badges bar */}
        <div className="catalog-count-bar">
          <span className="catalog-count-pill">
            <CheckCircle2 size={14} className="catalog-pill-icon" /> {freeCount} Free Courses
          </span>
          <span className="catalog-count-pill">
            <Sparkles size={14} className="catalog-pill-icon" /> 6 Learning Academies
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
                  ✕
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
          {filteredCourses.map((course, i) => {
            const courseLink = getCourseLink(course, i)
            const isFree = course.access === 'Free'

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
                      {course.access}
                    </span>
                  </div>

                  <h2>
                    {isFree ? (
                      <Link href={courseLink}>{course.title}</Link>
                    ) : (
                      course.title
                    )}
                  </h2>

                  <p>{course.description}</p>

                  <div className="catalog-card-stats">
                    <span className="stat-level">{course.level}</span>
                    <span className="stat-item">
                      <Play size={14} /> {course.lessons} lessons
                    </span>
                    <span className="stat-item">
                      <Clock3 size={14} /> {course.duration}
                    </span>
                  </div>

                  {isFree ? (
                    <Link href={courseLink} className="catalog-open">
                      <span>Start course</span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <div className="catalog-coming">
                      <span>Coming soon in next release</span>
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
        <span className="eyebrow">A GOOD PLACE TO BEGIN</span>
        <h2>Curiosity is a skill, too.</h2>
        <p>Pick one module today, take 20 minutes, and build something you can show.</p>
        <Link href="/" className="button button-dark">
          Back to ituwaAfrica <ArrowRight size={16} />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="catalog-footer">
        <span>© 2026 ituwaAfrica</span>
        <Link href="/">Learn with intention.</Link>
      </footer>

      {/* Fixed bottom navigation for authenticated mobile users */}
      {isAuthenticated && <AppBottomNav active="courses" />}
    </main>
  )
}
