"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { ProfileData, initialProfile } from "../data/portfolio-data";

export default function ResumeClientView({ profile = initialProfile }: { profile?: ProfileData }) {
  const [copied, setCopied] = useState(false);

  const phoneClean = profile.phone.replace(/[^+\d]/g, "");

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function handleCopyText() {
    const plainText = `
${profile.fullName.toUpperCase()} (ABU HANIF)
${profile.kicker}
${profile.location} | Open to Remote, B2B Contract & On-Site / Relocation (UK, Europe & Worldwide)
Email: ${profile.email} | Phone: ${profile.phone} | Portfolio: https://abuhanifmia.com
LinkedIn: ${profile.socialLinks.linkedin} | GitHub: ${profile.socialLinks.github} | X: ${profile.socialLinks.twitter}

PROFILE SUMMARY
${profile.bio}

WORK PREFERENCES & SPOKEN LANGUAGES
- Target Roles: ${profile.workPreferences.targetRoles}
- Work Modes: ${profile.workPreferences.modes.join(", ")}
- Target Regions: ${profile.workPreferences.regions.join(", ")}
- Timezone Alignment: ${profile.workPreferences.timezoneOverlap}
- Spoken Languages: ${profile.spokenLanguages.map((l) => `${l.language} (${l.level})`).join(", ")}

TECHNICAL SKILLS & SELF-DIRECTED LEARNING
- Web & Full-Stack: Next.js 16 (App Router), React 19, TypeScript, JavaScript, Node.js, Tailwind CSS, HTML5, CSS3
- Databases & Cloud: PostgreSQL, Supabase, Cloudflare Pages, Vercel, REST APIs, Git / GitHub CI
- Self-Learned Programming (freeCodeCamp): TypeScript, Python, Rust, C++

LIVE WEB PROJECTS
1. NexusCalculator.net (Live Product) - 312 interactive calculators & developer tools, 190+ guides, 3,200+ static pages across English, Spanish, French, and German using Next.js, TypeScript, and next-intl.
2. Abu Hanif Portfolio & Client Portal (abuhanifmia.com) - Full-stack Next.js 16 + Supabase portfolio, CRM, SOW builder, and HMAC-protected Admin dashboard.

WORK EXPERIENCE
${profile.workHistory
  .map(
    (w) => `${w.role} | ${w.company} (${w.location})
${w.period}
- ${w.summary}`
  )
  .join("\n\n")}

EDUCATION & TRAINING
${profile.educationHistory
  .map(
    (edu) => `- ${edu.credential} — ${edu.institution} (${edu.period})
  ${edu.details}`
  )
  .join("\n")}
    `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  }

  return (
    <div id="portfolio-page-root" data-route="/resume">
      <div id="portfolio-shell-body" className="portfolio-shell-body js abuhanif-portfolio-shell">
        <SiteHeader activePath="/resume" profilePhotoUrl={profile.visualAssets.profilePhotoUrl} />

        <div className="index" id="container">
          <div className="cwrap">
            {/* Header / Banner Strip */}
            <div id="main">
              <div className="mwrap">
                <div className="imgwrap">
                  <div id="img1">
                    <div className="banner-text-wrapper">
                      <div>
                        <h1 className="subpage-banner-title" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                          Curriculum Vitae &amp; Verifiable Background
                        </h1>
                        <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "normal", color: "#e2e8f0" }}>
                          {profile.fullName} &bull; {profile.kicker} &bull; Open to UK &amp; Europe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tcfrags"></div>

                <div id="content">
                  <div id="breadcrumbs">
                    <div className="wrapper">
                      <Link href="/" style={{ color: "#2563eb" }}>Home</Link> &gt; <span>Resume / CV</span>
                    </div>
                  </div>

                  <div className="bodytext" style={{ maxWidth: "900px", margin: "0 auto", padding: "12px 0 40px 0" }}>
                    {/* Control Toolbar (Hidden on Print) */}
                    <div
                      className="no-print"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        backgroundColor: "#0b132b",
                        color: "#ffffff",
                        padding: "16px 20px",
                        borderRadius: "8px",
                        marginBottom: "28px",
                        boxShadow: "0 4px 12px rgba(11, 19, 43, 0.25)",
                      }}
                    >
                      <div>
                        <strong style={{ display: "block", fontSize: "15px", color: "#ffffff" }}>
                          UK &amp; Europe ATS-Friendly CV
                        </strong>
                        <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>
                          Verified work history, HSC Commerce education, languages &amp; live web projects.
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          onClick={handlePrint}
                          type="button"
                          style={{
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 14px",
                            fontWeight: "700",
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease",
                          }}
                        >
                          🖨️ Print / Save PDF
                        </button>
                        <button
                          onClick={handleCopyText}
                          type="button"
                          style={{
                            backgroundColor: copied ? "#065f46" : "#111e38",
                            color: copied ? "#ffffff" : "#e2e8f0",
                            border: "1px solid #1e293b",
                            borderRadius: "6px",
                            padding: "8px 14px",
                            fontWeight: "700",
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {copied ? "✓ Copied Plain Text!" : "📋 Copy ATS Text"}
                        </button>
                      </div>
                    </div>

                    {/* Resume Printable Paper Container */}
                    <div
                      className="resume-paper"
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        padding: "36px 40px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 16px -2px rgba(11, 19, 43, 0.08)",
                        color: "#1e293b",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        lineHeight: "1.6",
                      }}
                    >
                      {/* Paper Header */}
                      <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "18px", marginBottom: "24px" }}>
                        <h1 style={{ margin: "0 0 4px 0", fontSize: "30px", color: "#0f172a", fontWeight: "bold" }}>
                          {profile.fullName}
                        </h1>
                        <div style={{ fontSize: "17px", fontWeight: "bold", color: "#2563eb", marginBottom: "10px" }}>
                          {profile.kicker}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "13px", color: "#475569" }}>
                          <span>📍 <strong>Location:</strong> {profile.location}</span>
                          <span>📞 <strong>Phone:</strong> <a href={`tel:${phoneClean}`} style={{ color: "#2563eb", fontWeight: "bold" }}>{profile.phone}</a></span>
                          <span>✉️ <strong>Email:</strong> <a href={`mailto:${profile.email}`} style={{ color: "#2563eb", fontWeight: "bold" }}>{profile.email}</a></span>
                          <span>🌐 <strong>Portfolio:</strong> <a href="https://abuhanifmia.com" style={{ color: "#2563eb" }}>https://abuhanifmia.com</a></span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12.5px", color: "#2563eb", marginTop: "8px" }}>
                          <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                            GitHub ↗
                          </a>
                          <span>•</span>
                          <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                            LinkedIn ↗
                          </a>
                          <span>•</span>
                          <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                            X (Twitter) ↗
                          </a>
                          {profile.socialLinks.facebook && (
                            <>
                              <span>•</span>
                              <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                                Facebook ↗
                              </a>
                            </>
                          )}
                          {profile.socialLinks.instagram && (
                            <>
                              <span>•</span>
                              <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                                Instagram ↗
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Profile Summary & Availability */}
                      <div style={{ marginBottom: "26px" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a", borderBottom: "2px solid #f1f5f9", paddingBottom: "6px", margin: "0 0 10px 0" }}>
                          Profile Summary &amp; Availability
                        </h2>
                        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#334155" }}>
                          {profile.bio}
                        </p>
                        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "10px 14px", fontSize: "13px", color: "#1e3a8a" }}>
                          <strong>Work Availability:</strong> {profile.workPreferences.modes.join(" • ")} across <strong>{profile.workPreferences.regions.join(" / ")}</strong> &bull; {profile.workPreferences.timezoneOverlap}
                        </div>
                      </div>

                      {/* Spoken Languages & Technical Skills Matrix */}
                      <div style={{ marginBottom: "26px" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a", borderBottom: "2px solid #f1f5f9", paddingBottom: "6px", margin: "0 0 10px 0" }}>
                          Languages &amp; Core Skills
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                          <div style={{ background: "#f8fafc", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                            <strong style={{ color: "#0f172a", display: "block", marginBottom: "4px" }}>Spoken Languages</strong>
                            {profile.spokenLanguages.map((lang) => (
                              <div key={lang.language}>
                                <strong>{lang.language}:</strong> {lang.level}
                              </div>
                            ))}
                          </div>
                          <div style={{ background: "#f8fafc", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                            <strong style={{ color: "#0f172a", display: "block", marginBottom: "4px" }}>Web &amp; Full-Stack Tools</strong>
                            Next.js 16 (App Router), React 19, TypeScript, JavaScript, Node.js, Tailwind CSS, HTML5, CSS3
                          </div>
                          <div style={{ background: "#f8fafc", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                            <strong style={{ color: "#0f172a", display: "block", marginBottom: "4px" }}>Self-Learned via freeCodeCamp</strong>
                            TypeScript, Python, Rust, C++ — practical problem solving and software foundations
                          </div>
                          <div style={{ background: "#f8fafc", padding: "12px 14px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                            <strong style={{ color: "#0f172a", display: "block", marginBottom: "4px" }}>Databases &amp; Cloud Workflow</strong>
                            PostgreSQL, Supabase (RLS &amp; Auth), Cloudflare Pages, Vercel, Git / GitHub Actions
                          </div>
                        </div>
                      </div>

                      {/* Real Work Experience */}
                      <div style={{ marginBottom: "26px" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a", borderBottom: "2px solid #f1f5f9", paddingBottom: "6px", margin: "0 0 16px 0" }}>
                          Work Experience (2017 – 2025)
                        </h2>

                        {profile.workHistory.map((job, idx) => (
                          <div key={idx} style={{ marginBottom: "18px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                              <strong style={{ fontSize: "15.5px", color: "#0f172a" }}>
                                {job.role}
                              </strong>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#334155" }}>
                                {job.period}
                              </span>
                            </div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", marginBottom: "6px" }}>
                              {job.company} &bull; {job.location}
                            </div>
                            <p style={{ margin: 0, fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>
                              {job.summary}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Live Deployed Projects */}
                      <div style={{ marginBottom: "26px" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a", borderBottom: "2px solid #f1f5f9", paddingBottom: "6px", margin: "0 0 12px 0" }}>
                          Real-World Web Projects
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                          <div style={{ borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
                            <strong style={{ color: "#0f172a" }}>NexusCalculator.net (Live Production)</strong>
                            <p style={{ margin: "2px 0 0 0", color: "#475569" }}>
                              Next.js 15, TypeScript, next-intl • <strong>312 interactive tools • 4 languages (EN/ES/FR/DE) • 3,200+ static pages</strong>
                            </p>
                          </div>
                          <div style={{ borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>
                            <strong style={{ color: "#0f172a" }}>Portfolio, CRM &amp; Order Portal (This App)</strong>
                            <p style={{ margin: "2px 0 0 0", color: "#475569" }}>
                              Next.js 16, Supabase PostgreSQL, TypeScript • <strong>Admin CMS, SOW generator, GDPR &amp; invoice workflows</strong>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Education & Programming Training */}
                      <div id="education">
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", color: "#0f172a", borderBottom: "2px solid #f1f5f9", paddingBottom: "6px", margin: "0 0 14px 0" }}>
                          Education &amp; Programming Training
                        </h2>

                        {/* Formal College Education */}
                        <div style={{ marginBottom: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0f172a", padding: "14px 16px", borderRadius: "6px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", fontSize: "13.5px" }}>
                            <div>
                              <strong style={{ color: "#0f172a", fontSize: "14.5px" }}>Higher Secondary Certificate (HSC) in Commerce</strong>
                            </div>
                            <div style={{ color: "#334155", fontWeight: "bold" }}>
                              2016 – 2017
                            </div>
                          </div>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", marginTop: "2px" }}>
                            Wali Neowaj Khan College
                          </div>
                          <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "#475569" }}>
                            EIIN: <strong>110495</strong> &bull; Board: <strong>Dhaka Education Board</strong>
                          </p>
                        </div>

                        {/* Programming Hero Course */}
                        <div style={{ marginBottom: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #2563eb", padding: "14px 16px", borderRadius: "6px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                            <div style={{ flex: 1, minWidth: "260px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                <span style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px" }}>2025 COURSE</span>
                                <strong style={{ color: "#0f172a", fontSize: "14px" }}>Programming Hero — Web Development Course</strong>
                              </div>
                              <p style={{ margin: "2px 0 6px 0", fontSize: "13px", color: "#334155" }}>
                                <strong>Batch-12 • ID: WEB12-3991</strong> &bull; Year: <strong>2025</strong>
                              </p>
                              <p style={{ margin: 0, fontSize: "12.5px", color: "#64748b", lineHeight: "1.5" }}>
                                Practical full-stack training in HTML, CSS, modern JavaScript, React, Next.js workflows, Node.js backends, and database-backed web apps.
                              </p>
                            </div>
                            <div className="no-print" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <a
                                href="#certificate-modal"
                                data-certificate-trigger="programming-hero"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  background: "#2563eb",
                                  color: "#ffffff",
                                  padding: "8px 14px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  textDecoration: "none",
                                  transition: "background-color 0.15s ease",
                                }}
                              >
                                📜 View Course Certificate
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* freeCodeCamp Self-Learning */}
                        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #10b981", padding: "12px 14px", borderRadius: "6px", fontSize: "13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <span style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold" }}>SELF-LEARNED</span>
                            <strong style={{ color: "#0f172a" }}>freeCodeCamp — Independent Technical Learning</strong>
                          </div>
                          <p style={{ margin: "2px 0 0 0", color: "#475569", lineHeight: "1.5", fontSize: "12.5px" }}>
                            Self-learned <strong>TypeScript</strong>, <strong>Python</strong>, <strong>Rust</strong>, and <strong>C++</strong> from the freeCodeCamp curriculum and hands-on documentation practice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>

      {/* Print CSS styling for clean printout / PDF save */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11pt !important;
          }
          #top-status-bar,
          #header,
          #breadcrumbs,
          #img1,
          .imgwrap,
          .no-print,
          #footer,
          .cookie-banner,
          .global-site-footer {
            display: none !important;
          }
          #container,
          .cwrap,
          #main,
          .mwrap,
          #content,
          .bodytext {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .resume-paper {
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          a {
            text-decoration: none !important;
            color: #000000 !important;
          }
        }
      `}</style>
    </div>
  );
}
