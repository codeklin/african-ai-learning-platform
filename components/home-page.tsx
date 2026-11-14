'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, Clock3, Flame, Play } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { useUser } from '@/hooks/use-user'
import type { User } from '@supabase/supabase-js'

const academies = [
  { number: '01', title: 'AI Foundations',              detail: 'Make sense of the tools everyone is talking about.',               tone: 'lavender', tag: 'Start here'  },
  { number: '02', title: 'AI Content Creation',         detail: 'Get past the blank page and make work that sounds like you.',      tone: 'lime',     tag: 'Creative'    },
  { number: '03', title: 'AI Freelancing',              detail: 'Find a service you can offer and explain its value.',              tone: 'coral',    tag: 'In demand'   },
  { number: '04', title: 'AI Automation',               detail: 'Spend less time repeating the same small tasks.',                  tone: 'blue',     tag: 'Coming soon' },
  { number: '05', title: 'AI App Development',          detail: 'Turn a rough idea into a working first version.',                  tone: 'peach',    tag: 'Coming soon' },
  { number: '06', title: 'Creator Economy & YouTube',   detail: 'Make videos people want to watch, without chasing quick wins.',    tone: 'lavender', tag: 'New academy' },
]

const courses = [
  { title: 'Your AI Toolkit: A Practical Start',    academy: 'AI Foundations',      level: 'Beginner',     lessons: 8,  hours: '2h 15m', kind: 'Free', color: 'course-lilac',   number: '01', description: 'Confused by all the AI talk? Learn what these tools can and cannot do.' },
  { title: 'Prompting for Better Work',             academy: 'AI Foundations',      level: 'Beginner',     lessons: 12, hours: '3h 10m', kind: 'Free', color: 'course-green',   number: '02', description: 'Stop settling for vague answers. Get results you can actually use.' },
  { title: 'The Freelance AI Content Studio',       academy: 'AI Content Creation', level: 'Intermediate', lessons: 16, hours: '4h 30m', kind: 'Pro',  color: 'course-orange',  number: '03', description: 'Build a repeatable content workflow and a portfolio-ready project.' },
]

const steps = [
  { number: '01', title: 'Pick one thing to solve', text: 'Choose a task you struggle with. You do not need a big plan to begin.' },
  { number: '02', title: 'Learn by doing',          text: 'Try each idea on a real task, instead of watching another playlist.' },
  { number: '03', title: 'Have something to show',  text: 'Finish with a project you can share when someone asks what you can do.' },
]

