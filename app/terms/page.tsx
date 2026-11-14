import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react'
import Brand from '@/components/brand'

export const metadata: Metadata = {
  title: 'Terms of Service | ituwaAfrica',
  description:
    'Clear, honest terms governing the use of the ituwaAfrica learning platform, courses, projects, and subscriptions.',
}

export default function TermsPage() {
  return (
    <div className="legal-shell">
      {/* ── Top Header ── */}
      <header className="legal-header">
        <div className="legal-header-inner">
          <Brand />
          <div className="legal-header-actions">
            <Link href="/" className="legal-back-link">
              <ArrowLeft size={16} /> Back to home
            </Link>
            <Link href="/courses" className="button button-dark legal-cta-btn">
              <span>Browse courses</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-kicker">LEGAL & ETHICAL FRAMEWORK</span>
          <h1>Terms of Service</h1>
          <p className="legal-effective-date">
            Effective Date: November 2026 · Last Reviewed: November 2026
          </p>
          <p className="legal-intro-lead">
            ituwaAfrica is committed to honest, practical education. We believe learning terms should be
            transparent, plain-language, and built on mutual respect rather than dense legalese.
          </p>
        </div>
      </section>

      {/* ── Main Legal Content ── */}
      <main className="legal-content-wrap">
        <div className="legal-grid">
          {/* Navigation index sidebar */}
          <aside className="legal-nav-sidebar">
            <div className="legal-nav-box">
              <span className="legal-nav-title">TABLE OF CONTENTS</span>
              <nav className="legal-nav-links">
                <a href="#overview">01. Educational Scope & Identity</a>
                <a href="#eligibility">02. Account Creation & Integrity</a>
                <a href="#ownership">03. Project Ownership & Content</a>
                <a href="#learning">04. Learning Objects & Certificates</a>
                <a href="#payments">05. Subscriptions, Fees & Cancellations</a>
                <a href="#creator">06. Creator Economy & YouTube Rules</a>
                <a href="#conduct">07. Acceptable Conduct & Termination</a>
                <a href="#liability">08. Disclaimers & Contact</a>
              </nav>
            </div>
          </aside>

          {/* Detailed Document Body */}
          <article className="legal-body">
            <section id="overview" className="legal-section">
              <div className="section-index-tag">01</div>
              <h2>Educational Scope & Purpose</h2>
              <p>
                ituwaAfrica (&quot;the Platform&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates an Africa-focused practical
                AI learning and professional skills platform. Our mission is to equip learners, aspiring freelancers,
                and digital creators with commercially useful capabilities.
              </p>
              <div className="legal-highlight-box">
                <CheckCircle2 size={18} />
                <div>
                  <strong>No Employment or Income Guarantees:</strong>
                  <p>
                    ituwaAfrica provides skill training, structured practice, and guided feedback. We do not operate
                    an employment placement agency and never guarantee jobs, freelance earnings, client contracts, or
                    specific monetization approval from third-party platforms.
                  </p>
                </div>
              </div>
            </section>

            <section id="eligibility" className="legal-section">
              <div className="section-index-tag">02</div>
              <h2>Account Creation & Security</h2>
              <p>
                To access authenticated learning modules, submit project files, and track lesson progress, you must
                create an account with a valid email address.
              </p>
              <ul>
                <li>You are responsible for safeguarding your login credentials.</li>
                <li>One person per account: Sharing account credentials across teams or cohorts without institutional authorization is strictly prohibited.</li>
                <li>You must provide accurate profile details and promptly update them if they change.</li>
              </ul>
            </section>

            <section id="ownership" className="legal-section">
              <div className="section-index-tag">03</div>
              <h2>Project Ownership & Intellectual Property</h2>
              <p>
                We believe in honoring student labor and creator rights:
              </p>
              <div className="legal-two-col">
                <div className="legal-col-card">
                  <h4>What You Own</h4>
                  <p>
                    You retain 100% intellectual property ownership of any original work, prompts, YouTube scripts,
                    code samples, design assets, or project deliverables you create and submit on the platform.
                  </p>
                </div>
                <div className="legal-col-card">
                  <h4>What We Own</h4>
                  <p>
                    ituwaAfrica retains exclusive ownership of our course curricula, text lessons, proprietary frameworks,
                    code templates, brand trademarks, and platform software. You may not scrape, copy, or redistribute
                    course material without written permission.
                  </p>
                </div>
              </div>
            </section>

            <section id="learning" className="legal-section">
              <div className="section-index-tag">04</div>
              <h2>Learning Objects & Certificate Issuance</h2>
              <p>
                Certificates of completion are issued strictly based on verifiable, database-recorded completion of
                required lessons, quizzes, and project assessments.
              </p>
              <ul>
                <li>Certificates must be earned through individual effort and assessment.</li>
                <li>We do not fabricate certificates or issue completion badges for unfinished coursework.</li>
                <li>ituwaAfrica reserves the right to revoke any certificate obtained through automated bots, spoofed requests, or unauthorized work duplication.</li>
              </ul>
            </section>

            <section id="payments" className="legal-section">
              <div className="section-index-tag">05</div>
              <h2>Subscriptions, Fees & Fair Cancellation</h2>
              <p>
                Access to free starter modules requires only account registration. Access to advanced academies and
                pro sprints is billed according to transparent, advertised fees in Nigerian Naira (NGN) or local currencies.
              </p>
              <ul>
                <li><strong>No Hidden Recurring Traps:</strong> Subscription billing dates and renewal intervals are clearly displayed prior to checkout.</li>
                <li><strong>Cancellation:</strong> You may cancel recurring memberships at any time directly from your dashboard settings. Upon cancellation, your access remains active until the end of your prepaid billing period.</li>
                <li><strong>Refund Policy:</strong> If you experience technical failure preventing course access within 7 days of purchase, contact support at <code>hello@ituwa.africa</code> for a full review.</li>
              </ul>
            </section>

            <section id="creator" className="legal-section">
              <div className="section-index-tag">06</div>
              <h2>Creator Economy & YouTube Academy Rules</h2>
              <p>
                For learners enrolled in our YouTube and creator tracks, coursework distinguishes between ethical channel
                development and platform policy compliance:
              </p>
              <ul>
                <li>You are taught to create original and valuable content. Using AI tools to mass-produce spam or inauthentic content violates our core principles.</li>
                <li>Learners are required to adhere to YouTube Community Guidelines, Partner Program eligibility rules, and AI disclosure regulations.</li>
                <li>We do not teach or endorse bot traffic, artificial view manipulation, or copyright infringement.</li>
              </ul>
            </section>

            <section id="conduct" className="legal-section">
              <div className="section-index-tag">07</div>
              <h2>Acceptable Conduct & Termination</h2>
              <p>
                ituwaAfrica maintains zero tolerance for harassment, hate speech, malicious script injection, or unauthorized
                reverse-engineering of our server endpoints.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that deliberately violate these terms, attempt to bypass
                security controls, or abuse fellow community members.
              </p>
            </section>

            <section id="liability" className="legal-section">
              <div className="section-index-tag">08</div>
              <h2>Disclaimers & Contact Information</h2>
              <p>
                Our services are provided &quot;as is&quot; and &quot;as available&quot;. While we strive for maximum uptime and reliability
                across African networks, we are not liable for external internet service disruptions or third-party API outages.
              </p>
              <div className="legal-contact-card">
                <h3>Questions or Clarifications?</h3>
                <p>Reach out directly to the ituwaAfrica administration team:</p>
                <p>
                  Email: <a href="mailto:hello@ituwa.africa">hello@ituwa.africa</a><br />
                  Data & Legal Representative: Lagos, Nigeria
                </p>
                <div className="legal-contact-actions">
                  <Link href="/privacy" className="button button-light">
                    Review Privacy Policy <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <span>© 2026 ituwaAfrica. Honest education for real work.</span>
          <div className="legal-footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/quiz">Skill Assessment</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
