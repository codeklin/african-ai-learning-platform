I found six `public` tables and no deployed Edge Functions. I’m checking the database’s app-defined routines next; the table inventory below will report row counts and columns, not dump every record.
## Tables and row counts

The project has six tables in `public`:

- **`profiles` — 3 rows**
  - `id` (uuid), `email` (text), `full_name` (text), `avatar_url` (text), `role` (`user_role`), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`courses` — 17 rows**
  - `id` (uuid), `title` (text), `slug` (text), `description` (text), `academy` (text), `status` (`course_status`), `access` (`course_access`), `thumbnail_url` (text), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`modules` — 36 rows**
  - `id` (uuid), `course_id` (uuid), `title` (text), `position` (integer), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`lessons` — 139 rows**
  - `id` (uuid), `course_id` (uuid), `module_id` (uuid), `slug` (text), `title` (text), `position` (integer), `lesson_type` (`lesson_type`), `access_level` (`lesson_access`), `youtube_video_id` (text), `video_duration` (text), `body` (text), `takeaway` (text), `read_time_min` (integer), `status` (text), `created_at` (timestamptz), `updated_at` (timestamptz)
- **`enrollments` — 0 rows**
  - `id` (uuid), `user_id` (uuid), `course_id` (uuid), `enrolled_at` (timestamptz), `completed_at` (timestamptz)
- **`lesson_progress` — 0 rows**
  - `id` (uuid), `user_id` (uuid), `lesson_id` (uuid), `course_id` (uuid), `completed_at` (timestamptz)

## Database functions

- `get_user_role(user_id uuid)` → `user_role`
- `handle_new_user()` → trigger
- `rls_auto_enable()` → event trigger
- `set_updated_at()` → trigger

**No Edge Functions are deployed.** The row numbers above are table counts; I haven’t listed the actual record contents. If you meant the records themselves, tell me which table(s) to show.