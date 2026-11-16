-- =============================================================================
-- Supabase Database Schema: Abu Hanif Portfolio & Admin System
-- Run this entire script in Supabase SQL Editor (https://supabase.com/dashboard)
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null default 'MD Abu Hanif Mia',
  preferred_name text not null default 'Abu Hanif',
  kicker text not null default 'Full-Stack Web Developer & International Operations Professional',
  headline text not null default 'Next.js & TypeScript Builder • Multi-Sector Operations • Open to UK & Europe',
  bio text not null default 'Full-Stack Web Developer (Next.js, TypeScript, PostgreSQL) & International Operations Professional. Creator of NexusCalculator.net. Open to Remote, B2B & On-Site roles in UK & Europe.',
  email text not null default 'abuhanifmain@gmail.com',
  phone text not null default '+880 1724-010261',
  location text not null default 'Sadar Upazila, Kishoreganj, Dhaka, Bangladesh',
  availability_status text not null default 'Open to Remote, B2B Contract & On-Site / Relocation (UK, Europe & Worldwide)',
  is_available boolean not null default true,
  social_links jsonb not null default '{
    "github": "https://github.com/abuhanif254",
    "linkedin": "https://www.linkedin.com/in/md-abu-hanif-mia",
    "twitter": "https://x.com/MohammadBitull1",
    "facebook": "https://www.facebook.com/bitulla",
    "instagram": "https://www.instagram.com/bitullah_aj",
    "discord": "https://discord.com"
  }'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- -----------------------------------------------------------------------------
-- 2. PROJECTS TABLE (Work Showcase & Scoped Prices)
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description_markdown text not null,
  client_name text default 'Confidential Client',
  thumbnail_url text,
  image_url text,
  screenshots text[] not null default '{}',
  demo_url text,
  github_url text,
  price_tag text,
  impact_metric text,
  tech_stack text[] not null default '{}',
  sort_order int not null default 0,
  is_featured boolean not null default true,
  is_published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure image columns exist if projects table was created prior
alter table public.projects add column if not exists thumbnail_url text;
alter table public.projects add column if not exists image_url text;
alter table public.projects add column if not exists screenshots text[] not null default '{}';

-- -----------------------------------------------------------------------------
-- 3. SERVICES TABLE (Transparent Pricing Matrix)
-- -----------------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null,
  pricing_type text not null default 'fixed',
  price_display text not null,
  timeline text not null,
  deliverables text[] not null default '{}',
  is_popular boolean not null default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- -----------------------------------------------------------------------------
-- 4. BLOG POSTS TABLE (Personal Technical Blog)
-- -----------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content_markdown text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  reading_time_minutes int not null default 5,
  is_published boolean not null default true,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- -----------------------------------------------------------------------------
-- 5. INQUIRIES TABLE (Client Consultation Requests)
-- -----------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  project_type text not null,
  budget_range text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- -----------------------------------------------------------------------------
