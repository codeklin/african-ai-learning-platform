import AuthHeader from '@/components/auth-header'
import ResetPasswordForm from './reset-password-form'

export const metadata = {
  title: 'Set new password : ituwaAfrica',
}

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeader activePage="reset" />
      <main className="auth-main" id="main-content">
        <div className="auth-card-wrap auth-card-wrap--narrow">
          <div className="auth-card">
            <div className="auth-blob auth-blob--sm" aria-hidden="true">✓</div>

            <div className="auth-card-body">
              <h1 className="auth-heading">Set a new password</h1>
              <p className="auth-sub">Choose something strong that you haven&apos;t used before.</p>
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
