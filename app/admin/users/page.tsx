import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import AdminDashboardView from '@/components/admin-dashboard-view'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  const profile = rawProfile as { role: import('@/lib/database.types').UserRole } | null
  if (profile?.role !== 'admin') redirect('/dashboard')

  const adminClient = await createAdminClient()
  const [
    { count: userCount },
    { count: enrollmentCount },
    { count: courseCount },
    { data: recentUsers },
    { data: recentEnrollments },
    { data: allCourses },
  ] = await Promise.all([
    adminClient.from('profiles').select('*', { count: 'exact', head: true }),
    adminClient.from('enrollments').select('*', { count: 'exact', head: true }),
    adminClient.from('courses').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    adminClient
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(50),
    adminClient
      .from('enrollments')
      .select('id, enrolled_at, user_id, course_id, payment_verified_at, profiles(full_name, email), courses(title, academy, access)')
      .order('enrolled_at', { ascending: false })
      .limit(30),
    adminClient.from('courses').select('*').order('created_at', { ascending: false }),
  ])

  const paidUserIds = new Set(
    (recentEnrollments ?? [])
      .filter((e) => e.payment_verified_at)
      .map((e) => e.user_id)
  )

  return (
    <AdminDashboardView
      userCount={userCount ?? 0}
      enrollmentCount={enrollmentCount ?? 0}
      courseCount={courseCount ?? 0}
      users={recentUsers ?? []}
      enrollments={recentEnrollments ?? []}
      courses={allCourses ?? []}
      adminUserEmail={user.email ?? 'Account email unavailable'}
      initialTab="users"
      paidUserIds={paidUserIds}
    />
  )
}
