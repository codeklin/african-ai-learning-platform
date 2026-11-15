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
    subtitle: 'Plan original videos and learn the basics of building a YouTube channel.',
    firstCourse: 'YouTube Business Fundamentals',
    firstCourseSlug: 'youtube-business-fundamentals',
    tone: 'lavender',
    practiceGoal: 'Plan an original channel concept and outline a useful video.',
    focusLabel: 'Channel planning',
  },
  {
    id: 'foundations',
    title: 'AI Foundations',
    subtitle: 'Understand what AI can do and practise using it for everyday tasks.',
    firstCourse: 'Your AI Toolkit: A Practical Start',
    firstCourseSlug: 'ai-toolkit-practical-start',
    tone: 'coral',
    practiceGoal: 'Try an AI tool on an everyday task and review its response.',
    focusLabel: 'Everyday AI',
  },
  {
    id: 'freelance',
    title: 'AI Freelancing',
    subtitle: 'Learn to describe a digital service and practise responding to a client brief.',
    firstCourse: 'AI for Your Freelance Business',
    firstCourseSlug: 'ai-for-your-freelance-business',
    tone: 'amber',
    practiceGoal: 'Draft a service offer and a sample response to a client brief.',
    focusLabel: 'Service planning',
  },
  {
    id: 'automation',
    title: 'AI Automation',
    subtitle: 'Map a repetitive task and learn how digital tools can work together.',
    firstCourse: 'Build Your First AI Workflow',
    firstCourseSlug: 'build-your-first-ai-workflow',
    tone: 'jade',
    practiceGoal: 'Map one task, plan a simple workflow and test its output.',
    focusLabel: 'Workflow design',
  },
  {
    id: 'content',
    title: 'AI Content Creation',
    subtitle: 'Use AI to support content ideas and drafts, then edit the work in your own voice.',
    firstCourse: 'The Freelance AI Content Studio',
    firstCourseSlug: 'freelance-ai-content-studio',
    tone: 'lime',
    practiceGoal: 'Create and edit a content sample from a brief.',
    focusLabel: 'Content production',
  },
  {
    id: 'apps',
    title: 'AI App Development',
    subtitle: 'Learn to plan and test a simple app or digital tool.',
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
          <span className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Focus</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Rhythm</span>
          <span className="step-arrow">→</span>
          <span className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Review</span>
        </div>
        <Link href="/quiz" className="onboarding-quiz-link">
          <Compass size={15} /> Take the skill assessment
        </Link>
      </header>

      {/* ── Main Container ── */}
      <main className="onboarding-main">
        {step === 1 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <span className="onboarding-kicker">STEP 01 OF 03 · YOUR FOCUS ACADEMY</span>
              <h1>Choose an area to start with</h1>
              <p>
                Choose a topic that interests you. You can explore other courses whenever you are ready.
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
                Choose a weekly lesson target that fits your schedule. You can change your target at any time.
              </p>
            </div>

            <div className="onboarding-rhythm-section">
              <label className="rhythm-label">WEEKLY LESSON TARGET</label>
              <div className="rhythm-options-row">
                {[
                  { count: 2, label: '2 lessons / week', desc: 'A lighter weekly target' },
                  { count: 3, label: '3 lessons / week', desc: 'A steady weekly target' },
                  { count: 5, label: '5 lessons / week', desc: 'More frequent practice' },
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
                    <h4>Choose a study time</h4>
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
              <span className="onboarding-kicker">STEP 03 OF 03 · REVIEW YOUR CHOICES</span>
              <h1>Review the learning plan you chose</h1>
              <p>
                Your learning focus and weekly target are saved in this browser.
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
                    <span>Target: <strong>{weeklyTarget} lessons / week</strong></span>
                  </div>
                  <div className="ready-metric">
                    <Clock size={16} />
                    <span>Rhythm: <strong>{studyReminder}</strong></span>
                  </div>
                </div>

                <div className="ready-outcome-box">
                  <strong>A practical goal to work toward:</strong>
                  <p>{selectedTrack.practiceGoal}</p>
                </div>
              </div>

              <div className="ready-card-right">
                <span className="starter-label">SUGGESTED COURSE</span>
                <h3>{selectedTrack.firstCourse}</h3>
                <p>Open the course overview to see its lessons, what you can practise and how to get started.</p>
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
