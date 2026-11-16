'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  HelpCircle,
  Lightbulb,
  ListOrdered,
  Play,
  Terminal,
  X,
} from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import YouTubeEmbed from '@/components/youtube-embed'

interface LessonCourseData {
  course: string
  academy: string
  lessons: string[]
  body: string
  takeaway: string
  youtubeVideoId?: string
}

interface LessonActivity {
  task: string
  result: string
  prompt?: string
  checklist?: string[]
  quiz?: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }
}

const lessonContent: Record<string, LessonCourseData> = {
  'ai-toolkit-practical-start': {
    course: 'AI Foundations',
    academy: 'AI Academy',
    lessons: [
      'What AI Is in Simple Everyday Words',
      'What AI Does Well and Where It Fails',
      'Setting Up Your Free AI Assistant on Phone or Laptop',
      'Give the AI One Specific Job',
      'Adding Context That Changes the Answer',
      'Setting Constraints and Output Format',
      'How to Improve a First Draft Without Starting Over',
      'Spotting AI Hallucinations and Fact-Checking',
      'Keeping Your Private Information Safe',
      'Using AI for Daily Communication and Work Tasks',
      'The 3-Step Human Review Rule',
      'Preparing Your Final Foundations Project',
    ],
    body: 'AI tools can help with a first draft, but they do not know your situation unless you explain it. Give clear details, check the answer, and make the final call yourself.',
    takeaway: 'Use AI for a starting point. Your experience and judgement still matter.',
  },
  'prompting-better-work': {
    course: 'Prompting for Better Work',
    academy: 'AI Academy',
    lessons: ['Start with the task', 'Add context and constraints', 'Describe the output you need', 'Work in small iterations', 'Ask for alternatives', 'Check what matters', 'Create your prompt brief', 'Build a reusable template'],
    body: 'A helpful prompt starts with a clear task. Before you open an AI tool, name what you are trying to accomplish and what a useful result would look like. Specificity gives you a better first draft to build on.',
    takeaway: 'Start with a task, include only the context that changes the answer, then describe the format you need.',
  },
  'ai-content-marketing-for-business': {
    course: 'AI Content Marketing for Business',
    academy: 'AI Content Marketing',
    lessons: [
      'Research customer questions and needs',
      'Choose an audience, goal, and offer',
      'Turn a client brief into a content plan',
      'Choose channels and plan content formats',
      'Draft social media captions for an audience',
      'Write ad copy with a clear, supportable message',
      'Write email campaigns with a useful next step',
      'Use AI to draft in a consistent brand voice',
      'Check facts, rights, originality, and tone',
      'Create a repeatable content workflow',
      'Review campaign signals and revise content',
      'Package campaign work into a portfolio sample',
    ],
    body: 'Turn a client brief into useful content for a defined audience and business goal. Use AI to support research and first drafts for social media captions, ad copy, and email campaigns. Adapt each format to its channel, then check facts, rights, brand voice, and audience value before presenting the work.',
    takeaway: 'AI can help you draft faster, but a useful campaign still needs your review for accuracy, originality, rights, and fit for the audience.',
  },
  'ai-video-creation': {
    course: 'AI Video Creation',
    academy: 'AI Video',
    lessons: [
      'The Purpose of Your Video and Who It Is For',
      'Writing a Short 45-Second Hook-and-Hold Script',
      'Storyboarding and Scene Planning',
      'Generating Clean Scene Visuals with AI',
      'Maintaining Visual Consistency Across Scenes',
      'Generating Natural Voice Narration',
      'Bringing Clips and Voice Together in CapCut',
      'Adding Dynamic, Readable Subtitles',
      'Adding Sound Effects and Background Music Responsibly',
      'Reviewing Rights, Originality, and AI Content Disclosures',
    ],
    body: 'Plan and produce original AI-assisted videos with attention to storytelling, audience value, and responsible disclosure.',
    takeaway: 'The story and your editorial judgement always matter more than the AI tool you used to create it.',
  },
  'ai-graphic-design': {
    course: 'AI Graphic Design',
    academy: 'AI Design',
    lessons: [
      'The Purpose of Every Design: Information First',
      'Visual Hierarchy: What the Eye Sees First, Second, and Last',
      'Typography and High-Contrast Readability',
      'Prompting AI for Specific Graphic Elements and Backgrounds',
      'Removing Backgrounds and Cleaning AI Artifacts',
      'Understanding Image Commercial Rights and Licenses',
      'Designing a Clean Promotional Event/Service Flyer',
      'Designing an Instagram / WhatsApp Square Post',
      'Creating a Product or Price Announcement Graphic',
      'The 5-Point Quality Check: Spacing, Alignment, and Spelling',
      'Choosing the Right File Formats and Sizes',
      'Assembling Your 3-Piece Client Design Portfolio',
    ],
    body: 'Create original, useful visual assets with AI-assisted design techniques and prepare them for real client projects.',
    takeaway: 'Design is communication. AI can generate elements but cannot replace your judgement about what the audience needs to understand.',
  },
  'ai-web-app-development': {
    course: 'AI Web App Development',
    academy: 'AI App Development',
    lessons: [
      'Finding One Small, Real Problem to Solve',
      'Defining Inputs, Outputs, and User Flow',
      'The MVP Rule: What to Leave Out of Version 1',
      'Writing Build Instructions for AI Coding Assistants',
      'Generating a Mobile-Responsive Interface',
      'Adding State and Interactive Logic',
      'Connecting a Basic Data Store or Supabase Table',
      'Safe API Key Handling: Protecting Secrets on the Server',
      'Handling Errors and Failed Requests Gracefully',
      'Testing on Mobile and Edge-Case Inputs',
      'Free Deployment on Vercel',
      'Presenting Your App and Explaining Its Limitations',
    ],
    body: 'Begin with a real user problem, not an AI feature. Define the smallest version of a product that could help, build a mobile-friendly prototype and test it with realistic inputs.',
    takeaway: 'A working prototype is evidence to learn from, not proof of product demand or future income.',
    youtubeVideoId: 'qIUZ_C5ki3g',
  },
  'build-a-helpful-ai-app': {
    course: 'AI Web App Development',
    academy: 'AI App Development',
    lessons: [
      'Finding One Small, Real Problem to Solve',
      'Defining Inputs, Outputs, and User Flow',
      'The MVP Rule: What to Leave Out of Version 1',
      'Writing Build Instructions for AI Coding Assistants',
      'Generating a Mobile-Responsive Interface',
      'Adding State and Interactive Logic',
      'Connecting a Basic Data Store or Supabase Table',
      'Safe API Key Handling: Protecting Secrets on the Server',
      'Handling Errors and Failed Requests Gracefully',
      'Testing on Mobile and Edge-Case Inputs',
      'Free Deployment on Vercel',
      'Presenting Your App and Explaining Its Limitations',
    ],
    body: 'Begin with a real user problem, not an AI feature. Define the smallest version of a product that could help, build a mobile-friendly prototype and test it with realistic inputs.',
    takeaway: 'A working prototype is evidence to learn from, not proof of product demand or future income.',
    youtubeVideoId: 'qIUZ_C5ki3g',
  },
  'youtube-monetization': {
    course: 'YouTube Monetization',
    academy: 'Creator Economy',
    lessons: [
      'How the YouTube Platform Actually Works',
      'Choosing a Specific Channel Topic and Audience Promise',
      'Researching Demand and Validating Video Topics',
      'Crafting Titles That Spark Curiosity Honestly',
      'Designing High-Contrast, Legible Mobile Thumbnails',
      'Writing Video Scripts That Retain Viewers',
      'The YouTube Partner Program (YPP) Requirements',
      'Copyright, Fair Use, and Avoiding Content Strikes',
      'Reused Content and Inauthentic/Spam Policies',
      'Disclosing AI-Generated and Altered Content',
      'Diversified Revenue: Sponsorships, Digital Products, and Services',
      'Reading YouTube Analytics as Learning Feedback',
      'Building a Sustainable 30-Day Publishing Rhythm',
    ],
    body: 'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    takeaway: 'Learning completion is not YouTube Partner Program eligibility, and no audience or revenue outcome is guaranteed.',
  },
}

