import type { Metadata } from "next";
import PricingClientView from "./pricing-client-view";
import { getServices } from "../lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "B2B Services, SOW & Pricing",
  description:
    "Transparent B2B milestone pricing for Next.js web development, PostgreSQL optimization, Cloudflare deployments, and full-stack software sprints by MD Abu Hanif Mia.",
  keywords: [
    "Software Development Pricing",
    "Full-Stack B2B Rates",
    "PostgreSQL Optimization Consultant",
    "Next.js Web Development",
    "Cloudflare Pages Setup",
    "Full-Stack MVP Development",
    "Abu Hanif",
    "MD Abu Hanif Mia",
  ],
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
  openGraph: {
    title: "B2B Services & Work Pricing | Abu Hanif",
    description:
      "Transparent milestone tiers: Codebase Audits, Postgres Query Sprints, Edge Deployments, and Full-Stack Web Builds.",
    url: `${siteUrl}/pricing`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Services & Work Pricing | Abu Hanif",
    description:
      "Transparent milestone tiers: Codebase Audits, Postgres Query Sprints, Edge Deployments, and Full-Stack Web Builds.",
    creator: "@MohammadBitull1",
  },
};

const pricingFaqs = [
  {
    q: "Why do you use fixed-price milestones instead of open-ended hourly billing?",
    a: "Fixed-scope milestones give you the exact cost and delivery timeline up front before code is written, ensuring predictable budgeting without scope surprises.",
  },
  {
    q: "Who owns the intellectual property and source code?",
    a: "You do. 100% of all intellectual property, git commit histories, documentation, schemas, and assets belong to the client once milestones are delivered.",
  },
  {
    q: "What is your typical project kickoff turnaround time?",
    a: "Diagnostic audits and focused web builds typically begin within 48 to 72 hours of confirming the Statement of Work. Multi-week SaaS builds are scheduled in dedicated sprints.",
  },
  {
    q: "How do you handle post-launch bugs and warranty support?",
    a: "Every fixed milestone includes a 30-day post-launch warranty covering any bugs or configuration regressions at zero additional charge.",
  },
  {
    q: "Are you open to remote UK/EU full-time employment as well as B2B contracts?",
    a: "Yes. Alongside independent B2B project work, I am open to full-time Remote, Hybrid, or On-Site / Relocation opportunities in the UK, Europe, and internationally.",
  },
  {
    q: "What are your payment terms and invoicing methods?",
    a: "Standard SOW milestones follow a 25% kickoff deposit, 50% upon core implementation milestone review, and 25% upon final handover via international bank transfer (Wise / SWIFT) or Stripe.",
  },
];

export default async function PricingPage() {
  const services = await getServices();

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Software Engineering & Architecture Consulting Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          name: "MD Abu Hanif Mia",
          url: siteUrl,
        },
      },
      price: service.priceDisplay.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      position: index + 1,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
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
        name: "Pricing & Services",
        item: `${siteUrl}/pricing`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingClientView services={services} />
    </>
  );
}
