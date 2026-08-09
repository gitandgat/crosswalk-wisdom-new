-- Per-client trainer notes (e.g. findings from a physical assessment) shown
-- to the client on their program page. Lives on assignments: existing RLS
-- already lets the trainer write and the client read their own row.
-- Run this in the Supabase SQL editor (after 0001, 0002).

alter table public.assignments add column if not exists trainer_notes text;
