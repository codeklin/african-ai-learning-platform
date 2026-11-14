import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Clock3, Play } from 'lucide-react'
import CreatorProjectStudio from '@/components/creator-project-studio'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import { createClient } from '@/lib/supabase/server'

const creatorCourses: Record<string, { title: string; description: string }> = {
  'youtube-business-fundamentals': { title: 'YouTube Business Fundamentals', description: 'Understand the creator business model, audience value, rights, and realistic revenue paths.' },
  'starting-a-faceless-youtube-channel': { title: 'Starting a Faceless YouTube Channel', description: 'Develop an original channel concept without appearing on camera.' },
  'youtube-automation-monetization-masterclass': { title: 'YouTube Automation & Monetization Masterclass', description: 'Design responsible repeatable workflows while keeping creative decisions and quality human-led.' },
  'ai-powered-youtube-content-production': { title: 'AI-Powered YouTube Content Production', description: 'Use AI responsibly for ideation and production while creating meaningfully original work.' },
  'youtube-shorts-growth-strategy': { title: 'YouTube Shorts Growth Strategy', description: 'Plan short-form experiments around audience needs,without promising reach or growth.' },
  'youtube-seo-and-analytics': { title: 'YouTube SEO and Analytics', description: 'Use search intent and channel analytics to make evidence-informed creative decisions.' },
  'youtube-monetization-policies-and-copyright': { title: 'YouTube Monetization Policies and Copyright', description: 'Understand policy, copyright, disclosure, and how to review official updates.' },
  'building-a-creator-business-beyond-ad-revenue': { title: 'Building a Creator Business Beyond Ad Revenue', description: 'Explore audience-aligned services, products, partnerships, and other diversified models.' },
}

const courses = {
  'ai-toolkit-practical-start': { title: 'Your AI Toolkit: A Practical Start', academy: 'AI Foundations', level: 'Beginner', duration: '2h 15m', lessons: 8, description: 'New to AI and tired of the buzzwords? Learn what these tools can do, where they fall short, and how to use one on a task you already have.', outcomes: ['Know what these tools can and cannot do', 'Choose a tool for the job instead of chasing every new one', 'Give clear instructions to get a better first draft', 'Make a simple workflow for a task you do often'], modules: [{ title: 'Getting oriented', lessons: ['What AI can (and cannot) do', 'A practical AI toolkit', 'Use AI with care and good judgement'] }, { title: 'Working with prompts', lessons: ['Give your prompt a purpose', 'Add context that matters', 'Improve a first response'] }, { title: 'Put it into practice', lessons: ['Build a personal workflow', 'Your first AI-assisted project'] }] },
  'prompting-better-work': { title: 'Prompting for Better Work', academy: 'AI Foundations', level: 'Beginner', duration: '3h 10m', lessons: 12, description: 'Getting answers that sound right but do not help? Learn how to give a tool the details it needs and check its work.', outcomes: ['Break a task into clear steps', 'Share the details that change the answer', 'Improve a first draft without starting over', 'Check answers before you rely on them'], modules: [{ title: 'The shape of a prompt', lessons: ['Start with the task', 'Add context and constraints', 'Describe the output you need'] }, { title: 'Make it more useful', lessons: ['Work in small iterations', 'Ask for alternatives', 'Check what matters'] }, { title: 'A repeatable practice', lessons: ['Create your prompt brief', 'Build a reusable template'] }] },
}

