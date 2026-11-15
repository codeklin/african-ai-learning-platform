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
    title: 'Write a prompt brief for one task',
    academy: 'AI Foundations',
    description: 'Describe the task, add useful context and specify the format you need.',
    courseSlug: 'prompting-better-work',
    tone: 'coral',
  },
  {
    id: 'practice-2',
    title: 'Outline an original channel idea',
    academy: 'Creator Economy & YouTube',
    description: 'Choose an audience, write a clear channel promise and plan one useful video.',
    courseSlug: 'starting-a-faceless-youtube-channel',
    tone: 'amber',
  },
  {
    id: 'practice-3',
    title: 'Map a task you repeat',
    academy: 'AI Automation',
    description: 'Write down the steps, identify where a tool might help and test the result.',
    courseSlug: 'build-your-first-ai-workflow',
    tone: 'jade',
  },
  {
    id: 'practice-4',
    title: 'Try an AI tool on an everyday task',
    academy: 'AI Foundations',
    description: 'Review what the tool can do, check its response and decide what to change.',
    courseSlug: 'ai-toolkit-practical-start',
    tone: 'lavender',
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
                <p className="app-greeting-sub">PRACTISE WHAT YOU LEARN</p>
                <h1 className="app-greeting-h1">Practice ideas</h1>
                <p className="challenges-subtext">
                  Try one of these activities alongside a free course. These ideas do not track completion or award points.
                </p>
              </div>
            </div>
          </section>

          {/* Suggested exercises */}
          <section className="challenges-section">
            <div className="dash-section-label">SUGGESTED EXERCISES</div>
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
                      <span>View course</span>
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
