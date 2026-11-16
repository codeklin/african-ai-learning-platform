import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Brand from '@/components/brand'

/**
 * Lightweight top nav shown on all auth pages (login, signup, forgot, reset).
 * Mirrors the public site header style without the full mobile hamburger menu.
 */
export default function AuthHeader({
  activePage,
  redirectTo,
}: {
  activePage: 'login' | 'signup' | 'forgot' | 'reset'
  redirectTo?: string
}) {
  const loginHref = redirectTo ? `/login?next=${encodeURIComponent(redirectTo)}` : '/login'
  const signupHref = redirectTo ? `/signup?next=${encodeURIComponent(redirectTo)}` : '/signup'

  return (
    <header className="auth-header" role="banner">
      <div className="auth-header-inner">
        <Brand />
        <nav className="auth-header-nav" aria-label="Site navigation">
          <Link href="/courses">Explore courses</Link>
          <Link href="/#academies">Academies</Link>
          <Link href="/#how-it-works">How it works</Link>
        </nav>
        <div className="auth-header-actions">
          {activePage !== 'login' && (
            <Link href={loginHref} className="auth-header-link">
              Sign in
            </Link>
          )}
          {activePage !== 'signup' && (
            <Link href={signupHref} className="button button-dark auth-header-cta">
              Get started <ArrowRight size={14} />
            </Link>
          )}
          {activePage === 'signup' && (
            <Link href={loginHref} className="button button-dark auth-header-cta">
              Sign in <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
