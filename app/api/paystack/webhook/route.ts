import { NextResponse } from 'next/server'
import { fulfillPaystackPayment } from '@/lib/course-payment-fulfillment'
import { isValidPaystackSignature } from '@/lib/paystack'

export const dynamic = 'force-dynamic'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export async function POST(request: Request) {
  const rawBody = await request.text()

  let validSignature = false
  try {
    validSignature = isValidPaystackSignature(
      rawBody,
      request.headers.get('x-paystack-signature')
    )
  } catch (error) {
    console.error('Paystack webhook signing key is not configured:', error)
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 })
  }

  if (!validSignature) {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 })
  }

  if (!isRecord(payload) || typeof payload.event !== 'string') {
    return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 })
  }
  if (payload.event !== 'charge.success') {
    return NextResponse.json({ received: true })
  }

  const data = payload.data
  const reference = isRecord(data) && typeof data.reference === 'string' ? data.reference : null
  if (!reference || reference.length > 100) {
    return NextResponse.json({ error: 'Invalid payment reference.' }, { status: 400 })
  }

  try {
    await fulfillPaystackPayment(reference)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paystack webhook payment verification failed:', error)
    return NextResponse.json({ error: 'Payment verification failed.' }, { status: 500 })
  }
}
