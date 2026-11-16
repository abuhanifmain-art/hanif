import type { Metadata } from "next";
import { getProjects } from "../lib/portfolio-store";
import ProjectsClientView from "./projects-client-view";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Web Projects & Systems Showcase",
  description:
    "Explore live web platforms including NexusCalculator.net alongside full-stack Next.js, TypeScript, and PostgreSQL architecture reference builds by MD Abu Hanif Mia.",
  keywords: [
    "Software Engineering Projects",
    "NexusCalculator.net",
    "Next.js 16 Portfolio",
    "PostgreSQL Reference Studies",
    "Full-Stack Web Developer",
    "Abu Hanif",
    "MD Abu Hanif Mia",
  ],
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "Web Projects & Systems Showcase | Abu Hanif",
    description:
      "Explore live platforms like NexusCalculator.net and full-stack Next.js & PostgreSQL case studies by Abu Hanif.",
    url: `${siteUrl}/projects`,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Projects & Systems Showcase | Abu Hanif",
    description:
      "Explore live platforms like NexusCalculator.net and full-stack Next.js & PostgreSQL case studies by Abu Hanif.",
    creator: "@MohammadBitull1",
  },
};

export default async function ProjectsIndexPage() {
  const projects = await getProjects();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web Projects & Systems Showcase",
    description:
      "Live web products and technical architecture blueprints built by MD Abu Hanif Mia.",
    url: `${siteUrl}/projects`,
    publisher: {
      "@type": "Person",
      name: "MD Abu Hanif Mia",
      url: siteUrl,
    },
    hasPart: projects.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.title,
      description: p.summary,
      url: `${siteUrl}/projects/${p.slug}`,
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
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsClientView initialProjects={projects} />
    </>
  );
}
