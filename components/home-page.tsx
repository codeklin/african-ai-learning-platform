'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { useUser } from '@/hooks/use-user'
import { PAID_COURSE_PRODUCTS, getActivePrice, formatDualPrice } from '@/lib/course-products'
import type { User } from '@supabase/supabase-js'

const featuredAcademies = [
  {
    number: '01',
    title: 'AI Foundations',
    detail: 'Understand AI and learn how to use it for everyday tasks.',
    href: '/courses/ai-toolkit-practical-start',
    tone: 'coral',
  },
  {
    number: '02',
    title: 'AI Video Creation',
    detail: 'Plan and produce original AI-assisted videos.',
    href: '/courses/ai-video-creation',
    tone: 'orange',
  },
  {
    number: '03',
    title: 'AI Content Marketing',
    detail: 'Help a business reach the right audience with useful, original content.',
    href: '/courses/ai-content-marketing-for-business',
    tone: 'peach',
  },
  {
    number: '04',
    title: 'AI App Development',
    detail: 'Build and test a useful AI-powered product for a real business problem.',
    href: '/courses/ai-web-app-development',
    tone: 'blue',
  },
  {
    number: '05',
    title: 'YouTube Monetization',
    detail: 'Understand creator revenue paths, policies, and original audience value.',
    href: '/courses/youtube-monetization',
    tone: 'lime',
  },
  {
    number: '06',
    title: 'AI Graphic Design',
    detail: 'Create original visual assets for real client and business needs.',
    href: '/courses/ai-graphic-design',
    tone: 'peach',
  },
]

