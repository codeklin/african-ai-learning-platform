-- ituwaAfrica : Complete Curriculum Seeding Migration
-- Run this in the Supabase SQL Editor.

-- ── 1. MODULES ────────────────────────────────────────────────
insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'Understanding What AI Can and Cannot Do', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'The Shape of a Clear Prompt', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'Fixing Poor Answers and Reviewing Work', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000010', '11111111-0000-0000-0000-000000000001', 'Putting AI to Work on a Real Task', 4)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000031', '11111111-0000-0000-0000-000000000015', 'Planning an Original Video', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000032', '11111111-0000-0000-0000-000000000015', 'Creating Visuals and Audio', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000033', '11111111-0000-0000-0000-000000000015', 'Assembly, Subtitling, and Packaging', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000020', '11111111-0000-0000-0000-000000000017', 'Brief Analysis and Customer Research', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000021', '11111111-0000-0000-0000-000000000017', 'Drafting Social Media and Ad Copy', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000022', '11111111-0000-0000-0000-000000000017', 'Email Campaigns and Brand Consistency', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000023', '11111111-0000-0000-0000-000000000017', 'Content Workflow and Client Portfolio', 4)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000041', '11111111-0000-0000-0000-000000000006', 'Problem Definition and Minimal Scope', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000042', '11111111-0000-0000-0000-000000000006', 'Prompting AI Coding Assistants', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000043', '11111111-0000-0000-0000-000000000006', 'Data, APIs, and Safe Secret Handling', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000044', '11111111-0000-0000-0000-000000000006', 'Testing, Deployment, and Review', 4)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000051', '11111111-0000-0000-0000-000000000007', 'Channel Foundations and Audience Value', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000052', '11111111-0000-0000-0000-000000000007', 'Video Ideation, Scripting, and Packaging', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000053', '11111111-0000-0000-0000-000000000007', 'Policies, Copyright, and Synthetic Content Rules', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000054', '11111111-0000-0000-0000-000000000007', 'Monetization Beyond AdSense and Channel Growth', 4)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000061', '11111111-0000-0000-0000-000000000016', 'Design Fundamentals and Visual Hierarchy', 1)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000062', '11111111-0000-0000-0000-000000000016', 'AI Visual Generation and Element Sourcing', 2)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000063', '11111111-0000-0000-0000-000000000016', 'Crafting Real Marketing Assets in Canva', 3)
on conflict (id) do update set title = excluded.title, position = excluded.position;

insert into public.modules (id, course_id, title, position)
values ('22222222-0000-0000-0000-000000000064', '11111111-0000-0000-0000-000000000016', 'Polish, Export, and Portfolio', 4)
on conflict (id) do update set title = excluded.title, position = excluded.position;

