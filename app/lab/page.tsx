import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import LabEdgeRadar from "../components/lab-edge-radar";
import LabPostgresPlanner from "../components/lab-postgres-planner";
import ArchitectureTopologyExplorer from "../components/architecture-topology-explorer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Interactive Systems Lab & Query Demonstrations",
  description:
    "Interactive browser latency diagnostics, simulated PostgreSQL EXPLAIN ANALYZE query plan explorer, and reference topology visualizers built by MD Abu Hanif Mia.",
  keywords: [
    "Interactive Systems Lab",
    "PostgreSQL Query Plan Explorer",
    "EXPLAIN ANALYZE Simulator",
    "Browser Edge Ping Tool",
    "Cloudflare Pages Latency",
    "Architecture Visualizer",
    "Abu Hanif",
    "MD Abu Hanif Mia",
  ],
  alternates: {
    canonical: `${siteUrl}/lab`,
  },
  openGraph: {
    title: "Interactive Systems Lab & Diagnostics | Abu Hanif",
    description:
      "Measure live browser edge latency, step through simulated PostgreSQL query plans, and inspect architecture blueprints.",
    url: `${siteUrl}/lab`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Systems Lab & Diagnostics | Abu Hanif",
    description:
      "Measure live browser edge ping and explore SQL query plans in MD Abu Hanif Mia's interactive lab.",
    creator: "@MohammadBitull1",
  },
};

