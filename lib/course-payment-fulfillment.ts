import 'server-only'
import { createAdminClient } from '@/lib/supabase/server'
import { verifyPaystackTransaction } from '@/lib/paystack'

function isValidEmail(value: string, expected: string): boolean {
  return value.trim().toLowerCase() === expected.trim().toLowerCase()
}

export async function fulfillPaystackPayment(reference: string): Promise<{
  courseSlug: string
  paid: boolean
}> {
  const supabase = await createAdminClient()
  const { data: payment, error: paymentError } = await supabase
    .from('course_payments')
    .select('id, user_id, course_id, reference, amount_kobo, currency, customer_email, status')
    .eq('reference', reference)
    .maybeSingle()

  if (paymentError) {
    throw new Error(`Unable to load payment record: ${paymentError.message}`)
  }
  if (!payment) throw new Error('Payment reference was not found')

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('slug')
    .eq('id', payment.course_id)
    .maybeSingle()

  if (courseError) {
    throw new Error(`Unable to resolve payment course: ${courseError.message}`)
  }
  if (!course) {
    throw new Error('Payment course could not be resolved')
  }
  if (payment.status === 'successful') return { courseSlug: course.slug, paid: true }

  const verified = await verifyPaystackTransaction(reference)
  if (
    verified.status !== 'success' ||
    verified.reference !== payment.reference ||
    verified.amount !== payment.amount_kobo ||
    verified.currency !== payment.currency ||
    !verified.customerEmail ||
    !isValidEmail(verified.customerEmail, payment.customer_email)
  ) {
    return { courseSlug: course.slug, paid: false }
  }

  const paidAt =
    verified.paidAt && Number.isFinite(Date.parse(verified.paidAt))
      ? new Date(verified.paidAt).toISOString()
      : new Date().toISOString()

  const { error: enrollmentError } = await supabase
    .from('enrollments')
    .upsert(
      {
        user_id: payment.user_id,
        course_id: payment.course_id,
        payment_verified_at: paidAt,
        payment_verified_by: null,
      },
      { onConflict: 'user_id,course_id' }
    )

  if (enrollmentError) {
    throw new Error(`Unable to grant verified course access: ${enrollmentError.message}`)
  }

  const { error: updateError } = await supabase
    .from('course_payments')
    .update({
      status: 'successful',
      provider_transaction_id: verified.id,
      paid_at: paidAt,
    })
    .eq('id', payment.id)
    .neq('status', 'successful')

  if (updateError) {
    throw new Error(`Unable to record verified payment: ${updateError.message}`)
  }

  return { courseSlug: course.slug, paid: true }
}
