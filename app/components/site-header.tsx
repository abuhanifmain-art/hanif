"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

interface SiteHeaderProps {
  activePath?: string;
  profilePhotoUrl?: string;
}

export default function SiteHeader({
  activePath = "/",
  profilePhotoUrl = "/images/profile.png",
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const isMenuOpenRef = useRef(mobileMenuOpen);
  isMenuOpenRef.current = mobileMenuOpen;

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

          // 1. Calculate reading scroll percentage (0% to 100%)
          if (maxScroll > 0) {
            const pct = Math.min(
              100,
              Math.max(0, (currentScrollY / maxScroll) * 100)
            );
            setScrollProgress(pct);
          }

          // 2. Add elevation drop shadow when scrolled past top
          setIsScrolled(currentScrollY > 15);

          // 3. Always keep visible when near the top (<= 75px)
          if (currentScrollY <= 75) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          // 4. Guard against rubber-banding / bounce overscroll at bottom
          if (
            currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 15
          ) {
            ticking = false;
            return;
          }

          // 5. Keep header visible while mobile drawer menu is open
          if (isMenuOpenRef.current) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          const delta = currentScrollY - lastScrollY.current;

          // 6. Thresholds: scroll down > 8px -> hide; scroll up < -6px -> reveal
          if (delta > 8) {
            setIsVisible(false);
          } else if (delta < -6) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    // Command palette opened listener to keep header revealed
    function onOpenPalette() {
      setIsVisible(true);
    }

    // Mobile dock menu toggle listener
    function onToggleMobileMenu() {
      setMobileMenuOpen((prev) => !prev);
      setIsVisible(true);
    }

    function onCloseMobileMenu() {
      setMobileMenuOpen(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("open-command-palette", onOpenPalette);
    window.addEventListener("toggle-mobile-menu", onToggleMobileMenu);
    window.addEventListener("close-mobile-menu", onCloseMobileMenu);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-command-palette", onOpenPalette);
      window.removeEventListener("toggle-mobile-menu", onToggleMobileMenu);
      window.removeEventListener("close-mobile-menu", onCloseMobileMenu);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/", id: "fc", key: "/" },
    { label: "About", href: "/#about", key: "/#about" },
    { label: "Engineering Focus", href: "/#competencies", key: "/#competencies" },
    { label: "Services", href: "/services", key: "/services" },
    { label: "Work Showcase", href: "/projects", key: "/projects" },
    { label: "Pricing & SOW", href: "/pricing", key: "/pricing" },
    { label: "Systems Lab", href: "/lab", key: "/lab" },
    { label: "Technical Blog", href: "/blog", key: "/blog" },
    { label: "Resume / CV", href: "/resume", key: "/resume" },
    { label: "Contact", href: "/pricing#inquiry", id: "lc", key: "/contact" },
  ];

  function isSelected(key: string) {
    if (key === "/" && activePath === "/") return true;
    if (key !== "/" && activePath.startsWith(key)) return true;
    return false;
  }

  return (
    <header
      id="site-master-header"
      className={`site-master-header ${
        isVisible ? "header-visible" : "header-hidden"
      } ${isScrolled ? "header-scrolled" : ""}`}
      onFocusCapture={() => setIsVisible(true)}
      role="banner"
    >
      {/* Interactive 2.5px Reading Scroll Progress Bar */}
      <div className="site-header-progress-track" aria-hidden="true">
        <div
          className="site-header-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Top Availability & Quick Action Bar */}
      <div className="top-status-bar top-status-sticky" id="top-status-bar">
        <ul>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "inline-block",
                  boxShadow: "0 0 10px #10b981",
                  flexShrink: 0,
                }}
              />
              <span>
                Open to UK &amp; Europe (Remote • B2B • On-Site) •{" "}
                <Link
                  href="/status"
                  style={{
                    color: "#38bdf8",
                    fontWeight: "600",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                  title="View Live Diagnostics & Portfolio Health Dashboard"
                >
                  Live Diagnostics ↗
                </Link>
                <span className="hidden xl:inline">
                  {" "}• Direct:{" "}
                  <strong style={{ color: "#ffffff" }}>abuhanifmain@gmail.com</strong>
                </span>
              </span>
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <a
                href="https://github.com/abuhanif254"
                target="_blank"
                rel="noopener noreferrer"
                title="View Abu Hanif's GitHub repositories"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#0b132b",
                  color: "#e2e8f0",
                  border: "1px solid #1e293b",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                  lineHeight: 1.3,
                  transition: "border-color 0.15s ease, color 0.15s ease",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/md-abu-hanif-mia"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect with Abu Hanif on LinkedIn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#0b132b",
                  color: "#38bdf8",
                  border: "1px solid #1e293b",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                  lineHeight: 1.3,
                  transition: "border-color 0.15s ease, color 0.15s ease",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#0b132b",
                  color: "#e2e8f0",
                  border: "1px solid #1e293b",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                title="Press Ctrl+K or Cmd+K to open global search palette"
              >
                <span>🔍 Quick Search</span>
                <kbd
                  style={{
                    fontSize: "10px",
                    backgroundColor: "#050e1d",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid #1e293b",
                    color: "#38bdf8",
                  }}
                >
                  Ctrl+K
                </kbd>
              </button>
              <Link className="top-status-btn" href="/resume">
                CV &amp; Hire / Contact
              </Link>
            </div>
          </li>
        </ul>
      </div>

      {/* Header Container */}
      <div id="header">
        <div className="wrapper">
          <div id="head">
            <div id="logo">
              <Link
                data-title="Abu Hanif - Full-Stack Web Developer & International Operations"
                href="/"
                title="Back to Home"
              >
                <img
                  alt="Abu Hanif - Full-Stack Web Developer"
                  id="mainlogo"
                  src="/images/abuhanif-logo-v3.svg?v=2"
                  width={326}
                  height={79}
                />
                Abu Hanif Portfolio Home
              </Link>
            </div>
            <div id="tagline">
              <Link href="/pricing#inquiry" title="Discuss a Role or Web Project">
                Open to UK &amp; Europe Roles or Web Projects
              </Link>
            </div>

            {/* Mobile Actions Container (Search + Menu) */}
            <div className="mobile-header-actions">
              <button
                type="button"
                className="mobile-header-search-btn"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }
                }}
                aria-label="Open Spotlight Search"
                title="Search"
              >
                <Search size={19} />
              </button>

              <button
                type="button"
                className="mobile-menu-toggle-btn"
                onClick={() => {
                  const next = !mobileMenuOpen;
                  setMobileMenuOpen(next);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent(next ? "toggle-mobile-menu" : "close-mobile-menu"));
                  }
                }}
                aria-label={
                  mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="topnav">
            <ul id="tnav-toplevel">
              {navLinks.map((link) => {
                const selected = isSelected(link.key);
                return (
                  <li
                    key={link.label}
                    id={link.id}
                    className={`${selected ? "selected " : ""}priority_3`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Backdrop Overlay */}
          {mobileMenuOpen && (
            <div
              className="mobile-drawer-backdrop"
              onClick={() => {
                setMobileMenuOpen(false);
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("close-mobile-menu"));
                }
              }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(6, 11, 25, 0.72)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 9990,
              }}
            />
          )}

          {/* Mobile Drawer Navigation (Native App Style) */}
          {mobileMenuOpen && (
            <div
              className="mobile-nav-drawer"
              style={{
                position: "fixed",
                top: "60px",
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(7, 15, 30, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "2px solid #2563eb",
                padding: "16px 16px calc(var(--app-dock-height, 74px) + 24px) 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflowY: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                zIndex: 9995,
              }}
            >
              {/* Profile Card in Drawer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #2563eb",
                    flexShrink: 0,
                    background: "#0b132b",
                  }}
                >
                  <img
                    src={profilePhotoUrl}
                    alt="Abu Hanif"
                    width={40}
                    height={40}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      background: "#10b981",
                      color: "#050e1d",
                      fontSize: "8px",
                      fontWeight: 900,
                      padding: "1px 3px",
                      borderRadius: "50%",
                    }}
                  >
                    ✓
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "14px", color: "#ffffff", lineHeight: 1.2 }}>
                    MD Abu Hanif Mia
                  </strong>
                  <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: 700 }}>
                    Full-Stack Developer &amp; Int&apos;l Ops
                  </span>
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                    Programming Hero 2025 • WEB12-3991
                  </span>
                </div>
              </div>

              {/* Navigation Links Grid with 48px touch targets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map((link) => {
                  const selected = isSelected(link.key);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: selected ? "#38bdf8" : "#ffffff",
                        fontWeight: selected ? "800" : "600",
                        padding: "12px 14px",
                        borderRadius: "6px",
                        background: selected
                          ? "rgba(56, 189, 248, 0.12)"
                          : "rgba(255, 255, 255, 0.03)",
                        border: selected ? "1px solid #0284c7" : "1px solid transparent",
                        textDecoration: "none",
                        fontSize: "14px",
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{link.label}</span>
                      <span style={{ color: selected ? "#38bdf8" : "#64748b", fontSize: "12px" }}>
                        &rsaquo;
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Quick Actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingTop: "12px",
                  borderTop: "1px solid #1e293b",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <a
                    href="https://github.com/abuhanif254"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px",
                      background: "#0b132b",
                      color: "#e2e8f0",
                      border: "1px solid #1e293b",
                      fontWeight: 600,
                      fontSize: "12px",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/md-abu-hanif-mia"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px",
                      background: "#0b132b",
                      color: "#38bdf8",
                      border: "1px solid #1e293b",
                      fontWeight: 600,
                      fontSize: "12px",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
                <Link
                  href="/pricing#inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "13px",
                    borderRadius: "4px",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Request Project Consultation &rsaquo;
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-command-palette"));
                    }
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    background: "#072b4c",
                    color: "#e2e8f0",
                    border: "1px solid #0e4475",
                    fontWeight: 700,
                    fontSize: "12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  🔍 Open Quick Search Palette (Ctrl+K)
                </button>
              </div>
            </div>
          )}
        </div>
        <div id="ed"></div>
        <div className="clr"></div>
      </div>
    </header>
  );
}
