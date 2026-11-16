-- ituwaAfrica : Seed Lessons for Courses 2, 4, 5, 6 + YouTube Freebie Videos
-- Run this in the Supabase SQL Editor AFTER migration 009.

-- ═══════════════════════════════════════════════════════════════
-- COURSE 2: AI VIDEO CREATION  (11111111-0000-0000-0000-000000000015)
-- YouTube freebie: lesson-1 → Xlbe16Kw49k, lesson-2 → smWSKscrJ1k
-- ═══════════════════════════════════════════════════════════════

-- Module 1: Planning an Original Video (22222222-0000-0000-0000-000000000031)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, youtube_video_id, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000031',
  'lesson-1',
  'The Purpose of Your Video and Who It Is For',
  1, 'video', 'free', 'published', 4,
  'Xlbe16Kw49k',
  'Never generate random pretty videos. Pick one specific question to answer or one story to tell. Before opening any AI tool, write down: who exactly is watching this, and what single insight or action should they take away? Great short-form video starts with intent, not technology.',
  'Define your audience and single objective first. Every clip, word, and transition must serve that one clear purpose.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  youtube_video_id = excluded.youtube_video_id,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, youtube_video_id, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000031',
  'lesson-2',
  'Writing a Short 45-Second Hook-and-Hold Script',
  2, 'video', 'free', 'published', 5,
  'smWSKscrJ1k',
  'Structure a 3-part script optimized for vertical retention on Shorts, Reels, and TikTok. Part 1 : the Hook (0–4 seconds, ~10 words): stop the thumb scroll with a sharp question or statement. Part 2 : the Core Insight (5–35 seconds, ~60 words): deliver value in 3 distinct beats. Part 3 : the Takeaway and CTA (36–45 seconds, ~20 words): one clear lesson and one clear action.',
  'Write your 45-second script in full before generating a single AI clip. 90 to 110 words is the target. If you cannot write it, you cannot film it.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  youtube_video_id = excluded.youtube_video_id,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000031',
  'lesson-3',
  'Storyboarding and Scene Planning',
  3, 'text', 'paid', 'published', 4,
  'Break a script into 5 to 7 specific visual scenes before opening an AI generator. Write each scene as: duration, what the camera shows, what the voice says. Scene 1 (0–5s): close-up of laptop vents blocked by a bedsheet. Scene 2 (5–15s): overheating warning on screen. Scene 3 (15–25s): laptop elevated with airflow. Scene 4 (25–35s): battery gauge at 80%. Scene 5 (35–45s): creator working smoothly at desk.',
  'Your storyboard is your production brief. Without it, AI generators produce random disconnected clips that waste your free credits.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 2: Creating Visuals and Audio (22222222-0000-0000-0000-000000000032)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000032',
  'lesson-4',
  'Generating Clean Scene Visuals with AI',
  4, 'text', 'paid', 'published', 5,
  'Prompt AI video and image tools for focused camera motion, realistic lighting, and stable subjects. Always include explicit cinematic direction: "slow smooth camera dolly-in, 4k cinematic lighting, shallow depth of field, steady focus." Avoid the words "dynamic" or "energetic" unless you want chaotic rapid cuts. Use Pika, Kling, or Runway on their free credit tiers.',
  'Specific prompt direction = predictable, usable results. Generic prompts = random visuals that waste free generation credits.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000032',
  'lesson-5',
  'Maintaining Visual Consistency Across Scenes',
  5, 'text', 'paid', 'published', 4,
  'Keep lighting, color palette, and character details identical across all 5 to 7 scenes. Technique: keep a fixed style seed or use image-to-video reference. Maintain identical color grade keywords in every scene prompt : for example, "warm amber lighting, cinematic natural contrast." If you change tools between scenes, re-describe the visual style word for word.',
  'Visual consistency makes your video look professional and intentional. Inconsistency is the most common beginner mistake in AI video production.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000032',
  'lesson-6',
  'Generating Natural Voice Narration',
  6, 'text', 'paid', 'published', 4,
  'Convert your script text into realistic speech using ElevenLabs (free tier) or CapCut native Text-to-Speech voices. The key to natural pacing is punctuation: add commas and periods to force the voice AI to breathe and pause between thoughts. Test the audio at 1x speed with headphones. If you would not say it that way, the AI should not either.',
  'Voiceover pacing is controlled by punctuation, not by settings. Use commas as breath marks and periods as full stops in your spoken script.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 3: Assembly, Subtitling, and Packaging (22222222-0000-0000-0000-000000000033)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000033',
  'lesson-7',
  'Bringing Clips and Voice Together in CapCut',
  7, 'text', 'paid', 'published', 5,
  'Import your AI clips and voiceover audio into CapCut. Trim each clip so its action matches the spoken word at that moment. The core editing rule: cut on action. Never let a static scene linger for more than 3 to 4 seconds in short-form video. Mute the original clip audio. The voiceover drives the whole video : the visuals illustrate it.',
  'Cut on action. If the visuals and words do not match at every moment, viewers will scroll away.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000033',
  'lesson-8',
  'Adding Dynamic, Readable Subtitles',
  8, 'text', 'paid', 'published', 4,
  'Auto-generate subtitles in CapCut, then style them for phone visibility. Font: bold clean Sans-serif (Montserrat or Bold Canvas). Size: large enough to read on a 5-inch phone screen without squinting. Position: safe zone in the middle-third of the screen : avoid the bottom area where TikTok and Reels captions, hearts, and share buttons cover text. Fix Nigerian proper noun spellings manually.',
  'Subtitles are accessibility, not decoration. 70% of social media videos are watched on mute. If your subtitles are small or mispositioned, your message is lost.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000033',
  'lesson-9',
  'Adding Sound Effects and Background Music Responsibly',
  9, 'text', 'paid', 'published', 4,
  'Layer subtle sound effects (whooshes, soft clicks) and balance background music at 10% to 15% volume (approximately -20 dB to -24 dB), so your voiceover stays at 100% clarity. Rule: if a listener cannot clearly hear and understand every spoken word over the music, the music volume is too high. Source from CapCut free library or YouTube Audio Library.',
  'Voiceover at 100%. Music at 10% to 15%. If you can clearly sing along to the background music, it is too loud.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000015',
  '22222222-0000-0000-0000-000000000033',
  'lesson-10',
  'Reviewing Rights, Originality, and AI Content Disclosures',
  10, 'text', 'paid', 'published', 5,
  'Comply with YouTube, TikTok, and Meta AI transparency policies. When uploading to YouTube or TikTok, toggle the "Altered or Synthetic Content" disclosure switch if realistic scenes were generated with AI tools. Never present AI-generated characters as real human victims, witnesses, or officials. Original editorial commentary must be clearly present throughout the video.',
  'Disclosure is mandatory, not optional. Hiding AI generation risks strikes, demonetization, and content removal. Transparency protects your channel.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();


