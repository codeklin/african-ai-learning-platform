/**
 * ituwaAfrica Service Worker
 *
 * Strategy: stale-while-revalidate for pages/assets.
 * - Serves cached content instantly so the app loads fast offline.
 * - Fetches a fresh copy in the background every time.
 * - When a new version is detected (new SW file), it activates
 *   immediately and posts a message to all clients so the app
 *   can reload silently or notify the user.
 *
 * CACHE_VERSION — bump this string on every deploy that needs a
 * forced client refresh. The build pipeline can inject the commit
 * SHA here; for now it uses a timestamp set at install time.
 */

const CACHE_NAME = 'ituwa-v1'

// Assets to pre-cache on install (app shell)
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/ituwaAfricapwa.png',
  '/favicon.ico',
]

// ── Install ──────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  // Skip waiting so this SW activates immediately on first install
  self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
})

// ── Activate ─────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  // Claim all open clients so they use this SW without a reload
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Delete any caches from previous versions
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      ),
    ])
  )
})

// ── Fetch (stale-while-revalidate) ───────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests for same-origin or same-site resources
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Skip Supabase API calls, analytics, and other third-party requests —
  // these must always go to the network
  const isThirdParty =
    !url.origin.includes('ituwa') &&
    !url.pathname.startsWith('/_next/') &&
    url.origin !== self.location.origin

  if (isThirdParty) return

  // Skip Next.js internal API routes — always network-first
  if (url.pathname.startsWith('/api/')) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)

      // Fetch fresh copy in the background regardless
      const networkFetch = fetch(request)
        .then((response) => {
          // Only cache valid, non-opaque responses
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone())
          }
          return response
        })
        .catch(() => null)

      // Return cached immediately if available, otherwise wait for network
      return cached ?? (await networkFetch) ?? new Response('Offline', { status: 503 })
    })
  )
})

// ── Background update check ───────────────────────────────────────
// When a new SW file is detected and installed, tell every open
// client tab to reload so they get the latest build.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// After activation, notify all clients that a new version is live
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'SW_UPDATED' })
      })
    })
  )
})