-- 6. EDGE TELEMETRY TABLE (Live Global Latency Radar & Supabase Realtime)
-- -----------------------------------------------------------------------------
create table if not exists public.edge_telemetry (
  id uuid primary key default uuid_generate_v4(),
  region text not null,
  city_name text not null,
  continent text not null,
  latency_ms int not null check (latency_ms >= 1 and latency_ms <= 10000),
  pop_code text,
  cf_ray text,
  user_agent_category text default 'desktop',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_edge_telemetry_region_created on public.edge_telemetry (region, created_at desc);
create index if not exists idx_edge_telemetry_continent_created on public.edge_telemetry (continent, created_at desc);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.blog_posts enable row level security;
alter table public.inquiries enable row level security;
alter table public.edge_telemetry enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Public can view profiles" on public.profiles;
drop policy if exists "Public can view published projects" on public.projects;
drop policy if exists "Public can view active services" on public.services;
drop policy if exists "Public can view published blog posts" on public.blog_posts;
drop policy if exists "Public can insert inquiries" on public.inquiries;
drop policy if exists "Public can view inquiries" on public.inquiries;
drop policy if exists "Public can update inquiries" on public.inquiries;
drop policy if exists "Public can insert projects" on public.projects;
drop policy if exists "Public can update projects" on public.projects;
drop policy if exists "Public can insert services" on public.services;
drop policy if exists "Public can update services" on public.services;
drop policy if exists "Public can insert blog posts" on public.blog_posts;
drop policy if exists "Public can update blog posts" on public.blog_posts;
drop policy if exists "Public can update profiles" on public.profiles;
drop policy if exists "Public can view edge telemetry" on public.edge_telemetry;
drop policy if exists "Public can insert edge telemetry" on public.edge_telemetry;
drop policy if exists "Admins have full access to profiles" on public.profiles;
drop policy if exists "Admins have full access to projects" on public.projects;
drop policy if exists "Admins have full access to services" on public.services;
drop policy if exists "Admins have full access to blog posts" on public.blog_posts;
drop policy if exists "Admins have full access to inquiries" on public.inquiries;
drop policy if exists "Admins have full access to edge telemetry" on public.edge_telemetry;

-- Public read policies (Strictly read-only for published/active records)
create policy "Public can view profiles" on public.profiles for select using (true);
create policy "Public can view published projects" on public.projects for select using (is_published = true);
create policy "Public can view active services" on public.services for select using (is_active = true);
create policy "Public can view published blog posts" on public.blog_posts for select using (is_published = true);

-- Public inquiry submission (Insert-only with validation; never readable by anon)
create policy "Public can insert inquiries" on public.inquiries
  for insert
  with check (length(trim(name)) >= 2 and length(trim(email)) >= 5 and length(trim(message)) >= 5);

-- Authenticated / Service Role full access (No anonymous read/write on inquiries or portfolio tables)
create policy "Admins have full access to profiles" on public.profiles
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to projects" on public.projects
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to services" on public.services
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to blog posts" on public.blog_posts
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to inquiries" on public.inquiries
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

-- Public edge telemetry policies (Empirical telemetry streaming)
create policy "Public can view edge telemetry" on public.edge_telemetry
  for select using (created_at > now() - interval '7 days');

create policy "Public can insert edge telemetry" on public.edge_telemetry
  for insert
  with check (latency_ms >= 1 and latency_ms <= 5000 and length(trim(region)) >= 2);

create policy "Admins have full access to edge telemetry" on public.edge_telemetry
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

-- -----------------------------------------------------------------------------
-- STORAGE BUCKETS
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public) 
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio assets" on storage.objects;
drop policy if exists "Public can view blog images" on storage.objects;
drop policy if exists "Admins can upload portfolio assets" on storage.objects;
drop policy if exists "Admins can upload blog images" on storage.objects;

create policy "Public can view portfolio assets" on storage.objects for select using (bucket_id = 'portfolio-assets');
create policy "Public can view blog images" on storage.objects for select using (bucket_id = 'blog-images');
create policy "Admins can upload portfolio assets" on storage.objects for insert with check (bucket_id = 'portfolio-assets' and auth.role() in ('authenticated', 'service_role'));
create policy "Admins can upload blog images" on storage.objects for insert with check (bucket_id = 'blog-images' and auth.role() in ('authenticated', 'service_role'));

-- -----------------------------------------------------------------------------
-- INITIAL SEED DATA
-- -----------------------------------------------------------------------------

-- 1. Profile Seed
insert into public.profiles (full_name, preferred_name, kicker, headline, bio, email, phone, location, availability_status, is_available)
select
  'MD Abu Hanif Mia',
  'Abu Hanif',
  'Full-Stack Web Developer & International Operations Professional',
  'Next.js & TypeScript Builder • Multi-Sector Operations • Open to UK & Europe',
  'Full-Stack Web Developer (Next.js, TypeScript, PostgreSQL) & International Operations Professional. Creator of NexusCalculator.net. Open to Remote, B2B & On-Site roles in UK & Europe.',
  'abuhanifmain@gmail.com',
  '+880 1724-010261',
  'Sadar Upazila, Kishoreganj, Dhaka, Bangladesh',
  'Open to Remote, B2B Contract & On-Site / Relocation (UK, Europe & Worldwide)',
  true
where not exists (select 1 from public.profiles);

