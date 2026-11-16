"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only reveal if user has never dismissed the privacy notice
    const dismissed = window.localStorage.getItem("hanif-privacy-dismissed");
    if (!dismissed) {
      // Delay slightly so it doesn't jarringly animate during initial paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleDismiss() {
    window.localStorage.setItem("hanif-privacy-dismissed", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="privacy-telemetry-notice"
      aria-label="Privacy & Telemetry Notice"
      role="complementary"
    >
      <div className="privacy-header-row">
        <div className="privacy-badge">
          <span className="privacy-pulse-dot" />
          <ShieldCheck size={16} className="text-emerald-400" />
          <strong className="privacy-title">
            Privacy &amp; Telemetry Notice
          </strong>
        </div>
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss notice"
          className="privacy-close-btn"
        >
          <X size={18} />
        </button>
      </div>

      <p className="privacy-text">
        Only essential local browser storage is used for UI preferences and admin session security.{" "}
        <strong className="text-white">Zero third-party ad trackers or analytics cookies are deployed.</strong>
      </p>

      <div className="privacy-actions-row">
        <Link
          href="/privacy"
          onClick={handleDismiss}
          className="privacy-link"
        >
          Privacy &amp; UK/EU GDPR Policy &rsaquo;
        </Link>
        <Link
          href="/terms"
          onClick={handleDismiss}
          className="privacy-link"
        >
          Terms &rsaquo;
        </Link>
        <button
          onClick={handleDismiss}
          type="button"
          className="privacy-confirm-btn"
        >
          Acknowledge &amp; Dismiss
        </button>
      </div>
    </aside>
  );
}
