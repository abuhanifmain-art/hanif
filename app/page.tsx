import type { Metadata } from "next";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import HeroBanner from "./components/home/hero-banner";
import BadgesBar from "./components/home/badges-bar";
import BioAndCredentials from "./components/home/bio-and-credentials";
import WorkShowcaseSection from "./components/home/work-showcase-section";
import TechnicalBlogFeed from "./components/home/technical-blog-feed";
import HomeSidebar from "./components/home/home-sidebar";
import BottomContactStripe from "./components/home/bottom-contact-stripe";
import EnterpriseTestimonialsSection from "./components/enterprise-testimonials-section";
import { getProfile, getProjects, getBlogPosts, getTestimonials } from "./lib/portfolio-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "Abu Hanif (MD Abu Hanif Mia) | Full-Stack Developer & International Ops",
  description:
    "MD Abu Hanif Mia (Abu Hanif) — Full-Stack Web Developer (Next.js, TypeScript, PostgreSQL) & International Operations Professional. Creator of NexusCalculator.net. Open to Remote, B2B & On-Site roles in UK & Europe.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Abu Hanif (MD Abu Hanif Mia) | Full-Stack Developer & International Ops",
    description:
      "Creator of NexusCalculator.net • Next.js, TypeScript, PostgreSQL • Open to Remote, B2B & On-Site Roles in UK & Europe.",
    url: siteUrl,
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
};

export const revalidate = 60;

export default async function HomePage() {
  const [profile, projects, blogPosts, testimonials] = await Promise.all([
    getProfile(),
    getProjects(),
    getBlogPosts(),
    getTestimonials(),
  ]);

  return (
    <>
      <div id="portfolio-page-root" data-route="/">
        <div id="index" className="portfolio-shell-body js home abuhanif-portfolio-shell">
          <SiteHeader activePath="/" profilePhotoUrl={profile.visualAssets.profilePhotoUrl} />

          <div id="container" className="index">
            <div className="cwrap">
              <div id="main">
                <div className="mwrap">
                  <HeroBanner profile={profile} />
                  <div className="tcfrags"></div>

                  <div id="content">
                    <div id="breadcrumbs">
                      <div className="wrapper"></div>
                    </div>

                    <div className="bodytext">
                      <div className="description">
                        <BadgesBar />
                        <BioAndCredentials profile={profile} />
                        <WorkShowcaseSection projects={projects} />
                        <EnterpriseTestimonialsSection testimonials={testimonials} />
                      </div>
                    </div>

                    <div className="sidebar primary-sidebar"></div>
                    <TechnicalBlogFeed articles={blogPosts} />
                  </div>

                  <HomeSidebar profile={profile} />
                </div>
                <div className="stpr"></div>
              </div>

              <BottomContactStripe />
              <SiteFooter profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