-- ═══════════════════════════════════════════════════════════════
-- COURSE 4: AI WEB APP DEVELOPMENT  (11111111-0000-0000-0000-000000000006)
-- YouTube freebie: lesson-1 → qIUZ_C5ki3g
-- ═══════════════════════════════════════════════════════════════

-- Module 1: Problem Definition and Minimal Scope (22222222-0000-0000-0000-000000000041)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, youtube_video_id, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000041',
  'lesson-1',
  'Finding One Small, Real Problem to Solve',
  1, 'video', 'free', 'published', 4,
  'qIUZ_C5ki3g',
  'Identify a focused, single-utility problem rather than an overwhelming multi-feature platform. Bad scope: "I want to build an AI app like Uber, Amazon, and Paystack combined." Good scope: "I want to build a simple calculator that helps Nigerian freelancers estimate total withholding tax and bank fees on an invoice." Small, specific, and solvable.',
  'The smaller and more specific your problem definition, the faster you will ship a working product. Start with one screen and one calculation.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  youtube_video_id = excluded.youtube_video_id,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000041',
  'lesson-2',
  'Defining Inputs, Outputs, and User Flow',
  2, 'text', 'paid', 'published', 4,
  'Map the exact 3-step user journey before writing a single line of code. Step 1 : Input: what does the user type or select? Step 2 : Processing: what calculation or logic runs? Step 3 : Output: what does the user see, copy, or share? Example: User enters gross amount and client type → app applies tax rate and fee formula → clean printable summary card with WhatsApp share button.',
  'Write your 3-step user flow on paper before opening any coding tool. If you cannot explain the flow in one sentence, the scope is still too vague.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000041',
  'lesson-3',
  'The MVP Rule: What to Leave Out of Version 1',
  3, 'text', 'paid', 'published', 4,
  'Identify non-essential features and cut them so you can ship a working version in days, not months. The rule: if the app cannot solve the problem without this feature, keep it. If it is decorative (custom profile pictures, dark mode toggle, complex social login), remove it from Version 1. Shipping a simple working app is infinitely more valuable than endlessly planning a perfect one.',
  'Write a "not in V1" list before you start. Every feature on that list protects your launch date.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 2: Prompting AI Coding Assistants (22222222-0000-0000-0000-000000000042)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000042',
  'lesson-4',
  'Writing Build Instructions for AI Coding Assistants',
  4, 'text', 'paid', 'published', 5,
  'Structure technical prompts for AI tools (Claude, Cursor, ChatGPT) using the Developer Prompt Formula: state your tech stack clearly (Next.js App Router, TypeScript, Tailwind CSS), define exact user inputs and their types, describe the processing logic step by step, specify output format and design constraints. Include your brand colors and mobile-first requirement. The more precise your prompt, the less back-and-forth you need.',
  'A well-structured build prompt can generate 80% of a working component in one shot. Vague prompts generate vague code.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000042',
  'lesson-5',
  'Generating a Mobile-Responsive Interface',
  5, 'text', 'paid', 'published', 4,
  'Prompt and refine responsive layouts that fit perfectly on 360px mobile screens as well as laptops. Mobile rule: use single-column layouts (flex-col), full-width buttons (w-full), and minimum touch target heights of 44px. Always test at 360px width first, then at 1024px. Over 80% of web traffic in Nigeria and Africa comes from mobile devices.',
  'Build mobile first, desktop second. If the layout breaks at 360px, the app is broken for most of your users.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000042',
  'lesson-6',
  'Adding State and Interactive Logic',
  6, 'text', 'paid', 'published', 5,
  'Implement React useState to handle live calculations, loading states, and instant user feedback. Every interactive element needs three states: idle (waiting for input), loading (processing), and result (showing output). Disable submit buttons during loading to prevent duplicate submissions. Show a friendly loading indicator so users know the app is working.',
  'State management is what separates a live interactive app from a static HTML page. Master useState before attempting anything complex.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 3: Data, APIs, and Safe Secret Handling (22222222-0000-0000-0000-000000000043)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000043',
  'lesson-7',
  'Connecting a Basic Data Store or Supabase Table',
  7, 'text', 'paid', 'published', 5,
  'Set up a free Supabase PostgreSQL database to store user submissions and read saved records. Steps: create a Supabase project, define a simple table (id, created_at, user input columns), enable Row Level Security, and query it from your Next.js Server Component using the anon key. Never call the database directly from client components without RLS protection.',
  'Supabase gives you a production-grade database for free. RLS is not optional : it is what prevents one user from reading another user''s data.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000043',
  'lesson-8',
  'Safe API Key Handling: Protecting Secrets on the Server',
  8, 'text', 'paid', 'published', 5,
  'Understand why API keys and database service keys must NEVER be in frontend code. NEXT_PUBLIC_ variables are visible to anyone who opens browser DevTools. Private secrets (Gemini API keys, Paystack Secret Keys, Supabase Service Role Key) must only be called in Next.js Server Actions or API Route Handlers in app/api/. Rule: if the variable name does not start with NEXT_PUBLIC_, it stays on the server.',
  'One leaked API key can cost you thousands of naira in unauthorized charges. Keep secrets server-side, always.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000043',
  'lesson-9',
  'Handling Errors and Failed Requests Gracefully',
  9, 'text', 'paid', 'published', 4,
  'Build resilient error states for when network connectivity drops or third-party APIs fail. Show friendly error messages ("Network timeout. Check your data and retry."). Disable buttons during loading to prevent double-charging or duplicate submissions. Wrap async calls in try/catch and always handle both the success and error branches. Never show raw error messages from your database or API to the end user.',
  'Error handling is a feature, not an afterthought. Users in low-signal environments need clear, friendly feedback when requests fail.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 4: Testing, Deployment, and Review (22222222-0000-0000-0000-000000000044)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000044',
  'lesson-10',
  'Testing on Mobile and Edge-Case Inputs',
  10, 'text', 'paid', 'published', 4,
  'Test zero inputs, negative numbers, extreme character lengths, and small screens before deploying. Test on an actual phone, not just browser DevTools. Edge cases to test: empty form submit, very long text strings, negative amounts, special characters, and simultaneous rapid taps on the submit button. Document each test with the input you used and the result you got.',
  'If you have not tested it on your own phone, it is not ready for your users to test on theirs.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000044',
  'lesson-11',
  'Free Deployment on Vercel',
  11, 'text', 'paid', 'published', 4,
  'Connect a GitHub repository to Vercel, set production environment variables, and deploy a live .vercel.app URL. Steps: push your project to GitHub, sign in to vercel.com with GitHub, import the repository, add your environment variables in the Vercel dashboard (not in .env committed to git), and click Deploy. The first deploy is free and permanent.',
  'A live URL is proof of work. No one can evaluate, use, or hire you based on a local localhost app. Deploy early and share the link.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000006',
  '22222222-0000-0000-0000-000000000044',
  'lesson-12',
  'Presenting Your App and Explaining Its Limitations',
  12, 'text', 'paid', 'published', 4,
  'Write a clear README.md and user disclaimer explaining what the app does, its known limitations, and privacy boundaries. A professional README includes: what the app is, who it is for, how to use it (with one screenshot), known limitations, and privacy note. When presenting your app to a client or employer, always lead with what it can do, then clearly state what it cannot do yet.',
  'Honest, clear documentation builds trust. Clients who understand the limitations are clients who do not complain when they discover them.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();


