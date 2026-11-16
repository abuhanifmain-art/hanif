import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import ServicesClientView from "./services-client-view";
import { getServices } from "../lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Web Development & Digital Services",
  description:
    "B2B & remote technical services by Full-Stack Web Developer Abu Hanif: Programmatic SEO, automation workflows, Next.js web applications, and PostgreSQL optimization.",
  keywords: [
    "Programmatic SEO Engineer",
    "Technical SEO Specialist",
    "Social Media Automation Developer",
    "Next.js 16 Web Developer",
    "Custom Full-Stack Developer",
    "PostgreSQL Query Optimization",
    "Cloudflare Pages Deployment",
    "UK Europe Remote B2B Developer",
    "Abu Hanif Services",
    "MD Abu Hanif Mia",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Web Development & Digital Services | Abu Hanif",
    description:
      "Programmatic SEO, automation workflows, Next.js 16 web platforms, and PostgreSQL optimization delivered on clear fixed-scope milestones.",
    url: `${siteUrl}/services`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Digital Services | Abu Hanif",
    description:
      "Programmatic SEO, automation workflows, Next.js 16 web platforms, and PostgreSQL optimization.",
    creator: "@MohammadBitull1",
  },
};

const servicesFaqs = [
  {
    q: "Why fixed-price milestone sprints instead of open-ended hourly billing?",
    a: "Fixed-price milestone sprints ensure clear scope, predictable costs, and agreed deliverables before work begins, whether collaborating with UK, European, or international teams.",
  },
  {
    q: "Who owns the intellectual property and code repository?",
    a: "You do. 100% of all code, git history, documentation, database schemas, and assets belong to the client upon handover.",
  },
  {
    q: "How does Programmatic SEO engineering differ from manual SEO?",
    a: "Programmatic SEO uses structured TypeScript registries and Schema.org JSON-LD pipelines to serve fast, statically generated pages — the same pattern running live on NexusCalculator.net across four languages.",
  },
  {
    q: "What is your typical turnaround time for kickoff?",
    a: "Diagnostic audits and landing page builds typically start within 48 to 72 hours after scope confirmation. Larger full-stack applications are scheduled in dedicated milestone sprints.",
  },
  {
    q: "Do you offer post-launch support and bug warranties?",
    a: "Yes. Every fixed sprint includes a 30-day post-launch warranty covering any bugs or configuration regressions at zero additional charge.",
  },
  {
    q: "Are you available for full-time employment or B2B contracts in the UK and Europe?",
    a: "Yes. Alongside independent B2B services, I am actively open to Remote, B2B Contract, and On-Site / Relocation employment across technical, web development, IT operations, and international roles.",
  },
];

export default async function ServicesHubPage() {
  const services = await getServices();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Web Development & Technical Services Catalog",
    description: "Full-stack Next.js development, programmatic SEO, workflow automation, and PostgreSQL optimization by MD Abu Hanif Mia.",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          name: "MD Abu Hanif Mia",
          jobTitle: "Full-Stack Web Developer & Digital Systems Specialist",
          url: siteUrl,
        },
        areaServed: {
          "@type": "Place",
          name: "UK, Europe & Worldwide (Remote / B2B)",
        },
      },
      price: service.priceDisplay.replace(/[^0-9]/g, "") || "3500",
      priceCurrency: "USD",
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
        name: "Services & Solutions",
        item: `${siteUrl}/services`,
      },
    ],
  };

  return (
    <div id="portfolio-page-root" data-route="/services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div id="portfolio-shell-body" className="portfolio-shell-body js abuhanif-portfolio-shell">
        <SiteHeader activePath="/services" />

        <div className="index" id="container">
          <div className="cwrap">
            <div id="main">
              <div className="mwrap">
                {/* Standard Inner Page Executive Banner */}
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <h1 className="subpage-banner-title" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                          Engineering &amp; Growth Solutions: Built for Speed &amp; Scale
                        </h1>
                        <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "normal", color: "#e2e8f0" }}>
                          Programmatic SEO • Social Media Automation • High-Converting Landing Pages • Full-Stack SaaS Platforms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tcfrags"></div>

                <div id="content" style={{ width: "100%", maxWidth: "100%", float: "none", margin: 0, padding: 0 }}>
                  {/* Semantic Breadcrumbs */}
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <Link href="/">Home</Link> &gt; <span>Engineering &amp; Growth Services</span>
                    </div>
                  </div>

                  {/* Clean White Executive Services Client Experience */}
                  <ServicesClientView services={services} />
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
