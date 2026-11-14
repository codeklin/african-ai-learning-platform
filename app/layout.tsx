import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Baloo_2 } from 'next/font/google'
import './globals.css'

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo2',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ituwa.africa'),
  title: 'ituwaAfrica | AI tutorials don\'t help you. Practice, projects and systems do.',
  description: 'Stop watching AI tutorials. ituwaAfrica gives you practical AI skills, real projects and systems that move your work forward. Start free.',
  openGraph: {
    title: 'ituwaAfrica | Practice, projects and AI systems that work',
    description: 'Stop watching AI tutorials. ituwaAfrica gives you practical AI skills, real projects and systems that move your work forward.',
    type: 'website',
    images: [{ url: '/ituwaafrica.png', width: 1200, height: 630, alt: 'ituwaAfrica' }],
  },
  generator: 'ituwaAfrica',
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAF5EE',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={baloo2.variable}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
