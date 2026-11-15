'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'
import Brand from '@/components/brand'
import { useUser } from '@/hooks/use-user'

interface QuestionOption {
  label: string
  subtext: string
  scores: {
    foundations?: number
    creator?: number
    freelance?: number
    content?: number
    automation?: number
    apps?: number
  }
}

interface Question {
  id: number
  kicker: string
  title: string
  subtitle: string
  options: QuestionOption[]
}

const quizQuestions: Question[] = [
  {
    id: 1,
    kicker: '01 / WHAT YOU WANT TO LEARN',
    title: 'What would you like to learn to do?',
    subtitle: 'Choose the kind of practical work you want to explore.',
    options: [
      {
        label: 'Use AI for everyday work',
        subtext: 'Understand what AI can do and practise using it for a task.',
        scores: { foundations: 4, content: 1 },
      },
      {
        label: 'Create videos, images or written content',
        subtext: 'Develop ideas and make original content with AI as a tool.',
        scores: { content: 4, creator: 2 },
      },
      {
        label: 'Plan and manage a YouTube channel',
        subtext: 'Choose an audience, plan videos and understand channel basics.',
        scores: { creator: 4 },
      },
      {
        label: 'Offer a digital service',
        subtext: 'Describe a service and practise responding to a sample client brief.',
        scores: { freelance: 4, content: 1 },
      },
      {
        label: 'Automate a repetitive task',
        subtext: 'Map a routine task and explore how digital tools can work together.',
        scores: { automation: 4 },
      },
      {
        label: 'Build a simple app or digital tool',
        subtext: 'Plan a tool, connect user input and test how it responds.',
        scores: { apps: 4 },
      },
    ],
  },
  {
    id: 2,
    kicker: '02 / WHERE YOU ARE NOW',
    title: "Be honest — how comfortable are you with AI tools right now?",
    subtitle: 'This helps us suggest a useful starting point.',
    options: [
      {
        label: "I haven't really used AI tools yet",
        subtext: "ChatGPT sounds familiar but I've never used it seriously. Completely fine.",
        scores: { foundations: 4, creator: 1 },
      },
      {
        label: 'I use AI tools sometimes',
        subtext: 'I can try a tool, but I want to get more useful and reliable results.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: 'I have connected tools or workflows before',
        subtext: 'I am comfortable thinking through steps and how tools work together.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'I want to build a simple digital tool',
        subtext: 'I am interested in prototypes, apps or interactive projects.',
        scores: { apps: 4, automation: 2 },
      },
    ],
  },
  {
    id: 3,
    kicker: '03 / YOUR TIME',
    title: 'How much time can you set aside for learning each week?',
    subtitle: 'Choose an estimate that fits your current schedule.',
    options: [
      {
        label: '1 to 2 hours',
        subtext: 'A little time for lessons or practice during the week.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: '3 to 5 hours',
        subtext: 'Time for regular lessons and practice.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: '6 or more hours',
        subtext: 'I have more time available for learning and practice.',
        scores: { freelance: 4, automation: 3, apps: 3 },
      },
    ],
  },
  {
    id: 4,
    kicker: '04 / YOUR STYLE',
    title: 'Which kind of work do you actually enjoy doing?',
    subtitle: 'Your preferences can help narrow the examples you see.',
    options: [
      {
        label: 'Scripts, storytelling, videos',
        subtext: 'Thumbnails, hooks, pacing, audio — building something people watch.',
        scores: { creator: 4, content: 3 },
      },
      {
        label: 'Understanding a brief and shaping a solution',
        subtext: 'I like clarifying what is needed and planning a useful response.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'Connecting steps and tools',
        subtext: 'I like thinking about how a process could work more smoothly.',
        scores: { automation: 4, apps: 1 },
      },
      {
        label: 'Writing, research, structured thinking',
        subtext: 'Articles, pitches, briefs, outlines — I think clearly and I write well.',
        scores: { content: 4, foundations: 2 },
      },
    ],
  },
  {
    id: 5,
    kicker: '05 / HOW YOU LIKE TO LEARN',
    title: 'What would help you learn a new skill?',
    subtitle: 'Choose the kind of learning support that matters most to you.',
    options: [
      {
        label: 'Practice activities',
        subtext: 'A chance to apply ideas instead of only reading or watching.',
        scores: { foundations: 3, freelance: 3, automation: 2 },
      },
      {
        label: 'Clear explanations for beginners',
        subtext: 'Simple language and a step-by-step introduction to the topic.',
        scores: { foundations: 3, creator: 2, apps: 1 },
      },
      {
        label: 'Examples related to real tasks',
        subtext: 'Lessons that show how a skill might be used in practice.',
        scores: { freelance: 2, content: 3, automation: 2 },
      },
      {
        label: 'Guidance on choosing tools',
        subtext: 'Help understanding what a tool can do and where it has limits.',
        scores: { foundations: 3, apps: 2, automation: 2 },
      },
    ],
  },
  {
    id: 6,
    kicker: '06 / WHAT YOU WANT TO PRACTISE',
    title: 'Which activity would you like to try first?',
    subtitle: 'Choose a project or task that sounds useful to you.',
    options: [
      {
        label: 'Plan a YouTube channel and outline a video',
        subtext: 'Choose an audience and prepare an original video idea.',
        scores: { creator: 5 },
      },
      {
        label: 'Draft a service offer and sample proposal',
        subtext: 'Describe what you could offer and how you would respond to a brief.',
        scores: { freelance: 5 },
      },
      {
        label: 'Map a routine task and test a workflow idea',
        subtext: 'Write down the steps and consider where a tool might help.',
        scores: { automation: 5 },
      },
      {
        label: 'Use AI to draft or review a piece of work',
        subtext: 'Try a tool, check its response and make your own improvements.',
        scores: { foundations: 4, content: 3 },
      },
      {
        label: 'Build and test a simple app prototype',
        subtext: 'Plan a small tool and try it with sample inputs.',
        scores: { apps: 5 },
      },
    ],
  },
  {
    id: 7,
    kicker: '07 / HOW YOU WORK',
    title: 'Do you prefer working solo or directly with clients?',
    subtitle: 'This helps us suggest examples that fit your preference.',
    options: [
      {
        label: 'Mostly independent work',
        subtext: 'I prefer planning, creating or testing things on my own.',
        scores: { creator: 3, automation: 3, apps: 2 },
      },
      {
        label: 'Working with clients or a team',
        subtext: 'I like discussing what people need and planning work together.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: "I need solid basics first, then I'll decide",
        subtext: 'I want to learn the basics before choosing a direction.',
        scores: { foundations: 4 },
      },
    ],
  },
]

