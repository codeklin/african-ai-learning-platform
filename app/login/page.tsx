import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import AuthHeader from '@/components/auth-header'
import LoginForm from './login-form'
import { createClient } from '@/lib/supabase/server'
import { getSafeRedirectPath } from '@/lib/auth-redirect'

export const metadata = {
  title: 'Sign in : ituwaAfrica',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>
}) {
  const query = await searchParams
  const requestedNext = Array.isArray(query.next) ? query.next[0] : query.next
  const redirectTo = getSafeRedirectPath(requestedNext)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(redirectTo)
  }

  return (
    <>
      <AuthHeader activePage="login" redirectTo={redirectTo} />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap">
          <div className="auth-card">
            {/* Decorative blob */}
            <div className="auth-blob" aria-hidden="true">01</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Welcome back</h1>
              <p className="auth-sub">Sign in to continue learning</p>
              <Suspense fallback={<div className="auth-spinner" />}>
                <LoginForm redirectTo={redirectTo} />
              </Suspense>
            </div>
          </div>

          <p className="auth-alt-note">
            Just exploring?{' '}
            <a href="/courses">Browse free course outlines</a>. Create an account to open lessons.
          </p>
        </div>
      </main>
    </>
  )
}
