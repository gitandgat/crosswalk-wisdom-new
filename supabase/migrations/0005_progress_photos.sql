-- Weekly progress photos: the client uploads a photo each week from their own
-- program page; the trainer can view (and remove) any client's photos from the
-- per-client progress view. Files live in a private Storage bucket — never
-- public, since these are personal body photos.
-- Run this in the Supabase SQL editor (after 0001-0004).

create table if not exists public.client_photos (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.profiles(id) on delete cascade,
  storage_path  text not null,
  week          int,
  note          text,
  created_at    timestamptz not null default now()
);

alter table public.client_photos enable row level security;

-- client_photos: client reads/writes own; trainer reads all + can remove any
drop policy if exists client_photos_select on public.client_photos;
create policy client_photos_select on public.client_photos for select
  using (client_id = auth.uid() or public.is_trainer());
drop policy if exists client_photos_write on public.client_photos;
create policy client_photos_write on public.client_photos for all
  using (client_id = auth.uid() or public.is_trainer())
  with check (client_id = auth.uid() or public.is_trainer());

-- Private bucket (public: false) — photos are only reachable via signed URLs.
insert into storage.buckets (id, name, public)
values ('progress-photos', 'progress-photos', false)
on conflict (id) do nothing;

-- Objects are uploaded as "<client_id>/<filename>", so the first path segment
-- doubles as the ownership check (storage.foldername splits the object path).
drop policy if exists progress_photos_select on storage.objects;
create policy progress_photos_select on storage.objects for select
  using (
    bucket_id = 'progress-photos'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_trainer())
  );
drop policy if exists progress_photos_insert on storage.objects;
create policy progress_photos_insert on storage.objects for insert
  with check (
    bucket_id = 'progress-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
drop policy if exists progress_photos_delete on storage.objects;
create policy progress_photos_delete on storage.objects for delete
  using (
    bucket_id = 'progress-photos'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_trainer())
  );