export default function SystemsLabPage() {
  const labSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Interactive Systems Lab & Diagnostic Demonstrations",
    description:
      "Interactive browser ping diagnostics and simulated PostgreSQL query planning visualizers built by Full-Stack Developer MD Abu Hanif Mia.",
    url: `${siteUrl}/lab`,
    author: {
      "@type": "Person",
      name: "MD Abu Hanif Mia",
      url: siteUrl,
      jobTitle: "Full-Stack Web Developer & International Operations",
    },
    publisher: {
      "@type": "Person",
      name: "MD Abu Hanif Mia",
      url: siteUrl,
    },
  };

  return (
    <div id="portfolio-page-root" data-route="/lab">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(labSchema) }}
      />
      <div id="portfolio-shell-body" className="portfolio-shell-body js abuhanif-portfolio-shell">
        <SiteHeader activePath="/lab" />

        <div className="index" id="container">
          <div className="cwrap">
            {/* Header / Banner Strip */}
            <div id="main">
              <div className="mwrap">
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <h1 className="subpage-banner-title" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                          Interactive Systems Architecture Lab
                        </h1>
                        <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "normal", color: "#e2e8f0" }}>
                          Empirical Telemetry • Live Browser Latency Tests • PostgreSQL Query Simulators
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="content">
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <Link href="/">Home</Link> &gt; <span>Systems Lab</span>
                    </div>
                  </div>

                  <div className="bodytext">
                    <div className="description">
                      <h2>Empirical Proof of Execution: Show, Don&rsquo;t Just Tell</h2>
                      <p>
                        Senior software engineering and systems architecture decisions must be grounded in measurable data rather than theoretical speculation. The interactive telemetry tools below allow engineering managers, technical founders, and recruiters to test live network performance, visualize database query plan execution, and inspect distributed streaming topologies in real time.
                      </p>

                      {/* Tool 1: Live Edge Network Latency Radar */}
                      <LabEdgeRadar />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "8px",
                          padding: "10px 16px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          margin: "-16px 0 28px 0",
                          fontSize: "12.5px",
                        }}
                      >
                        <span>
                          <strong>Proven in Production:</strong>{" "}
                          <Link href="/projects/cloudflare-edge-ecommerce" style={{ color: "#2563eb", fontWeight: 700 }}>
                            Cloudflare Edge Platform &rsaquo;
                          </Link>
                        </span>
                        <span>
                          <strong>Technical Publication:</strong>{" "}
                          <Link href="/blog/nextjs-16-cloudflare-pages-architecture" style={{ color: "#8b5cf6", fontWeight: 700 }}>
                            Next.js 16 on Cloudflare Pages &rsaquo;
                          </Link>
                        </span>
                        <span>
                          <strong>Fixed Sprint:</strong>{" "}
                          <Link href="/pricing#cloudflare-edge-migration" style={{ color: "#16a34a", fontWeight: 700 }}>
                            Edge Migration ($6,500) &rsaquo;
                          </Link>
                        </span>
                      </div>

                      {/* Tool 2: PostgreSQL EXPLAIN ANALYZE Planner */}
                      <LabPostgresPlanner />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "8px",
                          padding: "10px 16px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          margin: "-16px 0 28px 0",
                          fontSize: "12.5px",
                        }}
                      >
                        <span>
                          <strong>Proven in Production:</strong>{" "}
                          <Link href="/projects/postgres-performance-audit" style={{ color: "#2563eb", fontWeight: 700 }}>
                            High-Concurrency PostgreSQL Audit &rsaquo;
                          </Link>
                        </span>
                        <span>
                          <strong>Technical Publication:</strong>{" "}
                          <Link href="/blog/mastering-postgres-indexing-query-optimization" style={{ color: "#8b5cf6", fontWeight: 700 }}>
                            Mastering Database Indexing &rsaquo;
                          </Link>
                        </span>
                        <span>
                          <strong>Fixed Sprint:</strong>{" "}
                          <Link href="/pricing#database-optimization" style={{ color: "#16a34a", fontWeight: 700 }}>
                            Postgres Query Sprint ($4,500) &rsaquo;
                          </Link>
                        </span>
                      </div>

                      {/* Tool 3: Distributed Topology Explorer */}
                      <div id="topology-explorer" style={{ marginTop: "16px", marginBottom: "28px" }}>
                        <div style={{ marginBottom: "14px" }}>
                          <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Telemetry Tool 03 • Distributed Systems
                          </span>
                          <h3 style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a" }}>
                            Interactive Streaming Topology &amp; Failover Architecture
                          </h3>
                        </div>
                        <ArchitectureTopologyExplorer />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "8px",
                            padding: "10px 16px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            marginTop: "12px",
                            fontSize: "12.5px",
                          }}
                        >
                          <span>
                            <strong>Proven in Production:</strong>{" "}
                            <Link href="/projects/financial-telemetry-pipeline" style={{ color: "#2563eb", fontWeight: 700 }}>
                              Financial Telemetry Pipeline &rsaquo;
                            </Link>
                          </span>
                          <span>
                            <strong>Technical Publication:</strong>{" "}
                            <Link href="/blog/swapping-microservices-for-modular-monolith" style={{ color: "#8b5cf6", fontWeight: 700 }}>
                              Modular Monolith Architecture &rsaquo;
                            </Link>
                          </span>
                          <span>
                            <strong>Fixed Sprint:</strong>{" "}
                            <Link href="/pricing#distributed-telemetry-engine" style={{ color: "#16a34a", fontWeight: 700 }}>
                              Telemetry Engine ($18,500) &rsaquo;
                            </Link>
                          </span>
                        </div>
                      </div>

                      {/* Consultation Banner */}
                      <div
                        style={{
                          backgroundColor: "#0b132b",
                          border: "1px solid #1e293b",
                          borderRadius: "8px",
                          padding: "24px",
                          color: "#ffffff",
                          marginTop: "24px",
                          boxShadow: "0 4px 16px -2px rgba(11, 19, 43, 0.12)",
                        }}
                      >
                        <div style={{ fontSize: "11px", fontWeight: "800", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                          Web Development &amp; Database Practice
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#ffffff" }}>
                          Looking for a Next.js Developer or B2B Sprint Support?
                        </h3>
                        <p style={{ margin: "0 0 18px 0", fontSize: "13.5px", color: "#cbd5e1", lineHeight: "1.6" }}>
                          Explore NexusCalculator.net live in production, review my full CV &amp; work history, or reach out for remote, B2B, or on-site roles in the UK and Europe.
                        </p>
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                          <Link
                            href="/pricing#database-optimization"
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#2563eb",
                              color: "#ffffff",
                              borderRadius: "6px",
                              fontSize: "13px",
                              fontWeight: "700",
                              textDecoration: "none",
                              transition: "background-color 0.15s ease",
                            }}
                          >
                            View B2B Pricing ($4,500+) &rsaquo;
                          </Link>
                          <Link
                            href="/projects/nexus-calculator-platform"
                            style={{
                              padding: "10px 18px",
                              backgroundColor: "#111e38",
                              color: "#cbd5e1",
                              border: "1px solid #1e293b",
                              borderRadius: "6px",
                              fontSize: "13px",
                              fontWeight: "700",
                              textDecoration: "none",
                            }}
                          >
                            View Live NexusCalculator.net Case &rsaquo;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Sidebar */}
                <div className="sidebar secondary-sidebar">
                  {/* Verified Education & Training */}
                  <div className="widget" id="wdgt-credentials">
                    <strong className="heading4 widget-title">
                      <a href="/resume">Education &amp; Training</a>
                    </strong>
                    <div className="description" style={{ fontSize: "12.5px", lineHeight: "1.6" }}>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>HSC in Commerce (2016–2017)</strong><br />
                        <span style={{ color: "#475569" }}>Wali Neowaj Khan College (EIIN: 110495)</span>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Programming Hero (2025)</strong><br />
                        <span style={{ color: "#047857", fontWeight: "bold" }}>Batch-12 • ID: WEB12-3991</span>
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>freeCodeCamp Self-Study</strong><br />
                        <span style={{ color: "#475569" }}>TypeScript, Python, Rust, C++</span>
                      </div>
                      <div>
                        <strong>Spoken Languages</strong><br />
                        <span style={{ color: "#2563eb", fontWeight: "bold" }}>Bengali, English, Hindi &amp; Urdu</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Booking Widget */}
                  <div className="widget" id="wdgt-contact">
                    <strong className="heading4 widget-title">
                      <a href="/pricing#inquiry">Contact Abu Hanif</a>
                    </strong>
                    <div className="description">
                      <p style={{ fontSize: "13px", color: "#334155", margin: "0 0 12px 0" }}>
                        Direct communication for UK/EU employment, Remote/B2B projects, or On-Site roles: abuhanifmain@gmail.com.
                      </p>
                      <Link
                        className="btn"
                        href="/pricing#inquiry"
                        style={{
                          display: "block",
                          textAlign: "center",
                          padding: "10px 16px",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          fontWeight: "bold",
                          textDecoration: "none",
                          borderRadius: "6px",
                          fontSize: "13px",
                          transition: "background-color 0.15s ease",
                        }}
                      >
                        Request Project Quote ›
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stpr"></div>
            </div>

            {/* Global Footer */}
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
