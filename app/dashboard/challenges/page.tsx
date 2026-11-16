import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Bell,
  BookOpen,
  LayoutDashboard,
  LogOut,
  PenLine,
  User,
  ArrowRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import Brand from '@/components/brand'
import AppBottomNav from '@/components/app-bottom-nav'

interface PracticeIdea {
  id: string
  title: string
  academy: string
  description: string
  courseSlug: string
  tone: string
}

const practiceIdeas: PracticeIdea[] = [
  {
    id: 'practice-1',
    title: 'Write an AI prompt for one task',
    academy: 'AI Foundations',
    description: 'Choose a real task. Tell AI what you need, add key details and ask for a clear format.',
    courseSlug: 'ai-toolkit-practical-start',
    tone: 'coral',
  },
  {
    id: 'practice-2',
    title: 'Plan an original YouTube channel',
    academy: 'Creator Economy & YouTube',
    description: 'Use AI to explore ideas. Choose who the channel is for and outline one original video.',
    courseSlug: 'youtube-monetization',
    tone: 'amber',
  },
  {
    id: 'practice-1',
    title: 'Use AI on an everyday task',
    academy: 'AI Foundations',
    description: 'Ask AI for a first draft. Check it for mistakes, then improve it yourself.',
    courseSlug: 'ai-toolkit-practical-start',
    tone: 'lavender',
  },
  {
    id: 'practice-3',
    title: 'Plan a useful business campaign',
    academy: 'AI Content Marketing for Business',
    description: 'Choose a business, identify one customer need and outline a useful campaign idea with a clear goal.',
    courseSlug: 'ai-content-marketing-for-business',
    tone: 'peach',
  },
  {
    id: 'practice-4',
    title: 'Define a small app idea',
    academy: 'AI App Development for Business',
    description: 'Name a user, a problem they face and one outcome a simple app prototype could help them achieve.',
    courseSlug: 'build-a-helpful-ai-app',
    tone: 'blue',
  },
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
              <PenLine size={18} aria-hidden="true" /> Practice
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
          {/* Practice ideas */}
          <section className="challenges-hero">
            <div className="challenges-title-row">
              <div>
                <p className="app-greeting-sub">PICK ONE TASK TO TRY</p>
                <h1 className="app-greeting-h1">Practice a skill</h1>
                <p className="challenges-subtext">
                  Choose an exercise, then open its course for a lesson to help you do it. This page does not save completed exercises.
                </p>
              </div>
            </div>
          </section>

          {/* Suggested exercises */}
          <section className="challenges-section">
            <div className="dash-section-label">CHOOSE AN EXERCISE</div>
            <div className="challenges-grid">
              {practiceIdeas.map((idea) => (
                <article key={idea.id} className={`challenge-card challenge-tone--${idea.tone}`}>
                  <div className="challenge-card-top">
                    <span className="challenge-tag">PRACTICE IDEA</span>
                  </div>
                  <h2 className="challenge-card-title">{idea.title}</h2>
                  <p className="challenge-card-academy">{idea.academy}</p>
                  <p className="challenges-subtext">{idea.description}</p>
                  <div className="challenge-card-footer">
                    <Link href={`/courses/${idea.courseSlug}`} className="challenge-action-btn">
                      <span>Open the course</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom allowance spacer so bottom nav never overshadows details */}
          <div className="app-bottom-spacer" aria-hidden="true" />
        </main>
      </div>

      {/* Fixed bottom navigation for mobile */}
      <AppBottomNav active="challenges" />
    </div>
  )
}
