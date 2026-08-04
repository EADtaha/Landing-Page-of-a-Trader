import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * Key resolution order (most-privileged → least-privileged):
 *   1. SUPABASE_SERVICE_ROLE_KEY             — bypasses RLS, preferred for API routes
 *   2. NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  — new canonical public key name
 *   3. NEXT_PUBLIC_SUPABASE_ANON_KEY         — legacy alias, kept for compat
 *
 * Returns null when no credentials are available so callers can
 * gracefully fall back during local development instead of throwing.
 */
export function createServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[Supabase] Missing credentials — set NEXT_PUBLIC_SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) " +
        "in .env.local. Running in dev fallback mode (leads logged to console only)."
    );
    return null;
  }

  return createClient(url, key, {
    auth: {
      // Disable session management for server-side clients
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
