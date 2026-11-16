'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleLessonProgressAction({
  lessonId,
  courseId,
  completed,
  courseSlug,
  lessonSlug,
}: {
  lessonId: string
  courseId: string
  completed: boolean
  courseSlug: string
  lessonSlug: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized: Authentication required.' }
  }

  if (completed) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('lesson_progress') as any).upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        course_id: courseId,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )

    if (error) {
      console.error('Failed to record lesson progress:', error)
      return { success: false, error: error.message }
    }
  } else {
    const { error } = await supabase
      .from('lesson_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)

    if (error) {
      console.error('Failed to remove lesson progress:', error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath(`/learn/${courseSlug}/${lessonSlug}`)
  revalidatePath(`/courses/${courseSlug}`)
  revalidatePath('/dashboard')

  return { success: true, completed }
}
