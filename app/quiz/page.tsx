'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Flame,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
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
    kicker: '01 / CORE INTENTION',
    title: 'What is your primary motive for learning AI skills right now?',
    subtitle: 'Be honest about what moves the needle most for your current reality in Nigeria or across Africa.',
    options: [
      {
        label: 'Build a creator channel or digital media asset',
        subtext: 'I want to produce videos, YouTube channels, or creator content without getting stuck on ideas.',
        scores: { creator: 4, content: 2 },
      },
      {
        label: 'Offer high-value freelance services to clients',
        subtext: 'I want to package skills that paying clients and businesses actually want to pay for.',
        scores: { freelance: 4, content: 2, foundations: 1 },
      },
      {
        label: 'Automate repetitive daily tasks and workflows',
        subtext: 'I spend too much time on routine tasks and want systems that work quietly in the background.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'Understand the essentials and cut through the hype',
        subtext: 'I see endless AI headlines and want a grounded, practical foundation of what actually works.',
        scores: { foundations: 4 },
      },
    ],
  },
  {
    id: 2,
    kicker: '02 / TECHNICAL COMFORT',
    title: 'How would you describe your current comfort with digital tools?',
    subtitle: 'There are no wrong answers. Every academy is designed with clear, zero-jargon progression.',
    options: [
      {
        label: 'Complete beginner with AI tools',
        subtext: 'I know how to browse the web and use my phone, but AI tools feel overwhelming or confusing.',
        scores: { foundations: 4, creator: 1 },
      },
      {
        label: 'Comfortable with basic prompts and apps',
        subtext: 'I use ChatGPT occasionally for drafts or questions, but I want structured, repeatable workflows.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: 'Process-oriented and comfortable with workflows',
        subtext: 'I like spreadsheets, step-by-step logic, and connecting different apps together.',
        scores: { automation: 4, apps: 2 },
      },
      {
        label: 'Tech-curious and eager to build functional tools',
        subtext: 'I want to go beyond text generation and assemble real, interactive prototypes.',
        scores: { apps: 4, automation: 2 },
      },
    ],
  },
  {
    id: 3,
    kicker: '03 / WEEKLY COMMITMENT',
    title: 'How much focused time can you realistically invest each week?',
    subtitle: 'Consistency always beats cramming. Short, daily 20-minute sessions yield the fastest results.',
    options: [
      {
        label: '1 to 2 hours per week (Micro-sprints)',
        subtext: 'I have a demanding schedule and need concise, high-impact lessons I can finish on mobile.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: '3 to 5 hours per week (Steady momentum)',
        subtext: 'I can dedicate about 30 to 45 minutes most evenings to watch, practice, and build.',
        scores: { content: 3, freelance: 3, creator: 2 },
      },
      {
        label: '6 to 10 hours per week (Skill acceleration)',
        subtext: 'I am actively investing time to transition careers, launch a channel, or land freelance gigs.',
        scores: { freelance: 4, automation: 3, apps: 3 },
      },
    ],
  },
  {
    id: 4,
    kicker: '04 / WORK STYLE',
    title: 'What kind of work energizes you the most?',
    subtitle: 'Aligning with your natural style makes completing practical projects feel energizing, not like a chore.',
    options: [
      {
        label: 'Visual storytelling, editing, and media concepts',
        subtext: 'Scripting, thumbnails, voice direction, video pacing, and engaging audiences.',
        scores: { creator: 4, content: 3 },
      },
      {
        label: 'Direct client communication and problem-solving',
        subtext: 'Understanding a client brief, delivering tailored output, and getting paid for solutions.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'Connecting systems and eliminating manual clicks',
        subtext: 'Building triggers, auto-sorting data, webhooks, and streamlined pipelines.',
        scores: { automation: 4, apps: 1 },
      },
      {
        label: 'Clear writing, research, and structured ideas',
        subtext: 'Crafting articles, persuasive pitches, clear summaries, and thorough briefs.',
        scores: { content: 4, foundations: 2 },
      },
    ],
  },
  {
    id: 5,
    kicker: '05 / PAST OBSTACLE',
    title: 'What has been your biggest frustration with online courses in the past?',
    subtitle: 'ituwaAfrica was engineered specifically to solve the traps of passive video consumption.',
    options: [
      {
        label: 'Too much theory, zero practical application',
        subtext: 'I finish hours of video lectures and still do not have a single working project to show.',
        scores: { foundations: 3, freelance: 3 },
      },
      {
        label: 'Vague promises that ignore African realities',
        subtext: 'Foreign courses assuming high-end hardware, expensive subscriptions, and US-centric tools.',
        scores: { creator: 3, freelance: 3 },
      },
      {
        label: 'Lack of accountability and clear direction',
        subtext: 'Starting with high enthusiasm but dropping off because there was no guided structure.',
        scores: { foundations: 3, creator: 2 },
      },
      {
        label: 'Fast-changing tools making courses obsolete',
        subtext: 'Learning a button layout that changes the next week instead of timeless core principles.',
        scores: { automation: 3, apps: 3, foundations: 2 },
      },
    ],
  },
  {
    id: 6,
    kicker: '06 / 30-DAY OUTCOME',
    title: 'If you look ahead 30 days from now, which tangible outcome would make you proudest?',
    subtitle: 'Focus on what you will have built and can point to.',
    options: [
      {
        label: 'A published YouTube video or completed channel package',
        subtext: 'Title, script, voiceover, and thumbnail built with an ethical, sustainable workflow.',
        scores: { creator: 5 },
      },
      {
        label: 'A client-ready freelance portfolio sample and service pitch',
        subtext: 'A polished deliverable I can confidently send to prospects on Upwork or local businesses.',
        scores: { freelance: 5 },
      },
      {
        label: 'A functional automated workflow saving me 5+ hours weekly',
        subtext: 'A working automation that handles leads, summaries, or content distribution automatically.',
        scores: { automation: 5 },
      },
      {
        label: 'Confidence using prompt chains to solve any workplace brief',
        subtext: 'No more staring at a blank prompt box. Structured inputs that consistently yield great work.',
        scores: { foundations: 4, content: 3 },
      },
    ],
  },
  {
    id: 7,
    kicker: '07 / COLLABORATION PREFERENCE',
    title: 'Do you prefer working behind the scenes or collaborating with clients?',
    subtitle: 'This helps balance whether independent creator workflows or freelance client relations suit you best.',
    options: [
      {
        label: 'Behind the scenes (Faceless, automated, or solo)',
        subtext: 'I want to build assets and systems that run without me having to pitch on calls every day.',
        scores: { creator: 3, automation: 3, apps: 2 },
      },
      {
        label: 'Collaborative & client-facing (Services & consulting)',
        subtext: 'I enjoy talking to business owners, solving their specific headaches, and earning project fees.',
        scores: { freelance: 4, content: 2 },
      },
      {
        label: 'I just want core mastery first before choosing a direction',
        subtext: 'Let me learn the fundamentals with practical exercises first, then decide how to monetize.',
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
    archetype: 'The Strategic Creator',
    tagline: 'Build original, high-value media channels without chasing algorithms or burning out.',
    description:
      'Your responses show a natural affinity for storytelling, audience building, and media production. You thrive when translating concepts into compelling video and audio, understanding policies, and building sustainable creator assets.',
    recommendedCourse: 'YouTube Business Fundamentals',
    courseSlug: 'youtube-business-fundamentals',
    duration: '2h 30m',
    lessonsCount: 8,
    keySkills: ['Faceless Channel Strategy', 'Original Scripting', 'YouTube Policy & Copyright', 'Audience Retention'],
    firstSprint: 'Plan a 3-part faceless video series concept and draft your first 60-second video hook.',
    tone: 'lavender',
  },
  freelance: {
    key: 'freelance',
    title: 'AI Freelancing Academy',
    archetype: 'The Commercial Specialist',
    tagline: 'Package commercially valuable AI services that clients in Nigeria and globally eagerly pay for.',
    description:
      'You are outcome-driven, client-focused, and eager to convert modern skills into direct revenue. You do not just want to learn tools — you want to package tangible deliverables and pitch confidently to businesses.',
    recommendedCourse: 'AI for Your Freelance Business',
    courseSlug: 'ai-for-your-freelance-business',
    duration: '4h 00m',
    lessonsCount: 14,
    keySkills: ['Offer Packaging', 'Client Pitching', 'Portfolio Deliverables', 'Ethical Client Delivery'],
    firstSprint: 'Define 1 high-demand service offer, outline the deliverable, and assemble your first sample asset.',
    tone: 'coral',
  },
  automation: {
    key: 'automation',
    title: 'AI Automation Academy',
    archetype: 'The Systems Architect',
    tagline: 'Eliminate repetitive manual clicks with automated, dependable background workflows.',
    description:
      'You think in logic, triggers, and efficiency. You despise repetitive tasks and want systems that automatically connect inputs, transform data, and save dozens of hours every month.',
    recommendedCourse: 'Build Your First AI Workflow',
    courseSlug: 'build-your-first-ai-workflow',
    duration: '3h 45m',
    lessonsCount: 10,
    keySkills: ['Workflow Triggers', 'Multi-Step Prompt Chains', 'Data Transformation', 'Error Handling'],
    firstSprint: 'Automate one manual weekly administrative routine using a structured 2-step prompt pipeline.',
    tone: 'blue',
  },
  content: {
    key: 'content',
    title: 'AI Content Creation Academy',
    archetype: 'The Creative Catalyst',
    tagline: 'Use AI to defeat the blank page, then craft work that speaks with your unique voice.',
    description:
      'You appreciate sharp writing, strategic research, and cohesive messaging. You want to use AI to speed up drafting and ideation while maintaining rigorous editorial standards.',
    recommendedCourse: 'The Freelance AI Content Studio',
    courseSlug: 'the-freelance-ai-content-studio',
    duration: '4h 30m',
    lessonsCount: 16,
    keySkills: ['Editorial Framing', 'Long-form Structuring', 'Brand Tone Control', 'Fact-checking Systems'],
    firstSprint: 'Produce a comprehensive 800-word editorial brief and social carousel package using a 3-step prompt framework.',
    tone: 'lime',
  },
  apps: {
    key: 'apps',
    title: 'AI App Development Academy',
    archetype: 'The Digital Builder',
    tagline: 'Transform practical ideas into functional, interactive tools and testable prototypes.',
    description:
      'You are curious about product architecture, APIs, and hands-on tool creation. You want to bridge the gap between imagination and functional software without getting bogged down in years of computer science theory.',
    recommendedCourse: 'Build a Helpful AI App',
    courseSlug: 'build-a-helpful-ai-app',
    duration: '6h 20m',
    lessonsCount: 18,
    keySkills: ['API Integration', 'UI Prototyping', 'Prompt Logic', 'Deploying Utilities'],
    firstSprint: 'Build a single-purpose micro-tool that accepts user input and produces structured business advice.',
    tone: 'peach',
  },
  foundations: {
    key: 'foundations',
    title: 'AI Foundations Academy',
    archetype: 'The Grounded Practitioner',
    tagline: 'Cut through marketing noise, master clear prompt craft, and establish reliable habits.',
    description:
      'You want a solid, grounded understanding before jumping into complex workflows. You recognize that mastering clear instructions, prompt chains, and critical evaluation is the foundation of all AI capability.',
    recommendedCourse: 'Your AI Toolkit: A Practical Start',
    courseSlug: 'your-ai-toolkit-practical-start',
    duration: '2h 15m',
    lessonsCount: 8,
    keySkills: ['Structured Prompt Craft', 'Tool Selection', 'Hallucination Spotting', 'Practical Workflows'],
    firstSprint: 'Master the 4-part prompt framework and engineer 3 prompt chains for everyday professional tasks.',
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

  // Calculate recommendation results
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
      {/* ── Top Header ── */}
      <header className="quiz-header">
        <div className="quiz-header-inner">
          <Brand />
          <div className="quiz-header-actions">
            <Link href="/courses" className="quiz-back-link">
              Explore courses
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

      {/* ── Main Quiz Body ── */}
      <main className="quiz-main">
        {!isCompleted ? (
          <div className="quiz-card-container">
            {/* Progress Bar */}
            <div className="quiz-progress-wrap" aria-label={`Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}>
              <div className="quiz-progress-meta">
                <span className="quiz-step-count">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="quiz-step-percent">{progressPercent}% complete</span>
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

              {/* Navigation Back */}
              <div className="quiz-nav-footer">
                {currentQuestionIndex > 0 ? (
                  <button type="button" onClick={handlePrevious} className="quiz-prev-btn">
                    <ArrowLeft size={16} /> Back to previous
                  </button>
                ) : (
                  <span className="quiz-note-text">Takes less than 90 seconds. No card required.</span>
                )}
                <span className="quiz-confidential-note">Private & customized to your goals</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── Assessment Results Screen ── */
          <div className="quiz-result-container">
            {/* Result Header Badge */}
            <div className="quiz-result-badge-row">
              <span className="quiz-result-tag">YOUR TAILORED LEARNING PATHWAY</span>
              <button type="button" onClick={handleRestart} className="quiz-restart-btn">
                <RotateCcw size={14} /> Retake assessment
              </button>
            </div>

            {/* Archetype Hero Card */}
            <div className={`quiz-result-card tone--${result.top.tone}`}>
              <div className="quiz-result-card-header">
                <div>
                  <span className="quiz-archetype-label">LEARNER ARCHETYPE</span>
                  <h1 className="quiz-archetype-title">{result.top.archetype}</h1>
                  <p className="quiz-archetype-tagline">{result.top.tagline}</p>
                </div>
                <div className="quiz-match-pill">
                  <Sparkles size={16} />
                  <span>96% Match</span>
                </div>
              </div>

              <p className="quiz-archetype-desc">{result.top.description}</p>

              {/* Key Competencies Strip */}
              <div className="quiz-competencies-block">
                <span className="quiz-block-label">CORE SKILLS YOU WILL BUILD</span>
                <div className="quiz-skills-tags">
                  {result.top.keySkills.map((skill) => (
                    <span key={skill} className="quiz-skill-chip">
                      <CheckCircle2 size={13} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Starter Course */}
              <div className="quiz-course-highlight">
                <div className="quiz-course-highlight-top">
                  <div>
                    <span className="quiz-course-kicker">RECOMMENDED STARTING COURSE</span>
                    <h3>{result.top.recommendedCourse}</h3>
                    <p className="quiz-course-details">
                      {result.top.title} · {result.top.lessonsCount} practical lessons · {result.top.duration} total
                    </p>
                  </div>
                  <span className="quiz-free-tag">Free starter module</span>
                </div>

                <div className="quiz-first-sprint-box">
                  <div className="sprint-icon-box">
                    <Target size={18} />
                  </div>
                  <div>
                    <strong>Your First 7-Day Sprint:</strong>
                    <p>{result.top.firstSprint}</p>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="quiz-cta-row">
                  {user ? (
                    <Link
                      href={`/onboarding?academy=${result.top.key}`}
                      className="button button-dark quiz-primary-cta"
                    >
                      <span>Activate Track in Onboarding</span>
                      <ArrowRight size={17} />
                    </Link>
                  ) : (
                    <Link
                      href={`/signup?recommended=${result.top.key}`}
                      className="button button-dark quiz-primary-cta"
                    >
                      <span>Save My Pathway & Start Free</span>
                      <ArrowRight size={17} />
                    </Link>
                  )}
                  <Link
                    href={`/courses/${result.top.courseSlug}`}
                    className="button button-light quiz-secondary-cta"
                  >
                    <span>View course syllabus</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Secondary Runner-Up Match */}
            <div className="quiz-runnerup-card">
              <div className="quiz-runnerup-header">
                <div>
                  <span className="quiz-runnerup-kicker">SECONDARY EXPLORATION TRACK</span>
                  <h3>{result.runnerUp.title}</h3>
                  <p>{result.runnerUp.tagline}</p>
                </div>
                <Link href={`/courses/${result.runnerUp.courseSlug}`} className="quiz-runnerup-link">
                  Browse track <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Why ituwaAfrica Box */}
            <div className="quiz-guarantee-strip">
              <div className="guarantee-item">
                <span className="guarantee-num">01</span>
                <div>
                  <h4>Zero Cliché Theory</h4>
                  <p>Every concept is immediately tied to a tangible file, script, or proposal you keep.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">02</span>
                <div>
                  <h4>Low-Bandwidth Mobile Friendly</h4>
                  <p>High-compression text-first walk-throughs designed for Nigerian network stability.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-num">03</span>
                <div>
                  <h4>Honest Product Outcomes</h4>
                  <p>Practical capability development. No false income guarantees or fake testimonials.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
