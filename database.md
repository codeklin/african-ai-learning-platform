I found six `public` tables and no deployed Edge Functions. I’m checking the database’s app-defined routines next; the table inventory below will report row counts and columns, not dump every record.
## Tables and row counts

The project has six tables in `public`:

- **`profiles` : 3 rows**
  - `id` (uuid), `email` (text), `full_name` (text), `avatar_url` (text), `role` (`user_role`), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`courses` : 17 rows**
  - `id` (uuid), `title` (text), `slug` (text), `description` (text), `academy` (text), `status` (`course_status`), `access` (`course_access`), `thumbnail_url` (text), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`modules` : 36 rows**
  - `id` (uuid), `course_id` (uuid), `title` (text), `position` (integer), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`lessons` : 139 rows**
  - `id` (uuid), `course_id` (uuid), `module_id` (uuid), `slug` (text), `title` (text), `position` (integer), `lesson_type` (`lesson_type`), `access_level` (`lesson_access`), `youtube_video_id` (text), `video_duration` (text), `body` (text), `takeaway` (text), `read_time_min` (integer), `status` (text), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`enrollments` : 0 rows**
  - `id` (uuid), `user_id` (uuid), `course_id` (uuid), `enrolled_at` (timestamptz), `completed_at` (timestamptz)
- **`lesson_progress` : 0 rows**
  - `id` (uuid), `user_id` (uuid), `lesson_id` (uuid), `course_id` (uuid), `completed_at` (timestamptz)

## Database functions

- `get_user_role(user_id uuid)` → `user_role`
- `handle_new_user()` → trigger
- `rls_auto_enable()` → event trigger
- `set_updated_at()` → trigger

**No Edge Functions are deployed.** The row numbers above are table counts; I haven’t listed the actual record contents. If you meant the records themselves, tell me which table(s) to show.














#torun
-- Drop dependent policies first
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can read all progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Admins can read all course payments" ON public.course_payments;
DROP POLICY IF EXISTS "Admins can read all courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage modules" ON public.modules;
DROP POLICY IF EXISTS "Admins can manage lessons" ON public.lessons;

-- Drop dependent function
DROP FUNCTION IF EXISTS public.get_user_role(uuid);

-- Swap the enum
ALTER TYPE user_role RENAME TO user_role_old;
CREATE TYPE user_role AS ENUM ('learner', 'admin');
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN role TYPE user_role USING role::text::user_role;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'learner'::user_role;
DROP TYPE user_role_old;

-- Recreate function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Recreate policies
CREATE POLICY "Admins can read all profiles" ON public.profiles FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can read all enrollments" ON public.enrollments FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can read all progress" ON public.lesson_progress FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can read all course payments" ON public.course_payments FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can read all courses" ON public.courses FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can insert courses" ON public.courses FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can update courses" ON public.courses FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can manage modules" ON public.modules FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');
