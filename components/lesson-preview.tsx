'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen, Play, ShieldCheck, X } from 'lucide-react'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'
import YouTubeEmbed from '@/components/youtube-embed'

interface LessonCourseData {
  course: string
  lessons: string[]
  body: string
  takeaway: string
  youtubeVideoId?: string
}

interface LessonActivity {
  task: string
  result: string
}

const lessonContent: Record<string, LessonCourseData> = {
  'ai-toolkit-practical-start': {
    course: 'AI Foundations',
    lessons: ['What AI can (and cannot) do', 'A practical AI toolkit', 'Use AI with care and good judgement', 'Give your prompt a purpose', 'Add context that matters', 'Improve a first response', 'Apply AI to a useful task', 'Your first AI-assisted project'],
    body: 'AI tools can help with a first draft, but they do not know your situation unless you explain it. Give clear details, check the answer, and make the final call yourself.',
    takeaway: 'Use AI for a starting point. Your experience and judgement still matter.'
  },
  'prompting-better-work': {
    course: 'Prompting for Better Work',
    lessons: ['Start with the task', 'Add context and constraints', 'Describe the output you need', 'Work in small iterations', 'Ask for alternatives', 'Check what matters', 'Create your prompt brief', 'Build a reusable template'],
    body: 'A helpful prompt starts with a clear task. Before you open an AI tool, name what you are trying to accomplish and what a useful result would look like. Specificity gives you a better first draft to build on.',
    takeaway: 'Start with a task, include only the context that changes the answer, then describe the format you need.'
  },
  'ai-content-marketing-for-business': {
    course: 'AI Content Marketing for Business',
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
  'build-a-helpful-ai-app': {
    course: 'AI App Development for Business',
    lessons: [
      'Identify a user and unmet need',
      'Check the problem with example scenarios',
      'Define a useful first version',
      'Plan user inputs and helpful outputs',
      'Build a mobile-friendly app prototype',
      'Handle API keys, limits and errors safely',
      'Test realistic and edge-case inputs',
      'Review privacy, cost and answer quality',
      'Present the product, its limits and next steps',
    ],
    body: 'Begin with a real user problem, not an AI feature. Define the smallest version of a product that could help, build a mobile-friendly prototype and test it with realistic inputs. Consider privacy, response quality and operating cost before presenting it to users.',
    takeaway: 'A working prototype is evidence to learn from, not proof of product demand or future income.',
    youtubeVideoId: 'qIUZ_C5ki3g',
  }
}

const lessonActivities: Record<string, LessonActivity[]> = {
  'ai-toolkit-practical-start': [
    { task: 'Write down one task you want AI to help with.', result: 'A task with one clear goal.' },
    { task: 'Try two AI tools on the same simple request.', result: 'A short note on which answer helped more.' },
    { task: 'List one detail you should not share with an AI tool.', result: 'A privacy check before you use AI.' },
    { task: 'Ask AI to do one task and name the format you need.', result: 'A prompt with a clear task and format.' },
    { task: 'Add the audience and key facts to a prompt.', result: 'A prompt with enough context to guide the answer.' },
    { task: 'Check one important claim in an AI answer against a trusted source.', result: 'An answer with its key fact checked.' },
    { task: 'Choose a task you repeat and write its steps in order.', result: 'A short task list that shows where AI might help.' },
    { task: 'Use AI to draft one small piece of work, then edit it yourself.', result: 'A finished draft you have checked and improved.' },
  ],
  'prompting-better-work': [
    { task: 'Write one clear action you want AI to take.', result: 'A prompt that starts with a specific task.' },
    { task: 'Add who the answer is for and the details AI needs.', result: 'A prompt with useful context.' },
    { task: 'Ask for the answer in a specific format.', result: 'An answer in the format you requested.' },
    { task: 'Ask AI to improve one part of its first answer.', result: 'A revised answer that better fits your task.' },
    { task: 'Ask for two options and compare them against your goal.', result: 'A choice based on your needs, not just preference.' },
    { task: 'Check one factual claim in an AI answer.', result: 'An answer with a claim checked against a reliable source.' },
    { task: 'Write a short prompt brief with the task, context and format.', result: 'A brief you can use to write a clear prompt.' },
    { task: 'Save a prompt that worked and note when to use it.', result: 'A reusable prompt with a clear purpose.' },
  ],
  'ai-content-marketing-for-business': [
    { task: 'Choose a business and list three questions its customers ask.', result: 'A short audience-research note based on real customer language.' },
    { task: 'Choose a customer group, one business goal, and the offer the campaign will support.', result: 'A brief audience, goal, and offer statement without unsupported claims.' },
    { task: 'Turn a sample client brief into an audience, goal, key message, and deliverables.', result: 'A focused content plan that makes the client request actionable.' },
    { task: 'Compare channels based on audience use, goal, and the business’s capacity.', result: 'A reasoned channel and content-format choice for the campaign.' },
    { task: 'Draft a social caption that answers a customer question and fits its platform.', result: 'An original social caption with a clear audience and purpose.' },
    { task: 'Write a short ad variant with one clear message and a supportable claim.', result: 'Ad copy with a specific call to action and no unverified promises.' },
    { task: 'Draft an email campaign with a useful subject line, message, and next step.', result: 'An audience-focused email draft with a clear purpose.' },
    { task: 'Use AI to create a first draft, then edit it to match a supplied brand voice.', result: 'A refined draft that sounds consistent with the brand and audience.' },
    { task: 'Check campaign copy for factual claims, permissions, originality, and tone.', result: 'Reviewed content with unsupported claims and rights concerns flagged.' },
    { task: 'Map the steps from brief and research through drafting, review, and delivery.', result: 'A repeatable content workflow with clear quality-check points.' },
    { task: 'Choose a campaign signal and review sample results against the stated goal.', result: 'A careful note on what the results show and what they do not prove.' },
    { task: 'Select the brief, drafts, review notes, and rationale to show your process.', result: 'A portfolio-ready campaign sample with clear scope and evidence of your decisions.' },
  ],
  'build-a-helpful-ai-app': [
    { task: 'Name a user, the problem they have and how you know it matters.', result: 'A problem statement grounded in a specific user need.' },
    { task: 'Check the problem with three realistic example situations.', result: 'A short validation note and open questions to investigate.' },
    { task: 'Choose one outcome for the first version and leave out extras.', result: 'A focused product scope with a clear limit.' },
    { task: 'Describe what a user provides and the useful answer they need.', result: 'A user input and output example for the app.' },
    { task: 'Build a mobile-friendly screen for the main task.', result: 'A working prototype that fits a phone screen.' },
    { task: 'Check how the app handles a missing key or failed request.', result: 'Safe server-side key handling and a useful error state.' },
    { task: 'Test normal, unclear and edge-case inputs.', result: 'A test list showing where the product needs improvement.' },
    { task: 'Estimate usage cost and list what user data the app needs.', result: 'A basic privacy and cost review for the prototype.' },
    { task: 'Explain who the tool helps, its limits and what to test next.', result: 'A product summary that does not overstate what the prototype proves.' },
  ],
  creator: [
    { task: 'Name the audience for your channel and one need they have.', result: 'An audience and a clear reason to watch.' },
    { task: 'Find examples that show what your audience is already looking for.', result: 'A video idea based on audience evidence.' },
    { task: 'Choose a channel name and check that its visuals are yours to use.', result: 'A channel identity with original or permitted assets.' },
    { task: 'Plan four useful video ideas for one month.', result: 'A simple publishing calendar.' },
    { task: 'Make an original video and check any AI-generated or altered parts.', result: 'A video draft that adds your own value and follows disclosure rules.' },
    { task: 'Create a thumbnail with your own or permitted images.', result: 'A clear thumbnail that represents the video.' },
    { task: 'Review one video’s audience response and choose one change to test.', result: 'A small improvement based on available evidence.' },
    { task: 'Open YouTube’s current policy pages and note when you checked them.', result: 'A dated policy check; eligibility and approval are decided by YouTube.' },
  ],
}

const creatorCourseTitles: Record<string, string> = {
  'youtube-business-fundamentals': 'YouTube Business Fundamentals',
  'starting-a-faceless-youtube-channel': 'Starting a Faceless YouTube Channel',
  'youtube-monetization': 'YouTube Monetization',
  'youtube-automation-monetization-masterclass': 'YouTube Monetization',
  'ai-powered-youtube-content-production': 'AI-Powered YouTube Content Production',
  'youtube-shorts-growth-strategy': 'YouTube Shorts Growth Strategy',
  'youtube-seo-and-analytics': 'YouTube SEO and Analytics',
  'youtube-monetization-policies-and-copyright': 'YouTube Monetization Policies and Copyright',
  'building-a-creator-business-beyond-ad-revenue': 'Building a Creator Business Beyond Ad Revenue',
}

export default function LessonPreview({ slug, userId }: { slug: string; userId?: string }) {
  const creatorTitle = creatorCourseTitles[slug]
  const creatorLessons = ['Define an original channel concept', 'Validate your niche with audience evidence', 'Design channel branding with clear rights', 'Build a sustainable 30-day publishing calendar', 'Produce an original video with responsible AI assistance', 'Create a distinctive thumbnail', 'Review analytics and choose a learning experiment', 'Check current policy and monetization readiness']
  const course = lessonContent[slug as keyof typeof lessonContent] ?? (creatorTitle ? { course: creatorTitle, lessons: creatorLessons, body: 'Build a channel around a real audience need. Use your own editorial judgement and create meaningful original value in every video. AI can assist with ideation or production, but verify claims, respect rights, and disclose realistic altered or synthetic content when required by YouTube.', takeaway: 'Learning completion is not YouTube Partner Program eligibility, and no audience or revenue outcome is guaranteed.' } : lessonContent['ai-toolkit-practical-start'])
  const [current, setCurrent] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [curriculumOpen, setCurriculumOpen] = useState(false)
  const activity = (lessonActivities[slug] ?? lessonActivities.creator)[current]
  const title = course.lessons[current]
  const move = (index: number) => { setCurrent(index); setCompleted(false); setCurriculumOpen(false) }
  return (
    <main className={userId ? 'lesson-app lesson-app-authenticated' : 'lesson-app'}>
      <header className="lesson-header">
        <Link href={`/courses/${slug}`} className="lesson-back">
          <ArrowLeft size={15} />
          <span>Course overview</span>
        </Link>
        <Brand />
        <button
          className="lesson-menu-button"
          onClick={() => setCurriculumOpen(!curriculumOpen)}
          aria-expanded={curriculumOpen}
          aria-label="Toggle course lessons"
        >
          {curriculumOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="lesson-layout">
        <aside className={curriculumOpen ? 'lesson-sidebar mobile-open' : 'lesson-sidebar'}>
          <Link href={`/courses/${slug}`} className="lesson-course-title">
            <PanelLeftClose size={15} />
            <span>{course.course}</span>
          </Link>
          <div className="lesson-sidebar-label">
            COURSE OUTLINE <span>{current + 1} / {course.lessons.length}</span>
          </div>
          <div className="lesson-progress-line">
            <span style={{ width: `${((current + 1) / course.lessons.length) * 100}%` }} />
          </div>
          <div className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <button
                onClick={() => move(index)}
                className={index === current ? 'lesson-item selected' : 'lesson-item'}
                key={lesson}
              >
                <span className="lesson-state">
                  {index === current ? <Play size={11} /> : String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  {lesson}
                  <small>LESSON {String(index + 1).padStart(2, '0')}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="lesson-sidebar-foot">
            <span className="lesson-avatar">{userId ? (userId[0] ?? 'I').toUpperCase() : 'I'}</span>
            <div>
              {userId ? 'SIGNED IN' : 'PREVIEW MODE'}
              <small>Progress is not saved in this lesson preview.</small>
            </div>
          </div>
        </aside>

        <section className="lesson-main">
          <div className="lesson-mobile-course">
            <button onClick={() => setCurriculumOpen(!curriculumOpen)}>
              <PanelLeftOpen size={14} /> Course contents <ChevronDown size={14} />
            </button>
            <span>LESSON {String(current + 1).padStart(2, '0')} / {String(course.lessons.length).padStart(2, '0')}</span>
          </div>
          <div className="lesson-reading">
            <div className="lesson-breadcrumb">
              <span>{course.course}</span>
              <span>/</span>
              <span>LESSON {String(current + 1).padStart(2, '0')}</span>
            </div>
            <span className="lesson-type">
              {course.youtubeVideoId ? <Play size={12} /> : <BookOpen size={12} />}
              {course.youtubeVideoId ? 'VIDEO MASTERCLASS & TEXT GUIDE' : 'TEXT LESSON'}
            </span>
            <div className="lesson-title-row">
              <h1>{title}</h1>
              <span className="lesson-title-index" aria-label={`Lesson ${current + 1}`}>
                {String(current + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="lesson-lead">Read the short lesson, then complete the task below.</p>
            {course.youtubeVideoId && (
              <div style={{ margin: '24px 0 28px' }}>
                <YouTubeEmbed videoId={course.youtubeVideoId} title={title} duration="1h 45m" />
              </div>
            )}

            <div className="lesson-rule" />
            <h2>What to know</h2>
            <p>{course.body}</p>
            <div className="lesson-callout">
              <span><ShieldCheck size={15} /></span>
              <div>
                <b>Keep in mind</b>
                <p>{course.takeaway}</p>
              </div>
            </div>

            <h2>Your task</h2>
            <div className="lesson-exercise">
              <p>{activity.task}</p>
              <span className="exercise-note">What you should have when you finish:</span>
              <p>{activity.result}</p>
            </div>

            <div className="lesson-complete-row">
              <span>
                {completed ? <><Check size={14} /> Marked complete in this preview only</> : 'Finished the task?'}
              </span>
              <button
                className={completed ? 'lesson-complete completed' : 'lesson-complete'}
                onClick={() => setCompleted(!completed)}
              >
                {completed ? 'Completed' : 'Mark complete (preview)'} <Check size={14} />
              </button>
            </div>
            <div className="lesson-pagination">
              <button onClick={() => move(Math.max(0, current - 1))} disabled={current === 0}>
                <ArrowLeft size={14} /> Previous lesson
              </button>
              <button
                onClick={() => { setCompleted(true); move(Math.min(course.lessons.length - 1, current + 1)) }}
                disabled={current === course.lessons.length - 1}
              >
                Next lesson <ArrowRight size={14} />
              </button>
            </div>
            <p className="lesson-demo-disclaimer">
              {userId
                ? 'Your lesson progress is not saved in this preview.'
                : 'Sign in to access course features. Lesson progress is not saved in this preview.'}
            </p>
          </div>
        </section>

        <aside className="lesson-learning-rail" aria-label="Lesson guide">
          <section className="lesson-rail-card lesson-rail-progress">
            <div className="lesson-rail-kicker">LEARNING PATH</div>
            <div className="lesson-rail-count">
              <strong>{String(current + 1).padStart(2, '0')}</strong>
              <span>OF {String(course.lessons.length).padStart(2, '0')}</span>
            </div>
            <div
              className="lesson-rail-progress-track"
              role="progressbar"
              aria-label="Current position in course"
              aria-valuenow={current + 1}
              aria-valuemin={1}
              aria-valuemax={course.lessons.length}
            >
              <span style={{ width: `${((current + 1) / course.lessons.length) * 100}%` }} />
            </div>
            <p>Lesson position only. Completion is not saved in this preview.</p>
          </section>

          <section className="lesson-rail-card">
            <div className="lesson-rail-kicker">YOUR DELIVERABLE</div>
            <p className="lesson-rail-deliverable">{activity.result}</p>
          </section>

          <section className="lesson-rail-note">
            <ShieldCheck size={17} aria-hidden="true" />
            <div>
              <strong>Keep your judgement in the loop</strong>
              <p>{course.takeaway}</p>
            </div>
          </section>
        </aside>
      </div>
      {userId && <AppBottomNav active="courses" />}
    </main>
  )
}