function SiteHeader({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={open ? 'site-header menu-open' : 'site-header'}>
      <div className="nav-wrap">
        <Brand />
        <button
          className={open ? 'menu-toggle is-open' : 'menu-toggle'}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="hamburger-mark" aria-hidden="true"><i /><i /><i /><b /></span>
        </button>
        <nav id="primary-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <Link onClick={() => setOpen(false)} href="/courses">Explore courses</Link>
          <Link onClick={() => setOpen(false)} href="/quiz">Skill Assessment</Link>
          <a onClick={() => setOpen(false)} href="#academies">Academies</a>
          <a onClick={() => setOpen(false)} href="#how-it-works">How it works</a>
          <a onClick={() => setOpen(false)} href="#pricing">Pricing</a>
          <div className="nav-actions">
            {isAuthenticated ? (
              <Link className="login-link" onClick={() => setOpen(false)} href="/dashboard">Dashboard</Link>
            ) : (
              <Link className="login-link" onClick={() => setOpen(false)} href="/login">Log in</Link>
            )}
            {isAuthenticated ? (
              <Link className="button button-dark nav-cta" onClick={() => setOpen(false)} href="/dashboard">Dashboard <ArrowRight size={15} /></Link>
            ) : (
              <Link className="button button-dark nav-cta" onClick={() => setOpen(false)} href="/courses">Start learning <ArrowRight size={15} /></Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

function CourseCard({ course }: { course: typeof courses[number] }) {
  return (
    <article className="course-card">
      <Link href="/courses" className={`course-art ${course.color}`} aria-label={`Explore ${course.title}`}>
        <span className="course-art-kicker">ITUWA AFRICA / FIELD NOTES</span>
        <span className="course-blob">
          <span className="course-blob-inner">{course.number}</span>
        </span>
        <span className="course-art-index">LEARNING SERIES {course.number}</span>
        <span className="course-open"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="course-meta">
        <span>{course.academy}</span>
        <button aria-label={`Save ${course.title}`} className="save-course"><Bookmark size={16} /></button>
      </div>
      <h3><Link href="/courses">{course.title}</Link></h3>
      <p>{course.description}</p>
      <div className="course-stats">
        <span>{course.level}</span>
        <span><Play size={13} /> {course.lessons} lessons</span>
        <span><Clock3 size={13} /> {course.hours}</span>
      </div>
    </article>
  )
}

function DashboardPreview() {
  return (
    <div className="preview-shell" aria-label="Preview of the ituwaAfrica learning dashboard">
      <div className="preview-topbar">
        <div className="preview-window-dots"><i /><i /><i /></div>
        <span>DASHBOARD PREVIEW</span>
        <span className="preview-live"><span /> IN SESSION</span>
      </div>
      <div className="preview-content">
        <aside className="preview-sidebar">
          <Brand />
          <div className="preview-side-label">MENU</div>
          <div className="preview-side-item active">
            <span className="preview-side-blob">01</span> Overview
          </div>
          <div className="preview-side-item">
            <span className="preview-side-blob">02</span> My learning
          </div>
          <div className="preview-side-item">
            <span className="preview-side-blob">03</span> Challenges
          </div>
          <div className="preview-side-bottom">
            <span className="preview-avatar">A</span>
            <span>Amara Okafor<small>Free Explorer</small></span>
          </div>
        </aside>
        <div className="preview-main">
          <div className="preview-greeting">
            <div>
              <span className="eyebrow">MONDAY, 14 JULY</span>
              <h3>Good morning, Amara</h3>
              <p>A little progress goes a long way.</p>
            </div>
            <span className="streak-pill"><Flame size={15} /> 4 day streak</span>
          </div>
          <div className="preview-continue">
            <div>
              <span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
              <h4>Your AI Toolkit:<br />A Practical Start</h4>
              <div className="preview-progress"><span /><b>4 of 8 lessons</b></div>
              <Link href="/courses">Continue lesson <ArrowRight size={14} /></Link>
            </div>
            <div className="preview-abstract">
              <div className="abstract-orbit orbit-one" />
              <div className="abstract-orbit orbit-two" />
              <span className="preview-blob-num">01</span>
            </div>
          </div>
          <div className="preview-bottom-row">
            <div className="preview-week">
              <div className="mini-heading"><b>Your week</b><span>3.5 hours</span></div>
              <div className="week-bars">
                {[35, 68, 44, 84, 55, 22, 10].map((height, i) => (
                  <div key={i}>
                    <span style={{ height: `${height}%` }} className={i === 3 ? 'today' : ''} />
                    <small>{['M','T','W','T','F','S','S'][i]}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="preview-challenge">
              <span className="challenge-spark"><span className="value-blob">✳</span></span>
              <div>
                <span className="eyebrow">TODAY&apos;S SMALL WIN</span>
                <b>Write a sharper prompt</b>
                <small>5 minutes · Foundations</small>
              </div>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage({ initialUser = null }: { initialUser?: User | null }) {
  const { isAuthenticated } = useUser(initialUser)
  const [activeAcademy, setActiveAcademy] = useState('All')
  const filteredCourses = activeAcademy === 'All' ? courses : courses.filter((c) => c.academy === activeAcademy)

  return (
    <div className={isAuthenticated ? 'landing-page-wrap has-app-bottom-nav' : 'landing-page-wrap'}>
      <SiteHeader isAuthenticated={isAuthenticated} />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-note">
              <span className="hero-note-icon"><span className="value-blob" style={{ width: 22, height: 22, fontSize: 9 }}>01</span></span>
              TIRED OF AI TUTORIALS THAT DON'T HELP YOU?
            </div>
            <h1>AI tutorials don't help you. <span>Practice, projects and systems do.</span></h1>
            <p>Stop watching and start building. ituwaAfrica gives you the AI skills, real projects and practical systems that actually move your work forward.</p>
            <div className="hero-actions">
              <Link className="button button-dark" href={isAuthenticated ? "/dashboard" : "/courses"}>
                {isAuthenticated ? 'Go to your dashboard' : 'Start learning free'} <ArrowRight size={16} />
              </Link>
              <a className="text-link" href="#academies">Explore academies <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars"><span>A</span><span>T</span><span>K</span></div>
              <span>For people ready to put what they learn to work</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-caption">
              <span>A SKILL YOU CAN USE, IN PROGRESS</span>
              <span>01 / 05</span>
            </div>
            <DashboardPreview />
            <div className="hero-sticker"><span>LEARN</span><b>→</b><span>MAKE</span><b>→</b><span>GROW</span></div>
          </div>
          <div className="hero-bottom">
            <span>01 / LEARN WITH INTENTION</span>
            <span>SCROLL TO EXPLORE <ChevronDown size={13} /></span>
          </div>
        </section>

        {/* Academies */}
        <section id="academies" className="section academies-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> WHAT DO YOU NEED HELP WITH?</div>
              <h2>Six ways to move<br />your work forward.</h2>
            </div>
            <p>Not sure what to learn first? Pick the problem you want to solve and start there.</p>
          </div>
          <div className="academy-grid">
            {academies.map((academy) => (
              <Link key={academy.number} href="/courses" className={`academy-card academy-${academy.tone}`}>
                <div className="academy-top">
                  <span>{academy.number} / ACADEMY</span>
                  <span className="academy-arrow"><ArrowUpRight size={17} /></span>
                </div>
                {/* Animated numbered blob replaces generic icon */}
                <span className="academy-blob">{academy.number}</span>
                <h3>{academy.title}</h3>
                <p>{academy.detail}</p>
                <div className="academy-bottom">
                  <span>{academy.tag === 'Coming soon' ? 'Coming soon' : 'Explore academy'}</span>
                  {academy.tag === 'Coming soon' ? <span className="coming-dot" /> : <ArrowRight size={15} />}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Courses */}
        <section className="section courses-section">
          <div className="section-heading course-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> SHORT LESSONS. SOMETHING TO SHOW.</div>
              <h2>Start with a skill.<br />Leave with a project.</h2>
            </div>
            <Link className="text-link all-courses" href="/courses">View all courses <ArrowRight size={16} /></Link>
          </div>
          <div className="course-filters" role="group" aria-label="Filter courses by academy">
            {['All', 'AI Foundations', 'AI Content Creation'].map((academy) => (
              <button
                key={academy}
                onClick={() => setActiveAcademy(academy)}
                className={activeAcademy === academy ? 'filter-chip active' : 'filter-chip'}
                aria-pressed={activeAcademy === academy}
              >
                {academy}
              </button>
            ))}
          </div>
          <div className="courses-grid">
            {filteredCourses.map((course) => <CourseCard key={course.title} course={course} />)}
          </div>
          <div className="course-footnote">
            <span><Check size={14} /> No experience needed to begin</span>
            <span><Check size={14} /> Learn at your own pace</span>
            <span><Check size={14} /> Practical, portfolio-ready work</span>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="how-section">
          <div className="section how-inner">
            <div className="how-intro">
              <div className="eyebrow"><span className="eyebrow-line" /> NO MORE WATCHING WITHOUT PRACTICE</div>
              <h2>Knowledge is good.<br /><span>Capability is better.</span></h2>
              <p>It is easy to watch another lesson and still feel no closer to your goal. Here, you practice as you go and finish with work you can use.</p>
              <Link className="text-link" href="/courses">Find your learning path <ArrowRight size={16} /></Link>
              <div className="hand-drawn-star">✳</div>
            </div>
            <div className="steps-list">
              {steps.map((step) => (
                <div className="step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <ArrowUpRight size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project */}
        <section className="project-section section">
          <div className="project-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE WORK SPEAKS</div>
            <h2>Make something<br />you&apos;re proud to <em>show.</em></h2>
            <p>Turn the ideas in your notes into finished work. Each project gives you something real to show a client or employer.</p>
            <Link className="button button-dark" href="/courses">Explore project-based courses <ArrowRight size={16} /></Link>
          </div>
          <div className="project-collage">
            <div className="project-note">
              <span>YOUR PORTFOLIO, IN THE MAKING</span>
              <ArrowUpRight size={14} />
            </div>
            <div className="project-card project-card-one">
              <span>01 / CONTENT</span>
              <div className="project-shape shape-one"><div /><i /><i /></div>
              <b>Campaign concept<br />for a local brand</b>
              <small>AI CONTENT STUDIO · DRAFT 01</small>
            </div>
            <div className="project-card project-card-two">
              <span>02 / STRATEGY</span>
              <div className="project-shape shape-two"><div className="shape-two-line" /><div className="shape-two-dot" /></div>
              <b>A clearer freelance<br />service offer</b>
              <small>FREELANCE FOUNDATIONS · DRAFT 02</small>
            </div>
            <div className="project-stamp">MADE<br />BY YOU<span>✳</span></div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pricing-section">
          <div className="section pricing-inner">
            <div className="pricing-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> TRY THE FIRST LESSONS FOR FREE</div>
              <h2>Start free.<br />Go further when<br />you&apos;re ready.</h2>
              <p>Start with the free lessons. If you need more guidance and bigger projects, paid plans are on the way.</p>
              <Link className="text-link" href="/courses">Try a free course <ArrowRight size={16} /></Link>
            </div>
            <div className="price-card">
              <div className="price-top">
                <span className="plan-label">ITUWA AFRICA / EXPLORER</span>
                <span className="free-tag">ALWAYS FREE</span>
              </div>
              <h3>Curiosity has<br />no cover charge.</h3>
              <p>New to AI? Start here, learn the basics, and try them on a real task.</p>
              <ul>
                <li><Check size={15} /> Selected free courses</li>
                <li><Check size={15} /> A simple learner dashboard</li>
                <li><Check size={15} /> A rotating daily challenge</li>
              </ul>
              <Link className="button button-light" href="/courses">Start learning free <ArrowRight size={16} /></Link>
              <small>Paid plans are in development. No payment is collected in this preview.</small>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="closing-cta">
          <div className="closing-star">✳</div>
          <div className="eyebrow">YOU DON&apos;T NEED TO HAVE IT FIGURED OUT</div>
          <h2>Tired of feeling stuck?<br />Take <em>one small step.</em></h2>
          <Link className="button button-dark" href="/courses">Find your first course <ArrowRight size={16} /></Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-main">
          <Brand />
          <p>Learn a skill. Try it out.<br />Make work you can stand behind.</p>
          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <Link href="/courses">Courses</Link>
              <Link href="/quiz">Skill Assessment</Link>
              <a href="#academies">Academies</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <span>ITUWA AFRICA</span>
              <a href="#how-it-works">Our approach</a>
              <a href="mailto:hello@ituwa.africa">Get in touch</a>
              <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                {isAuthenticated ? 'Dashboard' : 'Log in'}
              </Link>
            </div>
            <div>
              <span>LEGAL & TRUST</span>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/quiz">Skill Quiz</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ituwaAfrica. Made for real work.</span>
          <span>Start where you are. Build from there.</span>
        </div>
      </footer>

      {/* Fixed bottom navigation for authenticated mobile users */}
      {isAuthenticated && <AppBottomNav active="dashboard" />}
    </div>
  )
}
