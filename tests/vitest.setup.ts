// Vitest test setup: ensures deterministic ADMIN_SECRET_KEY during isolated test runs
// without hardcoding a fallback secret inside production source files, and isolates
// unit tests from live .env.local Supabase credentials so tests never mutate production data.
if (!process.env.ADMIN_SECRET_KEY || !process.env.ADMIN_SECRET_KEY.trim()) {
  process.env.ADMIN_SECRET_KEY = "vitest-local-admin-secret";
}

delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
delete process.env.SUPABASE_SECRET_KEY;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
