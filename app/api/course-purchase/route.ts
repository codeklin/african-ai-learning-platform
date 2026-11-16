import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCourseProduct, getActivePrice } from '@/lib/course-products'
import { getUsdNgnRate } from '@/lib/exchange-rate'

export const dynamic = 'force-dynamic'

function getWhatsAppNumber(value: string | undefined): string | null {
  const digits = value?.replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('0') && digits.length === 11) return `234${digits.slice(1)}`
  if (digits.startsWith('234') && digits.length === 13) return digits
  return null
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Sign in to view purchase instructions.' }, { status: 401 })
  }

  const slug = new URL(request.url).searchParams.get('slug')
  const course = slug ? getCourseProduct(slug) : undefined

  if (!course?.price) {
    return NextResponse.json({ error: 'This course is not available for purchase.' }, { status: 404 })
  }

  // Use launch price when promo is active
  const activePrice = getActivePrice(course)
  if (!activePrice) {
    return NextResponse.json({ error: 'This course is not available for purchase.' }, { status: 404 })
  }

  const bankName = process.env.COURSE_PAYMENT_BANK_NAME?.trim()
  const accountNumber = process.env.COURSE_PAYMENT_ACCOUNT_NUMBER?.trim()
  const accountName = process.env.COURSE_PAYMENT_ACCOUNT_NAME?.trim()
  const whatsappNumber = getWhatsAppNumber(process.env.COURSE_PAYMENT_WHATSAPP_NUMBER)

  if (
    !bankName ||
    !accountName ||
    !accountNumber ||
    !/^\d{10}$/.test(accountNumber) ||
    !whatsappNumber
  ) {
    return NextResponse.json(
      { error: 'Bank transfer instructions are not configured yet. Please try again later.' },
      { status: 503 }
    )
  }

  let exchangeRate: { rate: number; updatedAt: string } | null = null
  try {
    exchangeRate = await getUsdNgnRate()
  } catch (error) {
    console.error('Unable to retrieve the course purchase exchange rate, using fallback rate:', error)
    exchangeRate = { rate: 1600, updatedAt: new Date().toISOString() }
  }

  const amountNgn =
    activePrice.currency === 'NGN'
      ? activePrice.amount
      : exchangeRate
        ? Math.ceil(activePrice.amount * exchangeRate.rate)
        : null

  if (amountNgn === null) {
    return NextResponse.json(
      { error: 'A current naira transfer amount is unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  const usdEquivalent =
    activePrice.currency === 'USD'
      ? activePrice.amount
      : exchangeRate
        ? Math.round((activePrice.amount / exchangeRate.rate) * 100) / 100
        : null
  const formattedNgn = new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(amountNgn)
  const message = [
    'Hi ituwaAfrica, I want to confirm a bank transfer for:',
    `${course.title}`,
    `Account email: ${user.email ?? 'not available'}`,
    `Transfer amount: NGN ${formattedNgn}`,
    'Please tell me how to share my transfer reference for manual verification.',
  ].join('\n')

  return NextResponse.json({
    courseTitle: course.title,
    amountNgn,
    usdEquivalent,
    exchangeRate: exchangeRate?.rate ?? null,
    exchangeRateUpdatedAt: exchangeRate?.updatedAt ?? null,
    bank: {
      name: bankName,
      accountNumber,
      accountName,
    },
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    exchangeRateAttribution: 'https://www.exchangerate-api.com',
  })
}
