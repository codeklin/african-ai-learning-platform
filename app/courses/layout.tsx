import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practical digital skills courses | ituwaAfrica',
  description:
    'Learn AI foundations, content marketing, app development, freelancing, video creation and YouTube through practical lessons and projects.',
  openGraph: {
    title: 'Practical digital skills courses | ituwaAfrica',
    description:
      'Explore practical courses in AI foundations, content marketing, app development, freelancing, video creation and YouTube.',
  },
}

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
