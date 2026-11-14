import { redirect } from 'next/navigation'
import AuthHeader from '@/components/auth-header'
import SignUpForm from './signup-form'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Create account — ituwaAfrica',
}

export default async function SignUpPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <AuthHeader activePage="signup" />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-blob" aria-hidden="true">02</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Create your account</h1>
              <p className="auth-sub">Start learning practical AI skills for free</p>
              <SignUpForm />
            </div>
          </div>

          <p className="auth-alt-note">
            Just exploring?{' '}
            <a href="/courses">Browse free courses</a> — no account needed.
          </p>
        </div>
      </main>
    </>
  )
}
