/**
 * GET /api/ping
 *
 * Keep-alive endpoint. Called daily by Vercel Cron (see vercel.json).
 * Runs a minimal Supabase query so the project stays active on the
 * free tier and the connection pool doesn't go cold.
 *
 * Also usable as a public health-check: returns 200 + JSON on success.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
// Vercel Cron invokes this as a GET — no auth cookie needed here,
// so we use the service-role client directly (server-side only).

export async function GET(request: Request) {
  // Validate the cron secret so random callers can't abuse the endpoint
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // If a secret is configured, enforce it; otherwise allow (useful for dev)
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    // Minimal query — just count one row from profiles to wake the DB
    const { error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .limit(1)

    if (error) {
      console.error('[ping] Supabase error:', error.message)
      return NextResponse.json(
        { ok: false, error: error.message, ts: new Date().toISOString() },
        { status: 500 },
      )
    }

    console.log('[ping] Supabase keep-alive OK', new Date().toISOString())
    return NextResponse.json({ ok: true, ts: new Date().toISOString() })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[ping] Unexpected error:', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
