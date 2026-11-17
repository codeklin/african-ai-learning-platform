'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  MessageCircle,
  User,
} from 'lucide-react'
import Brand from '@/components/brand'
import { BOOK_DATA } from '@/data/book'

export default function BookPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [coverError, setCoverError] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="book-page-wrap">
      {/* ── Top Navigation Bar ── */}
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav className="main-nav" aria-label="Book page navigation">
            <Link href="/courses">Courses</Link>
            <Link href="/quiz">Skill Assessment</Link>
            <Link href="/book" className="nav-link-active">
              Book
            </Link>
          </nav>
          <div className="nav-actions">
            <Link href="/" className="catalog-back">
              <ArrowLeft size={15} />
              <span>Back home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="book-hero-section">
        <div className="book-hero-inner">
          {/* Left: Book Cover / Mockup */}
          <div className="book-cover-col">
            <div className="book-cover-card">
              {!coverError ? (
                <Image
                  src={BOOK_DATA.coverImage}
                  alt={BOOK_DATA.title}
                  width={380}
                  height={540}
                  priority
                  className="book-cover-img"
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="book-cover-placeholder">
                  <div className="book-spine-line" />
                  <span className="book-ph-kicker">THE 30-DAY SYSTEM</span>
                  <h3 className="book-ph-title">{BOOK_DATA.title}</h3>
                  <p className="book-ph-sub">{BOOK_DATA.subtitle}</p>
                  <div className="book-ph-foot">
                    <span>{BOOK_DATA.author}</span>
                    <small>{BOOK_DATA.publisher}</small>
                  </div>
                </div>
              )}
              <div className="book-cover-badge">
                <Download size={14} />
                <span>{BOOK_DATA.formats}</span>
              </div>
            </div>
          </div>

          {/* Right: Book Copy & Buy Actions */}
          <div className="book-hero-copy">
            <span className="book-eyebrow">BY {BOOK_DATA.author.toUpperCase()}</span>
            <h1 className="book-hero-h1">{BOOK_DATA.hero.headline}</h1>
            <p className="book-hero-subhead">{BOOK_DATA.hero.subhead}</p>

            {/* Outbound Purchase Buttons */}
            <div className="book-buy-box">
              <span className="book-price-badge">{BOOK_DATA.hero.badge}</span>
              <div className="book-buttons-group">
                <a
                  href={BOOK_DATA.purchaseLinks.nestuge}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-dark book-store-btn"
                >
                  <span>Buy on Nestuge ({BOOK_DATA.price})</span>
                  <ExternalLink size={15} />
                </a>
              </div>
              <p className="book-micro-note">
                {BOOK_DATA.hero.badge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: The Problem ── */}
      <section className="book-editorial-section section-bg-oat">
        <div className="book-content-container">
          <span className="book-section-kicker">01 / REALITY CHECK</span>
          <h2 className="book-section-h2">{BOOK_DATA.sections.problem.title}</h2>
          <p className="book-section-lead">{BOOK_DATA.sections.problem.body}</p>
        </div>
      </section>

      {/* ── Section 2: Why I Wrote It ── */}
      <section className="book-editorial-section section-bg-warm">
        <div className="book-content-container">
          <span className="book-section-kicker">02 / PERSONAL STORY</span>
          <h2 className="book-section-h2">{BOOK_DATA.sections.whyIWroteIt.title}</h2>
          <div className="book-story-quote">
            <p>{BOOK_DATA.sections.whyIWroteIt.body}</p>
          </div>
        </div>
      </section>

      {/* ── Section 3: What the 30-Day System Does ── */}
      <section className="book-editorial-section section-bg-oat">
        <div className="book-content-container">
          <span className="book-section-kicker">03 / THE METHOD</span>
          <h2 className="book-section-h2">{BOOK_DATA.sections.system.title}</h2>
          <p className="book-section-lead">{BOOK_DATA.sections.system.body}</p>
        </div>
      </section>

      {/* ── Section 4 & 5: Who It Is For vs Who It Is Not For ── */}
      <section className="book-editorial-section section-bg-cards">
        <div className="book-content-container">
          <div className="book-split-grid">
            {/* Who it is for */}
            <div className="book-qualify-card for-card">
              <div className="book-qualify-top">
                <span className="book-qualify-badge badge-green">WHO THIS IS FOR</span>
                <h3>{BOOK_DATA.sections.whoItIsFor.title}</h3>
              </div>
              <ul className="book-qualify-list">
                {BOOK_DATA.sections.whoItIsFor.items.map((item, idx) => (
                  <li key={idx}>
                    <Check size={18} className="qualify-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it is not for */}
            <div className="book-qualify-card not-card">
              <div className="book-qualify-top">
                <span className="book-qualify-badge badge-coral">NOT FOR YOU IF</span>
                <h3>{BOOK_DATA.sections.whoItIsNotFor.title}</h3>
              </div>
              <ul className="book-qualify-list">
                {BOOK_DATA.sections.whoItIsNotFor.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="qualify-x-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: What Is Inside (Table of Contents) ── */}
      <section className="book-editorial-section section-bg-oat">
        <div className="book-content-container">
          <div className="section-heading">
            <span className="book-section-kicker">04 / TABLE OF CONTENTS</span>
            <h2 className="book-section-h2">{BOOK_DATA.sections.tableOfContents.title}</h2>
            <p className="section-subheading">{BOOK_DATA.sections.tableOfContents.note}</p>
          </div>

          <div className="book-chapters-grid">
            {BOOK_DATA.sections.tableOfContents.chapters.map((ch, idx) => (
              <div key={idx} className="book-chapter-item">
                <span className="book-chapter-num">
                  {typeof ch.number === 'number'
                    ? String(ch.number).padStart(2, '0')
                    : ch.number}
                </span>
                <div className="book-chapter-content">
                  <span className="book-chapter-title">{ch.title}</span>
                  {ch.description && (
                    <p className="book-chapter-desc">{ch.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="book-chapters-more-note">
            <span>
              + Complete 10 chapters, daily field tests, writing worksheets, and voice boundaries included in the full package.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 7: About the Author ── */}
      <section className="book-editorial-section section-bg-warm">
        <div className="book-content-container">
          <div className="book-author-card">
            <div className="book-author-avatar">
              {BOOK_DATA.authorImage ? (
                <Image
                  src={BOOK_DATA.authorImage}
                  alt={BOOK_DATA.author}
                  width={96}
                  height={96}
                  className="book-author-img"
                />
              ) : (
                <User size={36} />
              )}
            </div>
            <div className="book-author-info">
              <span className="book-section-kicker">THE AUTHOR</span>
              <h2 className="book-author-name">{BOOK_DATA.author}</h2>
              <span className="book-author-title">Founder, {BOOK_DATA.publisher}</span>
              <p className="book-author-bio">{BOOK_DATA.sections.authorBio.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: FAQ Accordion ── */}
      <section className="book-editorial-section section-bg-oat">
        <div className="book-content-container">
          <div className="section-heading">
            <span className="book-section-kicker">05 / CLARITY</span>
            <h2 className="book-section-h2">{BOOK_DATA.sections.faq.title}</h2>
            <p className="section-subheading">
              Plain answers to common questions about formats, delivery, and work required.
            </p>
          </div>

          <div className="book-faq-accordion">
            {BOOK_DATA.sections.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx
              const isQuestionsItem = item.question.toLowerCase().includes('question')
              return (
                <div
                  key={idx}
                  className={`book-faq-card ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="book-faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`book-faq-caret ${isOpen ? 'open' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="book-faq-answer">
                      <p>{item.answer}</p>
                      {isQuestionsItem && (
                        <a
                          href={BOOK_DATA.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="book-whatsapp-link"
                        >
                          <MessageCircle size={15} />
                          <span>Chat directly with us on WhatsApp</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Floating Bar / Sticky Buy Banner on Mobile ── */}
      <section className="book-bottom-cta">
        <div className="book-bottom-inner">
          <div>
            <h3>Stop sounding like everyone else.</h3>
            <span>{BOOK_DATA.price} · {BOOK_DATA.formats} · Instant download</span>
          </div>
          <div className="book-bottom-actions">
            <a
              href={BOOK_DATA.purchaseLinks.nestuge}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-dark"
            >
              <span>Buy on Nestuge ({BOOK_DATA.price})</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Site Footer ── */}
      <footer className="site-footer">
        <div className="footer-main">
          <Brand />
          <p>
            An independent African learning publication. We build tools, books, and courses for practical creators and digital professionals.
          </p>
        </div>
        <div className="footer-bottom">
          <span>{BOOK_DATA.publisher}. All rights reserved.</span>
          <span>Digital edition. No print edition.</span>
        </div>
      </footer>
    </div>
  )
}