-- ═══════════════════════════════════════════════════════════════
-- COURSE 5: YOUTUBE MONETIZATION  (11111111-0000-0000-0000-000000000007)
-- lesson-1 is a free preview. Remaining lessons are paid.
-- ═══════════════════════════════════════════════════════════════

-- Module 1: Channel Foundations and Audience Value (22222222-0000-0000-0000-000000000051)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000051',
  'lesson-1',
  'How the YouTube Platform Actually Works',
  1, 'text', 'free', 'published', 4,
  'YouTube''s algorithm does not push videos : viewers pull them. The algorithm simply follows what viewers click and keep watching. The two metrics that drive distribution are Click-Through Rate (CTR: how many people click your thumbnail when shown it) and Average View Duration (AVD: what percentage of your video viewers watch before leaving). A video with 10% CTR and 60% AVD will reach far more people than a video with 1% CTR and 20% AVD.',
  'Optimize for clicks and watch time, not just upload frequency. One well-packaged video outperforms ten poorly packaged ones.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000051',
  'lesson-2',
  'Choosing a Specific Channel Topic and Audience Promise',
  2, 'text', 'paid', 'published', 4,
  'Define a clear, focused channel proposition that gives viewers a reason to subscribe. Use the Channel Proposition Formula: "I help [specific audience] learn or achieve [specific outcome] through [practical, original content]." Bad example: "I talk about everything." Good example: "I help Nigerian freelancers and traders understand money, taxes, and digital tools through practical 5-minute tutorials."',
  'Your channel topic is a promise to a specific person. The narrower and more specific the promise, the easier it is for YouTube to find the right audience for your videos.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000051',
  'lesson-3',
  'Researching Demand and Validating Video Topics',
  3, 'text', 'paid', 'published', 5,
  'Validate topic interest before filming using three free methods: YouTube search auto-suggest (type a half-sentence and see what YouTube predicts), competitor analysis (what are channels in your space making that gets views?), and viewer question gaps (what questions does the audience ask in comments that no video answers well?). Never film a video idea you like before confirming people are searching for it.',
  'Demand validation before production prevents wasted filming time. Prove people want the video before you make it.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 2: Video Ideation, Scripting, and Packaging (22222222-0000-0000-0000-000000000052)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000052',
  'lesson-4',
  'Crafting Titles That Spark Curiosity Honestly',
  4, 'text', 'paid', 'published', 4,
  'Write titles that generate genuine curiosity without misleading viewers (clickbait). The rule: your video must deliver on every promise made in the title within the first 60 seconds. Good title formulas: "How [result] without [common obstacle]", "[Number] [specific thing] that [specific audience] always gets wrong", "Why [counterintuitive claim] (explained simply)". Bad title: "You will not believe this!!!" Good title: "Why Nigerian Creators Get Demonetized (and how to avoid it)".',
  'A title is a contract with the viewer. Break that contract and they leave : permanently. Write the title that the video actually delivers on.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000052',
  'lesson-5',
  'Designing High-Contrast, Legible Mobile Thumbnails',
  5, 'text', 'paid', 'published', 4,
  'Design thumbnails in Canva that are instantly legible on small phone screens. The Rule of Three Elements: (1) a clear facial expression or primary object, (2) a high-contrast background, (3) a maximum of 3 to 4 bold words, or zero words. Test your thumbnail by shrinking it to the size of a fingernail. If you cannot read the text at that size, it will not work on mobile. Use Canva (free) to design at 1280x720px.',
  'Most viewers see your thumbnail on a phone screen smaller than their palm. Design for the smallest viewer, not the largest monitor.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000052',
  'lesson-6',
  'Writing Video Scripts That Retain Viewers',
  6, 'text', 'paid', 'published', 5,
  'Script a structured 5- to 8-minute video that hooks viewers, eliminates fluff, and keeps engagement high. Script structure: The Hook (0–30s) : confirm the title promise immediately, do not delay; The Meat (30s–6m) : deliver 3 actionable points with visual examples or demonstrations; The Payoff (6m–7m) : final synthesis and recommendation for the next video to watch. Remove every sentence that does not serve the viewer.',
  'Every second of your script must earn its place. If a sentence does not teach, demonstrate, or progress, cut it.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 3: Policies, Copyright, and Synthetic Content Rules (22222222-0000-0000-0000-000000000053)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000053',
  'lesson-7',
  'The YouTube Partner Program (YPP) Requirements',
  7, 'text', 'paid', 'published', 4,
  'Understand official YPP thresholds: 1,000 subscribers and 4,000 public watch hours in the past 12 months (or 10 million Shorts views), plus an AdSense account and no active Community Guideline strikes. Important: thresholds change. Always verify current requirements directly on the official YouTube Help Center (support.google.com/youtube). Completing this course does not guarantee monetization approval : only original, policy-compliant content can do that.',
  'Policy notice: YouTube monetization thresholds are reviewed periodically and may change. Always confirm current requirements at the official YouTube Help Center before making decisions.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000053',
  'lesson-8',
  'Copyright, Fair Use, and Avoiding Content Strikes',
  8, 'text', 'paid', 'published', 5,
  'Understand copyright protection, fair use boundaries, and how to source music safely. Using popular commercial songs without a license will trigger Content ID claims or copyright strikes. Safe music sources: YouTube Studio Audio Library (free and license-cleared), Epidemic Sound (paid), or original music. Fair use does not protect you from Content ID claims : it is a legal defense, not a shield. When in doubt, do not use the music.',
  'A copyright strike can delete your channel. Source only from the YouTube Audio Library or confirmed royalty-free libraries. When in doubt, leave it out.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000053',
  'lesson-9',
  'Reused Content and Inauthentic / Spam Policies',
  9, 'text', 'paid', 'published', 5,
  'YouTube''s Reused Content policy rejects channels that simply re-upload clips from movies, TV shows, or other creators without substantial original commentary, educational transformation, or added value. Mass-produced AI-generated videos with no human voice, editorial judgement, or original insight are treated as spam. The key requirement: human editorial commentary, genuine original value, or educational transformation must be clearly present throughout.',
  'AI tools can help you produce content faster, but they cannot replace your original voice, perspective, and human judgment. That is what YouTube is actually assessing.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000053',
  'lesson-10',
  'Disclosing AI-Generated and Altered Content',
  10, 'text', 'paid', 'published', 4,
  'Learn when and how to select the "Altered or synthetic content" label in YouTube Studio when uploading AI-generated media. The label is required when: realistic scenes depict people, places, or events that did not happen; a real person''s voice or face has been digitally generated; footage has been digitally altered to show something misleading. Hiding AI generation risks demonetization, content removal, or channel termination.',
  'Disclosure is not weakness : it is compliance. Transparent channels build long-term audience trust. Hidden AI content puts your channel at existential risk.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 4: Monetization Beyond AdSense and Channel Growth (22222222-0000-0000-0000-000000000054)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000054',
  'lesson-11',
  'Diversified Revenue: Sponsorships, Digital Products, and Services',
  11, 'text', 'paid', 'published', 5,
  'Structure revenue streams that do not depend solely on AdSense ad clicks. Sponsorships: local Nigerian brands will pay for product placements and shoutouts even at 1,000 to 5,000 subscribers if the audience is highly relevant. Digital products: sell your own PDF guides, Canva templates, or mini-courses. Services: use your channel as a portfolio to attract freelance consulting or content creation clients. AdSense is the least reliable income stream, not the goal.',
  'AdSense pays cents per view. A single sponsorship deal or digital product sale can pay more than 10,000 AdSense views. Build multiple revenue paths from day one.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000054',
  'lesson-12',
  'Reading YouTube Analytics as Learning Feedback',
  12, 'text', 'paid', 'published', 4,
  'Analyze audience retention graphs to find exactly where viewers drop off and improve your pacing for future videos. Key metrics: Impressions Click-Through Rate (aim for 4–10%), Average View Duration (aim for 40–60%), Top Traffic Sources (search vs. suggested vs. external). If viewers drop off in the first 30 seconds, your hook needs work. If they drop at 50%, your middle section lost them. Analytics tells you exactly what to fix.',
  'Every video you upload is a free data point. Analyze the retention curve before scripting your next video : it shows you exactly what your audience wants more of.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000007',
  '22222222-0000-0000-0000-000000000054',
  'lesson-13',
  'Building a Sustainable 30-Day Publishing Rhythm',
  13, 'text', 'paid', 'published', 4,
  'Plan an achievable release schedule (1 high-quality video per week) that avoids burnout. Batch production: script 4 videos in one session, record 4 videos in one session, edit across the week. Publish on a fixed weekday so your audience knows when to expect you. Consistency over 90 days matters more than production perfection on day one. A channel that publishes reliably for 3 months will outperform a channel that publishes 20 videos in one week and then stops.',
  'Consistency compounds. One video per week for 52 weeks beats ten videos in January and silence for the rest of the year.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();


