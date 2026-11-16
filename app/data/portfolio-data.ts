export interface HeroSlideAsset {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export interface VisualAssetsConfig {
  profilePhotoUrl: string;
  certificatePhotoUrl?: string;
  logoUrl?: string;
  heroSlides: HeroSlideAsset[];
}

export interface LegalGdprConfig {
  controllerName: string;
  tradingAs?: string;
  controllerAddress: string;
  controllerEmail: string;
  controllerPhone: string;
  icoOrRegistrationNote?: string;
  dataRetentionSummary: string;
  subProcessorsNote: string;
  privacyPolicyCustomNotes: string;
  termsCustomNotes: string;
  lastUpdated: string;
  invoiceTaxId?: string;
  invoiceBankName?: string;
  invoiceSwiftBic?: string;
  invoiceAccountOrIban?: string;
  invoiceNotes?: string;
}

export interface SpokenLanguage {
  language: string;
  level: string;
}

export interface WorkPreference {
  modes: string[];
  regions: string[];
  timezoneOverlap: string;
  targetRoles: string;
}

export interface EducationEntry {
  credential: string;
  institution: string;
  details: string;
  period: string;
}

export interface WorkExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
}

export interface ProfileData {
  fullName: string;
  kicker: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availabilityStatus: string;
  isAvailable: boolean;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook?: string;
    instagram?: string;
    discord?: string;
  };
  spokenLanguages: SpokenLanguage[];
  workPreferences: WorkPreference;
  educationHistory: EducationEntry[];
  workHistory: WorkExperienceEntry[];
  visualAssets: VisualAssetsConfig;
  legalGdpr: LegalGdprConfig;
}

export interface Competency {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  descriptionMarkdown: string;
  clientName: string;
  demoUrl?: string;
  githubUrl?: string;
  priceTag: string;
  impactMetric: string;
  techStack: string[];
  isFeatured: boolean;
  published: boolean;
  imageUrl?: string;
  screenshots?: string[];
}

export interface ServicePricing {
  id: string;
  title: string;
  slug: string;
  description: string;
  pricingType: "fixed" | "hourly" | "retainer";
  priceDisplay: string;
  timeline: string;
  deliverables: string[];
  isPopular: boolean;
  isActive: boolean;
  category?: "growth-seo" | "web-saas" | "systems-architecture" | "systems-cloud";
  tagline?: string;
  roiMetric?: string;
  techStack?: string[];
  engagementSteps?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  isPublished: boolean;
  coverImageUrl?: string;
}

export interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  authorAvatar?: string;
  verifiedMetric?: string;
  deliverableTag?: string;
  projectSlug?: string;
  serviceSlug?: string;
  engagementScope?: string;
  engagementDuration?: string;
  deliverablesCompleted?: string[];
  verificationBadge?: string;
  category?: "telemetry" | "edge" | "postgres" | "ai" | "security" | "fullstack";
}

export const initialProfile: ProfileData = {
  fullName: "MD Abu Hanif Mia",
  kicker: "Full-Stack Web Developer & International Operations Professional",
  headline: "Next.js & TypeScript Builder • Multi-Sector Operations • Open to UK & Europe",
  bio: "Full-Stack Web Developer (Next.js, TypeScript, React, Node.js, PostgreSQL) and disciplined international operations professional. Built live production platforms including NexusCalculator.net, completed Programming Hero (2025, Batch-12) alongside self-directed study in TypeScript, Python, Rust, and C++ on freeCodeCamp, and bring 7+ years of front-line hospitality, manufacturing, and sales experience across Bangladesh and Oman. Open to Remote, B2B Contract, and On-Site / Relocation opportunities in the UK, Europe, and worldwide.",
  email: "abuhanifmain@gmail.com",
  phone: "+880 1724-010261",
  location: "Sadar Upazila, Kishoreganj, Dhaka, Bangladesh",
  availabilityStatus: "Open to Remote, B2B Contract & On-Site / Relocation (UK, Europe & Worldwide)",
  isAvailable: true,
  socialLinks: {
    github: "https://github.com/abuhanif254",
    linkedin: "https://www.linkedin.com/in/md-abu-hanif-mia",
    twitter: "https://x.com/MohammadBitull1",
    facebook: "https://www.facebook.com/bitulla",
    instagram: "https://www.instagram.com/bitullah_aj",
    discord: "https://discord.com",
  },
  spokenLanguages: [
    { language: "Bengali", level: "Native (C2)" },
    { language: "English", level: "Conversational (Working Proficiency)" },
    { language: "Hindi & Urdu", level: "Conversational" },
  ],
  workPreferences: {
    modes: ["Remote", "B2B Contract", "On-Site / Relocation"],
    regions: ["United Kingdom (GMT / BST)", "Europe (CET / CEST)", "Worldwide"],
    timezoneOverlap: "Flexible shift alignment with UK (GMT/BST) & Central Europe (CET/CEST) hours",
    targetRoles: "Junior / Full-Stack Web Developer, Technical Support, Web Operations & International Roles",
  },
  educationHistory: [
    {
      credential: "Higher Secondary Certificate (HSC) — Commerce",
      institution: "Wali Neowaj Khan College",
      details: "EIIN: 110495 • Board: Dhaka Education Board",
      period: "2016 – 2017",
    },
    {
      credential: "Web Development Course (Batch-12 • ID: WEB12-3991)",
      institution: "Programming Hero",
      details: "JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB & Full-Stack Workflows",
      period: "2025",
    },
    {
      credential: "Self-Directed Programming Curriculum",
      institution: "freeCodeCamp",
      details: "Self-learned TypeScript, Python, Rust, C++, Web Architecture & Problem Solving",
      period: "Self-Study",
    },
  ],
  workHistory: [
    {
      role: "Waiter (Hospitality & Catering Operations)",
      company: "WACASCO Catering Services",
      location: "Oman",
      period: "2022 – 2025",
      summary: "Delivered front-of-house hospitality and catering service in an international team environment across Oman, communicating with guests and colleagues in English, Hindi, and Urdu while maintaining hygiene and service-speed standards.",
    },
    {
      role: "Production Operator",
      company: "PRAN-RFL Group",
      location: "Palash, Narsingdi, Bangladesh",
      period: "2018 – 2022",
      summary: "Operated industrial manufacturing machinery, conducted routine quality checks, and supported shift output targets and safety compliance across four years of continuous service.",
    },
    {
      role: "Salesman",
      company: "Unilever Bangladesh",
      location: "Bangladesh",
      period: "2017 – 2018",
      summary: "Managed territory retail sales visits, product merchandising, order collection, and customer account follow-up across FMCG retail outlets.",
    },
  ],
  visualAssets: {
    profilePhotoUrl: "/images/profile.png",
    certificatePhotoUrl: "/images/programming-hero-certificate.png",
    logoUrl: "/images/abuhanif-logo-v3.svg",
    heroSlides: [
      {
        id: "slide-1",
        src: "/images/hero/hero-slide-1.jpg",
        alt: "Full-Stack Development & Live Web Operations Workspace",
        title: "Full-Stack Web Engineering",
        subtitle: "Next.js 16 • TypeScript • Supabase • Cloudflare Pages",
      },
      {
        id: "slide-2",
        src: "/images/hero/hero-slide-2.jpg",
        alt: "Nexus Calculator — 300+ Interactive Tools Platform",
        title: "Real Production Products",
        subtitle: "Creator of NexusCalculator.net (312 Tools • 4 Languages)",
      },
      {
        id: "slide-3",
        src: "/images/hero/hero-slide-3.jpg",
        alt: "PostgreSQL & Edge Infrastructure Learning & Practice",
        title: "Databases, Rust & Systems",
        subtitle: "PostgreSQL • Python • Rust • C++ Foundations",
      },
      {
        id: "slide-4",
        src: "/images/hero/hero-slide-4.jpg",
        alt: "UK & Europe Remote, B2B, and On-Site Work Readiness",
        title: "UK & Europe Collaboration",
        subtitle: "Remote • B2B Contract • On-Site / Relocation Ready",
      },
    ],
  },
  legalGdpr: {
    controllerName: "MD Abu Hanif Mia",
    tradingAs: "Abu Hanif — Web Development Portfolio & Client OMS",
    controllerAddress: "Sadar Upazila, Kishoreganj, Dhaka, Bangladesh",
    controllerEmail: "abuhanifmain@gmail.com",
    controllerPhone: "+880 1724-010261",
    icoOrRegistrationNote: "Individual software developer & sole service provider (not VAT-registered; statutory tax details supplied directly on signed client contracts).",
    dataRetentionSummary: "Contact form inquiries and project communication logs are retained only as long as necessary to evaluate employment opportunities, respond to messages, or administer active client engagements (typically up to 12 months unless extended by contract or legal obligation).",
    subProcessorsNote: "Hosted on edge/cloud infrastructure (Cloudflare Pages) with optional database storage on Supabase (PostgreSQL). Strictly necessary security cookies are set solely during authenticated Admin sign-in.",
    privacyPolicyCustomNotes: "Under UK GDPR and EU GDPR, you may request access, correction, portability, or deletion of any inquiry data at any time by emailing abuhanifmain@gmail.com.",
    termsCustomNotes: "Any commercial freelance, B2B, or employment terms are confirmed in writing prior to project kickoff or onboarding.",
    lastUpdated: "2026-11-16",
    invoiceTaxId: "Individual / Sole Provider (Tax reference supplied on signed engagement)",
    invoiceBankName: "Bank Transfer / Wise Commercial Routing",
    invoiceSwiftBic: "Provided on formal signed invoice",
    invoiceAccountOrIban: "Provided privately on signed engagement",
    invoiceNotes: "All agreed client intellectual property and source deliverables transfer upon final milestone settlement.",
  },
};

