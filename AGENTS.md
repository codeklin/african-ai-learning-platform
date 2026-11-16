1. Project Identity
This repository contains the official application for ItuwaAfrica, an independent, Africa-focused AI learning and professional skills platform.
Primary audience: Aspiring freelancers and existing digital professionals.
Primary market: Nigeria.
Expansion market: Africa.
Core mission: Help learners acquire practical AI skills, complete projects and develop commercially useful capabilities.
The application must prioritize learning outcomes, security, maintainability and accessibility.
2. Core Technology
Next.js App Router — pinned to 16.4.6 (do not upgrade without explicit instruction).
TypeScript — 5.7.3.
Tailwind CSS v4.
@supabase/supabase-js — 2.119.0.
@supabase/ssr — 0.12.7 (use this for server-side Supabase clients in middleware, server components and route handlers; do not use the legacy auth-helpers package).
PostgreSQL (via Supabase).
Supabase Auth.
Supabase Storage.
Baloo 2 (via next/font/google) — primary UI font, weights 400–800.
Zod.
React Hook Form.
Lucide icons.
Vercel deployment.
Use established project conventions and installed dependency versions.
Do not introduce unnecessary libraries.
When creating Supabase clients:
Server components and server actions → createServerClient from @supabase/ssr with cookie helpers.
Proxy (proxy.ts) → createServerClient from @supabase/ssr via lib/supabase/proxy.ts.
Client components → createBrowserClient from @supabase/ssr.
Never instantiate createClient from @supabase/supabase-js directly in client components.
Next.js 16 renames middleware.ts to proxy.ts and the export from middleware to proxy.
Use proxy.ts at the project root (not middleware.ts — that convention is deprecated).
The session helper lives in lib/supabase/proxy.ts (not lib/supabase/middleware.ts).
3. Product Principles
Always prioritize:
Mobile-first design.
Low-bandwidth usability.
Clear learning workflows.
Practical course delivery.
Secure user data.
Accessible navigation.
Reusable components.
Maintainable code.
Honest product states.
Real functionality over decorative mockups.
4. Brand and UI Rules
Primary background: #FAF5EE (Warm oat cream).
Primary text: #2C1A12 (Deep espresso).
Primary accent: #E86A58 (Warm terracotta).
Secondary accent: #FFBA38 (Warm amber).
Status & success accent: #3DA872 (Jade green).
Supporting warm tones:
#FDEEE9 (Coral tint)
#EEF7EE (Sage tint)
#EEF3FC (Blue tint)
#F5EDFA (Lilac tint)
#FDF5E8 (Peach tint)
#EADBCE (Muted border)

