-- Glute Longevity SaaS — initial schema + row-level security.
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query → paste → Run).
-- Single-trainer model: clients self-sign-up; you promote yourself to 'trainer' (see bottom).

-- ── Tables ────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'client' check (role in ('trainer','client')),
  full_name   text,
  created_at  timestamptz not null default now()
);

create table if not exists public.assignments (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.profiles(id) on delete cascade,
  program_slug  text not null default 'glute-longevity',
  current_week  int  not null default 1,
  assigned_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now(),
  unique (client_id, program_slug)
);

create table if not exists public.workout_logs (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.profiles(id) on delete cascade,
  program_slug  text not null default 'glute-longevity',
  week          int  not null,
  day_label     text not null,
  exercise_key  text not null,
  completed     boolean not null default true,
  weight        text,
  reps          text,
  notes         text,
  logged_at     timestamptz not null default now(),
  unique (client_id, program_slug, week, day_label, exercise_key)
);

-- ── Helper (SECURITY DEFINER avoids RLS recursion when checking the role) ───────
create or replace function public.is_trainer()
returns boolean language sql security definer stable
set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'trainer');
$$;

-- ── Auto-create a profile on signup ────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Row-level security ─────────────────────────────────────────────────────────
alter table public.profiles     enable row level security;
alter table public.assignments  enable row level security;
alter table public.workout_logs enable row level security;

-- profiles: read own or (trainer reads all); write own
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.is_trainer());
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert
  with check (id = auth.uid());
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (id = auth.uid());

-- assignments: client reads own; trainer manages all
drop policy if exists assignments_select on public.assignments;
create policy assignments_select on public.assignments for select
  using (client_id = auth.uid() or public.is_trainer());
drop policy if exists assignments_write on public.assignments;
create policy assignments_write on public.assignments for all
  using (public.is_trainer()) with check (public.is_trainer());

-- workout_logs: client reads/writes own; trainer reads all
drop policy if exists logs_select on public.workout_logs;
create policy logs_select on public.workout_logs for select
  using (client_id = auth.uid() or public.is_trainer());
drop policy if exists logs_write on public.workout_logs;
create policy logs_write on public.workout_logs for all
  using (client_id = auth.uid()) with check (client_id = auth.uid());

-- ── After your first signup, promote yourself to trainer: ──────────────────────
--   update public.profiles set role = 'trainer'
--   where id = (select id from auth.users where email = 'sahawat@crosswalkwisdom.com');
