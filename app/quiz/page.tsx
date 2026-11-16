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
import { getCourseProduct, formatDualPrice, getActivePrice } from '@/lib/course-products'

type LearningPathKey =
  | 'foundations'
  | 'freelance'
  | 'creator'
  | 'contentMarketing'
  | 'appDevelopment'

interface QuestionOption {
  label: string
  subtext: string
  scores: Partial<Record<LearningPathKey, number>>
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
    kicker: '01 / THE OPPORTUNITY',
    title: 'How would you like to use AI to create value?',
    subtitle: 'Choose the kind of work you would most like to get paid to do.',
    options: [
      {
        label: 'Help a business reach and serve customers',
        subtext: 'Plan useful marketing content around a real audience and business goal.',
        scores: { contentMarketing: 5, freelance: 1 },
      },
      {
        label: 'Offer a useful service to clients',
        subtext: 'Build a clear service and create a sample that shows what you can do.',
        scores: { freelance: 5, contentMarketing: 1 },
      },
      {
        label: 'Create original content for an audience',
        subtext: 'Develop videos or other media that give people a reason to watch.',
        scores: { creator: 5, contentMarketing: 1 },
      },
      {
        label: 'Build a digital product for a real problem',
        subtext: 'Make and test an AI-powered app or tool people can use.',
        scores: { appDevelopment: 5 },
      },
      {
        label: 'Learn the basics before choosing a direction',
        subtext: 'Get comfortable with AI and try it on useful everyday work.',
        scores: { foundations: 5 },
      },
    ],
  },
  {
    id: 2,
    kicker: '02 / WHO YOU WANT TO HELP',
    title: 'Who would you most like your work to benefit?',
    subtitle: 'Think about a customer, client, audience or problem you care about.',
    options: [
      {
        label: 'A small business that needs more customers',
        subtext: 'Help it explain its value and communicate with the right people.',
        scores: { contentMarketing: 4, freelance: 2 },
      },
      {
        label: 'A client with a specific digital task',
        subtext: 'Understand what they need and deliver a useful service.',
        scores: { freelance: 4, appDevelopment: 1 },
      },
      {
        label: 'People who share an interest or community',
        subtext: 'Make original content that informs, helps or entertains them.',
        scores: { creator: 4, contentMarketing: 1 },
      },
      {
        label: 'People struggling with a problem I can solve',
        subtext: 'Create a useful digital tool and learn from people who try it.',
        scores: { appDevelopment: 4, freelance: 1 },
      },
      {
        label: 'Myself, while I learn what AI can do',
        subtext: 'Start with practical foundations before settling on a market.',
        scores: { foundations: 4 },
      },
    ],
  },
  {
    id: 3,
    kicker: '03 / YOUR STARTING POINT',
    title: 'What do you already have to build on?',
    subtitle: 'There is no wrong answer; this helps us suggest a realistic first project.',
    options: [
      {
        label: 'A business, product or service idea',
        subtext: 'I want to attract customers or present an offer more clearly.',
        scores: { contentMarketing: 3, appDevelopment: 1 },
      },
      {
        label: 'Experience I could offer to a client',
        subtext: 'I want to turn what I know into a useful paid service.',
        scores: { freelance: 4 },
      },
      {
        label: 'A topic or community I care about',
        subtext: 'I want to create original content and find my audience.',
        scores: { creator: 4, contentMarketing: 1 },
      },
      {
        label: 'An idea for a tool people might use',
        subtext: 'I want to test the idea by making a simple app.',
        scores: { appDevelopment: 4 },
      },
      {
        label: 'I am still exploring',
        subtext: 'I would benefit from learning the fundamentals first.',
        scores: { foundations: 4 },
      },
    ],
  },
  {
    id: 4,
    kicker: '04 / THE WORK',
    title: 'Which kind of project sounds most interesting?',
    subtitle: 'Choose the result you would be proud to show someone.',
    options: [
      {
        label: 'A marketing plan and content for a business',
        subtext: 'A clear audience, message, channel plan and sample campaign.',
        scores: { contentMarketing: 4, freelance: 1 },
      },
      {
        label: 'A service offer and example client deliverable',
        subtext: 'A focused offer with a sample that demonstrates its value.',
        scores: { freelance: 4 },
      },
      {
        label: 'A video or content series for a specific audience',
        subtext: 'Original ideas shaped around what that audience values.',
        scores: { creator: 4, contentMarketing: 1 },
      },
      {
        label: 'A working prototype of a simple AI app',
        subtext: 'A small tool tested with realistic example inputs.',
        scores: { appDevelopment: 4 },
      },
      {
        label: 'A practical AI project for my own work',
        subtext: 'A useful first result while I build confidence with AI.',
        scores: { foundations: 4 },
      },
    ],
  },
  {
    id: 5,
    kicker: '05 / YOUR EXPERIENCE',
    title: 'Where are you with AI today?',
    subtitle: 'We use this to make the recommendation more useful, not to judge your ability.',
    options: [
      {
        label: 'I am new and want a clear introduction',
        subtext: 'I have used AI a little or not at all.',
        scores: { foundations: 4 },
      },
      {
        label: 'I use AI, but want to make better work with it',
        subtext: 'I want to improve my output and check it carefully.',
        scores: { freelance: 2, contentMarketing: 2, creator: 1 },
      },
      {
        label: 'I have a business or client and want to grow',
        subtext: 'I want to use AI to support real commercial goals.',
        scores: { contentMarketing: 3, freelance: 2 },
      },
      {
        label: 'I have made content or grown an audience',
        subtext: 'I want to create more useful original work.',
        scores: { creator: 3, contentMarketing: 1 },
      },
      {
        label: 'I have tried building a digital tool',
        subtext: 'I want to learn how to make and test a more useful app.',
        scores: { appDevelopment: 3 },
      },
    ],
  },
  {
    id: 6,
    kicker: '06 / YOUR NEXT MOVE',
    title: 'What would you like to make first?',
    subtitle: 'Pick the project you would be most motivated to finish.',
    options: [
      {
        label: 'A campaign idea for a business I know',
        subtext: 'Turn its audience and goals into a useful content plan.',
        scores: { contentMarketing: 5 },
      },
      {
        label: 'A service I could pitch to a potential client',
        subtext: 'Describe the problem, deliverable and value clearly.',
        scores: { freelance: 5 },
      },
      {
        label: 'An original video concept for a real audience',
        subtext: 'Plan something useful, distinctive and worth watching.',
        scores: { creator: 5 },
      },
      {
        label: 'A small AI app that solves one clear problem',
        subtext: 'Build a first version and test it with realistic examples.',
        scores: { appDevelopment: 5 },
      },
      {
        label: 'A practical AI project to build my confidence',
        subtext: 'Start small and learn how to use AI responsibly.',
        scores: { foundations: 5 },
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
  keySkills: string[]
  firstProject: string
  tone: string
}

const academyProfiles: Record<LearningPathKey, AcademyResult> = {
  creator: {
    key: 'creator',
    title: 'Creator business',
    archetype: 'Build an audience-led creator business',
    tagline: 'Create original content around an audience need and explore responsible ways to build a creator business.',
    description:
      'Your answers point toward creator skills. Start by understanding an audience, developing original content and learning about revenue options and platform rules. Views, monetisation and income are never guaranteed.',
    recommendedCourse: 'YouTube Monetization',
    courseSlug: 'youtube-monetization',
    keySkills: ['Audience research', 'Original video planning', 'Creator revenue options', 'Copyright and platform policies'],
    firstProject: 'Choose a specific audience, write down a need they have and outline one original video that addresses it.',
    tone: 'lavender',
  },
  freelance: {
    key: 'freelance',
    title: 'Freelance services',
    archetype: 'Shape a service clients can understand',
    tagline: 'Use AI to clarify a client problem, define a useful deliverable and create a sample of your work.',
    description:
      'Your answers point toward client work. A strong starting point is a clearly scoped service supported by a sample deliverable. This can help you show your skills, but does not guarantee clients, employment or income.',
    recommendedCourse: 'AI Content Marketing for Business',
    courseSlug: 'ai-content-marketing-for-business',
    keySkills: ['Client problem discovery', 'Service positioning', 'Campaign samples', 'Clear proposals'],
    firstProject: 'Choose a local business, identify one communication challenge and draft a sample content idea you could offer as a service.',
    tone: 'coral',
  },
  contentMarketing: {
    key: 'contentMarketing',
    title: 'AI content marketing',
    archetype: 'Help a business earn attention and trust',
    tagline: 'Use audience insight and AI-assisted creation to make useful, original marketing content.',
    description:
      'Your answers point toward business content marketing. Learn to connect audience needs to a clear message, make original content with AI assistance, and review results against a business goal. Marketing results are not guaranteed.',
    recommendedCourse: 'AI Content Marketing for Business',
    courseSlug: 'ai-content-marketing-for-business',
    keySkills: ['Audience and customer research', 'Positioning and messaging', 'Content planning', 'Distribution and measurement'],
    firstProject: 'Pick a business and audience, then outline one useful campaign with a clear goal and a sample post.',
    tone: 'orange',
  },
  appDevelopment: {
    key: 'appDevelopment',
    title: 'AI app development',
    archetype: 'Build a digital product around a real problem',
    tagline: 'Plan and prototype an AI-powered app, then test whether it helps someone do something useful.',
    description:
      'Your answers point toward app development. Focus on one real user problem, make a small working prototype and test it with realistic examples. A prototype is a learning project, not a promise of business success or income.',
    recommendedCourse: 'AI Web App Development',
    courseSlug: 'ai-web-app-development',
    keySkills: ['Problem validation', 'Product scope', 'AI app prototyping', 'Testing and iteration'],
    firstProject: 'Describe one customer problem, sketch the smallest app that could help and write three test cases.',
    tone: 'peach',
  },
  foundations: {
    key: 'foundations',
    title: 'AI foundations',
    archetype: 'Build a useful starting point',
    tagline: 'Learn what AI can and cannot do before choosing a way to apply it.',
    description:
      'Your answers suggest starting with the essentials. Learn to choose a tool for a task, give it useful context and check its output before using it in business or client work.',
    recommendedCourse: 'Your AI Toolkit: A Practical Start',
    courseSlug: 'ai-toolkit-practical-start',
    keySkills: ['AI fundamentals', 'Clear instructions', 'Output review', 'Responsible use'],
    firstProject: 'Choose a real task from your work or business, use AI to make a first draft and check it before relying on it.',
    tone: 'lavender',
  },
}

export default function QuizPage() {
  const { user } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progressPercent = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = { ...answers, [currentQuestionIndex]: optionIndex }
    setAnswers(updatedAnswers)
    setSelectedOptionIndex(optionIndex)

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setSelectedOptionIndex(null)
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOptionIndex(null)
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setSelectedOptionIndex(null)
    setCurrentQuestionIndex(0)
    setIsCompleted(false)
  }

  const result = useMemo(() => {
    const scores: Record<LearningPathKey, number> = {
      foundations: 0,
      freelance: 0,
      creator: 0,
      contentMarketing: 0,
      appDevelopment: 0,
    }

    Object.entries(answers).forEach(([qIdxStr, optionIdx]) => {
      const qIdx = parseInt(qIdxStr, 10)
      const q = quizQuestions[qIdx]
      if (q && q.options[optionIdx]) {
        const optionScores = q.options[optionIdx].scores
        for (const key of Object.keys(optionScores) as LearningPathKey[]) {
          const value = optionScores[key]
          if (value !== undefined) scores[key] += value
        }
      }
    })

    const sortedAcademies = (Object.keys(scores) as LearningPathKey[])
      .map((key) => [key, scores[key]] as const)
      .sort((a, b) => b[1] - a[1])
    const topKey = sortedAcademies[0]?.[0] ?? 'foundations'
    const runnerUpKey = sortedAcademies[1]?.[0] ?? 'creator'

    return {
      top: academyProfiles[topKey],
      runnerUp: academyProfiles[runnerUpKey],
      scores,
    }
  }, [answers])
  const recommendedProduct = getCourseProduct(result.top.courseSlug)
  const priceInfo = formatDualPrice(recommendedProduct ? getActivePrice(recommendedProduct) : undefined)
  const recommendedPrice = priceInfo.isFree ? null : priceInfo.display

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
            <aside className="quiz-editorial-rail" aria-label="Assessment approach">
              <span className="quiz-rail-kicker">ITUWA AFRICA / FIELD GUIDE</span>
              <div className="quiz-method-map" aria-hidden="true">
                <span className="quiz-method-line" />
                <span className="quiz-method-node quiz-method-node--task">01</span>
                <span className="quiz-method-node quiz-method-node--context">02</span>
                <span className="quiz-method-node quiz-method-node--judgement">03</span>
                <span className="quiz-method-label quiz-method-label--task">TASK</span>
                <span className="quiz-method-label quiz-method-label--context">CONTEXT</span>
                <span className="quiz-method-label quiz-method-label--judgement">JUDGEMENT</span>
              </div>
              <span className="quiz-rail-index">PRACTICAL AI / {String(currentQuestionIndex + 1).padStart(2, '0')}</span>
              <h2>Start with the work you want to do.</h2>
              <p>This short assessment connects your interests to a practical learning direction. No technical background needed.</p>
              <div className="quiz-rail-rule" />
              <p className="quiz-rail-footnote">A useful outcome begins with a real task, the right context and your own judgement.</p>
            </aside>

            <div className="quiz-card-column">
              <div className="quiz-progress-wrap" aria-label={`Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}>
                <div className="quiz-progress-meta">
                  <span className="quiz-step-count">
                    QUESTION {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}
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

              <div className="quiz-question-card">
                <span className="quiz-kicker">{currentQuestion.kicker}</span>
                <h1 className="quiz-question-title">{currentQuestion.title}</h1>
                <p className="quiz-question-subtitle">{currentQuestion.subtitle}</p>

                <div className="quiz-options-list">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx
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
          </div>
        ) : (
          /* ── Results Screen ── */
          <div className="quiz-result-container">
            {/* Result Tag + Restart */}
            <div className="quiz-result-badge-row">
              <span className="quiz-result-tag">YOUR SUGGESTED SKILL DIRECTION</span>
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
                      {recommendedProduct?.price
                        ? `Exclusive specialist course · one-time ${recommendedPrice}`
                        : 'Free course'}
                    </p>
                  </div>
                  <span className="quiz-free-tag">
                    {recommendedProduct?.price ? 'Exclusive' : 'Free'}
                  </span>
                </div>

                {/* First project */}
                <div className="quiz-first-sprint-box">
                  <div className="sprint-icon-box">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <strong>Your first project:</strong>
                    <p>{result.top.firstProject}</p>
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
                  <h4>Choose with the full picture</h4>
                  <p>Review course details, price and availability before deciding what to study.</p>
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
