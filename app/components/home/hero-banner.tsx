"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProfileData, initialProfile } from "../../data/portfolio-data";

interface HeroSlide {
  id: string;
  imageSrc: string;
  alt: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  tag: string;
}

const defaultShortLabels = ["Web Dev Studio", "NexusCalculator", "Systems Study", "UK & EU Ready"];
const defaultTags = ["01 / Full-Stack", "02 / Live App", "03 / CS & DB", "04 / UK & EU"];

function buildHeroSlides(profile?: ProfileData): HeroSlide[] {
  const configuredSlides =
    profile?.visualAssets?.heroSlides && profile.visualAssets.heroSlides.length > 0
      ? profile.visualAssets.heroSlides
      : initialProfile.visualAssets.heroSlides;

  return configuredSlides.map((s, idx) => ({
    id: s.id || `slide-${idx + 1}`,
    imageSrc: s.src || `/images/hero/hero-slide-${(idx % 4) + 1}.jpg`,
    alt: s.alt,
    shortLabel: defaultShortLabels[idx] || `Slide ${idx + 1}`,
    title: s.title,
    subtitle: s.subtitle,
    tag: defaultTags[idx] || `0${idx + 1} / Portfolio`,
  }));
}

const valueProps = [
  "Creator of NexusCalculator.net (312 Tools • 4 Languages • Next.js)",
  "Open to Remote, B2B Contract & On-Site / Relocation in UK & Europe",
  "Programming Hero Graduate (2025, Batch-12) & freeCodeCamp Self-Study",
  "Spoken Languages: Bengali (Native), English, Hindi & Urdu (Conv.)",
  "7+ Years International Ops & Client Service (Oman & Bangladesh)",
];

interface TerminalCommand {
  label: string;
  cmd: string;
  output: string;
}

const defaultCommands: TerminalCommand[] = [
  {
    label: "Edge Ping",
    cmd: "curl -sI /api/ping",
    output: "HTTP/2 200 OK • Ready to measure live browser TTFB via /api/ping",
  },
  {
    label: "NexusCalculator",
    cmd: "cat lib/registry/index.ts | wc -l # nexuscalculator.net",
    output: "312 interactive calculators & dev tools • 3,200+ SSG pages (EN/ES/FR/DE)",
  },
  {
    label: "Tech Study",
    cmd: "profile --education --languages --work-modes",
    output: "HSC Commerce • PH 2025 • freeCodeCamp (TS/Python/Rust/C++) • UK & EU Ready",
  },
];