interface AcademyResult {
  key: string
  title: string
  archetype: string
  tagline: string
  description: string
  recommendedCourse: string
  courseSlug: string
  duration: string
  lessonsCount: number
  keySkills: string[]
  firstSprint: string
  tone: string
}

const academyProfiles: Record<string, AcademyResult> = {
  creator: {
    key: 'creator',
    title: 'Creator Economy & YouTube Academy',
    archetype: 'The Channel Builder',
    tagline: 'Plan original videos and learn the basics of a YouTube channel.',
    description:
      'Your answers suggest you may enjoy planning video content. Explore audience research, original video ideas, channel basics and the policies creators need to review.',
    recommendedCourse: 'YouTube Business Fundamentals',
    courseSlug: 'youtube-business-fundamentals',
    duration: '2h 30m',
    lessonsCount: 8,
    keySkills: ['Audience research', 'Video planning', 'Original content', 'Policy awareness'],
    firstSprint: 'Choose an audience and outline one original video idea.',
    tone: 'lavender',
  },
  freelance: {
    key: 'freelance',
    title: 'AI Freelancing Academy',
    archetype: 'The Service Planner',
    tagline: 'Describe a digital service and practise responding to a client brief.',
    description:
      'Your answers suggest you may enjoy solving practical problems. Learn to describe a service, prepare a sample and practise responding to a brief. Courses do not guarantee clients, employment or income.',
    recommendedCourse: 'AI for Your Freelance Business',
    courseSlug: 'ai-for-your-freelance-business',
    duration: '4h 00m',
    lessonsCount: 14,
    keySkills: ['Service planning', 'Brief writing', 'Sample work', 'Clear proposals'],
    firstSprint: 'Draft a service offer and a sample response to a client brief.',
    tone: 'coral',
  },
  automation: {
    key: 'automation',
    title: 'AI Automation Academy',
    archetype: 'The Systems Builder',
    tagline: 'Map a repeated task and explore how digital tools can work together.',
    description:
      'Your answers suggest you may enjoy thinking in steps. Learn to map a task, plan a workflow and test how tools handle the work. Review automated results before relying on them.',
    recommendedCourse: 'Build Your First AI Workflow',
    courseSlug: 'build-your-first-ai-workflow',
    duration: '3h 45m',
    lessonsCount: 10,
    keySkills: ['Workflow mapping', 'Tool connections', 'Testing results', 'Handling errors'],
    firstSprint: 'Map a repeated task and sketch a simple workflow to test.',
    tone: 'blue',
  },
  content: {
    key: 'content',
    title: 'AI Content Creation Academy',
    archetype: 'The Content Maker',
    tagline: 'Use AI to support content work, then shape it in your own voice.',
    description:
      'Your answers suggest you may enjoy writing and research. Practise turning a brief into a draft, editing it for a clear purpose and checking the final work.',
    recommendedCourse: 'The Freelance AI Content Studio',
    courseSlug: 'freelance-ai-content-studio',
    duration: '4h 30m',
    lessonsCount: 16,
    keySkills: ['Brief writing', 'AI-assisted drafting', 'Editing', 'Content review'],
    firstSprint: 'Create and edit a short content sample from a brief.',
    tone: 'lime',
  },
  apps: {
    key: 'apps',
    title: 'AI App Development Academy',
    archetype: 'The Tool Builder',
    tagline: 'Plan a simple digital tool and test how it responds.',
    description:
      'Your answers suggest you may enjoy making interactive tools. Explore how to plan a small app, connect user input to AI and test the results.',
    recommendedCourse: 'Build a Helpful AI App',
    courseSlug: 'build-a-helpful-ai-app',
    duration: '1h 45m',
    lessonsCount: 8,
    keySkills: ['Input and output', 'Prompt structure', 'Interface planning', 'Testing'],
    firstSprint: 'Plan a small app and test it with sample inputs.',
    tone: 'peach',
  },
  foundations: {
    key: 'foundations',
    title: 'AI Foundations Academy',
    archetype: 'The Practical Starter',
    tagline: 'Understand what AI can do and practise using it for everyday tasks.',
    description:
      'Your answers suggest you may want to start with the basics. Learn what AI tools can and cannot do, how to give them useful instructions and how to review their responses.',
    recommendedCourse: 'Your AI Toolkit: A Practical Start',
    courseSlug: 'ai-toolkit-practical-start',
    duration: '2h 15m',
    lessonsCount: 8,
    keySkills: ['Clear instructions', 'Tool selection', 'Reviewing responses', 'Everyday practice'],
    firstSprint: 'Choose an everyday task and try it with an AI tool.',
    tone: 'lavender',
  },
}