type CourseSlug = keyof typeof courses
const creatorLessons = ['Define your audience and channel promise', 'Research topics and validate demand', 'Build a distinctive channel identity', 'Plan a useful publishing rhythm', 'Create an original video outline', 'Produce and package your video', 'Review audience signals and analytics', 'Evaluate rights, policy, and next steps']

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const creator = creatorCourses[slug]
  const course = courses[slug as CourseSlug]
  if (!creator && !course) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  const title = creator?.title ?? course!.title
  const academy = creator ? 'Creator Economy & YouTube' : course!.academy
  const description = creator?.description ?? course!.description
  const outcomes = creator ? ['Develop a channel concept grounded in audience needs', 'Create original video and thumbnail projects', 'Use analytics as feedback, not as a promise of results', 'Understand policy responsibilities and business models'] : course!.outcomes
  const modules = creator ? [{ title: 'Strategy and foundations', lessons: creatorLessons.slice(0, 3) }, { title: 'Make and publish', lessons: creatorLessons.slice(3, 6) }, { title: 'Review and grow responsibly', lessons: creatorLessons.slice(6) }] : course!.modules
  const lessonCount = creator ? 8 : course!.lessons
  const duration = creator ? '3h' : course!.duration
  const level = creator ? 'Beginner to intermediate' : course!.level
  const lessonSlug = creator ? slug : slug

  return (
    <main className={`detail-page ${isAuthenticated ? 'has-app-bottom-nav' : ''}`}>
      <header className="catalog-nav">
        <Link href="/courses" className="catalog-back">
          <ArrowLeft size={16} /> All courses
        </Link>
        <Brand />
        <div className="catalog-nav-actions">
          {isAuthenticated ? (
            <Link href="/dashboard" className="catalog-login">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="catalog-login">
              Log in
            </Link>
          )}
        </div>
      </header>

      <div className="detail-wrap">
        <div className="detail-breadcrumb">
          <Link href="/courses">Courses</Link>
          <span>/</span>
          <span>{academy}</span>
        </div>

        <section className="detail-hero">
          <div className="detail-intro">
            <div className="eyebrow">
              <span className="eyebrow-line" /> {academy.toUpperCase()}
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="detail-meta">
              <span>{level}</span>
              <span><Clock3 size={14} /> {duration}</span>
              <span><Play size={14} /> {lessonCount} lessons</span>
              <span className="detail-free">Free</span>
            </div>
            <Link href={`/learn/${lessonSlug}/lesson-1`} className="button button-dark">
              Start this course <ArrowRight size={15} />
            </Link>
            <span className="detail-demo-note">Demo preview · Progress is not saved</span>
          </div>

          <div className="detail-art">
            <span className="detail-art-label">ITUWA AFRICA / FIELD NOTES</span>
            <div className="detail-art-orbit">
              <span className="detail-art-blob">{creator ? '06' : '01'}</span>
            </div>
            <span className="detail-art-footer">MAKE WORK YOU CAN SHOW</span>
          </div>
        </section>

        <div className="detail-columns">
          <section className="detail-main">
            <div className="detail-block">
              <div className="detail-section-kicker">01 / WHAT YOU&apos;LL LEARN</div>
              <h2>Skills you can put to work.</h2>
              <ul className="outcomes-list">
                {outcomes.map((outcome) => (
                  <li key={outcome}>
                    <span><Check size={14} /></span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-block curriculum">
              <div className="detail-section-kicker">02 / THE CURRICULUM · {lessonCount} LESSONS</div>
              <h2>A clear path, one step at a time.</h2>
              {modules.map((module, index) => (
                <details key={module.title} open={index === 0}>
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')} / {module.title}</span>
                    <span>{module.lessons.length} lessons</span>
                  </summary>
                  <ul>
                    {module.lessons.map((lesson) => (
                      <li key={lesson}>{lesson}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            {creator && (
              <div className="creator-eligibility">
                <div className="detail-section-kicker">IMPORTANT DISTINCTION</div>
                <h2>Learning completion is not YPP eligibility.</h2>
                <p>
                  Finishing lessons or projects confirms educational participation only.
                  YouTube Partner Program eligibility depends on YouTube&apos;s current
                  requirements and channel review. Thresholds and policies can change, and
                  meeting a threshold does not guarantee acceptance, views, subscribers,
                  monetization, or income.
                </p>
              </div>
            )}
          </section>

          <aside className="detail-aside">
            <div className="detail-aside-card">
              <div className="detail-section-kicker">03 / COURSE DETAILS</div>
              <h3>Made for practical progress.</h3>
              <p>Work through short lessons, then apply each idea in a project of your own.</p>
              <div className="aside-divider" />
              <span className="aside-label">WHAT YOU&apos;LL NEED</span>
              <p>
                {creator
                  ? 'A YouTube account is optional for course exercises. You can plan, draft, and review projects without publishing.'
                  : 'A web browser and access to a text-based AI assistant. Free tool options are suitable.'}
              </p>
              <Link className="text-link" href="/courses">
                Explore more courses <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>

        {creator && <CreatorProjectStudio />}
      </div>

      {/* Fixed bottom navigation for authenticated mobile users */}
      {isAuthenticated && <AppBottomNav active="courses" />}
    </main>
  )
}
