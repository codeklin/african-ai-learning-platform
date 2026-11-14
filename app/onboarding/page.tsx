'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  LayoutDashboard,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import Brand from '@/components/brand'
import { useUser } from '@/hooks/use-user'

interface TrackOption {
  id: string
  title: string
  subtitle: string
  firstCourse: string
  firstCourseSlug: string
  tone: string
  outcome: string
  hoursPerWeek: string
}

const tracks: TrackOption[] = [
  {
    id: 'creator',
    title: 'Creator Economy & YouTube',
    subtitle: 'Plan, script, and launch faceless or personal video channels with structured workflows.',
    firstCourse: 'YouTube Business Fundamentals',
    firstCourseSlug: 'youtube-business-fundamentals',
    tone: 'lavender',
    outcome: 'A published YouTube video or 3-part channel package.',
    hoursPerWeek: '2–3 hours/week',
  },
  {
    id: 'foundations',
    title: 'AI Foundations',
    subtitle: 'Cut through marketing noise, master structured prompt chains, and build everyday AI confidence.',
    firstCourse: 'Your AI Toolkit: A Practical Start',
    firstCourseSlug: 'prompting-better-work',
    tone: 'coral',
    outcome: 'Mastery of structured prompt frameworks and AI tool selection.',
    hoursPerWeek: '2 hours/week',
  },
  {
    id: 'freelance',
    title: 'AI Freelancing',
    subtitle: 'Package tangible AI services, pitch international and Nigerian clients, and build portfolio assets.',
    firstCourse: 'AI for Your Freelance Business',
    firstCourseSlug: 'prompting-better-work',
    tone: 'amber',
    outcome: 'A client-ready service offer, sample deliverable, and pitch script.',
    hoursPerWeek: '4 hours/week',
  },
  {
    id: 'automation',
    title: 'AI Automation',
    subtitle: 'Eliminate repetitive manual tasks by chaining triggers, AI logic, and automated data pipelines.',
    firstCourse: 'Build Your First AI Workflow',
    firstCourseSlug: 'prompting-better-work',
    tone: 'jade',
    outcome: 'A functional background workflow saving 5+ manual hours weekly.',
    hoursPerWeek: '3 hours/week',
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    subtitle: 'Defeat the blank page, build editorial workflows, and create work that retains human nuance.',
    firstCourse: 'The Freelance AI Content Studio',
    firstCourseSlug: 'prompting-better-work',
    tone: 'lime',
    outcome: 'An editorial studio system for articles, newsletters, and briefs.',
    hoursPerWeek: '3 hours/week',
  },
]

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialAcademy = searchParams.get('academy') || 'foundations'
  const { user, loading } = useUser()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialAcademy)
  const [weeklyTarget, setWeeklyTarget] = useState<number>(3)
  const [studyReminder, setStudyReminder] = useState<string>('Daily 7:00 PM')
  const [isFinishing, setIsFinishing] = useState(false)

  // Sync if query param changes
  useEffect(() => {
    if (searchParams.get('academy')) {
      setSelectedTrackId(searchParams.get('academy')!)
    }
  }, [searchParams])

  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0]

  const handleFinishOnboarding = () => {
    setIsFinishing(true)
    // Persist learner preferences locally
    if (typeof window !== 'undefined') {
      localStorage.setItem('ituwa_active_track', selectedTrack.title)
      localStorage.setItem('ituwa_weekly_target', `${weeklyTarget} lessons / week`)
      localStorage.setItem('ituwa_study_reminder', studyReminder)
      localStorage.setItem('ituwa_onboarded', 'true')
    }
    // Route into the dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 600)
  }

  return (
    <div className="onboarding-shell">
      {/* ── Top Header ── */}
      <header className="onboarding-topbar">
        <Brand />
        <div className="onboarding-step-indicator">
          <span className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Track</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Rhythm</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Launch</span>
        </div>
        <Link href="/quiz" className="onboarding-quiz-link">
          <Compass size={15} /> Recalculate with Quiz
        </Link>
      </header>

      {/* ── Main Container ── */}
      <main className="onboarding-main">
        {step === 1 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 01 OF 03 · YOUR FOCUS ACADEMY</span>
              <h1>Choose your primary learning track</h1>
              <p>
                Focusing on one clear capability first gives you real momentum. You can switch tracks or explore
                other courses anytime from your dashboard.
              </p>
            </div>

            <div className="onboarding-tracks-grid">
              {tracks.map((track) => {
                const isSelected = selectedTrackId === track.id
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`onboarding-track-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="track-card-top">
                      <span className={`track-tone-pill tone--${track.tone}`}>{track.hoursPerWeek}</span>
                      {isSelected && (
                        <span className="track-selected-tag">
                          <CheckCircle2 size={16} /> Selected
                        </span>
                      )}
                    </div>
                    <h3>{track.title}</h3>
                    <p>{track.subtitle}</p>
                    <div className="track-card-foot">
                      <span>Starter: <strong>{track.firstCourse}</strong></span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="onboarding-action-row">
              <Link href="/dashboard" className="onboarding-skip-btn">
                Skip to dashboard
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="button button-dark onboarding-next-btn"
              >
                <span>Continue to weekly rhythm</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 02 OF 03 · YOUR PACE & HABIT</span>
              <h1>Set your realistic learning rhythm</h1>
              <p>
                Short, disciplined sessions beat long, exhausting binge sessions. Pick a target you can reliably
                hit this week.
              </p>
            </div>

            <div className="onboarding-rhythm-section">
              <label className="rhythm-label">WEEKLY LESSON TARGET</label>
              <div className="rhythm-options-row">
                {[
                  { count: 2, label: '2 Lessons / week', desc: 'Gentle pace (approx 40 mins/week)' },
                  { count: 3, label: '3 Lessons / week', desc: 'Recommended steady momentum', badge: 'Popular' },
                  { count: 5, label: '5 Lessons / week', desc: 'Intensive career acceleration' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setWeeklyTarget(item.count)}
                    className={`rhythm-target-btn ${weeklyTarget === item.count ? 'selected' : ''}`}
                  >
                    {item.badge && <span className="rhythm-badge">{item.badge}</span>}
                    <span className="rhythm-count">{item.count}</span>
                    <strong className="rhythm-title">{item.label}</strong>
                    <span className="rhythm-desc">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="rhythm-reminder-box">
                <div className="reminder-header">
                  <Clock size={18} className="reminder-icon" />
                  <div>
                    <h4>Daily Study Reminder Slot</h4>
                    <p>When are you most likely to focus without disruptions?</p>
                  </div>
                </div>
                <div className="reminder-slots-row">
                  {['Morning 7:30 AM', 'Lunchtime 1:00 PM', 'Evening 7:00 PM', 'Late 9:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setStudyReminder(slot)}
                      className={`reminder-slot-chip ${studyReminder === slot ? 'active' : ''}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="onboarding-action-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="onboarding-prev-btn"
              >
                <ArrowLeft size={16} /> Back to tracks
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="button button-dark onboarding-next-btn"
              >
                <span>Confirm commitment</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 03 OF 03 · YOUR FIRST SPRINT</span>
              <h1>Your personalized learning workspace is ready</h1>
              <p>
                We have prepared your dashboard with your chosen track, weekly goals, and starter project.
              </p>
            </div>

            <div className="onboarding-ready-card">
              <div className="ready-card-left">
                <span className="ready-track-tag">ACTIVATED TRACK</span>
                <h2>{selectedTrack.title}</h2>
                <p className="ready-subtitle">{selectedTrack.subtitle}</p>

                <div className="ready-metrics-strip">
                  <div className="ready-metric">
                    <Target size={16} />
                    <span>Target: <strong>{weeklyTarget} lessons / week</strong></span>
                  </div>
                  <div className="ready-metric">
                    <Clock size={16} />
                    <span>Rhythm: <strong>{studyReminder}</strong></span>
                  </div>
                </div>

                <div className="ready-outcome-box">
                  <strong>Expected 30-Day Milestone:</strong>
                  <p>{selectedTrack.outcome}</p>
                </div>
              </div>

              <div className="ready-card-right">
                <span className="starter-label">FIRST STARTER COURSE</span>
                <h3>{selectedTrack.firstCourse}</h3>
                <p>Begin with practical module 01 today. Take 20 minutes to try the first hands-on exercise.</p>
                <div className="starter-free-badge">
                  <CheckCircle2 size={15} /> Free instant access
                </div>
              </div>
            </div>

            <div className="onboarding-action-row center-actions">
              <button
                type="button"
                disabled={isFinishing}
                onClick={handleFinishOnboarding}
                className="button button-dark onboarding-launch-btn"
              >
                {isFinishing ? (
                  <span>Preparing your dashboard...</span>
                ) : (
                  <>
                    <span>Enter My Dashboard & Begin</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="onboarding-loading">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  )
}
