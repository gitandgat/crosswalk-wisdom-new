-- Add client email to profiles so the trainer dashboard can identify clients.
-- Run this in the Supabase SQL editor (after 0001).

alter table public.profiles add column if not exists email text;

-- Backfill existing profiles from auth.users
update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id and p.email is null;

-- Capture email for future signups
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end; $$;
