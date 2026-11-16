-- ituwaAfrica : lessons table with YouTube video support
-- Run after 001_initial_schema.sql

create type lesson_access as enum ('free', 'paid', 'preview');
create type lesson_type   as enum ('video', 'text', 'mixed');

-- ── Modules ──────────────────────────────────────────────────────
create table public.modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  title       text not null,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index modules_course_idx on public.modules(course_id);
alter table public.modules enable row level security;

create policy "Published course modules are publicly readable"
  on public.modules for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_id and c.status = 'published'
    )
  );

create policy "Admins and instructors can manage modules"
  on public.modules for all
  using (public.get_user_role(auth.uid()) in ('admin', 'instructor'));

-- ── Lessons ───────────────────────────────────────────────────────
create table public.lessons (
  id               uuid primary key default gen_random_uuid(),
  course_id        uuid not null references public.courses(id) on delete cascade,
  module_id        uuid references public.modules(id) on delete set null,
  slug             text not null,
  title            text not null,
  position         integer not null default 0,
  lesson_type      lesson_type not null default 'text',
  access_level     lesson_access not null default 'free',
  -- YouTube video fields
  youtube_video_id text,            -- e.g. "dQw4w9WgXcQ"
  video_duration   text,            -- e.g. "12:34" : display only
  -- Text content
  body             text,
  takeaway         text,
  -- Metadata
  read_time_min    integer,
  status           text not null default 'draft'
                   check (status in ('draft', 'published')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(course_id, slug)
);

create index lessons_course_idx  on public.lessons(course_id);
create index lessons_module_idx  on public.lessons(module_id);
create index lessons_status_idx  on public.lessons(status);

alter table public.lessons enable row level security;

-- Free lessons: any authenticated user can read them
-- Paid lessons: only users with an active enrollment (and implicitly a subscription)
create policy "Free published lessons readable by authenticated users"
  on public.lessons for select
  using (
    status = 'published'
    and access_level = 'free'
    and auth.uid() is not null
  );

create policy "Paid lessons readable by enrolled users"
  on public.lessons for select
  using (
    status = 'published'
    and access_level = 'paid'
    and exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid()
        and e.course_id = lessons.course_id
    )
  );

create policy "Preview lessons are publicly readable"
  on public.lessons for select
  using (
    status = 'published'
    and access_level = 'preview'
  );

create policy "Admins and instructors can manage lessons"
  on public.lessons for all
  using (public.get_user_role(auth.uid()) in ('admin', 'instructor'));

-- Updated_at triggers
create trigger set_modules_updated_at
  before update on public.modules
  for each row execute procedure public.set_updated_at();

create trigger set_lessons_updated_at
  before update on public.lessons
  for each row execute procedure public.set_updated_at();
