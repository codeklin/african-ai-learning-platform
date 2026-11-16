create table if not exists public.course_payments (
  id                       uuid        primary key default gen_random_uuid(),
  user_id                  uuid        not null references public.profiles(id) on delete cascade,
  course_id                uuid        not null references public.courses(id) on delete restrict,
  reference                text        not null unique,
  amount_kobo              bigint      not null check (amount_kobo > 0),
  currency                 text        not null check (currency = 'NGN'),
  customer_email           text        not null,
  status                   text        not null default 'pending'
                                       check (status in ('pending', 'initialized', 'successful', 'failed')),
  provider_transaction_id  bigint      unique,
  paid_at                  timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists course_payments_user_idx
  on public.course_payments(user_id);

create index if not exists course_payments_course_idx
  on public.course_payments(course_id);

create index if not exists course_payments_status_idx
  on public.course_payments(status);

alter table public.course_payments enable row level security;

drop policy if exists "Users can read own course payments" on public.course_payments;
create policy "Users can read own course payments"
  on public.course_payments for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can read all course payments" on public.course_payments;
create policy "Admins can read all course payments"
  on public.course_payments for select
  using (public.get_user_role(auth.uid()) = 'admin');

revoke all on public.course_payments from anon, authenticated;
grant select on public.course_payments to authenticated;
grant all on public.course_payments to service_role;

drop trigger if exists set_course_payments_updated_at on public.course_payments;
create trigger set_course_payments_updated_at
  before update on public.course_payments
  for each row execute procedure public.set_updated_at();
