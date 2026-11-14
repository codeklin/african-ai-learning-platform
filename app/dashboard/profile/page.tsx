import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Flame,
  LayoutDashboard,
  LogOut,
  Mail,
  ShieldCheck,
  Trophy,
  User,
  Zap,
  ArrowRight,
  Settings,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = (await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()) as { data: import('@/lib/database.types').Profile | null; error: unknown }

  const { count: enrollmentsCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: completedLessonsCount } = await supabase
    .from('lesson_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const fullName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Learner'
  const email = profile?.email ?? user.email ?? ''
  const role = user.email === 'gigsdev007@gmail.com' || profile?.role === 'admin' ? 'admin' : (profile?.role ?? 'learner')
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
      })
    : '2026'

  return (
    <div className="app-shell">
      {/* ── Desktop sidebar ── */}
      <aside className="app-sidebar" aria-label="Main navigation">
        <div className="app-sidebar-top">
          <Brand />
          <nav className="app-sidebar-nav">
            <Link href="/dashboard" className="app-sidebar-item">
              <LayoutDashboard size={18} aria-hidden="true" /> Dashboard
            </Link>
            <Link href="/courses" className="app-sidebar-item">
              <BookOpen size={18} aria-hidden="true" /> Browse courses
            </Link>
            <Link href="/dashboard/challenges" className="app-sidebar-item">
              <Flame size={18} aria-hidden="true" /> Challenges
            </Link>
            <Link
              href="/dashboard/profile"
              className="app-sidebar-item app-sidebar-item--active"
            >
              <User size={18} aria-hidden="true" /> Profile
            </Link>
            {role === 'admin' && (
              <Link href="/admin" className="app-sidebar-item app-sidebar-item--admin">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Admin Console</span>
                <span className="super-admin-sidebar-tag">SUPER ADMIN</span>
              </Link>
            )}
          </nav>
        </div>
        <div className="app-sidebar-foot">
          <form action={signOut}>
            <button type="submit" className="app-sidebar-signout">
              <LogOut size={15} aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="app-content">
        {/* Mobile top chrome */}
        <header className="app-topbar" aria-label="App header">
          <Brand />
          <div className="app-topbar-right">
            {role === 'admin' && (
              <Link href="/admin" className="super-admin-topbar-chip" aria-label="Super Admin Portal">
                <ShieldCheck size={14} />
                <span>SUPER ADMIN</span>
              </Link>
            )}
            <button className="app-icon-btn" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <div className="app-avatar" aria-label="Your profile">
              {fullName[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="app-main" id="main-content">
          {/* Profile Card Header */}
          <section className="profile-hero-card">
            <div className="profile-hero-header">
              <div className="profile-avatar-large">
                <span>{fullName[0].toUpperCase()}</span>
              </div>
              <div className="profile-identity">
                <div className="profile-name-row">
                  <h1>{fullName}</h1>
                  <span className={`profile-role-tag role--${role}`}>
                    {role === 'admin' ? 'SUPER ADMIN' : role.toUpperCase()}
                  </span>
                </div>
                <p className="profile-email-text">
                  <Mail size={14} /> {email}
                </p>
                <p className="profile-joined-text">
                  <Calendar size={14} /> Joined {joinedDate}
                </p>
              </div>
            </div>

            <div className="profile-hero-actions">
              {role === 'admin' && (
                <Link href="/admin" className="button button-dark profile-action-btn">
                  <ShieldCheck size={15} />
                  <span>Super Admin Suite</span>
                </Link>
              )}
              <Link href="/courses" className="button button-light profile-action-btn">
                <span>Browse courses</span>
                <ArrowRight size={15} />
              </Link>
              <form action={signOut}>
                <button type="submit" className="profile-signout-btn">
                  <LogOut size={15} /> Sign out
                </button>
              </form>
            </div>
          </section>

          {/* Learning Metrics Grid */}
          <section className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="profile-stat-icon-wrap icon-amber">
                <Flame size={20} />
              </div>
              <div>
                <span className="profile-stat-number">4</span>
                <span className="profile-stat-label">Day Streak</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon-wrap icon-terracotta">
                <BookOpen size={20} />
              </div>
              <div>
                <span className="profile-stat-number">{enrollmentsCount ?? 0}</span>
                <span className="profile-stat-label">Enrolled Courses</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon-wrap icon-jade">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="profile-stat-number">{completedLessonsCount ?? 0}</span>
                <span className="profile-stat-label">Lessons Finished</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-icon-wrap icon-purple">
                <Zap size={20} />
              </div>
              <div>
                <span className="profile-stat-number">320</span>
                <span className="profile-stat-label">XP Earned</span>
              </div>
            </div>
          </section>

          {/* Account Details & Settings Section */}
          <section className="profile-settings-section">
            <div className="dash-section-label">ACCOUNT & LEARNING GOALS</div>
            <div className="profile-cards-col">
              <div className="profile-setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3>Security & Authentication</h3>
                    <p>Protected by Supabase Auth with encrypted sessions.</p>
                  </div>
                </div>
                <div className="setting-card-body">
                  <div className="setting-row">
                    <span>Account Email</span>
                    <b>{email}</b>
                  </div>
                  <div className="setting-row">
                    <span>Password</span>
                    <Link href="/auth/reset-password" className="setting-link">
                      Change password →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="profile-setting-card">
                <div className="setting-card-header">
                  <div className="setting-icon-box">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h3>Learning Preferences</h3>
                    <p>Tailor your daily goals and course recommendations.</p>
                  </div>
                </div>
                <div className="setting-card-body">
                  <div className="setting-row">
                    <span>Active Track</span>
                    <span className="setting-pill">Creator Economy & AI</span>
                  </div>
                  <div className="setting-row">
                    <span>Weekly Target</span>
                    <span className="setting-pill">3 lessons / week</span>
                  </div>
                  <div className="setting-row">
                    <span>Study Reminder</span>
                    <span className="setting-pill pill-active">Daily 7:00 PM</span>
                  </div>
                  <div className="setting-row" style={{ paddingTop: 8, borderTop: '1px solid #F0E7DB' }}>
                    <span>Recalibrate track</span>
                    <Link href="/quiz" className="setting-link">
                      Take Skill Assessment →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom allowance spacer so bottom nav never overshadows details */}
          <div className="app-bottom-spacer" aria-hidden="true" />
        </main>
      </div>

      {/* Fixed mobile navigation */}
      <AppBottomNav active="profile" />
    </div>
  )
}