-- ═══════════════════════════════════════════════════════════════
-- COURSE 6: AI GRAPHIC DESIGN  (11111111-0000-0000-0000-000000000016)
-- lesson-1 is a free preview. Remaining lessons are paid.
-- ═══════════════════════════════════════════════════════════════

-- Module 1: Design Fundamentals and Visual Hierarchy (22222222-0000-0000-0000-000000000061)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000061',
  'lesson-1',
  'The Purpose of Every Design: Information First',
  1, 'text', 'free', 'published', 4,
  'Commercial graphic design is visual communication that solves a problem, not decorative art. A flyer has 3 seconds to catch someone''s eye on a phone screen. If the viewer cannot immediately identify what you are selling, how much it costs, and who to contact, the flyer has failed. Start every design by placing these three pieces of critical information in plain text first. Add decoration after information is clear.',
  'Information first, decoration second. Write the 3 core facts on a blank canvas before adding any color, shape, or image.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000061',
  'lesson-2',
  'Visual Hierarchy: What the Eye Sees First, Second, and Last',
  2, 'text', 'paid', 'published', 4,
  'Structure layout size and contrast so the viewer reads information in an intentional sequence. The Big (Headline at 48px bold): seen first. The Medium (Supporting detail / Date / Price at 24px semi-bold): seen second. The Small (Terms, address, contact at 14px regular): seen third. Rule: zoom your design out to 25% (phone view) and check if the eye naturally reads the headline first. If it does not, your hierarchy is broken.',
  'Every design element has a visual weight. Control weight through size and contrast, not color variety. Size is the most powerful hierarchy tool.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000061',
  'lesson-3',
  'Typography and High-Contrast Readability',
  3, 'text', 'paid', 'published', 4,
  'Pair 2 legible fonts and maintain strong contrast against backgrounds. Rule 1: never use more than 2 font families on a commercial flyer. Rule 2: dark text on light background, or light text on dark background. Never low-contrast gray on beige. Good pairs: Montserrat Bold (header) + Inter Regular (body); League Spartan (header) + Open Sans (body). Test legibility by zooming out to 25% : if you cannot read it clearly, your client''s customers cannot either.',
  'Two fonts. High contrast. No exceptions. Every design that breaks this rule looks amateur at first glance.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 2: AI Visual Generation and Element Sourcing (22222222-0000-0000-0000-000000000062)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000062',
  'lesson-4',
  'Prompting AI for Specific Graphic Elements and Backgrounds',
  4, 'text', 'paid', 'published', 5,
  'Prompt image generators (Leonardo.ai, Recraft, Bing Image Creator) for isolated background textures, 3D icons, and realistic subjects without messy baked-in text. The critical rule: never ask AI generators to write text on your design. AI generates garbled, misspelled letters. Use AI only for the visual image, then add crisp correct text in Canva. Always append "no text, no letters, no words" to every prompt.',
  'AI draws images. Canva writes text. Never combine the two tasks : always prompt visuals separately and add typography manually.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000062',
  'lesson-5',
  'Removing Backgrounds and Cleaning AI Artifacts',
  5, 'text', 'paid', 'published', 4,
  'Cut out AI-generated subjects cleanly using free background removal tools: Canva free background remover, photoroom.com, or remove.bg. After removing the background, zoom in on edges : fingers, hair strands, bottle corners, fabric seams : and confirm the cutout is clean and not jagged or smudged. Download as PNG with transparent background. A clean cutout on a white design background looks professional; a messy one looks rushed.',
  'Edge quality is what separates amateur cutouts from professional ones. Always zoom to 200% and inspect edges before using any cutout in a client design.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000062',
  'lesson-6',
  'Understanding Image Commercial Rights and Licenses',
  6, 'text', 'paid', 'published', 4,
  'Check the terms of service of every AI tool (Leonardo, Recraft, Midjourney) regarding commercial usage on free vs paid plans. Free plan images on some tools are non-commercial only. Never prompt using the name of a living individual artist to copy their exact style. Do not use celebrity faces or trademarked logos (Nike swoosh, Apple logo, Coca-Cola branding) on client advertisements. When in doubt, use an alternative visual approach.',
  'Read the commercial license terms before selling any AI-generated design to a client. Free image generation credits do not automatically grant commercial usage rights.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 3: Crafting Real Marketing Assets in Canva (22222222-0000-0000-0000-000000000063)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000063',
  'lesson-7',
  'Designing a Clean Promotional Event or Service Flyer',
  7, 'text', 'paid', 'published', 5,
  'Combine an AI background, brand color blocks, clear typography, and a prominent WhatsApp CTA in Canva. Canvas size: A5 or 1080x1350 (Vertical Portrait for Instagram). Structure: top 40% : catchy AI visual or clean photo; middle 40% : headline, event or service name, key details in high contrast; bottom 20% : date, location, and green WhatsApp contact badge. Keep the design to 3 colors maximum.',
  'Flyer structure is a formula, not a creative free-for-all. Top: attention. Middle: information. Bottom: action. Apply this order to every flyer you design.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000063',
  'lesson-8',
  'Designing an Instagram or WhatsApp Square Post',
  8, 'text', 'paid', 'published', 4,
  'Balance margins, negative space, and single-offer clarity in a 1:1 square canvas (1080x1080). Rule of Margins: never place text closer than 60px from any edge. Allow the design to breathe. Each square post should communicate one single offer or message. If you are trying to put two offers on one square post, design two separate posts.',
  'Negative space is not empty space : it is breathing room that draws attention to what matters. Respect the 60px margin rule on every edge.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000063',
  'lesson-9',
  'Creating a Product or Price Announcement Graphic',
  9, 'text', 'paid', 'published', 4,
  'Design an unambiguous price announcement or special bundle graphic. The key element is the Price Pill Badge: a rounded rectangle filled with warm amber (#FFBA38) or jade green (#3DA872) containing the price in deep espresso text (#2C1A12). Make the price the largest text element after the product name. Remove any decorative elements that compete with the price for visual attention.',
  'The price must be impossible to miss. If a customer has to search for the price on your graphic, the design has failed its primary commercial job.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

