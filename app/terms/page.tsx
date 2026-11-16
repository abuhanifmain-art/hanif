import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { getProfile } from "../lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Terms of Service & B2B Engagement Terms",
  description:
    "Website terms of use, intellectual property ownership, B2B contract milestone structure, and contact terms for MD Abu Hanif Mia.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms of Service & B2B Engagement Terms | Abu Hanif",
    description:
      "Clear website terms of use and B2B software development engagement terms for MD Abu Hanif Mia.",
    url: `${siteUrl}/terms`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service & B2B Engagement Terms | Abu Hanif",
    description:
      "Website terms of use and fixed-scope B2B software development engagement terms.",
    creator: "@MohammadBitull1",
  },
};

export const revalidate = 60;

export default async function TermsPage() {
  const profile = await getProfile();
  const legal = profile.legalGdpr;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service & B2B Engagement Terms",
    description: "Website use and commercial service terms for abuhanifmia.com.",
    url: `${siteUrl}/terms`,
    dateModified: legal.lastUpdated,
    author: {
      "@type": "Person",
      name: profile.fullName,
      url: siteUrl,
    },
  };

  return (
    <div id="portfolio-page-root" data-route="/terms">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div
        id="portfolio-shell-body"
        className="portfolio-shell-body js abuhanif-portfolio-shell"
      >
        <SiteHeader activePath="/terms" profilePhotoUrl={profile.visualAssets.profilePhotoUrl} />

        <div className="index" id="container">
          <div className="cwrap">
            <div id="main">
              <div className="mwrap">
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#38bdf8",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Legal &amp; Commercial Disclosures
                        </span>
                        <h1
                          className="subpage-banner-title"
                          style={{
                            margin: "4px 0 0 0",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Terms of Service &amp; Engagement Notice
                        </h1>
                        <p
                          style={{
                            margin: "8px 0 0 0",
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#e2e8f0",
                          }}
                        >
                          Effective Date: {legal.lastUpdated} &bull; {legal.controllerName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="content" style={{ padding: "32px 24px" }}>
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <Link href="/" style={{ color: "#2563eb" }}>
                        Home
                      </Link>{" "}
                      &gt; <span>Terms of Service</span>
                    </div>
                  </div>

                  <div
                    className="bodytext"
                    style={{ maxWidth: "880px", margin: "24px auto", color: "#1e293b", lineHeight: 1.75 }}
                  >
                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      1. Informational &amp; Portfolio Content
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "18px" }}>
                      This website serves both as the personal employment portfolio of{" "}
                      <strong>{legal.controllerName}</strong> and as a client order management portal. Live deployed applications (such as{" "}
                      <a href="https://nexuscalculator.net" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>
                        NexusCalculator.net
                      </a>
                      ) are labeled explicitly alongside interactive architecture reference blueprints and lab simulations in{" "}
                      <Link href="/lab" style={{ color: "#2563eb" }}>/lab</Link> and{" "}
                      <Link href="/status" style={{ color: "#2563eb" }}>/status</Link>.
                    </p>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      2. B2B Statements of Work &amp; Estimates
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "18px" }}>
                      Prices displayed on <Link href="/pricing" style={{ color: "#2563eb" }}>/pricing</Link> and{" "}
                      <Link href="/services" style={{ color: "#2563eb" }}>/services</Link> represent standard planning benchmarks. No binding commercial obligation or client relationship is created until both parties agree in writing to a final Statement of Work (SOW), delivery schedule, and payment terms.
                    </p>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      3. Intellectual Property &amp; Open Code
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "18px" }}>
                      For commissioned B2B client engagements, 100% of custom deliverables, repository code, and database migrations are transferred to the client upon full milestone settlement unless otherwise specified in writing.
                    </p>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      4. Contact &amp; Legal Inquiries
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "18px" }}>
                      <strong>Operator:</strong> {legal.controllerName}
                      {legal.tradingAs ? ` (${legal.tradingAs})` : ""} &bull;{" "}
                      <strong>Address:</strong> {legal.controllerAddress} &bull;{" "}
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${legal.controllerEmail}`} style={{ color: "#2563eb", fontWeight: 700 }}>
                        {legal.controllerEmail}
                      </a>{" "}
                      &bull; <strong>Phone:</strong> {legal.controllerPhone}.
                    </p>

                    {legal.termsCustomNotes && (
                      <div
                        style={{
                          backgroundColor: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderLeft: "4px solid #10b981",
                          borderRadius: "6px",
                          padding: "14px 16px",
                          fontSize: "13.5px",
                          color: "#334155",
                        }}
                      >
                        <strong>Custom Engagement Note:</strong> {legal.termsCustomNotes}
                      </div>
                    )}

                    <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <Link
                        href="/privacy"
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#0b132b",
                          color: "#ffffff",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        Privacy &amp; GDPR Policy &rsaquo;
                      </Link>
                      <Link
                        href="/"
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#f1f5f9",
                          color: "#0f172a",
                          border: "1px solid #cbd5e1",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        &larr; Back to Home
                      </Link>
                    </div>
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
