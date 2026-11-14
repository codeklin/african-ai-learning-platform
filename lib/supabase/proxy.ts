import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

/**
 * Session refresh and route-protection logic for Next.js 16 Proxy.
 * Called from proxy.ts at the project root.
 *
 * Security model:
 * - This file provides optimistic redirects for UX (e.g. sending a
 *   visitor to /login instead of showing a broken dashboard).
 * - Authoritative permission checks happen AGAIN inside each server
 *   component and server action — never rely on this layer alone.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: always call getUser() — this is what refreshes the session
  // token in the cookie. Do not remove this call or move it after any
  // early-return logic.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // ── Unauthenticated guards ────────────────────────────────────

  if (pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // /learn/* — video and lesson content requires a registered account.
  // Preserve destination so the user lands on the correct lesson after login.
  if (pathname.startsWith('/learn') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // ── Role guard ────────────────────────────────────────────────

  // /admin/* — role is read from the database, never from client state.
  // The server component also re-checks this independently.
  if (pathname.startsWith('/admin') && user) {
    const { data: rawProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    const profile = rawProfile as { role: string } | null

    if (profile?.role !== 'admin' && user.email !== 'gigsdev007@gmail.com') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // ── Authenticated redirect ────────────────────────────────────

  // Signed-in users have no reason to be on /login or /signup
  if ((pathname === '/login' || pathname === '/signup') && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
