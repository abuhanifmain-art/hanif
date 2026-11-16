import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import StatusDashboardClient from "./status-dashboard-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Live Systems Status & Edge Diagnostics",
  description:
    "Live runtime diagnostics, edge ping monitoring, and reference status telemetry for Abu Hanif's portfolio platform.",
  keywords: [
    "Systems Status",
    "Edge Ping Diagnostics",
    "PostgreSQL Connection Status",
    "Cloudflare Pages Telemetry",
    "Abu Hanif",
    "MD Abu Hanif Mia",
    "Platform Health Diagnostics",
  ],
  alternates: {
    canonical: `${siteUrl}/status`,
  },
  openGraph: {
    title: "Live Systems Status & Edge Diagnostics | Abu Hanif",
    description:
      "Live runtime diagnostics and edge ping telemetry for Abu Hanif's portfolio platform.",
    url: `${siteUrl}/status`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Systems Status & Edge Diagnostics | Abu Hanif",
    description: "Live Edge Diagnostics & Portfolio Service Status.",
    creator: "@MohammadBitull1",
  },
};

export default function StatusPage() {
  const statusSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Live Systems Status & Edge Diagnostics",
    description: "Live portfolio service health and edge ping diagnostics.",
    url: `${siteUrl}/status`,
    author: {
      "@type": "Person",
      name: "MD Abu Hanif Mia",
      url: siteUrl,
      jobTitle: "Full-Stack Web Developer",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Systems Status",
        item: `${siteUrl}/status`,
      },
    ],
  };

  return (
    <div id="portfolio-page-root" data-route="/status">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(statusSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div id="portfolio-shell-body" className="portfolio-shell-body js abuhanif-portfolio-shell">
        <SiteHeader activePath="/status" />

        <div className="index" id="container">
          <div className="cwrap">
            <div id="main">
              <div className="mwrap">
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                          Production Telemetry &bull; Empirical Observability
                        </span>
                        <h1 className="subpage-banner-title" style={{ margin: "4px 0 0 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Live Systems Status &amp; Edge Health
                        </h1>
                        <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "normal", color: "#e2e8f0" }}>
                          Cloudflare Global Edge • PostgreSQL Supavisor Pool • Multi-Region P99 Latency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="content" style={{ padding: "32px 24px" }}>
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <Link href="/">Home</Link> &gt; <span>Systems Status</span>
                    </div>
                  </div>

                  <div className="bodytext" style={{ maxWidth: "880px", margin: "24px 0" }}>
                    <StatusDashboardClient />
                  </div>
                </div>
              </div>
            </div>

            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
