import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, EyeOff, UserCheck, FileText } from 'lucide-react'
import Brand from '@/components/brand'

export const metadata: Metadata = {
  title: 'Privacy Policy | ituwaAfrica',
  description: 'How ituwaAfrica uses account and learning information.',
}

export default function PrivacyPage() {
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
          <span className="legal-kicker">DATA PROTECTION & PRIVACY</span>
          <h1>Privacy Policy</h1>
          <p className="legal-effective-date">
            Effective Date: November 2026 · Last Reviewed: November 2026
          </p>
          <p className="legal-intro-lead">
            ituwaAfrica uses account and learning information to operate the platform. This notice explains how that
            information is handled.
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
                <a href="#principles">01. Non-Negotiable Privacy Rules</a>
                <a href="#collection">02. Information We Collect</a>
                <a href="#usage">03. How We Use Your Data</a>
                <a href="#ai-integration">04. AI Integrations & Disclosures</a>
                <a href="#security">05. Data Storage & Security</a>
                <a href="#rights">06. Your Legal Rights (NDPA)</a>
                <a href="#retention">07. Data Retention & Deletion</a>
                <a href="#contact">08. Contact the Data Protection Lead</a>
              </nav>
            </div>
          </aside>

          {/* Detailed Document Body */}
          <article className="legal-body">
            <section id="principles" className="legal-section">
              <div className="section-index-tag">01</div>
              <h2>Our Non-Negotiable Privacy Commitments</h2>
              <p>These commitments describe how ituwaAfrica handles account and learning information.</p>
              <div className="privacy-card-grid">
                <div className="privacy-stat-card">
                  <div className="privacy-icon-box">
                    <EyeOff size={20} />
                  </div>
                  <h4>No Selling Learner Data</h4>
                  <p>We never sell, rent, broker, or monetize your personal information or contact details to third-party ad networks.</p>
                </div>
                <div className="privacy-stat-card">
                  <div className="privacy-icon-box">
                    <Lock size={20} />
                  </div>
                  <h4>Administrator access</h4>
                  <p>Admin pages and actions check the signed-in account&apos;s assigned administrator role on the server.</p>
                </div>
                <div className="privacy-stat-card">
                  <div className="privacy-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <h4>AI-assisted features</h4>
                  <p>Text or other information you submit to an AI feature may be processed by the provider that supports it. Avoid submitting sensitive personal information.</p>
                </div>
              </div>
            </section>

            <section id="collection" className="legal-section">
              <div className="section-index-tag">02</div>
              <h2>Information We Collect</h2>
              <p>
                We only collect data that directly supports your learning workflow:
              </p>
              <ul>
                <li><strong>Account Information:</strong> Email address and display name managed through Supabase Auth.</li>
                <li><strong>Learning Progress:</strong> Course enrollments and lesson-completion records where those features are available.</li>
                <li><strong>Project Submissions:</strong> Project files submitted through available upload workflows may be stored using Supabase Storage.</li>
                <li><strong>Assessment & Preferences:</strong> Skill-assessment answers are used in your browser to show a course recommendation. Your selected study time is stored in your browser and does not schedule a notification from ituwaAfrica.</li>
                <li><strong>Calendar Reminders:</strong> If you choose a calendar option, an event draft is prepared for Google Calendar or an `.ics` file is downloaded for your calendar app. Your calendar provider handles its reminders.</li>
                <li><strong>Course Payments:</strong> Paid course payments are made by direct bank transfer. Confirm course-specific payment and access details before transferring.</li>
                <li><strong>Site Analytics:</strong> Vercel Analytics is enabled on production pages to measure website usage.</li>
              </ul>
            </section>

            <section id="usage" className="legal-section">
              <div className="section-index-tag">03</div>
              <h2>How We Use Your Data</h2>
              <p>
                We use information to provide and maintain platform features, including:
              </p>
              <ul>
                <li><strong>Course Delivery & Account Maintenance:</strong> Tracking your progress so you can pause and resume lessons across devices without losing your place.</li>
                <li><strong>Account Messages:</strong> Sending password-reset messages and service notices. Calendar reminders are prepared only when you choose a calendar option.</li>
              </ul>
            </section>

            <section id="ai-integration" className="legal-section">
              <div className="section-index-tag">04</div>
              <h2>AI Integrations & Ethical Disclosures</h2>
              <p>
                Some learning features use generative AI. Information submitted to an AI feature may be processed by the provider that supports that feature.
              </p>
              <ul>
                <li>Do not submit sensitive personal information unless the feature specifically requires it.</li>
                <li>The specific AI provider and its data-retention practices are not documented in this application. Avoid submitting personal or confidential details until those are disclosed for the feature.</li>
              </ul>
            </section>

            <section id="security" className="legal-section">
              <div className="section-index-tag">05</div>
              <h2>Data Storage & Security</h2>
              <p>
                ituwaAfrica uses Supabase Auth and Supabase-hosted services for accounts and platform records. Administrative actions check the signed-in account&apos;s assigned role on the server. Database access policies and infrastructure encryption settings depend on service configuration and have not been independently verified here.
              </p>
            </section>

            <section id="rights" className="legal-section">
              <div className="section-index-tag">06</div>
              <h2>Your Legal Rights (NDPA / NDPR)</h2>
              <p>
                As a learner in Nigeria and across the continent, you hold explicit statutory rights under data protection laws:
              </p>
              <div className="legal-highlight-box">
                <UserCheck size={18} />
                <div>
                  <strong>Your Statutory Rights:</strong>
                  <ul>
                    <li><strong>Right to Access:</strong> You may request a copy of the account and learning information held about you by contacting <a href="mailto:ituwaafrica@gmail.com">ituwaafrica@gmail.com</a>.</li>
                    <li><strong>Right to Rectification:</strong> Contact <a href="mailto:ituwaafrica@gmail.com">ituwaafrica@gmail.com</a> to request correction of inaccurate account details.</li>
                    <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request permanent deletion of your account and all associated submissions.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="retention" className="legal-section">
              <div className="section-index-tag">07</div>
              <h2>Data Retention & Account Deletion</h2>
              <p>
                We retain your account data for as long as your account remains active. If you wish to delete your
                account permanently:
              </p>
              <p>
                Submit a request from your registered email address to <code>ituwaafrica@gmail.com</code> with the subject line &quot;Delete My Account&quot;. We will purge your personal identifiers and project records from our active database within 5 working days.
              </p>
            </section>

            <section id="contact" className="legal-section">
              <div className="section-index-tag">08</div>
              <h2>Contact the Data Protection Officer</h2>
              <div className="legal-contact-card">
                <h3>Have Privacy Concerns or Requests?</h3>
                <p>
                  Contact our Data Protection and Compliance Lead:
                </p>
                <p>
                  Email: <a href="mailto:ituwaafrica@gmail.com">ituwaafrica@gmail.com</a><br />
                  Location: Lagos, Nigeria<br />
                  Response Window: Within 5 working days
                </p>
                <div className="legal-contact-actions">
                  <Link href="/terms" className="button button-light">
                    Read Terms of Service <ArrowRight size={14} />
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
          <span>© 2026 ituwaAfrica. Data integrity and learner privacy respected.</span>
          <div className="legal-footer-links">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/quiz">Skill Assessment</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
