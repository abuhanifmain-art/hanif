import Link from "next/link";
import DhakaTimeBadge from "./dhaka-time-badge";
import CoreWebVitalsRadar from "./core-web-vitals-radar";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="global-site-footer">
      {/* =========================================================================
          TIER 1: Pre-Footer Consultation & Timezone Availability Ribbon
          ========================================================================= */}
      <div className="global-footer-ribbon">
        <div className="global-footer-container global-footer-ribbon-content">
          <div className="global-footer-ribbon-text">
            <span className="global-footer-ribbon-kicker">
              Open to Remote, B2B Contract &amp; On-Site / Relocation Roles (UK &amp; Europe)
            </span>
            <h3 className="global-footer-ribbon-title">
              Full-Stack Web Development &amp; International Operations Readiness.
            </h3>
            <p className="global-footer-ribbon-sub">
              Creator of NexusCalculator.net (Next.js, TypeScript, i18n) with 7+ years of cross-cultural operations &amp; customer service experience in Oman and Bangladesh.
            </p>
          </div>
          <div className="global-footer-ribbon-actions">
            <Link href="/pricing#inquiry" className="global-footer-btn-primary">
              Request Project Consultation &rsaquo;
            </Link>
            <Link href="/pricing" className="global-footer-btn-secondary">
              View Pricing Matrix &rsaquo;
            </Link>
            <DhakaTimeBadge />
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 2: 5-Column High-Density Engineering Directory
          ========================================================================= */}
      <div className="global-footer-container">
        <div className="global-footer-grid">
          {/* Column 1: Identity & Availability Profile */}
          <div className="global-footer-col col-profile">
            <div className="footer-brand-header">
              <strong className="footer-author-name">MD Abu Hanif Mia</strong>
              <span className="footer-author-title">Full-Stack Web Developer &amp; International Ops</span>
            </div>
            <p className="footer-bio-text">
              Next.js 16 &amp; TypeScript developer (creator of NexusCalculator.net) with 7+ years of front-line hospitality, industrial operations, and sales experience in Oman &amp; Bangladesh.
            </p>
            <div className="footer-sla-badge">
              <span className="badge-bullet">●</span> <strong>Open: Remote • B2B • On-Site (UK / EU)</strong>
            </div>
            <div className="footer-contact-details">
              <div>
                <strong>Direct Email:</strong>{" "}
                <a href="mailto:abuhanifmain@gmail.com" className="footer-highlight-link">
                  abuhanifmain@gmail.com
                </a>
              </div>
              <div>
                <strong>Public Phone:</strong>{" "}
                <a href="tel:+8801724010261" className="footer-highlight-link">
                  +880 1724-010261
                </a>
              </div>
              <div>
                <strong>Address:</strong> Sadar Upazila, Kishoreganj, Dhaka, Bangladesh
              </div>
              <div>
                <strong>Languages:</strong> Bengali (Native), English / Hindi / Urdu (Conv.)
              </div>
            </div>
            <div className="footer-social-links" style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "12px 0 10px 0" }}>
              <a href="https://github.com/abuhanif254" target="_blank" rel="noopener noreferrer" className="eco-badge" aria-label="GitHub Profile">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/md-abu-hanif-mia" target="_blank" rel="noopener noreferrer" className="eco-badge" aria-label="LinkedIn Profile">
                LinkedIn ↗
              </a>
              <a href="https://x.com/MohammadBitull1" target="_blank" rel="noopener noreferrer" className="eco-badge" aria-label="X (Twitter) Profile">
                X ↗
              </a>
              <a href="https://www.facebook.com/bitulla" target="_blank" rel="noopener noreferrer" className="eco-badge" aria-label="Facebook Profile">
                Facebook ↗
              </a>
              <a href="https://www.instagram.com/bitullah_aj" target="_blank" rel="noopener noreferrer" className="eco-badge" aria-label="Instagram Profile">
                Instagram ↗
              </a>
            </div>
            <div className="footer-ecosystem-badges">
              <span className="eco-badge">TypeScript</span>
              <span className="eco-badge">Next.js 16</span>
              <span className="eco-badge">React 19</span>
              <span className="eco-badge">PostgreSQL</span>
              <span className="eco-badge">Python</span>
              <span className="eco-badge">Rust</span>
              <span className="eco-badge">C++</span>
              <span className="eco-badge">Cloudflare</span>
            </div>
          </div>

          {/* Column 2: Core Skills & Operations */}
          <div className="global-footer-col">
            <h4 className="footer-col-title">Core Capabilities</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/projects/nexus-calculator-platform">NexusCalculator.net (312 Tools)</Link>
              </li>
              <li>
                <Link href="/#competencies">Next.js 16 App Router &amp; TypeScript</Link>
              </li>
              <li>
                <Link href="/#competencies">PostgreSQL &amp; Supabase Integration</Link>
              </li>
              <li>
                <Link href="/#competencies">Cloudflare Pages &amp; Web Performance</Link>
              </li>
              <li>
                <Link href="/resume">Programming Hero 2025 &amp; freeCodeCamp</Link>
              </li>
              <li>
                <Link href="/resume">International Hospitality &amp; Operations</Link>
              </li>
              <li>
                <Link href="/lab">Interactive SQL &amp; Edge Lab</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Live Work & Reference Blueprints */}
          <div className="global-footer-col">
            <h4 className="footer-col-title">Projects &amp; Blueprints</h4>
            <ul className="footer-links-list case-studies-list">
              <li>
                <Link href="/projects/nexus-calculator-platform" className="footer-project-link">
                  <strong>Nexus Calculator Platform</strong>
                  <span className="footer-meta-pill">Live Product • 312 Tools • 4 Langs</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/financial-telemetry-pipeline" className="footer-project-link">
                  <strong>Financial Telemetry Blueprint</strong>
                  <span className="footer-meta-pill">Lab Blueprint • WebSockets &amp; Go</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/cloudflare-edge-ecommerce" className="footer-project-link">
                  <strong>Edge Storefront Reference</strong>
                  <span className="footer-meta-pill">Reference Demo • Next.js 16 Edge</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/postgres-performance-audit" className="footer-project-link">
                  <strong>PostgreSQL Indexing Study</strong>
                  <span className="footer-meta-pill">Lab Reference • EXPLAIN ANALYZE</span>
                </Link>
              </li>
              <li className="footer-cta-link-item">
                <Link href="/projects" className="footer-view-all">
                  View All Work &amp; Blueprints &rsaquo;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Transparent Services & Pricing */}
          <div className="global-footer-col">
            <h4 className="footer-col-title">B2B Services &amp; Rates</h4>
            <ul className="footer-links-list pricing-list">
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">Codebase &amp; Architecture Audit</span>
                  <span className="price-tag">$2,500</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">PostgreSQL Query Tuning</span>
                  <span className="price-tag">$4,500</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">Edge Web Platform Build</span>
                  <span className="price-tag">$6,500</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">Full-Stack MVP Sprint</span>
                  <span className="price-tag">$12,500</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">Full-Stack Dev Retainer</span>
                  <span className="price-tag">$5,500/mo</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-price-item">
                  <span className="service-name">Ad-Hoc Advisory Rate Card</span>
                  <span className="price-tag">$140/hr</span>
                </Link>
              </li>
              <li className="footer-cta-link-item">
                <Link href="/pricing" className="footer-view-all">
                  View Full Pricing Matrix &rsaquo;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Technical Articles & Whitepapers */}
          <div className="global-footer-col">
            <h4 className="footer-col-title">Technical Blog</h4>
            <ul className="footer-links-list articles-list">
              <li>
                <Link href="/blog/nextjs-16-cloudflare-pages-architecture" className="footer-article-link">
                  <span>Next.js 16 on Cloudflare Pages</span>
                  <span className="read-time">6 min read</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/realtime-telemetry-supabase-postgres-cdc" className="footer-article-link">
                  <span>Supabase Postgres CDC Telemetry</span>
                  <span className="read-time">8 min read</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/swapping-microservices-for-modular-monolith" className="footer-article-link">
                  <span>Microservices to Modular Monolith</span>
                  <span className="read-time">5 min read</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/mastering-postgres-indexing-query-optimization" className="footer-article-link">
                  <span>Postgres Indexing for Concurrency</span>
                  <span className="read-time">7 min read</span>
                </Link>
              </li>
              <li className="footer-cta-link-item">
                <Link href="/blog" className="footer-view-all">
                  View Technical Blog Archive &rsaquo;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================================
            TIER 3: Live Core Web Vitals & Real-Time Performance Telemetry
            ========================================================================= */}
        <CoreWebVitalsRadar />

        <div className="global-footer-telemetry">
          <div className="telemetry-item">
            <span className="telemetry-label">Framework Engine:</span>
            <span className="telemetry-value">Next.js 16.3 (Turbopack + SSG)</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Work Readiness:</span>
            <span className="telemetry-value">UK &amp; Europe (Remote / B2B / On-Site)</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Platform Stack:</span>
            <span className="telemetry-value">Next.js 16 • Supabase • Cloudflare</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Service Status:</span>
            <span className="telemetry-value">
              <Link href="/status" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }} title="View Live Diagnostics & Portfolio Health Dashboard">
                Live Diagnostics (Status ↗)
              </Link>
            </span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Live Flagship:</span>
            <span className="telemetry-value">NexusCalculator.net (312 Tools)</span>
          </div>
        </div>

        {/* =========================================================================
            TIER 4: Global Primary Navigation Bar
            ========================================================================= */}
        <div id="global-footernav" className="global-footer-nav">
          <ul>
            <li className="first">
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#about">About Abu Hanif</Link>
            </li>
            <li>
              <Link href="/#competencies">Education &amp; Stack</Link>
            </li>
            <li>
              <Link href="/projects">Work Showcase</Link>
            </li>
            <li>
              <Link href="/pricing">Services &amp; Pricing</Link>
            </li>
            <li>
              <Link href="/lab">Systems Lab</Link>
            </li>
            <li>
              <Link href="/status">Status</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/resume">Resume / CV</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy &amp; GDPR</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li className="last">
              <Link href="/status" style={{ color: "#38bdf8", fontWeight: "700" }}>
                Diagnostics &amp; Status
              </Link>
            </li>
          </ul>
        </div>

        {/* =========================================================================
            TIER 5: Legal, GDPR & Compliance Strip
            ========================================================================= */}
        <div className="global-footer-legal">
          <div className="legal-sow-statement">
            <strong>UK / EU Engagement &amp; GDPR Transparency:</strong> Available for full-time employment (Remote or On-Site/Relocation) and fixed-scope B2B web engineering engagements under clear written agreements and 30-day warranty terms.
          </div>
          <div className="legal-meta-row">
            <div className="copyright-text">
              &copy; {currentYear} <strong>MD Abu Hanif Mia (Abu Hanif)</strong>. Direct: abuhanifmain@gmail.com • +880 1724-010261.
            </div>
            <div className="compliance-links">
              <Link href="/privacy" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                Privacy &amp; UK/EU GDPR Policy
              </Link>
              <span className="divider">•</span>
              <Link href="/terms" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                Terms of Service
              </Link>
              <span className="divider">•</span>
              <Link href="/status" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                Live Diagnostics
              </Link>
              <span className="divider">•</span>
              <span>Zero Ad-Tech Trackers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
