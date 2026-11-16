import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code  = searchParams.get('code')
  const type  = searchParams.get('type')   // 'recovery' for password reset emails
  const requestedNext = searchParams.get('next')
  let redirectUrl = new URL('/dashboard', origin)

  if (
    requestedNext?.startsWith('/') &&
    !requestedNext.startsWith('//') &&
    !requestedNext.includes('\\')
  ) {
    const candidate = new URL(requestedNext, origin)
    if (candidate.origin === origin) redirectUrl = candidate
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Password reset emails land here with type=recovery — send to reset page
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/auth/reset-password', origin))
      }
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
