# MD Abu Hanif Mia — Full-Stack Web Portfolio & Client Management Platform

Personal engineering portfolio, interactive technical lab, UK/EU GDPR-compliant CV hub, and integrated Client & Order Management System (CMS/OMS) built by **MD Abu Hanif Mia (Abu Hanif)**.

- **Public GitHub Profile:** [github.com/abuhanif254](https://github.com/abuhanif254)
- **Portfolio Repository:** `https://github.com/abuhanifmain-art/hanif.git`
- **Flagship Live Product:** [nexuscalculator.net](https://nexuscalculator.net) (312 interactive calculators & developer tools across 4 languages)
- **Contact:** `abuhanifmain@gmail.com` • Open to Remote, B2B Contract & On-Site / Relocation in the UK, Europe & worldwide

---

## Core Architecture & Features

1. **Portfolio, CV (`/resume`) & Flagship Showcase:**
   - Verified education (`HSC Commerce`, Wali Neowaj Khan College EIIN `110495`, Dhaka Education Board; Programming Hero Batch-12 `WEB12-3991`; freeCodeCamp TypeScript/Python/Rust/C++ self-study).
   - Verifiable multi-sector work history (`WACASCO Catering Services` Oman `2022–2025`, `PRAN-RFL Group` `2018–2022`, `Unilever Bangladesh` `2017–2018`).
   - Print-ready CV & plain-text ATS copy view at `/resume`.
2. **Interactive Systems Lab (`/lab`) & Diagnostics (`/status`):**
   - Educational PostgreSQL query planner study tool (`/lab#postgres-planner`) and architecture topology simulator (`/lab#topology-explorer`).
   - Live client-to-server ping & Supabase health check at `/status` and `/api/health`.
3. **CMS, Order Management (OMS) & SOW Engine (`/admin`, `/pricing`, `/orders/*`):**
   - Protected `/admin` dashboard guarded by Next.js 16 `proxy.ts` edge verification and HMAC-SHA256 cookies (`ADMIN_SECRET_KEY`).
   - Manage projects, services, blog articles, visual assets, UK/EU GDPR disclosures (`/privacy`, `/terms`), inbound inquiries, client records, and milestone sign-off trackers.
4. **Modern Supabase Integration (`sb_publishable_` & `sb_secret_`):**
   - Supports Supabase's current **`SUPABASE_SECRET_KEY`** (`sb_secret_...`) as well as legacy `SUPABASE_SERVICE_ROLE_KEY` on server APIs, with clean publishable-key + local-store resilience when secret keys are omitted.

---

## Tech Stack

- **Framework:** Next.js 16.3.6 (App Router + Turbopack), React 19, TypeScript 5.6
- **Styling:** Tailwind CSS v4 + clean responsive modular CSS (`app/globals.css`, `app/portfolio-layout.css`, `app/site-footer.css`)
- **Database:** Supabase PostgreSQL (Row-Level Security, JSONB profile extensions)
- **Testing:** Vitest (`pnpm check`, `pnpm test`, `pnpm build`)

---

## Local Development Setup

```bash
# 1. Clone the portfolio repository
git clone https://github.com/abuhanifmain-art/hanif.git
cd hanif

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.local.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
# SUPABASE_SECRET_KEY (optional for privileged writes), and ADMIN_SECRET_KEY.

# 4. Run checks, tests, and dev server
pnpm check
pnpm test
pnpm build
pnpm dev
```
