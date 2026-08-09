-- Movement-assessment scan links: the trainer manually links a client to the
-- matching case in the separate MoveAssess app (physical-assessment-app) plus
-- the date it was done. No shared DB with MoveAssess — this just stores a
-- pointer (case name + optional deep link) so the client can revisit it and
-- the trainer can track when a re-scan is due.
-- Run this in the Supabase SQL editor (after 0001-0003).

create table if not exists public.client_scans (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.profiles(id) on delete cascade,
  case_name   text not null,
  case_url    text,
  scan_date   date not null,
  note        text,
  created_at  timestamptz not null default now()
);

alter table public.client_scans enable row level security;

-- client_scans: client reads own; trainer manages all (same shape as assignments)
drop policy if exists client_scans_select on public.client_scans;
create policy client_scans_select on public.client_scans for select
  using (client_id = auth.uid() or public.is_trainer());
drop policy if exists client_scans_write on public.client_scans;
create policy client_scans_write on public.client_scans for all
  using (public.is_trainer()) with check (public.is_trainer());
