"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialServices, initialTestimonials, ServicePricing } from "../data/portfolio-data";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import StatementOfWorkGenerator from "../components/sow-generator";
import CloudRoiCalculator from "../components/cloud-roi-calculator";
import { ecosystemRelations } from "../lib/ecosystem-map";

export default function PricingClientView({
  services: propServices,
}: {
  services?: ServicePricing[];
} = {}) {
  const services = propServices && propServices.length > 0 ? propServices : initialServices;
  const [selectedServiceId, setSelectedServiceId] = useState<string>("serv-4");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Full-Stack SaaS MVP Engineering Sprint",
    budgetRange: "$10,000 – $25,000",
    message: "",
    disclaimer: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize incoming SOW generator configuration with project inquiry form
  useEffect(() => {
    function handleSowPrefill(e: Event) {
      const customEvent = e as CustomEvent<{
        projectType?: string;
        budgetRange?: string;
        message?: string;
      }>;
      if (customEvent && customEvent.detail) {
        setFormState((prev) => ({
          ...prev,
          projectType: customEvent.detail.projectType || prev.projectType,
          budgetRange: customEvent.detail.budgetRange || prev.budgetRange,
          message: customEvent.detail.message || prev.message,
        }));
      }
    }

    window.addEventListener("sow-prefill-inquiry", handleSowPrefill);
    return () => {
      window.removeEventListener("sow-prefill-inquiry", handleSowPrefill);
    };
  }, []);

  // Add-ons Definition
  const addonsList = [
    { id: "addon-migration", title: "Zero-Downtime Data Migration & Cutover", price: 3500, desc: "Safe schema extraction, ETL transformation, and live replication cutover." },
    { id: "addon-security", title: "Security Hardening & Compliance Readiness", price: 2800, desc: "Security remediations, cryptographic key rotation, and RLS audit." },
    { id: "addon-ai", title: "Custom LLM & Vector RAG Pipeline Integration", price: 4200, desc: "Embedding generation, pgvector indexing, streaming UI, and tool-calling agents." },
    { id: "addon-warranty", title: "Extended 60-Day Dedicated Post-Launch SLA", price: 1800, desc: "Doubles the standard 30-day warranty with guaranteed emergency escalation." },
  ];

  // Calculate dynamic investment estimate
  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const basePriceNumber = parseInt(currentService.priceDisplay.replace(/[^0-9]/g, ""), 10) || 0;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = addonsList.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalEstimate = basePriceNumber + addonsTotal;

  function toggleAddon(id: string) {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  }

  function handleSelectPackageForBooking(serv: ServicePricing) {
    setSelectedServiceId(serv.id);
    setFormState((prev) => ({
      ...prev,
      projectType: serv.title,
      budgetRange: serv.priceDisplay,
      message: `Hi Abu Hanif, I would like to discuss the "${serv.title}" scope (${serv.priceDisplay}, ${serv.timeline}). Our target timeline is...`,
    }));
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleInquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.disclaimer) {
      setErrorMessage("Please confirm the Privacy & GDPR consent checkbox before submitting.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmittedMessage(null);

    const record = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      projectType: formState.projectType,
      budgetRange: formState.budgetRange,
      message: formState.message,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit project inquiry.");
      }

      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("abuhanif-inquiries");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({
          ...record,
          id: result.inquiryId || `local-${Date.now()}`,
          status: "new",
          createdAt: new Date().toISOString(),
        });
        window.localStorage.setItem("abuhanif-inquiries", JSON.stringify(list));
      }

      setSubmittedMessage(
        "Thank you! Your inquiry has been received. MD Abu Hanif Mia will review your details and reply via abuhanifmain@gmail.com."
      );
      setFormState({
        name: "",
        email: "",
        phone: "",
        projectType: currentService.title,
        budgetRange: currentService.priceDisplay,
        message: "",
        disclaimer: false,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error submitting form.";
      setErrorMessage(
        `${msg} Please email abuhanifmain@gmail.com or call +880 1724-010261 directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const faqs = [
    {
      q: "Why do you use fixed-price milestones instead of open-ended hourly billing?",
      a: "Fixed-scope milestones give you an exact cost and agreed timeline before work starts, avoiding open-ended hourly surprises.",
    },
    {
      q: "Who owns the intellectual property and source code?",
      a: "You do. 100% of all intellectual property, git commit histories, documentation, schemas, and assets belong to the client upon handover.",
    },
    {
      q: "Do you sign Mutual Non-Disclosure Agreements (NDAs)?",
      a: "Yes. Prior to reviewing private repositories, product specs, or database schemas, a mutual NDA can be executed cleanly.",
    },
    {
      q: "How are milestone payments structured?",
      a: "Fixed-scope sprints follow our SOW schedule: 25% kickoff deposit, 50% core implementation milestone delivery, and 25% upon final staging acceptance and repository handover. Monthly retainers bill on a predictable month-to-month basis.",
    },
    {
      q: "What happens if technical requirements change during a sprint?",
      a: "Minor refinements are accommodated directly, and larger new features are scoped transparently as an addendum so budgets stay clear.",
    },
    {
      q: "What is included in the 30-Day Post-Launch Warranty?",
      a: "Every fixed-scope project includes 30 days of complimentary bug-fix warranty covering regressions against the agreed scope.",
    },
    {
      q: "Can you work alongside our existing UK, European, or remote team?",
      a: "Yes. I am available for full-time Remote employment, B2B Retainer work, or On-Site / Relocation roles aligned with UK (GMT/BST) and European (CET/CEST) hours.",
    },
    {
      q: "What technology stack do you specialize in?",
      a: "TypeScript/JavaScript, Next.js 16 (App Router, Server Components), React 19, Supabase PostgreSQL, Cloudflare Pages, Tailwind CSS, plus Python, Rust, and C++ foundations.",
    },
    {
      q: "How fast can an engagement or employment interview begin?",
      a: "Discovery chats and interviews can be scheduled within 24–48 hours directly via abuhanifmain@gmail.com or +880 1724-010261.",
    },
    {
      q: "How do we get started?",
      a: "Submit the inquiry form below or email abuhanifmain@gmail.com to discuss the role, scope, or Statement of Work.",
    },
  ];

  return (
    <div id="source-page-root" data-source-path="/pricing">
      <div id="source-page-body" className="source-page-body js l2 section_29 abuhanif-portfolio-shell">
        <SiteHeader activePath="/pricing" />

        <div className="index" id="container">
          <div className="cwrap">
            {/* Main Content */}
            <div id="main">
              <div className="mwrap">
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <h1 className="subpage-banner-title" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                          Transparent Work Pricing &amp; Engineering Engagements
                        </h1>
                        <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "normal", color: "#e2e8f0" }}>
                          Fixed-Scope Sprints • Production Platforms • Fractional Architecture Retainers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tcfrags"></div>

                <div id="content">
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <a href="/">Home</a> &gt; <span>Work Pricing &amp; Engagement Models</span>
                    </div>
                  </div>

                  <div className="bodytext">
                    <div className="description">
                      <h2>Transparent Project Pricing &amp; Open B2B / Hiring Engagement</h2>
                      <p>
                        Clear pricing and straightforward communication matter for UK, European, and remote partners. As <strong>Abu Hanif (MD Abu Hanif Mia)</strong>, I structure independent development work around fixed-scope milestone sprints alongside direct availability for full-time Remote or On-Site employment.
                      </p>
                      <p>
                        Every B2B milestone engagement includes clear specifications, direct commits to your Git repository with 100% client IP ownership, and a 30-day bug-fix warranty after launch.
                      </p>

                      {/* 4 Pillars Summary Strip */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                          gap: "12px",
                          margin: "24px 0 32px 0",
                        }}
                      >
                        <div style={{ padding: "14px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                          <strong style={{ display: "block", color: "#0f172a", fontSize: "13px" }}>Fixed-Scope Sprints</strong>
                          <span style={{ fontSize: "12px", color: "#475569" }}>Clear delivery targets &amp; agreed milestone pricing.</span>
                        </div>
                        <div style={{ padding: "14px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                          <strong style={{ display: "block", color: "#0f172a", fontSize: "13px" }}>100% Client IP</strong>
                          <span style={{ fontSize: "12px", color: "#475569" }}>Direct commits to your private Git repo from day one.</span>
                        </div>
                        <div style={{ padding: "14px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                          <strong style={{ display: "block", color: "#0f172a", fontSize: "13px" }}>UK / EU Alignment</strong>
                          <span style={{ fontSize: "12px", color: "#475569" }}>Flexible GMT/BST &amp; CET/CEST work hours.</span>
                        </div>
                        <div style={{ padding: "14px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                          <strong style={{ display: "block", color: "#0f172a", fontSize: "13px" }}>30-Day Warranty</strong>
                          <span style={{ fontSize: "12px", color: "#475569" }}>Post-deployment bug fixes at zero extra cost.</span>
                        </div>
                      </div>

                      {/* SECTION 1: THE 6 CORE PACKAGES */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          Standard Production Packages &amp; Sprints
                        </h2>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "24px" }}>
                        Select a package below to inspect the detailed technical deliverables, timeline, and pricing. You can click &ldquo;Select This Scope&rdquo; to pre-fill your consultation request.
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                        {services.map((serv) => (
                          <div
                            key={serv.id}
                            style={{
                              backgroundColor: serv.isPopular ? "#f8faff" : "#ffffff",
                              border: serv.isPopular ? "2px solid #2563eb" : "1px solid #cbd5e1",
                              borderRadius: "8px",
                              padding: "24px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              position: "relative",
                              boxShadow: serv.isPopular ? "0 4px 14px rgba(37, 99, 235, 0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            {serv.isPopular && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-12px",
                                  right: "20px",
                                  backgroundColor: "#2563eb",
                                  color: "#ffffff",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  padding: "3px 10px",
                                  borderRadius: "12px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                Most Popular
                              </div>
                            )}

                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                                <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                                  {serv.pricingType === "retainer" ? "Monthly Retainer" : "Fixed Scope Sprint"}
                                </span>
                                <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: "600" }}>
                                  ⏱ {serv.timeline}
                                </span>
                              </div>

                              <h3 style={{ fontSize: "19px", color: "#0f172a", margin: "0 0 10px 0", lineHeight: "1.3", fontWeight: "700" }}>
                                {serv.title}
                              </h3>

                              <div style={{ fontSize: "28px", fontWeight: "800", color: "#2563eb", marginBottom: "12px" }}>
                                {serv.priceDisplay}
                              </div>

                              <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5", marginBottom: "18px" }}>
                                {serv.description}
                              </p>

                              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px", marginBottom: "20px" }}>
                                <strong style={{ fontSize: "12px", color: "#0f172a", display: "block", marginBottom: "10px", textTransform: "uppercase" }}>
                                  Key Engineering Deliverables:
                                </strong>
                                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#334155", lineHeight: "1.6" }}>
                                  {serv.deliverables.map((deliv, idx) => (
                                    <li key={idx} style={{ marginBottom: "6px" }}>
                                      {deliv}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {(() => {
                              const relatedCaseStudy = ecosystemRelations.find((e) => e.serviceSlug === serv.slug);
                              return (
                                <>
                                  {relatedCaseStudy && (
                                    <div style={{ marginBottom: "12px", paddingTop: "8px", borderTop: "1px dashed #e2e8f0" }}>
                                      <Link
                                        href={`/projects/${relatedCaseStudy.projectSlug}`}
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: 700,
                                          color: "#2563eb",
                                          textDecoration: "none",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "4px",
                                        }}
                                      >
                                        🏆 Proven in: {relatedCaseStudy.projectTitle} &rsaquo;
                                      </Link>
                                    </div>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => handleSelectPackageForBooking(serv)}
                                    style={{
                                      width: "100%",
                                      padding: "12px 16px",
                                      backgroundColor: serv.isPopular ? "#2563eb" : "#0f1d38",
                                      color: "#ffffff",
                                      border: "none",
                                      borderRadius: "6px",
                                      fontWeight: "700",
                                      fontSize: "13px",
                                      cursor: "pointer",
                                      textAlign: "center",
                                      transition: "all 0.15s ease",
                                    }}
                                  >
                                    Select This Scope &amp; Book &rsaquo;
                                  </button>
                                </>
                              );
                            })()}
                          </div>
                        ))}
                      </div>

                      {/* Interactive Cloud Infrastructure ROI Calculator */}
                      <CloudRoiCalculator />

                      {/* SECTION 2: INTERACTIVE SCOPE & COST ESTIMATOR */}
                      <div
                        style={{
                          backgroundColor: "#0b132b",
                          border: "1px solid #1e293b",
                          color: "#ffffff",
                          borderRadius: "8px",
                          padding: "28px",
                          marginBottom: "40px",
                          boxShadow: "0 4px 20px rgba(11,25,44,0.3)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                          <div>
                            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#38bdf8", fontWeight: "700" }}>
                              Interactive Configuration
                            </span>
                            <h3 style={{ fontSize: "22px", margin: "4px 0 0 0", color: "#ffffff", fontWeight: "800" }}>
                              Engineering Scope &amp; Investment Estimator
                            </h3>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Estimated Investment</div>
                            <div style={{ fontSize: "32px", fontWeight: "800", color: "#10b981" }}>
                              ${totalEstimate.toLocaleString()}
                              {currentService.pricingType === "retainer" && <span style={{ fontSize: "14px", color: "#cbd5e1" }}> / mo</span>}
                            </div>
                          </div>
                        </div>

                        <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.5", marginBottom: "20px" }}>
                          Customize your engineering engagement by pairing a base production package with specialized architectural add-ons (such as zero-downtime data migration or security hardening).
                        </p>

                        <div style={{ marginBottom: "20px" }}>
                          <label style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0", display: "block", marginBottom: "6px" }}>
                            1. Select Primary Architecture Package:
                          </label>
                          <select
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              backgroundColor: "#070f1e",
                              border: "1px solid #1e293b",
                              color: "#ffffff",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                          >
                            {services.map((serv) => (
                              <option key={serv.id} value={serv.id}>
                                {serv.title} — {serv.priceDisplay} ({serv.timeline})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0", display: "block", marginBottom: "8px" }}>
                            2. Specialized Technical Add-Ons (Optional):
                          </label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
                            {addonsList.map((addon) => {
                              const checked = selectedAddons.includes(addon.id);
                              return (
                                <div
                                  key={addon.id}
                                  onClick={() => toggleAddon(addon.id)}
                                  style={{
                                    padding: "12px",
                                    backgroundColor: checked ? "#16284a" : "#070f1e",
                                    border: checked ? "1px solid #2563eb" : "1px solid #1e293b",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "10px",
                                    transition: "all 0.15s ease",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {}}
                                    style={{ marginTop: "3px", cursor: "pointer" }}
                                  />
                                  <div>
                                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>
                                      {addon.title} (+${addon.price.toLocaleString()})
                                    </div>
                                    <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>
                                      {addon.desc}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                          <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
                            Selected Scope: <strong>{currentService.title}</strong>
                            {selectedAddons.length > 0 && ` + ${selectedAddons.length} specialized add-on(s)`}
                          </div>
                          <button
                            type="button"
                            className="mobile-full-width-btn"
                            onClick={() => handleSelectPackageForBooking(currentService)}
                            style={{
                              padding: "12px 24px",
                              backgroundColor: "#2563eb",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "4px",
                              fontWeight: "700",
                              fontSize: "13px",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            Lock In This Estimate &amp; Inquire Below &rsaquo;
                          </button>
                        </div>
                      </div>

                      {/* SECTION 2.5: STATEMENT OF WORK (SOW) BUILDER & EXPORTER */}
                      <div style={{ marginBottom: "40px" }}>
                        <StatementOfWorkGenerator />
                      </div>

                      {/* SECTION 3: COMPREHENSIVE SCOPE COMPARISON MATRIX */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          Engineering Deliverables Comparison Matrix
                        </h2>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "18px" }}>
                        A detailed breakdown of technical deliverables, guarantees, and collaboration channels across service tiers:
                      </p>

                      <div className="table-responsive-container" style={{ overflowX: "auto", marginBottom: "40px" }}>
                        <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", fontSize: "12px", border: "1px solid #cbd5e1" }}>
                          <thead>
                            <tr style={{ backgroundColor: "#0b132b", color: "#ffffff" }}>
                              <th style={{ padding: "12px 14px", textAlign: "left", width: "28%" }}>Scope &amp; Engineering Feature</th>
                              <th style={{ padding: "12px 10px", textAlign: "center" }}>Diagnostic Audit</th>
                              <th style={{ padding: "12px 10px", textAlign: "center" }}>Postgres Tuning</th>
                              <th style={{ padding: "12px 10px", textAlign: "center" }}>Edge Migration</th>
                              <th style={{ padding: "12px 10px", textAlign: "center", backgroundColor: "#064e3b" }}>Full MVP Sprint</th>
                              <th style={{ padding: "12px 10px", textAlign: "center" }}>Fractional Staff</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { feature: "System Architecture RFC & Diagram", audit: "✓", pg: "✓", edge: "✓", mvp: "✓", frac: "✓" },
                              { feature: "Full Source Code Handover (100% IP)", audit: "N/A (Report)", pg: "✓", edge: "✓", mvp: "✓", frac: "✓" },
                              { feature: "Automated CI/CD Deployment Pipeline", audit: "Recommendations", pg: "Guardrails", edge: "✓ Cloudflare", mvp: "✓ Cloudflare", frac: "✓ Ongoing" },
                              { feature: "PostgreSQL Indexing & RLS Policies", audit: "Audit Only", pg: "✓ Comprehensive", edge: "Connection Pool", mvp: "✓ Full Schema", frac: "✓ Architectural" },
                              { feature: "Automated k6 Load Testing Benchmarks", audit: "Synthetic", pg: "✓ Simulated", edge: "✓ Global TTFB", mvp: "✓ Core Vitals", frac: "✓ Continuous" },
                              { feature: "30-Day Production Bug Warranty", audit: "Walkthrough Call", pg: "14-Day Monitor", edge: "30 Days", mvp: "30 Days", frac: "Active Retainer" },
                              { feature: "Direct Private Slack/Discord Access", audit: "Email + Call", pg: "Sprint Duration", edge: "Sprint Duration", mvp: "Sprint Duration", frac: "Guaranteed 2-Hour" },
                              { feature: "Candidate Technical Interviewing", audit: "—", pg: "—", edge: "—", mvp: "—", frac: "✓ Included" },
                            ].map((row, i) => (
                              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                <td style={{ padding: "10px 14px", fontWeight: "700", color: "#0f172a" }}>{row.feature}</td>
                                <td style={{ padding: "10px", textAlign: "center", color: "#334155" }}>{row.audit}</td>
                                <td style={{ padding: "10px", textAlign: "center", color: "#334155" }}>{row.pg}</td>
                                <td style={{ padding: "10px", textAlign: "center", color: "#334155" }}>{row.edge}</td>
                                <td style={{ padding: "10px", textAlign: "center", fontWeight: "700", color: "#047857", backgroundColor: i % 2 === 0 ? "#ecfdf5" : "#f0fdf4" }}>{row.mvp}</td>
                                <td style={{ padding: "10px", textAlign: "center", color: "#334155" }}>{row.frac}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* SECTION 4: HOURLY RATE CARD */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          Ad-Hoc Consulting &amp; Incident Rate Card
                        </h2>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "18px" }}>
                        For advisory sessions, ad-hoc architectural code pairing, and emergency database incident remediation:
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                        <div style={{ padding: "20px", border: "1px solid #cbd5e1", borderRadius: "6px", backgroundColor: "#ffffff" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Standard Consulting</span>
                          <h4 style={{ fontSize: "18px", color: "#0f172a", margin: "6px 0", fontWeight: "700" }}>Senior Architecture Advisory</h4>
                          <div style={{ fontSize: "24px", fontWeight: "800", color: "#2563eb", margin: "8px 0" }}>$140 <span style={{ fontSize: "14px", fontWeight: "normal", color: "#475569" }}>/ hour</span></div>
                          <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5", margin: 0 }}>
                            1:1 pair programming, architectural design reviews, query plan troubleshooting, and technical strategy calls. Booked in 5-hour or 10-hour blocks.
                          </p>
                        </div>

                        <div style={{ padding: "20px", border: "1px solid #b91c1c", borderRadius: "6px", backgroundColor: "#fef2f2" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#b91c1c", textTransform: "uppercase" }}>Critical Priority</span>
                          <h4 style={{ fontSize: "18px", color: "#991b1b", margin: "6px 0", fontWeight: "700" }}>P0 Production Incident Triage</h4>
                          <div style={{ fontSize: "24px", fontWeight: "800", color: "#991b1b", margin: "8px 0" }}>$220 <span style={{ fontSize: "14px", fontWeight: "normal", color: "#7f1d1d" }}>/ hour</span></div>
                          <p style={{ fontSize: "12px", color: "#7f1d1d", lineHeight: "1.5", margin: 0 }}>
                            Immediate response within 2 hours for active database lockups, data corruption emergencies, or critical cloud infrastructure failure.
                          </p>
                        </div>
                      </div>

                      {/* SECTION 5: ENGAGEMENT PROTOCOL */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          The 5-Stage Engineering Engagement Protocol
                        </h2>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "20px" }}>
                        How we take your product from initial requirements to verified production delivery:
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
                        {[
                          { step: "01", title: "Technical Discovery Call (30 Minutes, Free)", desc: "We evaluate your system architecture, project requirements, existing codebase, and target delivery deadline to verify technical alignment." },
                          { step: "02", title: "Statement of Work (SOW) & Architecture Proposal", desc: "You receive an explicit engineering SOW detailing exact deliverables, milestone delivery dates, technical topology, and a fixed price." },
                          { step: "03", title: "High-Velocity CI/CD Sprint Execution", desc: "Work begins in your private repository. Staging preview branches are continuously deployed to Cloudflare Pages for asynchronous progress reviews." },
                          { step: "04", title: "Automated Benchmarking & Load Testing", desc: "Prior to sign-off, automated unit test suites, Core Web Vitals checks, and k6 load tests are executed to prove production readiness." },
                          { step: "05", title: "Production Cutover & 30-Day Bug Warranty", desc: "Full ownership handover of all git branches, DNS configuration, and documentation, backed by an unconditional 30-day bug warranty." },
                        ].map((item) => (
                          <div key={item.step} style={{ display: "flex", gap: "16px", padding: "16px 20px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                            <div style={{ fontSize: "20px", fontWeight: "800", color: "#2563eb", minWidth: "36px" }}>
                              {item.step}
                            </div>
                            <div>
                              <strong style={{ fontSize: "14px", color: "#0f172a", display: "block", marginBottom: "4px" }}>
                                {item.title}
                              </strong>
                              <p style={{ fontSize: "13px", color: "#475569", margin: 0, lineHeight: "1.5" }}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* SECTION 5.5: VERIFIED CLIENT REVIEWS & ROI PROOF */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "4px" }}>
                          Verified Client Outcomes
                        </span>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          Proven Engineering Impact Across Scale-Ups &amp; Enterprise Platforms
                        </h2>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "20px" }}>
                        Direct feedback from engineering leaders whose platforms were accelerated, audited, or re-architected:
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                        {initialTestimonials.map((t, idx) => (
                          <div
                            key={t.id || idx}
                            style={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              padding: "20px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <div style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "2px" }}>★★★★★</div>
                                {t.deliverableTag && (
                                  <span style={{ fontSize: "11px", color: "#1e40af", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "2px 6px", borderRadius: "3px", fontWeight: "700" }}>
                                    {t.deliverableTag}
                                  </span>
                                )}
                              </div>
                              {t.engagementScope && (
                                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "10px", flexWrap: "wrap" }}>
                                  <span style={{ fontSize: "10.5px", fontWeight: "600", backgroundColor: "#f1f5f9", color: "#334155", padding: "2px 6px", borderRadius: "3px" }}>
                                    💰 {t.engagementScope}
                                  </span>
                                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#065f46", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", padding: "2px 6px", borderRadius: "3px" }}>
                                    ✓ Verified SOW Delivery
                                  </span>
                                </div>
                              )}
                              <p style={{ fontSize: "13px", color: "#1e293b", lineHeight: "1.6", fontStyle: "italic", margin: "0 0 14px 0" }}>
                                &ldquo;{t.quote}&rdquo;
                              </p>
                            </div>
                            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                              {t.verifiedMetric && (
                                <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", fontSize: "11.5px", fontWeight: "700", padding: "4px 8px", borderRadius: "4px", marginBottom: "8px" }}>
                                  {t.verifiedMetric}
                                </div>
                              )}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                <div>
                                  <strong style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>{t.author}</strong>
                                  <span style={{ fontSize: "11.5px", color: "#64748b" }}>{t.role} • <strong>{t.company}</strong></span>
                                </div>
                                {t.projectSlug && (
                                  <Link href={`/projects/${t.projectSlug}`} style={{ fontSize: "11.5px", color: "#2563eb", fontWeight: "700", textDecoration: "none" }}>
                                    Case Study &rsaquo;
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "8px", margin: "36px 0 20px 0" }}>
                        <h2 style={{ fontSize: "20px", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                          Engineering Engagement &amp; Contract FAQ
                        </h2>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
                        {faqs.map((faq, idx) => {
                          const isOpen = activeFaq === idx;
                          return (
                            <div
                              key={idx}
                              style={{
                                border: "1px solid #cbd5e1",
                                borderRadius: "4px",
                                backgroundColor: "#ffffff",
                                overflow: "hidden",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setActiveFaq(isOpen ? null : idx)}
                                style={{
                                  width: "100%",
                                  padding: "14px 18px",
                                  backgroundColor: isOpen ? "#f8fafc" : "#ffffff",
                                  border: "none",
                                  textAlign: "left",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  color: "#0f172a",
                                }}
                              >
                                <span>{faq.q}</span>
                                <span style={{ fontSize: "16px", color: "#2563eb", marginLeft: "12px", fontWeight: "bold" }}>
                                  {isOpen ? "−" : "+"}
                                </span>
                              </button>
                              {isOpen && (
                                <div style={{ padding: "14px 18px", borderTop: "1px solid #e2e8f0", fontSize: "13px", color: "#334155", lineHeight: "1.6", backgroundColor: "#ffffff" }}>
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* SECTION 7: INQUIRY & BOOKING FORM */}
                      <div id="inquiry" style={{ margin: "40px 0 20px 0" }}>
                        <div id="stripe-01">
                          <div id="contactform">
                            <h3 style={{ fontSize: "22px", color: "#0f172a", margin: "0 0 8px 0", fontWeight: "800" }}>
                              Book an Engineering Scope or Discovery Call
                            </h3>
                            <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#475569" }}>
                              Choose your preferred engagement pathway below. Schedule an instant discovery call or submit technical specifications for a formal SOW response within 24 hours.
                            </p>

                            {/* Dual Booking Pathway */}
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "16px",
                                marginBottom: "24px",
                              }}
                            >
                              <div
                                style={{
                                  background: "#0b132b",
                                  border: "1px solid #1e293b",
                                  borderLeft: "4px solid #10b981",
                                  borderRadius: "8px",
                                  padding: "20px",
                                  color: "#ffffff",
                                  boxShadow: "0 2px 8px rgba(11,25,44,0.3)",
                                }}
                              >
                                <span style={{ fontSize: "11px", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                  ⚡ FASTEST OPTION (15 MINUTES)
                                </span>
                                <h4 style={{ margin: "6px 0 8px 0", fontSize: "16px", color: "#ffffff" }}>
                                  1-on-1 Architecture Discovery Call
                                </h4>
                                <p style={{ fontSize: "12.5px", color: "#cbd5e1", lineHeight: 1.5, margin: "0 0 16px 0" }}>
                                  Direct Google Meet / Zoom review with Abu Hanif to evaluate your technical bottlenecks, target delivery timeline, and architecture feasibility.
                                </p>
                                <a
                                  href="mailto:abuhanifmain@gmail.com?subject=Discovery%20Call%20or%20Project%20Inquiry"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    width: "100%",
                                    padding: "10px",
                                    background: "#10b981",
                                    color: "#050e1d",
                                    borderRadius: "6px",
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    boxShadow: "0 2px 6px rgba(16,185,129,0.3)",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  ✉️ Request Call via Email ↗
                                </a>
                              </div>

                              <div
                                style={{
                                  background: "#ffffff",
                                  border: "1px solid #e2e8f0",
                                  borderLeft: "4px solid #2563eb",
                                  borderRadius: "8px",
                                  padding: "20px",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                                }}
                              >
                                <span style={{ fontSize: "11px", fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                  📋 WRITTEN SCOPE SUBMISSION
                                </span>
                                <h4 style={{ margin: "6px 0 8px 0", fontSize: "16px", color: "#0f172a" }}>
                                  Submit Technical Requirements Form
                                </h4>
                                <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.5, margin: "0 0 16px 0" }}>
                                  Submit your project details below. Abu Hanif will review requirements, verify sprint capacity, and reply with a formal Statement of Work within 24 hours.
                                </p>
                                <a
                                  href="#scope-form"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    width: "100%",
                                    padding: "10px",
                                    background: "#f1f5f9",
                                    color: "#0f172a",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "6px",
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  ↓ Fill Out Requirements Below
                                </a>
                              </div>
                            </div>

                            <div id="scope-form" />

                            {submittedMessage && (
                              <div
                                style={{
                                  padding: "16px",
                                  backgroundColor: "#064e3b",
                                  color: "#a7f3d0",
                                  border: "1px solid #059669",
                                  borderRadius: "4px",
                                  marginBottom: "20px",
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                }}
                              >
                                {submittedMessage}
                              </div>
                            )}

                            {errorMessage && (
                              <div
                                style={{
                                  padding: "16px",
                                  backgroundColor: "#7f1d1d",
                                  color: "#fecaca",
                                  border: "1px solid #dc2626",
                                  borderRadius: "4px",
                                  marginBottom: "20px",
                                  fontSize: "14px",
                                }}
                              >
                                {errorMessage}
                              </div>
                            )}

                            <form onSubmit={handleInquirySubmit}>
                              <div className="form-group" style={{ marginBottom: "14px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                  Your Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formState.name}
                                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                  placeholder="Your full name or company contact"
                                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px" }}
                                />
                              </div>

                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                <div className="form-group">
                                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                    Work Email *
                                  </label>
                                  <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    placeholder="name@company.co.uk"
                                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px" }}
                                  />
                                </div>
                                <div className="form-group">
                                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                    Phone / WhatsApp (Optional)
                                  </label>
                                  <input
                                    type="tel"
                                    value={formState.phone}
                                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                    placeholder="+44 7700 900077 or +880 1XXX-XXXXXX"
                                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px" }}
                                  />
                                </div>
                              </div>

                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                <div className="form-group">
                                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                    Selected Engineering Scope *
                                  </label>
                                  <select
                                    value={formState.projectType}
                                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", backgroundColor: "#ffffff" }}
                                  >
                                    {services.map((s) => (
                                      <option key={s.id} value={s.title}>
                                        {s.title} ({s.priceDisplay})
                                      </option>
                                    ))}
                                    <option value="Custom Engineering Architecture">Custom Engineering Architecture</option>
                                    <option value="Hourly Architecture Advisory ($140/hr)">Hourly Architecture Advisory ($140/hr)</option>
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                    Estimated Project Budget *
                                  </label>
                                  <select
                                    value={formState.budgetRange}
                                    onChange={(e) => setFormState({ ...formState, budgetRange: e.target.value })}
                                    style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px", backgroundColor: "#ffffff" }}
                                  >
                                    <option value="$2,500 – $5,000 (Diagnostic / Audit)">$2,500 – $5,000 (Diagnostic / Audit)</option>
                                    <option value="$5,000 – $10,000 (Database / Edge Sprint)">$5,000 – $10,000 (Database / Edge Sprint)</option>
                                    <option value="$10,000 – $25,000 (Full-Stack Platform / MVP)">$10,000 – $25,000 (Full-Stack Platform / MVP)</option>
                                    <option value="$25,000+ (Enterprise Architecture / Distributed Pipeline)">$25,000+ (Enterprise Architecture)</option>
                                    <option value="$5,500 / month (Fractional Retainer)">$5,500 / month (Fractional Retainer)</option>
                                  </select>
                                </div>
                              </div>

                              <div className="form-group" style={{ marginBottom: "18px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                                  Role, Project Scope Details &amp; Objectives *
                                </label>
                                <textarea
                                  required
                                  rows={4}
                                  value={formState.message}
                                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                  placeholder="Share details about your role (Remote, B2B, or On-Site), project requirements, or target timeline..."
                                  style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px" }}
                                />
                              </div>

                              <div style={{ marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                <input
                                  id="pricing_gdpr_consent"
                                  type="checkbox"
                                  required
                                  checked={formState.disclaimer}
                                  onChange={(e) => setFormState({ ...formState, disclaimer: e.target.checked })}
                                  style={{ marginTop: "3px", width: "16px", height: "16px", cursor: "pointer" }}
                                />
                                <label htmlFor="pricing_gdpr_consent" style={{ fontSize: "12.5px", color: "#334155", lineHeight: 1.5, cursor: "pointer" }}>
                                  I agree to the{" "}
                                  <Link href="/privacy" style={{ color: "#2563eb", textDecoration: "underline", fontWeight: 600 }}>
                                    Privacy &amp; GDPR Policy
                                  </Link>{" "}
                                  and consent to MD Abu Hanif Mia contacting me regarding this inquiry. (Required)
                                </label>
                              </div>

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                  padding: "12px 28px",
                                  backgroundColor: "#2563eb",
                                  color: "#ffffff",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontWeight: "700",
                                  fontSize: "14px",
                                  cursor: isSubmitting ? "not-allowed" : "pointer",
                                  opacity: isSubmitting ? 0.7 : 1,
                                  boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                {isSubmitting ? "Submitting..." : "Submit Inquiry & Request Response ›"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Sidebar */}
                <div className="sidebar secondary-sidebar">
                  <div className="wrapper">
                    {/* Profile Snapshot */}
                    <div className="block" style={{ backgroundColor: "#ffffff", padding: "18px", border: "1px solid #e2e8f0", borderRadius: "6px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                      <img
                        src="/images/profile.png"
                        alt="MD Abu Hanif Mia"
                        width={260}
                        height={260}
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          marginBottom: "12px",
                          border: "1px solid #cbd5e1",
                          display: "block",
                        }}
                      />
                      <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "#0f172a" }}>
                        MD Abu Hanif Mia
                      </h3>
                      <div style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700", marginBottom: "8px" }}>
                        Full-Stack Web Developer &amp; Int&apos;l Ops
                      </div>
                      <div style={{ fontSize: "11px", color: "#047857", fontWeight: "700", marginBottom: "12px" }}>
                        ● Open to UK &amp; Europe (Remote • B2B • On-Site)
                      </div>
                      <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5", margin: 0 }}>
                        Creator of NexusCalculator.net (Next.js, TypeScript, i18n) with 7+ years of operations &amp; client service background in Oman and Bangladesh.
                      </p>
                    </div>

                    {/* Commitments */}
                    <div className="block" style={{ backgroundColor: "#0b132b", border: "1px solid #1e293b", color: "#ffffff", padding: "20px 18px", borderRadius: "6px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(11,25,44,0.3)" }}>
                      <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Working Commitments
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", lineHeight: "1.6", color: "#e2e8f0" }}>
                        <li style={{ marginBottom: "6px" }}><strong>100% Client IP:</strong> Clean code handover upon milestone settlement.</li>
                        <li style={{ marginBottom: "6px" }}><strong>UK / EU Hours:</strong> Flexible alignment with GMT/BST &amp; CET.</li>
                        <li style={{ marginBottom: "6px" }}><strong>30-Day Warranty:</strong> Complimentary bug fixes post-launch.</li>
                        <li style={{ marginBottom: "6px" }}><strong>Direct Contact:</strong> Always speak directly with Abu Hanif.</li>
                        <li><strong>Clear Scope:</strong> Agreed milestones before work starts.</li>
                      </ul>
                    </div>

                    {/* Verifiable Flagship Product Box */}
                    <div className="block" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px", borderRadius: "6px", marginBottom: "20px" }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "#047857", textTransform: "uppercase", marginBottom: "6px" }}>
                        Live Production Proof
                      </div>
                      <p style={{ margin: 0, fontSize: "12px", color: "#1e3a5f", lineHeight: "1.5" }}>
                        Inspect <strong>NexusCalculator.net</strong> live: 312 tools, 190+ guides, and 3,200+ static pages built with Next.js &amp; TypeScript.
                      </p>
                      <div style={{ fontSize: "11px", color: "#475569", marginTop: "8px", fontWeight: "600" }}>
                        — <Link href="/projects/nexus-calculator-platform" style={{ color: "#2563eb", textDecoration: "underline" }}>Read Architecture Notes &rsaquo;</Link>
                      </div>
                    </div>

                    {/* Direct Contact Block */}
                    <div className="block" style={{ border: "1px solid #cbd5e1", padding: "16px", borderRadius: "6px", backgroundColor: "#ffffff", marginBottom: "20px" }}>
                      <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#0f172a" }}>
                        Direct Contact Info
                      </h4>
                      <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>
                        <div><strong>Email:</strong> <a href="mailto:abuhanifmain@gmail.com" style={{ color: "#2563eb" }}>abuhanifmain@gmail.com</a></div>
                        <div><strong>Phone:</strong> <a href="tel:+8801724010261" style={{ color: "#2563eb" }}>+880 1724-010261</a></div>
                        <div><strong>Address:</strong> Sadar Upazila, Kishoreganj, Dhaka, Bangladesh</div>
                        <div><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/md-abu-hanif-mia" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>md-abu-hanif-mia</a></div>
                        <div><strong>GitHub:</strong> <a href="https://github.com/abuhanif254" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>abuhanif254</a></div>
                        <div><strong>X (Twitter):</strong> <a href="https://x.com/MohammadBitull1" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>@MohammadBitull1</a></div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="block" style={{ border: "1px solid #e2e8f0", padding: "14px", borderRadius: "6px", backgroundColor: "#ffffff" }}>
                      <strong style={{ display: "block", fontSize: "12px", color: "#0f172a", marginBottom: "8px" }}>Portfolio Links:</strong>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                        <Link href="/projects" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                          &rsaquo; Work Showcase &amp; Projects
                        </Link>
                        <Link href="/blog" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                          &rsaquo; Technical Architecture Blog
                        </Link>
                        <Link href="/admin" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                          &rsaquo; Admin Management Portal
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clr"></div>
              </div>
            </div>

            {/* Global Footer */}
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
