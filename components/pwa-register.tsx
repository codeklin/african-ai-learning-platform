'use client'

import { useEffect } from 'react'

/**
 * PWA Service Worker Registration & Background Update Handler
 *
 * - Registers /sw.js on mount when supported.
 * - Checks for a new SW version every time the user focuses the tab.
 * - When a new version is found it installs in the background, then
 *   reloads the page automatically so the user always has the latest build.
 */
export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    // Allow in production, or when running on localhost / https for testing
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.localhost')

    const isSecure = window.location.protocol === 'https:' || isLocalhost

    if (!isSecure) {
      console.warn('[PWA] Service worker requires HTTPS or localhost.')
      return
    }

    let registration: ServiceWorkerRegistration | null = null

    // Register service worker
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        registration = reg
        console.log('[PWA] Service worker registered successfully')

        // Listen for the new SW activating
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data?.type === 'SW_UPDATED') {
            console.log('[PWA] New version activated — reloading')
            window.location.reload()
          }
        })

        // Trigger an update check when user returns to the tab
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

        const hourlyCheck = setInterval(checkForUpdate, 60 * 60 * 1000)

        return () => {
          clearInterval(hourlyCheck)
        }
      })
      .catch((err) => {
        console.warn('[PWA] Service worker registration failed:', err)
      })
  }, [])

  return null
}