STRICT ICONOGRAPHY & TYPOGRAPHY RULES:
- Absolutely NO emojis in app UI, headers, cards, badges, buttons, copies, or documentation. Emojis look generic, amateurish, and degrade the bespoke editorial feel of the app.
- NO generic or cliché icons: avoid generic rockets, lightning bolts, targets, generic flame symbols, or generic robot clipart.
- Use purposeful, tailored Lucide icons, editorial typographic index numbers (e.g. '01', '02', '03' in serif or bold sans), clean geometric lines, or custom badges.
- Minimum font size on mobile: Never render critical content, counts, or links under 12px. Headings must scale cleanly using clamp() without layout blowouts.
- Academy and course cards must be single-column (1 card per row) on mobile screens (≤768px). Never squeeze cards horizontally into multi-column rows on phones.
- Mobile bottom navigation (<AppBottomNav />) must remain persistent and accessible across all authenticated pages (Dashboard, Courses, Course Detail, Challenges, Profile).
- Top navigation headers must remain sticky on scroll (position: sticky; top: 0) with a frosted-glass blur backdrop, using overflow-x: clip on root documents.
- Authenticated user flow: Never show 'Log in' to an already logged-in user. Automatically redirect authenticated users from /login or /signup straight to /dashboard.
Maintain consistent design tokens.
Do not introduce random colors or inconsistent button styles.
Do not use generic AI robot graphics.
Use clean typography, thoughtful whitespace, subtle borders and restrained shadows.
All pages must be responsive.
5. Application Architecture
Use Next.js App Router.
Separate:
Public website.
Authenticated learner application.
Administrative application.
Server-side services.
Shared UI components.
Database types and queries.
Validation schemas.
Payment provider integrations.
Keep business logic out of presentation components.
Prefer server components where appropriate.
Use client components only when interactivity requires them.
Use server actions or route handlers for authorized server-side mutations.
6. Authentication and Authorization
Supabase Auth is the authentication source of truth.
Application roles:
learner
instructor
admin
Roles must never be trusted from client-side state or user-editable profile metadata.
Use a trusted database role assignment mechanism.
Protect all administrative actions server-side.
Never rely only on hiding an admin button to enforce permissions.
Users must only access their own private learner data unless a specific authorized sharing workflow exists.
7. Database and RLS Rules
All user-owned data must be protected by RLS.
Every new table must have:
Primary key.
Appropriate foreign keys.
Timestamps.
Required indexes.
RLS policies.
Defined ownership rules.
Use migrations for schema changes.
Never make undocumented production database changes.
Never disable RLS as a shortcut.
Use service-role access only in trusted server-side code.
Do not expose secrets through NEXT_PUBLIC environment variables.
8. Course Content Rules
Course hierarchy:
Academy → Course → Module → Lesson.
Additional learning objects:
Quiz.
Assignment.
Challenge.
Project.
Certificate.
Course visibility:
Draft.
Published.
Archived.
Lesson visibility:
Draft.
Published.
Access levels:
Free.
Paid.
Preview.
Never expose unpublished content to unauthorized learners.
Course progress must be calculated using actual lesson completion records.
A user must not receive duplicate progress records for the same lesson.
Certificate issuance must follow explicit course completion and assessment rules.
9. Subscription and Payment Rules
Subscription status must be determined by verified server-side payment records and entitlements.
Never trust:
Browser payment success messages.
Client-provided prices.
Client-provided plan IDs without validation.
Client-provided subscription status.
Payment integrations must support:
Provider references.
Server-side verification.
Verified webhook processing.
Idempotency.
Payment history.
Refund and cancellation handling.
Audit records.
Webhook events must not be processed more than once.
If a payment provider is not configured, show a clear setup state.
Never fabricate payment success.
10. API and Validation Rules
Validate all untrusted input with Zod or equivalent schemas.
Validate:
Form inputs.
URL parameters.
Query parameters.
File uploads.
Server action inputs.
Webhook payloads.
Handle errors gracefully.
Return safe error messages.
Never expose database internals or secrets to users.
11. File Upload Rules
Use Supabase Storage.
Validate:
File size.
MIME type.
Permitted extensions.
Ownership.
Access permissions.
Do not allow arbitrary public access to private learner submissions.
Do not store uploaded file contents directly in database text fields.
12. Component Standards
Build reusable components for:
Buttons.
Inputs.
Dialogs.
Dropdowns.
Navigation.
Course cards.
Lesson lists.
Progress bars.
Empty states.
Loading states.
Error states.
Tables.
Charts.
Modals.
Maintain consistency across public, learner and admin interfaces.
Do not duplicate large components unnecessarily.
13. Performance Standards
Optimize for mobile devices and African connectivity conditions.
Use image optimization.
Avoid oversized assets.
Lazy-load noncritical media.
Avoid unnecessary API requests.
Paginate large lists.
Avoid loading entire course libraries unnecessarily.
Provide written lesson alternatives.
Avoid autoplaying videos.
Optimize database queries.
14. AI Integration Rules
The core application must work without an AI API key.
Future AI features may include:
AI learning assistant.
Course recommendation.
Prompt practice.
Assignment feedback.
Freelance service guidance.
All AI API calls must happen securely on the server.
Set usage limits and monitor cost.
Never send private learner information to an AI provider without an appropriate purpose and disclosure.
15. Code Quality Rules
Use TypeScript strict mode.
Avoid any unless explicitly justified.
Use clear naming.
Keep functions focused.
Avoid unnecessary abstractions.
Reuse existing components.
Document non-obvious business logic.
Avoid dead code.
Remove debug statements before production.
Keep dependencies minimal.
16. Testing Requirements
Test critical workflows:
Authentication:
Registration.
Login.
Logout.
Password recovery.
Learning:
Course access.
Lesson navigation.
Progress updates.
Quiz submission.
Assignment submission.
Billing:
Payment initiation.
Payment verification.
Duplicate webhook prevention.
Subscription expiry.
Cancellation.
Security:
Unauthorized admin access.
Cross-user data access.
RLS enforcement.
Protected storage.
Run linting, type checks and relevant tests before completing significant changes.
17. Development Workflow
Before modifying existing functionality:
Inspect the relevant files.
Understand existing architecture.
Identify dependencies.
Preserve working functionality.
Plan the change.
Implement the smallest suitable solution.
Test affected workflows.
Report what changed.
Do not rewrite working modules without a valid reason.
Do not replace real integrations with fake implementations.
If an external service is not configured, document the missing configuration.
18. Environment Variables
Maintain .env.example.
Expected variables:
NEXT_PUBLIC_SUPABASE_URL=          # Supabase project URL (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anon key (safe to expose)
SUPABASE_SERVICE_ROLE_KEY=         # Service role key — server-side only, never NEXT_PUBLIC
NEXT_PUBLIC_APP_URL=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=
FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_WEBHOOK_HASH=
GEMINI_API_KEY=
EMAIL_PROVIDER_API_KEY=
Only implement variables needed by enabled features.
Never commit .env.local or production secrets.
Never prefix secrets with NEXT_PUBLIC — that exposes them to the browser bundle.
19. Documentation
Update README.md when:
Setup steps change.
Dependencies change.
Environment variables change.
Database migrations are introduced.
Payment integrations are added.
Deployment requirements change.
Document important architectural decisions.
20. Definition of Done
A feature is complete only when:
Its intended user flow works.
Its UI is responsive.
Validation exists.
Authorization exists.
Error states are handled.
Relevant tests pass.
No secrets are exposed.
Documentation is updated when necessary.
21. Creator Economy & YouTube Academy Rules
The platform supports education about YouTube channel development, content production, creator businesses and monetization.
Course content must distinguish between:
Channel growth strategies.
YouTube Partner Program eligibility.
Advertising revenue.
Alternative creator revenue.
Copyright.
Reused content.
Inauthentic or mass-produced content.
AI-generated and altered content disclosures.
Never promise monetization approval or guaranteed income.
YouTube policies change. Policy-dependent course material must include its source, last-reviewed date and review status.
Students must be taught to create original and valuable content, even when using AI-assisted production tools.
Practical assignments must assess content originality, audience value, production quality and policy compliance.

22. Official Course Lineup, Slugs, and Pricing Standards
The platform defines six core course offerings:
1. AI Foundations — slug: `ai-toolkit-practical-start` | Access: Free | Status: Published.
2. AI Video Creation — slug: `ai-video-creation` | Price: $4 | Access: Paid | Status: Draft.
3. AI Content Marketing for Business — slug: `ai-content-marketing-for-business` | Price: ₦15,000 | Access: Paid | Status: Draft.
4. AI Web App Development — slug: `ai-web-app-development` | Price: ₦20,000 | Access: Paid | Status: Draft.
5. YouTube Monetization — slug: `youtube-monetization` | Price: ₦10,000 | Access: Paid | Status: Draft.
6. AI Graphic Design — slug: `ai-graphic-design` | Price: $4 | Access: Paid | Status: Draft.

Database & Query Integrity:
- Database slugs must match primary URL slugs.
- Because lessons enforce UNIQUE(course_id, slug), lesson queries must ALWAYS filter by both `course_id` and `slug` (never by `slug` alone).

Never mark a feature complete solely because its interface has been built.
