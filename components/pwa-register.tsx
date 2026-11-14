'use client'

import { useEffect } from 'react'

/**
 * PWA Service Worker Registration & Background Update Handler
 *
 * - Registers /sw.js silently on mount (production only).
 * - Checks for a new SW version every time the user focuses the tab.
 * - When a new version is found it installs in the background, then
 *   reloads the page automatically so the user always has the latest
 *   build without ever seeing a manual "update" prompt.
 */
export default function PwaRegister() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return
    }

    let registration: ServiceWorkerRegistration | null = null

    // ── Register the service worker ────────────────────────────
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        registration = reg
        console.log('[PWA] Service worker registered')

        // ── Listen for the new SW activating ───────────────────
        // When sw.js activates it posts SW_UPDATED to all clients.
        // We reload immediately — the new cache is already in place
        // so the reload is instant from cache.
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data?.type === 'SW_UPDATED') {
            console.log('[PWA] New version activated — reloading')
            window.location.reload()
          }
        })

        // ── Trigger an update check when user returns to the tab ─
        // This is the key mechanism: each time the user switches
        // back to the app, we ask the SW to check for a new version.
        const checkForUpdate = () => {
          if (registration) {
            registration.update().catch(() => {
              // Silently ignore — offline or network error
            })
          }
        }

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            checkForUpdate()
          }
        })

        // Also check once an hour while the app is open
        const hourlyCheck = setInterval(checkForUpdate, 60 * 60 * 1000)

        return () => {
          clearInterval(hourlyCheck)
        }
      })
      .catch((err) => {
        // Non-fatal — app works fine without SW
        console.warn('[PWA] Service worker registration failed:', err)
      })
  }, [])

  // No UI — this component is purely behavioural
  return null
}
