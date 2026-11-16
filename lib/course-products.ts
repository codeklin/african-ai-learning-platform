export interface CourseProduct {
  slug: string
  databaseSlug: string
  aliases?: string[]
  title: string
  academy: string
  description: string
  level: string
  symbol: string
  tone: 'lilac' | 'green' | 'orange' | 'blue' | 'peach' | 'lavender'
  price: { currency: 'USD' | 'NGN'; amount: number } | null
  exclusive?: boolean
  inDevelopment: boolean
}

export const COURSE_PRODUCTS: CourseProduct[] = [
  {
    slug: 'ai-toolkit-practical-start',
    databaseSlug: 'ai-toolkit-practical-start',
    title: 'AI Foundations',
    academy: 'AI Foundations',
    description: 'Build a practical understanding of AI tools, write clearer prompts, and apply what you learn to a real task.',
    level: 'Beginner',
    symbol: '01',
    tone: 'lilac',
    price: null,
    inDevelopment: false,
  },
  {
    slug: 'ai-video-creation',
    databaseSlug: 'ai-video-creation',
    title: 'AI Video Creation',
    academy: 'AI Video Creation',
    description: 'Plan and produce original AI-assisted videos, with attention to storytelling, audience value, and disclosure.',
    level: 'Beginner to intermediate',
    symbol: '02',
    tone: 'orange',
    price: { currency: 'USD', amount: 4 },
    inDevelopment: true,
  },
  {
    slug: 'ai-content-marketing-for-business',
    databaseSlug: 'ai-content-marketing-for-business',
    title: 'AI Content Marketing for Business',
    academy: 'AI Content Marketing',
    description: 'Turn a client brief into audience-focused social captions, ad copy, and email campaigns with AI, then refine the work through a repeatable workflow and portfolio-ready samples.',
    level: 'Beginner to intermediate',
    symbol: '03',
    tone: 'peach',
    price: { currency: 'NGN', amount: 15_000 },
    exclusive: true,
    inDevelopment: true,
  },
  {
    slug: 'ai-web-app-development',
    databaseSlug: 'ai-web-app-development',
    aliases: ['build-a-helpful-ai-app', 'build-helpful-ai-app'],
    title: 'AI Web App Development',
    academy: 'AI App Development',
    description: 'Learn how to build a simple, useful web app with AI assistance, from problem definition and interface planning to testing and deployment.',
    level: 'Beginner to intermediate',
    symbol: '04',
    tone: 'blue',
    price: { currency: 'NGN', amount: 20_000 },
    exclusive: true,
    inDevelopment: true,
  },
  {
    slug: 'youtube-monetization',
    databaseSlug: 'youtube-monetization',
    aliases: ['youtube-automation-monetization-masterclass'],
    title: 'YouTube Monetization',
    academy: 'Creator Economy & YouTube',
    description: 'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    level: 'Beginner to intermediate',
    symbol: '05',
    tone: 'green',
    price: { currency: 'NGN', amount: 10_000 },
    inDevelopment: true,
  },
  {
    slug: 'ai-graphic-design',
    databaseSlug: 'ai-graphic-design',
    title: 'AI Graphic Design',
    academy: 'AI Graphic Design',
    description: 'Create original, useful visual assets with AI-assisted design techniques and prepare them for real projects.',
    level: 'Beginner to intermediate',
    symbol: '06',
    tone: 'peach',
    price: { currency: 'USD', amount: 4 },
    inDevelopment: true,
  },
]

export const PAID_COURSE_PRODUCTS = COURSE_PRODUCTS.filter(
  (course): course is CourseProduct & { price: NonNullable<CourseProduct['price']> } =>
    course.price !== null
)

export function getCourseProduct(slug: string): CourseProduct | undefined {
  return COURSE_PRODUCTS.find(
    (course) =>
      course.slug === slug ||
      course.databaseSlug === slug ||
      course.aliases?.includes(slug)
  )
}

/**
 * Standard pricing formatter ensuring Naira appears first across the app,
 * followed by its USD equivalent.
 * e.g., "₦6,400 (≈ $4)" or "₦15,000 (≈ $9)" or "Free"
 */
export const USD_TO_NGN_RATE = 1600

export function formatDualPrice(
  price: CourseProduct['price'] | undefined,
  options: { short?: boolean } = {}
): {
  display: string
  nairaText: string
  usdText: string | null
  isFree: boolean
} {
  if (!price) {
    return {
      display: 'Free',
      nairaText: 'Free',
      usdText: null,
      isFree: true,
    }
  }

  let nairaAmount: number
  let usdAmount: number

  if (price.currency === 'USD') {
    usdAmount = price.amount
    nairaAmount = Math.round(price.amount * USD_TO_NGN_RATE)
  } else {
    nairaAmount = price.amount
    usdAmount = Math.ceil(price.amount / USD_TO_NGN_RATE)
  }

  const nairaText = `₦${nairaAmount.toLocaleString('en-NG')}`
  const usdText = `≈ $${usdAmount.toLocaleString('en-US')}`

  const display = options.short
    ? `${nairaText} (${usdText})`
    : `${nairaText} · ${usdText}`

  return {
    display,
    nairaText,
    usdText,
    isFree: false,
  }
}
