import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import Brand from '@/components/brand'
import type { Profile, Enrollment, Course } from '@/lib/database.types'

export default async function AdminPage() {
  const supabase = await createClient()

  // Verify authenticated
  const { data: { user } } = await supabase.auth.getUser()
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
          <p>You need admin access to view this page.</p>
          <Link href="/dashboard" className="button button-dark">Back to dashboard</Link>
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
  ] = await Promise.all([
    adminClient.from('profiles').select('*', { count: 'exact', head: true }),
    adminClient.from('enrollments').select('*', { count: 'exact', head: true }),
    adminClient.from('courses').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    adminClient
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
    adminClient
      .from('enrollments')
      .select('id, enrolled_at, user_id, course_id, profiles(full_name, email), courses(title)')
      .order('enrolled_at', { ascending: false })
      .limit(10),
  ])

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          <Brand />
          <div className="dash-role-badge">Admin</div>
          <nav className="dash-nav">
            <Link href="/admin" className="dash-nav-item active">
              <LayoutDashboard size={17} /> Overview
            </Link>
            <Link href="/admin/users" className="dash-nav-item">
              <Users size={17} /> Users
            </Link>
            <Link href="/admin/courses" className="dash-nav-item">
              <BookOpen size={17} /> Courses
            </Link>
            <Link href="/admin/settings" className="dash-nav-item">
              <Settings size={17} /> Settings
            </Link>
          </nav>
        </div>
        <div className="dash-sidebar-foot">
          <form action={signOut}>
            <button type="submit" className="dash-signout">
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <div className="dash-main-inner">
          <header className="dash-header">
            <div>
              <p className="dash-date">Admin panel</p>
              <h1 className="dash-greeting">Platform overview</h1>
            </div>
          </header>

          {/* Stats row */}
          <section className="admin-stats">
            <div className="admin-stat-card">
              <span className="admin-stat-label">Total users</span>
              <span className="admin-stat-value">{userCount ?? 0}</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-label">Total enrollments</span>
              <span className="admin-stat-value">{enrollmentCount ?? 0}</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-label">Published courses</span>
              <span className="admin-stat-value">{courseCount ?? 0}</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-label">Revenue</span>
              <span className="admin-stat-value admin-stat-value--muted">—</span>
            </div>
          </section>

          {/* Recent users */}
          <section className="admin-table-section">
            <div className="dash-section-label">RECENT USERS</div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers?.map((u: Partial<Profile> & { id: string }) => (
                  <tr key={u.id}>
                    <td>
                      <span className="admin-avatar">{(u.full_name ?? u.email ?? '?')[0].toUpperCase()}</span>
                      {u.full_name ?? '—'}
                    </td>
                    <td>{u.email}</td>
                    <td><span className={`admin-role-badge admin-role-badge--${u.role}`}>{u.role}</span></td>
                    <td>{u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : '—'}</td>
                  </tr>
                ))}
                {(!recentUsers || recentUsers.length === 0) && (
                  <tr><td colSpan={4} className="admin-table-empty">No users yet</td></tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Recent enrollments */}
          <section className="admin-table-section">
            <div className="dash-section-label">RECENT ENROLLMENTS</div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Course</th>
                  <th>Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments?.map((e: Enrollment & { profiles?: Partial<Profile>; courses?: Partial<Course> }) => (
                  <tr key={e.id}>
                    <td>{e.profiles?.full_name ?? e.profiles?.email ?? '—'}</td>
                    <td>{e.courses?.title ?? '—'}</td>
                    <td>{new Date(e.enrolled_at).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
                {(!recentEnrollments || recentEnrollments.length === 0) && (
                  <tr><td colSpan={3} className="admin-table-empty">No enrollments yet</td></tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  )
}
