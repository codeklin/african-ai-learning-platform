import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'

const PAYSTACK_API_URL = 'https://api.paystack.co'

function getSecretKey(): string {
  const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim()
  if (!secretKey) throw new Error('PAYSTACK_SECRET_KEY is not configured')
  return secretKey
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export interface InitializedTransaction {
  authorizationUrl: string
  reference: string
}

export interface VerifiedTransaction {
  status: string
  reference: string
  amount: number
  currency: string
  id: number
  paidAt: string | null
  customerEmail: string | null
}

async function paystackRequest(path: string, init: RequestInit): Promise<unknown> {
  const response = await fetch(`${PAYSTACK_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    signal: AbortSignal.timeout(15000),
    cache: 'no-store',
  })

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new Error(`Paystack returned an unreadable response (${response.status})`)
  }

  if (!response.ok || !isRecord(payload) || payload.status !== true) {
    const message =
      isRecord(payload) && typeof payload.message === 'string'
        ? payload.message
        : `Paystack request failed (${response.status})`
    throw new Error(message)
  }

  return payload.data
}

export async function initializePaystackTransaction(input: {
  email: string
  amountKobo: number
  reference: string
  callbackUrl: string
  courseSlug: string
}): Promise<InitializedTransaction> {
  const data = await paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: 'NGN',
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: { course_slug: input.courseSlug },
    }),
  })

  if (
    !isRecord(data) ||
    typeof data.authorization_url !== 'string' ||
    typeof data.reference !== 'string' ||
    data.reference !== input.reference ||
    !URL.canParse(data.authorization_url) ||
    new URL(data.authorization_url).protocol !== 'https:' ||
    new URL(data.authorization_url).hostname !== 'checkout.paystack.com'
  ) {
    throw new Error('Paystack returned incomplete checkout details')
  }

  return { authorizationUrl: data.authorization_url, reference: data.reference }
}

export async function verifyPaystackTransaction(reference: string): Promise<VerifiedTransaction> {
  const data = await paystackRequest(
    `/transaction/verify/${encodeURIComponent(reference)}`,
    { method: 'GET' }
  )

  if (
    !isRecord(data) ||
    typeof data.status !== 'string' ||
    typeof data.reference !== 'string' ||
    typeof data.amount !== 'number' ||
    typeof data.currency !== 'string' ||
    typeof data.id !== 'number' ||
    !Number.isSafeInteger(data.id)
  ) {
    throw new Error('Paystack returned incomplete verification details')
  }

  const customer = isRecord(data.customer) ? data.customer : null
  const paidAt = data.paid_at

  return {
    status: data.status,
    reference: data.reference,
    amount: data.amount,
    currency: data.currency,
    id: data.id,
    paidAt: typeof paidAt === 'string' ? paidAt : null,
    customerEmail: customer && typeof customer.email === 'string' ? customer.email : null,
  }
}

export function isValidPaystackSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !/^[a-f\d]{128}$/i.test(signature)) return false

  const expected = createHmac('sha512', getSecretKey()).update(rawBody).digest()
  const received = Buffer.from(signature, 'hex')
  return received.length === expected.length && timingSafeEqual(received, expected)
}

export function getAppUrl(): URL {
  const value = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (!value) throw new Error('NEXT_PUBLIC_APP_URL is not configured')

  const url = new URL(value)
  if (
    url.username ||
    url.password ||
    (url.protocol !== 'https:' && !(url.protocol === 'http:' && url.hostname === 'localhost'))
  ) {
    throw new Error('NEXT_PUBLIC_APP_URL must be an HTTPS URL (HTTP is allowed for localhost)')
  }

  return url
}