-- ── 2. LESSONS: COURSE 1 (AI FOUNDATIONS) ─────────────────────
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'lesson-1', 'What AI Is in Simple Everyday Words', 1, 'text', 'free', 'published', 4, 'Artificial intelligence tools like ChatGPT and Google Gemini are text assistants. Think of AI as a very fast reader that has read millions of books and web pages. When you type an instruction, it predicts the most helpful words that should come next. It does not think like a human, and it does not know your personal situation unless you describe it.', 'AI is a pattern-based prediction tool. It turns your instructions into drafts, but your human direction and judgement guide the final result.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'lesson-2', 'What AI Does Well and Where It Fails', 2, 'text', 'free', 'published', 4, 'AI is great at drafting, summarizing, brainstorming, and fixing grammar. But AI has two big weaknesses: first, it can invent false facts with total confidence (hallucination). Second, it does not know current local prices or private facts unless you provide them. Always use AI to shape words, never to invent facts.', 'Use AI to organize your thoughts and write drafts, but never rely on it as an unquestioned source of truth for facts or prices.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'lesson-3', 'Setting Up Your Free AI Assistant on Phone or Laptop', 3, 'text', 'free', 'published', 3, 'You do not need a foreign dollar card or expensive equipment to learn AI. Visit chatgpt.com or gemini.google.com in your mobile browser, sign in with your regular Google account, and your free assistant is immediately ready to help with work, school, and business.', 'Generous free tiers exist on both ChatGPT and Gemini. You can learn and complete practical work without paying monthly fees.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000002', 'lesson-4', 'Give the AI One Specific Job', 4, 'text', 'free', 'published', 4, 'A prompt is the instruction you give an AI tool. If you give a vague prompt like "Write an email", you will get generic corporate fluff. Always follow the 3-part formula: Role + Specific Action + Topic. Tell the tool who it is, what exact action to take, and the specific topic.', 'Start every prompt by naming the role, the specific action, and the topic. Specificity produces high-quality drafts on the first try.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000002', 'lesson-5', 'Adding Context That Changes the Answer', 5, 'text', 'free', 'published', 4, 'Context means the background details that help the AI understand your exact situation. Include who the message is for, what relationship you have with them, and any specific numbers, amounts, or deadlines. Without context, the AI has to guess.', 'Include the audience, tone, and key facts. The more relevant details you provide, the less editing you will need to do.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000002', 'lesson-6', 'Setting Constraints and Output Format', 6, 'text', 'free', 'published', 4, 'By default, AI writes long essays with bullet points and headings you did not ask for. Set clear constraints like "under 50 words", "in 3 short bullet points", or "format as a 2-column table with no introduction". Constraints keep answers clean and immediately usable.', 'Tell the AI the exact structure and length you need before it generates the response.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000003', 'lesson-7', 'How to Improve a First Draft Without Starting Over', 7, 'text', 'free', 'published', 4, 'AI assistants remember the conversation in the chat thread. If an answer is too stiff or long, do not delete it and start over. Send a quick follow-up message: "Make this shorter, warm, and easy to read on a phone." The AI will refine its draft immediately.', 'Treat the AI like a conversational assistant. Give targeted follow-up instructions to steer the draft into the exact tone you need.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000003', 'lesson-8', 'Spotting AI Hallucinations and Fact-Checking', 8, 'text', 'free', 'published', 4, 'When an AI does not know an answer, it does not stop. It predicts words that sound convincing, often inventing fake quotes, phone numbers, or laws. If a number, name, or quote cannot be verified in 30 seconds on an official source, do not include it in your work.', 'Never send unverified AI claims to a client or supervisor. The responsibility for accuracy is always yours.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000003', 'lesson-9', 'Keeping Your Private Information Safe', 9, 'text', 'free', 'published', 3, 'Public AI tools learn from conversations. Never paste private passwords, bank verification numbers (BVN), national identity numbers (NIN), or confidential client secrets into a public AI prompt. Always sanitize documents by using generic placeholders like "Customer A".', 'Protect yourself and your clients: strip out private financial and personal details before pasting into AI.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000010', 'lesson-10', 'Using AI for Daily Communication and Work Tasks', 10, 'text', 'free', 'published', 4, 'AI helps you get past the blank page. Use it to draft supplier inquiries, apologize politely for delayed deliveries, or summarize long meeting notes. Provide the real facts of the situation, and let the AI give you a clean draft in ten seconds.', 'Use AI to accelerate routine communication so you can spend your energy on high-value client work and real business decisions.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000010', 'lesson-11', 'The 3-Step Human Review Rule', 11, 'text', 'free', 'published', 4, 'Before sending any AI-assisted work, apply the 3-step test: 1. Verify facts and numbers. 2. Remove overused AI clichés like "delve", "tapestry", and "furthermore". 3. Read it out loud. If it does not sound like a human talking, edit it until it does.', 'If an AI draft does not sound natural when read aloud, soften the words until it sounds like your authentic voice.')
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
values ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000010', 'lesson-12', 'Preparing Your Final Foundations Project', 12, 'text', 'free', 'published', 3, 'Complete your course by applying AI to one real task. Submit your initial prompt, the raw AI response, and your final human-edited version with a short 2-sentence note explaining what you changed and why.', 'You earn completion by shipping practical work. Real skill is proven by your ability to direct and refine AI output.')
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

