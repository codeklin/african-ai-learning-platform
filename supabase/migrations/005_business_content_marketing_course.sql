update public.courses
set title = 'AI App Development for Business',
    description = 'Identify a real customer problem, build a focused AI-powered app prototype, and test whether it offers practical value to a business or its customers.',
    academy = 'AI App Development',
    access = 'paid',
    updated_at = now()
where slug = 'build-helpful-ai-app';

insert into public.courses (id, title, slug, description, academy, status, access)
values (
  '11111111-0000-0000-0000-000000000017',
  'AI Content Marketing for Business',
  'ai-content-marketing-for-business',
  'Research an audience, shape a clear business message, and create original AI-assisted marketing content tied to a practical goal.',
  'AI Content Marketing',
  'draft',
  'paid'
)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    academy = excluded.academy,
    access = excluded.access,
    updated_at = now();
