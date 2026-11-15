'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen, Play, Sparkles, X } from 'lucide-react'
import Brand from '@/components/brand'
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
    course: 'Your AI Toolkit: A Practical Start',
    lessons: ['What AI can (and cannot) do', 'A practical AI toolkit', 'Use AI with care and good judgement', 'Give your prompt a purpose', 'Add context that matters', 'Improve a first response', 'Build a personal workflow', 'Your first AI-assisted project'],
    body: 'AI tools can help with a first draft, but they do not know your situation unless you explain it. Give clear details, check the answer, and make the final call yourself.',
    takeaway: 'Use AI for a starting point. Your experience and judgement still matter.'
  },
  'prompting-better-work': {
    course: 'Prompting for Better Work',
    lessons: ['Start with the task', 'Add context and constraints', 'Describe the output you need', 'Work in small iterations', 'Ask for alternatives', 'Check what matters', 'Create your prompt brief', 'Build a reusable template'],
    body: 'A helpful prompt starts with a clear task. Before you open an AI tool, name what you are trying to accomplish and what a useful result would look like. Specificity gives you a better first draft to build on.',
    takeaway: 'Start with a task, include only the context that changes the answer, then describe the format you need.'
  },
  'build-a-helpful-ai-app': {
    course: 'Build a Helpful AI App',
    lessons: [
      'Problem definition: Pick one friction point to solve',
      'System design: Input ➔ Prompt pipeline ➔ Output format',
      'Prompt logic: Writing instructions for a consistent structure',
      'Live Masterclass: Step-by-step app walkthrough',
      'Handling API keys, limits, and edge errors',
      'Interface styling: Mobile-first responsive prototype',
      'Testing a prototype with sample inputs',
      'Describing your tool and its limitations',
    ],
    body: 'Start by identifying one task a tool could help with. Plan the input, the steps the tool should take and the response you want, then test the result and note its limits.',
    takeaway: 'Focus on solving one single friction point exceptionally well before adding complex features.',
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
  'build-a-helpful-ai-app': [
    { task: 'Name one problem and who has it.', result: 'A clear problem statement for your app.' },
    { task: 'Write one example of what a user enters and what the app returns.', result: 'A simple input-and-output example.' },
    { task: 'Write instructions that tell AI how to answer the user.', result: 'A prompt with a clear response format.' },
    { task: 'Follow the build walkthrough and make the app respond to one input.', result: 'A first working version of your AI app.' },
    { task: 'Check how the app handles a missing key or failed request.', result: 'A clear error message instead of a broken screen.' },
    { task: 'Open the app on a phone and fix one hard-to-use part.', result: 'A mobile-friendly screen for the main task.' },
    { task: 'Try three different inputs and note any wrong or unclear answers.', result: 'A test list showing what needs improvement.' },
    { task: 'Write what your app does, who it helps and what it cannot do.', result: 'A short project description with clear limits.' },
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
  'youtube-automation-monetization-masterclass': 'YouTube Automation & Monetization Masterclass',
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
    <main className="lesson-app">
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
            LESSON <span>{current + 1} / {course.lessons.length}</span>
          </div>
          <div className="lesson-progress-line">
            <span style={{ width: `${(current / course.lessons.length) * 100}%` }} />
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
              <Play size={12} /> {course.youtubeVideoId ? 'VIDEO MASTERCLASS & TEXT GUIDE' : 'TEXT LESSON'}
            </span>
            <h1>{title}</h1>
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
              <span><Sparkles size={15} /></span>
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
      </div>
    </main>
  )
}
