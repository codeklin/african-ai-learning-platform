import { NextResponse } from 'next/server'
import { fulfillPaystackPayment } from '@/lib/course-payment-fulfillment'
import { getAppUrl } from '@/lib/paystack'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const appUrl = getAppUrl()
  const callbackParams = new URL(request.url).searchParams
  const reference = callbackParams.get('reference') ?? callbackParams.get('trxref')

  if (!reference || reference.length > 100) {
    return NextResponse.redirect(new URL('/courses?payment=not-complete', appUrl))
  }

  try {
    const result = await fulfillPaystackPayment(reference)
    const status = result.paid ? 'success' : 'not-complete'
    return NextResponse.redirect(
      new URL(`/courses/${encodeURIComponent(result.courseSlug)}?payment=${status}`, appUrl)
    )
  } catch (error) {
    console.error('Unable to verify Paystack payment after checkout:', error)
    return NextResponse.redirect(new URL('/courses?payment=processing', appUrl))
  }
}