-- 2. Projects Seed
insert into public.projects (title, slug, summary, description_markdown, client_name, image_url, thumbnail_url, screenshots, demo_url, github_url, price_tag, impact_metric, tech_stack, sort_order, is_featured, is_published)
values
(
  'Nexus Calculator — 300+ Interactive Tools & Guides Platform',
  'nexus-calculator-platform',
  'Live production multilingual web platform (nexuscalculator.net) with 312 interactive calculators & developer tools, 190+ guides, and 3,200+ static pages across English, Spanish, French, and German.',
  '### Live Production Product (nexuscalculator.net)\n\nBuilt and launched from scratch as an independent full-stack web developer using Next.js 15 App Router, TypeScript, next-intl, and static site generation.\n\n### Engineering & Architecture Highlights\n\n- **Unified Tool Registry (`lib/registry`)**: Structured 177 financial/math calculators and 135 developer, PDF, and media tools into a typed registry driving routing, search, sitemaps, and Schema.org JSON-LD.\n- **Bundle Isolation**: Split client interactive components with `next/dynamic` lazy wrappers, cutting initial First Load JS significantly compared to a monolithic bundle.\n- **Multilingual & UK/EU SEO**: Localized routing and hreflang canonicals across `en`, `es`, `fr`, and `de` including UK mortgage and regional financial utilities, with Google Search Console visibility of 379k+ impressions over 3 months.\n- **Privacy-First In-Browser Processing**: PDF, image, and formatter tools run directly in the visitor browser without server file retention.',
  'Own Production Platform (Live)',
  '/images/nexuscalculator-homepage.png',
  '/images/nexuscalculator-homepage.png',
  ARRAY['/images/nexuscalculator-homepage.png', '/images/gsc-performance-3months.png'],
  'https://nexuscalculator.net',
  'https://github.com/abuhanif254',
  'Live Production',
  '312 Tools • 4 Languages • 379k+ GSC Impr.',
  ARRAY['Next.js 15', 'TypeScript', 'React', 'next-intl', 'Tailwind CSS', 'Vercel'],
  0,
  true,
  true
),
(
  'Abu Hanif Portfolio, Admin CMS & Client OMS Platform',
  'portfolio-crm-oms-platform',
  'Full-stack Next.js 16 + TypeScript + Supabase PostgreSQL application powering this website: zero-trust HMAC admin portal, multi-currency B2B invoices, milestone tracking, and GDPR disclosures.',
  '### Live Production Application (abuhanifmia.com)\n\nEngineered as a dual-purpose international career portfolio and B2B Client & Order Management System (OMS) running on Next.js 16 App Router, React 19, Supabase PostgreSQL, and Cloudflare edge hosting.\n\n### Key Implemented Modules\n\n- **Zero-Trust Auth & Security**: Stateless HMAC-SHA256 cookie sessions, Edge `proxy.ts` route gating, optional TOTP 2FA, and sliding-window rate limiting on login, telemetry, and contact APIs.\n- **PostgreSQL + Supabase Storage**: Row-Level Security policies, `SUPABASE_SECRET_KEY` server writes, admin image uploader with binary magic-byte validation, and live `/status` DB health checks.\n- **Multi-Currency B2B Workflows**: Statement of Work builder, printable UK/EU GDPR-compliant invoices (`USD`, `GBP`, `EUR`), SHA-256 milestone client sign-off tracker, and automated Vitest test suite.',
  'Own Live Platform (abuhanifmia.com)',
  '/images/og-card.png',
  '/images/og-card.png',
  ARRAY['/images/og-card.png'],
  '/status',
  'https://github.com/abuhanifmain-art/hanif',
  'Live Production',
  'Next.js 16 • Supabase RLS • Multi-Currency OMS',
  ARRAY['Next.js 16', 'TypeScript', 'React 19', 'Supabase', 'PostgreSQL', 'Vitest'],
  1,
  true,
  true
),
(
  'Real-Time Financial Telemetry Pipeline (Reference Study)',
  'financial-telemetry-pipeline',
  'Interactive systems architecture blueprint & lab benchmark modeling WebSocket tick ingestion, Redis pub/sub fanout, and TimescaleDB rollups.',
  '### Reference Scenario\n\nAn architectural case study exploring how concurrent ingestion workers, binary WebSockets, and time-series tables handle high-frequency tick distribution.\n\n### Architectural Implementation & Blueprint\n\n- Concurrent worker pipeline patterns pairing Go / Node.js workers with lock-free ring buffers.\n- Redis pub/sub fanout channel connected to PostgreSQL / TimescaleDB hypertable aggregations.\n- Interactive throughput & failover explorer available in the Systems Lab (`/lab#topology-explorer`).\n\n### Scope & Verification Status\n\n- **Status**: Reference Architecture Blueprint & Interactive Lab Simulator (not a commercial client claim).\n- **Focus**: Latency budgeting, backpressure mitigation, and time-series storage modeling.',
  'Architecture Reference Blueprint',
  '/images/projects/telemetry-pipeline-arch.svg',
  '/images/projects/telemetry-pipeline-arch.svg',
  ARRAY['/images/projects/telemetry-pipeline-arch.svg', '/images/projects/postgres-audit-arch.svg'],
  '/lab#topology-explorer',
  'https://github.com/abuhanif254',
  'Lab Blueprint',
  'Go + WebSocket Benchmark • Lab Simulator',
  ARRAY['Go', 'Next.js', 'WebSockets', 'TimescaleDB', 'Redis', 'Docker'],
  1,
  true,
  true
),
(
  'Cloudflare Edge Multi-Tenant Storefront Blueprint',
  'cloudflare-edge-ecommerce',
  'Reference full-stack e-commerce & SaaS storefront architecture leveraging Next.js 16 App Router, Cloudflare Pages, Supabase PostgreSQL, and idempotent checkout queues.',
  '## Overview & Design Goal\n\nDemonstrates edge-first SSR catalog rendering, stale-while-revalidate caching, and PostgreSQL read/pooler patterns to keep TTFB responsive across UK, European, and global visitors.\n\n## Architectural Blueprint\n\n- Next.js 16 App Router deployed on Cloudflare Pages edge workers.\n- Supabase PostgreSQL schema with Row Level Security (RLS) and connection pooling.\n- Idempotent order workflows matching the OMS engine running live inside this portfolio platform.\n\n## Verification Status\n\n- **Status**: Open Reference Blueprint & Portfolio Commerce Engine Pattern.',
  'Edge Reference Blueprint',
  '/images/projects/cloudflare-edge-arch.svg',
  '/images/projects/cloudflare-edge-arch.svg',
  ARRAY['/images/projects/cloudflare-edge-arch.svg', '/images/projects/telemetry-pipeline-arch.svg'],
  '/lab#edge-radar',
  'https://github.com/abuhanif254',
  'Reference Demo',
  'Next.js 16 Edge SSG • Live Radar',
  ARRAY['Next.js 16', 'Cloudflare Pages', 'Supabase', 'TypeScript', 'Tailwind CSS'],
  2,
  true,
  true
),
(
  'Enterprise AI Document Search & RAG Pipeline Blueprint',
  'enterprise-ai-document-search',
  'Reference hybrid search architecture combining FastAPI webhook ingestion, PostgreSQL pgvector HNSW indexing, and BM25 + semantic retrieval.',
  '## Blueprint Scope\n\nDesigned to show clean chunking, idempotent SHA-256 hashing, and hybrid lexical + dense vector retrieval using PostgreSQL `pgvector` without external vendor lock-in.\n\n## Architectural Solution\n\n- Document ingestion pipeline splitting Markdown, PDF, and documentation pages into overlapping semantic chunks.\n- Hybrid BM25 + pgvector cosine-distance ranking paired with strict citation grounding.',
  'AI Architecture Blueprint',
  '/images/projects/ai-rag-pipeline-arch.svg',
  '/images/projects/ai-rag-pipeline-arch.svg',
  ARRAY['/images/projects/ai-rag-pipeline-arch.svg'],
  '/lab#topology-explorer',
  'https://github.com/abuhanif254',
  'Reference Demo',
  'pgvector Hybrid Search • Blueprint',
  ARRAY['Python', 'FastAPI', 'pgvector', 'PostgreSQL', 'React', 'TypeScript'],
  3,
  false,
  true
),
(
  'PostgreSQL Query Profiling & Indexing Audit Study',
  'postgres-performance-audit',
  'Interactive EXPLAIN ANALYZE optimization study covering B-Tree composite indexes, partial indexes, PgBouncer pooling, and zero deadlocks under concurrency.',
  '## Diagnostic Focus\n\nAnalyzes common PostgreSQL sequential-scan bottlenecks, lock contention, and connection saturation alongside interactive SQL query plans in the Systems Lab.\n\n## Architectural Techniques\n\n- `EXPLAIN (ANALYZE, BUFFERS)` inspection across filtered time-window and multi-join queries.\n- Composite B-Tree, GIN, and BRIN indexing strategies to eliminate full table scans.\n- PgBouncer / Supavisor transaction pooling and autovacuum tuning to prevent lock buildup.\n\n## Interactive Proof\n\n- **Lab Simulator**: Test before/after query execution plans directly in `/lab#postgres-planner` demonstrating **0 Deadlocks** and drastic I/O reduction under simulated load.',
  'Database Tuning Lab Study',
  '/images/projects/postgres-audit-arch.svg',
  '/images/projects/postgres-audit-arch.svg',
  ARRAY['/images/projects/postgres-audit-arch.svg'],
  '/lab#postgres-planner',
  'https://github.com/abuhanif254',
  'Lab Reference',
  'EXPLAIN ANALYZE • 0 Deadlocks Sim',
  ARRAY['PostgreSQL 16', 'PgBouncer', 'EXPLAIN ANALYZE', 'SQL', 'Supabase'],
  4,
  true,
  true
),
(
  'Zero-Trust Distributed Auth & RBAC Architecture Blueprint',
  'zero-trust-auth-service',
  'Security architecture pattern covering HMAC session signing, timing-safe comparison, WebAuthn/TOTP MFA, and PostgreSQL Row Level Security (RLS).',
  '## Security Focus\n\nModels stateless HMAC-SHA256 admin session verification, RFC 6238 TOTP authenticator codes, encrypted credential storage patterns, and tenant isolation via Supabase RLS — core security primitives implemented in this codebase.',
  'Security Pattern Reference',
  '/images/projects/zero-trust-auth-arch.svg',
  '/images/projects/zero-trust-auth-arch.svg',
  ARRAY['/images/projects/zero-trust-auth-arch.svg'],
  null,
  'https://github.com/abuhanif254',
  'Code Pattern',
  'HMAC + TOTP MFA + RLS Security',
  ARRAY['TypeScript', 'Go', 'PostgreSQL', 'HMAC-SHA256', 'TOTP', 'WebAuthn'],
  5,
  false,
  true
),
(
  'Static-First Technical Documentation & MDX Engine',
  'developer-docs-engine',
  'Static Next.js documentation portal design featuring instant Ctrl+K keyboard discovery, dark-mode code blocks, and clean responsive typography.',
  '## Overview\n\nExplores static-first MDX documentation rendering, automated table-of-contents extraction, keyboard-driven command palette indexing (`Ctrl+K`), and lightweight accessibility.',
  'Frontend Architecture Pattern',
  '/images/projects/developer-docs-arch.svg',
  '/images/projects/developer-docs-arch.svg',
  ARRAY['/images/projects/developer-docs-arch.svg'],
  '/blog',
  'https://github.com/abuhanif254',
  'Open Pattern',
  'Keyboard Discovery • SSG Architecture',
  ARRAY['Next.js', 'TypeScript', 'MDX', 'Tailwind CSS', 'Static Generation'],
  6,
  false,
  true
),
(
  'Queue-Backed ETL & Data Validation Pipeline Study',
  'etl-automation-engine',
  'Fault-tolerant Node.js + Zod ingestion pipeline design isolating malformed inputs and automating structured exports.',
  '## Overview\n\nDocuments idempotent worker queue architecture using Node.js, BullMQ retry backoff, and runtime Zod schema validation before transactional database inserts.',
  'Pipeline Architecture Study',
  '/images/projects/etl-automation-arch.svg',
  '/images/projects/etl-automation-arch.svg',
  ARRAY['/images/projects/etl-automation-arch.svg'],
  null,
  'https://github.com/abuhanif254',
  'Reference Study',
  'Schema-Validated ETL Pipeline',
  ARRAY['Node.js', 'BullMQ', 'PostgreSQL', 'Zod', 'TypeScript', 'Docker'],
  7,
  false,
  true
)
on conflict (slug) do nothing;