-- Module 4: Polish, Export, and Portfolio (22222222-0000-0000-0000-000000000064)
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000064',
  'lesson-10',
  'The 5-Point Quality Check: Spacing, Alignment, and Spelling',
  10, 'text', 'paid', 'published', 4,
  'Run a pre-flight quality inspection before sending any graphic to a client. The 5-Point Checklist: (1) phone numbers and spelling of addresses verified, (2) text aligned to a consistent margin (left-aligned or centered, never mixed randomly), (3) minimum font size on phone screen is legible (no critical text under 14px), (4) colors match the brand palette, (5) correct currency symbol used (₦ or $). Never send a design to a client you have not checked against all 5 points.',
  'A design with a spelling error or wrong phone number is worse than no design at all. The 5-point check takes 2 minutes and prevents professional embarrassment.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000064',
  'lesson-11',
  'Choosing the Right File Formats and Sizes',
  11, 'text', 'paid', 'published', 4,
  'Export web-optimized, crisp files without blurry pixelation or bloated file sizes. Format guide: PNG : best for social media posts with sharp text and solid colors; JPEG : best for complex photographic images to keep file sizes small; PDF Print : best for flyers going to a physical print shop. For WhatsApp and Instagram: export PNG at 1x. For print: export PDF at 300 DPI. Never send a JPEG with low quality compression to a client for a printed flyer.',
  'The right format is part of a professional handover. Always ask the client where the design will be used before choosing your export format.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();

insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values (
  '11111111-0000-0000-0000-000000000016',
  '22222222-0000-0000-0000-000000000064',
  'lesson-12',
  'Assembling Your 3-Piece Client Design Portfolio',
  12, 'text', 'paid', 'published', 4,
  'Present your 3 graphics in clean phone or flyer mockups to display in your freelance portfolio. Use Canva free mockup templates: place your flyer inside a phone screen mockup or a printed flyer on a desk mockup. This shows clients how the design looks in real life, not just on a white canvas. Write a one-paragraph design brief for each piece explaining your font choices, colors used, and AI tools applied.',
  'A portfolio of 3 strong, well-presented designs lands more clients than a folder of 30 mediocre ones. Quality and presentation matter more than quantity.'
)
on conflict (course_id, slug) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  position = excluded.position,
  lesson_type = excluded.lesson_type,
  access_level = excluded.access_level,
  status = excluded.status,
  read_time_min = excluded.read_time_min,
  body = excluded.body,
  takeaway = excluded.takeaway,
  updated_at = now();


-- ═══════════════════════════════════════════════════════════════
-- PUBLISH ALL 6 COURSES
-- ═══════════════════════════════════════════════════════════════
update public.courses
set status = 'published', updated_at = now()
where id in (
  '11111111-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000015',
  '11111111-0000-0000-0000-000000000006',
  '11111111-0000-0000-0000-000000000007',
  '11111111-0000-0000-0000-000000000016',
  '11111111-0000-0000-0000-000000000017'
);
