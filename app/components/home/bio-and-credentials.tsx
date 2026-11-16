"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from "lucide-react";
import { ProfileData } from "../../data/portfolio-data";

export default function BioAndCredentials({ profile }: { profile?: ProfileData }) {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const profilePhoto = profile?.visualAssets?.profilePhotoUrl || "/images/profile.png";
  const certPhoto = profile?.visualAssets?.certificatePhotoUrl || "/images/programming-hero-certificate.png";
  const displayName = profile?.fullName || "MD Abu Hanif Mia";
  const displayKicker = profile?.kicker || "Full-Stack Web Developer & International Operations Professional";

  function handleOpenCertificate(e: React.MouseEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.location.hash = "#certificate-modal";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  return (
    <>
      {/* Desktop Profile Pic Float (Hidden on Mobile) */}
      <div className="profilepic-wrap-desktop" style={{ position: "relative", float: "right", margin: "0 0 20px 24px" }}>
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid #2563eb",
            background: "radial-gradient(circle at 50% 35%, #1e293b 0%, #0b132b 100%)",
            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.14)",
          }}
        >
          <Image
            src={profilePhoto}
            alt={`${displayName} - Full-Stack Web Developer`}
            width={180}
            height={180}
            loading="lazy"
            className="profilepic"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="bio-section-header" style={{ marginBottom: "16px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "4px 10px", borderRadius: "20px", marginBottom: "8px" }}>
          <ShieldCheck size={14} className="text-blue-600" />
          <span style={{ fontSize: "11px", fontWeight: "800", color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Open to UK &amp; Europe • Remote, B2B &amp; On-Site Roles
          </span>
        </div>
        <h1 id="about" className="heading-about-desktop" style={{ margin: "4px 0 2px 0", color: "#0f172a", fontSize: "24px", fontWeight: "800" }}>
          {displayName} (Abu Hanif)
        </h1>
        <strong className="heading4 heading-title-desktop" style={{ color: "#2563eb", margin: "0 0 14px 0", display: "block", fontSize: "14px" }}>
          {displayKicker}
        </strong>
      </div>

      {/* Primary Bio Paragraphs (Always Visible) */}
      <div className="bio-text-container" style={{ color: "#334155", fontSize: "14.5px", lineHeight: "1.7" }}>
        <p style={{ margin: "0 0 14px 0" }}>
          <strong>{displayName}</strong> (known as <strong>Abu Hanif</strong>) is a dedicated{" "}
          <strong>Full-Stack Web Developer</strong> and adaptable{" "}
          <strong>International Operations Professional</strong> seeking opportunities across the{" "}
          <strong>United Kingdom, Europe, and remote teams worldwide</strong> — open to{" "}
          <strong>Remote, B2B Contract, and Full-Time On-Site / Relocation</strong> positions across web development,
          technical support, operations, and customer-facing roles. He builds practical, SEO-structured web platforms
          with <strong>Next.js 16</strong>, <strong>React 19</strong>, <strong>TypeScript</strong>,{" "}
          <strong>PostgreSQL / Supabase</strong>, and <strong>Cloudflare Pages</strong>, including his flagship live site{" "}
          <strong>NexusCalculator.net</strong> (312 calculators and utilities in four languages).
        </p>

        <p style={{ margin: "0 0 14px 0" }}>
          His academic foundation began with a <strong>Higher Secondary Certificate (HSC) in Commerce (2016–2017)</strong>{" "}
          from <strong>Wali Neowaj Khan College</strong> (EIIN: <code>110495</code>, Dhaka Education Board). Alongside
          building real-world web software, he completed the <strong>Programming Hero</strong> Web Development course in{" "}
          <strong>2025</strong> (Batch-12 • <code>WEB12-3991</code>) and self-learned{" "}
          <strong>TypeScript, Python, Rust, and C++</strong> through <strong>freeCodeCamp</strong>.
        </p>

        {/* Expandable Extended Bio on Mobile */}
        <div className={`bio-extended-content ${isBioExpanded ? "block" : "hidden md:block"}`}>
          <p style={{ margin: "0 0 14px 0" }}>
            <strong>Work &amp; Operations Background (2017–2025):</strong> Before transitioning deeper into web software
            and digital client systems, Abu Hanif worked three consecutive frontline roles requiring punctuality, team
            communication, and high-pressure execution: <strong>Waiter</strong> at{" "}
            <strong>WACASCO Catering Services (Oman, 2022–2025)</strong> serving diverse international guests;{" "}
            <strong>Production Operator</strong> at <strong>PRAN-RFL Group (Palash, Narsingdi, 2018–2022)</strong>; and{" "}
            <strong>Salesman</strong> at <strong>Unilever Bangladesh (2017–2018)</strong>.
          </p>
          <p style={{ margin: "0 0 14px 0" }}>
            <strong>Spoken Languages:</strong> Native in <strong>Bengali</strong>, conversational in{" "}
            <strong>English</strong> for workplace collaboration and client communication, and conversational in{" "}
            <strong>Hindi &amp; Urdu</strong>. Direct contact: <a href="mailto:abuhanifmain@gmail.com" style={{ color: "#2563eb", fontWeight: 600 }}>abuhanifmain@gmail.com</a> |{" "}
            <a href="tel:+8801724010261" style={{ color: "#2563eb", fontWeight: 600 }}>+880 1724-010261</a>.
          </p>
        </div>

        {/* Mobile Accordion Toggle Button */}
        <div className="md:hidden" style={{ margin: "10px 0 20px 0" }}>
          <button
            type="button"
            onClick={() => setIsBioExpanded(!isBioExpanded)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              minHeight: "44px",
              padding: "10px 16px",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            {isBioExpanded ? (
              <>
                <span>Show Compact Overview</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Read Work History &amp; Full Bio</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* EDUCATION, TRAINING & WORK CREDENTIALS SECTION */}
      <div
        id="competencies"
        style={{
          margin: "24px 0",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderTop: "4px solid #2563eb",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "14px",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "12px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                color: "#0f172a",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontWeight: "800",
              }}
            >
              Verified Education, Training &amp; Languages
            </h3>
            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
              Formal college education, 2025 web development training, and self-directed technical study:
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCertificate}
            style={{
              fontSize: "12.5px",
              fontWeight: "bold",
              color: "#2563eb",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Award size={16} />
            <span>Inspect Course Certificate</span>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
          }}
        >
          {/* Credential 1: Programming Hero 2025 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                onClick={handleOpenCertificate}
                style={{
                  position: "relative",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid #2563eb",
                  background: "#f1f5f9",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={certPhoto}
                  alt="Programming Hero Web Development Course Certificate"
                  width={320}
                  height={220}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  background: "#fef3c7",
                  color: "#92400e",
                  fontWeight: "bold",
                  fontSize: "11px",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              >
                ★ 2025 Graduate • Batch-12
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#2563eb",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Programming Hero (2025)
              </span>
              <h4 style={{ margin: "2px 0 4px 0", fontSize: "14px", color: "#0f172a", fontWeight: "700" }}>
                Full-Stack Web Development Course
              </h4>
              <p style={{ margin: "0 0 6px 0", fontSize: "11.5px", color: "#047857", fontWeight: "bold" }}>
                Batch-12 • ID: WEB12-3991
              </p>
              <p style={{ margin: "0", fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
                Structured hands-on web curriculum covering HTML5, CSS3, modern JavaScript, React, Next.js workflows, Node.js/Express backends, and full-stack deployment.
              </p>
            </div>
            <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px dotted #e2e8f0" }}>
              <button
                type="button"
                onClick={handleOpenCertificate}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontSize: "12.5px",
                  fontWeight: "700",
                  cursor: "pointer",
                  padding: 0,
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>View Course Record</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Credential 2: freeCodeCamp Self-Learning */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  background: "#0a0a23",
                  color: "#facc15",
                  fontWeight: "bold",
                  fontSize: "11px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                (fCC) Self-Directed Study
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#2563eb",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                freeCodeCamp Curriculum
              </span>
              <h4 style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#0f172a", fontWeight: "700" }}>
                TypeScript, Python, Rust &amp; C++ Self-Study
              </h4>
              <ul style={{ margin: "0 0 10px 16px", padding: 0, fontSize: "12px", color: "#475569", lineHeight: "1.55" }}>
                <li>
                  <strong>TypeScript &amp; JavaScript:</strong> Strict typing, interfaces, async UI workflows, and production Next.js applications.
                </li>
                <li>
                  <strong>Python, Rust &amp; C++:</strong> Self-taught programming fundamentals, problem-solving, algorithms, and systems concepts via freeCodeCamp.
                </li>
              </ul>
            </div>
            <div
              style={{
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: "1px dotted #e2e8f0",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#047857",
              }}
            >
              ✓ Continuous Self-Learning &amp; GitHub Code
            </div>
          </div>

          {/* Credential 3: HSC Commerce & Spoken Languages */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: "bold",
                  fontSize: "11px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                🎓 Formal Education • 2016–2017
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#2563eb",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Dhaka Education Board
              </span>
              <h4 style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#0f172a", fontWeight: "700" }}>
                HSC in Commerce — Wali Neowaj Khan College
              </h4>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
                Completed Higher Secondary Certificate in Commerce (2016–2017) at Wali Neowaj Khan College (EIIN:{" "}
                <strong>110495</strong>, Dhaka Education Board), paired with multilingual international workplace communication:
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(profile?.spokenLanguages && profile.spokenLanguages.length > 0
                  ? profile.spokenLanguages
                  : [
                      { language: "Bengali", level: "Native (C2)" },
                      { language: "English", level: "Conversational (Working Proficiency)" },
                      { language: "Hindi & Urdu", level: "Conversational" },
                    ]
                ).map((lang) => (
                  <span key={lang.language} style={{ fontSize: "11px", background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold", color: "#0f172a" }}>
                    {lang.language} ({lang.level})
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: "1px dotted #e2e8f0",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#047857",
              }}
            >
              ✓ WACASCO Oman &amp; Bangladesh Operations
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