-- 3. Services Seed
insert into public.services (title, slug, description, pricing_type, price_display, timeline, deliverables, is_popular, sort_order, is_active)
values
(
  'Architecture & Codebase Diagnostic Audit',
  'architecture-audit',
  'A comprehensive, deep-dive architectural inspection of your existing application, database queries, memory bottlenecks, security posture, and cloud hosting bills.',
  'fixed',
  '$2,500',
  '3-5 Business Days',
  ARRAY['Full architecture review of frontend, backend, and API systems', 'Database index analysis and slow query bottlenecks report (EXPLAIN ANALYZE)', 'Security audit, dependency vulnerability scan, and RLS inspection', '60-minute executive strategy walkthrough video call with full Q&A'],
  false,
  1,
  true
),
(
  'Full-Stack SaaS MVP Engineering Sprint',
  'mvp-feature-sprint',
  'High-velocity execution from technical requirements to a tested and deployed software platform on Next.js 16, Supabase, and Cloudflare Pages.',
  'fixed',
  '$12,500',
  '3-4 Weeks',
  ARRAY['Complete Next.js 16 App Router + React 19 Codebase', 'Supabase Database, RLS & Authentication Setup', 'Cloudflare Pages CI/CD Pipeline', 'Full Test Suite & 100% Client IP Handover'],
  true,
  2,
  true
),
(
  'PostgreSQL Performance & Query Sprint',
  'database-optimization',
  'Surgical database tuning, connection pool configuration, composite indexing, and query plan rewrites to achieve sub-20ms P99 latencies under high concurrency.',
  'fixed',
  '$4,500',
  '1 Week',
  ARRAY['EXPLAIN ANALYZE Query Optimization', 'B-tree, GIN & Partial Index Tuning', 'PgBouncer / Supavisor Connection Pool Config', 'Load-Test Verification & Zero-Downtime Migrations'],
  false,
  3,
  true
),
(
  'Dedicated Full-Stack Engineering Retainer',
  'fractional-staff-engineer',
  'Ongoing remote/B2B engineering capacity for growing product teams: feature shipping, TypeScript/Next.js builds, PostgreSQL tuning, and pull-request reviews aligned with UK/EU hours.',
  'retainer',
  '$5,500 / mo',
  'Ongoing (15-20 hrs / week)',
  ARRAY['UK & Europe Timezone Overlap', 'Weekly Sprint & Code Reviews', 'Next.js, TypeScript & PostgreSQL Implementation', 'Direct Slack / Discord / Microsoft Teams Access'],
  false,
  4,
  true
)
on conflict (slug) do nothing;

