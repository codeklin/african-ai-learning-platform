# ituwaAfrica

**Practical AI learning for businesses, freelancers and creators in Africa.**
*Learn digital skills. Build real things. Get personal guidance when you need it.*

---

## Welcome to ituwaAfrica

ituwaAfrica helps people learn practical AI skills, create useful projects and apply what they learn to business, client and creator work. Learners can start with free AI Foundations, then explore specialist courses in content marketing, app development, video creation, YouTube and graphic design.

---

## What Makes ituwaAfrica Different?

* **Learn by making**: Lessons and exercises help learners practise with tangible outputs and projects.
* **Bite-Sized & Respectful of Your Time**: Lessons are intentionally focused (10–20 minutes) so you can make steady daily progress alongside your existing job, school, or freelance work.
* **Built Mobile-First for Africa**: Designed to feel like a native mobile app downloaded straight to your phone. Fast to load, data-conscious, and seamless to use on any screen.
* **Zero Fluff, Real Honesty**: We don't make get-rich-quick promises. We teach durable skills, responsible AI habits, and the creative discipline needed to stand out.

---

## The Learning Academies

Our curriculum is organized into six focused academies. Pick the problem you want to solve today and start there:

### 1. AI Foundations
Make sense of the tools everyone is talking about. Understand what AI can and cannot do, learn prompt engineering that produces useful results, and build confidence with daily tools.

### 2. Creator Economy & YouTube
Create videos people actually want to watch. Learn how to launch faceless channels, craft engaging video scripts with AI assistance, understand YouTube SEO and analytics, and build sustainable creator businesses beyond ad revenue.

### 3. AI Content Marketing for Business
Research an audience, clarify a business message, and plan useful, original content tied to a practical goal. This is an exclusive specialist course.

### 4. AI App Development for Business
Identify a real customer problem, build a focused AI app prototype, and test whether it offers practical value. This is an exclusive specialist course.

### 5. AI Video Creation and YouTube
Plan original video content, understand creator revenue paths, and learn about copyright and platform policies. Monetisation and audience growth are not guaranteed.

### 6. AI Graphic Design
Create original visual assets with AI-assisted design techniques and prepare them for practical projects.

---

## How It Works

1. **Pick a Starter Course**: Start completely free with *Your AI Toolkit: A Practical Start* or *Prompting for Better Work*. No credit card required.
2. **Follow Guided Walkthroughs**: Watch concise explanations and follow interactive exercise briefs designed for real-world scenarios.
3. **Complete Daily Challenges**: Build a learning habit with streak tracking, practical sprint quests, and earned skill badges.
4. **Build Your Portfolio**: Complete capstone project studios to showcase real, verifiable work samples when pitching clients or applying for roles.

---

## Who is ituwaAfrica For?

* **Aspiring Freelancers** looking to offer in-demand digital services.
* **Content Creators & YouTubers** wanting to scale production without losing creative quality.
* **Small Business Owners & Professionals** looking to communicate with customers, improve digital products or apply AI to practical business needs.
* **Curious Beginners** who want clear, hype-free guidance on how artificial intelligence impacts everyday life and work.

---

## Start Where You Are. Build From There.

Curiosity is a skill. You don't need a massive plan or a technical background to begin—you just need twenty minutes and a desire to make something useful.

- **[Explore Courses](https://ituwa.africa/courses)**  
- **[Sign In to Your Dashboard](https://ituwa.africa/login)**

---

*ituwaAfrica is committed to transparent, skill-first education. We teach practical craft and creative discipline. Professional success and income depend on continuous practice, individual effort, and client value.*

## Current course lineup and bank transfers

The catalogue has one free course, **AI Foundations**, and five paid specialist courses:

| Course | One-time price |
|---|---:|
| AI Video Creation | USD 4 |
| AI Content Marketing for Business (exclusive) | NGN 20,000 |
| AI App Development for Business (exclusive) | NGN 20,000 |
| YouTube Monetization | NGN 10,000 |
| AI Graphic Design | USD 4 |

The five paid courses are currently in development and are offered as pre-orders. The NGN 20,000 content marketing price is configured to match the app development course and should be confirmed by the business owner before launch. Learners see bank-transfer instructions after signing in and selecting **Buy course**. Transfer references are shared through WhatsApp. An administrator must verify the bank credit and record the enrollment; a receipt or learner message does not grant access. Lessons unlock only after the course is published and payment is verified. No release date is promised.

The purchase panel shows the exact NGN transfer amount and an indicative USD/NGN equivalent. Rates come from [ExchangeRate-API Open Access](https://www.exchangerate-api.com), are cached for up to 24 hours, and are attributed in the purchase panel. USD equivalents are estimates, not guaranteed exchange or settlement rates.

Configure these server-side environment variables in the local environment and Vercel before enabling purchase instructions:

```env
COURSE_PAYMENT_BANK_NAME=
COURSE_PAYMENT_ACCOUNT_NUMBER=
COURSE_PAYMENT_ACCOUNT_NAME=
COURSE_PAYMENT_WHATSAPP_NUMBER=
```

Do not prefix these values with `NEXT_PUBLIC_`. The purchase endpoint returns them only to an authenticated learner after a course purchase action. If any value is missing or invalid, the purchase panel reports that instructions are not configured.

Apply `supabase/migrations/003_course_focus_and_paid_access.sql` after the existing schema migrations, then apply `supabase/migrations/004_public_course_status_read.sql` and `supabase/migrations/005_business_content_marketing_course.sql`. Migration `004` grants the public course-status endpoint read access to only course slugs and statuses; row-level security continues to limit public reads to published courses. Migration `003` archives courses outside the initial lineup, records manual payment verification metadata, restricts paid enrollment to trusted admin actions, and prevents learners from changing their own account role. Migration `005` adds the business content marketing course and aligns the existing app course metadata without publishing either course.
