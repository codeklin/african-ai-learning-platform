'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
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
            {isAuthenticated ? (
              <Link className="login-link" onClick={() => setOpen(false)} href="/dashboard">Dashboard</Link>
            ) : (
              <Link className="login-link" onClick={() => setOpen(false)} href="/login">Log in</Link>
            )}
            {isAuthenticated ? (
              <Link className="button button-dark nav-cta" onClick={() => setOpen(false)} href="/dashboard">
                <span>Dashboard</span>
                <ArrowRight size={15} />
              </Link>
            ) : (
              <Link className="button button-dark nav-cta" onClick={() => setOpen(false)} href="/courses">
                <span>Start learning</span>
                <ArrowRight size={15} />
              </Link>
            )}
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
            <div className="hero-note">
              <span className="hero-note-index">01</span>
              TIRED OF AI TUTORIALS THAT DON&apos;T HELP YOU EARN?
            </div>
            <h1>
              Stop watching AI hype.<br />
              <span>Learn practical skills you can actually earn with.</span>
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
        <section className="section who-section">
          {/* Ambient blurred backdrop shapes */}
          <div className="who-ambient-blob who-ambient-blob--left" aria-hidden="true" />
          <div className="who-ambient-blob who-ambient-blob--right" aria-hidden="true" />

          <div className="who-container">
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
                  <span className="who-stamp who-stamp--coral">₦50K – ₦250K / BRIEF</span>
                </div>
                <h3>Package real services clients pay for</h3>
                <p>
                  Tired of bidding with generic proposals? Learn how to package real AI services clients pay ₦50k–₦250k for. Build portfolio samples that prove your value before you pitch.
                </p>
                <div className="who-specimen who-specimen--coral">
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
                  <span className="who-stamp who-stamp--amber">ZERO CAMERA REQUIRED</span>
                </div>
                <h3>Launch channels without showing your face</h3>
                <p>
                  Want to start YouTube without buying expensive cameras or showing your face? Build faceless channel systems, hook-driven scripts, and original content that earns over time.
                </p>
                <div className="who-specimen who-specimen--amber">
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
                  <span className="who-stamp who-stamp--sage">4+ HOURS RECLAIMED</span>
                </div>
                <h3>Reclaim 4+ hours every single day</h3>
                <p>
                  Stop doing repetitive manual tasks. Learn prompt pipelines and lightweight automations that handle client replies, graphics, and order summaries automatically.
                </p>
                <div className="who-specimen who-specimen--sage">
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

        {/* ── 5. Free Starter Access ── */}
        <section id="pricing" className="pricing-section">
          <div className="section pricing-inner">
            <div className="pricing-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> ZERO FINANCIAL BARRIER</div>
              <h2>Start free.<br />Build real capability first.</h2>
              <p>
                No credit card required. No foreign currency complications. Just structured, practical lessons you can finish on your phone and start applying immediately.
              </p>
              <div className="pricing-highlights">
                <div className="pricing-hl-item">
                  <span className="pricing-hl-num">01</span>
                  <div>
                    <strong>100% Free Starter Access</strong>
                    <p>Access foundational modules across all academies at zero cost.</p>
                  </div>
                </div>
                <div className="pricing-hl-item">
                  <span className="pricing-hl-num">02</span>
                  <div>
                    <strong>Low-Bandwidth Mobile Friendly</strong>
                    <p>High-compression text-first walk-throughs designed for Nigerian network stability.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="price-card">
              <div className="price-top">
                <span className="plan-label">ITUWA AFRICA / EXPLORER</span>
                <span className="free-tag">ALWAYS FREE</span>
              </div>
              <div className="price-amount">
                <span className="price-val">₦0</span>
                <span className="price-period">forever</span>
              </div>
              <h3>Curiosity has no cover charge.</h3>
              <p>Start learning today. Build portfolio projects and develop skills you can earn with.</p>
              <ul>
                <li><Check size={15} /> Free starter courses in all core academies</li>
                <li><Check size={15} /> Personal learner dashboard and progress tracking</li>
                <li><Check size={15} /> Daily practical micro-challenges</li>
                <li><Check size={15} /> Works cleanly on mobile browsers and slow networks</li>
              </ul>
              <Link className="button button-light" href={isAuthenticated ? "/dashboard" : "/signup"}>
                <span>{isAuthenticated ? 'Go to your dashboard' : 'Create free account'}</span>
                <ArrowRight size={16} />
              </Link>
              <small>No card required. Learn at your own pace.</small>
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
    </div>
  )
}