// Generic creator fallback
const creatorCourseTitles: Record<string, string> = {
  'youtube-business-fundamentals': 'YouTube Business Fundamentals',
  'starting-a-faceless-youtube-channel': 'Starting a Faceless YouTube Channel',
  'youtube-automation-monetization-masterclass': 'YouTube Monetization',
  'ai-powered-youtube-content-production': 'AI-Powered YouTube Content Production',
  'youtube-shorts-growth-strategy': 'YouTube Shorts Growth Strategy',
  'youtube-seo-and-analytics': 'YouTube SEO and Analytics',
  'youtube-monetization-policies-and-copyright': 'YouTube Monetization Policies and Copyright',
  'building-a-creator-business-beyond-ad-revenue': 'Building a Creator Business Beyond Ad Revenue',
}

const creatorLessons = [
  'Define an original channel concept',
  'Validate your niche with audience evidence',
  'Design channel branding with clear rights',
  'Build a sustainable 30-day publishing calendar',
  'Produce an original video with responsible AI assistance',
  'Create a distinctive thumbnail',
  'Review analytics and choose a learning experiment',
  'Check current policy and monetization readiness',
]

function getActivities(slug: string, lessonCount: number): LessonActivity[] {
  const defaults: LessonActivity[] = Array.from({ length: lessonCount }, (_, i) => ({
    task: `Complete the practice exercise for lesson ${i + 1}.`,
    result: 'A completed exercise ready for review.',
    prompt: `I am working on this lesson topic: "${lessonContent[slug]?.lessons[i] ?? 'this lesson'}".
Please help me understand the key concept with a practical example I can apply today.`,
    checklist: [
      'Read the lesson body carefully',
      'Identify one real-life example from your work',
      'Complete the AI-assisted task',
      'Review the output before saving',
    ],
    quiz: {
      question: `What is the main learning goal of this lesson?`,
      options: [
        'To memorise technical terminology',
        'To apply the concept to a real task',
        'To complete a multiple-choice test',
        'To watch a video without taking notes',
      ],
      correctIndex: 1,
      explanation: 'Every lesson on this platform is designed around a practical deliverable : something you can apply, not just recall.',
    },
  }))
  return defaults
}

