'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  UserCheck,
  Users,
  X,
  Eye,
  Sliders,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react'
import Brand from '@/components/brand'
import { signOut } from '@/app/actions/auth'
import {
  updateCourseStatusAction,
  createCourseAction,
  grantPaidCourseEnrollmentAction,
  getCourseLessonsAction,
  updateLessonContentAction,
  type AdminLessonData,
} from '@/app/actions/admin'
import type { Profile, Course, CourseStatus, LessonType } from '@/lib/database.types'
import { PAID_COURSE_PRODUCTS } from '@/lib/course-products'

interface EnrollmentItem {
  id: string
  enrolled_at: string
  user_id: string
  course_id: string
  payment_verified_at?: string | null
  profiles?: Partial<Profile> | null
  courses?: (Partial<Course> & { academy?: string | null }) | null
}

type AdminCourse = Pick<
  Course,
  'id' | 'title' | 'slug' | 'description' | 'academy' | 'status' | 'access' | 'created_at'
>

interface AdminDashboardProps {
  userCount: number
  enrollmentCount: number
  courseCount: number
  users: Array<Partial<Profile> & { id: string }>
  enrollments: EnrollmentItem[]
  courses: AdminCourse[]
  adminUserEmail: string
  initialTab?: string
  paidUserIds?: Set<string>
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
  paidUserIds = new Set(),
}: AdminDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>(initialTab as TabType)
  const [users, setUsers] = useState(initialUsers)
  const [courses, setCourses] = useState(initialCourses)
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'learner' | 'admin'>('all')
  const [searchCourseQuery, setSearchCourseQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [manualEnrollmentEmail, setManualEnrollmentEmail] = useState('')
  const [manualEnrollmentCourse, setManualEnrollmentCourse] = useState(PAID_COURSE_PRODUCTS[0].slug)
  const [isGrantingEnrollment, setIsGrantingEnrollment] = useState(false)
  const [generatedAccessCode, setGeneratedAccessCode] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

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

  // Lesson Content Editor State
  const [isLessonEditorOpen, setIsLessonEditorOpen] = useState(false)
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState<AdminCourse | null>(null)
  const [courseLessons, setCourseLessons] = useState<AdminLessonData[]>([])
  const [isLoadingLessons, setIsLoadingLessons] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<AdminLessonData | null>(null)
  const [isSavingLesson, setIsSavingLesson] = useState(false)
  const [lessonEditForm, setLessonEditForm] = useState({
    title: '',
    body: '',
    takeaway: '',
    youtubeVideoId: '',
    accessLevel: 'free' as 'free' | 'paid',
    readTimeMin: 4,
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

  const handleManualEnrollment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGrantingEnrollment(true)
    setGeneratedAccessCode(null)
    try {
      const result = await grantPaidCourseEnrollmentAction({
        email: manualEnrollmentEmail,
        courseSlug: manualEnrollmentCourse,
      })

      if (!result.success) {
        setNotification({ message: result.error ?? 'Unable to record the enrollment.', type: 'error' })
      } else {
        setNotification({
          message: result.alreadyEnrolled
            ? 'This learner already has a verified enrollment.'
            : 'Enrollment granted. Send the access code below to the learner.',
          type: 'success',
        })
        if (!result.alreadyEnrolled && result.accessCode) {
          setGeneratedAccessCode(result.accessCode)
        }
        setManualEnrollmentEmail('')
        router.refresh()
      }
    } catch (error: unknown) {
      setNotification({
        message: error instanceof Error ? error.message : 'Unable to record the enrollment.',
        type: 'error',
      })
    } finally {
      setIsGrantingEnrollment(false)
      setTimeout(() => setNotification(null), 8000)
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

  const handleOpenLessonEditor = async (course: AdminCourse) => {
    setSelectedCourseForLessons(course)
    setIsLessonEditorOpen(true)
    setIsLoadingLessons(true)
    setSelectedLesson(null)

    try {
      const res = await getCourseLessonsAction(course.id)
      if (res.success && res.lessons) {
        setCourseLessons(res.lessons)
        if (res.lessons.length > 0) {
          handleSelectLessonForEdit(res.lessons[0])
        }
      } else {
        setNotification({
          message: res.error || 'Failed to fetch lessons for this course',
          type: 'error',
        })
      }
    } catch (err: unknown) {
      setNotification({
        message: err instanceof Error ? err.message : 'Error loading lessons',
        type: 'error',
      })
    } finally {
      setIsLoadingLessons(false)
    }
  }

  const handleSelectLessonForEdit = (lesson: AdminLessonData) => {
    setSelectedLesson(lesson)
    setLessonEditForm({
      title: lesson.title || '',
      body: lesson.body || '',
      takeaway: lesson.takeaway || '',
      youtubeVideoId: lesson.youtube_video_id || '',
      accessLevel: (lesson.access_level as 'free' | 'paid') || 'free',
      readTimeMin: lesson.read_time_min || 4,
    })
  }

  const handleSaveLessonContent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCourseForLessons || !selectedLesson) return

    setIsSavingLesson(true)
    try {
      const res = await updateLessonContentAction({
        lessonId: selectedLesson.id,
        courseId: selectedCourseForLessons.id,
        courseSlug: selectedCourseForLessons.slug,
        lessonSlug: selectedLesson.slug,
        title: lessonEditForm.title,
        body: lessonEditForm.body,
        takeaway: lessonEditForm.takeaway,
        youtubeVideoId: lessonEditForm.youtubeVideoId,
        accessLevel: lessonEditForm.accessLevel,
        readTimeMin: Number(lessonEditForm.readTimeMin) || 4,
      })

      if (res.success) {
        setNotification({
          message: `Lesson "${lessonEditForm.title}" updated successfully!`,
          type: 'success',
        })
        // Update local lesson state
        setCourseLessons((prev) =>
          prev.map((l) =>
            l.id === selectedLesson.id
              ? {
                  ...l,
                  title: lessonEditForm.title,
                  body: lessonEditForm.body,
                  takeaway: lessonEditForm.takeaway,
                  youtube_video_id: lessonEditForm.youtubeVideoId || null,
                  access_level: lessonEditForm.accessLevel,
                  read_time_min: Number(lessonEditForm.readTimeMin) || 4,
                }
              : l
          )
        )
      } else {
        setNotification({
          message: res.error || 'Failed to update lesson content',
          type: 'error',
        })
      }
    } catch (err: unknown) {
      setNotification({
        message: err instanceof Error ? err.message : 'Error updating lesson',
        type: 'error',
      })
    } finally {
      setIsSavingLesson(false)
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
      <aside className="dash-sidebar" aria-label="Admin navigation">
        <div className="dash-sidebar-top">
          <div className="admin-brand-row">
            <Brand />
            <span className="dash-role-badge super-admin-badge">
              <ShieldCheck size={14} /> ADMIN
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
              <span>User accounts</span>
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
              <span className="admin-identity-role">ADMINISTRATOR</span>
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
          {/* Administrator identity */}
          <section className="super-admin-executive-strip">
            <div className="executive-strip-left">
              <div className="executive-crown-badge">
                <ShieldCheck size={20} />
                <span>ADMINISTRATOR</span>
              </div>
              <div className="executive-meta">
                <b>Admin workspace</b>
                <span>Signed-in account · Role checked on the server</span>
              </div>
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
              <h1 className="dash-greeting">Platform administration</h1>
              <p className="admin-header-subtitle">
                Manage learner accounts, enrollments, and course publishing.
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
              User accounts ({users.length})
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
              Course inventory ({courses.length})
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
              {/* Current database totals and reporting availability */}
              <section className="admin-stats-grid">
                <div className="admin-metric-card metric-coral">
                  <div className="metric-card-top">
                    <span className="metric-label">REGISTERED ACCOUNTS</span>
                    <div className="metric-icon-box">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">{userCount}</span>
                  </div>
                  <p className="metric-footnote">User profiles currently in the database</p>
                </div>

                <div className="admin-metric-card metric-amber">
                  <div className="metric-card-top">
                    <span className="metric-label">ENROLLMENTS</span>
                    <div className="metric-icon-box">
                      <GraduationCap size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">{enrollmentCount}</span>
                  </div>
                  <p className="metric-footnote">Course registrations in the database</p>
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
                  </div>
                  <p className="metric-footnote">Courses marked published in the database</p>
                </div>

                <div className="admin-metric-card metric-espresso">
                  <div className="metric-card-top">
                    <span className="metric-label">COMPLETION REPORTING</span>
                    <div className="metric-icon-box">
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <div className="metric-number-row">
                    <span className="metric-value">Not tracked</span>
                  </div>
                  <p className="metric-footnote">Course completion rates are not calculated in this view.</p>
                </div>
              </section>

              <section className="admin-panel-card">
                <h2 className="panel-title">Learner announcements</h2>
                <p className="admin-empty-full">
                  The admin dashboard does not currently send announcements to learners.
                </p>
              </section>

              {/* Split Content: Recent Enrollments & Quick User Feed */}
              <div className="admin-split-grid">
                {/* Recent Enrollments */}
                <section className="admin-panel-card">
                  <div className="panel-header-row">
                    <div>
                      <span className="panel-kicker">RECENT RECORDS</span>
                      <h2 className="panel-title">Recent Enrollments</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('enrollments')}
                      className="panel-view-all"
                    >
                      Review records ({enrollments.length}) →
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
                                    {e.profiles?.email ?? ':'}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="table-course-pill">
                                        {e.courses?.title ?? 'Course information unavailable'}
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

                {/* Academy analytics are not currently available */}
                <section className="admin-panel-card">
                  <div className="panel-header-row">
                    <div>
                      <span className="panel-kicker">ACADEMY REPORTING</span>
                      <h2 className="panel-title">Enrollment by academy</h2>
                    </div>
                  </div>
                  <p className="admin-empty-full">
                    Academy-level enrollment analytics are not available in this dashboard.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              TAB 2: USER ACCOUNTS AND ROLE MANAGEMENT
             ═══════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">ACCOUNT MANAGEMENT</span>
                    <h2 className="panel-title">Learners & Roles</h2>
                  </div>
                  <div className="panel-user-count">
                    Showing {filteredUsers.length} of {users.length} loaded accounts
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
                    {(['all', 'learner', 'admin'] as const).map((r) => (
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
                        <th>Access</th>
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
                              <b className="table-user-name">{u.full_name ?? ':'}</b>
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
                            <span className={paidUserIds.has(u.id) ? 'user-access-badge user-access-badge--paid' : 'user-access-badge user-access-badge--free'}>
                              {paidUserIds.has(u.id) ? 'Paid' : 'Free'}
                            </span>
                          </td>
                          <td>
                            <span className="table-date">
                              {u.created_at
                                ? new Date(u.created_at).toLocaleDateString('en-GB')
                                : ':'}
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
                        <span className={paidUserIds.has(u.id) ? 'user-access-badge user-access-badge--paid' : 'user-access-badge user-access-badge--free'}>
                          {paidUserIds.has(u.id) ? 'Paid' : 'Free'}
                        </span>
                      </div>
                      <div className="mobile-user-card-foot">
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
                    <span className="panel-kicker">MANUAL BANK TRANSFER</span>
                    <h2 className="panel-title">Record a verified payment</h2>
                  </div>
                </div>
                <p className="admin-manual-enrollment-note">
                  Confirm the bank credit and match the learner&apos;s WhatsApp reference before granting access.
                  This records the verifying administrator and timestamp.
                </p>
                <form className="admin-manual-enrollment-form" onSubmit={handleManualEnrollment}>
                  <label>
                    Learner account email
                    <input
                      type="email"
                      required
                      value={manualEnrollmentEmail}
                      onChange={(event) => setManualEnrollmentEmail(event.target.value)}
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    Paid course
                    <select
                      value={manualEnrollmentCourse}
                      onChange={(event) => setManualEnrollmentCourse(event.target.value)}
                    >
                      {PAID_COURSE_PRODUCTS.map((course) => (
                        <option key={course.slug} value={course.slug}>{course.title}</option>
                      ))}
                    </select>
                  </label>
                  <button type="submit" className="button button-dark" disabled={isGrantingEnrollment}>
                    {isGrantingEnrollment ? 'Recording…' : 'Confirm payment and enroll'}
                  </button>
                </form>

                {generatedAccessCode && (
                  <div className="access-code-result">
                    <span className="access-code-label">ACCESS CODE : send this to the learner</span>
                    <div className="access-code-box">
                      <code className="access-code-value">{generatedAccessCode}</code>
                      <button
                        type="button"
                        className="access-code-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedAccessCode)
                          setCopiedCode(true)
                          setTimeout(() => setCopiedCode(false), 2000)
                        }}
                      >
                        {copiedCode ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                        {copiedCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="access-code-note">Valid for 7 days. The learner enters this on the course page to unlock access.</p>
                  </div>
                )}
              </section>

              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">COURSE PROGRESSION</span>
                    <h2 className="panel-title">Recent enrollment records</h2>
                  </div>
                  <span className="panel-user-count">
                    {enrollments.length} records shown
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
                                  {e.profiles?.email ?? ':'}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <b className="table-course-title">
                              {e.courses?.title ?? 'Course information unavailable'}
                            </b>
                          </td>
                          <td>
                            <span className="table-academy-tag">
                              {e.courses?.academy ?? 'Academy not set'}
                            </span>
                          </td>
                          <td>
                            <span className="table-date">
                              {new Date(e.enrolled_at).toLocaleDateString('en-GB')}
                            </span>
                          </td>
                          <td>
                            <span className={`enrollment-status-badge ${e.courses?.access === 'paid' && !e.payment_verified_at ? 'status-review' : 'status-active'}`}>
                              {e.courses?.access === 'paid'
                                ? e.payment_verified_at ? 'Payment verified' : 'Review required'
                                : 'Free enrollment'}
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
              TAB 4: COURSE INVENTORY AND PUBLISHING
             ═══════════════════════════════════════════════ */}
          {activeTab === 'courses' && (
            <div className="admin-tab-content">
              <section className="admin-panel-card">
                <div className="panel-header-row">
                  <div>
                    <span className="panel-kicker">COURSE MANAGEMENT</span>
                    <h2 className="panel-title">Courses Inventory & Publishing</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setIsCreateCourseOpen(true)}
                      className="button button-dark"
                      style={{ minHeight: 38, padding: '0 16px', fontSize: 13 }}
                    >
                      <Plus size={15} /> Create course
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
                          {c.academy ?? 'Academy not set'}
                        </span>
                        <span className={`admin-status-pill ${c.status === 'published' ? 'published' : 'draft'}`}>
                          {c.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="admin-course-title">{c.title}</h3>
                      <p className="admin-course-desc">
                        {c.description ?? 'No course description provided.'}
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
                          <button
                            type="button"
                            onClick={() => handleOpenLessonEditor(c)}
                            className="admin-edit-lessons-btn"
                          >
                            <BookOpen size={13} />
                            <span>Edit Lessons</span>
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
                    <span className="panel-kicker">ADMINISTRATION</span>
                    <h2 className="panel-title">Admin operations</h2>
                  </div>
                </div>

                <div className="settings-grid">
                  <div className="settings-item-card">
                    <div className="settings-item-icon">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h4>Administrator access</h4>
                      <p>
                        Admin pages and actions check the signed-in account&apos;s assigned administrator role on the server.
                      </p>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-amber">
                      <Globe size={22} />
                    </div>
                    <div>
                      <h4>Course publishing</h4>
                      <p>
                        Publish or unpublish courses from the inventory. Published courses appear in the public catalog.
                      </p>
                    </div>
                  </div>

                  <div className="settings-item-card">
                    <div className="settings-item-icon icon-jade">
                      <Activity size={22} />
                    </div>
                    <div>
                      <h4>Platform records</h4>
                      <p>
                        Learner accounts, enrollments, and course records shown here are loaded from Supabase.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* ═════════════════════════════════════════════════════════════
            COURSE CREATION
           ═════════════════════════════════════════════════════════════ */}
        {isCreateCourseOpen && (
          <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="creator-title">
            <div className="admin-modal-window">
              <header className="admin-modal-header">
                <div>
                  <span className="creator-section-kicker">COURSE MANAGEMENT</span>
                  <h2 id="creator-title">Create a course</h2>
                  <p>Add course details and an optional starter module and lesson.</p>
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
                          <option value="AI Content Marketing">AI Content Marketing for Business</option>
                          <option value="AI App Development">AI App Development for Business</option>
                          <option value="AI Video Creation">AI Video Creation</option>
                          <option value="AI Graphic Design">AI Graphic Design</option>
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

        {/* Lesson Content Editor Modal */}
        {isLessonEditorOpen && selectedCourseForLessons && (
          <div className="admin-modal-overlay" onClick={() => setIsLessonEditorOpen(false)}>
            <div
              className="admin-modal-card admin-lesson-editor-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="admin-modal-header">
                <div>
                  <span className="admin-modal-kicker">CONTENT MANAGER</span>
                  <h3 className="admin-modal-title">
                    {selectedCourseForLessons.title}
                  </h3>
                  <p className="admin-modal-subtitle">
                    Select a lesson on the left to edit its body, prompt instructions, and takeaway.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLessonEditorOpen(false)}
                  className="admin-modal-close"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="admin-lesson-editor-body">
                {/* Left side: List of lessons */}
                <div className="admin-lesson-editor-sidebar">
                  <div className="admin-lesson-sidebar-hdr">
                    <span>COURSE LESSONS ({courseLessons.length})</span>
                  </div>
                  {isLoadingLessons ? (
                    <div className="admin-lesson-loading">Loading lessons...</div>
                  ) : courseLessons.length === 0 ? (
                    <div className="admin-lesson-empty">No lessons found for this course.</div>
                  ) : (
                    <div className="admin-lesson-list">
                      {courseLessons.map((l) => {
                        const isSelected = selectedLesson?.id === l.id
                        return (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => handleSelectLessonForEdit(l)}
                            className={`admin-lesson-picker-item ${isSelected ? 'active' : ''}`}
                          >
                            <span className="admin-lesson-picker-num">
                              {String(l.position).padStart(2, '0')}
                            </span>
                            <div className="admin-lesson-picker-meta">
                              <span className="admin-lesson-picker-title">{l.title}</span>
                              <span className="admin-lesson-picker-sub">
                                slug: {l.slug} · {l.access_level.toUpperCase()}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Right side: Form to edit selected lesson */}
                <div className="admin-lesson-editor-form-col">
                  {selectedLesson ? (
                    <form onSubmit={handleSaveLessonContent} className="admin-lesson-form">
                      <div className="admin-lesson-form-grid">
                        <div className="admin-form-group">
                          <label className="admin-form-label">Lesson Title</label>
                          <input
                            type="text"
                            required
                            value={lessonEditForm.title}
                            onChange={(e) =>
                              setLessonEditForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                            className="admin-form-input"
                          />
                        </div>

                        <div className="admin-form-row-2">
                          <div className="admin-form-group">
                            <label className="admin-form-label">Access Level</label>
                            <select
                              value={lessonEditForm.accessLevel}
                              onChange={(e) =>
                                setLessonEditForm((prev) => ({
                                  ...prev,
                                  accessLevel: e.target.value as 'free' | 'paid',
                                }))
                              }
                              className="admin-form-input"
                            >
                              <option value="free">Free Preview</option>
                              <option value="paid">Paid Only</option>
                            </select>
                          </div>
                          <div className="admin-form-group">
                            <label className="admin-form-label">Read Time (Minutes)</label>
                            <input
                              type="number"
                              min={1}
                              max={60}
                              value={lessonEditForm.readTimeMin}
                              onChange={(e) =>
                                setLessonEditForm((prev) => ({
                                  ...prev,
                                  readTimeMin: Number(e.target.value),
                                }))
                              }
                              className="admin-form-input"
                            />
                          </div>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">YouTube Video ID (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Xlbe16Kw49k"
                            value={lessonEditForm.youtubeVideoId}
                            onChange={(e) =>
                              setLessonEditForm((prev) => ({
                                ...prev,
                                youtubeVideoId: e.target.value,
                              }))
                            }
                            className="admin-form-input"
                          />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">
                            Lesson Body (Paste ChatGPT Content Here)
                          </label>
                          <span className="admin-form-hint">
                            Em dashes (—) will automatically be converted to colons on save.
                          </span>
                          <textarea
                            rows={12}
                            required
                            value={lessonEditForm.body}
                            onChange={(e) =>
                              setLessonEditForm((prev) => ({ ...prev, body: e.target.value }))
                            }
                            placeholder="Paste the step-by-step simplified lesson content here..."
                            className="admin-form-textarea"
                          />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Key Takeaway Summary</label>
                          <textarea
                            rows={3}
                            value={lessonEditForm.takeaway}
                            onChange={(e) =>
                              setLessonEditForm((prev) => ({
                                ...prev,
                                takeaway: e.target.value,
                              }))
                            }
                            placeholder="One concise, memorable sentence summarizing the core lesson rule."
                            className="admin-form-textarea"
                          />
                        </div>
                      </div>

                      <div className="admin-lesson-form-actions">
                        <Link
                          href={`/learn/${selectedCourseForLessons.slug}/${selectedLesson.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="table-action-btn"
                        >
                          <Eye size={14} />
                          <span>View Live Lesson</span>
                        </Link>
                        <button
                          type="submit"
                          disabled={isSavingLesson}
                          className="button button-dark"
                        >
                          {isSavingLesson ? (
                            <span>Saving Changes...</span>
                          ) : (
                            <>
                              <Check size={16} />
                              <span>Save Lesson Content</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="admin-lesson-no-selection">
                      <p>Select a lesson from the list on the left to start editing.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
