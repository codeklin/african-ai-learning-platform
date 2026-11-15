'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import PasswordField from '@/components/password-field'

export default function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword]         = useState('')
  const [confirmPassword, setConfirmPw] = useState('')
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [done, setDone]                 = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('We could not update your password. Please try again or request a new reset link.')
      setLoading(false)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/dashboard'), 2500)
  }

  if (done) {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <CheckCircle2 size={36} className="auth-success-icon" aria-hidden="true" />
        <h2>Password updated</h2>
        <p>Your password has been changed. Taking you to your dashboard…</p>
        <Link href="/dashboard" className="button button-dark auth-submit">
          Go to dashboard <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Set new password form">
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={error ? 'auth-error' : 'sr-only'}
      >
        {error}
      </div>

      <PasswordField
        id="newPassword"
        label="New password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        disabled={loading}
        hint="At least 8 characters"
        showStrength
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPw}
        autoComplete="new-password"
        disabled={loading}
      />

      <button
        type="submit"
        className="button button-dark auth-submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className="auth-spinner" aria-hidden="true" /> Updating…</>
        ) : (
          <>Update password <ArrowRight size={16} aria-hidden="true" /></>
        )}
      </button>
    </form>
  )
}