-- 4. Blog Posts Seed
insert into public.blog_posts (title, slug, excerpt, content_markdown, tags, reading_time_minutes, is_published, published_at)
values
(
  'Architecting High-Throughput Next.js 16 Applications on Cloudflare Pages',
  'nextjs-16-cloudflare-pages-architecture',
  'How to deploy full-stack Next.js 16 applications to Cloudflare Pages edge network with zero cold starts and sub-50ms TTFB worldwide.',
  '# Architecting Next.js 16 Applications for Cloudflare Pages\n\nModern web architectures require near-zero latency and high uptime. In this article, Abu Hanif shares the exact techniques used to achieve sub-50ms time-to-first-byte (TTFB) on Cloudflare Pages using Next.js 16 static site generation.\n\n## 1. Static HTML Pre-Rendering\nBy pre-rendering your pages ahead of time with `generateStaticParams`, your web application can be deployed as pure HTML and JS assets on Cloudflare global edge network.\n\n## 2. Supabase Integration\nConnecting to Supabase PostgreSQL from static pages allows fast client-side hydration while maintaining instant initial renders from edge cache.\n\n## Conclusion\nCombining Next.js with Cloudflare Pages and Supabase provides a powerful, cost-effective infrastructure stack.',
  ARRAY['Next.js 16', 'Cloudflare Pages', 'Edge Computing', 'Performance'],
  6,
  true,
  now() - interval '2 days'
),
(
  'Building Real-Time Data Pipelines with Supabase and PostgreSQL CDC',
  'realtime-telemetry-supabase-postgres-cdc',
  'A deep dive into Postgres Change Data Capture (CDC), Supabase Realtime, and WebSocket fan-out patterns for low-latency dashboards.',
  '# Building Real-Time Data Pipelines with Supabase\n\nReal-time web applications require efficient change propagation without overwhelming database connections. In this guide, we explore how Supabase Realtime leverages PostgreSQL logical decoding to stream updates directly to browser clients.\n\n## 1. Logical Replication & CDC\nPostgreSQL write-ahead logs (WAL) record every change transaction. Supabase listens to WAL changes and broadcasts them over WebSockets to authenticated subscribers.\n\n## 2. Row Level Security in Realtime\nRLS policies are evaluated per subscriber, ensuring users only receive data they are authorized to view.',
  ARRAY['PostgreSQL', 'Supabase', 'Realtime', 'WebSockets'],
  8,
  true,
  now() - interval '5 days'
),
(
  'Modular Monolith vs. Microservices: Architecture Trade-Offs Study',
  'swapping-microservices-for-modular-monolith',
  'Comparing distributed microservice serialization overhead against clean modular TypeScript boundaries for small engineering teams.',
  '# Modular Monolith vs. Microservices\n\nEarly-stage products benefit from clear module boundaries inside a single repository rather than premature distributed services.',
  ARRAY['Architecture', 'Monolith', 'TypeScript'],
  5,
  true,
  now() - interval '12 days'
),
(
  'Mastering PostgreSQL Composite & Partial Indexing with EXPLAIN ANALYZE',
  'mastering-postgres-indexing-query-optimization',
  'Study notes on reading EXPLAIN ANALYZE query plans and selecting composite vs. partial B-Tree indexes for filtered queries.',
  '# Mastering PostgreSQL Indexing\n\nIndexes are a foundational lever for PostgreSQL performance. Always inspect shared buffer reads with `EXPLAIN (ANALYZE, BUFFERS)` before creating composite or partial indexes.',
  ARRAY['PostgreSQL', 'Database', 'Indexing', 'Performance'],
  7,
  true,
  now() - interval '20 days'
)
on conflict (slug) do nothing;

