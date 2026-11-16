import type { Metadata } from "next";
import ResumeClientView from "./resume-client-view";
import { getProfile } from "../lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "CV, Work History & Credentials",
  description:
    "Official CV of MD Abu Hanif Mia (Abu Hanif) — Full-Stack Web Developer & International Operations Professional. Creator of NexusCalculator.net, HSC Commerce (Wali Neowaj Khan College), Programming Hero 2025, Oman & Bangladesh work history.",
  keywords: [
    "MD Abu Hanif Mia CV",
    "Abu Hanif Resume",
    "Full-Stack Web Developer CV",
    "NexusCalculator.net",
    "Wali Neowaj Khan College",
    "Programming Hero Batch 12",
    "WEB12-3991",
    "freeCodeCamp Self-Study",
    "WACASCO Oman",
    "PRAN-RFL Group",
    "UK Europe Remote Relocation",
  ],
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    title: "CV, Work History & Credentials | MD Abu Hanif Mia",
    description:
      "Full-Stack Web Developer (Next.js, TypeScript) & 7+ yrs International Operations (Oman & Bangladesh). Open to Remote, B2B & On-Site Roles in UK & Europe.",
    url: `${siteUrl}/resume`,
    type: "profile",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV, Work History & Credentials | MD Abu Hanif Mia",
    description:
      "Full-Stack Web Developer & International Operations CV. Creator of NexusCalculator.net. Open to UK & Europe roles.",
    creator: "@MohammadBitull1",
  },
};

export default async function ResumePage() {
  const profile = await getProfile();

  const resumeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/resume#webpage`,
        url: `${siteUrl}/resume`,
        name: "CV, Work History & Credentials | MD Abu Hanif Mia",
        description:
          "Curriculum Vitae and verifiable background of MD Abu Hanif Mia (Abu Hanif) — Open to Remote, B2B, and On-Site roles in UK & Europe.",
        dateCreated: "2024-01-01T00:00:00Z",
        dateModified: "2026-11-16T00:00:00Z",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: profile.fullName,
          alternateName: ["Abu Hanif", "md abu hanif mia"],
          jobTitle: profile.kicker,
          description: profile.bio,
          url: siteUrl,
          image: `${siteUrl}${profile.visualAssets.profilePhotoUrl.startsWith("/") ? profile.visualAssets.profilePhotoUrl : "/images/profile.png"}`,
          email: profile.email,
          telephone: profile.phone.replace(/\s+/g, ""),
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sadar Upazila",
            addressLocality: "Kishoreganj",
            addressRegion: "Dhaka",
            addressCountry: "Bangladesh",
          },
          sameAs: [
            profile.socialLinks.github,
            profile.socialLinks.linkedin,
            profile.socialLinks.twitter,
            profile.socialLinks.facebook,
            profile.socialLinks.instagram,
          ].filter(Boolean),
          alumniOf: [
            {
              "@type": "EducationalOrganization",
              name: "Wali Neowaj Khan College (EIIN: 110495 • Board: Dhaka Education Board • HSC in Commerce 2016–2017)",
            },
            {
              "@type": "EducationalOrganization",
              name: "Programming Hero",
              url: "https://programming-hero.com",
            },
          ],
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              name: "Web Development Course (Batch-12)",
              credentialCategory: "Certificate of Completion",
              recognizedBy: {
                "@type": "Organization",
                name: "Programming Hero",
                url: "https://programming-hero.com",
              },
              identifier: "WEB12-3991",
              url: `${siteUrl}/images/programming-hero-certificate.png`,
              validIn: {
                "@type": "AdministrativeArea",
                name: "Global",
              },
              description:
                "Completed full-stack web development training in 2025 (Batch-12 • ID: WEB12-3991).",
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "Self-Directed Programming Study (TypeScript, Python, Rust, C++)",
              credentialCategory: "Self-Directed Online Study",
              recognizedBy: {
                "@type": "Organization",
                name: "freeCodeCamp",
                url: "https://www.freecodecamp.org",
              },
            },
          ],
          knowsLanguage: ["Bengali", "English", "Hindi", "Urdu"],
          knowsAbout: [
            "TypeScript",
            "Next.js 16",
            "React 19",
            "PostgreSQL & Supabase",
            "Python",
            "Rust",
            "C++",
            "Hospitality & Catering Operations",
            "Manufacturing Line Operations",
            "Territory Sales & Client Service",
          ],
        },
        breadcrumb: {
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
              name: "CV & Credentials",
              item: `${siteUrl}/resume`,
            },
          ],
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: "Abu Hanif Portfolio & Digital Services",
        },
      },
      {
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
            name: "CV & Credentials",
            item: `${siteUrl}/resume`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd).replace(/</g, "\\u003c") }}
      />
      <ResumeClientView profile={profile} />
    </>
  );
}
