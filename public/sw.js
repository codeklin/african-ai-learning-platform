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

const CACHE_NAME = 'ituwa-v2'

// Assets to pre-cache on install (static assets only, never HTML pages)
const PRECACHE_URLS = [
  '/manifest.json',
  '/ituwaAfricapwa.png',
  '/favicon.ico',
]

// ── Install ──────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  // Skip waiting so this SW activates immediately
  self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
})

// ── Activate ─────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  // Claim all open clients immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Delete any caches from previous versions (including stale ituwa-v1)
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

// ── Fetch ────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Skip Supabase, external APIs, and internal Next.js API routes
  if (
    url.pathname.startsWith('/api/') ||
    url.origin !== self.location.origin
  ) {
    return
  }

  // 1. Navigation / HTML pages: ALWAYS Network-First
  // Guarantees immediate UI updates and fresh auth state without stale cache traps
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached ?? new Response('Offline', { status: 503 })
        })
    )
    return
  }

  // 2. Static assets: Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request)
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            cache.put(request, response.clone())
          }
          return response
        })
        .catch(() => null)

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