const steps = [
  {
    number: '01',
    title: 'Choose a skill to learn',
    text: 'Start with an area that fits a task or interest you already have.',
  },
  {
    number: '02',
    title: 'Practise with a project',
    text: 'Follow practical lessons and apply what you learn in an exercise or project.',
  },
  {
    number: '03',
    title: 'Get guidance if you need it',
    text: 'Start with free AI Foundations, then choose a one-time paid course when you are ready.',
  },
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
          <a onClick={() => setOpen(false)} href="#academies">Courses</a>
          <a onClick={() => setOpen(false)} href="#how-it-works">How it works</a>
          <a onClick={() => setOpen(false)} href="#pricing">Mentorship</a>
          <div className="nav-actions">
            {!isAuthenticated && (
              <Link className="login-link" onClick={() => setOpen(false)} href="/login">Log in</Link>
            )}
            <Link
              className="button button-dark nav-cta"
              onClick={() => setOpen(false)}
              href={isAuthenticated ? '/dashboard' : '/courses'}
            >
              <span>{isAuthenticated ? 'Dashboard' : 'Start learning free'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default function HomePage({ initialUser = null }: { initialUser?: User | null }) {
  const { isAuthenticated } = useUser(initialUser)

  return (
    <div className={isAuthenticated ? 'landing-page-wrap has-app-bottom-nav' : 'landing-page-wrap'}>
      <SiteHeader isAuthenticated={isAuthenticated} />
      <main>
        {/* ── 1. Hero ── */}
        <section className="hero hero--editorial">
          <div className="hero-editorial-inner">
            <h1>
              <strong className="hero-h1-primary">
                Learn <span className="hero-h1-ai">AI</span> Skills
              </strong>
              <span className="hero-h1-secondary">Build real things.</span>
            </h1>
            <p>
              Learn AI-powered digital skills with simple lessons and hands-on projects. Start for free.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark hero-btn-main" href={isAuthenticated ? "/dashboard" : "/courses"}>
                <span>{isAuthenticated ? 'Go to your dashboard' : 'Start learning free'}</span>
                <ArrowRight size={16} />
              </Link>
              <Link className="button button-outline-warm hero-btn-quiz" href="/quiz">
                <span>Take skill assessment</span>
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-proof">
              <span className="proof-avatars" aria-hidden="true">
                <Image className="proof-avatar-img" src="/ailab1.png" alt="" width={36} height={36} />
                <Image className="proof-avatar-img" src="/ailab2.png" alt="" width={36} height={36} />
                <Image className="proof-avatar-img" src="/ailab4.png" alt="" width={36} height={36} />
              </span>
              <span>For beginners, freelancers and creators in Nigeria and across Africa.</span>
            </div>
          </div>
        </section>

        {/* ── 2. Skill assessment: visible immediately after the hero ── */}
        <section
          id="skill-assessment"
          className="assessment-prompt"
          aria-labelledby="assessment-prompt-title"
        >
          <div className="assessment-prompt-card">
            <div className="assessment-prompt-index" aria-hidden="true">01</div>
            <div className="assessment-prompt-copy">
              <span className="assessment-prompt-kicker">A GOOD PLACE TO BEGIN</span>
              <h2 id="assessment-prompt-title">Find a skill that fits what you want to do.</h2>
              <p>
                Answer a few questions about your interests and experience to get a course recommendation.
              </p>
            </div>
            <Link href="/quiz" className="button button-dark assessment-prompt-action">
              <span>Take the assessment</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── 3. Who It's For (Bespoke Editorial Showcase) ── */}
        <section className="who-section">
          {/* Ambient blurred backdrop shapes */}
          <div className="who-ambient-blob who-ambient-blob--left" aria-hidden="true" />
          <div className="who-ambient-blob who-ambient-blob--right" aria-hidden="true" />

          <div className="section who-container">
            <div className="who-header">
              <span className="who-header-kicker">PRACTISE USEFUL SKILLS</span>
              <h2 className="who-header-title">
                Learn by working on practical tasks and projects.
              </h2>
            </div>

            <div className="who-grid">
              {/* Card 01: Freelance service */}
              <article className="who-card who-card--freelancer">
                <span className="who-card-watermark" aria-hidden="true">01</span>
                <div className="who-card-top">
                  <span className="who-kicker">01 / FREELANCE SERVICES</span>
                  <span className="who-stamp">PRACTISE AN OFFER</span>
                </div>
                <h3>Create a freelance service</h3>
                <p>
                  Use AI to plan one service. Say what you can do and make a sample for a client. Clients and income are not guaranteed.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Client need</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Your service</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Work sample</span>
                  </div>
                </div>
              </article>

              {/* Card 02: Creator */}
              <article className="who-card who-card--creator">
                <span className="who-card-watermark" aria-hidden="true">02</span>
                <div className="who-card-top">
                  <span className="who-kicker">02 / CONTENT CREATION</span>
                  <span className="who-stamp">ORIGINALITY FIRST</span>
                </div>
                <h3>Create videos for your audience</h3>
                <p>
                  Use AI for ideas, then create an original video for your audience. Views, monetisation and income are not guaranteed.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Your audience</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Video idea</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Original video</span>
                  </div>
                </div>
              </article>

              {/* Card 03: App development */}
              <article className="who-card who-card--app-builder">
                <span className="who-card-watermark" aria-hidden="true">03</span>
                <div className="who-card-top">
                  <span className="who-kicker">03 / APP DEVELOPMENT</span>
                  <span className="who-stamp">3-DAY CHALLENGE</span>
                </div>
                <h3>Build and launch an AI-powered mobile web app in 3 days</h3>
                <p>
                  Pick one problem, use AI to build a mobile-friendly web app, test it on your phone, then launch it.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Day 1: Pick an idea</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Day 2: Build</span>
                  </div>
                  <ArrowRight className="specimen-arrow" size={14} aria-hidden="true" />
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Day 3: Test and launch</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 3. Six Academies ── */}
        <section id="academies" className="section academies-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> PRACTICAL SKILLS FOR REAL WORK</div>
              <h2>Choose what you want<br />to learn and make.</h2>
            </div>
            <p>Explore practical lessons and projects in AI foundations, content marketing, app development, freelancing, video creation and YouTube.</p>
          </div>
          <div className="academy-grid">
            {featuredAcademies.map((academy) => (
              <Link key={academy.number} href={academy.href} className={`academy-card academy-${academy.tone}`}>
                <div className="academy-top">
                  <span>{academy.number} / ACADEMY</span>
                  <span className="academy-arrow"><ArrowUpRight size={17} /></span>
                </div>
                <span className="academy-blob">{academy.number}</span>
                <h3>{academy.title}</h3>
                <p>{academy.detail}</p>
                <div className="academy-bottom">
                  <span>Start {academy.title}</span>
                  <ArrowRight size={15} />
                </div>
              </Link>
            ))}
          </div>
          <div className="academies-footer">
            <Link href="/courses" className="button button-outline-warm">
              <span>Browse all courses</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── 4. How It Works ── */}
        <section id="how-it-works" className="how-section">
          <div className="section how-inner">
            <div className="how-intro">
              <div className="eyebrow"><span className="eyebrow-line" /> LEARN, THEN PUT IT INTO PRACTICE</div>
              <h2>Learn something.<br /><span>Try it for yourself.</span></h2>
              <p>Use free lessons and practical exercises to learn at your own pace. Choose a course that fits what you want to do next.</p>
              <Link className="text-link" href="/courses">
                <span>Explore the courses</span>
                <ArrowRight size={16} />
              </Link>
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

        {/* ── 5. Free learning and personal mentorship ── */}
        <section id="pricing" className="pricing-section">
          <div className="section pricing-inner">

            {/* Section header */}
            <div className="pricing-header">
              <div className="eyebrow"><span className="eyebrow-line" /> LEARNING &amp; MENTORSHIP</div>
              <h2>Start with free foundations.<br /><span>Build a specialist skill next.</span></h2>
              <p>
                AI Foundations is free. Five specialist courses are available as one-time purchases through Paystack at a ₦1,000 launch price. Content Marketing and App Development are exclusive business courses. Mentorship is a separate option.
              </p>
            </div>

            {/* Free learning and mentorship offers */}
            <div className="pricing-cards-column">

              {/* Free learning */}
              <div className="price-card price-card--free">
                <div className="price-top">
                  <span className="plan-label">AI FOUNDATIONS</span>
                  <span className="free-tag">START HERE</span>
                </div>
                <div className="price-amount">
                  <span className="price-val">Free</span>
                  <span className="price-period">to begin</span>
                </div>
                <p className="price-tagline">Start with a practical, free introduction to AI.</p>
                <ul>
                  <li><Check size={15} /> One free AI Foundations course</li>
                  <li><Check size={15} /> Practical lessons and exercises</li>
                  <li><Check size={15} /> A clear starting point before specialist courses</li>
                </ul>
                <Link className="price-btn--free" href="/courses">
                  <span>Explore AI Foundations</span>
                  <ArrowRight size={15} />
                </Link>
                <small>No payment required for AI Foundations.</small>
              </div>

              <div className="price-card price-card--paid">
                <div className="price-top">
                  <span className="plan-label">SPECIALIST COURSES</span>
                  <span className="paid-tag">ONE-TIME PAYMENT</span>
                </div>
                <div className="price-amount">
                  <span className="price-val">5 courses</span>
                  <span className="price-period">Paystack checkout</span>
                </div>
                <p className="price-tagline">Choose a practical skill to develop next.</p>
                <ul>
                  {PAID_COURSE_PRODUCTS.map((course) => {
                    const p = formatDualPrice(getActivePrice(course))
                    return (
                      <li key={course.slug}>
                        <Check size={15} /> {course.title} : {p.nairaText}
                        {p.usdText && <span className="price-naira"> {p.usdText}</span>}
                      </li>
                    )
                  })}
                </ul>
                <Link className="price-btn--paid" href="/courses">
                  <span>View course details</span>
                  <ArrowRight size={15} />
                </Link>
                <small>A live exchange rate is used for currency equivalents.</small>
              </div>

              {/* Personal mentorship */}
              <div className="price-card price-card--mentorship">
                <div className="price-top">
                  <span className="plan-label">PERSONAL MENTORSHIP</span>
                  <span className="mentorship-tag">ONE TO ONE</span>
                </div>
                <div className="price-amount">
                  <span className="price-val">Personal</span>
                  <span className="price-period">guidance</span>
                </div>
                <p className="price-tagline">Work directly with a mentor on your learning goals.</p>
                <ul>
                  <li><MessageCircle size={15} /> Get help choosing a learning direction</li>
                  <li><MessageCircle size={15} /> Ask for feedback on a project or draft</li>
                  <li><MessageCircle size={15} /> Discuss how to apply a skill to a practical task</li>
                </ul>
                <a
                  className="price-btn--mentorship"
                  href="https://wa.me/2347018643642?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20personal%20mentorship%20with%20ituwaAfrica."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Ask about mentorship</span>
                  <ArrowRight size={15} />
                </a>
                <small>Ask about the format and current availability. Mentorship does not guarantee clients, employment or income.</small>
              </div>

            </div>
          </div>
        </section>

        {/* ── 6. Closing CTA ── */}
        <section className="closing-cta">
          <div className="eyebrow">START WITH WHAT YOU CAN LEARN</div>
          <h2>
            Start with a skill you want to learn.<br />
            <em>Build something useful as you practise.</em>
          </h2>
          <p className="closing-cta-sub">
            Start with free AI Foundations, then explore specialist courses in content marketing, app development, video creation, YouTube monetization and graphic design.
          </p>
          <div className="closing-cta-actions">
            <Link className="button button-dark" href={isAuthenticated ? "/dashboard" : "/courses"}>
              <span>{isAuthenticated ? 'Go to your dashboard' : 'Start with AI Foundations'}</span>
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-outline-warm" href="#academies">
            <span>Explore the academies</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-main">
          <Brand />
          <p>Learn a skill. Try it out.<br />Make work you can stand behind.</p>
          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <Link href="/courses">Courses</Link>
              <Link href="/quiz">Skill Assessment</Link>
              <a href="#academies">Courses</a>
              <a href="#pricing">Mentorship</a>
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
          <span>© 2026 ituwaAfrica. Practical learning, at your own pace.</span>
          <span>Learn digital skills. Build real things.</span>
        </div>
      </footer>

      {/* Fixed bottom navigation for authenticated mobile users */}
      {isAuthenticated && <AppBottomNav active="dashboard" />}

      {/* ── WhatsApp floating button ── */}
      <a
        href="https://wa.me/2347018643642?text=Hi%20ituwaAfrica%2C%20I%20have%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp SVG icon : no external dependency */}
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path
            d="M23.472 8.516A10.368 10.368 0 0 0 16.01 5.5C10.733 5.5 6.44 9.794 6.44 15.07c0 1.69.44 3.34 1.278 4.793L6.37 24.5l4.76-1.249a10.4 10.4 0 0 0 4.876 1.237h.004c5.275 0 9.57-4.294 9.57-9.57a9.52 9.52 0 0 0-2.108-6.402Zm-7.462 14.724h-.003a8.636 8.636 0 0 1-4.404-1.207l-.316-.187-3.274.858.874-3.19-.206-.327a8.63 8.63 0 0 1-1.323-4.617c0-4.77 3.882-8.65 8.655-8.65a8.598 8.598 0 0 1 6.118 2.534 8.598 8.598 0 0 1 2.531 6.12c-.002 4.771-3.882 8.666-8.652 8.666Zm4.747-6.483c-.26-.13-1.538-.759-1.776-.846-.238-.087-.41-.13-.583.13-.173.26-.67.846-.82 1.02-.152.173-.303.195-.563.065-.26-.13-1.098-.405-2.09-1.29-.773-.688-1.294-1.538-1.446-1.797-.152-.26-.016-.4.114-.53.117-.116.26-.302.39-.453.13-.152.173-.26.26-.433.086-.173.043-.325-.022-.455-.065-.13-.583-1.405-.8-1.924-.21-.505-.424-.436-.583-.444l-.497-.009c-.173 0-.455.065-.693.325-.238.26-.909.888-.909 2.165s.931 2.511 1.061 2.684c.13.173 1.832 2.797 4.44 3.922.62.268 1.104.428 1.482.548.622.198 1.19.17 1.637.103.499-.074 1.538-.629 1.754-1.236.217-.607.217-1.128.152-1.236-.065-.109-.238-.173-.498-.303Z"
            fill="#fff"
          />
        </svg>
        <span className="whatsapp-float-label">Chat with us</span>
      </a>
    </div>
  )
}
