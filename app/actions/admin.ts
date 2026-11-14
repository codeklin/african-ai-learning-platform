'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { UserRole, CourseStatus } from '@/lib/database.types'

async function assertSuperAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized: Authentication required.')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Forbidden: Super Administrator privileges required.')
  }

  return user
}

export async function updateUserRoleAction(targetUserId: string, newRole: UserRole) {
  await assertSuperAdmin()
  const adminClient = await createAdminClient()

  const { error } = await adminClient
    .from('profiles')
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq('id', targetUserId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateCourseStatusAction(courseId: string, newStatus: CourseStatus) {
  await assertSuperAdmin()
  const adminClient = await createAdminClient()

  const { error } = await adminClient
    .from('courses')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', courseId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  return { success: true }
}
