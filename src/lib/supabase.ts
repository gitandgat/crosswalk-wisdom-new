import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for the Glute Longevity training SaaS.
 * Keys are public-by-design (anon key is meant for the browser) and read from
 * Vite env. If they're missing, `isSupabaseConfigured` is false so the app
 * degrades gracefully (shows a "backend not configured" notice) instead of
 * white-screening.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — Glute app auth is disabled until you add them to .env",
  );
}

export const supabase = createClient(url ?? "https://placeholder.supabase.co", anonKey ?? "placeholder-anon-key");

export type Role = "trainer" | "client";

export type Profile = {
  id: string;
  role: Role;
  full_name: string | null;
  email: string | null;
  created_at: string;
};
