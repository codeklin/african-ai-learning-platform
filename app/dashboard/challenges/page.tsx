import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Target,
  Trophy,
  User,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'

interface ChallengeItem {
  id: string
  title: string
  academy: string
  xp: number
  progress: number
  maxProgress: number
  unit: string
  durationLeft: string
  status: 'active' | 'completed'
  tag: string
  courseSlug: string
  tone: string
}

const challengesData: ChallengeItem[] = [
  {
    id: 'ch-1',
    title: 'Write a 3-Step AI Prompt Chain',
    academy: 'AI Foundations',
    xp: 60,
    progress: 2,
    maxProgress: 3,
    unit: 'steps',
    durationLeft: '12h left today',
    status: 'active',
    tag: 'Daily Sprint',
    courseSlug: 'prompting-better-work',
    tone: 'coral',
  },
  {
    id: 'ch-2',
    title: 'Draft a Faceless YouTube Concept',
    academy: 'Creator Economy & YouTube',
    xp: 90,
    progress: 1,
    maxProgress: 2,
    unit: 'lessons',
    durationLeft: '2 days left',
    status: 'active',
    tag: 'Weekly Quest',
    courseSlug: 'starting-a-faceless-youtube-channel',
    tone: 'amber',
  },
  {
    id: 'ch-3',
    title: 'Build a 1-Step Workflow Automation',
    academy: 'AI Automation',
    xp: 120,
    progress: 0,
    maxProgress: 1,
    unit: 'exercise',
    durationLeft: '4 days left',
    status: 'active',
    tag: 'Skill Sprint',
    courseSlug: 'build-your-first-ai-workflow',
    tone: 'jade',
  },
  {
    id: 'ch-4',
    title: 'Complete First AI Toolkit Lesson',
    academy: 'AI Foundations',
    xp: 50,
    progress: 1,
    maxProgress: 1,
    unit: 'lesson',
    durationLeft: 'Completed',
    status: 'completed',
    tag: 'Starter Quest',
    courseSlug: 'ai-toolkit-practical-start',
    tone: 'lavender',
  },
]

const badgesEarned = [
  { name: 'Fast Starter', desc: 'Completed 1st practical lesson', code: '01', date: 'Yesterday' },
  { name: 'Prompt Crafter', desc: 'Engineered 5 structured prompts', code: '02', date: 'Nov 12' },
  { name: 'Streak Habit', desc: 'Maintained 3-day learning habit', code: '03', date: 'Nov 10' },
  { name: 'Maker Spirit', desc: 'Shipped first real project sample', code: '04', date: 'Earn soon' },
]

export default async function ChallengesPage() {
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

  const firstName =
    profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Learner'

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
            <Link
              href="/dashboard/challenges"
              className="app-sidebar-item app-sidebar-item--active"
            >
              <Flame size={18} aria-hidden="true" /> Challenges
            </Link>
            <Link href="/dashboard/profile" className="app-sidebar-item">
              <User size={18} aria-hidden="true" /> Profile
            </Link>
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
        {/* Mobile-only top chrome */}
        <header className="app-topbar" aria-label="App header">
          <Brand />
          <div className="app-topbar-right">
            <button className="app-icon-btn" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <Link href="/dashboard/profile" className="app-avatar" aria-label="Your profile">
              {(profile?.full_name ?? user.email ?? 'L')[0].toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="app-main" id="main-content">
          {/* Header Title & Streak Banner */}
          <section className="challenges-hero">
            <div className="challenges-title-row">
              <div>
                <p className="app-greeting-sub">SKILL PRACTICE & REWARDS</p>
                <h1 className="app-greeting-h1">Active Challenges</h1>
                <p className="challenges-subtext">
                  Complete focused micro-challenges to lock in your skills and unlock creator perks.
                </p>
              </div>
              <div className="challenges-hero-badge">
                <div className="challenges-xp-total">
                  <Zap size={20} className="challenges-zap-icon" />
                  <div>
                    <span className="xp-number">320 XP</span>
                    <span className="xp-label">Level 2 Maker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Habit Strip */}
            <div className="daily-streak-card">
              <div className="daily-streak-info">
                <div className="streak-flame-circle">
                  <Flame size={24} />
                </div>
                <div>
                  <h3>4-Day Learning Streak!</h3>
                  <p>You’re 1 sprint away from completing this week’s Creator Sprint.</p>
                </div>
              </div>
              <div className="daily-streak-progress-box">
                <div className="daily-streak-bar">
                  <span style={{ width: '75%' }} />
                </div>
                <div className="daily-streak-days">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <span key={i} className={`streak-day-dot ${i < 4 ? 'done' : ''}`}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Active Challenges Grid */}
          <section className="challenges-section">
            <div className="dash-section-label">SPRINTS IN PROGRESS</div>
            <div className="challenges-grid">
              {challengesData.map((ch) => {
                const percent = Math.min(100, Math.round((ch.progress / ch.maxProgress) * 100))
                const isDone = ch.status === 'completed'

                return (
                  <article key={ch.id} className={`challenge-card challenge-tone--${ch.tone}`}>
                    <div className="challenge-card-top">
                      <span className="challenge-tag">{ch.tag}</span>
                      <span className="challenge-xp-badge">+{ch.xp} XP</span>
                    </div>

                    <h2 className="challenge-card-title">{ch.title}</h2>
                    <p className="challenge-card-academy">{ch.academy}</p>

                    <div className="challenge-progress-wrap">
                      <div className="challenge-progress-header">
                        <span>
                          {ch.progress} of {ch.maxProgress} {ch.unit}
                        </span>
                        <span>{ch.durationLeft}</span>
                      </div>
                      <div className="challenge-progress-bar">
                        <span style={{ width: `${percent}%` }} />
                      </div>
                    </div>

                    <div className="challenge-card-footer">
                      {isDone ? (
                        <div className="challenge-done-pill">
                          <CheckCircle2 size={16} /> Completed
                        </div>
                      ) : (
                        <Link href={`/courses/${ch.courseSlug}`} className="challenge-action-btn">
                          <span>Continue sprint</span>
                          <ArrowRight size={15} />
                        </Link>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          {/* Earned Badges Showcase */}
          <section className="badges-section">
            <div className="dash-section-label">YOUR BADGES & ACHIEVEMENTS</div>
            <div className="badges-grid">
              {badgesEarned.map((b) => (
                <div key={b.name} className="badge-item-card">
                  <div className="badge-index-box">{b.code}</div>
                  <div className="badge-details">
                    <h4>{b.name}</h4>
                    <p>{b.desc}</p>
                    <small>{b.date}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Fixed bottom navigation for mobile */}
      <AppBottomNav active="challenges" />
    </div>
  )
}