export default function QuizPage() {
  const { user } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progressPercent = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = { ...answers, [currentQuestionIndex]: optionIndex }
    setAnswers(updatedAnswers)

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setIsCompleted(false)
  }

  const result = useMemo(() => {
    const scores: Record<string, number> = {
      foundations: 0,
      creator: 0,
      freelance: 0,
      content: 0,
      automation: 0,
      apps: 0,
    }

    Object.entries(answers).forEach(([qIdxStr, optionIdx]) => {
      const qIdx = parseInt(qIdxStr, 10)
      const q = quizQuestions[qIdx]
      if (q && q.options[optionIdx]) {
        const optionScores = q.options[optionIdx].scores
        Object.entries(optionScores).forEach(([key, val]) => {
          scores[key] = (scores[key] || 0) + (val || 0)
        })
      }
    })

    const sortedAcademies = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const topKey = sortedAcademies[0]?.[0] || 'foundations'
    const runnerUpKey = sortedAcademies[1]?.[0] || 'creator'

    return {
      top: academyProfiles[topKey] || academyProfiles.foundations,
      runnerUp: academyProfiles[runnerUpKey] || academyProfiles.creator,
      scores,
    }
  }, [answers])

  return (
    <div className="quiz-shell">
      {/* ── Header ── */}
      <header className="quiz-header">
        <div className="quiz-header-inner">
          <Brand />
          <div className="quiz-header-actions">
            <Link href="/courses" className="quiz-back-link">
              Browse courses
            </Link>
            {user ? (
              <Link href="/dashboard" className="quiz-user-pill">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="quiz-login-btn">
                Log in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Quiz Body ── */}
      <main className="quiz-main">
        {!isCompleted ? (
          <div className="quiz-card-container">
            {/* Progress */}
            <div className="quiz-progress-wrap" aria-label={`Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}>
              <div className="quiz-progress-meta">
                <span className="quiz-step-count">
                  {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="quiz-step-percent">{progressPercent}%</span>
              </div>
              <div className="quiz-progress-track">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="quiz-question-card">
              <span className="quiz-kicker">{currentQuestion.kicker}</span>
              <h1 className="quiz-question-title">{currentQuestion.title}</h1>
              <p className="quiz-question-subtitle">{currentQuestion.subtitle}</p>

              <div className="quiz-options-list">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestionIndex] === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="quiz-option-index">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="quiz-option-content">
                        <h3>{option.label}</h3>
                        <p>{option.subtext}</p>
                      </div>
                      <div className="quiz-option-indicator">
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="quiz-nav-footer">
                {currentQuestionIndex > 0 ? (
                  <button type="button" onClick={handlePrevious} className="quiz-prev-btn">
                    <ArrowLeft size={16} /> Previous
                  </button>
                ) : (
                  <span className="quiz-note-text">Free assessment. No payment details needed.</span>
                )}
                <span className="quiz-confidential-note">Your answers are not saved by this assessment.</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── Results Screen ── */
          <div className="quiz-result-container">
            {/* Result Tag + Restart */}
            <div className="quiz-result-badge-row">
              <span className="quiz-result-tag">A SUGGESTED LEARNING AREA</span>
              <button type="button" onClick={handleRestart} className="quiz-restart-btn">
                <RotateCcw size={14} /> Retake
              </button>
            </div>

            {/* Primary Result Card */}
            <div className={`quiz-result-card tone--${result.top.tone}`}>
              <div className="quiz-result-card-header">
                <div>
                  <span className="quiz-archetype-label">{result.top.title.toUpperCase()}</span>
                  <h1 className="quiz-archetype-title">{result.top.archetype}</h1>
                  <p className="quiz-archetype-tagline">{result.top.tagline}</p>
                </div>
              </div>

              <p className="quiz-archetype-desc">{result.top.description}</p>

              {/* Skills to explore */}
              <div className="quiz-competencies-block">
                <span className="quiz-block-label">SKILLS TO EXPLORE</span>
                <div className="quiz-skills-tags">
                  {result.top.keySkills.map((skill) => (
                    <span key={skill} className="quiz-skill-chip">
                      <CheckCircle2 size={13} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Course */}
              <div className="quiz-course-highlight">
                <div className="quiz-course-highlight-top">
                  <div>
                    <span className="quiz-course-kicker">START HERE</span>
                    <h3>{result.top.recommendedCourse}</h3>
                    <p className="quiz-course-details">
                      {result.top.lessonsCount} lessons · {result.top.duration}
                    </p>
                  </div>
                  <span className="quiz-free-tag">Free to start</span>
                </div>

                {/* First Sprint */}
                <div className="quiz-first-sprint-box">
                  <div className="sprint-icon-box">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <strong>A practical first exercise:</strong>
                    <p>{result.top.firstSprint}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="quiz-cta-row">
                  <Link
                    href={`/courses/${result.top.courseSlug}`}
                    className="button button-dark quiz-primary-cta"
                  >
                    <span>View suggested course</span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link href="/courses" className="button button-light quiz-secondary-cta">
                    <span>Browse all courses</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Runner-up track */}
            <div className="quiz-runnerup-card">
              <div className="quiz-runnerup-header">
                <div>
                  <span className="quiz-runnerup-kicker">ALSO WORTH EXPLORING</span>
                  <h3>{result.runnerUp.title}</h3>
                  <p>{result.runnerUp.tagline}</p>
                </div>
                <Link href={`/courses/${result.runnerUp.courseSlug}`} className="quiz-runnerup-link">
                  Browse <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Learning notes */}
            <div className="quiz-guarantee-strip">
              <div className="guarantee-item">
                <span className="guarantee-num">01</span>
                <div>
                  <h4>Practical learning</h4>
                  <p>Courses include lessons and practice activities; what you make depends on the course.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">02</span>
                <div>
                  <h4>Free courses to explore</h4>
                  <p>Review course outlines before deciding what you want to study.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">03</span>
                <div>
                  <h4>No outcome guarantees</h4>
                  <p>Course completion does not guarantee clients, employment, views, monetisation or income.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