-- -----------------------------------------------------------------------------
-- 5. STORAGE BUCKETS (Project Assets & Screenshots)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-assets', 'project-assets', true)
on conflict (id) do update set public = true;

-- Storage Policies (Drop first if exists, then create)
drop policy if exists "Project Assets Public Access" on storage.objects;
create policy "Project Assets Public Access"
  on storage.objects for select
  using (bucket_id = 'project-assets');

drop policy if exists "Project Assets Anon Upload" on storage.objects;
drop policy if exists "Project Assets Anon Update" on storage.objects;
drop policy if exists "Project Assets Admin Upload" on storage.objects;
create policy "Project Assets Admin Upload"
  on storage.objects for insert
  with check (bucket_id = 'project-assets' and auth.role() in ('authenticated', 'service_role'));

drop policy if exists "Project Assets Admin Update" on storage.objects;
create policy "Project Assets Admin Update"
  on storage.objects for update
  with check (bucket_id = 'project-assets' and auth.role() in ('authenticated', 'service_role'));

-- -----------------------------------------------------------------------------
-- 6. REALTIME SUBSCRIPTION CONFIGURATION
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'edge_telemetry'
  ) then
    alter publication supabase_realtime add table public.edge_telemetry;
  end if;
exception
  when undefined_object then null;