export const competencies: Competency[] = [
  {
    title: "Distributed Systems",
    slug: "distributed-systems",
    tagline: "Fault-tolerant, high-concurrency event-driven backends",
    description: "Designing message queues, worker pools, partition-tolerant storage, and resilient consensus algorithms capable of handling millions of requests per minute.",
    skills: ["Go", "Kafka", "Redis", "gRPC", "Docker", "Kubernetes"],
  },
  {
    title: "High-Throughput APIs",
    slug: "high-throughput-apis",
    tagline: "Ultra-low latency REST, GraphQL & WebSocket services",
    description: "Building production-grade APIs optimized for sub-50ms P99 response times with robust rate limiting, caching strategies, and zero-downtime deployments.",
    skills: ["Node.js", "TypeScript", "FastAPI", "WebSockets", "Cloudflare Workers"],
  },
  {
    title: "Next.js & React Applications",
    slug: "nextjs-react-apps",
    tagline: "Accessible, interactive, server-rendered web applications",
    description: "Crafting modern web apps utilizing Next.js App Router, React Server Components, state management, and strict TypeScript types with 100/100 Core Web Vitals.",
    skills: ["Next.js 16", "React 19", "Tailwind CSS", "Zustand", "Radix UI"],
  },
  {
    title: "PostgreSQL & Database Optimization",
    slug: "database-optimization",
    tagline: "Complex schema modeling, query indexing & RLS security",
    description: "Architecting relational schemas, optimizing slow query plans with EXPLAIN ANALYZE, writing migration workflows, and configuring connection pooling.",
    skills: ["PostgreSQL", "Supabase", "Prisma", "pgvector", "TimescaleDB"],
  },
  {
    title: "Cloud Infrastructure & DevOps",
    slug: "cloud-devops",
    tagline: "Automated CI/CD, Infrastructure as Code & Edge Hosting",
    description: "Deploying immutable infrastructure on AWS, GCP, and Cloudflare with Terraform, automated GitHub Actions pipelines, and comprehensive Prometheus telemetry.",
    skills: ["Cloudflare Pages", "AWS ECS/Lambda", "Terraform", "GitHub Actions"],
  },
  {
    title: "AI & LLM Agent Integrations",
    slug: "ai-llm-integrations",
    tagline: "Semantic search, RAG pipelines & autonomous agent workflows",
    description: "Integrating modern LLMs into business logic via vector embeddings, structured outputs, streaming completions, and multi-step tool-use agents.",
    skills: ["OpenAI", "Anthropic Claude", "LangChain", "pgvector", "LlamaIndex"],
  },
  {
    title: "Security & Auth Architecture",
    slug: "security-auth",
    tagline: "Zero-trust auth, OAuth2, RBAC & compliance readiness",
    description: "Implementing hardened authentication, session revocation, cryptographic signatures, SOC2 compliance guardrails, and role-based permissions.",
    skills: ["OAuth2 / OIDC", "Supabase Auth", "JWT", "WebAuthn / Passkeys"],
  },
  {
    title: "CI/CD & Deployment Automation",
    slug: "cicd-automation",
    tagline: "Fast, reliable testing and deployment pipelines",
    description: "Eliminating manual release anxiety with preview environments, automated unit & integration testing, semantic versioning, and blue-green rollouts.",
    skills: ["GitHub Actions", "Docker Buildx", "Turborepo", "Vitest", "Playwright"],
  },
  {
    title: "Microservices & Event Architecture",
    slug: "microservices-event-architecture",
    tagline: "Decoupled domain services with transactional consistency",
    description: "Breaking monolithic bottlenecks into bounded context services using outbox patterns, CQRS, and message-driven synchronization.",
    skills: ["RabbitMQ", "Apache Pulsar", "Event Sourcing", "Domain-Driven Design"],
  },
  {
    title: "Mobile & Cross-Platform Apps",
    slug: "mobile-apps",
    tagline: "High-performance React Native & responsive progressive web apps",
    description: "Delivering native mobile experiences with shared business logic, offline-first syncing, and biometric hardware authentication.",
    skills: ["React Native", "Expo", "PWA", "SQLite", "Native Modules"],
  },
  {
    title: "Technical Debt Remediation",
    slug: "technical-debt-remediation",
    tagline: "Surgical refactoring of legacy codebases without breaking changes",
    description: "Systematically modernizing brittle legacy systems, increasing test coverage, untangling tight coupling, and lowering developer onboarding friction.",
    skills: ["Strangler Fig Pattern", "TypeScript Migration", "Code Audits"],
  },
  {
    title: "System Performance Audits",
    slug: "performance-audits",
    tagline: "Profiling memory leaks, CPU bottlenecks & network latency",
    description: "Deep profiling with Chrome DevTools, Flamegraphs, and synthetic load tests to identify and eliminate latency bottlenecks across client and server.",
    skills: ["k6 Load Testing", "Flamegraph", "Core Web Vitals", "Lighthouse"],
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-nexus",
    title: "Nexus Calculator — 300+ Interactive Tools & Guides Platform",
    slug: "nexus-calculator-platform",
    summary: "Live production multilingual web platform (nexuscalculator.net) with 312 interactive calculators & developer tools, 190+ guides, and 3,200+ static pages across English, Spanish, French, and German.",
    descriptionMarkdown: `### Live Production Product (nexuscalculator.net)
Built and launched from scratch as an independent full-stack web developer using Next.js 15 App Router, TypeScript, next-intl, and static site generation.

### Engineering & Architecture Highlights
- **Unified Tool Registry (\`lib/registry\`)**: Structured 177 financial/math calculators and 135 developer, PDF, and media tools into a typed registry driving routing, search, sitemaps, and Schema.org JSON-LD.
- **Bundle Isolation**: Split client interactive components with \`next/dynamic\` lazy wrappers, cutting initial First Load JS significantly compared to a monolithic bundle.
- **Multilingual & UK/EU SEO**: Localized routing and hreflang canonicals across \`en\`, \`es\`, \`fr\`, and \`de\` including UK mortgage and regional financial utilities, with Google Search Console visibility of 379k+ impressions over 3 months.
- **Privacy-First In-Browser Processing**: PDF, image, and formatter tools run directly in the visitor's browser without server file retention.`,
    clientName: "Own Production Platform (Live)",
    demoUrl: "https://nexuscalculator.net",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Live Production",
    impactMetric: "312 Tools • 4 Languages • 379k+ GSC Impr.",
    techStack: ["Next.js 15", "TypeScript", "React", "next-intl", "Tailwind CSS", "Vercel"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/nexuscalculator-homepage.png",
    screenshots: [
      "/images/nexuscalculator-homepage.png",
      "/images/gsc-performance-3months.png",
    ],
  },
  {
    id: "proj-spielcade",
    title: "Spielcade — Instant HTML5 Browser Gaming Portal (PixelPlay)",
    slug: "spielcade-browser-gaming-platform",
    summary: "Live production Next.js & Supabase web gaming platform (spielcade.com) built inside a Turborepo monorepo, indexing 18,546+ instant HTML5 browser games across 25+ genres with offline PWA support, XP leaderboards, quests, and creator guides.",
    descriptionMarkdown: `### Live Production Platform (spielcade.com)
Engineered as a scalable HTML5 browser gaming portal inside a **Turborepo + pnpm** monorepo (\`apps/web\` & \`@spielcade/games\`), pairing Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase (\`@supabase/ssr\`) with instant client-side search and offline-capable PWA support (\`@ducanh2912/next-pwa\`).

### Key Implemented Features & Modules
- **High-Scale Catalog & Instant Discovery**: Indexed **18,546+ HTML5/WebGL browser games** across **25+ genres** with \`Cmd/Ctrl+K\` spotlight search, multi-facet category/sort filters, popular tag clusters, **"Surprise Me"** launcher, and a full **A–Z Games Directory**.
- **Interactive Game Player & Offline Mode**: Dedicated game play pages with \`Fullscreen\`, \`Theater\`, \`Controls\`, audio toggle, favorite/share triggers, structured *"How to Play"* walkthroughs, and \`OFFLINE READY\` PWA caching.
- **Engagement, Tournaments & Content Hub**: Level & XP progression (\`Daily Streak\`, \`Lv.\` badges), **Global / Weekly / Monthly Leaderboards** & Daily Arcade Cup, Party & Quests routes, **Developer Studio** publishing gateway, and MDX-powered **Featured Articles, Guides & Walkthroughs**.`,
    clientName: "Own Production Platform (spielcade.com)",
    demoUrl: "https://spielcade.com",
    githubUrl: "https://github.com/abuhanif254/PixelPlay",
    priceTag: "Live Production",
    impactMetric: "18,546+ Games • 25+ Genres • Turborepo + Supabase",
    techStack: ["Next.js 14", "TypeScript", "React 18", "Supabase", "Turborepo", "PWA", "Three.js", "Vitest"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/projects/spielcade-homepage.png",
    screenshots: [
      "/images/projects/spielcade-homepage.png",
      "/images/projects/spielcade-all-games.png",
      "/images/projects/spielcade-gameplay.jpg",
      "/images/projects/spielcade-leaderboard.png",
      "/images/projects/spielcade-blog.png",
      "/images/projects/spielcade-footer-directory.jpg",
    ],
  },
  {
    id: "proj-sadhyer-bazar",
    title: "Sadhyer Bazar — Client Organic E-Commerce Platform",
    slug: "sadhyer-bazar-ecommerce-platform",
    summary: "Commercial client e-commerce platform (sadhyerbazar.com) built on Next.js, Cloudflare Pages, Supabase & PostgreSQL with SSLCommerz, bKash, Nagad & COD checkout, live family combo builder, batch pre-order quotas, and a custom Merchant Admin Panel.",
    descriptionMarkdown: `### Live Commercial Client Delivery (sadhyerbazar.com)
Designed and delivered end-to-end for **Sadhyer Bazar (সাধ্যের বাজার)**, a Bangladesh-wide farm-to-home fresh fish, ghee, yogurt, poultry, and staple rice store running on **Next.js** hosted on **Cloudflare Pages**, backed by **Supabase & PostgreSQL**.

### Key Engineered Systems & Payment Integrations
- **Multi-Gateway Local & Card Checkout**: Integrated **SSLCommerz** (Visa/Mastercard), **bKash**, **Nagad**, and nationwide **Cash on Delivery (COD)** with Inside Dhaka / Outside Dhaka shipping tier rules (\`৳100\` / \`৳130\`).
- **Pre-Order Batch Quotas & Weekly Family Combo Builder**: Interactive bundle builder with live discount calculation (\`FAMILYBOX8\`, up to 8% savings), live harvest dispatch batch counters (e.g., \`48 / 60\` booked quotas), pack-size variants (\`500g\`, \`1kg\`, \`2kg\`, \`5kg\`), and bilingual Bengali/English UI.
- **Customer Tracking & Custom Merchant Admin Panel**: Real-time **Track Order by ID** flow for customers alongside a custom-designed **Merchant Management Portal** for managing inventory batches, orders, promo codes, and deliveries in Supabase PostgreSQL.`,
    clientName: "Sadhyer Bazar (Client Commercial Project)",
    demoUrl: "https://sadhyerbazar.com",
    githubUrl: "https://github.com/sadhyacommunication/Sadyer-Bazar",
    priceTag: "Client Production",
    impactMetric: "Cloudflare Pages • Supabase PostgreSQL • SSLCommerz/bKash/Nagad",
    techStack: ["Next.js", "TypeScript", "Cloudflare Pages", "Supabase", "PostgreSQL", "SSLCommerz", "bKash", "Nagad"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/projects/sadhyer-bazar-hero.jpg",
    screenshots: [
      "/images/projects/sadhyer-bazar-hero.jpg",
      "/images/projects/sadhyer-bazar-combo-builder.png",
      "/images/projects/sadhyer-bazar-catalog.png",
      "/images/projects/sadhyer-bazar-product-batch.jpg",
      "/images/projects/sadhyer-bazar-preorder.png",
      "/images/projects/sadhyer-bazar-footer-payments.jpg",
    ],
  },
  {
    id: "proj-portfolio-oms",
    title: "Abu Hanif Portfolio, Admin CMS & Client OMS Platform",
    slug: "portfolio-crm-oms-platform",
    summary: "Full-stack Next.js 16 + TypeScript + Supabase PostgreSQL application powering this website: zero-trust HMAC admin portal, multi-currency B2B invoices, milestone tracking, and GDPR disclosures.",
    descriptionMarkdown: `### Live Production Application (abuhanifmia.com)
Engineered as a dual-purpose international career portfolio and B2B Client & Order Management System (OMS) running on Next.js 16 App Router, React 19, Supabase PostgreSQL, and Cloudflare edge hosting.

### Key Implemented Modules
- **Zero-Trust Auth & Security**: Stateless HMAC-SHA256 cookie sessions, Edge \`proxy.ts\` route gating, optional TOTP 2FA, and sliding-window rate limiting on login, telemetry, and contact APIs.
- **PostgreSQL + Supabase Storage**: Row-Level Security policies, \`SUPABASE_SECRET_KEY\` server writes, admin image uploader with binary magic-byte validation, and live \`/status\` DB health checks.
- **Multi-Currency B2B Workflows**: Statement of Work builder, printable UK/EU GDPR-compliant invoices (\`USD\`, \`GBP\`, \`EUR\`), SHA-256 milestone client sign-off tracker, and automated Vitest test suite.`,
    clientName: "Own Live Platform (abuhanifmia.com)",
    demoUrl: "/status",
    githubUrl: "https://github.com/abuhanifmain-art/hanif",
    priceTag: "Live Production",
    impactMetric: "Next.js 16 • Supabase RLS • Multi-Currency OMS",
    techStack: ["Next.js 16", "TypeScript", "React 19", "Supabase", "PostgreSQL", "Vitest"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/og-card.png",
    screenshots: [
      "/images/og-card.png",
    ],
  },
  {
    id: "proj-1",
    title: "Real-Time Financial Telemetry Pipeline (Reference Study)",
    slug: "financial-telemetry-pipeline",
    summary: "Interactive systems architecture blueprint & lab benchmark modeling WebSocket tick ingestion, Redis pub/sub fanout, and TimescaleDB rollups.",
    descriptionMarkdown: `### Reference Scenario
An architectural case study exploring how concurrent ingestion workers, binary WebSockets, and time-series tables handle high-frequency tick distribution.

### Architectural Implementation & Blueprint
- Concurrent worker pipeline patterns pairing Go / Node.js workers with lock-free ring buffers.
- Redis pub/sub fanout channel connected to PostgreSQL / TimescaleDB hypertable aggregations.
- Interactive throughput & failover explorer available in the [Systems Lab](/lab#topology-explorer).

### Scope & Verification Status
- **Status**: Reference Architecture Blueprint & Interactive Lab Simulator (not a commercial client claim).
- **Focus**: Latency budgeting, backpressure mitigation, and time-series storage modeling.`,
    clientName: "Architecture Reference Blueprint",
    demoUrl: "/lab#topology-explorer",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Lab Blueprint",
    impactMetric: "Go + WebSocket Benchmark • Lab Simulator",
    techStack: ["Go", "Next.js", "WebSockets", "TimescaleDB", "Redis", "Docker"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/projects/telemetry-pipeline-arch.svg",
    screenshots: [
      "/images/projects/telemetry-pipeline-arch.svg",
      "/images/projects/postgres-audit-arch.svg",
    ],
  },
  {
    id: "proj-2",
    title: "Cloudflare Edge Multi-Tenant Storefront Blueprint",
    slug: "cloudflare-edge-ecommerce",
    summary: "Reference full-stack e-commerce & SaaS storefront architecture leveraging Next.js 16 App Router, Cloudflare Pages, Supabase PostgreSQL, and idempotent checkout queues.",
    descriptionMarkdown: `## Overview & Design Goal
Demonstrates edge-first SSR catalog rendering, stale-while-revalidate caching, and PostgreSQL read/pooler patterns to keep TTFB responsive across UK, European, and global visitors.

## Architectural Blueprint
- Next.js 16 App Router deployed on Cloudflare Pages edge workers.
- Supabase PostgreSQL schema with Row Level Security (RLS) and connection pooling.
- Idempotent order workflows matching the OMS engine running live inside this portfolio platform.

## Verification Status
- **Status**: Open Reference Blueprint & Portfolio Commerce Engine Pattern.`,
    clientName: "Edge Reference Blueprint",
    demoUrl: "/lab#edge-radar",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Reference Demo",
    impactMetric: "Next.js 16 Edge SSG • Live Radar",
    techStack: ["Next.js 16", "Cloudflare Pages", "Supabase", "TypeScript", "Tailwind CSS"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/projects/cloudflare-edge-arch.svg",
    screenshots: [
      "/images/projects/cloudflare-edge-arch.svg",
      "/images/projects/telemetry-pipeline-arch.svg",
    ],
  },
  {
    id: "proj-4",
    title: "PostgreSQL Query Profiling & Indexing Audit Study",
    slug: "postgres-performance-audit",
    summary: "Interactive EXPLAIN ANALYZE optimization study covering B-Tree composite indexes, partial indexes, PgBouncer pooling, and zero deadlocks under concurrency.",
    descriptionMarkdown: `## Diagnostic Focus
Analyzes common PostgreSQL sequential-scan bottlenecks, lock contention, and connection saturation alongside interactive SQL query plans in the Systems Lab.

## Architectural Techniques
- \`EXPLAIN (ANALYZE, BUFFERS)\` inspection across filtered time-window and multi-join queries.
- Composite B-Tree, GIN, and BRIN indexing strategies to eliminate full table scans.
- PgBouncer / Supavisor transaction pooling and autovacuum tuning to prevent lock buildup.

## Interactive Proof
- **Lab Simulator**: Test before/after query execution plans directly in \`/lab#postgres-planner\` demonstrating **0 Deadlocks** and drastic I/O reduction under simulated load.`,
    clientName: "Database Tuning Lab Study",
    demoUrl: "/lab#postgres-planner",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Lab Reference",
    impactMetric: "EXPLAIN ANALYZE • 0 Deadlocks Sim",
    techStack: ["PostgreSQL 16", "PgBouncer", "EXPLAIN ANALYZE", "SQL", "Supabase"],
    isFeatured: true,
    published: true,
    imageUrl: "/images/projects/postgres-audit-arch.svg",
    screenshots: [
      "/images/projects/postgres-audit-arch.svg",
    ],
  },
  {
    id: "proj-3",
    title: "Enterprise AI Document Search & RAG Pipeline Blueprint",
    slug: "enterprise-ai-document-search",
    summary: "Reference hybrid search architecture combining FastAPI webhook ingestion, PostgreSQL pgvector HNSW indexing, and BM25 + semantic retrieval.",
    descriptionMarkdown: `## Blueprint Scope
Designed to show clean chunking, idempotent SHA-256 hashing, and hybrid lexical + dense vector retrieval using PostgreSQL \`pgvector\` without external vendor lock-in.

## Architectural Solution
- Document ingestion pipeline splitting Markdown, PDF, and documentation pages into overlapping semantic chunks.
- Hybrid BM25 + pgvector cosine-distance ranking paired with strict citation grounding.`,
    clientName: "AI Architecture Blueprint",
    demoUrl: "/lab#topology-explorer",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Reference Demo",
    impactMetric: "pgvector Hybrid Search • Blueprint",
    techStack: ["Python", "FastAPI", "pgvector", "PostgreSQL", "React", "TypeScript"],
    isFeatured: false,
    published: true,
    imageUrl: "/images/projects/ai-rag-pipeline-arch.svg",
    screenshots: [
      "/images/projects/ai-rag-pipeline-arch.svg",
    ],
  },
  {
    id: "proj-5",
    title: "Zero-Trust Distributed Auth & RBAC Architecture Blueprint",
    slug: "zero-trust-auth-service",
    summary: "Security architecture pattern covering HMAC session signing, timing-safe comparison, WebAuthn/TOTP MFA, and PostgreSQL Row Level Security (RLS).",
    descriptionMarkdown: `## Security Focus
Models stateless HMAC-SHA256 admin session verification, RFC 6238 TOTP authenticator codes, encrypted credential storage patterns, and tenant isolation via Supabase RLS — core security primitives implemented in this codebase.`,
    clientName: "Security Pattern Reference",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Code Pattern",
    impactMetric: "HMAC + TOTP MFA + RLS Security",
    techStack: ["TypeScript", "Go", "PostgreSQL", "HMAC-SHA256", "TOTP", "WebAuthn"],
    isFeatured: false,
    published: true,
    imageUrl: "/images/projects/zero-trust-auth-arch.svg",
    screenshots: [
      "/images/projects/zero-trust-auth-arch.svg",
    ],
  },
  {
    id: "proj-6",
    title: "Static-First Technical Documentation & MDX Engine",
    slug: "developer-docs-engine",
    summary: "Static Next.js documentation portal design featuring instant Ctrl+K keyboard discovery, dark-mode code blocks, and clean responsive typography.",
    descriptionMarkdown: `## Overview
Explores static-first MDX documentation rendering, automated table-of-contents extraction, keyboard-driven command palette indexing (\`Ctrl+K\`), and lightweight accessibility.`,
    clientName: "Frontend Architecture Pattern",
    demoUrl: "/blog",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Open Pattern",
    impactMetric: "Keyboard Discovery • SSG Architecture",
    techStack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "Static Generation"],
    isFeatured: false,
    published: true,
    imageUrl: "/images/projects/developer-docs-arch.svg",
    screenshots: [
      "/images/projects/developer-docs-arch.svg",
    ],
  },
  {
    id: "proj-7",
    title: "Queue-Backed ETL & Data Validation Pipeline Study",
    slug: "etl-automation-engine",
    summary: "Fault-tolerant Node.js + Zod ingestion pipeline design isolating malformed inputs and automating structured exports.",
    descriptionMarkdown: `## Overview
Documents idempotent worker queue architecture using Node.js, BullMQ retry backoff, and runtime Zod schema validation before transactional database inserts.`,
    clientName: "Pipeline Architecture Study",
    githubUrl: "https://github.com/abuhanif254",
    priceTag: "Reference Study",
    impactMetric: "Schema-Validated ETL Pipeline",
    techStack: ["Node.js", "BullMQ", "PostgreSQL", "Zod", "TypeScript", "Docker"],
    isFeatured: false,
    published: true,
    imageUrl: "/images/projects/etl-automation-arch.svg",
    screenshots: [
      "/images/projects/etl-automation-arch.svg",
    ],
  },
];

export const initialServices: ServicePricing[] = [
  {
    id: "serv-seo",
    title: "Technical & Programmatic SEO Engineering",
    slug: "technical-programmatic-seo",
    description: "Automated programmatic SEO architectures, rich Schema.org knowledge graph injection, and 100/100 Core Web Vitals engineering to dominate organic search intent at scale.",
    pricingType: "fixed",
    priceDisplay: "$3,500",
    timeline: "1–2 Weeks",
    category: "growth-seo",
    tagline: "Programmatic URL Graphs, Schema Knowledge Injection & Sub-1.2s LCP",
    roiMetric: "100/100 Lighthouse • 10k+ Indexable Pages • 0 CLS",
    techStack: ["Next.js 16", "TypeScript", "Schema.org", "Google Indexing API", "Tailwind CSS", "Cloudflare Pages"],
    deliverables: [
      "Programmatic URL generation architecture supporting 10,000+ targeted indexable pages",
      "Comprehensive Schema.org JSON-LD knowledge graph (Organization, Service, FAQ, Article)",
      "Dynamic automated XML sitemap generation with Google Indexing API auto-pinging",
      "Core Web Vitals 100/100 audit (sub-1.2s LCP, CLS = 0.000, sub-50ms INP)",
      "Semantic keyword clustering, crawl-budget optimization & internal linking graph",
      "Automated canonicalization and hreflang tag configuration",
      "Real-time Google Search Console indexation telemetry and rankings monitoring",
    ],
    engagementSteps: [
      "1. Crawl & Indexing Audit (Search intent, site taxonomy, and keyword gaps)",
      "2. Programmatic Schema Architecture (JSON-LD knowledge graphs & metadata pipelines)",
      "3. Core Web Vitals Optimization (Eliminating render-blocking resources, 0 CLS)",
      "4. Launch & Search Console Mesh (Auto-pinging sitemaps & rank monitoring)",
    ],
    isPopular: true,
    isActive: true,
  },
  {
    id: "serv-automation",
    title: "Social Media Automation & Growth Bot Systems",
    slug: "social-media-automation",
    description: "Autonomous multi-platform content syndication pipelines, scheduling engines, and webhook-driven engagement bots across X/Twitter, LinkedIn, Discord, and Telegram.",
    pricingType: "fixed",
    priceDisplay: "$4,000",
    timeline: "2 Weeks",
    category: "growth-seo",
    tagline: "Autonomous Multi-Platform Syndication & Scheduled Engagement Queues",
    roiMetric: "100% Automated Syndication • 4 Major Social Networks • 0 Manual Effort",
    techStack: ["Node.js", "BullMQ", "Twitter API v2", "LinkedIn API", "Discord Webhooks", "Telegram Bot API", "Redis"],
    deliverables: [
      "Multi-platform automated syndication engine connecting X/Twitter, LinkedIn, Discord & Telegram",
      "Headless BullMQ queuing worker with automatic exponential backoff retry mechanisms",
      "AI-assisted post hook formatting and automated dynamic OpenGraph image rendering",
      "RSS-to-social ingestion pipeline turning blog posts into platform-native threads",
      "Real-time webhook dispatcher mesh with Slack/Discord operational alerts",
      "Tamper-resistant HMAC signature authentication on all incoming webhook triggers",
      "Delivery telemetry dashboard with post analytics and engagement logs",
    ],
    engagementSteps: [
      "1. Channel Architecture & API Provisioning (Twitter v2, LinkedIn, Discord tokens)",
      "2. Queue Worker & Ingestion Pipeline (BullMQ worker setup with Redis storage)",
      "3. Content Formatting Engine (Thread splitting, hashtag optimization & dynamic cards)",
      "4. Production Deployment & Telemetry (Webhook health check & automated failover)",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-landing",
    title: "High-Converting Next.js Landing Pages & CRO",
    slug: "high-converting-landing-pages",
    description: "Ultra-fast, performance-engineered landing pages built on Next.js 16 App Router with sub-50ms TTFB, high-converting interactive widgets, and friction-free payment checkouts.",
    pricingType: "fixed",
    priceDisplay: "$2,800",
    timeline: "5–7 Business Days",
    category: "growth-seo",
    tagline: "Sub-50ms Global Edge TTFB, Frictionless Checkout Funnels & Micro-Interactions",
    roiMetric: "+28% Checkout Conversion • Sub-50ms TTFB • 0 Layout Shifts",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Stripe API", "Cloudflare Pages", "TypeScript"],
    deliverables: [
      "Next.js 16 App Router + React 19 responsive, high-performance landing page",
      "Sub-50ms global edge TTFB via Cloudflare Pages and V8 isolate caching",
      "Interactive pricing/SOW calculator widgets and conversion-tested layout architecture",
      "Frictionless Stripe payment gateway or custom subscription onboarding integration",
      "Responsive mobile-first layout, semantic HTML landmarks, and zero layout shifts (CLS = 0)",
      "Privacy-first analytics telemetry (PostHog / Plausible) with zero cookie-banner latency",
      "A/B testing readiness and 30-day post-launch conversion warranty",
    ],
    engagementSteps: [
      "1. Conversion Blueprint & Wireframing (Information hierarchy and offer framing)",
      "2. Next.js 16 Edge Development (Interactive calculators, micro-animations, fast forms)",
      "3. Payment & Analytics Hookup (Stripe checkout, event tracking & lead routing)",
      "4. Edge Launch & Performance SLA (Cloudflare DNS cutover & sub-50ms verification)",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-custom-web",
    title: "Bespoke Custom Web Applications & Enterprise SaaS",
    slug: "custom-web-saas",
    description: "Production-grade, full-stack software platforms engineered from technical requirements to scalable cloud deployment in 3 to 4 weeks on Next.js 16, Supabase, and Cloudflare.",
    pricingType: "fixed",
    priceDisplay: "$14,500",
    timeline: "3–4 Weeks",
    category: "web-saas",
    tagline: "Enterprise Full-Stack Architecture, Zero-Trust Auth & Real-Time Sync",
    roiMetric: "100% Client IP Ownership • Full-Stack Delivery • Automated CI/CD",
    techStack: ["Next.js 16", "Supabase", "PostgreSQL", "React 19", "Tailwind CSS", "Stripe", "Cloudflare Pages"],
    deliverables: [
      "Production-grade Next.js 16 App Router web platform with React 19 Server Components",
      "Supabase PostgreSQL relational schema, migrations, and Row Level Security (RLS)",
      "Zero-trust authentication (Email Magic Links, OAuth2, Passkeys / WebAuthn)",
      "Stripe subscription billing, metered usage invoices, and customer management portal",
      "Real-time WebSocket collaboration engine and background job queues",
      "Automated CI/CD deployment pipeline with staging preview branches",
      "100% Client Intellectual Property handover + 30-day post-launch warranty",
    ],
    engagementSteps: [
      "1. Technical RFC & Schema Modeling (Database ERD, auth models, API contracts)",
      "2. Sprint 1: Core Platform & Auth (Next.js 16 App Router, Supabase RLS, layout)",
      "3. Sprint 2: Business Logic & Billing (Stripe checkout, WebSockets, background tasks)",
      "4. Sprint 3: Polish, CI/CD & IP Handover (Edge deploy, documentation & repository transfer)",
    ],
    isPopular: true,
    isActive: true,
  },
  {
    id: "serv-1",
    title: "Architecture & Codebase Diagnostic Audit",
    slug: "architecture-audit",
    description: "A comprehensive, deep-dive architectural inspection of your existing application, database queries, memory bottlenecks, security posture, and cloud hosting bills.",
    pricingType: "fixed",
    priceDisplay: "$2,500",
    timeline: "3–5 Business Days",
    deliverables: [
      "Full architecture review of frontend, backend, and API systems",
      "Database index analysis and slow query bottlenecks report (EXPLAIN ANALYZE)",
      "Memory leak profiling, CPU Flamegraph analysis & Core Web Vitals audit",
      "Security audit, dependency vulnerability scan, and RLS inspection",
      "Cloud hosting cost reduction roadmap (AWS/GCP/Cloudflare bills cut by 30-60%)",
      "Detailed 25+ page diagnostic report with prioritized technical debt fixes",
      "60-minute executive strategy walkthrough video call with full Q&A",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-2",
    title: "PostgreSQL Performance & Query Sprint",
    slug: "database-optimization",
    description: "Surgical database tuning, connection pool configuration, composite indexing, and query plan rewrites to achieve sub-20ms P99 latencies under high concurrency.",
    pricingType: "fixed",
    priceDisplay: "$4,500",
    timeline: "1 Week",
    deliverables: [
      "Deep query plan profiling via pg_stat_statements & EXPLAIN (ANALYZE, BUFFERS)",
      "B-tree, GIN (JSONB), and BRIN partial indexing strategy implementation",
      "Connection pooling & transaction isolation tuning (PgBouncer / Supavisor)",
      "Autovacuum, table bloat mitigation, and lock contention remediation",
      "Sub-20ms P99 query latency verification benchmark under simulated load",
      "Zero-downtime migration scripts and developer schema guardrails",
      "Post-deployment production telemetry and 14-day query monitoring",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-3",
    title: "Cloudflare Edge & Serverless Migration",
    slug: "cloudflare-edge-migration",
    description: "Re-architecting monolithic applications or slow multi-region AWS infrastructure onto Cloudflare Pages and Workers Edge for sub-30ms global TTFB and drastic cost savings.",
    pricingType: "fixed",
    priceDisplay: "$6,500",
    timeline: "1–2 Weeks",
    deliverables: [
      "Migration topology design for Next.js App Router on Cloudflare Pages",
      "Edge caching policies, stale-while-revalidate, and global KV/D1 integration",
      "Elimination of serverless cold-start delays using lightweight V8 isolates",
      "Zero-downtime DNS cutover, custom domain SSL/TLS, and automated CI/CD",
      "Cloud infrastructure bill reduction: typical 50% to 75% savings over AWS ECS/EC2",
      "Full staging environment preview deployment on GitHub pull requests",
      "30-day post-migration uptime guarantee and performance SLA verification",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-4",
    title: "Full-Stack SaaS MVP Engineering Sprint",
    slug: "mvp-feature-sprint",
    description: "High-velocity execution from technical requirements to a tested and deployed software platform on Next.js 16, Supabase, and Cloudflare Pages.",
    pricingType: "fixed",
    priceDisplay: "$12,500",
    timeline: "3–4 Weeks",
    deliverables: [
      "Next.js 16 App Router + React 19 responsive, high-performance web platform",
      "Supabase PostgreSQL schema, migrations & granular Row Level Security (RLS)",
      "Stripe payment or custom subscription/metered usage billing integration",
      "Hardened authentication (Email Magic Links, OAuth2, Passkeys / WebAuthn)",
      "Automated CI/CD build pipeline configured on Cloudflare with preview branches",
      "Fast Core Web Vitals optimization, strict TypeScript typing, and Zod validation",
      "Complete git repository handover (100% Client IP) + 30-day post-launch warranty",
    ],
    isPopular: true,
    isActive: true,
  },
  {
    id: "serv-5",
    title: "Distributed Telemetry & Event Streaming Engine",
    slug: "distributed-telemetry-engine",
    description: "High-throughput concurrent message streaming, pub/sub infrastructure, and time-series analytical pipelines built with fault tolerance.",
    pricingType: "fixed",
    priceDisplay: "$18,500",
    timeline: "4–6 Weeks",
    deliverables: [
      "Concurrent Go or Node.js streaming ingestion worker layer",
      "Redis Cluster Pub/Sub or Apache Pulsar/Kafka message brokering",
      "TimescaleDB or pgvector analytical aggregations with continuous rollups",
      "Binary WebSocket streaming engine to browser clients (<25ms P99 target)",
      "Backpressure handling, dead letter queues, and exponential retry mechanisms",
      "Prometheus & Grafana telemetry dashboards with automated alerting",
      "Automated k6 load test suite verifying concurrency targets",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "serv-6",
    title: "Dedicated Full-Stack Engineering Retainer",
    slug: "fractional-staff-engineer",
    description: "Ongoing remote/B2B engineering capacity for growing product teams: feature shipping, TypeScript/Next.js builds, PostgreSQL tuning, and pull-request reviews.",
    pricingType: "retainer",
    priceDisplay: "$5,500 / mo",
    timeline: "Ongoing (15–20 hrs / week)",
    deliverables: [
      "Direct Slack/Discord/Microsoft Teams communication aligned with UK/EU working hours",
      "Weekly sprint planning, code reviews, and technical documentation",
      "Hands-on TypeScript, React, Next.js, Node.js, and PostgreSQL implementation",
      "Automated testing (Vitest / Playwright) and CI/CD maintenance",
      "Infrastructure reliability monitoring and query performance reviews",
      "Clean git commits and clear sprint handovers",
      "Month-to-month B2B flexibility with zero long-term lock-in",
    ],
    isPopular: false,
    isActive: true,
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-5",
    title: "How I Built a 300+ Tool Calculator Platform with Next.js (Architecture & SEO Lessons)",
    slug: "nextjs-300-tools-platform-architecture-seo",
    excerpt: "Architecture, next-intl i18n, Core Web Vitals fixes, and honest Google Search Console data (379k impressions, 611 clicks) from building nexuscalculator.net.",
    contentMarkdown: `Two years ago, I set out to build a fast, clean website of online calculators. Today, [nexuscalculator.net](https://nexuscalculator.net) has **312 interactive tools** (177 calculators plus 135 developer, PDF, image and media utilities, including a QR code studio), **190 guides**, and more than **3,200 statically generated pages** in four languages, all from a single Next.js 15 App Router codebase.

This is the behind-the-scenes story: the registry architecture, the next-intl routing details, the Core Web Vitals work that cut First Load JS by 94.9%, and my real Google Search Console numbers, including 379k impressions, only 611 clicks, and what that gap taught me about search intent.

If you are building a large, content-rich or multilingual Next.js application, this should save you weeks of trial and error.

![Nexus Calculator Hub, a privacy-first platform with 312 interactive tools in four languages](/images/nexuscalculator-homepage.png)
*Figure 1: Nexus Calculator Hub, a privacy-first platform with 312 interactive tools in four languages.*

## High-Level Architecture Overview

Before writing a single calculator, I set three rules:

1. **Privacy-first processing.** Files and text entered into the PDF, image, formatter and calculator tools are processed in the user's browser (WebAssembly and Canvas APIs), not uploaded to my servers.
2. **Programmatic scalability.** Adding the 300th tool should take about as much effort as adding the 3rd.
3. **Crawl efficiency and edge performance.** Every page is pre-rendered with Static Site Generation (SSG), loads fast, and carries complete JSON-LD structured data.

\`\`\`mermaid
graph TD
Client["Browser / Client"] -->|"HTTPS request"| CDN["Vercel Edge Network"]
CDN -->|"Canonical 301, locale detection, 410 filters"| MW["middleware.ts"]
MW -->|"Static cache hit: SSG HTML + RSC"| EdgeCache["Edge Static Cache"]
MW -->|"Dynamic / API execution"| AppRouter["Next.js 15 App Router"]
subgraph "Core System Registries"
AppRouter --> UnifiedReg["lib/registry: 312 tools"]
AppRouter --> ToolCompReg["lib/toolComponentRegistry: lazy client wrappers"]
AppRouter --> Routing["i18n/routing: en, es, fr, de"]
end
subgraph "SEO and Data Layer"
UnifiedReg --> Sitemap["app/sitemap.ts: single XML sitemap"]
UnifiedReg --> Schema["JSON-LD: SoftwareApplication, HowTo, MathSolver, FAQ"]
AppRouter --> RateLimiter["In-memory rate limiting: 10-30 req/min"]
end
\`\`\`

## Why Next.js 15 (App Router) and Vercel?

With thousands of URLs, client-side SPAs struggle with SEO and traditional CMS setups get slow to maintain. I chose Next.js 15 with the App Router for three reasons:

1. **Static Site Generation.** Calculator pages are mostly static reference content wrapped around an interactive widget. Next.js pre-renders all 3,200+ pages at build time, and serving pre-rendered HTML from the edge keeps time-to-first-byte under 80 ms in my tests.
2. **First-class metadata and route generation.** \`generateStaticParams\`, \`generateMetadata\` and \`app/sitemap.ts\` derive SEO tags, alternates and XML sitemaps directly from TypeScript registries, with no fragile plugins.
3. **Server and Client Component separation.** Layouts, guides, formulas, FAQs and navigation render as lightweight Server Components. Only the interactive form controls and charts ship client-side JavaScript.

I host on Vercel for its zero-config edge CDN, automatic preview deployments for every branch, and built-in handling of localized routing and dynamic OpenGraph images.

## Architecture: Scaling to 300+ Tools Without Code Sprawl

The most expensive mistake on a multi-tool site is a copy-pasted page route per calculator. With 312 tools, that becomes unmaintainable. Nexus uses a central tool registry plus dynamic route templates instead.

### 1. The unified registry (lib/registry/index.ts)

Every tool is defined once as a typed TypeScript object. The search, sitemap, category hubs and internal linking all read from this single source of truth:

\`\`\`typescript
// lib/registry/index.ts (architecture snapshot)
import { calculators } from '@/lib/data/calculators';
import { allToolsConfig } from '@/lib/data/tools';
import { comparisons } from '@/lib/data/comparisons';
import { collections } from '@/lib/data/collections';

export type ToolType = 'calculator' | 'developer-tool' | 'comparison' | 'collection';

export interface UnifiedToolEntry {
  slug: string;
  type: ToolType;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  keywords: string;
  href: string;
  status: 'published';
  lastUpdated?: string;
}

// Aggregated at build time: 177 calculators + 135 developer tools = 312 utilities
export const allTools: readonly UnifiedToolEntry[] = Object.freeze(registry);
\`\`\`

### 2. Avoiding the 3.54 MB bundle trap with ToolViewWrapper

Early on I hit a classic App Router pitfall: importing every tool view into one top-level registry made the build trace bundle all tool dependencies into a 3.54 MB initial client chunk.

The fix was to separate the static metadata registry from the client component registry, and load each widget dynamically inside a dedicated client wrapper:

\`\`\`typescript
// lib/toolComponentRegistry.ts
// Single source of truth mapping tool slugs to client components.
// Imported ONLY by Client Components (ToolViewWrapper.tsx) so Next.js
// build traces do not bundle all 135 tool chunks into every route.
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const toolRegistry: Record<string, ComponentType<any>> = {
  'json-formatter': dynamic(() =>
    import('@/app/components/tools/JsonFormatterTool').then(m => m.JsonFormatterTool)),
  'diff-checker': dynamic(() =>
    import('@/app/components/tools/DiffCheckerTool').then(m => m.DiffCheckerTool)),
  'sql-formatter': dynamic(() =>
    import('@/app/components/tools/SqlFormatterTool').then(m => m.SqlFormatterTool)),
  'qr-code-generator': dynamic(() =>
    import('@/app/components/tools/QrCodeGeneratorTool').then(m => m.QrCodeGeneratorTool)),
  // ...split the same way across all utilities
};
\`\`\`

The Server Component page (\`app/[locale]/tools/[slug]/page.tsx\`) pre-renders an instant server-side workspace preview. Once hydrated, \`ToolViewWrapper\` lazily loads only the widget that page needs.

## Multilingual Routing with next-intl and Localized Slugs

To capture international search demand, the site is available in **English (\`en\`)**, **Spanish (\`es\`)**, **French (\`fr\`)** and **German (\`de\`)**.

Real localization is more than a \`?lang=es\` parameter. Route paths should match how people search in each language:

| Concept | English URL | Spanish URL | German URL | French URL |
| :--- | :--- | :--- | :--- | :--- |
| **Mortgage Calculator** | \`/en/calculators/mortgage-calculator\` | \`/es/calculadoras/calculadora-de-hipotecas\` | \`/de/rechner/hypothekenrechner\` | \`/fr/calculatrices/calculateur-de-pret-immobilier\` |
| **UK Mortgage** | \`/en/tools/mortgage-calculator-uk\` | \`/es/herramientas/calculadora-hipoteca-reino-unido\` | \`/de/werkzeuge/hypothekenrechner-uk\` | \`/fr/outils/calculateur-hypotheque-royaume-uni\` |
| **JSON Formatter** | \`/en/tools/json-formatter\` | \`/es/herramientas/json-formatter\` | \`/de/werkzeuge/json-formatierer\` | \`/fr/outils/formateur-json\` |

### hreflang and self-referencing canonicals

To avoid duplicate-content problems across 3,200+ pages, one helper in \`seoUtils.ts\` outputs the canonical URL and all language alternates:

\`\`\`typescript
// lib/utils/seoUtils.ts
export function getCanonicalAndAlternates(pathnameKey: string, currentLocale: string, genericSlug?: string) {
  // Generates absolute canonical URL + locale alternates for en, es, fr, de, and x-default
  return {
    canonical: \`\${baseUrl}/\${currentLocale}\${localizedPath}\`,
    languages: {
      en: \`\${baseUrl}/en\${enPath}\`,
      es: \`\${baseUrl}/es\${esPath}\`,
      fr: \`\${baseUrl}/fr\${frPath}\`,
      de: \`\${baseUrl}/de\${dePath}\`,
      'x-default': \`\${baseUrl}/en\${enPath}\`,
    },
  };
}
\`\`\`

> **Key SEO insight:** Do not translate keywords literally. German users search for *Hypothekenrechner*, not a word-for-word version of *Mortgage Calculator*. Translate the search intent, not the vocabulary. This is what helped my localized pages start showing up in European results.

## Backend Security, Auth and Rate Limiting

About 95% of the calculators run entirely client-side. A few utilities, such as HTTP header lookups, DNS inspection, AI mockup generation and my database privacy tools, need server-side execution. To protect those endpoints without slowing serverless responses, I added tailored in-memory rate limiting and auth:

1. **AI image and prompt mockup API (\`/api/tools/ai-image-generator\`):** limited to 10 requests per minute per IP, with an automatic procedural SVG fallback to protect external AI token budgets.
2. **DNS and HTTP header inspector (\`/api/check-headers\`):** capped at 30 requests per minute per IP to prevent outbound socket exhaustion and SSRF-style scanning.
3. **Database privacy endpoints (\`/api/privacy/*\`):** protected by JWT authentication, verifying Firebase bearer tokens (\`adminAuth.verifyIdToken\`) with a fallback to Supabase session cookies.
4. **410 filter in \`middleware.ts\`:** malformed crawler URLs and bot probes (\`/wp-admin\`, \`/Producer\`, \`/Author\`) get an HTTP 410 Gone response, which helps Google drop those dead URLs from its crawl queue.

## Performance Engineering: Cutting First Load JS by 94.9%

The first Lighthouse runs showed two serious bottlenecks:

1. **Bundle bloat.** Every tool view sat in the main client bundle, pushing First Load JS above 3.5 MB.
2. **Font and CSS delays.** Layout shifts from web fonts and render-blocking CSS hurt Core Web Vitals.

### 1. Code-splitting with dynamic client shells

I moved modal overlays (\`CommandPalette\`, \`InstallPrompt\`, \`BackToTop\`, \`CookieBanner\`) into a deferred \`<ClientShell />\` and turned all 312 tool widgets into dynamic imports via \`lib/toolComponentRegistry.ts\`. First Load JS dropped from 3.54 MB to about 180 KB, a 94.9% reduction.

### 2. Self-hosted, subsetted fonts

Instead of calling Google Fonts at runtime (extra DNS lookups and blocking requests), I used \`next/font/google\`, which downloads and self-hosts the font files at build time:

\`\`\`typescript
import { Inter } from 'next/font/google';

// Weights 800/900 removed, saving about 50 KB.
// next/font/google self-hosts the font files from our own domain.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});
\`\`\`

### 3. Removing loading.tsx from dynamic calculator routes

Nested \`loading.tsx\` skeletons on 1,938 dynamic calculator pages risked crawlers reading the loading state instead of the real content. I removed them in favor of instant, statically rendered HTML shells, so Googlebot always sees the full text and formulas on first load.

### The performance scorecard

- **Lighthouse Performance:** from 58 to **96+**
- **Largest Contentful Paint (LCP):** from 4.2 s to **1.1 s**
- **Cumulative Layout Shift (CLS):** **0.00**
- **First Load JS:** down **94.9%** (about 3.54 MB to under 180 KB)

## Technical SEO: Schema Automation and a Single Sitemap

Fast pages are not enough to compete with established calculator sites. Search engines also need a clear, structured understanding of each tool.

### Automated JSON-LD on every calculator page

The page template injects a rich set of schemas:

- **\`SoftwareApplication\`:** marks the tool as a free web utility (\`price: "0"\`), with a \`SpeakableSpecification\` for voice assistants.
- **\`HowTo\`:** generated from the calculator's input fields (enter your values, check units, run the formula).
- **\`MathSolver\` and \`LearningResource\`:** with Google-compliant \`SolveMathAction\` and \`eduQuestionType\` properties.
- **\`FAQPage\`:** structured Q&A covering edge cases, tax brackets and formula explanations.
- **\`BreadcrumbList\`:** Home, Category, Tool.

### The Next.js 15 sitemap conflict

When the site passed 3,000 pages, I tried splitting the sitemap with \`generateSitemaps()\`. With next-intl, the \`[locale]\` middleware segment intercepted the generated child sitemap index and returned an HTML 404 page to Googlebot.

The fix was a single programmatic sitemap (\`app/sitemap.ts\`) with \`revalidate = false\`, served permanently from Vercel's edge CDN:

\`\`\`typescript
// app/sitemap.ts (excerpt)
export const revalidate = false; // served from edge CDN, no ISR overhead

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Maps core pages, 177 calculators, 135 tools,
  // 190 guides, categories and comparisons across all 4 locales.
  return [...coreEntries, ...calcEntries, ...toolEntries, ...dataPrivacyEntries];
}
\`\`\`

## The Honest Data: What 379,000 Impressions Taught Me

Most case studies show only the flattering numbers. Here are my unedited Google Search Console figures for the latest 3-month period (August 8 to November 1, 2026):

![Google Search Console performance report for nexuscalculator.net showing 379k impressions and 611 clicks](/images/gsc-performance-3months.png)
*Figure 2: Search Console performance, August 8 to November 1, 2026.*

- **Total impressions:** 379,000
- **Total clicks:** 611
- **Average CTR:** 0.2%
- **Average position:** 42.5
- **URLs submitted in the sitemap:** 3,200+ localized pages

### Reading the chart

1. **The October jump.** Through August and September, impressions stayed around 1,000 to 3,000 per day. In mid-October, around the same time I shipped the bundle reduction, the expanded JSON-LD schemas and the redirect cleanup, impressions climbed to 10,000 to 15,000+ per day. I cannot prove which change caused it, but the timing is hard to ignore.
2. **The click gap.** Impressions approached 380k, yet total clicks were 611, with the peak at the start of November. Why such a wide gap?

### 4 SEO lessons from this data

1. **Indexed does not mean ranking**
   Having thousands of pages in Google proves the technical foundation works: valid sitemaps, coherent canonicals, fast TTFB. But indexing only gets you into the stadium. It does not put you on the podium.
2. **Head terms are an authority trap for new domains**
   Queries like *mortgage calculator* and *bmi calculator* have enormous search volume. Google shows my pages for them (tens of thousands of impressions), but a young domain lands on pages 4 to 8 (positions 40 to 80). At position 65, CTR is effectively 0%.
3. **Low CTR on page one means a snippet mismatch**
   For localized queries in Germany and Spain where I ranked between positions 7 and 13, CTR was still under 1%. The content was fine, but my titles and descriptions were too generic. I added automated title enrichment in \`seoUtils.ts\`, adding phrases like *with Amortization Schedule & PDF Export* to make the snippet more specific.
4. **Niche, long-tail intent earns the clicks**
   My best-performing queries were not generic tools but specific ones: developer formatters, particular tax tools and localized European calculation guides. On those, CTR reached 6% to 19%.

## What I Am Doing Next

1. **Rewriting titles and meta descriptions** for my top 50 high-impression tools, aiming to lift CTR from 0.2% to 1.5% or more.
2. **Going deeper on long-tail features**, such as regional tax exemptions and loan comparison modes, to rank for low-competition, high-intent searches.
3. **Adding one-click scenario presets** (for example, a first-time homebuyer on a 30-year fixed loan) to increase time on page.
4. **Building topical clusters** by linking my 190 guides and the calculators to each other in both directions.

I will update this post with new numbers after the next 3-month period.

## Key Takeaways for Next.js Developers

- **Registry first.** Never hardcode repetitive pages. Build one typed registry and let a single route template render everything.
- **Mind your build traces.** Do not import client component maps into Server Components. Isolate dynamic imports in a client wrapper to protect First Load JS.
- **Handle redirects once.** Do canonicalization, locale fallbacks and redirects in a single middleware hop.
- **Self-host fonts and trim CSS.** Remove third-party render-blocking requests.
- **Watch position, not only impressions.** High impressions with low clicks show which queries Google already associates with your pages. They are your starting list for title, snippet and content work.

## Frequently Asked Questions

**How many tools and pages does nexuscalculator.net have?**
312 interactive tools, 190 guides, and over 3,200 statically generated pages across four languages.

**Why Next.js instead of plain React?**
Static generation gives crawlable HTML and fast loads, and the App Router includes metadata, sitemap and robots APIs.

**Which i18n library did you use?**
\`next-intl\`, with localized route paths, locale-prefixed URLs and hreflang alternates.

**Why so many impressions but so few clicks?**
Most impressions come from generic head terms where my average position is far below page one. Pages that do rank on page one need stronger titles and descriptions to earn clicks.

Building a high-performance Next.js application, SaaS platform or programmatic SEO project? Explore the [Calculator-Hub GitHub repository](https://github.com/abuhanif254) or [get in touch](/pricing#inquiry).`,
    tags: ["Next.js", "Architecture", "SEO", "Performance"],
    readingTimeMinutes: 9,
    publishedAt: "2026-11-09T08:00:00Z",
    isPublished: true,
    coverImageUrl: "/images/nexuscalculator-homepage.png",
  },
  {
    id: "blog-1",
    title: "Architecting High-Throughput Next.js 16 Applications on Cloudflare Pages",
    slug: "nextjs-16-cloudflare-pages-architecture",
    excerpt: "How to leverage the Next.js App Router, edge caching, and serverless compute on Cloudflare to achieve sub-50ms global latency.",
    contentMarkdown: `## Introduction

Building web applications in 2026 requires balancing rich client interactivity with near-instant worldwide page delivery. Deploying Next.js to Cloudflare Pages allows developers to run logic at hundreds of edge data centers worldwide without paying exorbitant traditional server hosting fees.

## Why the Global Edge Matters

Traditional servers hosted in a single AWS region (such as \`us-east-1\`) subject international users to hundreds of milliseconds in unavoidable speed-of-light roundtrip latency. By deploying our application to Cloudflare Pages:

- **Static assets** are served from the closest edge node.
- **Edge computing** evaluates requests right at the border.
- **Database queries** connect through pooled connections with regional caching.

\`\`\`typescript
// Example: Next.js edge configuration for low-latency routes
export const runtime = "edge";

export async function GET(request: Request) {
  const data = await fetchFromEdgeCache("global-stats");
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
\`\`\`

## Eliminating Cold Starts

One common pain point with standard serverless functions is cold start latency. Cloudflare Workers and Pages run on V8 isolates rather than containerized Node.js VMs. The startup penalty drops from 300ms down to less than 5ms.

## Conclusion

By pairing Next.js App Router with Cloudflare Pages and Supabase PostgreSQL, developers gain enterprise-grade durability, predictable scaling, and zero server maintenance overhead.`,
    tags: ["Next.js", "Cloudflare", "Performance", "Architecture"],
    readingTimeMinutes: 6,
    publishedAt: "2026-09-28T10:00:00Z",
    isPublished: true,
    coverImageUrl: "/images/projects/cloudflare-edge-arch.svg",
  },
  {
    id: "blog-2",
    title: "Zero-Latency Real-Time Telemetry with Supabase and Postgres CDC",
    slug: "realtime-telemetry-supabase-postgres-cdc",
    excerpt: "A deep dive into Postgres Write-Ahead Logs (WAL), Change Data Capture, and broadcasting live state across tens of thousands of WebSocket clients.",
    contentMarkdown: `## Understanding Change Data Capture (CDC)

When building collaborative systems, polling the database on an interval degrades both database CPU and client battery life. PostgreSQL’s native logical replication stream allows us to tap into the Write-Ahead Log (WAL) to emit real-time event notifications with virtually zero query overhead.

\`\`\`sql
-- Enable replication on your critical telemetry table
alter table telemetry_events replica identity full;

-- Create publication for CDC subscribers
create publication telemetry_pub for table telemetry_events;
\`\`\`

## Subscribing on the Frontend

Using Supabase Realtime, subscribing to database mutations in React takes just a few lines of clean code:

\`\`\`typescript
import { supabase } from "@/lib/supabase";

export function useTelemetryStream(deviceId: string) {
  useEffect(() => {
    const channel = supabase
      .channel(\`device:\${deviceId}\`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "telemetry_events",
          filter: \`device_id=eq.\${deviceId}\`,
        },
        (payload) => {
          console.log("New measurement received:", payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceId]);
}
\`\`\`

## Key Takeaway

Postgres is not just a storage warehouse; configured properly, it is a high-speed real-time event dispatcher capable of powering mission-critical real-time applications.`,
    tags: ["PostgreSQL", "Supabase", "WebSockets", "Databases"],
    readingTimeMinutes: 8,
    publishedAt: "2026-08-14T14:30:00Z",
    isPublished: true,
    coverImageUrl: "/images/projects/telemetry-pipeline-arch.svg",
  },
  {
    id: "blog-3",
    title: "Modular Monolith vs. Microservices: Architecture Trade-Offs Study",
    slug: "swapping-microservices-for-modular-monolith",
    excerpt: "Comparing distributed microservice serialization overhead against clean modular TypeScript boundaries for small engineering teams.",
    contentMarkdown: `## Why Small Teams Struggle With Premature Microservices

Many small product teams adopt distributed microservices before hitting scaling bottlenecks. Instead of simplifying delivery, splitting a compact codebase across network boundaries can trade straightforward function calls for serialization latency, distributed transactions, and heavy local tooling.

### Key Architectural Trade-Offs
1. **Network Hops**: Splitting tightly coupled workflows adds serialized RPC overhead and retry complexity.
2. **Schema Synchronization**: Keeping schemas aligned across multiple services increases deployment coordination work.
3. **Developer Onboarding**: Running many separate containers locally slows everyday iteration.

## The Modular Monolith Pattern

A modular monolith keeps code in a single repository with clear domain interfaces. Modules interact via typed in-process contracts while remaining separable if scaling ever requires extraction.

\`\`\`typescript
// Domain boundary enforced by module interfaces
export interface BillingModule {
  chargeCustomer(customerId: string, amountCents: number): Promise<TransactionResult>;
}

export class DirectBillingService implements BillingModule {
  async chargeCustomer(customerId: string, amountCents: number) {
    // In-process execution with typed boundaries
    return processPayment(customerId, amountCents);
  }
}
\`\`\`

## Study Takeaway

For early-stage products and solo/small-team builds (such as full-stack Next.js + PostgreSQL platforms), clean modular boundaries inside one repository keep deployments fast and debugging transparent.`,
    tags: ["System Design", "DevOps", "Microservices", "Clean Code"],
    readingTimeMinutes: 5,
    publishedAt: "2026-07-02T09:15:00Z",
    isPublished: true,
    coverImageUrl: "/images/projects/ai-rag-pipeline-arch.svg",
  },
  {
    id: "blog-4",
    title: "Mastering PostgreSQL Composite & Partial Indexing with EXPLAIN ANALYZE",
    slug: "mastering-postgres-indexing-query-optimization",
    excerpt: "Study notes on reading EXPLAIN ANALYZE query plans and selecting composite vs. partial B-Tree indexes for filtered queries.",
    contentMarkdown: `## Diagnosing Slow Filtered Queries

When reporting queries filter by both an account identifier, a status flag, and a date range without a matching composite index, PostgreSQL may fall back to scanning unnecessary heap pages.

## Reading EXPLAIN ANALYZE

Inspecting \`EXPLAIN ANALYZE\` helps spot sequential scans and excessive buffer reads:

\`\`\`text
Seq Scan on transactions  (cost=0.00..58914.00 rows=184100 width=72)
  Filter: ((account_id = 'acc_9281') AND (status = 'completed') AND (created_at >= '2026-01-01'))
\`\`\`

A single-column index on \`account_id\` alone still has to inspect rows that do not match the \`status\` or timestamp filter.

## Constructing a Composite Partial Index

Aligning column order and predicate filters reduces index size and narrows scans to active rows:

\`\`\`sql
-- Example composite partial index for filtered lookups
create index concurrently idx_transactions_account_date
on transactions (account_id, created_at desc)
where status = 'completed';
\`\`\`

## Key Principles

- Put equality predicates (\`account_id\`) ahead of range predicates (\`created_at\`).
- Add \`WHERE\` partial filters when queries consistently target a small subset of rows.
- Always verify actual shared buffer reads with \`EXPLAIN (ANALYZE, BUFFERS)\` in PostgreSQL rather than guessing.`,
    tags: ["Databases", "PostgreSQL", "SQL", "Performance"],
    readingTimeMinutes: 7,
    publishedAt: "2026-05-19T11:00:00Z",
    isPublished: true,
    coverImageUrl: "/images/projects/postgres-audit-arch.svg",
  },
];

// Verified client endorsements are added only from genuine completed engagements via Admin Panel.
export const initialTestimonials: Testimonial[] = [];
