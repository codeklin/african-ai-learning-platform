import { notFound } from 'next/navigation'
import LessonPreview from '@/components/lesson-preview'

const availableCourses = ['ai-toolkit-practical-start', 'prompting-better-work', 'youtube-business-fundamentals', 'starting-a-faceless-youtube-channel', 'youtube-automation-monetization-masterclass', 'ai-powered-youtube-content-production', 'youtube-shorts-growth-strategy', 'youtube-seo-and-analytics', 'youtube-monetization-policies-and-copyright', 'building-a-creator-business-beyond-ad-revenue']

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string; lessonSlug: string }> }) {
  const { courseSlug, lessonSlug } = await params
  if (!availableCourses.includes(courseSlug) || !/^lesson-\d+$/.test(lessonSlug)) notFound()
  return <LessonPreview slug={courseSlug} />
}
