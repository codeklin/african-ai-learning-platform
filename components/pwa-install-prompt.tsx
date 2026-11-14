'use client'

import { useState, useEffect } from 'react'
import { Download, X, Share } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showIosGuide, setShowIosGuide] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Don't show if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((window.navigator as unknown as { standalone?: boolean }).standalone)

    if (isStandalone) {
      return
    }

    // Check if dismissed in the last 7 days
    const dismissedTime = localStorage.getItem('ituwa_pwa_dismissed')
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000) {
      return
    }

    // Check for iOS Safari
    const ua = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(ua)
    const isSafari = ua.includes('safari') && !ua.includes('crios') && !ua.includes('fxios')

    if (isIosDevice && isSafari) {
      setIsIos(true)
      // Slight delay so page renders first
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      return () => clearTimeout(timer)
    }

    // Android / Chrome / Edge beforeinstallprompt handler
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    const handleAppInstalled = () => {
      setShowPrompt(false)
      setDeferredPrompt(null)
      localStorage.removeItem('ituwa_pwa_dismissed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true)
      return
    }

    if (!deferredPrompt) {
      return
    }

    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    } catch (err) {
      console.warn('[PWA] Prompt error:', err)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setShowIosGuide(false)
    localStorage.setItem('ituwa_pwa_dismissed', Date.now().toString())
  }

  if (!showPrompt) {
    return null
  }

  return (
    <aside className="pwa-install-banner" aria-label="Install App Prompt">
      <div className="pwa-banner-inner">
        <div className="pwa-banner-icon" aria-hidden="true">
          <Download size={18} />
        </div>
        <div className="pwa-banner-content">
          <span className="pwa-banner-title">Install ituwaAfrica App</span>
          <p className="pwa-banner-desc">
            {isIos
              ? 'Fast offline access & low mobile data use'
              : 'Add to your home screen for quick offline access'}
          </p>
        </div>
        <div className="pwa-banner-actions">
          <button
            type="button"
            onClick={handleInstallClick}
            className="pwa-install-btn"
          >
            <span>{isIos ? 'How to install' : 'Install'}</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="pwa-dismiss-btn"
            aria-label="Dismiss install prompt"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {showIosGuide && (
        <div className="pwa-ios-modal">
          <div className="pwa-ios-modal-inner">
            <div className="pwa-ios-modal-top">
              <strong>Install on iPhone & iPad</strong>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="pwa-dismiss-btn"
                aria-label="Close instructions"
              >
                <X size={16} />
              </button>
            </div>
            <ol className="pwa-ios-steps">
              <li>
                <span>1</span>
                <div>Tap the <strong>Share</strong> button <Share size={14} className="inline-icon" /> at the bottom of Safari</div>
              </li>
              <li>
                <span>2</span>
                <div>Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong></div>
              </li>
              <li>
                <span>3</span>
                <div>Tap <strong>Add</strong> in the top-right corner to finish</div>
              </li>
            </ol>
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="button button-dark pwa-ios-close-btn"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
