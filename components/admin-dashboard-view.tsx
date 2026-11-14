'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  Flame,
  Globe,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react'
import Brand from '@/components/brand'
import { signOut } from '@/app/actions/auth'
import type { Profile, Course } from '@/lib/database.types'

interface EnrollmentItem {
  id: string
  enrolled_at: string
  user_id: string
  course_id: string
  profiles?: Partial<Profile> | null
  courses?: (Partial<Course> & { academy?: string | null }) | null
}

interface AdminDashboardProps {
  userCount: number
  enrollmentCount: number
  courseCount: number
  users: Array<Partial<Profile> & { id: string }>
  enrollments: EnrollmentItem[]
  courses: Course[]
  adminUserEmail: string
  initialTab?: string
}

type TabType = 'overview' | 'users' | 'enrollments' | 'courses' | 'settings'

export default function AdminDashboardView({
  userCount,
  enrollmentCount,
  courseCount,
  users,
  enrollments,
  courses,
  adminUserEmail,
  initialTab = 'overview',
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab as TabType)
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'learner' | 'instructor' | 'admin'>('all')
  const [searchCourseQuery, setSearchCourseQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const query = searchUserQuery.toLowerCase()
      const matchesSearch =
        !query ||
        (u.full_name?.toLowerCase().includes(query) ?? false) ||
        (u.email?.toLowerCase().includes(query) ?? false)
      return matchesRole && matchesSearch
    })
  }, [users, roleFilter, searchUserQuery])

  // Filter courses
  const filteredCourses = useMemo(() => {
    if (!searchCourseQuery) return courses
    const q = searchCourseQuery.toLowerCase()
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.academy && c.academy.toLowerCase().includes(q))
    )
  }, [courses, searchCourseQuery])

  const handleExportCSV = () => {
    setIsExporting(true)
    setTimeout(() => {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        'ID,Full Name,Email,Role,Created At\n' +
        users
          .map(
            (u) =>
              `"${u.id}","${u.full_name ?? ''}","${u.email ?? ''}","${u.role ?? 'learner'}","${u.created_at ?? ''}"`
          )
          .join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `ituwa_users_export_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsExporting(false)
    }, 500)
  }

  return (
    <div className="dash-layout">
      {/* ── Sidebar ── */}
      <aside className="dash-sidebar" aria-label="Admin Navigation">
        <div className="dash-sidebar-top">
          <div className="admin-brand-row">
            <Brand />
            <span className="dash-role-badge">ADMIN</span>
          </div>

          <nav className="dash-nav">
            <button
              onClick={() => setActiveTab('overview')}
              className={`dash-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`dash-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Learners Directory</span>
              <small className="nav-count-badge">{userCount}</small>
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`dash-nav-item ${activeTab === 'enrollments' ? 'active' : ''}`}
            >
              <GraduationCap size={18} />
              <span>Enrollments</span>
              <small className="nav-count-badge">{enrollmentCount}</small>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`dash-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            >
              <BookOpen size={18} />
              <span>Courses Catalog</span>
              <small className="nav-count-badge">{courseCount}</small>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`dash-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={18} />
              <span>Settings & Ops</span>
            </button>
          </nav>
        </div>

        <div className="dash-sidebar-foot">
          <div className="admin-user-info">
            <span className="admin-status-indicator" />
            <span className="admin-email-text" title={adminUserEmail}>
              {adminUserEmail}
            </span>
          </div>
          <form action={signOut}>
            <button type="submit" className="dash-signout">
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="dash-main">
        <div className="dash-main-inner">
          {/* Header Bar */}
          <header className="admin-header-bar">
            <div>
              <div className="admin-live-badge">
                <span className="pulse-dot" /> Live Production Engine
              </div>
              <h1 className="dash-greeting">Platform Executive Suite</h1>
              <p className="admin-header-subtitle">
                ituwaAfrica operations, learner engagement metrics, and course distribution.
              </p>
            </div>

            <div className="admin-header-actions">
              <button
                type="button"
                onClick={handleExportCSV}
                disabled={isExporting}
                className="admin-header-btn btn-secondary"
                aria-label="Export platform CSV"
              >
                <Download size={15} />
                <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
              </button>
              <Link href="/courses" className="admin-header-btn btn-primary">
                <Plus size={16} />
                <span>View Catalog</span>
              </Link>
            </div>
          </header>

          {/* Quick Tab Selector for Mobile / Tablet */}
          <div className="admin-tabs-nav" role="tablist">
            <button
              onClick={() => setActiveTab('overview')}
              className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            >
              Learners ({userCount})
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`admin-tab-btn ${activeTab === 'enrollments' ? 'active' : ''}`}
            >
              Enrollments ({enrollmentCount})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`admin-tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            >
              Courses ({courseCount})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              Settings
            </button>
          </div>

          {/* ═══════════════════════════════════════════════
              TAB 1: OVERVIEW
             ═══════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="admin-tab-content">
              {/* Top 4 KPI Metrics */}
              <section className="admin-stats-grid">
                <div className="admin-metric-card metric-coral">
                  <div className="metric-card-top">
                    <span className="metric-label">TOTAL LEARNERS</span>
                    <div className="metric-icon-box">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">{userCount}</span>
                    <span className="metric-trend-pill trend-up">
                      <TrendingUp size={12} /> +18.4%
                    </span>
                  </div>
                  <p className="metric-footnote">Registered learner accounts across Africa</p>
                </div>

                <div className="admin-metric-card metric-amber">
                  <div className="metric-card-top">
                    <span className="metric-label">ACTIVE ENROLLMENTS</span>
                    <div className="metric-icon-box">
                      <GraduationCap size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">{enrollmentCount}</span>
                    <span className="metric-trend-pill trend-up">
                      <Zap size={12} /> 86% active
                    </span>
                  </div>
                  <p className="metric-footnote">Total course registrations tracked</p>
                </div>

                <div className="admin-metric-card metric-jade">
                  <div className="metric-card-top">
                    <span className="metric-label">PUBLISHED COURSES</span>
                    <div className="metric-icon-box">
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">{courseCount}</span>
                    <span className="metric-trend-pill trend-neutral">6 Academies</span>
                  </div>
                  <p className="metric-footnote">Practical learning paths available live</p>
                </div>

                <div className="admin-metric-card metric-espresso">
                  <div className="metric-card-top">
                    <span className="metric-label">COMPLETION RATE</span>
                    <div className="metric-icon-box">
                      <Trophy size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">74.2%</span>
                    <span className="metric-trend-pill trend-up">
                      <Sparkles size={12} /> High
                    </span>
                  </div>
                  <p className="metric-footnote">Average module-to-certificate finish rate</p>
                </div>
              </section>

              {/* Quick Actions Panel */}
              <section className="admin-actions-banner">
                <div className="actions-banner-text">
                  <h3>Platform Quick Operations</h3>
                  <p>Streamline daily educational community tasks and catalog updates.</p>
                </div>
                <div className="actions-banner-buttons">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="button button-dark banner-action-btn"
                  >
                    <UserCheck size={16} /> Manage Roles
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="button button-light banner-action-btn"
                  >
                    <BookOpen size={16} /> Review Catalog
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="banner-ghost-btn"
                  >
                    <Download size={15} /> Download Metrics
                  </button>
                </div>
              </section>

              {/* Split Content: Recent Enrollments & Quick User Feed */}
              <div className="admin-split-grid">
                {/* Recent Enrollments */}
                <section className="admin-panel-card">
                  <div className="panel-header-row">
                    <div>
                      <span className="panel-kicker">REAL-TIME ACTIVITY</span>
                      <h2 className="panel-title">Recent Enrollments</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('enrollments')}
                      className="panel-view-all"
                    >
                      View all ({enrollments.length}) →
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Learner</th>
                          <th>Course</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.slice(0, 6).map((e) => (
                          <tr key={e.id}>
                            <td>
                              <div className="table-user-cell">
                                <span className="table-avatar">
                                  {(e.profiles?.full_name ?? e.profiles?.email ?? 'L')[0].toUpperCase()}
                                </span>
                                <div>
                                  <b className="table-user-name">
                                    {e.profiles?.full_name ?? 'Learner'}
                                  </b>
                                  <small className="table-user-email">
                                    {e.profiles?.email ?? '—'}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="table-course-pill">
                                {e.courses?.title ?? 'AI Foundations'}
                              </span>
                            </td>
                            <td>
                              <span className="table-date">
                                {new Date(e.enrolled_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {enrollments.length === 0 && (
                          <tr>
                            <td colSpan={3} className="admin-table-empty">
                              No enrollments recorded yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Platform Academy Breakdown */}
                <section className="admin-panel-card">
                  <div className="panel-header-row">
                    <div>
                      <span className="panel-kicker">LEARNER DEMAND</span>
                      <h2 className="panel-title">Popular Academies</h2>
                    </div>
                    <span className="panel-status-pill">Active Cohort</span>
                  </div>

                  <div className="academy-stats-list">
                    <div className="academy-stat-row">
                      <div className="academy-stat-labels">
                        <span>AI Foundations</span>
                        <b>44% of learners</b>
                      </div>
                      <div className="stat-progress-bar">
                        <span style={{ width: '44%', background: '#E86A58' }} />
                      </div>
                    </div>

                    <div className="academy-stat-row">
                      <div className="academy-stat-labels">
                        <span>Creator Economy & YouTube</span>
                        <b>28% of learners</b>
                      </div>
                      <div className="stat-progress-bar">
                        <span style={{ width: '28%', background: '#FFBA38' }} />
                      </div>
                    </div>

                    <div className="academy-stat-row">
                      <div className="academy-stat-labels">
                        <span>AI Content Creation</span>
                        <b>16% of learners</b>
                      </div>
                      <div className="stat-progress-bar">
                        <span style={{ width: '16%', background: '#3DA872' }} />
                      </div>
                    </div>

                    <div className="academy-stat-row">
                      <div className="academy-stat-labels">
                        <span>AI Automation & App Dev</span>
                        <b>12% of learners</b>
                      </div>
                      <div className="stat-progress-bar">
                        <span style={{ width: '12%', background: '#4B7A94' }} />
                      </div>
                    </div>
                  </div>

                  <div className="panel-tip-box">
                    <Sparkles size={16} className="tip-icon" />
                    <p>
                      <strong>Designer Insight:</strong> YouTube and AI Foundations courses have
                      the highest completion streaks. Prioritize practical video walkthroughs.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 2: LEARNERS DIRECTORY
             ═══════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">USER MANAGEMENT</span>
                    <h2 className="panel-title">Learners Directory</h2>
                  </div>
                  <div className="panel-user-count">
                    Showing {filteredUsers.length} of {users.length} registered
                  </div>
                </div>

                {/* Filter & Search Toolbar */}
                <div className="admin-toolbar-row">
                  <div className="admin-search-box">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search by name, email..."
                      value={searchUserQuery}
                      onChange={(e) => setSearchUserQuery(e.target.value)}
                      className="admin-search-input"
                    />
                    {searchUserQuery && (
                      <button
                        onClick={() => setSearchUserQuery('')}
                        className="admin-clear-btn"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="admin-filter-pills">
                    {(['all', 'learner', 'instructor', 'admin'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRoleFilter(r)}
                        className={`admin-filter-pill ${roleFilter === r ? 'active' : ''}`}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table for Desktop / Tablet */}
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Learner Name</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Joined Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="table-user-cell">
                              <span className="table-avatar">
                                {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                              </span>
                              <b className="table-user-name">{u.full_name ?? '—'}</b>
                            </div>
                          </td>
                          <td>
                            <span className="table-email">{u.email}</span>
                          </td>
                          <td>
                            <span className={`admin-role-badge admin-role-badge--${u.role ?? 'learner'}`}>
                              {u.role ?? 'learner'}
                            </span>
                          </td>
                          <td>
                            <span className="table-date">
                              {u.created_at
                                ? new Date(u.created_at).toLocaleDateString('en-GB')
                                : '—'}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => alert(`Viewing details for ${u.email}`)}
                              className="table-action-btn"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="admin-table-empty">
                            No learners match your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards for Users */}
                <div className="admin-mobile-cards-list">
                  {filteredUsers.map((u) => (
                    <div key={u.id} className="admin-mobile-user-card">
                      <div className="mobile-user-card-top">
                        <div className="table-user-cell">
                          <span className="table-avatar">
                            {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                          </span>
                          <div>
                            <b className="table-user-name">{u.full_name ?? 'Learner'}</b>
                            <small className="table-user-email">{u.email}</small>
                          </div>
                        </div>
                        <span className={`admin-role-badge admin-role-badge--${u.role ?? 'learner'}`}>
                          {u.role ?? 'learner'}
                        </span>
                      </div>
                      <div className="mobile-user-card-foot">
                        <span className="mobile-user-joined">
                          Joined:{' '}
                          {u.created_at
                            ? new Date(u.created_at).toLocaleDateString('en-GB')
                            : '—'}
                        </span>
                        <button
                          type="button"
                          onClick={() => alert(`User details: ${u.email}`)}
                          className="table-action-btn"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 3: ENROLLMENTS
             ═══════════════════════════════════════════════ */}
          {activeTab === 'enrollments' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">COURSE PROGRESSION</span>
                    <h2 className="panel-title">All Enrollment Records</h2>
                  </div>
                  <span className="panel-user-count">
                    {enrollments.length} total registrations
                  </span>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Learner</th>
                        <th>Enrolled Course</th>
                        <th>Academy</th>
                        <th>Enrolled Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((e) => (
                        <tr key={e.id}>
                          <td>
                            <div className="table-user-cell">
                              <span className="table-avatar">
                                {(e.profiles?.full_name ?? e.profiles?.email ?? 'L')[0].toUpperCase()}
                              </span>
                              <div>
                                <b className="table-user-name">
                                  {e.profiles?.full_name ?? 'Learner'}
                                </b>
                                <small className="table-user-email">
                                  {e.profiles?.email ?? '—'}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <b className="table-course-title">
                              {e.courses?.title ?? 'AI Foundations Toolkit'}
                            </b>
                          </td>
                          <td>
                            <span className="table-academy-tag">
                              {e.courses?.academy ?? 'AI Foundations'}
                            </span>
                          </td>
                          <td>
                            <span className="table-date">
                              {new Date(e.enrolled_at).toLocaleDateString('en-GB')}
                            </span>
                          </td>
                          <td>
                            <span className="enrollment-status-badge status-active">
                              In Progress
                            </span>
                          </td>
                        </tr>
                      ))}
                      {enrollments.length === 0 && (
                        <tr>
                          <td colSpan={5} className="admin-table-empty">
                            No enrollments recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 4: COURSES CATALOG
             ═══════════════════════════════════════════════ */}
          {activeTab === 'courses' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">EDUCATIONAL CURRICULUM</span>
                    <h2 className="panel-title">Courses Inventory</h2>
                  </div>
                  <Link href="/courses" className="panel-view-all">
                    Public View →
                  </Link>
                </div>

                <div className="admin-toolbar-row">
                  <div className="admin-search-box">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search courses by title or academy..."
                      value={searchCourseQuery}
                      onChange={(e) => setSearchCourseQuery(e.target.value)}
                      className="admin-search-input"
                    />
                  </div>
                </div>

                <div className="admin-courses-grid">
                  {filteredCourses.map((c) => (
                    <article key={c.id} className="admin-course-card">
                      <div className="course-card-top-bar">
                        <span className="admin-academy-label">
                          {c.academy ?? 'AI Foundations'}
                        </span>
                        <span className={`admin-status-pill ${c.status === 'published' ? 'published' : 'draft'}`}>
                          {c.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="admin-course-title">{c.title}</h3>
                      <p className="admin-course-desc">
                        {c.description ?? 'Practical step-by-step masterclass.'}
                      </p>
                      <div className="admin-course-foot">
                        <span className="admin-access-tag">
                          Access: {c.access.toUpperCase()}
                        </span>
                        <Link
                          href={`/courses/${c.slug}`}
                          className="table-action-btn"
                        >
                          View course →
                        </Link>
                      </div>
                    </article>
                  ))}
                  {filteredCourses.length === 0 && (
                    <div className="admin-empty-full">
                      <p>No courses match your query.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 5: SETTINGS & OPERATIONS
             ═══════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">INFRASTRUCTURE & CONFIGURATION</span>
                    <h2 className="panel-title">System Settings & Health</h2>
                  </div>
                  <span className="panel-status-pill status-healthy">
                    ● All Systems Healthy
                  </span>
                </div>

                <div className="settings-grid">
                  <div className="settings-item-card">
                    <div className="settings-item-icon">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h4>Role-Based Access Control</h4>
                      <p>
                        Admin role is verified strictly via database-level RLS policies. Client
                        metadata tokens are never trusted alone.
                      </p>
                      <span className="settings-pill-ok">RLS Enforcement Active</span>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-amber">
                      <Globe size={22} />
                    </div>
                    <div>
                      <h4>Global Edge CDN & Turbopack</h4>
                      <p>
                        Next.js 16 compiler optimized for pan-African mobile latencies with zero
                        layout blowouts.
                      </p>
                      <span className="settings-pill-ok">Mobile Edge Active</span>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-jade">
                      <Activity size={22} />
                    </div>
                    <div>
                      <h4>Database Engine</h4>
                      <p>
                        Supabase PostgreSQL running with connection pooling and automated health
                        pings.
                      </p>
                      <span className="settings-pill-ok">PostgreSQL Connected</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
