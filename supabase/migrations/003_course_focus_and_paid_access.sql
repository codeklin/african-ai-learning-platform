-- Limit the initial public lineup and require trusted payment verification for paid enrollments.

alter table public.enrollments
  add column if not exists payment_verified_at timestamptz,
  add column if not exists payment_verified_by uuid references public.profiles(id) on delete set null;

drop policy if exists "Authenticated users can enroll" on public.enrollments;
drop policy if exists "Users can update own enrollment" on public.enrollments;
drop policy if exists "Users can self-enroll in published free courses" on public.enrollments;
drop policy if exists "Admins can insert enrollments" on public.enrollments;
drop policy if exists "Free published lessons readable by authenticated users" on public.lessons;

create policy "Free published lessons readable by authenticated users"
  on public.lessons for select
  using (
    status = 'published'
    and access_level = 'free'
    and auth.uid() is not null
    and exists (
      select 1 from public.courses c
      where c.id = lessons.course_id
        and c.status = 'published'
        and c.access = 'free'
    )
  );

create policy "Users can self-enroll in published free courses"
  on public.enrollments for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.courses c
      where c.id = course_id
        and c.status = 'published'
        and c.access = 'free'
    )
  );

create policy "Admins can insert enrollments"
  on public.enrollments for insert
  with check (public.get_user_role(auth.uid()) = 'admin');

drop policy if exists "Paid lessons readable by enrolled users" on public.lessons;
create policy "Paid lessons readable by verified enrolled users"
  on public.lessons for select
  using (
    status = 'published'
    and exists (
      select 1 from public.courses c
      join public.enrollments e on e.course_id = c.id
      where c.id = lessons.course_id
        and c.access = 'paid'
        and e.user_id = auth.uid()
        and e.payment_verified_at is not null
    )
  );

create or replace function public.prevent_untrusted_role_changes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role
    and auth.uid() is not null
    and public.get_user_role(auth.uid()) is distinct from 'admin'::public.user_role
  then
    raise exception 'Only an administrator can change account roles.';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_untrusted_role_changes on public.profiles;
create trigger prevent_untrusted_role_changes
  before update on public.profiles
  for each row execute procedure public.prevent_untrusted_role_changes();

update public.courses
set status = 'archived',
    updated_at = now()
where slug not in (
  'ai-toolkit-practical-start',
  'build-helpful-ai-app',
  'youtube-automation-monetization-masterclass'
);

update public.courses
set title = 'AI Foundations',
    description = 'Build a practical understanding of AI tools, write clearer prompts, and apply what you learn to a real task.',
    academy = 'AI Foundations',
    status = 'published',
    access = 'free',
    updated_at = now()
where slug = 'ai-toolkit-practical-start';

update public.courses
set title = 'AI Web App Development',
    description = 'Build a practical web app with AI, from problem definition through interface design, testing, and responsible API use.',
    academy = 'AI Web App Development',
    status = 'draft',
    access = 'paid',
    updated_at = now()
where slug = 'build-helpful-ai-app';

update public.courses
set title = 'YouTube Monetization',
    description = 'Understand creator revenue paths, current YouTube requirements, copyright, and how to build original audience value.',
    academy = 'Creator Economy & YouTube',
    status = 'draft',
    access = 'paid',
    updated_at = now()
where slug = 'youtube-automation-monetization-masterclass';

insert into public.courses (id, title, slug, description, academy, status, access)
values
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
    '11111111-0000-0000-0000-000000000016',
    'AI Graphic Design',
    'ai-graphic-design',
    'Create original, useful visual assets with AI-assisted design workflows and prepare them for real projects.',
    'AI Graphic Design',
    'draft',
    'paid'
  )
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    academy = excluded.academy,
    status = excluded.status,
    access = excluded.access,
    updated_at = now();
