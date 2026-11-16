export interface CourseProduct {
  slug: string
  databaseSlug: string
  title: string
  academy: string
  description: string
  level: string
  symbol: string
  tone: 'lilac' | 'green' | 'orange' | 'blue' | 'peach' | 'lavender'
  price: { currency: 'USD' | 'NGN'; amount: number } | null
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
    slug: 'build-a-helpful-ai-app',
    databaseSlug: 'build-helpful-ai-app',
    title: 'AI Web App Development',
    academy: 'AI Web App Development',
    description: 'Build a practical web app with AI, from problem definition through interface design, testing, and responsible API use.',
    level: 'Beginner to intermediate',
    symbol: '03',
    tone: 'blue',
    price: { currency: 'NGN', amount: 20_000 },
    inDevelopment: true,
  },
  {
    slug: 'youtube-automation-monetization-masterclass',
    databaseSlug: 'youtube-automation-monetization-masterclass',
    title: 'YouTube Monetization',
    academy: 'Creator Economy & YouTube',
    description: 'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    level: 'Beginner to intermediate',
    symbol: '04',
    tone: 'green',
    price: { currency: 'NGN', amount: 10_000 },
    inDevelopment: true,
  },
  {
    slug: 'ai-graphic-design',
    databaseSlug: 'ai-graphic-design',
    title: 'AI Graphic Design',
    academy: 'AI Graphic Design',
    description: 'Create original, useful visual assets with AI-assisted design workflows and prepare them for real projects.',
    level: 'Beginner to intermediate',
    symbol: '05',
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
    (course) => course.slug === slug || course.databaseSlug === slug
  )
}
