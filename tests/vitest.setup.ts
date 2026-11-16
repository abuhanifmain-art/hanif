// Vitest test setup: ensures deterministic ADMIN_SECRET_KEY during isolated test runs
// without hardcoding a fallback secret inside production source files.
if (!process.env.ADMIN_SECRET_KEY || !process.env.ADMIN_SECRET_KEY.trim()) {
  process.env.ADMIN_SECRET_KEY = "vitest-local-admin-secret";
}