export default function HeroBanner({ profile }: { profile?: ProfileData }) {
  const heroSlides = buildHeroSlides(profile);
  const profilePhoto = profile?.visualAssets?.profilePhotoUrl || "/images/profile.png";
  const displayName = profile?.fullName || "MD Abu Hanif Mia";
  const displayHeadline =
    profile?.headline ||
    "Next.js & TypeScript Builder • Multi-Sector Operations • Open to UK & Europe";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeValueProp, setActiveValueProp] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isPinging, setIsPinging] = useState(false);
  const [livePingResult, setLivePingResult] = useState<string | null>(null);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Slide Auto-play (6.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNextSlide, 6500);
    return () => clearInterval(timer);
  }, [isPaused, handleNextSlide]);

  // Value props ticker (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveValueProp((prev) => (prev + 1) % valueProps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  async function handleRunLivePing() {
    setIsPinging(true);
    const start = performance.now();
    try {
      const res = await fetch("/api/ping", { cache: "no-store" });
      const elapsed = Math.round(performance.now() - start);
      if (res.ok) {
        const data = await res.json();
        setLivePingResult(
          `HTTP/2 200 OK • PoP Region: ${data.region || "DAC"} • Browser TTFB: ${elapsed}ms`
        );
      } else {
        setLivePingResult(`HTTP ${res.status} • Measured in ${elapsed}ms`);
      }
    } catch {
      const elapsed = Math.round(performance.now() - start);
      setLivePingResult(`Ping Completed (${elapsed}ms) • Local Node Environment`);
    } finally {
      setIsPinging(false);
    }
  }

  const currentCommand = defaultCommands[activeTab];
  const currentOutput =
    activeTab === 0 && livePingResult ? livePingResult : currentCommand.output;

  return (
    <div className="imgwrap">
      {/* Main Hero Slider Container */}
      <section
        id="img1"
        aria-roledescription="carousel"
        aria-label={`${displayName} - Portfolio & Workspace Showcase`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "440px",
        }}
      >
        {/* Layer 1: High-Definition Background Workspace Photography (Clear & Visible) */}
        <div
          className="hero-slider-background-layer"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  fill
                  unoptimized={!slide.imageSrc.startsWith("/")}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  quality={92}
                  style={{
                    objectFit: "cover",
                    objectPosition: "right 35%",
                    transform: isActive ? "scale(1.0)" : "scale(1.04)",
                    transition: "transform 8000ms ease-out",
                  }}
                />
              </div>
            );
          })}

          {/* Balanced Directional Scrim: Dark on the left for crisp text readability; translucent on the right so Abu Hanif typing at his workstation is vibrant and visible */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(90deg, rgba(6, 11, 25, 0.94) 0%, rgba(6, 11, 25, 0.88) 42%, rgba(6, 11, 25, 0.62) 68%, rgba(6, 11, 25, 0.38) 100%)",
            }}
          />
          {/* Subtle top/bottom edge shadow for seamless header/footer integration */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background:
                "linear-gradient(180deg, rgba(6, 11, 25, 0.5) 0%, transparent 20%, transparent 80%, rgba(6, 11, 25, 0.75) 100%)",
            }}
          />
        </div>

        {/* Layer 2: Top Floating Navigation & Workspace Switcher */}
        <div
          className="hero-slider-header-bar"
          style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* Tagline Badge */}
          <div
            id="banner-tagline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              padding: "4px 12px",
              borderRadius: "999px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 8px #10b981",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.8px", whiteSpace: "nowrap" }}>
              <span className="hidden sm:inline">{displayHeadline}</span>
              <span className="inline sm:hidden">Next.js &bull; TS &bull; Open to UK &amp; EU</span>
            </span>
          </div>

          {/* Interactive Workspace Navigation Tabs */}
          <div
            className="hero-slider-tabs-container"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "rgba(6, 11, 25, 0.88)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "3px 6px",
              borderRadius: "24px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              maxWidth: "100%",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {heroSlides.map((slide, idx) => {
              const isCurrent = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Switch to workspace slide ${idx + 1}: ${slide.title}`}
                  title={`${slide.title} — ${slide.subtitle}`}
                  style={{
                    background: isCurrent ? "#2563eb" : "transparent",
                    color: isCurrent ? "#ffffff" : "#94a3b8",
                    border: "none",
                    borderRadius: "16px",
                    padding: "6px 12px",
                    fontSize: "11px",
                    fontWeight: isCurrent ? 700 : 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "all 0.2s ease",
                    boxShadow: isCurrent ? "0 2px 8px rgba(37,99,235,0.5)" : "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    minHeight: "36px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: isCurrent ? "#10b981" : "rgba(148,163,184,0.4)",
                      display: "inline-block",
                    }}
                  />
                  <span>{slide.shortLabel}</span>
                </button>
              );
            })}

            {/* Prev / Next Arrows */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "2px", marginLeft: "4px", paddingLeft: "4px", borderLeft: "1px solid rgba(51,65,85,0.7)" }}>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous workspace slide"
                title="Previous slide (Left Arrow)"
                style={{
                  background: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  color: "#e2e8f0",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                  transition: "background 0.15s ease",
                }}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next workspace slide"
                title="Next slide (Right Arrow)"
                style={{
                  background: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  color: "#e2e8f0",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                  transition: "background 0.15s ease",
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Layer 3: Foreground Main Content */}
        <div className="text-wrapper" style={{ position: "relative", zIndex: 4 }}>
          {/* Left Column: Core Engineering Value Proposition + Interactive Terminal */}
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: "clamp(20px, 2.3vw, 27px)",
                fontWeight: 900,
                lineHeight: 1.2,
                color: "#f8fafc",
                letterSpacing: "-0.02em",
                marginBottom: "6px",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.7)",
              }}
            >
              Building Real-World Web Platforms &amp; International Operations Readiness.
            </h1>

            {/* Rotating Value Proposition Ticker */}
            <div id="slideshow" style={{ minHeight: "22px" }}>
              {valueProps.map((text, idx) => (
                <div
                  key={idx}
                  className={`slide slide${idx + 1}`}
                  style={{
                    display: activeValueProp === idx ? "flex" : "none",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#38bdf8",
                    marginTop: "2px",
                    textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <span style={{ color: "#10b981" }}>✓</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Interactive Systems Telemetry Terminal */}
            <div
              style={{
                marginTop: "10px",
                padding: "10px 14px",
                backgroundColor: "rgba(6, 11, 25, 0.94)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                borderRadius: "8px",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                width: "100%",
                maxWidth: "600px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Terminal Switcher Tabs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                  borderBottom: "1px solid rgba(30, 41, 59, 0.85)",
                  paddingBottom: "6px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginRight: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                </div>

                {defaultCommands.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    style={{
                      background: activeTab === idx ? "rgba(37, 99, 235, 0.35)" : "transparent",
                      color: activeTab === idx ? "#38bdf8" : "#94a3b8",
                      border: activeTab === idx ? "1px solid #2563eb" : "1px solid transparent",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                {activeTab === 0 && (
                  <button
                    type="button"
                    onClick={handleRunLivePing}
                    disabled={isPinging}
                    style={{
                      marginLeft: "auto",
                      background: isPinging ? "#1e293b" : "#10b981",
                      color: isPinging ? "#94a3b8" : "#050e1d",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: isPinging ? "default" : "pointer",
                      transition: "all 0.15s ease",
                    }}
                    title="Send a real-time fetch request to Cloudflare Edge API"
                  >
                    {isPinging ? "Pinging..." : "⚡ Run Live Ping"}
                  </button>
                )}
              </div>

              <div style={{ color: "#38bdf8", marginBottom: "2px", fontWeight: "600", wordBreak: "break-all" }}>
                <span style={{ color: "#10b981" }}>hanif@edge:~$</span> {currentCommand.cmd}
              </div>
              <div style={{ color: "#cbd5e1", fontSize: "11.5px", lineHeight: "1.35" }}>
                &rsaquo; <span style={{ color: activeTab === 0 && livePingResult ? "#4ade80" : "inherit" }}>{currentOutput}</span>
              </div>
            </div>

            {/* High-Conversion Hero Action Buttons */}
            <div
              className="hero-action-buttons"
              style={{
                marginTop: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Link
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px",
                  padding: "10px 18px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 2px 10px rgba(37,99,235,0.4)",
                  transition: "all 0.15s ease",
                  flex: "1 1 140px",
                }}
              >
                Explore Case Studies ⚡
              </Link>

              <Link
                href="/pricing#sow-builder"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px",
                  padding: "10px 16px",
                  background: "rgba(15, 23, 42, 0.88)",
                  color: "#f8fafc",
                  border: "1px solid #38bdf8",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  flex: "1 1 140px",
                }}
              >
                Instant SOW Builder 📋
              </Link>

              <Link
                href="/pricing#inquiry"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  minHeight: "44px",
                  padding: "10px 16px",
                  background: "rgba(15, 23, 42, 0.6)",
                  color: "#cbd5e1",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  flex: "1 1 100%",
                }}
              >
                Book Discovery Call 📅
              </Link>
            </div>
          </div>

          {/* Right Column: Executive Architect Identity Card (Translucent Glassmorphism) */}
          <div
            style={{
              backgroundColor: "rgba(10, 18, 38, 0.82)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              maxWidth: "260px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2.5px solid #38bdf8",
                background: "radial-gradient(circle at 50% 35%, #1e293b 0%, #0b132b 100%)",
                boxShadow: "0 0 18px rgba(56, 189, 248, 0.35)",
                marginBottom: "10px",
                flexShrink: 0,
              }}
            >
              <Image
                src={profilePhoto}
                alt={`${displayName} - Full-Stack Web Developer`}
                width={84}
                height={84}
                unoptimized={!profilePhoto.startsWith("/")}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>

            <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
              {displayName}
            </div>
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#38bdf8",
                textTransform: "uppercase",
                letterSpacing: "0.7px",
                marginTop: "3px",
                marginBottom: "10px",
              }}
            >
              Full-Stack Dev &amp; Int&apos;l Ops
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  background: "rgba(6, 11, 25, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  borderRadius: "5px",
                  padding: "6px",
                }}
              >
                <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#10b981" }}>312 Tools</div>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>NexusCalculator</div>
              </div>
              <div
                style={{
                  background: "rgba(6, 11, 25, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  borderRadius: "5px",
                  padding: "6px",
                }}
              >
                <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#38bdf8" }}>UK &amp; EU</div>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>Remote/B2B/Site</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                paddingTop: "8px",
                borderTop: "1px solid rgba(30, 41, 59, 0.8)",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              <a
                href="https://github.com/abuhanif254"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                GitHub ↗
              </a>
              <span style={{ color: "#334155" }}>•</span>
              <a
                href="https://www.linkedin.com/in/md-abu-hanif-mia"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cbd5e1", textDecoration: "none" }}
              >
                LinkedIn ↗
              </a>
              <span style={{ color: "#334155" }}>•</span>
              <Link href="/resume" style={{ color: "#38bdf8", textDecoration: "none" }}>
                Resume ›
              </Link>
            </div>
          </div>
        </div>

        {/* Live Workspace Sub-Bar (Active slide caption badge) */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            paddingTop: "8px",
            borderTop: "1px solid rgba(30, 41, 59, 0.6)",
            fontSize: "11px",
            color: "#94a3b8",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>Active Studio:</span>
            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{heroSlides[currentSlide].title}</span>
            <span style={{ color: "#64748b" }}>—</span>
            <span style={{ color: "#94a3b8" }}>{heroSlides[currentSlide].subtitle}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#64748b", fontSize: "10.5px" }}>
              Slide {currentSlide + 1} of {heroSlides.length}
            </span>
            <div style={{ display: "flex", gap: "3px" }}>
              {heroSlides.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === currentSlide ? "16px" : "4px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: i === currentSlide ? "#38bdf8" : "rgba(148, 163, 184, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom 3 Quick Access Buttons */}
      <div id="img2">
        <div className="wrapper">
          <Link className="hero-quick-btn" href="/projects/nexus-calculator-platform" title="View Live Production Web Platform: NexusCalculator.net">
            NexusCalculator.net ⚡
          </Link>
          <Link className="hero-quick-btn" href="/projects" title="Explore Web Projects & Architecture Blueprints">
            Projects &amp; Work 🛠
          </Link>
          <Link className="hero-quick-btn" href="/resume" title="Open Full CV, Work History & UK/EU Availability">
            CV &amp; Availability 📄
          </Link>
        </div>
      </div>
    </div>
  );
}
