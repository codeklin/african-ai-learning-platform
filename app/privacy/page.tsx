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
                <a href="#security">05. Storage, Encryption & RLS</a>
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
              <p>
                In alignment with Section 18 of the ituwaAfrica Business Bible, the following core principles are
                absolute:
              </p>
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
                  <h4>Row-Level Security Protection</h4>
                  <p>All database tables enforce strict Postgres Row-Level Security (RLS). You can only access your own private records.</p>
                </div>
                <div className="privacy-stat-card">
                  <div className="privacy-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <h4>No AI Identity Leakage</h4>
                  <p>Student names, emails, and confidential project submissions are never transmitted to third-party AI APIs without explicit intent.</p>
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
                <li><strong>Account Credentials:</strong> Email address, encrypted authentication tokens, and user display name (via Supabase Auth).</li>
                <li><strong>Learning Progress Records:</strong> Enrolled courses, completed lessons, timestamped quiz results, challenge streaks, and certificates issued.</li>
                <li><strong>Learner Project Submissions:</strong> Form inputs, prompt drafts, and project portfolio files uploaded to Supabase Storage.</li>
                <li><strong>Diagnostic & Preference Data:</strong> Responses to the Skill Assessment Quiz (`/quiz`) and onboarding preferences (e.g., study reminder slots).</li>
                <li><strong>Billing References:</strong> Transaction identifiers and payment status provided by licensed payment processors. We never store raw credit card numbers or PINs on our servers.</li>
              </ul>
            </section>

            <section id="usage" className="legal-section">
              <div className="section-index-tag">03</div>
              <h2>How We Use Your Data</h2>
              <p>
                Your information is processed under the following lawful bases under the Nigeria Data Protection Act (NDPA):
              </p>
              <ul>
                <li><strong>Course Delivery & Account Maintenance:</strong> Tracking your progress so you can pause and resume lessons across devices without losing your place.</li>
                <li><strong>Honest Certification:</strong> Verifying lesson and assessment completion records to issue authentic, employer-verifiable certificates.</li>
                <li><strong>Platform Improvements:</strong> Aggregated, anonymized learning analytics (e.g., which lessons are frequently re-read or have drop-offs) to improve curriculum quality.</li>
                <li><strong>Important Account Notices:</strong> Sending critical security alerts, password resets, and optional study streak reminders.</li>
              </ul>
            </section>

            <section id="ai-integration" className="legal-section">
              <div className="section-index-tag">04</div>
              <h2>AI Integrations & Ethical Disclosures</h2>
              <p>
                ituwaAfrica incorporates generative AI models (such as Google Gemini) to provide learning assistance and prompt analysis:
              </p>
              <ul>
                <li><strong>Server-Side Processing Only:</strong> All AI interactions are processed through secure server-side route handlers. API keys are never exposed in browser bundles.</li>
                <li><strong>No Personal Profile Transmission:</strong> When you use an AI learning assistant, only the exercise context and your immediate prompt query are sent to the model — your email, name, and account records are excluded.</li>
                <li><strong>Human-in-the-Loop:</strong> AI tools on ituwaAfrica are designed to assist and teach you, not replace human judgment.</li>
              </ul>
            </section>

            <section id="security" className="legal-section">
              <div className="section-index-tag">05</div>
              <h2>Storage, Encryption & Data Security</h2>
              <p>
                We employ modern software architecture standards to protect your records:
              </p>
              <ul>
                <li>Encrypted data in transit via Transport Layer Security (TLS 1.3 / HTTPS).</li>
                <li>Encrypted data at rest using Supabase / PostgreSQL hosted infrastructure.</li>
                <li>Role-based access control: Administrative privileges are strictly enforced server-side using trusted role assignments, not client-side state.</li>
              </ul>
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
                    <li><strong>Right to Access:</strong> You may request a complete export of your personal profile and learning progress data.</li>
                    <li><strong>Right to Rectification:</strong> You may update or correct inaccurate profile details from your Profile page.</li>
                    <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request permanent deletion of your account and all associated submissions.</li>
                    <li><strong>Right to Withdraw Consent:</strong> You may opt out of non-critical reminder emails at any time.</li>
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
