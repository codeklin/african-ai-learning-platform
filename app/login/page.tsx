import { redirect } from 'next/navigation'
import AuthHeader from '@/components/auth-header'
import LoginForm from './login-form'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Sign in — ituwaAfrica',
}

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <AuthHeader activePage="login" />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap">
          <div className="auth-card">
            {/* Decorative blob */}
            <div className="auth-blob" aria-hidden="true">01</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Welcome back</h1>
              <p className="auth-sub">Sign in to continue learning</p>
              <LoginForm />
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
