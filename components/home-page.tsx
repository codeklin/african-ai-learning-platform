'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, MessageCircle, ShieldCheck } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { useUser } from '@/hooks/use-user'
import type { User } from '@supabase/supabase-js'

const featuredAcademies = [
  {
    number: '01',
    title: 'AI Freelancing & Client Services',
    detail: 'Package real services that clients pay for. Build proposals, deliver work, and get repeat business.',
    href: '/courses',
    tone: 'coral',
    tag: 'Highest demand',
  },
  {
    number: '02',
    title: 'Creator Economy & YouTube',
    detail: 'Start a channel, grow without showing your face, and build media assets that earn over time.',
    href: '/courses',
    tone: 'lavender',
    tag: 'New academy',
  },
  {
    number: '03',
    title: 'AI Foundations & Prompt Craft',
    detail: 'Stop getting useless outputs. Learn how to give AI clear instructions and get real results.',
    href: '/courses',
    tone: 'lime',
    tag: 'Start here',
  },
]

const steps = [
  {
    number: '01',
    title: 'Pick a real problem',
    text: 'Choose one service or workflow you want to offer or fix. No bloated 40-hour syllabus.',
  },
  {
    number: '02',
    title: 'Practice on real briefs',
    text: 'Build actual deliverables — client proposals, video hooks, prompt chains — not multiple-choice tests.',
  },
  {
    number: '03',
    title: 'Ship and get paid',
    text: 'Leave each track with finished assets you can pitch to clients or launch publicly.',
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
          <a onClick={() => setOpen(false)} href="#academies">Academies</a>
          <a onClick={() => setOpen(false)} href="#how-it-works">How it works</a>
          <a onClick={() => setOpen(false)} href="#pricing">Pricing</a>
          <div className="nav-actions">
            {!isAuthenticated && (
              <Link className="login-link" onClick={() => setOpen(false)} href="/login">Log in</Link>
            )}
            <Link
              className="button button-dark nav-cta"
              onClick={() => setOpen(false)}
              href={isAuthenticated ? '/dashboard' : '/courses'}
            >
              <span>{isAuthenticated ? 'Dashboard' : 'Start learning'}</span>
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
              <strong className="hero-h1-primary">Stop watching AI hype.</strong>
              <span className="hero-h1-secondary">Learn practical skills you can actually earn with.</span>
            </h1>
            <p>
              Most AI tutorials teach you nothing useful. ituwaAfrica shows you how to package real freelance services, launch creator channels, and do work that paying clients actually send money for. No foreign fluff. No high-end laptop required.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark hero-btn-main" href={isAuthenticated ? "/dashboard" : "/courses"}>
                <span>{isAuthenticated ? 'Go to your dashboard' : 'Start learning free'}</span>
                <ArrowRight size={16} />
              </Link>
              <Link className="button button-outline-warm hero-btn-quiz" href="/quiz">
                <span>Take 90-sec Quiz: What Should I Learn?</span>
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ailab1.png"
                  alt="ituwaAfrica learner avatar"
                  className="proof-avatar-img"
                  width={32}
                  height={32}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ailab2.png"
                  alt="ituwaAfrica learner avatar"
                  className="proof-avatar-img"
                  width={32}
                  height={32}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ailab3.png"
                  alt="ituwaAfrica learner avatar"
                  className="proof-avatar-img"
                  width={32}
                  height={32}
                />
              </div>
              <span>Built for Nigerian freelancers, creators, and solo hustlers</span>
            </div>
          </div>
        </section>

        {/* ── 2. Who It's For (Bespoke Editorial Showcase) ── */}
        <section className="who-section">
          {/* Ambient blurred backdrop shapes */}
          <div className="who-ambient-blob who-ambient-blob--left" aria-hidden="true" />
          <div className="who-ambient-blob who-ambient-blob--right" aria-hidden="true" />

          <div className="section who-container">
            <div className="who-header">
              <span className="who-header-kicker">WHO THIS ACTUALLY WORKS FOR</span>
              <h2 className="who-header-title">
                Three real ways people use ituwaAfrica to put money in their account.
              </h2>
            </div>

            <div className="who-grid">
              {/* Card 01: Freelancer */}
              <article className="who-card who-card--freelancer">
                <span className="who-card-watermark" aria-hidden="true">01</span>
                <div className="who-card-top">
                  <span className="who-kicker">01 / FOR THE FREELANCER</span>
                  <span className="who-stamp">₦50K – ₦250K / BRIEF</span>
                </div>
                <h3>Package real services clients pay for</h3>
                <p>
                  Tired of bidding with generic proposals? Learn how to package real AI services clients pay ₦50k–₦250k for. Build portfolio samples that prove your value before you pitch.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Client brief</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>AI system</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Paid invoice</span>
                  </div>
                </div>
              </article>

              {/* Card 02: Creator */}
              <article className="who-card who-card--creator">
                <span className="who-card-watermark" aria-hidden="true">02</span>
                <div className="who-card-top">
                  <span className="who-kicker">02 / FOR THE CREATOR</span>
                  <span className="who-stamp">ZERO CAMERA REQUIRED</span>
                </div>
                <h3>Launch channels without showing your face</h3>
                <p>
                  Want to start YouTube without buying expensive cameras or showing your face? Build faceless channel systems, hook-driven scripts, and original content that earns over time.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Hook blueprint</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Faceless edit</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Media asset</span>
                  </div>
                </div>
              </article>

              {/* Card 03: Solo Hustler */}
              <article className="who-card who-card--hustler">
                <span className="who-card-watermark" aria-hidden="true">03</span>
                <div className="who-card-top">
                  <span className="who-kicker">03 / FOR THE SOLO HUSTLER</span>
                  <span className="who-stamp">4+ HOURS RECLAIMED</span>
                </div>
                <h3>Reclaim 4+ hours every single day</h3>
                <p>
                  Stop doing repetitive manual tasks. Learn prompt pipelines and lightweight automations that handle client replies, graphics, and order summaries automatically.
                </p>
                <div className="who-specimen">
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Customer DM</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step">
                    <span className="specimen-dot" />
                    <span>Auto pipeline</span>
                  </div>
                  <span className="specimen-arrow">➔</span>
                  <div className="specimen-step specimen-step--highlight">
                    <span className="specimen-dot" />
                    <span>Order closed</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 3. 3 Core Academies ── */}
        <section id="academies" className="section academies-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> FOCUSED LEARNING TRACKS</div>
              <h2>Three pathways built<br />to get you earning.</h2>
            </div>
            <p>Pick one track, finish the starter sprint, and build work you can actually point to.</p>
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
                  <span>{academy.tag}</span>
                  <ArrowRight size={15} />
                </div>
              </Link>
            ))}
          </div>
          <div className="academies-footer">
            <Link href="/courses" className="button button-outline-warm">
              <span>Browse all courses & tracks</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── 4. How It Works ── */}
        <section id="how-it-works" className="how-section">
          <div className="section how-inner">
            <div className="how-intro">
              <div className="eyebrow"><span className="eyebrow-line" /> NO MORE WATCHING WITHOUT PRACTICE</div>
              <h2>Knowledge is good.<br /><span>Capability gets paid.</span></h2>
              <p>Watching endless videos feels productive until someone asks to see your work. Here, you practice on real briefs from day one.</p>
              <Link className="text-link" href="/quiz">
                <span>Take the 90-second assessment</span>
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

        {/* ── 5. Pricing (Two Tiers: Free Explorer + AI Learner) ── */}
        <section id="pricing" className="pricing-section">
          <div className="section pricing-inner">

            {/* Section header */}
            <div className="pricing-header">
              <div className="eyebrow"><span className="eyebrow-line" /> THREE WAYS TO LEARN</div>
              <h2>Start free.<br /><span>Upgrade when you&apos;re ready to build real assets.</span></h2>
              <p>
                No foreign currency complications. No pressure. Begin with selected free courses across all academies, unlock full library access, or book direct 1-on-1 mentorship.
              </p>
            </div>

            {/* Column layout for pricing cards */}
            <div className="pricing-cards-column">

              {/* Card 1: Free Explorer */}
              <div className="price-card price-card--free">
                <div className="price-top">
                  <span className="plan-label">FREE EXPLORER</span>
                  <span className="free-tag">START NOW</span>
                </div>
                <div className="price-amount">
                  <span className="price-val">₦0</span>
                  <span className="price-period">/ forever</span>
                </div>
                <p className="price-tagline">Curiosity has no cover charge.</p>
                <ul>
                  <li><Check size={15} /> Selected starter courses across all academies</li>
                  <li><Check size={15} /> Personal learner dashboard and progress tracking</li>
                  <li><Check size={15} /> Daily practical micro-challenges</li>
                  <li><Check size={15} /> Mobile-first, works on slow networks</li>
                </ul>
                <Link className="price-btn--free" href={isAuthenticated ? '/dashboard' : '/signup'}>
                  <span>{isAuthenticated ? 'Go to dashboard' : 'Create free account'}</span>
                  <ArrowRight size={15} />
                </Link>
                <small>No card required. Learn at your own pace.</small>
              </div>

              {/* Card 2: AI Learner (Paid) */}
              <div className="price-card price-card--paid">
                <div className="price-top">
                  <span className="plan-label">AI LEARNER</span>
                  <span className="paid-tag">FULL ACCESS</span>
                </div>
                <div className="price-amount">
                  <span className="price-val">₦20,000</span>
                  <span className="price-period">/ month</span>
                </div>
                <p className="price-tagline">Everything you need to earn with AI.</p>
                <ul>
                  <li><ShieldCheck size={15} /> Full course library and guided learning pathways</li>
                  <li><ShieldCheck size={15} /> Portfolio projects and client-ready brief templates</li>
                  <li><ShieldCheck size={15} /> Graded assessments and instructor feedback</li>
                  <li><ShieldCheck size={15} /> Downloadable prompt libraries and proposal systems</li>
                  <li><ShieldCheck size={15} /> Verified certificate of completion</li>
                </ul>
                <Link className="price-btn--paid" href={isAuthenticated ? '/dashboard' : '/signup'}>
                  <span>Join AI Learner</span>
                  <ArrowRight size={15} />
                </Link>
                <small>Cancel anytime. Built for Nigerian freelancers and creators.</small>
              </div>

              {/* Card 3: 1-on-1 Mentorship */}
              <div className="price-card price-card--mentorship">
                <div className="price-top">
                  <span className="plan-label">1-ON-1 MENTORSHIP</span>
                  <span className="mentorship-tag">DIRECT ACCESS</span>
                </div>
                <div className="price-amount">
                  <span className="price-val" style={{ fontSize: 'clamp(26px, 5vw, 34px)', color: '#E86A58' }}>Custom</span>
                  <span className="price-period">/ session</span>
                </div>
                <p className="price-tagline">Personal guidance. Real feedback. Fast results.</p>
                <ul>
                  <li><MessageCircle size={15} /> 1-on-1 private strategy & consultation session</li>
                  <li><MessageCircle size={15} /> Portfolio & proposal review with honest feedback</li>
                  <li><MessageCircle size={15} /> Custom AI workflow tailored to your specific niche</li>
                  <li><MessageCircle size={15} /> Direct WhatsApp follow-up & voice note support</li>
                </ul>
                <a
                  className="price-btn--mentorship"
                  href="https://wa.me/2347031098097?text=Hi%2C%20I%27m%20interested%20in%20a%201-on-1%20mentorship%20session%20with%20ituwaAfrica."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={15} />
                </a>
                <small>Limited monthly slots. Message directly to book.</small>
              </div>

            </div>
          </div>
        </section>

        {/* ── 6. Closing CTA ── */}
        <section className="closing-cta">
          <div className="eyebrow">START WHERE YOU ARE · BUILD FROM THERE</div>
          <h2>
            Stop waiting for the perfect time.<br />
            <em>Start earning with practical AI today.</em>
          </h2>
          <p className="closing-cta-sub">
            You don&apos;t need a foreign tech degree or an expensive laptop. Pick one track, practice 20 minutes a day, and build work that speaks for itself.
          </p>
          <div className="closing-cta-actions">
            <Link className="button button-dark" href={isAuthenticated ? "/dashboard" : "/courses"}>
              <span>{isAuthenticated ? 'Go to your dashboard' : 'Start learning free'}</span>
              <ArrowRight size={16} />
            </Link>
            <Link className="button button-outline-warm" href="/quiz">
              <span>Take 90-sec Quiz</span>
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

      {/* ── WhatsApp floating button ── */}
      <a
        href="https://wa.me/2347031098097?text=Hi%20ituwaAfrica%2C%20I%20have%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp SVG icon — no external dependency */}
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
