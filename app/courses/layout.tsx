import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practical digital skills courses | ituwaAfrica',
  description:
    'Explore free courses in AI, content creation, freelancing, YouTube, automation and app development. Learn at your own pace through practical lessons and projects.',
  openGraph: {
    title: 'Practical digital skills courses | ituwaAfrica',
    description:
      'Explore free courses in AI, content creation, freelancing, YouTube, automation and app development.',
  },
}

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
