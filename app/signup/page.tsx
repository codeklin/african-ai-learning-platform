import { redirect } from 'next/navigation'
import AuthHeader from '@/components/auth-header'
import SignUpForm from './signup-form'
import { createClient } from '@/lib/supabase/server'
import { getSafeRedirectPath } from '@/lib/auth-redirect'

export const metadata = {
  title: 'Create account — ituwaAfrica',
}

export default async function SignUpPage({
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
      <AuthHeader activePage="signup" redirectTo={redirectTo} />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-blob" aria-hidden="true">02</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Create your account</h1>
              <p className="auth-sub">Create a free account to access course lessons and track your learning.</p>
              <SignUpForm redirectTo={redirectTo} />
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
