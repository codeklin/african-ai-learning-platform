'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import PasswordField from '@/components/password-field'

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail]       = useState(searchParams.get('email') || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password. Please try again.'
          : 'We could not sign you in. Please try again or reset your password.'
      )
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <form onSubmit={handleSignIn} noValidate aria-label="Sign in form">
      {/* Live error region — announced by screen readers immediately */}
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
          aria-invalid={!!error}
        />
      </div>

      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        disabled={loading}
      />

      <div className="auth-forgot-row">
        <Link href="/forgot-password" className="auth-forgot-link">
          Forgot your password?
        </Link>
      </div>

      <button
        type="submit"
        className="button button-dark auth-submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className="auth-spinner" aria-hidden="true" /> Signing in…</>
        ) : (
          <>Sign in <ArrowRight size={16} aria-hidden="true" /></>
        )}
      </button>

      <p className="auth-switch">
        Don&apos;t have an account?{' '}
        <Link href={`/signup?next=${encodeURIComponent(redirectTo)}`}>Create one for free</Link>
      </p>
    </form>
  )
}
