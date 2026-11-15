'use client'

import Link from 'next/link'
import { BookOpen, LayoutDashboard, PenLine, User } from 'lucide-react'

type NavItem = 'dashboard' | 'courses' | 'challenges' | 'profile'

const items: { id: NavItem; label: string; href: string; Icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard',  label: 'Home',       href: '/dashboard',            Icon: LayoutDashboard },
  { id: 'courses',    label: 'Courses',    href: '/courses',               Icon: BookOpen        },
  { id: 'challenges', label: 'Practice',   href: '/dashboard/challenges',  Icon: PenLine         },
  { id: 'profile',    label: 'Profile',    href: '/dashboard/profile',     Icon: User            },
]

/**
 * Fixed bottom navigation bar — only visible on mobile (≤768px).
 * Mirrors the standard Play Store / App Store app chrome pattern.
 */
export default function AppBottomNav({ active }: { active: NavItem }) {
  return (
    <nav className="app-bottom-nav" aria-label="Main navigation">
      {items.map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          href={href}
          className={`app-bottom-nav-item${active === id ? ' app-bottom-nav-item--active' : ''}`}
          aria-label={label}
          aria-current={active === id ? 'page' : undefined}
        >
          <span className="app-bottom-nav-icon" aria-hidden="true">
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            {active === id && <span className="app-bottom-nav-dot" aria-hidden="true" />}
          </span>
          <span className="app-bottom-nav-label">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
