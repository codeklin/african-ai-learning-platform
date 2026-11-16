import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'
import { getCourseProduct, getActivePrice } from '@/lib/course-products'
import { getUsdNgnRate } from '@/lib/exchange-rate'
import { getAppUrl, initializePaystackTransaction } from '@/lib/paystack'

export const dynamic = 'force-dynamic'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Sign in before starting checkout.' }, { status: 401 })
  }
  if (!user.email) {
    return NextResponse.json({ error: 'Add an email address to your account before paying.' }, { status: 400 })
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 400 })
  }

  const slug = isRecord(body) && typeof body.slug === 'string' ? body.slug : null
  const product = slug ? getCourseProduct(slug) : undefined
  const activePrice = product ? getActivePrice(product) : null
  if (!product || !activePrice) {
    return NextResponse.json({ error: 'This course is not available for purchase.' }, { status: 404 })
  }

  const adminClient = await createAdminClient()
  const { data: course, error: courseError } = await adminClient
    .from('courses')
    .select('id')
    .eq('slug', product.databaseSlug)
    .maybeSingle()

  if (courseError) {
    console.error('Unable to resolve course for Paystack checkout:', courseError)
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
  }
  if (!course) {
    return NextResponse.json({ error: 'This course is not available for purchase.' }, { status: 404 })
  }

  const { data: existingEnrollment, error: enrollmentLookupError } = await adminClient
    .from('enrollments')
    .select('payment_verified_at')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle()

  if (enrollmentLookupError) {
    console.error('Unable to check existing course access before checkout:', enrollmentLookupError)
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
  }
  if (existingEnrollment?.payment_verified_at) {
    return NextResponse.json({ error: 'You already have access to this course.' }, { status: 409 })
  }

  let amountNgn: number
  try {
    if (activePrice.currency === 'NGN') {
      amountNgn = activePrice.amount
    } else {
      const { rate } = await getUsdNgnRate()
      amountNgn = Math.ceil(activePrice.amount * rate)
    }
  } catch (error) {
    console.error('Unable to determine the Paystack checkout amount:', error)
    return NextResponse.json({ error: 'The current Naira price is unavailable. Please try again later.' }, { status: 503 })
  }

  const amountKobo = amountNgn * 100
  if (!Number.isSafeInteger(amountKobo) || amountKobo <= 0) {
    console.error('Invalid server-calculated Paystack amount for course:', product.databaseSlug)
    return NextResponse.json({ error: 'Unable to calculate the course price.' }, { status: 500 })
  }

  const reference = `ituwa_${crypto.randomUUID().replaceAll('-', '')}`
  const { error: paymentInsertError } = await adminClient.from('course_payments').insert({
    user_id: user.id,
    course_id: course.id,
    reference,
    amount_kobo: amountKobo,
    currency: 'NGN',
    customer_email: user.email,
    status: 'pending',
  })

  if (paymentInsertError) {
    console.error('Unable to create pending Paystack payment:', paymentInsertError)
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
  }

  try {
    const appUrl = getAppUrl()
    const initialized = await initializePaystackTransaction({
      email: user.email,
      amountKobo,
      reference,
      callbackUrl: new URL('/api/paystack/callback', appUrl).toString(),
      courseSlug: product.databaseSlug,
    })

    const { error: updateError } = await adminClient
      .from('course_payments')
      .update({ status: 'initialized' })
      .eq('reference', reference)

    if (updateError) {
      console.error('Unable to update Paystack payment initialization status:', updateError)
      return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({
      authorizationUrl: initialized.authorizationUrl,
      reference: initialized.reference,
    })
  } catch (error) {
    console.error('Paystack transaction initialization failed:', error)
    const { error: updateError } = await adminClient
      .from('course_payments')
      .update({ status: 'failed' })
      .eq('reference', reference)

    if (updateError) {
      console.error('Unable to mark failed Paystack initialization:', updateError)
    }

    return NextResponse.json(
      { error: 'Paystack checkout could not be started. Please try again or use bank transfer.' },
      { status: 502 }
    )
  }
}
