'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Copy, X } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { MANUAL_BANK_TRANSFER_ENABLED, type CourseProduct } from '@/lib/course-products'

interface PurchaseInfo {
  courseTitle: string
  amountNgn: number
  usdEquivalent: number | null
  exchangeRate: number | null
  exchangeRateUpdatedAt: string | null
  bank: {
    name: string
    accountNumber: string
    accountName: string
  }
  whatsappUrl: string
  exchangeRateAttribution: string
}

function isPurchaseInfo(value: unknown): value is PurchaseInfo {
  if (!value || typeof value !== 'object') return false
  const result = value as Record<string, unknown>
  const bank = result.bank
  if (!bank || typeof bank !== 'object') return false
  const bankDetails = bank as Record<string, unknown>

  return (
    typeof result.courseTitle === 'string' &&
    typeof result.amountNgn === 'number' &&
    (typeof result.usdEquivalent === 'number' || result.usdEquivalent === null) &&
    (typeof result.exchangeRate === 'number' || result.exchangeRate === null) &&
    (typeof result.exchangeRateUpdatedAt === 'string' || result.exchangeRateUpdatedAt === null) &&
    typeof result.whatsappUrl === 'string' &&
    typeof result.exchangeRateAttribution === 'string' &&
    typeof bankDetails.name === 'string' &&
    typeof bankDetails.accountNumber === 'string' &&
    typeof bankDetails.accountName === 'string'
  )
}

