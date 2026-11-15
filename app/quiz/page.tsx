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
    title: 'What would you like to learn or make?',
    subtitle: 'Choose the activity you want to try first.',
    options: [
      {
        label: 'Use AI for everyday tasks',
        subtext: 'Try AI on a task you already do.',
        scores: { foundations: 4, content: 1 },
      },
      {
        label: 'Create content with AI',
        subtext: 'Use AI for ideas or a first draft, then make the content your own.',
        scores: { content: 4, creator: 2 },
      },
      {
        label: 'Plan a YouTube channel',
        subtext: 'Choose an audience and plan original videos with AI support.',
        scores: { creator: 4 },
      },
      {
        label: 'Offer a digital service',
        subtext: 'Use AI to shape a service idea and answer a sample client brief.',
        scores: { freelance: 4, content: 1 },
      },
      {
        label: 'Use AI tools on a repeated task',
        subtext: 'Plan the steps and test where a tool might help.',
        scores: { automation: 4 },
      },
      {
        label: 'Build a simple AI app',
        subtext: 'Plan what people enter, what the app does and what it returns.',
        scores: { apps: 4 },
      },
    ],
  },
  {
    id: 2,
    kicker: '02 / WHERE YOU ARE NOW',
    title: 'How much have you used AI tools?',
    subtitle: 'Your answer helps us suggest where to start.',
    options: [
      {
        label: "I'm new to AI tools",
        subtext: "I have used them little or not at all.",
        scores: { foundations: 4, creator: 1 },
      },
      {
        label: 'I use AI sometimes',
        subtext: 'I want to get more useful answers and check them well.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: "I've connected tools before",
        subtext: 'I know how to make tools work together.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'I want to build an app',
        subtext: 'I want to make and test a simple digital tool.',
        scores: { apps: 4, automation: 2 },
      },
    ],
  },
  {
    id: 3,
    kicker: '03 / YOUR TIME',
    title: 'How much time can you study each week?',
    subtitle: 'Choose what fits your schedule now.',
    options: [
      {
        label: '1 to 2 hours',
        subtext: 'Time for a few lessons or practice.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: '3 to 5 hours',
        subtext: 'Time to study and practise regularly.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: '6 or more hours',
        subtext: 'I have extra time to study and practise.',
        scores: { freelance: 4, automation: 3, apps: 3 },
      },
    ],
  },
  {
    id: 4,
    kicker: '04 / YOUR STYLE',
    title: 'What kind of work do you enjoy?',
    subtitle: 'Choose the kind of task you like doing.',
    options: [
      {
        label: 'Writing stories or making videos',
        subtext: 'I like making things people can read or watch.',
        scores: { creator: 4, content: 3 },
      },
      {
        label: 'Solving a client problem',
        subtext: 'I like finding out what someone needs and suggesting a solution.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'Finding a better way to do a task',
        subtext: 'I like organising steps and choosing useful tools.',
        scores: { automation: 4, apps: 1 },
      },
      {
        label: 'Writing and research',
        subtext: 'I like finding information and explaining it clearly.',
        scores: { content: 4, foundations: 2 },
      },
    ],
  },
  {
    id: 5,
    kicker: '05 / HOW YOU LIKE TO LEARN',
    title: 'What helps you learn?',
    subtitle: 'Choose the kind of help you want most.',
    options: [
      {
        label: 'Practice activities',
        subtext: 'I want to try the skill, not just read about it.',
        scores: { foundations: 3, freelance: 3, automation: 2 },
      },
      {
        label: 'Clear explanations for beginners',
        subtext: 'I want a simple explanation, one step at a time.',
        scores: { foundations: 3, creator: 2, apps: 1 },
      },
      {
        label: 'Examples related to real tasks',
        subtext: 'I want to see how a skill works on a real task.',
        scores: { freelance: 2, content: 3, automation: 2 },
      },
      {
        label: 'Guidance on choosing tools',
        subtext: 'I want to know what a tool can and cannot do.',
        scores: { foundations: 3, apps: 2, automation: 2 },
      },
    ],
  },
  {
    id: 6,
    kicker: '06 / WHAT YOU WANT TO PRACTISE',
    title: 'What would you like to try first?',
    subtitle: 'Choose one practical task.',
    options: [
      {
        label: 'Plan a YouTube channel',
        subtext: 'Choose an audience and outline one original video.',
        scores: { creator: 5 },
      },
      {
        label: 'Create a service offer',
        subtext: 'Say what service you could provide and answer a sample brief.',
        scores: { freelance: 5 },
      },
      {
        label: 'Improve a task you repeat',
        subtext: 'Write down the steps and test where AI might help.',
        scores: { automation: 5 },
      },
      {
        label: 'Use AI to draft something',
        subtext: 'Check the answer and improve it yourself.',
        scores: { foundations: 4, content: 3 },
      },
      {
        label: 'Build and test a simple AI app',
        subtext: 'Choose what goes in and check what the app returns.',
        scores: { apps: 5 },
      },
    ],
  },
  {
    id: 7,
    kicker: '07 / HOW YOU WORK',
    title: 'How do you like to work?',
    subtitle: 'Choose what sounds more like you.',
    options: [
      {
        label: 'Mostly independent work',
        subtext: 'I like to plan or make things on my own.',
        scores: { creator: 3, automation: 3, apps: 2 },
      },
      {
        label: 'Working with clients or a team',
        subtext: 'I like talking with people and solving problems together.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'I want to learn the basics first',
        subtext: 'I will choose a direction later.',
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
    archetype: 'YouTube channel planner',
    tagline: 'Use AI to plan original videos and learn how YouTube channels work.',
    description:
      'Based on your answers, this may be a useful place to start. Learn about your audience, plan original videos with AI support and check YouTube rules.',
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
    archetype: 'Digital service planner',
    tagline: 'Use AI to plan a digital service and answer a sample client brief.',
    description:
      'Based on your answers, this may be a useful place to start. Use AI to shape a service idea, make a sample and answer a practice brief. This course does not guarantee clients, a job or income.',
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
    archetype: 'Task automation learner',
    tagline: 'Use AI tools to help with a task you repeat.',
    description:
      'Based on your answers, this may be a useful place to start. List the steps in a repeated task, try connecting tools and check the result before using it.',
    recommendedCourse: 'Build Your First AI Workflow',
    courseSlug: 'build-your-first-ai-workflow',
    duration: '3h 45m',
    lessonsCount: 10,
    keySkills: ['Task steps', 'Connecting tools', 'Testing results', 'Checking errors'],
    firstSprint: 'List the steps in one repeated task and test where a tool might help.',
    tone: 'blue',
  },
  content: {
    key: 'content',
    title: 'AI Content Creation Academy',
    archetype: 'AI content creator',
    tagline: 'Use AI for content ideas and drafts. Edit the final work in your own voice.',
    description:
      'Based on your answers, this may be a useful place to start. Turn a brief into a draft with AI, edit it and check the final work.',
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
    archetype: 'AI app builder',
    tagline: 'Plan, build and test a simple app that uses AI.',
    description:
      'Based on your answers, this may be a useful place to start. Plan what people enter, what your app does and how to test its answers.',
    recommendedCourse: 'Build a Helpful AI App',
    courseSlug: 'build-a-helpful-ai-app',
    duration: '1h 45m',
    lessonsCount: 8,
    keySkills: ['Input and output', 'Prompt structure', 'Interface planning', 'Testing'],
    firstSprint: 'Choose what goes into a simple app and test its answers.',
    tone: 'peach',
  },
  foundations: {
    key: 'foundations',
    title: 'AI Foundations Academy',
    archetype: 'AI beginner',
    tagline: 'Learn what AI can do and try it on an everyday task.',
    description:
      'Based on your answers, this may be a useful place to start. Learn what AI tools can and cannot do, give clear instructions and check the answers.',
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
                    <span className="quiz-course-kicker">SUGGESTED FIRST COURSE</span>
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
                    <strong>Try this first:</strong>
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
                  <span className="quiz-runnerup-kicker">ANOTHER OPTION</span>
                  <h3>{result.runnerUp.title}</h3>
                  <p>{result.runnerUp.tagline}</p>
                </div>
                <Link href={`/courses/${result.runnerUp.courseSlug}`} className="quiz-runnerup-link">
                  View course <ArrowRight size={14} />
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
                  <h4>No guaranteed results</h4>
                  <p>Finishing a course does not guarantee clients, a job, views, YouTube monetisation or income.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
