'use client'

import { useState, useId } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps {
  id?: string
  label: string
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  disabled?: boolean
  hint?: string
  /** Show a password strength bar under the field */
  showStrength?: boolean
}

function getStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  if (pw.length === 0) return { score: 0, label: '' }
  let score = 0
  if (pw.length >= 8)  score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const capped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return { score: capped, label: labels[capped] }
}

export default function PasswordField({
  id: externalId,
  label,
  value,
  onChange,
  autoComplete = 'current-password',
  disabled = false,
  hint,
  showStrength = false,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const generatedId = useId()
  const fieldId = externalId ?? generatedId
  const hintId = hint ? `${fieldId}-hint` : undefined
  const strengthId = showStrength ? `${fieldId}-strength` : undefined
  const { score, label: strengthLabel } = getStrength(value)
  const strengthClasses = ['', 'pw-weak', 'pw-fair', 'pw-good', 'pw-strong']

  return (
    <div className="login-field">
      <label htmlFor={fieldId}>{label}</label>

      <div className="pw-wrap">
        <input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-describedby={[hintId, strengthId].filter(Boolean).join(' ') || undefined}
          className="pw-input"
        />
        <button
          type="button"
          className="pw-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          tabIndex={0}
          disabled={disabled}
        >
          {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
        </button>
      </div>

      {hint && (
        <span id={hintId} className="pw-hint">{hint}</span>
      )}

      {showStrength && value.length > 0 && (
        <div className="pw-strength" id={strengthId} aria-live="polite" aria-atomic="true">
          <div className="pw-strength-bar" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`pw-strength-seg ${i <= score ? strengthClasses[score] : ''}`}
              />
            ))}
          </div>
          <span className={`pw-strength-label ${strengthClasses[score]}`}>
            {strengthLabel}
          </span>
        </div>
      )}
    </div>
  )
}