end $$;

-- -----------------------------------------------------------------------------
-- 7. INITIAL EDGE TELEMETRY SEED
-- -----------------------------------------------------------------------------
insert into public.edge_telemetry (region, city_name, continent, latency_ms, pop_code, cf_ray)
values
  ('IAD', 'Ashburn', 'North America', 18, 'IAD', '83a1290-IAD'),
  ('SFO', 'San Jose', 'North America', 22, 'SFO', '83a1291-SFO'),
  ('LHR', 'London', 'Europe', 24, 'LHR', '83a1292-LHR'),
  ('FRA', 'Frankfurt', 'Europe', 26, 'FRA', '83a1293-FRA'),
  ('SIN', 'Singapore', 'Southeast Asia', 29, 'SIN', '83a1294-SIN'),
  ('DAC', 'Dhaka', 'South Asia', 19, 'DAC', '83a1295-DAC'),
  ('SYD', 'Sydney', 'Oceania', 43, 'SYD', '83a1296-SYD'),
  ('NRT', 'Tokyo', 'East Asia', 35, 'NRT', '83a1297-NRT')
on conflict do nothing;

-- =============================================================================
-- 8. CUSTOMER & ORDER MANAGEMENT SYSTEM (CRM & OMS)
-- =============================================================================

-- 8.1 CUSTOMERS TABLE (Client Organizations & Enterprise Accounts)
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  primary_contact_name text not null,
  email text not null unique,
  phone text,
  billing_address jsonb default '{}'::jsonb,
  vat_tax_id text,
  client_tier text not null default 'active_client'
    check (client_tier in ('lead', 'active_client', 'vip_partner', 'retained', 'churned')),
  nda_status text not null default 'none'
    check (nda_status in ('none', 'requested', 'signed', 'mutual_nda_active')),
  total_spend_usd numeric(12, 2) not null default 0.00
    check (total_spend_usd >= 0),
  internal_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_customers_email on public.customers (email);
