import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns a lazily-initialized Supabase client.
 * Throws only when first accessed, not at module import time,
 * so the build can succeed without env vars for static pages.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY environment variables. " +
        "Add them to .env.local for development."
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });
  return client;
}
