-- ituwaAfrica — Align course slugs and titles to match curriculum standards
-- Run this in the Supabase SQL editor.

-- 1. Align Course 4: AI Web App Development (update slug from build-helpful-ai-app to ai-web-app-development)
update public.courses
set slug = 'ai-web-app-development',
    title = 'AI Web App Development',
    academy = 'AI App Development',
    description = 'Learn how to build a simple, useful web app with AI assistance, from problem definition and interface planning to testing and deployment.',
    access = 'paid',
    updated_at = now()
where slug = 'build-helpful-ai-app' or slug = 'build-a-helpful-ai-app';

-- 2. Align Course 5: YouTube Monetization (update slug from youtube-automation-monetization-masterclass to youtube-monetization)
update public.courses
set slug = 'youtube-monetization',
    title = 'YouTube Monetization',
    academy = 'Creator Economy & YouTube',
    description = 'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    access = 'paid',
    updated_at = now()
where slug = 'youtube-automation-monetization-masterclass';

-- 3. Verify all 6 core courses exist with their standard slugs and access tiers
insert into public.courses (id, title, slug, description, academy, status, access)
values
  (
    '11111111-0000-0000-0000-000000000001',
    'AI Foundations',
    'ai-toolkit-practical-start',
    'Build a practical understanding of AI tools, write clearer prompts, and apply what you learn to a real task.',
    'AI Foundations',
    'published',
    'free'
  ),
  (
    '11111111-0000-0000-0000-000000000015',
    'AI Video Creation',
    'ai-video-creation',
    'Plan and produce original AI-assisted videos, with attention to storytelling, audience value, and disclosure.',
    'AI Video Creation',
    'draft',
    'paid'
  ),
  (
    '11111111-0000-0000-0000-000000000017',
    'AI Content Marketing for Business',
    'ai-content-marketing-for-business',
    'Turn a client brief into audience-focused social captions, ad copy, and email campaigns with AI, then refine the work through a repeatable workflow and portfolio-ready samples.',
    'AI Content Marketing',
    'draft',
    'paid'
  ),
  (
    '11111111-0000-0000-0000-000000000006',
    'AI Web App Development',
    'ai-web-app-development',
    'Learn how to build a simple, useful web app with AI assistance, from problem definition and interface planning to testing and deployment.',
    'AI App Development',
    'draft',
    'paid'
  ),
  (
    '11111111-0000-0000-0000-000000000007',
    'YouTube Monetization',
    'youtube-monetization',
    'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    'Creator Economy & YouTube',
    'draft',
    'paid'
  ),
  (
    '11111111-0000-0000-0000-000000000016',
    'AI Graphic Design',
    'ai-graphic-design',
    'Create original, useful visual assets with AI-assisted design techniques and prepare them for real projects.',
    'AI Graphic Design',
    'draft',
    'paid'
  )
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    academy = excluded.academy,
    access = excluded.access,
    updated_at = now();
