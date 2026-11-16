import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { getProfile } from "../lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Privacy Policy & UK/EU GDPR Notice",
  description:
    "UK GDPR and EU GDPR privacy notice explaining data collection, contact inquiry processing, cookie transparency, retention periods, and your rights on Abu Hanif's website.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy & UK/EU GDPR Notice | Abu Hanif",
    description:
      "Transparent UK/EU GDPR privacy policy for employment, B2B contract, and portfolio inquiries to MD Abu Hanif Mia.",
    url: `${siteUrl}/privacy`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & UK/EU GDPR Notice | Abu Hanif",
    description:
      "Transparent UK/EU GDPR privacy policy for employment, B2B contract, and portfolio inquiries.",
    creator: "@MohammadBitull1",
  },
};

export default async function PrivacyPolicyPage() {
  const profile = await getProfile();
  const legal = profile.legalGdpr;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy & UK/EU GDPR Notice",
    description:
      "Data protection and GDPR compliance notice for abuhanifmia.com.",
    url: `${siteUrl}/privacy`,
    dateModified: legal.lastUpdated,
    author: {
      "@type": "Person",
      name: profile.fullName,
      url: siteUrl,
    },
  };

  return (
    <div id="source-page-root" data-source-path="/privacy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div
        id="source-page-body"
        className="source-page-body js l2 section_10 abuhanif-portfolio-shell"
      >
        <SiteHeader activePath="/privacy" />

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
                          Data Protection &amp; Transparency
                        </span>
                        <h1
                          className="subpage-banner-title"
                          style={{
                            margin: "4px 0 0 0",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Privacy Policy &amp; UK / EU GDPR Notice
                        </h1>
                        <p
                          style={{
                            margin: "8px 0 0 0",
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#e2e8f0",
                          }}
                        >
                          Last Updated: {legal.lastUpdated} &bull; Manageable via Admin Console
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
                      &gt; <span>Privacy &amp; GDPR Policy</span>
                    </div>
                  </div>

                  <div
                    className="bodytext"
                    style={{ maxWidth: "880px", margin: "24px auto", color: "#1e293b", lineHeight: 1.75 }}
                  >
                    <section
                      style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #cbd5e1",
                        borderLeft: "4px solid #2563eb",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <h2 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#0f172a" }}>
                        1. Data Controller Information
                      </h2>
                      <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                        <strong>Controller:</strong> {legal.controllerName}
                        {legal.tradingAs ? ` (${legal.tradingAs})` : ""}
                      </p>
                      <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                        <strong>Location / Address:</strong> {legal.controllerAddress}
                      </p>
                      <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                        <strong>Direct Privacy Contact Email:</strong>{" "}
                        <a href={`mailto:${legal.controllerEmail}`} style={{ color: "#2563eb", fontWeight: 700 }}>
                          {legal.controllerEmail}
                        </a>{" "}
                        &bull; <strong>Phone:</strong>{" "}
                        <a href={`tel:${legal.controllerPhone.replace(/[^+\d]/g, "")}`} style={{ color: "#2563eb", fontWeight: 700 }}>
                          {legal.controllerPhone}
                        </a>
                      </p>
                      {legal.icoOrRegistrationNote && (
                        <p style={{ margin: 0, fontSize: "13px", color: "#475569" }}>
                          <strong>Registration / Legal Status Note:</strong> {legal.icoOrRegistrationNote}
                        </p>
                      )}
                    </section>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      2. What Personal Data Is Collected &amp; Why
                    </h2>
                    <ul style={{ paddingLeft: "20px", fontSize: "14.5px", marginBottom: "20px" }}>
                      <li>
                        <strong>Contact &amp; Recruitment Inquiry Forms:</strong> When you voluntarily submit an inquiry via the sidebar, bottom form, or{" "}
                        <Link href="/pricing#inquiry" style={{ color: "#2563eb" }}>/pricing#inquiry</Link>, we collect your name, email address, optional phone number, inquiry scope, and message.
                      </li>
                      <li>
                        <strong>Lawful Basis (UK/EU GDPR Art. 6):</strong> Processing relies on your explicit opt-in consent when submitting the form and/or legitimate interest &amp; pre-contractual steps (Art. 6(1)(a), (b), and (f)) to respond to employment interviews or service requests.
                      </li>
                      <li>
                        <strong>Client Order Tracking Portal:</strong> Existing B2B clients accessing private workspace order tokens share standard project milestones and billing identifiers solely for contract execution.
                      </li>
                    </ul>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      3. Cookies &amp; Local Browser Storage
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "20px" }}>
                      Public visitors are <strong>not</strong> tracked with advertising cookies, behavioral ad networks, or cross-site tracking pixels. Essential <code>localStorage</code> entries are used solely to remember banner dismissal or UI state, and an <code>HttpOnly</code> cryptographic session cookie is issued exclusively when an administrator authenticates at <code>/admin/login</code>.
                    </p>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      4. Sub-Processors &amp; Data Retention
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "10px" }}>
                      <strong>Infrastructure &amp; Sub-Processors:</strong> {legal.subProcessorsNote}
                    </p>
                    <p style={{ fontSize: "14.5px", marginBottom: "20px" }}>
                      <strong>Retention Period:</strong> {legal.dataRetentionSummary}
                    </p>

                    <h2 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                      5. Your UK &amp; EU Data Subject Rights
                    </h2>
                    <p style={{ fontSize: "14.5px", marginBottom: "12px" }}>
                      Under UK GDPR and EU GDPR, you have the right to request access, rectification, erasure (&ldquo;right to be forgotten&rdquo;), restriction of processing, data portability, or withdrawal of consent at any time. To exercise any right, email{" "}
                      <a href={`mailto:${legal.controllerEmail}`} style={{ color: "#2563eb", fontWeight: 700 }}>
                        {legal.controllerEmail}
                      </a>{" "}
                      with the subject &ldquo;GDPR Data Request&rdquo;. Requests are answered within 30 calendar days.
                    </p>

                    {legal.privacyPolicyCustomNotes && (
                      <div
                        style={{
                          backgroundColor: "#eff6ff",
                          border: "1px solid #bfdbfe",
                          borderRadius: "6px",
                          padding: "14px 16px",
                          fontSize: "13.5px",
                          color: "#1e3a8a",
                          marginTop: "20px",
                        }}
                      >
                        <strong>Additional Legal / Controller Notice:</strong> {legal.privacyPolicyCustomNotes}
                      </div>
                    )}

                    <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <Link
                        href="/terms"
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
                        Read Terms of Service &rsaquo;
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
