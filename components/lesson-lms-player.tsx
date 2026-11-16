'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Copy,
  HelpCircle,
  Lightbulb,
  ListOrdered,
  Lock,
  Play,
  Share2,
  Terminal,
  X,
} from 'lucide-react'
import Brand from '@/components/brand'
import YouTubeEmbed from '@/components/youtube-embed'
import { toggleLessonProgressAction } from '@/app/actions/progress'
import type { Course, Lesson } from '@/lib/database.types'

export interface SiblingLessonItem {
  id: string
  slug: string
  title: string
  position: number
  access_level: string
  module_id?: string | null
}

export interface ModuleGroup {
  id: string
  title: string
  position: number
  lessons: SiblingLessonItem[]
}

export interface LessonInteractiveMeta {
  prompt?: string
  practiceTask?: string
  checklist?: string[]
  quiz?: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }
}

interface LessonLmsPlayerProps {
  course: Pick<Course, 'id' | 'title' | 'slug' | 'academy' | 'access'>
  lesson: Lesson
  modules: ModuleGroup[]
  allLessons: SiblingLessonItem[]
  completedLessonIds: string[]
  currentIdx: number
  prevLesson: SiblingLessonItem | null
  nextLesson: SiblingLessonItem | null
  courseSlug: string
  lessonSlug: string
  interactiveMeta?: LessonInteractiveMeta
}