-- ── 3. LESSONS: COURSE 3 (AI CONTENT MARKETING FOR BUSINESS) ───
insert into public.lessons (course_id, module_id, slug, title, position, lesson_type, access_level, status, read_time_min, body, takeaway)
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000020', 'lesson-1', 'Dissecting a Real Business Brief', 1, 'text', 'paid', 'published', 4, 'When clients send messy voice notes or disorganized WhatsApp messages, turn them into a 4-part brief: Target Customer, Core Offer, Business Goal, and Tone. Without this foundation, your content will attract vanity likes but zero paying customers.', 'Every effective marketing campaign starts by defining the customer, the offer, the action, and the brand voice.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000020', 'lesson-2', 'Uncovering Real Customer Questions and Pain Points with AI', 2, 'text', 'paid', 'published', 4, 'People buy solutions to their daily frustrations. Prompt AI to act as a consumer researcher and identify the specific daily struggles, sizing doubts, and delivery worries of your target audience. Turn each customer hesitation into a reassuring piece of content.', 'When your marketing speaks directly to a customer hesitation before they ask, you earn immediate trust.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000020', 'lesson-3', 'Setting Content Pillars for a Business', 3, 'text', 'paid', 'published', 4, 'Avoid posting "Buy now!" every day. Build a balanced 3-pillar content rhythm: 40% Education & Problem Solving, 30% Proof & Quality demonstrations, and 30% Direct Offers with clear pricing and WhatsApp calls to action.', 'Content pillars maintain balance so your social pages remain helpful, credible, and commercially effective.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000021', 'lesson-4', 'Writing Hook-Driven Instagram & LinkedIn Captions', 4, 'text', 'paid', 'published', 4, 'Structure captions using the 3-part framework: 1. A scroll-stopping hook on line 1 that calls out a relatable frustration. 2. Short 2-sentence body paragraphs that breathe on mobile screens. 3. One single call to action directing viewers to your bio link or WhatsApp.', 'Line 1 earns the click; the body delivers the value; the final line directs the sale.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000021', 'lesson-5', 'Crafting WhatsApp Broadcasts and Status Updates', 5, 'text', 'paid', 'published', 4, 'WhatsApp is an intimate personal space. Write short, respectful 3-part status series: Slide 1 introduces the weekend situation; Slide 2 shows the package with transparent pricing; Slide 3 sets a clear ordering deadline. Clear prices filter out time-wasters and attract ready buyers.', 'Transparent pricing and respectful communication convert WhatsApp contacts into repeat customers.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000021', 'lesson-6', 'Writing Short-Form Promotional and Ad Copy', 6, 'text', 'paid', 'published', 4, 'Paid ads must be concise and compliant. Avoid exaggerated income or health claims that trigger Meta ad account bans. Focus on presentation, confidence, and specific benefits, and always test two variations to find the winning angle.', 'Truthful, specific ad copy protects your ad account and converts better than hype.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000022', 'lesson-7', 'Writing Welcome and Follow-Up Email Sequences', 7, 'text', 'paid', 'published', 4, 'Nurture new subscribers with a 3-part welcome sequence: Email 1 delivers the promised resource; Email 2 shares an actionable insight or story; Email 3 presents your service offer with a single clear link.', 'Give value and demonstrate understanding before asking for the sale.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000022', 'lesson-8', 'Training AI on a Specific Brand Voice', 8, 'text', 'paid', 'published', 4, 'Never accept default generic AI writing. Feed the AI 2 to 3 past writing samples from the client, specify words or tones to avoid, and instruct it to mirror their exact vocabulary and sentence rhythms.', 'Grounding the AI with real client samples prevents robotic output and preserves brand authenticity.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000022', 'lesson-9', 'The Quality and Fact-Checking Filter', 9, 'text', 'paid', 'published', 4, 'Run every campaign through the 4-step quality filter: verify product claims, confirm pricing and delivery terms upfront, check commercial image rights, and remove exaggerated promises.', 'Honest marketing builds enduring customer loyalty; misleading claims destroy client businesses.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000023', 'lesson-10', 'Building a 7-Day Content Calendar', 10, 'text', 'paid', 'published', 4, 'Organize your weekly publishing into a clean 5-column table: Day, Channel, Pillar, Topic, and Call to Action. A structured calendar eliminates daily posting stress and gives clients confidence in your strategic plan.', 'A content calendar turns marketing from random guesswork into a predictable, repeatable business engine.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000023', 'lesson-11', 'Packaging Campaign Work into a Professional Portfolio Sample', 11, 'text', 'paid', 'published', 4, 'Assemble your 4-part brief, customer research, 7-day calendar, social captions, ad variants, and email copy into a polished PDF case study. Documenting your strategy proves you are a valuable marketing consultant, not a prompt copy-paster.', 'Clients pay for your strategic thinking and editorial quality, not just the raw words.')
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
values ('11111111-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000023', 'lesson-12', 'Presenting Your Offer to Potential Clients', 12, 'text', 'paid', 'published', 4, 'Approach potential clients by noticing a specific business gap and sharing a tailored sample of your work with permission. Polite, value-first outreach creates professional client relationships without awkwardness.', 'Offer value and evidence upfront. Respectful outreach opens doors for real paid contracts.')
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

