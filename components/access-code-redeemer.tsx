'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { redeemAccessCodeAction } from '@/app/actions/admin'

export default function AccessCodeRedeemer({ courseSlug }: { courseSlug: string }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await redeemAccessCodeAction({ code, courseSlug })
      if (result.success) {
        setSuccess(true)
        setTimeout(() => router.refresh(), 1200)
      } else {
        setError(result.error ?? 'Could not redeem that code.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="redeem-success">
        <Check size={18} strokeWidth={3} />
        <span>Access granted — loading your course…</span>
      </div>
    )
  }

  return (
    <form className="redeem-form" onSubmit={handleSubmit}>
      <label className="redeem-label" htmlFor="access-code-input">
        Have an access code?
      </label>
      <div className="redeem-row">
        <input
          id="access-code-input"
          type="text"
          className="redeem-input"
          placeholder="ITUWA-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={15}
          autoComplete="off"
          spellCheck={false}
          disabled={loading}
        />
        <button
          type="submit"
          className="redeem-btn"
          disabled={loading || code.length < 14}
        >
          {loading ? 'Checking…' : <><span>Redeem</span><ArrowRight size={15} /></>}
        </button>
      </div>
      {error && <p className="redeem-error" role="alert">{error}</p>}
    </form>
  )
}
