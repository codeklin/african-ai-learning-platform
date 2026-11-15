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
  practiceGoal: string
  focusLabel: string
}

const tracks: TrackOption[] = [
  {
    id: 'creator',
    title: 'Creator Economy & YouTube',
    subtitle: 'Use AI to plan original videos and learn how YouTube channels work.',
    firstCourse: 'YouTube Business Fundamentals',
    firstCourseSlug: 'youtube-business-fundamentals',
    tone: 'lavender',
    practiceGoal: 'Plan an original channel concept and outline a useful video.',
    focusLabel: 'Channel planning',
  },
  {
    id: 'foundations',
    title: 'AI Foundations',
    subtitle: 'Learn what AI can do and try it on an everyday task.',
    firstCourse: 'Your AI Toolkit: A Practical Start',
    firstCourseSlug: 'ai-toolkit-practical-start',
    tone: 'coral',
    practiceGoal: 'Try an AI tool on an everyday task and review its response.',
    focusLabel: 'Everyday AI',
  },
  {
    id: 'freelance',
    title: 'AI Freelancing',
    subtitle: 'Use AI to plan a digital service and answer a sample client brief.',
    firstCourse: 'AI for Your Freelance Business',
    firstCourseSlug: 'ai-for-your-freelance-business',
    tone: 'amber',
    practiceGoal: 'Draft a service offer and a sample response to a client brief.',
    focusLabel: 'Service planning',
  },
  {
    id: 'automation',
    title: 'AI Automation',
    subtitle: 'Connect AI tools to help with a task you repeat.',
    firstCourse: 'Build Your First AI Workflow',
    firstCourseSlug: 'build-your-first-ai-workflow',
    tone: 'jade',
    practiceGoal: 'Pick a task you repeat, connect tools and test the result.',
    focusLabel: 'Task automation',
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    subtitle: 'Use AI for ideas and drafts. Edit the final work in your own voice.',
    firstCourse: 'The Freelance AI Content Studio',
    firstCourseSlug: 'freelance-ai-content-studio',
    tone: 'lime',
    practiceGoal: 'Create and edit a content sample from a brief.',
    focusLabel: 'Content production',
  },
  {
    id: 'apps',
    title: 'AI App Development',
    subtitle: 'Plan, build and test a simple app that uses AI.',
    firstCourse: 'Build a Helpful AI App',
    firstCourseSlug: 'build-a-helpful-ai-app',
    tone: 'peach',
    practiceGoal: 'Plan a simple AI app and test it with sample inputs.',
    focusLabel: 'App prototyping',
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
          <span className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Choose a skill</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Set a goal</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Review</span>
        </div>
        <Link href="/quiz" className="onboarding-quiz-link">
          <Compass size={15} /> Find a skill to start
        </Link>
      </header>

      {/* ── Main Container ── */}
      <main className="onboarding-main">
        {step === 1 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 01 OF 03 · CHOOSE A SKILL</span>
              <h1>What would you like to learn?</h1>
              <p>
                Pick one area to start. You can explore other courses at any time.
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
                      <span className={`track-tone-pill tone--${track.tone}`}>{track.focusLabel}</span>
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
                <span>Set a weekly goal</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 02 OF 03 · SET A WEEKLY GOAL</span>
              <h1>How many lessons would you like to study?</h1>
              <p>
                Choose a goal that fits your week. You can change it at any time.
              </p>
            </div>

            <div className="onboarding-rhythm-section">
              <label className="rhythm-label">LESSONS PER WEEK</label>
              <div className="rhythm-options-row">
                {[
                  { count: 2, label: '2 lessons', desc: 'A light start' },
                  { count: 3, label: '3 lessons', desc: 'A steady pace' },
                  { count: 5, label: '5 lessons', desc: 'More practice' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setWeeklyTarget(item.count)}
                    className={`rhythm-target-btn ${weeklyTarget === item.count ? 'selected' : ''}`}
                  >
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
                    <h4>When do you plan to study?</h4>
                    <p>This adds a preferred time to your plan; it does not schedule a notification.</p>
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
                <span>Review your choices</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 03 OF 03 · YOUR PLAN</span>
              <h1>Your learning plan</h1>
              <p>
              Your choices are saved in this browser. They do not track lesson progress or send reminders.
              </p>
            </div>

            <div className="onboarding-ready-card">
              <div className="ready-card-left">
                <span className="ready-track-tag">LEARNING FOCUS</span>
                <h2>{selectedTrack.title}</h2>
                <p className="ready-subtitle">{selectedTrack.subtitle}</p>

                <div className="ready-metrics-strip">
                  <div className="ready-metric">
                    <Target size={16} />
                    <span>Weekly goal: <strong>{weeklyTarget} lessons</strong></span>
                  </div>
                  <div className="ready-metric">
                    <Clock size={16} />
                    <span>Study time: <strong>{studyReminder}</strong></span>
                  </div>
                </div>

                <div className="ready-outcome-box">
                  <strong>Try this:</strong>
                  <p>{selectedTrack.practiceGoal}</p>
                </div>
              </div>

              <div className="ready-card-right">
                <span className="starter-label">SUGGESTED COURSE</span>
                <h3>{selectedTrack.firstCourse}</h3>
                <p>Open the course to see what you will learn and try.</p>
                <div className="starter-free-badge">
                  <CheckCircle2 size={15} /> Free course
                </div>
                <Link className="text-link" href={`/courses/${selectedTrack.firstCourseSlug}`}>
                  View suggested course <ArrowRight size={15} />
                </Link>
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
                    <span>Go to my dashboard</span>
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
