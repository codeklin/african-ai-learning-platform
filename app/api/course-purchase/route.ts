import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCourseProduct } from '@/lib/course-products'

export const dynamic = 'force-dynamic'

interface ExchangeRateResponse {
  result?: unknown
  base_code?: unknown
  rates?: unknown
  time_last_update_utc?: unknown
}

async function getUsdNgnRate(): Promise<{ rate: number; updatedAt: string }> {
  const response = await fetch('https://open.er-api.com/v6/latest/USD', {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    throw new Error(`Exchange-rate service returned ${response.status}`)
  }

  const data = (await response.json()) as ExchangeRateResponse
  const rates =
    data.rates && typeof data.rates === 'object'
      ? (data.rates as Record<string, unknown>)
      : null
  const rate = rates?.NGN
  const updatedAt = data.time_last_update_utc

  if (
    data.result !== 'success' ||
    data.base_code !== 'USD' ||
    typeof rate !== 'number' ||
    !Number.isFinite(rate) ||
    rate <= 0 ||
    typeof updatedAt !== 'string' ||
    !Number.isFinite(Date.parse(updatedAt))
  ) {
    throw new Error('Exchange-rate response did not contain a valid USD/NGN rate')
  }

  return { rate, updatedAt }
}

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
    console.error('Unable to retrieve the course purchase exchange rate:', error)
    if (course.price.currency === 'USD') {
      return NextResponse.json(
        { error: 'The live USD/NGN rate is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }
  }

  const amountNgn =
    course.price.currency === 'NGN'
      ? course.price.amount
      : exchangeRate
        ? Math.ceil(course.price.amount * exchangeRate.rate)
        : null

  if (amountNgn === null) {
    return NextResponse.json(
      { error: 'A current naira transfer amount is unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  const usdEquivalent =
    course.price.currency === 'USD'
      ? course.price.amount
      : exchangeRate
        ? Math.round((course.price.amount / exchangeRate.rate) * 100) / 100
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
