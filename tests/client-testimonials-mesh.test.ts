import { describe, it, expect } from "vitest";
import { getTestimonials } from "../app/lib/portfolio-store";
import { initialProjects, initialServices } from "../app/data/portfolio-data";

describe("Client Endorsements Integrity & Ethical Social Proof", () => {
  it("excludes fabricated synthetic testimonials by default on public pages", async () => {
    const testimonials = await getTestimonials();
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBe(0);
  });

  it("ensures project and service seeds remain valid for genuine endorsements when added via Admin", () => {
    const projectSlugs = new Set(initialProjects.map((p) => p.slug));
    const serviceSlugs = new Set(initialServices.map((s) => s.slug));

    expect(projectSlugs.has("nexus-calculator-platform")).toBe(true);
    expect(projectSlugs.size).toBeGreaterThanOrEqual(7);
    expect(serviceSlugs.size).toBeGreaterThanOrEqual(8);
  });
});
