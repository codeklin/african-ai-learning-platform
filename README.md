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
Turn a client brief into audience-focused social captions, ad copy, and email campaigns with AI assistance. Refine the work through a repeatable content workflow and build portfolio-ready samples. This is an exclusive specialist course.

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

Curiosity is a skill. You don't need a massive plan or a technical background to begin:you just need twenty minutes and a desire to make something useful.

- **[Explore Courses](https://ituwa.africa/courses)**  
- **[Sign In to Your Dashboard](https://ituwa.africa/login)**

---

*ituwaAfrica is committed to transparent, skill-first education. We teach practical craft and creative discipline. Professional success and income depend on continuous practice, individual effort, and client value.*

## Course payments

The catalogue has one free course, **AI Foundations**, and five paid specialist courses. The checkout uses Paystack-hosted checkout; the server calculates the amount from the course catalogue, initializes the transaction with Paystack, verifies the transaction server-to-server, and grants access only after a verified successful payment. A signed Paystack webhook at `/api/paystack/webhook` provides the retryable fulfillment path. The browser return alone never grants course access.

| Course | Standard price | Current launch price |
|---|---:|---:|
| AI Video Creation | USD 4 | NGN 1,000 |
| AI Content Marketing for Business | NGN 15,000 | NGN 1,000 |
| AI Web App Development | NGN 20,000 | NGN 1,000 |
| YouTube Monetization | NGN 10,000 | NGN 1,000 |
| AI Graphic Design | USD 4 | NGN 1,000 |

The current launch prices are controlled by `LAUNCH_PROMO_ACTIVE` in `lib/course-products.ts`. When a standard price is in USD, checkout converts it to NGN using ExchangeRate-API, cached for up to 24 hours. USD amounts are estimates, not guaranteed settlement rates. The five paid courses are currently in development and are offered as pre-orders; lessons unlock only after the course is published and payment is verified. No release date is promised.

Set the Paystack **test** secret key in your local environment and Vercel. Keep the key server-side; do not use a `NEXT_PUBLIC_` prefix. `NEXT_PUBLIC_APP_URL` must be the canonical HTTPS origin of the deployed app (localhost is permitted for local development). In the Paystack dashboard, configure the webhook URL as `https://<your-app-domain>/api/paystack/webhook`. Paystack signs webhooks using the API secret key; the app validates the `x-paystack-signature` HMAC before processing events. Use test keys until the business account is approved and test transactions, callbacks, and webhook delivery have all been confirmed.

Manual bank transfer is currently disabled in the learner checkout. Paystack may offer bank transfer as a payment method within its hosted checkout. To re-enable the separate manual-transfer flow later, set `MANUAL_BANK_TRANSFER_ENABLED` to `true` in `lib/course-products.ts` and configure these values server-side:

```env
COURSE_PAYMENT_BANK_NAME=
COURSE_PAYMENT_ACCOUNT_NUMBER=
COURSE_PAYMENT_ACCOUNT_NAME=
COURSE_PAYMENT_WHATSAPP_NUMBER=
```

Do not prefix these values with `NEXT_PUBLIC_`. If any transfer detail is missing or invalid, the app does not show bank transfer instructions.

Apply `supabase/migrations/011_paystack_course_payments.sql` after the existing schema and course migrations. It creates the RLS-protected payment ledger used for transaction references, amounts, statuses, and provider IDs. Only the server-side service role can create or update payment records; learners and admins can read only the rows permitted by the table policies.

Apply `supabase/migrations/012_lesson_progress_permissions.sql` to allow authenticated learners to upsert and remove their own lesson-completion records. Row-level security restricts both operations to the learner's own records.
