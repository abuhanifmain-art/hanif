import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedAdminClient: SupabaseClient | null = null;
let cachedCredentialFingerprint = "";

function resolveServerSecretKey(): string {
  return (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();
}

export function isPrivilegedSupabaseConfigured(): boolean {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const secretKey = resolveServerSecretKey();
  return Boolean(supabaseUrl && secretKey);
}

/**
 * Returns a privileged Supabase client for server-side API routes and Server Actions.
 * Supports modern Supabase Secret Keys (`SUPABASE_SECRET_KEY`, `sb_secret_...`) as well as
 * legacy `SUPABASE_SERVICE_ROLE_KEY`. Never falls back to public anon/publishable keys.
 */
export function getServiceSupabase(): SupabaseClient | null {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const secretKey = resolveServerSecretKey();

  if (!supabaseUrl || !secretKey) {
    return null;
  }

  const fingerprint = `${supabaseUrl}::${secretKey.slice(0, 12)}:${secretKey.length}`;
  if (cachedAdminClient && cachedCredentialFingerprint === fingerprint) {
    return cachedAdminClient;
  }

  try {
    cachedAdminClient = createClient(supabaseUrl, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    cachedCredentialFingerprint = fingerprint;
    return cachedAdminClient;
  } catch (err) {
    console.error("Failed to initialize privileged Supabase client:", err);
    return null;
  }
}
