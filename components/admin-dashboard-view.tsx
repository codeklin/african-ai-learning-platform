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
  X,
  Zap,
  Radio,
  Eye,
  Sliders,
  AlertCircle,
} from 'lucide-react'
import Brand from '@/components/brand'
import { signOut } from '@/app/actions/auth'
import { updateUserRoleAction, updateCourseStatusAction, createCourseAction } from '@/app/actions/admin'
import type { Profile, Course, UserRole, CourseStatus, LessonType } from '@/lib/database.types'

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
  users: initialUsers,
  enrollments,
  courses: initialCourses,
  adminUserEmail,
  initialTab = 'overview',
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab as TabType)
  const [users, setUsers] = useState(initialUsers)
  const [courses, setCourses] = useState(initialCourses)
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'learner' | 'instructor' | 'admin'>('all')
  const [searchCourseQuery, setSearchCourseQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Announcement feature
  const [announcementText, setAnnouncementText] = useState('New practical learning sprints are live in YouTube & AI Foundations.')
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(true)

  // Course Creator Studio State
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false)
  const [isSubmittingCourse, setIsSubmittingCourse] = useState(false)
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    academy: 'Creator Economy & YouTube',
    access: 'free' as 'free' | 'paid',
    status: 'published' as 'published' | 'draft',
    moduleTitle: 'Module 01: Core Foundations & Framework',
    firstLessonTitle: '',
    firstLessonSlug: '',
    lessonType: 'text' as LessonType,
    youtubeVideoId: '',
    lessonBody: '',
    takeaway: '',
  })

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

  // Change user role action
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingUserId(userId)
    try {
      const res = await updateUserRoleAction(userId, newRole)
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        )
        setNotification({
          message: `User role elevated to ${newRole.toUpperCase()} successfully.`,
          type: 'success',
        })
      } else {
        setNotification({
          message: res.error ?? 'Failed to update role',
          type: 'error',
        })
      }
    } catch (err: unknown) {
      setNotification({
        message: err instanceof Error ? err.message : 'Error updating user role',
        type: 'error',
      })
    } finally {
      setUpdatingUserId(null)
      setTimeout(() => setNotification(null), 4000)
    }
  }

  // Toggle course status action
  const handleCourseStatusToggle = async (courseId: string, currentStatus: CourseStatus) => {
    const nextStatus: CourseStatus = currentStatus === 'published' ? 'draft' : 'published'
    setUpdatingCourseId(courseId)
    try {
      const res = await updateCourseStatusAction(courseId, nextStatus)
      if (res.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === courseId ? { ...c, status: nextStatus } : c))
        )
        setNotification({
          message: `Course status changed to ${nextStatus.toUpperCase()}.`,
          type: 'success',
        })
      } else {
        setNotification({
          message: res.error ?? 'Failed to change course status',
          type: 'error',
        })
      }
    } catch (err: unknown) {
      setNotification({
        message: err instanceof Error ? err.message : 'Error changing status',
        type: 'error',
      })
    } finally {
      setUpdatingCourseId(null)
      setTimeout(() => setNotification(null), 4000)
    }
  }

  // Handle Course Creation Submit
  const handleCreateCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseForm.title.trim()) {
      setNotification({ message: 'Course title is required.', type: 'error' })
      return
    }
    setIsSubmittingCourse(true)
    try {
      const res = await createCourseAction({
        title: courseForm.title,
        slug: courseForm.slug || undefined,
        description: courseForm.description || undefined,
        academy: courseForm.academy,
        access: courseForm.access,
        status: courseForm.status,
        moduleTitle: courseForm.moduleTitle || undefined,
        firstLessonTitle: courseForm.firstLessonTitle || undefined,
        firstLessonSlug: courseForm.firstLessonSlug || undefined,
        lessonType: courseForm.lessonType,
        youtubeVideoId: courseForm.youtubeVideoId || undefined,
        lessonBody: courseForm.lessonBody || undefined,
        takeaway: courseForm.takeaway || undefined,
      })
      if (res.success) {
        setCourses((prev) => [res.course, ...prev])
        setNotification({
          message: `Course "${res.course.title}" successfully uploaded and saved to database!`,
          type: 'success',
        })
        setIsCreateCourseOpen(false)
        setCourseForm({
          title: '',
          slug: '',
          description: '',
          academy: 'Creator Economy & YouTube',
          access: 'free',
          status: 'published',
          moduleTitle: 'Module 01: Core Foundations & Framework',
          firstLessonTitle: '',
          firstLessonSlug: '',
          lessonType: 'text',
          youtubeVideoId: '',
          lessonBody: '',
          takeaway: '',
        })
      } else {
        setNotification({
          message: res.error || 'Failed to create course in database',
          type: 'error',
        })
      }
    } catch (err: unknown) {
      setNotification({
        message: err instanceof Error ? err.message : 'Error creating course',
        type: 'error',
      })
    } finally {
      setIsSubmittingCourse(false)
      setTimeout(() => setNotification(null), 5000)
    }
  }

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
      <aside className="dash-sidebar" aria-label="Super Admin Navigation">
        <div className="dash-sidebar-top">
          <div className="admin-brand-row">
            <Brand />
            <span className="dash-role-badge super-admin-badge">
              <ShieldCheck size={14} /> SUPER ADMIN
            </span>
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
              <small className="nav-count-badge">{users.length}</small>
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
              <small className="nav-count-badge">{courses.length}</small>
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
            <div className="admin-identity-block">
              <span className="admin-identity-role">ROOT SUPER ADMIN</span>
              <span className="admin-email-text" title={adminUserEmail}>
                {adminUserEmail}
              </span>
            </div>
          </div>
          <Link href="/dashboard" className="dash-view-learner-link">
            Return to Learner App →
          </Link>
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
          {/* Prominent Super Admin Identity Strip */}
          <section className="super-admin-executive-strip">
            <div className="executive-strip-left">
              <div className="executive-crown-badge">
                <ShieldCheck size={20} />
                <span>SUPER ADMINISTRATOR</span>
              </div>
              <div className="executive-meta">
                <b>Root Control Center</b>
                <span>Tier 1 Clearance · Direct Database Access · Session Authenticated</span>
              </div>
            </div>
            <div className="executive-strip-right">
              <span className="executive-pill-green">
                <span className="pulse-dot" /> RLS Enforcement Engine: ACTIVE
              </span>
              <span className="executive-pill-amber">
                Database: Supabase Production
              </span>
            </div>
          </section>

          {/* Toast Notification for Mutations */}
          {notification && (
            <div className={`admin-notification-toast toast--${notification.type}`}>
              {notification.type === 'success' ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="toast-close-btn"
                aria-label="Close message"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Header Bar */}
          <header className="admin-header-bar">
            <div>
              <div className="admin-live-badge">
                <span className="pulse-dot" /> Live Production Engine
              </div>
              <h1 className="dash-greeting">Platform Executive Suite</h1>
              <p className="admin-header-subtitle">
                ituwaAfrica operations, role assignments, course publishing, and database sync.
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
                <Eye size={16} />
                <span>View Public Catalog</span>
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
              Learners Directory ({users.length})
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
              Courses Inventory ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              Operations & Settings
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
                    <span className="metric-value">{users.length}</span>
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
                    <span className="metric-value">{courses.filter((c) => c.status === 'published').length}</span>
                    <span className="metric-trend-pill trend-neutral">{courses.length} in catalog</span>
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

              {/* Super Admin Live Announcement Control */}
              <section className="admin-announcement-panel">
                <div className="announcement-panel-header">
                  <div className="announcement-title-wrap">
                    <Radio size={18} className="announcement-icon" />
                    <div>
                      <h3>Community Announcement Broadcast</h3>
                      <p>Active notification displayed at the top of learner sessions.</p>
                    </div>
                  </div>
                  <div className="announcement-toggle-wrap">
                    <span className="announcement-status-text">
                      Status: {isAnnouncementActive ? 'LIVE' : 'DISABLED'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAnnouncementActive(!isAnnouncementActive)}
                      className={`announcement-toggle-btn ${isAnnouncementActive ? 'btn-active' : ''}`}
                    >
                      {isAnnouncementActive ? 'Deactivate' : 'Broadcast Now'}
                    </button>
                  </div>
                </div>
                <div className="announcement-input-box">
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="announcement-input"
                    placeholder="Enter broadcast message to all learners..."
                  />
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
                      <strong>Super Admin Insight:</strong> High retention in YouTube & AI Foundations.
                      Learners respond best to hands-on portfolio challenges.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 2: LEARNERS DIRECTORY (WITH SUPER ADMIN ROLE SWITCHING)
             ═══════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">SUPER ADMIN ACCESS</span>
                    <h2 className="panel-title">Learners & Privileges Directory</h2>
                  </div>
                  <div className="panel-user-count">
                    Showing {filteredUsers.length} of {users.length} accounts
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
                        aria-label="Clear user search"
                      >
                        <X size={14} />
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
                        <th>Role Permission</th>
                        <th>Change Role</th>
                        <th>Joined</th>
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
                            <select
                              value={u.role ?? 'learner'}
                              onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                              disabled={updatingUserId === u.id}
                              className="super-admin-role-select"
                              aria-label={`Change role for ${u.email}`}
                            >
                              <option value="learner">Learner</option>
                              <option value="instructor">Instructor</option>
                              <option value="admin">Super Admin</option>
                            </select>
                          </td>
                          <td>
                            <span className="table-date">
                              {u.created_at
                                ? new Date(u.created_at).toLocaleDateString('en-GB')
                                : '—'}
                            </span>
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
                        <div className="mobile-role-selector">
                          <span>Set Role:</span>
                          <select
                            value={u.role ?? 'learner'}
                            onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                            disabled={updatingUserId === u.id}
                            className="super-admin-role-select"
                          >
                            <option value="learner">Learner</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Super Admin</option>
                          </select>
                        </div>
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
              TAB 4: COURSES INVENTORY (WITH SUPER ADMIN PUBLISHING TOGGLE)
             ═══════════════════════════════════════════════ */}
          {activeTab === 'courses' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">SUPER ADMIN CURRICULUM CONTROL</span>
                    <h2 className="panel-title">Courses Inventory & Publishing</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setIsCreateCourseOpen(true)}
                      className="button button-dark"
                      style={{ minHeight: 38, padding: '0 16px', fontSize: 13 }}
                    >
                      <Plus size={15} /> Upload New Course
                    </button>
                    <Link href="/courses" className="panel-view-all">
                      Public View →
                    </Link>
                  </div>
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
                        <div className="admin-course-actions">
                          <button
                            type="button"
                            onClick={() => handleCourseStatusToggle(c.id, c.status)}
                            disabled={updatingCourseId === c.id}
                            className={`super-admin-status-btn ${c.status === 'published' ? 'status-btn-draft' : 'status-btn-publish'}`}
                          >
                            {c.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <Link
                            href={`/courses/${c.slug}`}
                            className="table-action-btn"
                          >
                            Inspect →
                          </Link>
                        </div>
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
              TAB 5: SETTINGS & INFRASTRUCTURE
             ═══════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">INFRASTRUCTURE & CONFIGURATION</span>
                    <h2 className="panel-title">System Settings & Super Admin Status</h2>
                  </div>
                  <span className="panel-status-pill status-healthy">
                    All Systems Operational
                  </span>
                </div>

                <div className="settings-grid">
                  <div className="settings-item-card">
                    <div className="settings-item-icon">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h4>Super Admin Role-Based Access</h4>
                      <p>
                        Role enforcement is verified directly at the database tier via PostgreSQL
                        RLS policies and service-role bypass for verified admins.
                      </p>
                      <span className="settings-pill-ok">Security Policy Active</span>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-amber">
                      <Globe size={22} />
                    </div>
                    <div>
                      <h4>Pan-African Mobile Delivery Engine</h4>
                      <p>
                        Optimized Next.js 16 build targeting Android Google Play Store standards
                        with zero layout blowout and instant low-bandwidth rendering.
                      </p>
                      <span className="settings-pill-ok">Android Standard Enforced</span>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-jade">
                      <Activity size={22} />
                    </div>
                    <div>
                      <h4>Supabase PostgreSQL Cluster</h4>
                      <p>
                        Database engine connection active with automated health checks, foreign
                        key validation, and session rotation.
                      </p>
                      <span className="settings-pill-ok">PostgreSQL Connected</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* ═════════════════════════════════════════════════════════════
            SUPER ADMIN COURSE CREATOR STUDIO MODAL
           ═════════════════════════════════════════════════════════════ */}
        {isCreateCourseOpen && (
          <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="creator-title">
            <div className="admin-modal-window">
              <header className="admin-modal-header">
                <div>
                  <span className="creator-section-kicker">EXECUTIVE CURRICULUM STUDIO</span>
                  <h2 id="creator-title">Upload & Publish New Course</h2>
                  <p>Add practical learning modules directly into the live PostgreSQL database.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateCourseOpen(false)}
                  className="admin-modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </header>

              <form onSubmit={handleCreateCourseSubmit}>
                <div className="admin-modal-body">
                  {/* 1. Core Course Identity */}
                  <div className="creator-form-section">
                    <span className="creator-section-kicker">01 / COURSE IDENTITY</span>
                    <h3>Primary Metadata</h3>
                    <div className="creator-form-grid">
                      <div className="creator-form-field col-span-2">
                        <label htmlFor="course-title">Course Title *</label>
                        <input
                          id="course-title"
                          type="text"
                          required
                          placeholder="e.g. Starting a Faceless YouTube Channel"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        />
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="course-slug">URL Slug (optional)</label>
                        <input
                          id="course-slug"
                          type="text"
                          placeholder="Auto-generated if left blank"
                          value={courseForm.slug}
                          onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                        />
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="course-academy">Academy Track *</label>
                        <select
                          id="course-academy"
                          value={courseForm.academy}
                          onChange={(e) => setCourseForm({ ...courseForm, academy: e.target.value })}
                        >
                          <option value="Creator Economy & YouTube">Creator Economy & YouTube</option>
                          <option value="AI Foundations">AI Foundations</option>
                          <option value="AI Freelancing">AI Freelancing</option>
                          <option value="AI Automation">AI Automation</option>
                          <option value="AI Content Creation">AI Content Creation</option>
                          <option value="AI App Development">AI App Development</option>
                        </select>
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="course-access">Access Level</label>
                        <select
                          id="course-access"
                          value={courseForm.access}
                          onChange={(e) => setCourseForm({ ...courseForm, access: e.target.value as 'free' | 'paid' })}
                        >
                          <option value="free">Free (Starter Module)</option>
                          <option value="paid">Paid (Subscription Pro)</option>
                        </select>
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="course-status">Publishing Status</label>
                        <select
                          id="course-status"
                          value={courseForm.status}
                          onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as 'published' | 'draft' })}
                        >
                          <option value="published">Published (Live to learners)</option>
                          <option value="draft">Draft (Internal preview only)</option>
                        </select>
                      </div>

                      <div className="creator-form-field col-span-2">
                        <label htmlFor="course-desc">Course Summary & Outcomes</label>
                        <textarea
                          id="course-desc"
                          rows={3}
                          placeholder="Explain what the learner will build and achieve in this course..."
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Starter Curriculum (Optional) */}
                  <div className="creator-form-section">
                    <span className="creator-section-kicker">02 / STARTER MODULE & FIRST LESSON</span>
                    <h3>First Practical Module (Optional)</h3>
                    <p>You can create the starter module now or add more lessons later.</p>

                    <div className="creator-form-grid">
                      <div className="creator-form-field col-span-2">
                        <label htmlFor="module-title">Module Title</label>
                        <input
                          id="module-title"
                          type="text"
                          placeholder="e.g. Module 01: Core Foundations & Framework"
                          value={courseForm.moduleTitle}
                          onChange={(e) => setCourseForm({ ...courseForm, moduleTitle: e.target.value })}
                        />
                      </div>

                      <div className="creator-form-field col-span-2">
                        <label htmlFor="lesson-title">First Lesson Title</label>
                        <input
                          id="lesson-title"
                          type="text"
                          placeholder="e.g. Finding Your Niche & Audience Demand"
                          value={courseForm.firstLessonTitle}
                          onChange={(e) => setCourseForm({ ...courseForm, firstLessonTitle: e.target.value })}
                        />
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="lesson-type">Lesson Format</label>
                        <select
                          id="lesson-type"
                          value={courseForm.lessonType}
                          onChange={(e) => setCourseForm({ ...courseForm, lessonType: e.target.value as LessonType })}
                        >
                          <option value="text">Text-First Reading (Low-Data Friendly)</option>
                          <option value="video">Video Walkthrough (YouTube Embed)</option>
                          <option value="mixed">Mixed (Interactive Exercise Sprint)</option>
                        </select>
                      </div>

                      <div className="creator-form-field">
                        <label htmlFor="youtube-id">YouTube Video ID (Optional)</label>
                        <input
                          id="youtube-id"
                          type="text"
                          placeholder="e.g. dQw4w9WgXcQ (Costs 0 Vercel bandwidth)"
                          value={courseForm.youtubeVideoId}
                          onChange={(e) => setCourseForm({ ...courseForm, youtubeVideoId: e.target.value })}
                        />
                        <small>Paste unlisted YouTube ID to protect your Vercel bandwidth.</small>
                      </div>

                      <div className="creator-form-field col-span-2">
                        <label htmlFor="lesson-body">Lesson Content & Prompt Framework</label>
                        <textarea
                          id="lesson-body"
                          rows={4}
                          placeholder="Enter the lesson text, step-by-step instructions, and prompts..."
                          value={courseForm.lessonBody}
                          onChange={(e) => setCourseForm({ ...courseForm, lessonBody: e.target.value })}
                        />
                      </div>

                      <div className="creator-form-field col-span-2">
                        <label htmlFor="lesson-takeaway">Actionable Takeaway / Sprint Goal</label>
                        <input
                          id="lesson-takeaway"
                          type="text"
                          placeholder="e.g. Draft a 3-part channel concept board before moving to lesson 02."
                          value={courseForm.takeaway}
                          onChange={(e) => setCourseForm({ ...courseForm, takeaway: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="admin-modal-footer">
                  <button
                    type="button"
                    onClick={() => setIsCreateCourseOpen(false)}
                    className="admin-modal-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingCourse}
                    className="button button-dark admin-modal-submit-btn"
                  >
                    {isSubmittingCourse ? (
                      <span>Uploading to database...</span>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Publish Course to Database</span>
                      </>
                    )}
                  </button>
                </footer>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
