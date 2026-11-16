-- Allow the public course-status endpoint to read only the fields it needs.
-- The existing courses RLS policy still limits visible rows to published courses.
grant select (slug, status) on table public.courses to anon, authenticated;
