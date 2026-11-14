'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Circle, Menu, PanelLeftClose, PanelLeftOpen, Play, Sparkles, X } from 'lucide-react'
import Brand from '@/components/brand'

const lessonContent = {
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
  }
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
  const title = course.lessons[current]
  const move = (index: number) => { setCurrent(index); setCompleted(false); setCurriculumOpen(false) }
  return <main className="lesson-app"><header className="lesson-header"><Link href={`/courses/${slug}`} className="lesson-back"><ArrowLeft size={15} /><span>Course overview</span></Link><Brand /><button className="lesson-menu-button" onClick={() => setCurriculumOpen(!curriculumOpen)} aria-expanded={curriculumOpen} aria-label="Toggle course lessons">{curriculumOpen ? <X size={18} /> : <Menu size={18} />}</button></header><div className="lesson-layout"><aside className={curriculumOpen ? 'lesson-sidebar mobile-open' : 'lesson-sidebar'}><Link href={`/courses/${slug}`} className="lesson-course-title"><PanelLeftClose size={15} /><span>{course.course}</span></Link><div className="lesson-sidebar-label">COURSE CONTENT <span>{current + 1} / {course.lessons.length}</span></div><div className="lesson-progress-line"><span style={{ width: `${(current / course.lessons.length) * 100}%` }} /></div><div className="lesson-list">{course.lessons.map((lesson, index) => <button onClick={() => move(index)} className={index === current ? 'lesson-item selected' : 'lesson-item'} key={lesson}><span className={index < current ? 'lesson-state done' : 'lesson-state'}>{index < current ? <Check size={12} /> : index === current ? <Play size={11} /> : <Circle size={10} />}</span><span>{lesson}<small>LESSON {String(index + 1).padStart(2, '0')} · 6 MIN</small></span></button>)}</div><div className="lesson-sidebar-foot"><span className="lesson-avatar">{userId ? (userId[0] ?? 'I').toUpperCase() : 'I'}</span><div>{userId ? 'SIGNED IN' : 'PREVIEW MODE'}<small>{userId ? 'Progress saves when lessons are live' : 'Sign in to save your progress'}</small></div></div></aside><section className="lesson-main"><div className="lesson-mobile-course"><button onClick={() => setCurriculumOpen(!curriculumOpen)}><PanelLeftOpen size={14} /> Course contents <ChevronDown size={14} /></button><span>LESSON {String(current + 1).padStart(2, '0')} / {String(course.lessons.length).padStart(2, '0')}</span></div><div className="lesson-reading"><div className="lesson-breadcrumb"><span>{course.course}</span><span>/</span><span>LESSON {String(current + 1).padStart(2, '0')}</span></div><span className="lesson-type"><Play size={12} /> TEXT LESSON · 6 MIN READ</span><h1>{title}</h1><p className="lesson-lead">A practical foundation for working with AI thoughtfully , and getting more out of the tools you choose to use.</p><div className="lesson-rule" /><h2>Start with what you want to do.</h2><p>{course.body}</p><p>Begin with a task you already understand. You might be outlining a proposal, planning a week of social content, or researching a new service idea. You bring the goal and the details; the tool can help you explore a draft.</p><div className="lesson-callout"><span><Sparkles size={15} /></span><div><b>A useful way to think about it</b><p>{course.takeaway}</p></div></div><h2>Try it in your own work</h2><p>Think of one task you do regularly. What part takes the most time? Write down the context that would help someone else support you with it. That is a good starting brief for a useful prompt.</p><div className="lesson-exercise"><span className="detail-section-kicker">A QUICK REFLECTION</span><p>What is one task where a first draft, a new perspective, or a little structure would help you this week?</p><span className="exercise-note">Take a moment to think it through. Your reflection stays in this session only.</span></div><div className="lesson-complete-row"><span>{completed ? <><Check size={14} /> Lesson complete in this preview</> : 'Ready to continue when you are'}</span><button className={completed ? 'lesson-complete completed' : 'lesson-complete'} onClick={() => setCompleted(!completed)}>{completed ? 'Completed' : 'Mark complete'} <Check size={14} /></button></div><div className="lesson-pagination"><button onClick={() => move(Math.max(0, current - 1))} disabled={current === 0}><ArrowLeft size={14} /> Previous lesson</button><button onClick={() => { setCompleted(true); move(Math.min(course.lessons.length - 1, current + 1)) }} disabled={current === course.lessons.length - 1}>Next lesson <ArrowRight size={14} /></button></div><p className="lesson-demo-disclaimer">{userId ? 'You\'re signed in. Full progress tracking activates once course lessons are live in the database.' : 'Sign in to save your progress and access video content.'}</p></div></section></div></main>
}
