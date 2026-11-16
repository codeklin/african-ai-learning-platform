# ituwaAfrica

**Practical AI Education for Africa.**  
*Learn AI. Build Skills. Create Opportunities.*

---

## Welcome to ituwaAfrica

Most AI tutorials leave you with notebooks full of tips you never use. 

**ituwaAfrica is built differently.** 

We designed this platform for creators, freelancers, and ambitious professionals across Africa who want to stop passively watching tutorials and start building real work they can show to clients, employers, and audiences.

Whether you are writing your first structured prompt, building a faceless YouTube channel, automating daily routine tasks, or packaging a freelance service, ituwaAfrica gives you the tools, clarity, and hands-on practice to move your work forward.

---

## What Makes ituwaAfrica Different?

* **Learn by Making, Not Just Watching**: Every single lesson is tied to a small, tangible output. You don't just learn a concept—you leave with a finished draft, a workflow template, or a project deliverable.
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

### 3. AI Content Creation
Get past the blank page. Turn briefs into clear, compelling articles, social content, and client assets while maintaining your unique, authentic human voice.

### 4. AI Automation
Spend less time repeating small, tedious tasks. Learn how to connect tools, automate routine workflows, and free up hours of your week.

### 5. AI Freelancing
Find a service you can offer and explain its value with confidence. Package your skills, pitch prospective clients, and deliver work that earns repeat business.

### 6. AI App Development
Turn an idea into a working product. Learn how to prototype helpful AI-powered tools and web apps that solve everyday problems for people in your community.

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
* **Small Business Owners & Professionals** wanting to save hours each week through smart automation.
* **Curious Beginners** who want clear, hype-free guidance on how artificial intelligence impacts everyday life and work.

---

## Start Where You Are. Build From There.

Curiosity is a skill. You don't need a massive plan or a technical background to begin—you just need twenty minutes and a desire to make something useful.

- **[Explore Courses](https://ituwa.africa/courses)**  
- **[Sign In to Your Dashboard](https://ituwa.africa/login)**

---

*ituwaAfrica is committed to transparent, skill-first education. We teach practical craft and creative discipline. Professional success and income depend on continuous practice, individual effort, and client value.*

## Current course lineup and bank transfers

The initial catalogue has one free course, **AI Foundations**, and four paid courses:

| Course | One-time price |
|---|---:|
| AI Video Creation | USD 4 |
| AI Web App Development | NGN 50,000 |
| YouTube Monetization | NGN 50,000 |
| AI Graphic Design | NGN 50,000 |

The four paid courses are currently in development and are offered as pre-orders. Learners see bank-transfer instructions after signing in and selecting **Buy course**. Transfer references are shared through WhatsApp. An administrator must verify the bank credit and record the enrollment; a receipt or learner message does not grant access. Lessons unlock only after the course is published and payment is verified. No release date is promised.

The purchase panel shows the exact NGN transfer amount and an indicative USD/NGN equivalent. Rates come from [ExchangeRate-API Open Access](https://www.exchangerate-api.com), are cached for up to 24 hours, and are attributed in the purchase panel. USD equivalents are estimates, not guaranteed exchange or settlement rates.

Configure these server-side environment variables in the local environment and Vercel before enabling purchase instructions:

```env
COURSE_PAYMENT_BANK_NAME=
COURSE_PAYMENT_ACCOUNT_NUMBER=
COURSE_PAYMENT_ACCOUNT_NAME=
COURSE_PAYMENT_WHATSAPP_NUMBER=
```

Do not prefix these values with `NEXT_PUBLIC_`. The purchase endpoint returns them only to an authenticated learner after a course purchase action. If any value is missing or invalid, the purchase panel reports that instructions are not configured.

Apply `supabase/migrations/003_course_focus_and_paid_access.sql` after the existing schema migrations, then apply `supabase/migrations/004_public_course_status_read.sql`. The latter grants the public course-status endpoint read access to only course slugs and statuses; row-level security continues to limit public reads to published courses. Migration `003` archives courses outside the initial lineup, records manual payment verification metadata, restricts paid enrollment to trusted admin actions, and prevents learners from changing their own account role.
