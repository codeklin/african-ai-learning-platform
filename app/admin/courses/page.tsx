import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import AdminDashboardView from '@/components/admin-dashboard-view'

export default async function AdminCoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  const profile = rawProfile as { role: import('@/lib/database.types').UserRole } | null
  if (profile?.role !== 'admin' && user.email !== 'gigsdev007@gmail.com') redirect('/dashboard')

  const adminClient = await createAdminClient()
  const [
    { count: userCount },
    { count: enrollmentCount },
    { count: courseCount },
    { data: recentUsers },
    { data: recentEnrollments },
    { data: allCourses },
  ] = await Promise.all([
    adminClient.from('profiles').select('id', { count: 'exact', head: true }),
    adminClient.from('enrollments').select('id', { count: 'exact', head: true }),
    adminClient.from('courses').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    adminClient
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(20),
    adminClient
      .from('enrollments')
      .select('id, enrolled_at, user_id, course_id, profiles(full_name, email), courses(title, academy)')
      .order('enrolled_at', { ascending: false })
      .limit(20),
    adminClient.from('courses').select('id, title, slug, description, academy, status, access, created_at').order('created_at', { ascending: false }).limit(50),
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
      initialTab="courses"
    />
  )
}
