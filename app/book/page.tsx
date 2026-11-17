import type { Metadata } from 'next'
import BookPageClient from '@/components/book-page'
import { BOOK_DATA } from '@/data/book'

export const metadata: Metadata = {
  title: `${BOOK_DATA.title} | Book by ${BOOK_DATA.author}`,
  description: `${BOOK_DATA.subtitle}. A 30-day system for finding and protecting your voice. Available in PDF and EPUB for $20.`,
  openGraph: {
    title: `${BOOK_DATA.title} | ${BOOK_DATA.author}`,
    description: BOOK_DATA.subtitle,
    type: 'book',
    images: [
      {
        url: BOOK_DATA.coverImage,
        width: 800,
        height: 1200,
        alt: BOOK_DATA.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BOOK_DATA.title,
    description: BOOK_DATA.subtitle,
    images: [BOOK_DATA.coverImage],
  },
}

export default function BookRoutePage() {
  return <BookPageClient />
}
