# ituwa

Practical AI education for Africa.
**Learn AI. Build Skills. Create Opportunities.**

## Overview

ituwa is an Africa-focused AI learning platform designed to help aspiring freelancers and digital professionals develop practical AI skills.

The platform provides structured learning pathways, short lessons, practical exercises, daily challenges, projects and certificates. Its goal is to help learners move beyond consuming AI tutorials and develop demonstrable skills that can be applied professionally.

- Initial market: Nigeria
- Expansion market: Africa

## Technology Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Auth, Database, Storage)
- PostgreSQL with RLS
- Vercel deployment
- Paystack / Flutterwave (when configured)
- Gemini API (optional AI features)

## Getting Started

### Requirements

- Node.js LTS
- pnpm
- Git
- Supabase account
- Vercel account (for deployment)

### Installation

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
pnpm install
cp .env.example .env.local
# Fill in .env.local with your Supabase keys
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=

FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_WEBHOOK_HASH=

GEMINI_API_KEY=
EMAIL_PROVIDER_API_KEY=
```

Only configure providers whose features have been implemented. Never commit real secrets.

### Database

Run the migration in the Supabase SQL editor:

```bash
supabase/migrations/001_initial_schema.sql
```

This creates all tables, RLS policies, and triggers including the auto-profile-creation trigger on sign-up.

## Learning Academies

1. AI Foundations
2. AI Content Creation
3. AI Freelancing
4. AI Automation
5. AI App Development
6. Creator Economy & YouTube

## Application Structure

```
app/
  (public pages)       — homepage, courses, course detail
  login/               — sign-in
  signup/              — registration
  dashboard/           — authenticated learner dashboard
  admin/               — admin panel (role-enforced)
  learn/               — lesson player
  auth/callback/       — Supabase auth callback
  actions/             — server actions

components/
  brand.tsx            — shared ituwa brand mark
  home-page.tsx        — public homepage
  lesson-preview.tsx   — lesson player component

lib/
  supabase/
    server.ts          — server client (anon + admin)
    client.ts          — browser client
    middleware.ts      — session refresh + route protection
  database.types.ts    — TypeScript database types

middleware.ts          — Next.js middleware

supabase/
  migrations/          — SQL migrations
```

## Security

- RLS enabled on all tables
- Roles read server-side from the database only — never from client state
- Service role key used only in server-side admin routes
- All secrets kept server-side — never prefixed `NEXT_PUBLIC`
- Payment verification is server-side only

## Development Standards

Follow `AGENST.md` for all code standards, architecture decisions, and product rules.

---

*ituwa provides education and skill-development resources. It does not guarantee employment, freelance contracts, income or professional accreditation.*
