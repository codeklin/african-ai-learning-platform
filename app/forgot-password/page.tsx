import AuthHeader from '@/components/auth-header'
import ForgotPasswordForm from './forgot-password-form'

export const metadata = {
  title: 'Reset your password — ituwaAfrica',
}

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader activePage="forgot" />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap auth-card-wrap--narrow">
          <div className="auth-card">
            <div className="auth-blob auth-blob--sm" aria-hidden="true">?</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Forgot your password?</h1>
              <p className="auth-sub">
                Enter your email address and we&apos;ll send you a link to reset it.
              </p>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