export default function LessonPreview({ slug, userId }: { slug: string; userId?: string }) {
  const creatorTitle = creatorCourseTitles[slug]
  const course =
    lessonContent[slug as keyof typeof lessonContent] ??
    (creatorTitle
      ? {
          course: creatorTitle,
          academy: 'Creator Economy',
          lessons: creatorLessons,
          body: 'Build a channel around a real audience need. Use your own editorial judgement and create meaningful original value in every video.',
          takeaway: 'Learning completion is not YouTube Partner Program eligibility, and no audience or revenue outcome is guaranteed.',
        }
      : lessonContent['ai-toolkit-practical-start'])

  const totalLessons = course.lessons.length
  const activities = getActivities(slug, totalLessons)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'guide' | 'practice' | 'quiz'>('guide')
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const isCurrentCompleted = completedIds.includes(currentIdx)
  const completedCount = completedIds.length
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100))

  const activity = activities[currentIdx]
  const lessonTitle = course.lessons[currentIdx]

  const goTo = (idx: number) => {
    setCurrentIdx(idx)
    setDrawerOpen(false)
    setActiveTab('guide')
    setSelectedOption(null)
    setQuizSubmitted(false)
    setCheckedItems({})
  }

  const handleToggleComplete = () => {
    setCompletedIds((prev) =>
      isCurrentCompleted ? prev.filter((id) => id !== currentIdx) : [...prev, currentIdx]
    )
  }

  const handleCopyPrompt = async () => {
    if (!activity.prompt) return
    try {
      await navigator.clipboard.writeText(activity.prompt)
      setCopiedPrompt(true)
      setTimeout(() => setCopiedPrompt(false), 2200)
    } catch {}
  }

  const prevIdx = currentIdx > 0 ? currentIdx - 1 : null
  const nextIdx = currentIdx < totalLessons - 1 ? currentIdx + 1 : null

  return (
    <div className="lms-app-wrap">
      {/* ── Top Header ── */}
      <header className="lms-header">
        <div className="lms-header-left">
          <Link href={`/courses/${slug}`} className="lms-back-btn" aria-label="Back to course overview">
            <ArrowLeft size={17} />
            <span className="lms-back-label">Course overview</span>
          </Link>
        </div>
        <div className="lms-header-center">
          <span className="lms-header-badge">{course.academy.toUpperCase()}</span>
          <span className="lms-header-title">{course.course}</span>
        </div>
        <div className="lms-header-right">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lms-syllabus-trigger"
            aria-label="Open course curriculum"
          >
            <ListOrdered size={14} className="lms-trigger-icon" />
            <span className="lms-trigger-text">{currentIdx + 1}/{totalLessons}</span>
            <span className="lms-trigger-pct">{progressPercent}%</span>
            <ChevronDown size={13} className="lms-trigger-caret" />
          </button>
        </div>
      </header>

      {/* ── Progress Strip ── */}
      <div className="lms-progress-strip" aria-label="Course completion progress">
        <div className="lms-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="lms-main-container">
        {/* ── Desktop Sidebar ── */}
        <aside className="lms-desktop-sidebar" aria-label="Course curriculum">
          <div className="lms-sidebar-header">
            <div className="lms-sidebar-progress-row">
              <span className="lms-sidebar-label">YOUR PROGRESS</span>
              <span className="lms-sidebar-pct-badge">{progressPercent}% COMPLETED</span>
            </div>
            <div className="lms-sidebar-bar">
              <div className="lms-sidebar-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="lms-sidebar-count">
              {completedCount} of {totalLessons} lessons marked complete
            </span>
          </div>
          <div className="lms-sidebar-curriculum">
            <div className="lms-mod-group">
              <div className="lms-mod-title">
                <span className="lms-mod-idx">MODULE 01</span>
                <h4>{course.course}</h4>
              </div>
              <div className="lms-mod-lessons">
                {course.lessons.map((lessonName, idx) => {
                  const isSelected = idx === currentIdx
                  const isDone = completedIds.includes(idx)
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goTo(idx)}
                      className={`lms-sidebar-item ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                    >
                      <span className={`lms-item-check ${isDone ? 'done' : ''}`}>
                        {isDone ? <Check size={11} strokeWidth={3} /> : <span>{String(idx + 1).padStart(2, '0')}</span>}
                      </span>
                      <div className="lms-item-info">
                        <span className="lms-item-title">{lessonName}</span>
                        <span className="lms-item-meta">LESSON {String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="lms-content-area">
          <div className="lms-lesson-wrapper">
            {/* Segmented Tab Bar */}
            <nav className="lms-segmented-bar" aria-label="Lesson views">
              <button type="button" onClick={() => setActiveTab('guide')} className={`lms-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}>
                <BookOpen size={15} /><span>Lesson Guide</span>
              </button>
              <button type="button" onClick={() => setActiveTab('practice')} className={`lms-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}>
                <Terminal size={15} /><span>Prompt &amp; Practice</span>
              </button>
              <button type="button" onClick={() => setActiveTab('quiz')} className={`lms-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}>
                <CheckCircle2 size={15} /><span>Quick Check</span>
              </button>
            </nav>

            {/* TAB 1: Lesson Guide */}
            {activeTab === 'guide' && (
              <div className="lms-tab-pane animate-fade-in">
                <div className="lms-lesson-heading-card">
                  <div className="lms-lesson-type-tag">
                    {course.youtubeVideoId
                      ? <><Play size={12} /> VIDEO LESSON</>
                      : <><Clock3 size={12} /> TEXT LESSON</>}
                  </div>
                  <h1 className="lms-lesson-h1">{lessonTitle}</h1>
                </div>

                {course.youtubeVideoId && (
                  <div className="lms-video-card">
                    <YouTubeEmbed videoId={course.youtubeVideoId} title={lessonTitle} duration="1h 45m" />
                  </div>
                )}

                <div className="lms-body-card">
                  <div className="lms-body-prose">
                    <p>{course.body}</p>
                  </div>
                </div>

                <div className="lms-takeaway-banner">
                  <div className="lms-takeaway-icon-wrap">
                    <Lightbulb size={20} className="lms-takeaway-icon" />
                  </div>
                  <div className="lms-takeaway-content">
                    <span className="lms-takeaway-label">KEY TAKEAWAY</span>
                    <p>{course.takeaway}</p>
                  </div>
                </div>

                <div className="lms-tab-switch-card">
                  <div>
                    <span className="lms-switch-kicker">PRACTICE THIS LESSON</span>
                    <h4>Ready to try this in your own AI assistant?</h4>
                  </div>
                  <button type="button" onClick={() => setActiveTab('practice')} className="button button-outline-warm lms-switch-btn">
                    <span>View Prompt &amp; Tasks</span>
                    <Terminal size={14} />
                  </button>
                </div>

                {/* Preview Notice */}
                <div className="lms-preview-notice">
                  <HelpCircle size={15} />
                  <span>
                    {userId
                      ? 'You are viewing this in preview mode. Progress is not saved to your account for this course yet.'
                      : 'Sign in to save your progress and unlock full course features.'}
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: Prompt & Practice */}
            {activeTab === 'practice' && (
              <div className="lms-tab-pane animate-fade-in">
                {activity.prompt ? (
                  <div className="lms-prompt-container">
                    <div className="lms-prompt-header">
                      <div className="lms-prompt-title-row">
                        <Terminal size={15} className="lms-sparkle-icon" />
                        <span>COPYABLE PRACTICE PROMPT</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPrompt}
                        className={`lms-copy-action-btn ${copiedPrompt ? 'copied' : ''}`}
                      >
                        {copiedPrompt ? <><Check size={14} /><span>Copied!</span></> : <><Copy size={14} /><span>Copy Prompt</span></>}
                      </button>
                    </div>
                    <pre className="lms-prompt-pre"><code>{activity.prompt}</code></pre>
                    <div className="lms-prompt-hint">
                      <Lightbulb size={14} />
                      <span>Paste this into ChatGPT or Google Gemini on your phone or laptop.</span>
                    </div>
                  </div>
                ) : null}

                <div className="lms-practice-box">
                  <div className="lms-practice-top">
                    <span className="lms-practice-badge">PRACTICE EXERCISE</span>
                    <h3>{activity.task}</h3>
                  </div>
                  {activity.checklist && activity.checklist.length > 0 && (
                    <div className="lms-checklist-wrap">
                      <span className="lms-checklist-hdr">YOUR ACTION CHECKLIST:</span>
                      <div className="lms-checklist-items">
                        {activity.checklist.map((step, idx) => {
                          const isTicked = !!checkedItems[idx]
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))}
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
                  <div className="lms-practice-deliverable">
                    <span>WHAT YOU SHOULD HAVE AFTER:</span>
                    <p>{activity.result}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Quick Check */}
            {activeTab === 'quiz' && (
              <div className="lms-tab-pane animate-fade-in">
                {activity.quiz ? (
                  <div className="lms-quiz-widget">
                    <div className="lms-quiz-header">
                      <HelpCircle size={18} className="lms-quiz-q-icon" />
                      <span>QUICK CHECK-IN</span>
                    </div>
                    <h3 className="lms-quiz-question">{activity.quiz.question}</h3>
                    <div className="lms-quiz-options">
                      {activity.quiz.options.map((opt, optIdx) => {
                        const isSelected = selectedOption === optIdx
                        const isCorrect = optIdx === activity.quiz!.correctIndex
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
                              {quizSubmitted && isCorrect
                                ? <Check size={12} strokeWidth={3} />
                                : String.fromCharCode(65 + optIdx)}
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
                        <div className={`lms-quiz-status-pill ${selectedOption === activity.quiz.correctIndex ? 'status-pass' : 'status-fail'}`}>
                          {selectedOption === activity.quiz.correctIndex
                            ? <CheckCircle2 size={16} />
                            : <X size={16} />}
                          <span>
                            {selectedOption === activity.quiz.correctIndex
                              ? 'Spot on! Correct answer.'
                              : 'Not quite. Review the explanation below:'}
                          </span>
                        </div>
                        <p className="lms-quiz-rationale">{activity.quiz.explanation}</p>
                        <button
                          type="button"
                          onClick={() => { setQuizSubmitted(false); setSelectedOption(null) }}
                          className="button button-outline-warm lms-quiz-retry-btn"
                        >
                          Retry Question
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="lms-quiz-widget">
                    <div className="lms-quiz-header"><span>CHECK-IN</span></div>
                    <p style={{ marginTop: 12, color: '#6C6D75' }}>
                      Reflect on the key takeaway from the Lesson Guide and mark this lesson complete when ready.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Bottom Action Dock ── */}
      <footer className="lms-dock">
        <div className="lms-dock-inner">
          {prevIdx !== null ? (
            <button type="button" onClick={() => goTo(prevIdx)} className="lms-dock-nav-btn prev">
              <ArrowLeft size={16} /><span className="lms-dock-text">Prev</span>
            </button>
          ) : (
            <button type="button" disabled className="lms-dock-nav-btn prev disabled">
              <ArrowLeft size={16} /><span className="lms-dock-text">Prev</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleComplete}
            className={`lms-dock-complete-btn ${isCurrentCompleted ? 'is-completed' : ''}`}
          >
            <span className="lms-btn-icon-circle"><Check size={14} strokeWidth={3} /></span>
            <span>{isCurrentCompleted ? 'Completed' : 'Mark as Completed'}</span>
          </button>

          {nextIdx !== null ? (
            <button type="button" onClick={() => goTo(nextIdx)} className="lms-dock-nav-btn next">
              <span className="lms-dock-text">Next</span><ArrowRight size={16} />
            </button>
          ) : (
            <Link href={`/courses/${slug}`} className="lms-dock-nav-btn finish">
              <span className="lms-dock-text">Finish</span><Award size={16} />
            </Link>
          )}
        </div>
      </footer>

      {/* ── Mobile Curriculum Drawer ── */}
      {drawerOpen && (
        <div className="lms-drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div
            className="lms-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Course curriculum"
          >
            <div className="lms-drawer-top">
              <div className="lms-drawer-title-group">
                <span className="lms-drawer-eyebrow">COURSE SYLLABUS</span>
                <h3>{course.course}</h3>
                <span className="lms-drawer-progress-sub">
                  {completedCount} of {totalLessons} completed ({progressPercent}%)
                </span>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} className="lms-drawer-close" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="lms-drawer-scroll-body">
              <div className="lms-drawer-mod-section">
                <div className="lms-drawer-mod-header">
                  <span>MODULE 01</span>
                  <h4>{course.course}</h4>
                </div>
                <div className="lms-drawer-lesson-list">
                  {course.lessons.map((lessonName, idx) => {
                    const isCurrent = idx === currentIdx
                    const isDone = completedIds.includes(idx)
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goTo(idx)}
                        className={`lms-drawer-item ${isCurrent ? 'active-lesson' : ''} ${isDone ? 'done-lesson' : ''}`}
                      >
                        <span className={`lms-drawer-check ${isDone ? 'is-done' : ''}`}>
                          {isDone ? <Check size={12} strokeWidth={3} /> : <span>{String(idx + 1).padStart(2, '0')}</span>}
                        </span>
                        <div className="lms-drawer-item-content">
                          <span className="lms-drawer-item-title">{lessonName}</span>
                          <span className="lms-drawer-item-sub">LESSON {String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        {isCurrent && <span className="lms-now-playing-pill">NOW</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {userId && <AppBottomNav active="courses" />}
    </div>
  )
}
