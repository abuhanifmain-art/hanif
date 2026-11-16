import type { Metadata } from "next";
import PricingPage from "../pricing/page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abuhanifmia.com";

export const metadata: Metadata = {
  title: "B2B Services & Work Prices",
  description:
    "Transparent B2B milestone pricing for Next.js web development, PostgreSQL optimization, Cloudflare deployments, and full-stack software sprints by MD Abu Hanif Mia.",
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
};

export default PricingPage;
