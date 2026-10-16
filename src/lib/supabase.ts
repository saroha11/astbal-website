import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client. The service-role key bypasses RLS, so it must never be
// imported from a client component or exposed through a NEXT_PUBLIC_ variable.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
