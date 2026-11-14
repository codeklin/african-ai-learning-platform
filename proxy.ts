import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

/**
 * Next.js 16 Proxy (replaces the deprecated middleware.ts convention).
 *
 * Runs on the Node.js runtime before every matched route renders.
 * Responsibilities:
 *  - Refresh the Supabase session cookie on every request
 *  - Redirect unauthenticated users away from protected routes
 *  - Redirect non-admins away from /admin/*
 *  - Redirect already-authenticated users away from /login and /signup
 *
 * This is an optimistic UX layer only. All protected server components and
 * server actions re-verify the session and role independently — never rely
 * solely on this file for security.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match every path except:
     *  - _next/static  (compiled assets)
     *  - _next/image   (image optimisation service)
     *  - favicon.ico, sitemap.xml, robots.txt
     *  - Public image/icon files  (svg, png, jpg, jpeg, gif, webp)
     *
     * One negative-lookahead covers all exclusions.
     */
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
