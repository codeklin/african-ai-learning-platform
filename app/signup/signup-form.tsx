'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import PasswordField from '@/components/password-field'

export default function SignUpForm() {
  const [fullName, setFullName]             = useState('')
  const [email, setEmail]                   = useState('')
  const [password, setPassword]             = useState('')
  const [confirmPassword, setConfirmPw]     = useState('')
  const [loading, setLoading]               = useState(false)
  const [error, setError]                   = useState<string | null>(null)
  const [success, setSuccess]               = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!fullName.trim()) {
      setError('Please enter your full name.')
      return
    }
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <CheckCircle2 size={36} className="auth-success-icon" aria-hidden="true" />
        <h2>Check your email</h2>
        <p>
          We sent a confirmation link to <strong>{email}</strong>.
          Click it to activate your account and start learning.
        </p>
        <Link href="/login" className="button button-dark auth-submit">
          Back to sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Create account form">
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={error ? 'auth-error' : 'sr-only'}
      >
        {error}
      </div>

      <div className="auth-field">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          disabled={loading}
          aria-required="true"
        />
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

      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        disabled={loading}
        hint="At least 8 characters"
        showStrength
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPw}
        autoComplete="new-password"
        disabled={loading}
      />

      <p style={{ fontSize: 12, color: '#7C6E65', lineHeight: 1.5, margin: '14px 0 16px' }}>
        By creating an account, you agree to our{' '}
        <Link href="/terms" style={{ color: '#E86A58', fontWeight: 650, textDecoration: 'underline' }}>Terms of Service</Link>{' '}
        and{' '}
        <Link href="/privacy" style={{ color: '#E86A58', fontWeight: 650, textDecoration: 'underline' }}>Privacy Policy</Link>.
      </p>

      <button
        type="submit"
        className="button button-dark auth-submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className="auth-spinner" aria-hidden="true" /> Creating account…</>
        ) : (
          <>Create account <ArrowRight size={16} aria-hidden="true" /></>
        )}
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link href="/login">Sign in</Link>
      </p>
    </form>
  )
}
