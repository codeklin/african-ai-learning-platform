'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordForm() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [sent, setSent]       = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    // Always show the success state : avoids leaking whether the email exists
    if (error && error.message !== 'For security purposes, you can only request this once every 60 seconds') {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <Mail size={36} className="auth-success-icon" aria-hidden="true" />
        <h2>Check your inbox</h2>
        <p>
          If <strong>{email}</strong> is linked to an account, you&apos;ll receive a
          password reset link shortly. Check your spam folder if it doesn&apos;t arrive.
        </p>
        <Link href="/login" className="button button-dark auth-submit">
          Back to sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Password reset form">
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={error ? 'auth-error' : 'sr-only'}
      >
        {error}
      </div>

      <div className="auth-field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={loading}
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        className="button button-dark auth-submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className="auth-spinner" aria-hidden="true" /> Sending link…</>
        ) : (
          <>Send reset link <ArrowRight size={16} aria-hidden="true" /></>
        )}
      </button>

      <p className="auth-switch">
        <Link href="/login" className="auth-back-link">
          <ArrowLeft size={14} aria-hidden="true" /> Back to sign in
        </Link>
      </p>
    </form>
  )
}
