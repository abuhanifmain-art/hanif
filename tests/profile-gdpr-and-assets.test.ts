import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { GET, PUT } from "../app/api/admin/profile/route";
import { getProfile } from "../app/lib/portfolio-store";
import { getAdminSecret } from "../app/lib/admin-auth";

const AUTH_HEADER = { Authorization: `Bearer ${getAdminSecret()}` };

describe("Truthful Profile, Admin Visual Asset Replacement & UK/EU GDPR Compliance", () => {
  it("loads accurate education, languages, and work history in default profile", async () => {
    const profile = await getProfile();

    expect(profile.email).toBe("abuhanifmain@gmail.com");
    expect(profile.phone).toBe("+880 1724-010261");

    expect(profile.spokenLanguages.map((l) => l.language)).toEqual(
      expect.arrayContaining(["Bengali", "English", "Hindi & Urdu"])
    );

    const institutions = profile.educationHistory.map((e) => e.institution);
    expect(institutions).toEqual(
      expect.arrayContaining(["Wali Neowaj Khan College", "Programming Hero", "freeCodeCamp"])
    );
    expect(profile.educationHistory[0].details).toContain("110495");

    const companies = profile.workHistory.map((w) => w.company);
    expect(companies).toEqual(
      expect.arrayContaining([
        "WACASCO Catering Services",
        "PRAN-RFL Group",
        "Unilever Bangladesh",
      ])
    );
  });

  it("rejects unauthenticated requests to /api/admin/profile", async () => {
    const getRes = await GET(new NextRequest("http://localhost:3000/api/admin/profile"));
    expect(getRes.status).toBe(401);

    const putRes = await PUT(
      new NextRequest("http://localhost:3000/api/admin/profile", {
        method: "PUT",
        body: JSON.stringify({ fullName: "Unauthorized Edit" }),
      })
    );
    expect(putRes.status).toBe(401);
  });

  it("allows authenticated Admin to update visual assets and GDPR/legal details", async () => {
    const original = await getProfile();

    const updatePayload = {
      visualAssets: {
        ...original.visualAssets,
        profilePhotoUrl: "/images/nexuscalculator-homepage.png",
      },
      legalGdpr: {
        ...original.legalGdpr,
        icoOrRegistrationNote: "UK Sole Trader Reference Updated via Admin",
        privacyPolicyCustomNotes: "Updated custom GDPR notice via test",
      },
    };

    const req = new NextRequest("http://localhost:3000/api/admin/profile", {
      method: "PUT",
      headers: {
        ...AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });

    const res = await PUT(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.profile.visualAssets.profilePhotoUrl).toBe("/images/nexuscalculator-homepage.png");
    expect(json.profile.legalGdpr.icoOrRegistrationNote).toBe("UK Sole Trader Reference Updated via Admin");

    // Restore original defaults cleanly
    await PUT(
      new NextRequest("http://localhost:3000/api/admin/profile", {
        method: "PUT",
        headers: {
          ...AUTH_HEADER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visualAssets: original.visualAssets,
          legalGdpr: original.legalGdpr,
        }),
      })
    );
  });

  it("enforces unchecked GDPR consent checkboxes by default on public inquiry forms", () => {
    const sidebarSource = fs.readFileSync(
      path.resolve(process.cwd(), "app/components/home/home-sidebar.tsx"),
      "utf8"
    );
    const bottomStripeSource = fs.readFileSync(
      path.resolve(process.cwd(), "app/components/home/bottom-contact-stripe.tsx"),
      "utf8"
    );
    const pricingSource = fs.readFileSync(
      path.resolve(process.cwd(), "app/pricing/pricing-client-view.tsx"),
      "utf8"
    );

    expect(sidebarSource).toContain("disclaimer: false");
    expect(bottomStripeSource).toContain("disclaimer: false");
    expect(pricingSource).toContain("disclaimer: false");
  });
});
