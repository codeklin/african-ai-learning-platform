-- ituwa : initial schema
-- Run this in the Supabase SQL editor or via supabase db push

-- ── Enums ───────────────────────────────────────────────────────
create type user_role as enum ('learner', 'instructor', 'admin');
create type course_status as enum ('draft', 'published', 'archived');
create type course_access as enum ('free', 'paid', 'preview');

-- ── Profiles ─────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  role        user_role not null default 'learner',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── Auto-create profile on sign-up ───────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    'learner'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Helper: get user role (security definer avoids RLS recursion) ─
create or replace function public.get_user_role(user_id uuid)
returns user_role
language sql
security definer set search_path = public
stable
as $$
  select role from public.profiles where id = user_id;
$$;

-- ── Courses ──────────────────────────────────────────────────────
create table public.courses (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  description   text,
  academy       text,
  status        course_status not null default 'draft',
  access        course_access not null default 'free',
  thumbnail_url text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index courses_slug_idx   on public.courses(slug);
create index courses_status_idx on public.courses(status);

alter table public.courses enable row level security;

create policy "Published courses are publicly readable"
  on public.courses for select
  using (status = 'published');

create policy "Admins and instructors can read all courses"
  on public.courses for select
  using (
    public.get_user_role(auth.uid()) in ('admin', 'instructor')
  );

create policy "Admins and instructors can insert courses"
  on public.courses for insert
  with check (
    public.get_user_role(auth.uid()) in ('admin', 'instructor')
  );

create policy "Admins and instructors can update courses"
  on public.courses for update
  using (
    public.get_user_role(auth.uid()) in ('admin', 'instructor')
  );

-- ── Enrollments ──────────────────────────────────────────────────
create table public.enrollments (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  enrolled_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id, course_id)
);

create index enrollments_user_idx   on public.enrollments(user_id);
create index enrollments_course_idx on public.enrollments(course_id);

alter table public.enrollments enable row level security;

create policy "Users can read own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Authenticated users can enroll"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Admins can read all enrollments"
  on public.enrollments for select
  using (public.get_user_role(auth.uid()) = 'admin');

-- ── Lesson progress ───────────────────────────────────────────────
create table public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    text not null,
  course_id    uuid not null references public.courses(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create index lesson_progress_user_idx   on public.lesson_progress(user_id);
create index lesson_progress_course_idx on public.lesson_progress(course_id);

alter table public.lesson_progress enable row level security;

create policy "Users can read own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Admins can read all progress"
  on public.lesson_progress for select
  using (public.get_user_role(auth.uid()) = 'admin');

-- ── Updated_at trigger ────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_courses_updated_at
  before update on public.courses
  for each row execute procedure public.set_updated_at();
