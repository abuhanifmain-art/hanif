"use client";

import Image from "next/image";

export default function BadgesBar() {
  function handleOpenCertificate(e: React.MouseEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.location.hash = "#certificate-modal";
      // Also dispatch event in case hash was already set
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  return (
    <div
      id="badges"
      className="badges-bar-container scrollbar-none"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        margin: "0 0 24px 0",
        paddingBottom: "18px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {/* 1. UK & Europe Work Availability Badge */}
      <span className="badge" title="Open to Remote, B2B Contract, and On-Site / Relocation roles in UK, Europe & Worldwide">
        <strong
          style={{
            display: "inline-block",
            padding: "8px 14px",
            background: "#070f1e",
            color: "#38bdf8",
            border: "1px solid #1e293b",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          UK &amp; EU: REMOTE / B2B / ON-SITE
        </strong>
      </span>

      {/* 2. Spoken Languages Badge */}
      <span className="badge" title="Spoken Languages: Bengali (Native), English (Conversational), Hindi & Urdu (Conversational)">
        <strong
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "#064e3b",
            color: "#4ade80",
            border: "1px solid #059669",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
              boxShadow: "0 0 6px #4ade80",
            }}
          />
          EN • BN • HI • UR
        </strong>
      </span>

      {/* 3. Live Product Badge */}
      <span className="badge" title="Creator of NexusCalculator.net — 312 live tools across 4 languages">
        <strong
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "#070f1e",
            color: "#f97316",
            border: "1px solid #ea580c",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          <span>⚡</span> NEXUSCALCULATOR.NET
        </strong>
      </span>

      {/* 4. International Ops Work History Badge */}
      <span className="badge" title="2017–2025 Work History: WACASCO Oman (2022–2025), PRAN-RFL Group (2018–2022), Unilever BD (2017–2018)">
        <strong
          style={{
            display: "inline-block",
            padding: "8px 14px",
            background: "#1e1b4b",
            color: "#c084fc",
            border: "1px solid #4338ca",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          OMAN &amp; BD OPS (2017–2025)
        </strong>
      </span>

      {/* 5. Verified Training: Programming Hero 2025 */}
      <a
        href="#certificate-modal"
        id="ph-certificate-trigger"
        data-certificate-trigger="programming-hero"
        onClick={handleOpenCertificate}
        className="badge"
        title="Click to inspect Programming Hero Web Development Course record (2025 • Batch-12 • ID: WEB12-3991)"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 14px",
          background: "#0b132b",
          color: "#ffffff",
          border: "1px solid #2563eb",
          borderRadius: "4px",
          textDecoration: "none",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(11,25,44,0.3)",
          transition: "all 0.15s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "52px",
            height: "38px",
            borderRadius: "3px",
            overflow: "hidden",
            border: "1px solid #2563eb",
            flexShrink: 0,
            background: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <Image
            src="/images/programming-hero-certificate.png"
            alt="Programming Hero Certificate Thumbnail"
            width={52}
            height={38}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#10b981",
              color: "#050e1d",
              fontSize: "7.5px",
              fontWeight: 900,
              padding: "1px 3px",
              lineHeight: 1,
              borderTopLeftRadius: "2px",
            }}
          >
            ✓
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: 1.2 }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            PROGRAMMING HERO • 2025
          </span>
          <strong style={{ fontSize: "12px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.1px" }}>
            WEB DEVELOPMENT COURSE
          </strong>
          <span style={{ fontSize: "10px", color: "#cbd5e1", fontWeight: 600 }}>
            Batch-12 • ID: WEB12-3991 <span style={{ color: "#4ade80" }}>(Inspect ↗)</span>
          </span>
        </div>
      </a>

      {/* 6. freeCodeCamp Self-Learning Badge */}
      <span
        className="badge"
        title="Self-learned TypeScript, Python, Rust, and C++ on freeCodeCamp"
      >
        <strong
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: "#070f1e",
            color: "#fde047",
            border: "1px solid #ca8a04",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          <span>(fCC)</span> TS • PY • RUST • C++
        </strong>
      </span>
    </div>
  );
}
