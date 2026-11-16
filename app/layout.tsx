import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Baloo_2 } from 'next/font/google'
import PwaRegister from '@/components/pwa-register'
import PwaInstallPrompt from '@/components/pwa-install-prompt'
import './globals.css'

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo2',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ituwa.africa'),
  title: 'ituwaAfrica | Learn digital skills. Build real things.',
  description: 'Learn AI, content marketing, app development, freelancing, video creation and YouTube through practical lessons and projects. Start with free foundations.',
  openGraph: {
    title: 'ituwaAfrica | Learn digital skills. Build real things.',
    description: 'Build practical skills in AI, content marketing, app development, freelancing, video creation and YouTube. Start with free foundations.',
    type: 'website',
    images: [{ url: '/ituwaAfrica.png', width: 1200, height: 630, alt: 'ituwaAfrica' }],
  },
  generator: 'ituwaAfrica',
  applicationName: 'ituwaAfrica',
  appleWebApp: {
    capable: true,
    title: 'ituwaAfrica',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/ituwaAfricapwa.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#E86A58',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={baloo2.variable}>
      <body className="antialiased">
        {/* PWA splash : only visible when running as an installed PWA before JS loads.
            suppressHydrationWarning prevents the React hydration mismatch caused by
            the display:none style being applied by the inline script before hydration. */}
        <div id="pwa-splash" aria-hidden="true" suppressHydrationWarning>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ituwaAfricapwa.png" alt="" width={120} height={120} />
          <span>ituwaAfrica</span>
        </div>
        {children}
        <PwaRegister />
        <PwaInstallPrompt />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