export default function LessonLmsPlayer({
  course,
  lesson,
  modules,
  allLessons,
  completedLessonIds: initialCompletedIds,
  currentIdx,
  prevLesson,
  nextLesson,
  courseSlug,
  lessonSlug,
  interactiveMeta,
}: LessonLmsPlayerProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'guide' | 'practice' | 'quiz'>('guide')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompletedIds)
  const [progressError, setProgressError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const isCurrentLessonCompleted = completedIds.includes(lesson.id)
  const totalLessons = allLessons.length || 1
  const validLessonIds = new Set(allLessons.map((item) => item.id))
  const completedCount = new Set(completedIds.filter((id) => validLessonIds.has(id))).size
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100))
  const isCourseCompleted = completedCount === totalLessons

  const handleCopyPrompt = async () => {
    if (!interactiveMeta?.prompt) return
    try {
      await navigator.clipboard.writeText(interactiveMeta.prompt)
      setCopiedPrompt(true)
      setTimeout(() => setCopiedPrompt(false), 2200)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  const toggleChecklistItem = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleToggleComplete = () => {
    const newStatus = !isCurrentLessonCompleted
    setProgressError(null)

    // Optimistic UI update
    setCompletedIds((prev) =>
      newStatus ? [...prev, lesson.id] : prev.filter((id) => id !== lesson.id)
    )

    startTransition(async () => {
      try {
        const res = await toggleLessonProgressAction({
          lessonId: lesson.id,
          courseId: course.id,
          completed: newStatus,
          courseSlug,
          lessonSlug,
        })
        if (!res.success) {
          setCompletedIds((prev) =>
            newStatus ? prev.filter((id) => id !== lesson.id) : [...prev, lesson.id]
          )
          setProgressError(res.error ?? 'Unable to save lesson progress. Please try again.')
        }
      } catch (error) {
        console.error('Unable to update lesson progress:', error)
        setCompletedIds((prev) =>
          newStatus ? prev.filter((id) => id !== lesson.id) : [...prev, lesson.id]
        )
        setProgressError('Unable to save lesson progress. Please try again.')
      }
    })
  }

  return (
    <div className="lms-app-wrap">
      {/* ── 1. Top Fixed App Navigation Bar ── */}
      <header className="lms-header">
        <div className="lms-header-left">
          <Link
            href={`/courses/${courseSlug}`}
            className="lms-back-btn"
            aria-label="Back to course overview"
          >
            <ArrowLeft size={17} />
            <span className="lms-back-label">Course overview</span>
          </Link>
        </div>

        <div className="lms-header-center">
          <span className="lms-header-badge">{(course.academy ?? 'AI Academy').toUpperCase()}</span>
          <span className="lms-header-title">{course.title}</span>
        </div>

        <div className="lms-header-right">
          {/* Mobile Curriculum Drawer Pill */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lms-syllabus-trigger"
            aria-label="Open course curriculum"
          >
            <ListOrdered size={14} className="lms-trigger-icon" />
            <span className="lms-trigger-text">
              Lesson {currentIdx + 1}/{totalLessons}
            </span>
            <span className="lms-trigger-pct">{progressPercent}%</span>
            <ChevronDown size={13} className="lms-trigger-caret" />
          </button>
        </div>
      </header>

      {/* ── 2. Top Progress Strip (Native LMS Progress Bar) ── */}
      <div className="lms-progress-strip" aria-label="Course completion progress">
        <div
          className="lms-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="lms-main-container">
        {/* ── 3. Desktop Permanent Sidebar (Hidden on mobile) ── */}
        <aside className="lms-desktop-sidebar" aria-label="Course curriculum">
          <div className="lms-sidebar-header">
            <div className="lms-sidebar-progress-row">
              <span className="lms-sidebar-label">YOUR PROGRESS</span>
              <span className="lms-sidebar-pct-badge">{progressPercent}% COMPLETED</span>
            </div>
            <div className="lms-sidebar-bar">
              <div
                className="lms-sidebar-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="lms-sidebar-count">
              {completedCount} of {totalLessons} lessons marked complete
            </span>
          </div>

          <div className="lms-sidebar-curriculum">
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="lms-mod-group">
                <div className="lms-mod-title">
                  <span className="lms-mod-idx">MODULE {String(modIdx + 1).padStart(2, '0')}</span>
                  <h4>{mod.title}</h4>
                </div>
                <div className="lms-mod-lessons">
                  {mod.lessons.map((item) => {
                    const isSelected = item.id === lesson.id
                    const isDone = completedIds.includes(item.id)
                    return (
                      <Link
                        key={item.id}
                        href={`/learn/${courseSlug}/${item.slug}`}
                        className={`lms-sidebar-item ${isSelected ? 'active' : ''} ${
                          isDone ? 'completed' : ''
                        }`}
                      >
                        <span className={`lms-item-check ${isDone ? 'done' : ''}`}>
                          {isDone ? (
                            <Check size={11} strokeWidth={3} />
                          ) : (
                            <span>{String(item.position).padStart(2, '0')}</span>
                          )}
                        </span>
                        <div className="lms-item-info">
                          <span className="lms-item-title">{item.title}</span>
                          <span className="lms-item-meta">
                            LESSON {String(item.position).padStart(2, '0')}
                          </span>
                        </div>
                        {item.access_level === 'paid' && course.access === 'paid' && (
                          <Lock size={12} className="lms-item-lock" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── 4. Main Lesson Workspace ── */}
        <main className="lms-content-area">
          <div className="lms-lesson-wrapper">
            {/* Native Mobile Segmented Control Bar */}
            <nav className="lms-segmented-bar" aria-label="Lesson views">
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`lms-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
              >
                <BookOpen size={15} />
                <span>Lesson Guide</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className={`lms-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
              >
                <Terminal size={15} />
                <span>Prompt & Practice</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`lms-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              >
                <CheckCircle2 size={15} />
                <span>Quick Check</span>
              </button>
            </nav>

            {/* TAB 1: Core Lesson Guide */}
            {activeTab === 'guide' && (
              <div className="lms-tab-pane animate-fade-in">
                <div className="lms-lesson-heading-card">
                  <div className="lms-lesson-type-tag">
                    {lesson.lesson_type === 'video' ? (
                      <>
                        <Play size={12} /> VIDEO LESSON · {lesson.video_duration || '3:30'}
                      </>
                    ) : (
                      <>
                        <Clock3 size={12} /> TEXT LESSON · {lesson.read_time_min || 4} MIN READ
                      </>
                    )}
                  </div>
                  <h1 className="lms-lesson-h1">{lesson.title}</h1>
                </div>

                {/* Video Player (if available) */}
                {lesson.youtube_video_id && (
                  <div className="lms-video-card">
                    <YouTubeEmbed
                      videoId={lesson.youtube_video_id}
                      title={lesson.title}
                      duration={lesson.video_duration}
                    />
                  </div>
                )}

                {/* Lesson Main Body Card */}
                {lesson.body && (
                  <div className="lms-body-card">
                    <div className="lms-body-prose">
                      <p>{lesson.body}</p>
                    </div>
                  </div>
                )}

                {/* Key Takeaway Callout Banner */}
                {lesson.takeaway && (
                  <div className="lms-takeaway-banner">
                    <div className="lms-takeaway-icon-wrap">
                      <Lightbulb size={20} className="lms-takeaway-icon" />
                    </div>
                    <div className="lms-takeaway-content">
                      <span className="lms-takeaway-label">KEY TAKEAWAY</span>
                      <p>{lesson.takeaway}</p>
                    </div>
                  </div>
                )}

                {/* In-tab Shortcut to Practice */}
                <div className="lms-tab-switch-card">
                  <div>
                    <span className="lms-switch-kicker">PRACTICE THIS LESSON</span>
                    <h4>Ready to try this in your own AI assistant?</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('practice')}
                    className="button button-outline-warm lms-switch-btn"
                  >
                    <span>View Prompt & Tasks</span>
                    <Terminal size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Prompt & Practice */}
            {activeTab === 'practice' && (
              <div className="lms-tab-pane animate-fade-in">
                {interactiveMeta?.prompt ? (
                  <div className="lms-prompt-container">
                    <div className="lms-prompt-header">
                      <div className="lms-prompt-title-row">
                        <Terminal size={15} className="lms-sparkle-icon" />
                        <span>TESTED COPYABLE PROMPT</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPrompt}
                        className={`lms-copy-action-btn ${copiedPrompt ? 'copied' : ''}`}
                      >
                        {copiedPrompt ? (
                          <>
                            <Check size={14} />
                            <span>Copied to clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="lms-prompt-pre">
                      <code>{interactiveMeta.prompt}</code>
                    </pre>

                    <div className="lms-prompt-hint">
                      <Lightbulb size={14} />
                      <span>
                        Paste this directly into ChatGPT or Google Gemini on your phone or laptop.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="lms-prompt-container">
                    <div className="lms-prompt-header">
                      <span>PRACTICE GUIDELINES</span>
                    </div>
                    <div className="lms-prompt-hint" style={{ marginTop: 0 }}>
                      <span>
                        Open your AI assistant and apply the principles from this lesson to a real task.
                      </span>
                    </div>
                  </div>
                )}

                {/* Practice Task & Interactive Checklist Card */}
                <div className="lms-practice-box">
                  <div className="lms-practice-top">
                    <span className="lms-practice-badge">PRACTICE EXERCISE</span>
                    <h3>{interactiveMeta?.practiceTask || 'Try this on an everyday task'}</h3>
                  </div>

                  {interactiveMeta?.checklist && interactiveMeta.checklist.length > 0 && (
                    <div className="lms-checklist-wrap">
                      <span className="lms-checklist-hdr">YOUR ACTION CHECKLIST:</span>
                      <div className="lms-checklist-items">
                        {interactiveMeta.checklist.map((step, idx) => {
                          const isTicked = !!checkedItems[idx]
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => toggleChecklistItem(idx)}
                              className={`lms-check-btn ${isTicked ? 'ticked' : ''}`}
                            >
                              <span className={`lms-check-box ${isTicked ? 'checked' : ''}`}>
                                {isTicked && <Check size={12} strokeWidth={3} />}
                              </span>
                              <span className="lms-check-label">{step}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Quick Quiz Knowledge Check */}
            {activeTab === 'quiz' && (
              <div className="lms-tab-pane animate-fade-in">
                {interactiveMeta?.quiz ? (
                  <div className="lms-quiz-widget">
                    <div className="lms-quiz-header">
                      <HelpCircle size={18} className="lms-quiz-q-icon" />
                      <span>QUICK CHECK-IN</span>
                    </div>

                    <h3 className="lms-quiz-question">{interactiveMeta.quiz.question}</h3>

                    <div className="lms-quiz-options">
                      {interactiveMeta.quiz.options.map((opt, optIdx) => {
                        const isSelected = selectedOption === optIdx
                        const isCorrect = optIdx === interactiveMeta.quiz?.correctIndex
                        let stateClass = ''
                        if (quizSubmitted) {
                          if (isCorrect) stateClass = 'correct-answer'
                          else if (isSelected && !isCorrect) stateClass = 'wrong-answer'
                        } else if (isSelected) {
                          stateClass = 'selected-opt'
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => setSelectedOption(optIdx)}
                            className={`lms-quiz-opt ${stateClass}`}
                          >
                            <span className="lms-opt-circle">
                              {quizSubmitted && isCorrect ? (
                                <Check size={12} strokeWidth={3} />
                              ) : (
                                String.fromCharCode(65 + optIdx)
                              )}
                            </span>
                            <span className="lms-opt-text">{opt}</span>
                          </button>
                        )
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        type="button"
                        disabled={selectedOption === null}
                        onClick={() => setQuizSubmitted(true)}
                        className="button button-dark lms-quiz-submit-btn"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <div className="lms-quiz-feedback-box">
                        <div
                          className={`lms-quiz-status-pill ${
                            selectedOption === interactiveMeta.quiz.correctIndex
                              ? 'status-pass'
                              : 'status-fail'
                          }`}
                        >
                          {selectedOption === interactiveMeta.quiz.correctIndex ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <X size={16} />
                          )}
                          <span>
                            {selectedOption === interactiveMeta.quiz.correctIndex
                              ? 'Spot on! Correct answer.'
                              : 'Not quite. Review the explanation below:'}
                          </span>
                        </div>
                        <p className="lms-quiz-rationale">{interactiveMeta.quiz.explanation}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setQuizSubmitted(false)
                            setSelectedOption(null)
                          }}
                          className="button button-outline-warm lms-quiz-retry-btn"
                        >
                          Retry Question
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="lms-quiz-widget">
                    <div className="lms-quiz-header">
                      <span>CHECK-IN</span>
                    </div>
                    <p style={{ marginTop: 12, color: '#6C6D75' }}>
                      Reflect on the key takeaway from the Lesson Guide. Mark this lesson completed
                      below when you are ready to continue.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── 5. Sticky Bottom Action Dock (Native Mobile Dock) ── */}
      <footer className="lms-dock">
        {progressError && (
          <p className="lms-dock-error" role="alert">
            {progressError}
          </p>
        )}
        <div className="lms-dock-inner">
          {/* Previous Button */}
          {prevLesson ? (
            <Link
              href={`/learn/${courseSlug}/${prevLesson.slug}`}
              className="lms-dock-nav-btn prev"
              aria-label="Previous lesson"
            >
              <ArrowLeft size={16} />
              <span className="lms-dock-text">Prev</span>
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="lms-dock-nav-btn prev disabled"
              aria-disabled="true"
            >
              <ArrowLeft size={16} />
              <span className="lms-dock-text">Prev</span>
            </button>
          )}

          {/* Interactive Complete Toggle CTA Button */}
          <button
            type="button"
            disabled={isPending}
            onClick={handleToggleComplete}
            className={`lms-dock-complete-btn ${isCurrentLessonCompleted ? 'is-completed' : ''}`}
          >
            <span className="lms-btn-icon-circle">
              <Check size={14} strokeWidth={3} />
            </span>
            <span>
              {isCurrentLessonCompleted
                ? 'Completed'
                : isPending
                ? 'Saving...'
                : 'Mark as Completed'}
            </span>
          </button>

          {/* Next Button or Finish Course */}
          {nextLesson ? (
            <Link
              href={`/learn/${courseSlug}/${nextLesson.slug}`}
              className="lms-dock-nav-btn next"
              aria-label="Next lesson"
            >
              <span className="lms-dock-text">Next</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              href={`/courses/${courseSlug}`}
              className="lms-dock-nav-btn finish"
              aria-label={isCourseCompleted ? 'Finish course' : 'Return to course overview'}
            >
              <span className="lms-dock-text">{isCourseCompleted ? 'Finish' : 'Course'}</span>
              {isCourseCompleted ? <Award size={16} /> : <ArrowRight size={16} />}
            </Link>
          )}
        </div>
      </footer>

      {/* ── 6. Mobile Bottom Sheet / Curriculum Drawer ── */}
      {drawerOpen && (
        <div className="lms-drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div
            className="lms-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Course curriculum sheet"
          >
            <div className="lms-drawer-top">
              <div className="lms-drawer-title-group">
                <span className="lms-drawer-eyebrow">COURSE SYLLABUS</span>
                <h3>{course.title}</h3>
                <span className="lms-drawer-progress-sub">
                  {completedCount} of {totalLessons} completed ({progressPercent}%)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="lms-drawer-close"
                aria-label="Close syllabus sheet"
              >
                <X size={18} />
              </button>
            </div>

            <div className="lms-drawer-scroll-body">
              {modules.map((mod, modIdx) => (
                <div key={mod.id} className="lms-drawer-mod-section">
                  <div className="lms-drawer-mod-header">
                    <span>MODULE {String(modIdx + 1).padStart(2, '0')}</span>
                    <h4>{mod.title}</h4>
                  </div>
                  <div className="lms-drawer-lesson-list">
                    {mod.lessons.map((item) => {
                      const isCurrent = item.id === lesson.id
                      const isDone = completedIds.includes(item.id)
                      return (
                        <Link
                          key={item.id}
                          href={`/learn/${courseSlug}/${item.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className={`lms-drawer-item ${isCurrent ? 'active-lesson' : ''} ${
                            isDone ? 'done-lesson' : ''
                          }`}
                        >
                          <span className={`lms-drawer-check ${isDone ? 'is-done' : ''}`}>
                            {isDone ? (
                              <Check size={12} strokeWidth={3} />
                            ) : (
                              <span>{String(item.position).padStart(2, '0')}</span>
                            )}
                          </span>
                          <div className="lms-drawer-item-content">
                            <span className="lms-drawer-item-title">{item.title}</span>
                            <span className="lms-drawer-item-sub">
                              LESSON {String(item.position).padStart(2, '0')}
                            </span>
                          </div>
                          {isCurrent && (
                            <span className="lms-now-playing-pill">NOW</span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
