-- Fix table-level SELECT privileges across public schema
-- When column-level GRANT was applied in migration 004, it restricted the role from selecting other columns (id, title, access, etc.) or tables!

grant usage on schema public to anon, authenticated, service_role;

-- Grant standard permissions to anon, authenticated, and service_role
grant select on all tables in schema public to anon, authenticated;
grant all on all tables in schema public to service_role;

grant all on all sequences in schema public to authenticated, service_role;
grant all on all functions in schema public to authenticated, service_role;

-- Ensure future tables also inherit these permissions
alter default privileges in schema public grant select on tables to anon, authenticated;
alter default privileges in schema public grant all on tables to service_role;
