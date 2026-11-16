import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/cookie-banner";
import CertificateViewer from "./components/certificate-viewer";
import CommandPalette from "./components/command-palette";
import MobileBottomDock from "./components/mobile-bottom-dock";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abu Hanif (MD Abu Hanif Mia) | Full-Stack Developer & International Ops",
    template: "%s | Abu Hanif",
  },
  description:
    "Portfolio of MD Abu Hanif Mia (Abu Hanif) — Full-Stack Web Developer (Next.js, TypeScript, PostgreSQL) & International Operations Professional. Open to Remote, B2B & On-Site roles in UK, Europe & worldwide.",
  keywords: [
    "Abu Hanif",
    "MD Abu Hanif Mia",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Cloudflare Pages",
    "Supabase",
    "PostgreSQL",
    "UK Europe Remote B2B",
    "NexusCalculator",
    "Portfolio & Client Portal",
  ],
  authors: [{ name: "MD Abu Hanif Mia", url: siteUrl }],
  creator: "MD Abu Hanif Mia",
  publisher: "MD Abu Hanif Mia",
  openGraph: {
    title: "Abu Hanif (MD Abu Hanif Mia) | Full-Stack Developer & International Ops",
    description:
      "Creator of NexusCalculator.net • Next.js, TypeScript, PostgreSQL • Open to Remote, B2B & On-Site Roles in UK & Europe.",
    url: siteUrl,
    siteName: "Abu Hanif Portfolio & Digital Services",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Hanif (MD Abu Hanif Mia) | Full-Stack Developer & International Ops",
    description:
      "Creator of NexusCalculator.net • Next.js, TypeScript, PostgreSQL • Open to Remote, B2B & On-Site Roles in UK & Europe.",
    creator: "@MohammadBitull1",
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Abu Hanif",
  },
};

export const viewport = {
  themeColor: "#0b132b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abu Hanif Portfolio & Digital Services",
      description: "Portfolio, live web projects (NexusCalculator.net), technical notes, and client portal of MD Abu Hanif Mia.",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "MD Abu Hanif Mia",
      alternateName: ["Abu Hanif", "md abu hanif mia"],
      jobTitle: "Full-Stack Web Developer & International Operations Professional",
      description:
        "Full-Stack Web Developer (Next.js, TypeScript, PostgreSQL) & International Operations Professional (Oman & Bangladesh). Creator of NexusCalculator.net, open to Remote, B2B & On-Site roles in the UK, Europe & worldwide.",
      url: siteUrl,
      image: `${siteUrl}/images/profile.png`,
      email: "abuhanifmain@gmail.com",
      telephone: "+8801724010261",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sadar Upazila",
        addressLocality: "Kishoreganj",
        addressRegion: "Dhaka",
        addressCountry: "Bangladesh",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Wali Neowaj Khan College (HSC in Commerce, 2016–2017 • EIIN: 110495 • Dhaka Education Board)",
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
          description: "Completed full-stack web development training in 2025 (Batch-12).",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Self-Directed Study: TypeScript, Python, Rust, and C++",
          credentialCategory: "Independent Online Study",
          recognizedBy: {
            "@type": "Organization",
            name: "freeCodeCamp",
            url: "https://www.freecodecamp.org",
          },
        },
      ],
      knowsLanguage: ["Bengali", "English", "Hindi", "Urdu"],
      knowsAbout: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "PostgreSQL & Supabase",
        "Cloudflare Pages",
        "Python",
        "Rust",
        "C++",
        "Hospitality & Catering Operations",
        "Manufacturing Operations",
        "Client Relationship Management",
      ],
      sameAs: [
        "https://github.com/abuhanif254",
        "https://www.linkedin.com/in/md-abu-hanif-mia",
        "https://x.com/MohammadBitull1",
        "https://www.facebook.com/bitulla",
        "https://www.instagram.com/bitullah_aj",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Abu Hanif Web Development & Digital Services",
      url: siteUrl,
      image: `${siteUrl}/images/profile.png`,
      email: "abuhanifmain@gmail.com",
      telephone: "+8801724010261",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sadar Upazila",
        addressLocality: "Kishoreganj",
        addressRegion: "Dhaka",
        addressCountry: "Bangladesh",
      },
      sameAs: [
        "https://github.com/abuhanif254",
        "https://www.linkedin.com/in/md-abu-hanif-mia",
        "https://x.com/MohammadBitull1",
        "https://www.facebook.com/bitulla",
        "https://www.instagram.com/bitullah_aj",
      ],
      priceRange: "$2,500 - $18,500",
      areaServed: ["United Kingdom", "Europe", "Worldwide"],
      founder: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}>
        {children}
        <CookieBanner />
        <CertificateViewer />
        <CommandPalette />
        <MobileBottomDock />
      </body>
    </html>
  );
}