export default function CoursePurchaseButton({
  course,
  className = 'catalog-open',
  isEnrolled = false,
}: {
  course: CourseProduct
  className?: string
  isEnrolled?: boolean
}) {
  const { isAuthenticated, loading: authLoading } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaystackLoading, setIsPaystackLoading] = useState(false)
  const [isBankTransfer, setIsBankTransfer] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paystackError, setPaystackError] = useState<string | null>(null)
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleCopyAccount = async (accountNum: string) => {
    try {
      await navigator.clipboard.writeText(accountNum.replace(/\D/g, ''))
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2000)
    } catch {}
  }

  const handlePaystackCheckout = async () => {
    setIsPaystackLoading(true)
    setPaystackError(null)

    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: course.slug }),
      })
      const result: unknown = await response.json()

      if (
        !response.ok ||
        !result ||
        typeof result !== 'object' ||
        !('authorizationUrl' in result) ||
        typeof result.authorizationUrl !== 'string'
      ) {
        throw new Error(
          result && typeof result === 'object' && 'error' in result && typeof result.error === 'string'
            ? result.error
            : 'Unable to start Paystack checkout.'
        )
      }

      const checkoutUrl = new URL(result.authorizationUrl)
      if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.paystack.com') {
        throw new Error('Paystack returned an invalid checkout address.')
      }
      window.location.assign(checkoutUrl.toString())
    } catch (checkoutError: unknown) {
      setPaystackError(
        checkoutError instanceof Error ? checkoutError.message : 'Unable to start Paystack checkout.'
      )
      setIsPaystackLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen || !isAuthenticated || !isBankTransfer) return

    const controller = new AbortController()
    setIsLoading(true)
    setError(null)

    fetch(`/api/course-purchase?slug=${encodeURIComponent(course.slug)}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const result: unknown = await response.json()
        if (!response.ok) {
          throw new Error(
            result && typeof result === 'object' && 'error' in result && typeof result.error === 'string'
              ? result.error
              : 'Unable to load payment instructions.'
          )
        }
        if (!isPurchaseInfo(result)) {
          throw new Error('Payment instructions could not be validated. Please try again later.')
        }
        setPurchaseInfo(result)
      })
      .catch((fetchError: unknown) => {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load payment instructions.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [course.slug, isAuthenticated, isBankTransfer, isOpen, requestVersion])

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  const formattedNgn = purchaseInfo
    ? new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0,
      }).format(purchaseInfo.amountNgn)
    : null
  const formattedUsd =
    purchaseInfo?.usdEquivalent === null || purchaseInfo?.usdEquivalent === undefined
      ? null
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(purchaseInfo.usdEquivalent)

  return (
    <>
      {isEnrolled ? (
        <Link href={`/learn/${course.slug}/lesson-1`} className={className}>
          Start course <ArrowRight size={16} />
        </Link>
      ) : (
        <button
          type="button"
          className={className}
          disabled={authLoading}
          onClick={() => {
            setIsBankTransfer(false)
            setPaystackError(null)
            setIsOpen(true)
          }}
        >
          Buy course <ArrowRight size={16} />
        </button>
      )}

      {isOpen && (
        <div
          className="course-purchase-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <section
            className="course-purchase-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-purchase-title"
            aria-describedby="course-purchase-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="course-purchase-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close purchase instructions"
            >
              <X size={20} />
            </button>

            <span className="detail-section-kicker">SECURE CHECKOUT · ONE-TIME PAYMENT</span>
            <h2 id="course-purchase-title">Buy {course.title}</h2>
            <p id="course-purchase-description">
              Complete your payment securely with Paystack. We verify payment directly with the
              provider before granting course access.
            </p>

            {authLoading ? (
              <p className="course-purchase-state">Checking your account…</p>
            ) : !isAuthenticated ? (
              <div className="course-purchase-state">
                <p>Sign in or create an account before paying so we can connect your enrollment to you.</p>
                <div className="course-purchase-actions">
                  <Link href={`/login?next=${encodeURIComponent(`/courses/${course.slug}`)}`} className="button button-dark">
                    Sign in
                  </Link>
                  <Link href={`/signup?next=${encodeURIComponent(`/courses/${course.slug}`)}`} className="button button-light">
                    Create account
                  </Link>
                </div>
              </div>
            ) : isBankTransfer && isLoading ? (
              <p className="course-purchase-state">Loading current transfer instructions…</p>
            ) : isBankTransfer && error ? (
              <div className="course-purchase-error" role="alert">
                <p>{error}</p>
                <button type="button" className="button button-outline-warm" onClick={() => {
                  setPurchaseInfo(null)
                  setRequestVersion((version) => version + 1)
                }}>
                  Try again
                </button>
              </div>
            ) : isBankTransfer && purchaseInfo ? (
              <>
                <div className="course-purchase-amount">
                  <span>Transfer this amount in naira</span>
                  <strong>{formattedNgn}</strong>
                  <span>{formattedUsd ? `Indicative equivalent: ${formattedUsd}` : 'USD equivalent temporarily unavailable'}</span>
                </div>

                <dl className="course-bank-details">
                  <div><dt>Bank</dt><dd>{purchaseInfo.bank.name}</dd></div>
                  <div><dt>Account name</dt><dd>{purchaseInfo.bank.accountName}</dd></div>
                  <div>
                    <dt>Account number</dt>
                    <dd style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap', minWidth: 0 }}>
                      <span style={{ fontSize: 16, letterSpacing: '0.04em' }}>{purchaseInfo.bank.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount(purchaseInfo.bank.accountNumber)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '4px 8px',
                          borderRadius: 8,
                          border: '1px solid #EADBCE',
                          background: copiedAccount ? '#EEF7EE' : '#fff',
                          color: copiedAccount ? '#3DA872' : '#2C1A12',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        aria-label="Copy account number"
                      >
                        {copiedAccount ? <Check size={12} strokeWidth={3} /> : <Copy size={12} />}
                        <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                      </button>
                    </dd>
                  </div>
                </dl>

                {purchaseInfo.exchangeRate && purchaseInfo.exchangeRateUpdatedAt && (
                  <p className="course-rate-note">
                    Indicative rate: 1 USD = NGN {purchaseInfo.exchangeRate.toLocaleString('en-NG', { maximumFractionDigits: 2 })}.
                    Updated {new Date(purchaseInfo.exchangeRateUpdatedAt).toLocaleString('en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    })} UTC.{' '}
                    <a href={purchaseInfo.exchangeRateAttribution} target="_blank" rel="noreferrer">
                      Exchange-rate source
                    </a>
                  </p>
                )}

                <p className="course-purchase-warning">
                  Send the exact naira amount above, then share your transfer reference through WhatsApp.
                  A transfer notification is not proof of payment; access is granted only after admin verification.
                </p>

                <a
                  href={purchaseInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-dark course-purchase-whatsapp"
                >
                  Share transfer reference
                  <ArrowRight size={16} />
                </a>

                <p className="course-purchase-terms">
                  Review the <Link href="/terms" target="_blank">payment terms</Link> before transferring.
                </p>
                <button
                  type="button"
                  className="button button-outline-warm"
                  onClick={() => {
                    setIsBankTransfer(false)
                    setError(null)
                  }}
                >
                  Back to Paystack checkout
                </button>
              </>
            ) : !isBankTransfer ? (
              <div className="course-purchase-state">
                <p>Pay securely by card, bank transfer, or another method available in Paystack checkout.</p>
                {paystackError && <p className="course-purchase-error" role="alert">{paystackError}</p>}
                <button
                  type="button"
                  className="button button-dark"
                  disabled={isPaystackLoading}
                  onClick={handlePaystackCheckout}
                >
                  {isPaystackLoading ? 'Connecting to Paystack…' : 'Continue to Paystack'}
                  {!isPaystackLoading && <ArrowRight size={16} />}
                </button>
                {MANUAL_BANK_TRANSFER_ENABLED && (
                  <button
                    type="button"
                    className="button button-outline-warm"
                    onClick={() => {
                      setIsBankTransfer(true)
                      setPurchaseInfo(null)
                      setRequestVersion((version) => version + 1)
                    }}
                  >
                    Pay by bank transfer instead
                  </button>
                )}
                <p className="course-purchase-terms">
                  Review the <Link href="/terms" target="_blank">payment terms</Link> before paying.
                </p>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </>
  )
}
