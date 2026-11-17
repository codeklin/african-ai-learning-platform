export interface BookChapter {
  number: number | string
  title: string
  page?: number | string
  description?: string
}

export interface BookFaqItem {
  question: string
  answer: string
}

export interface BookConfig {
  title: string
  subtitle: string
  author: string
  publisher: string
  price: string
  formats: string
  coverImage: string
  authorImage?: string
  purchaseLinks: {
    nestuge: string
    gumroad?: string
    selar?: string
  }
  whatsappUrl: string
  hero: {
    headline: string
    subhead: string
    badge: string
  }
  sections: {
    problem: {
      title: string
      body: string
    }
    whyIWroteIt: {
      title: string
      body: string
    }
    system: {
      title: string
      body: string
    }
    whoItIsFor: {
      title: string
      items: string[]
    }
    whoItIsNotFor: {
      title: string
      items: string[]
    }
    tableOfContents: {
      title: string
      note: string
      chapters: BookChapter[]
    }
    authorBio: {
      title: string
      bio: string
    }
    faq: {
      title: string
      items: BookFaqItem[]
    }
  }
  landingTeaser: {
    headline: string
    body: string
    buttonText: string
  }
}

export const BOOK_DATA: BookConfig = {
  title: 'Stop Sounding Like Everyone Else',
  subtitle: 'The UniqueME 30-Day System for Finding and Protecting Your Voice',
  author: 'Olajide Igbalaye',
  publisher: 'OlajideAI Labs, copyright 2026',
  price: '$20',
  formats: 'PDF and EPUB',
  coverImage: '/uniqueme-cover.png',
  authorImage: '/headshot.png',

  // Outbound purchase URLs (currently exclusively available on Nestuge)
  purchaseLinks: {
    nestuge: 'https://nestuge.com/uniqueme',
  },

  whatsappUrl: 'https://wa.me/2347018643642?text=Hi%20Olajide%2C%20I%20have%20a%20question%20about%20your%20book%20Stop%20Sounding%20Like%20Everyone%20Else.',

  hero: {
    headline: 'Stop sounding like everyone else.',
    subhead:
      'A 30-day system for finding your voice and protecting it, written by someone who copied people for results and got none.',
    badge: '$20. PDF and EPUB. Instant download.',
  },

  sections: {
    problem: {
      title: 'The Problem',
      body:
        'Most of what gets posted online sounds the same. Same hooks, same structure, same borrowed phrases. You can follow every rule of good writing and still disappear, because the format ends up speaking for you.',
    },
    whyIWroteIt: {
      title: 'Why I Wrote It',
      body:
        'I deleted a post once because it sounded better than me. I copied people who had results and did not get their results. I started YouTube while afraid of what people would say. When I found my own voice and started using it, my followers and engagement grew, and I could tell quickly which clients were a bad fit.',
    },
    system: {
      title: 'What the 30-Day System Does',
      body:
        'It gives you a daily practice to find how you actually think and talk, then protect it when you publish, pitch, and work with clients. Fast action over heavy study. Real reps over theory.',
    },
    whoItIsFor: {
      title: 'Who It Is For',
      items: [
        'Creators who post regularly but feel like their content sounds like everyone else',
        'Freelancers who want clients to hire them specifically, not just anyone with their skill',
        'Founders who write but keep softening or second-guessing what they actually think',
        'Professionals tired of editing themselves to sound acceptable instead of honest',
      ],
    },
    whoItIsNotFor: {
      title: 'Who It Is Not For',
      items: [
        'Anyone looking for a posting template to copy',
        'Anyone who wants a formula that does the thinking for them',
        'Anyone not willing to do daily writing practice',
      ],
    },

    tableOfContents: {
      title: 'What Is Inside',
      note: 'The 30-day blueprint broken down into daily practices, field tests, and voice boundaries.',
      chapters: [
        { number: 'Intro', title: 'Introduction', page: '5' },
        { number: 'Guide', title: 'How to Use This Book', page: '7' },
        { number: '01', title: 'The Noise Problem', page: '8' },
        { number: '02', title: 'The Cost of Losing Your Voice', page: '12' },
        { number: '03', title: 'Choose the Discomfort', page: '17' },
        { number: '04', title: 'What Uniqueness Actually Means', page: '22' },
        { number: '05', title: 'The School Nobody Offers', page: '27' },
        { number: '06', title: 'The Voice Audit', page: '33' },
        { number: '07', title: 'Building a Point of View', page: '38' },
        { number: '08', title: 'Staying Distinct', page: '43' },
        { number: '09', title: 'Turning Voice into Leverage', page: '48' },
        { number: '10', title: 'The 30-Day UniqueME System', page: '53' },
        { number: 'Close', title: 'Closing', page: '59' },
        { number: 'Bio', title: 'About the Author', page: '62' },
      ],
    },

    authorBio: {
      title: 'About the Author',
      bio:
        'Olajide Igbalaye is a software engineer, copywriter, and digital creator with over five years of experience building web applications and writing brand messaging for startups, businesses, and creators. After spending years testing internet formulas, creating content, and experiencing the fatigue of borrowed voices, he developed the UniqueME system to help professionals uncover, sharpen, and protect their distinct perspective in an era of automated noise. He is the founder of Gigsdev and OlajideAI Labs.',
    },

    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What format is it?',
          answer: 'PDF and EPUB.',
        },
        {
          question: 'Is there a print edition?',
          answer: 'No. The book is available only in digital formats (PDF and EPUB) for immediate reading on phones, tablets, e-readers, and computers.',
        },
        {
          question: 'How do I get it after paying?',
          answer: 'Instant download from Nestuge. You receive your download link and email confirmation immediately after checkout.',
        },
        {
          question: 'Does it guarantee results?',
          answer: 'No. It is a practical system. What you get depends on whether you do the daily work.',
        },
        {
          question: 'Questions?',
          answer: 'You can chat directly with us on WhatsApp if you have questions before or after buying.',
        },
      ],
    },
  },

  landingTeaser: {
    headline: 'A book for people who are tired of sounding like everyone.',
    body: 'Stop Sounding Like Everyone Else. A 30-day system for finding and protecting your voice. $20.',
    buttonText: 'See the book',
  },
}