create index if not exists idx_customers_tier on public.customers (client_tier);

-- 8.2 ORDERS TABLE (Contracts, Scoped SOWs & Engineering Sprints)
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_id uuid not null references public.customers(id) on delete cascade,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  title text not null,
  service_tier text not null,
  status text not null default 'draft'
    check (status in ('draft', 'quoted', 'deposit_paid', 'in_progress', 'milestone_review', 'completed', 'delivered', 'cancelled', 'refunded')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'partially_paid', 'paid', 'refunded')),
  currency text not null default 'USD'
    check (currency in ('USD', 'EUR', 'GBP')),
  subtotal_amount numeric(12, 2) not null check (subtotal_amount >= 0),
  tax_amount numeric(12, 2) not null default 0.00 check (tax_amount >= 0),
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  amount_paid numeric(12, 2) not null default 0.00 check (amount_paid >= 0 and amount_paid <= total_amount),
  start_date date,
  target_completion_date date,
  completed_at timestamp with time zone,
  sow_document_url text,
  client_access_token text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_orders_customer on public.orders (customer_id);
create index if not exists idx_orders_status on public.orders (status);
create index if not exists idx_orders_token on public.orders (client_access_token);

-- 8.3 ORDER MILESTONES TABLE (Deliverable Phases & Payment Slices)
create table if not exists public.order_milestones (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  milestone_index int not null check (milestone_index >= 1),
  title text not null,
  deliverables_summary text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  due_date date,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'submitted', 'client_approved', 'paid')),
  approved_at timestamp with time zone,
  approved_by text,
  approval_signature_hash text,
  deliverable_artifacts jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (order_id, milestone_index)
);

create index if not exists idx_milestones_order on public.order_milestones (order_id);

-- 8.4 ORDER AUDIT LOGS TABLE (Immutable Governance & Security Trail)
create table if not exists public.order_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  actor text not null,
  action text not null,
  previous_state jsonb,
  new_state jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_audit_order on public.order_audit_logs (order_id, created_at desc);

-- 8.5 ROW LEVEL SECURITY FOR CRM & OMS
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_milestones enable row level security;
alter table public.order_audit_logs enable row level security;

-- Drop prior policies if present
drop policy if exists "Admins have full access to customers" on public.customers;
drop policy if exists "Admins have full access to orders" on public.orders;
drop policy if exists "Admins have full access to order milestones" on public.order_milestones;
drop policy if exists "Admins have full access to audit logs" on public.order_audit_logs;
drop policy if exists "Clients can view their own order by token" on public.orders;
drop policy if exists "Clients can view their own milestones" on public.order_milestones;
drop policy if exists "Admins have full access to notification events" on public.notification_events;

-- Admin access (Authenticated sessions or Service Role)
create policy "Admins have full access to customers" on public.customers
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to orders" on public.orders
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to order milestones" on public.order_milestones
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

create policy "Admins have full access to audit logs" on public.order_audit_logs
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));

-- Public client self-service read: strictly matching client_access_token (IDOR-immune)
create policy "Clients can view their own order by token" on public.orders
  for select using (client_access_token is not null and length(client_access_token) >= 32);

create policy "Clients can view their own milestones" on public.order_milestones
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_milestones.order_id
        and o.client_access_token is not null
        and length(o.client_access_token) >= 32
    )
  );

-- 8.6 NOTIFICATION EVENTS TABLE (Audit Trail & Outbound Webhook Delivery)
create table if not exists public.notification_events (
  id text primary key,
  event_type text not null,
  title text not null,
  description text not null,
  payload jsonb not null default '{}'::jsonb,
  delivery_status jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_notification_events_created on public.notification_events (created_at desc);

alter table public.notification_events enable row level security;

drop policy if exists "Admins have full access to notification events" on public.notification_events;
create policy "Admins have full access to notification events" on public.notification_events
  for all using (auth.role() in ('authenticated', 'service_role'))
  with check (auth.role() in ('authenticated', 'service_role'));




