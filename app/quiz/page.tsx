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
    kicker: '01 / WHAT YOU WANT',
    title: 'What do you actually want to earn from?',
    subtitle: 'Pick the one that fits your current situation — not your dream situation.',
    options: [
      {
        label: 'Get paid by clients for a service',
        subtext: 'Package a skill, pitch to businesses, collect payment. Upwork, local contracts, WhatsApp referrals.',
        scores: { freelance: 4, content: 2, foundations: 1 },
      },
      {
        label: 'Build a channel or media asset',
        subtext: 'YouTube, faceless content, newsletters — something that earns while you sleep.',
        scores: { creator: 4, content: 2 },
      },
      {
        label: 'Stop doing repetitive work manually',
        subtext: 'Automate client replies, reports, graphics — reclaim hours every single week.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'Understand AI properly before choosing',
        subtext: "I keep hearing about AI but don't know where to start. Give me solid basics first.",
        scores: { foundations: 4 },
      },
    ],
  },
  {
    id: 2,
    kicker: '02 / WHERE YOU ARE NOW',
    title: "Be honest — how comfortable are you with AI tools right now?",
    subtitle: 'Every track starts from zero. This just helps us point you to the right entry point.',
    options: [
      {
        label: "I haven't really used AI tools yet",
        subtext: "ChatGPT sounds familiar but I've never used it seriously. Completely fine.",
        scores: { foundations: 4, creator: 1 },
      },
      {
        label: 'I use ChatGPT sometimes but randomly',
        subtext: "I copy-paste prompts from Google. It works occasionally but I don't have a system.",
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: 'I understand workflows and love connecting things',
        subtext: 'Spreadsheets, step-by-step logic, linking apps together — that makes sense to me.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'I want to build actual tools, not just use them',
        subtext: 'APIs, prototypes, interactive things — I want to go beyond text generation.',
        scores: { apps: 4, automation: 2 },
      },
    ],
  },
  {
    id: 3,
    kicker: '03 / YOUR TIME',
    title: 'How much time can you honestly commit each week?',
    subtitle: '20 minutes daily beats 4 hours once. Be real.',
    options: [
      {
        label: '1 to 2 hours — I have a busy life',
        subtext: 'Short lessons I can do on my phone between other things.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: '3 to 5 hours — I can be consistent',
        subtext: '30 to 45 minutes most evenings. Watch, practice, build.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: '6+ hours — I need this to work fast',
        subtext: "I'm transitioning, job-hunting, or trying to replace my income. All in.",
        scores: { freelance: 4, automation: 3, apps: 3 },
      },
    ],
  },
  {
    id: 4,
    kicker: '04 / YOUR STYLE',
    title: 'Which kind of work do you actually enjoy doing?',
    subtitle: 'The best track is one you will actually finish.',
    options: [
      {
        label: 'Scripts, storytelling, videos',
        subtext: 'Thumbnails, hooks, pacing, audio — building something people watch.',
        scores: { creator: 4, content: 3 },
      },
      {
        label: 'Solving a client problem and getting paid',
        subtext: "Brief comes in, I figure it out, I deliver, I invoice. That's satisfying.",
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'Connecting systems so they run themselves',
        subtext: "Triggers, pipelines, no more manual clicking — I want that life.",
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
    kicker: '05 / PAST FRUSTRATION',
    title: "What's killed your momentum with online learning before?",
    subtitle: 'ituwaAfrica was built to fix exactly one of these.',
    options: [
      {
        label: 'Finished videos, built nothing',
        subtext: 'Hours of watching. No project. No portfolio. No result.',
        scores: { foundations: 3, freelance: 3 },
      },
      {
        label: "Courses built for people abroad, not for me",
        subtext: 'Tools I cannot afford, examples that make no sense in Nigeria.',
        scores: { creator: 3, freelance: 3 },
      },
      {
        label: 'Started strong, lost steam with no structure',
        subtext: 'Nobody checking in, no clear next step, just disappeared.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: 'The tools kept changing and the course went stale',
        subtext: 'Learned a button layout. Update dropped. Course was useless.',
        scores: { automation: 3, apps: 3, foundations: 2 },
      },
    ],
  },
  {
    id: 6,
    kicker: '06 / 30-DAY WIN',
    title: 'In 30 days, which result would actually mean something to you?',
    subtitle: 'Pick what you would actually show someone.',
    options: [
      {
        label: 'A published YouTube video or complete channel setup',
        subtext: 'Title, script, voiceover, thumbnail — built and live.',
        scores: { creator: 5 },
      },
      {
        label: 'A service offer I can pitch and get paid for',
        subtext: 'One clear deliverable, priced, ready to send to prospects.',
        scores: { freelance: 5 },
      },
      {
        label: 'An automation saving me 5+ hours every week',
        subtext: 'Running in the background. Handling what I used to do manually.',
        scores: { automation: 5 },
      },
      {
        label: 'Knowing how to get useful output from AI every time',
        subtext: 'No more useless responses. A prompt system that actually works.',
        scores: { foundations: 4, content: 3 },
      },
    ],
  },
  {
    id: 7,
    kicker: '07 / HOW YOU WORK',
    title: 'Do you prefer working solo or directly with clients?',
    subtitle: 'Both earn — this just shapes how your track is structured.',
    options: [
      {
        label: 'Solo — build assets, stay behind the scenes',
        subtext: 'Faceless. Automated. No pitching on calls every day.',
        scores: { creator: 3, automation: 3, apps: 2 },
      },
      {
        label: 'Client-facing — solve problems, send invoices',
        subtext: 'Talk to business owners, understand their needs, deliver and earn.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: "I need solid basics first, then I'll decide",
        subtext: 'Let me learn properly. I will figure out the money angle after.',
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
    tagline: 'Build a real media channel. Grow an audience. Earn without showing your face.',
    description:
      'Your answers point to building content that earns over time. This track shows you how to plan faceless channels, write scripts that hook viewers, stay within YouTube policies, and package your media work as a sellable asset — not just a hobby.',
    recommendedCourse: 'YouTube Business Fundamentals',
    courseSlug: 'youtube-business-fundamentals',
    duration: '2h 30m',
    lessonsCount: 8,
    keySkills: ['Faceless Channel Strategy', 'Script & Hook Writing', 'YouTube Policy & Copyright', 'Monetisation Planning'],
    firstSprint: 'Plan a 3-part faceless video series and write your first 60-second hook script.',
    tone: 'lavender',
  },
  freelance: {
    key: 'freelance',
    title: 'AI Freelancing Academy',
    archetype: 'The Paid Specialist',
    tagline: 'Package one clear service. Land paying clients. Earn without a 9-to-5.',
    description:
      'You want to get paid — directly, clearly, and soon. This track shows you how to pick one AI-powered service, build a sample to prove your skill, write a pitch that actually gets replies, and deliver work that earns repeat business. No fluff. No foreign case studies.',
    recommendedCourse: 'AI for Your Freelance Business',
    courseSlug: 'ai-for-your-freelance-business',
    duration: '4h 00m',
    lessonsCount: 14,
    keySkills: ['Service Packaging', 'Client Pitching', 'Portfolio Samples', 'Pricing & Invoicing'],
    firstSprint: 'Define 1 service offer, build a sample deliverable, and write your first pitch message.',
    tone: 'coral',
  },
  automation: {
    key: 'automation',
    title: 'AI Automation Academy',
    archetype: 'The Systems Builder',
    tagline: 'Stop doing repetitive work. Build workflows that handle it for you.',
    description:
      'You think in steps and hate wasted time. This track shows you how to map manual tasks, build multi-step AI workflows, and connect tools so they run without you touching them every day. Saves time — and can be sold as a service to small businesses.',
    recommendedCourse: 'Build Your First AI Workflow',
    courseSlug: 'build-your-first-ai-workflow',
    duration: '3h 45m',
    lessonsCount: 10,
    keySkills: ['Workflow Mapping', 'Multi-Step Prompt Chains', 'Tool Connections', 'Selling Automation Services'],
    firstSprint: 'Automate one manual task you do every week using a 2-step prompt pipeline.',
    tone: 'blue',
  },
  content: {
    key: 'content',
    title: 'AI Content Creation Academy',
    archetype: 'The Content Operator',
    tagline: 'Write faster, pitch better, deliver polished content clients actually pay for.',
    description:
      'You are a clear thinker who communicates well. This track shows you how to use AI to draft articles, social posts, email campaigns, and pitch decks without losing your voice — and how to sell that output to businesses and creators who need it.',
    recommendedCourse: 'The Freelance AI Content Studio',
    courseSlug: 'the-freelance-ai-content-studio',
    duration: '4h 30m',
    lessonsCount: 16,
    keySkills: ['Structured Drafting', 'Brand Voice Control', 'Editorial Workflows', 'Content Pricing'],
    firstSprint: 'Write an 800-word article and social carousel package using a 3-step prompt framework.',
    tone: 'lime',
  },
  apps: {
    key: 'apps',
    title: 'AI App Development Academy',
    archetype: 'The Product Builder',
    tagline: 'Build real tools. Charge for access. Ship without a computer science degree.',
    description:
      'You want to make things, not just use things. This track shows you how to connect APIs, build simple interactive prototypes, and ship tools that solve real problems — including how to charge for access and present them to clients or investors.',
    recommendedCourse: 'Build a Helpful AI App',
    courseSlug: 'build-a-helpful-ai-app',
    duration: '6h 20m',
    lessonsCount: 18,
    keySkills: ['API Integration', 'UI Prototyping', 'Prompt Logic', 'Shipping & Pricing Tools'],
    firstSprint: 'Build a single-purpose tool that takes user input and produces structured business output.',
    tone: 'peach',
  },
  foundations: {
    key: 'foundations',
    title: 'AI Foundations Academy',
    archetype: 'The Practical Starter',
    tagline: 'Get the basics right. Build habits that actually produce results.',
    description:
      "You are done with hype and want something solid. This track gives you the actual fundamentals — how AI works, how to write prompts that get useful results, how to spot bad outputs, and how to build a daily practice that compounds. Everything else sits on top of this.",
    recommendedCourse: 'Your AI Toolkit: A Practical Start',
    courseSlug: 'your-ai-toolkit-practical-start',
    duration: '2h 15m',
    lessonsCount: 8,
    keySkills: ['Prompt Craft', 'Tool Selection', 'Spotting Bad Outputs', 'Building a Daily Practice'],
    firstSprint: 'Master the 4-part prompt structure and build 3 prompt chains you will actually use this week.',
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
                  <span className="quiz-note-text">Under 90 seconds. No card required.</span>
                )}
                <span className="quiz-confidential-note">Your answers stay private</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── Results Screen ── */
          <div className="quiz-result-container">
            {/* Result Tag + Restart */}
            <div className="quiz-result-badge-row">
              <span className="quiz-result-tag">YOUR RECOMMENDED TRACK</span>
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

              {/* Skills you will build */}
              <div className="quiz-competencies-block">
                <span className="quiz-block-label">WHAT YOU WILL ACTUALLY BUILD</span>
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
                    <strong>Your first 7-day sprint:</strong>
                    <p>{result.top.firstSprint}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="quiz-cta-row">
                  {user ? (
                    <Link
                      href={`/onboarding?academy=${result.top.key}`}
                      className="button button-dark quiz-primary-cta"
                    >
                      <span>Start this track</span>
                      <ArrowRight size={17} />
                    </Link>
                  ) : (
                    <Link
                      href={`/signup?recommended=${result.top.key}`}
                      className="button button-dark quiz-primary-cta"
                    >
                      <span>Create free account to start</span>
                      <ArrowRight size={17} />
                    </Link>
                  )}
                  <Link
                    href={`/courses/${result.top.courseSlug}`}
                    className="button button-light quiz-secondary-cta"
                  >
                    <span>See full course outline</span>
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

            {/* Why ituwaAfrica */}
            <div className="quiz-guarantee-strip">
              <div className="guarantee-item">
                <span className="guarantee-num">01</span>
                <div>
                  <h4>No passive watching</h4>
                  <p>Every lesson ends with something you built, wrote, or shipped.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">02</span>
                <div>
                  <h4>Works on data and mobile</h4>
                  <p>Text-first lessons built for Nigerian network conditions.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">03</span>
                <div>
                  <h4>No income guarantees</h4>
                  <p>We teach real skills. What you earn depends on what you build and ship.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
