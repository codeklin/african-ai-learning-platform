import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import AdminDashboardView from '@/components/admin-dashboard-view'
import type { Profile, Course } from '@/lib/database.types'

export default async function AdminPage() {
  const supabase = await createClient()

  // Verify authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify admin role — read from DB, never trust client state
  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  const profile = rawProfile as { role: import('@/lib/database.types').UserRole } | null

  if (profile?.role !== 'admin') {
    return (
      <main className="access-denied">
        <div className="access-denied-card">
          <h1>Access denied</h1>
          <p>You need administrator permissions to view this control panel.</p>
          <Link href="/dashboard" className="button button-dark">
            Back to dashboard
          </Link>
        </div>
      </main>
    )
  }

  // Admin client bypasses RLS for admin reads
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
      .limit(30),
    adminClient
      .from('enrollments')
      .select('id, enrolled_at, user_id, course_id, profiles(full_name, email), courses(title, academy)')
      .order('enrolled_at', { ascending: false })
      .limit(30),
    adminClient
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  return (
    <AdminDashboardView
      userCount={userCount ?? 0}
      enrollmentCount={enrollmentCount ?? 0}
      courseCount={courseCount ?? 0}
      users={recentUsers ?? []}
      enrollments={recentEnrollments ?? []}
      courses={allCourses ?? []}
      adminUserEmail={user.email ?? 'admin@ituwa.africa'}
      initialTab="overview"
    />
  )
}
