"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfileData } from "../../data/portfolio-data";

export default function HomeSidebar({ profile }: { profile?: ProfileData }) {
  const email = profile?.email || "abuhanifmain@gmail.com";
  const phone = profile?.phone || "+880 1724-010261";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const location = profile?.location || "Sadar Upazila, Kishoreganj, Dhaka, Bangladesh";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Full-Time Job / Interview Inquiry",
    budget: "Flexible / Discuss",
    message: "",
    disclaimer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.disclaimer) {
      setErrorMessage("Please confirm GDPR privacy consent before submitting.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    const record = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      projectType: formData.projectType,
      budgetRange: formData.budget,
      message: formData.message,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit inquiry.");
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

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error submitting form.";
      setErrorMessage(
        `${msg} Please email directly at ${email} or call ${phone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="sidebar secondary-sidebar">
      {/* Work Modes & Availability Card */}
      <div className="widget" id="articles-thumbs">
        <div className="description" style={{ textAlign: "center", padding: "6px 0" }}>
          <div style={{ background: "#0b132b", border: "1px solid #1e293b", color: "#ffffff", padding: "18px 16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(11,25,44,0.3)" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#38bdf8",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              UK &amp; Europe Work Availability
            </div>
            <div style={{ fontSize: "20px", fontWeight: "800", margin: "6px 0", color: "#10b981", letterSpacing: "0.3px" }}>REMOTE • B2B • ON-SITE</div>
            <div style={{ fontSize: "12px", color: "#cbd5e1" }}>EN • BN • HI • UR | Direct: {phone}</div>
          </div>
        </div>
      </div>

      {/* Contact Form Widget */}
      <div className="widget contactform" id="contactform">
        <strong className="heading4 widget-title">
          <a href="#contactform">Direct Contact &amp; Job / Project Inquiry</a>
        </strong>

        {submitted ? (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "4px",
              color: "#166534",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              ✓ Inquiry Received
            </strong>
            Thank you! Abu Hanif will review your message and respond promptly via {email}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} id="genericcontactform" name="genericcontactform">
            <div className="formdesc">
              <span className="free-consultation">Direct Inquiry</span>
              <span className="phone-numbers">
                <a href={`mailto:${email}`} style={{ color: "#38bdf8", textDecoration: "none" }}>
                  {email}
                </a>
                <br />
                <a href={phoneHref} style={{ color: "#38bdf8", textDecoration: "none" }}>
                  {phone}
                </a>
                <br />
                {location}
              </span>
            </div>
            <div className="col-1">
              <span className="fld">
                <label htmlFor="Name">Name (Required)</label>
                <input
                  autoComplete="name"
                  id="Name"
                  name="10_Name"
                  placeholder="Name (Required)"
                  required
                  size={40}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </span>
              <span className="fld">
                <label htmlFor="Email">Email (Required)</label>
                <input
                  autoComplete="email"
                  id="Email"
                  name="20_Email"
                  placeholder="Work Email (Required)"
                  required
                  size={40}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </span>
              <span className="fld">
                <label htmlFor="Phone">Phone (Optional)</label>
                <input
                  autoComplete="tel"
                  id="Phone"
                  name="30_Phone"
                  placeholder="+44 7700 900077 or +880 1XXX-XXXXXX"
                  size={40}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </span>
            </div>
            <span className="option">
              <label htmlFor="CaseType">Inquiry Type / Scope:</label>
              <select
                id="CaseType"
                name="project_scope"
                aria-label="Inquiry Type"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              >
                <option value="Full-Time Job / Interview Inquiry">Full-Time Job / Interview (Remote or On-Site)</option>
                <option value="Full-Stack Web App">Full-Stack Web App (Next.js/React/TypeScript)</option>
                <option value="Cloud & Edge Architecture">Cloudflare Pages &amp; Hosting Setup</option>
                <option value="Database Optimization">PostgreSQL / Supabase Database Work</option>
                <option value="Dedicated Engineering Retainer">B2B Contract / Retainer</option>
                <option value="Other Project">Operations / International Service Inquiry</option>
              </select>
            </span>
            <span className="fld">
              <label htmlFor="budgetRangeInput">Compensation / Budget Scope</label>
              <select
                id="budgetRangeInput"
                name="50_Budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{
                  width: "100%",
                  height: "2.5em",
                  marginBottom: "0.5em",
                  padding: "0 10px",
                  borderRadius: "3px",
                }}
              >
                <option value="Flexible / Discuss">Salary / Rate — Flexible (Remote, B2B, On-Site)</option>
                <option value="$2,500 - $5,000">$2,500 – $5,000 (Small Project / Audit)</option>
                <option value="$5,000 - $15,000">$5,000 – $15,000 (MVP / Full-Stack Sprint)</option>
                <option value="$15,000+">$15,000+ (Extended Platform / Retainer)</option>
              </select>
            </span>
            <span className="textarea">
              <label htmlFor="Message">Message / Role / Project Details</label>
              <textarea
                cols={20}
                id="Message"
                name="60_Message"
                placeholder="Share role details, location/remote availability, or web project requirements..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </span>
            <span className="disc">
              <input
                className="checkb"
                id="scf_Disclaimer"
                name="70_Disclaimer"
                required
                type="checkbox"
                checked={formData.disclaimer}
                onChange={(e) => setFormData({ ...formData, disclaimer: e.target.checked })}
              />
              <label htmlFor="scf_Disclaimer">
                <span>
                  I agree to the{" "}
                  <Link href="/privacy" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                    Privacy &amp; GDPR Policy
                  </Link>{" "}
                  and consent to be contacted. (Required)
                </span>
              </label>
              <p>Direct confidentiality: Submitted details are used solely to reply to your job or project inquiry.</p>
            </span>
            {errorMessage && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px" }}>{errorMessage}</p>
            )}
            <div className="clr"></div>
            <span className="submit">
              <button name="submitbtn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </span>
          </form>
        )}
      </div>

      {/* High-Conversion Discovery & SOW Widget */}
      <div className="widget amp-include" id="wdgt-evaluation-button">
        <div className="description" style={{ padding: 0 }}>
          <div
            style={{
              background: "#0b132b",
              border: "1px solid #1e293b",
              borderTop: "3px solid #2563eb",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(11,25,44,0.3)",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              ⚡ Quick Hiring &amp; B2B Links
            </div>
            <strong style={{ display: "block", color: "#ffffff", fontSize: "14px", marginBottom: "6px" }}>
              Open to Full-Time Roles &amp; B2B Projects
            </strong>
            <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "#cbd5e1", lineHeight: 1.5 }}>
              Download CV / ATS text or configure a fixed-scope Statement of Work for web builds.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/resume"
                style={{
                  display: "block",
                  padding: "10px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "12.5px",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(37,99,235,0.4)",
                }}
              >
                📄 Open Full CV &amp; Work History
              </Link>
              <Link
                href="/pricing#sow-builder"
                style={{
                  display: "block",
                  padding: "9px",
                  background: "#111e38",
                  color: "#38bdf8",
                  border: "1px solid #1e293b",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                📋 Open SOW Generator
              </Link>
            </div>
            <div style={{ marginTop: "10px", fontSize: "11px", color: "#4ade80", fontWeight: 600 }}>
              ● Replies directly via {email}
            </div>
          </div>
        </div>
      </div>

      {/* Competencies Widget */}
      <div className="widget" id="pr_ar">
        <strong className="heading4 widget-title">
          <Link href="#work">Core Competencies</Link>
        </strong>
        <div className="fragcontent">
          <ul className="toplevel">
            <li className="li2 practiceareasub_11">
              <strong>
                <Link href="#work">Web &amp; Backend Stack</Link>
              </strong>
              <ul>
                <li className="li1"><Link href="/projects/nexus-calculator-platform">Next.js 15/16 &amp; i18n Apps</Link></li>
                <li className="li2"><Link href="/blog/nextjs-300-tools-platform-architecture-seo">TypeScript &amp; React 19 UI</Link></li>
                <li className="li3"><Link href="/lab#postgres-planner">PostgreSQL &amp; Supabase</Link></li>
                <li className="li4"><Link href="/lab#edge-radar">Cloudflare Pages &amp; SEO</Link></li>
                <li className="li5"><Link href="/resume">Python, Rust &amp; C++ Study</Link></li>
              </ul>
            </li>
            <li className="li3 practiceareasub_21">
              <strong>
                <Link href="/resume">Operations &amp; Work Experience</Link>
              </strong>
              <ul>
                <li className="li1"><Link href="/resume">WACASCO Catering, Oman (2022–2025)</Link></li>
                <li className="li2"><Link href="/resume">PRAN-RFL Group, BD (2018–2022)</Link></li>
                <li className="li3"><Link href="/resume">Unilever Bangladesh (2017–2018)</Link></li>
                <li className="li4"><Link href="/resume">HSC Commerce • EIIN 110495</Link></li>
                <li className="li5"><Link href="/resume">EN • BN • HI • UR Languages</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Verifiable Highlights Widget */}
      <div className="widget amp-include" id="wdgt-feedback">
        <strong className="heading4 widget-title">
          <Link href="/projects/nexus-calculator-platform">Verifiable Proof &amp; Projects</Link>
        </strong>
        <div className="description" style={{ padding: "4px 0" }}>
          <div
            style={{
              background: "#071324",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              padding: "14px",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase" }}>
                Public Track Record
              </span>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#10b981" }}>
                100% Verifiable
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#cbd5e1", lineHeight: "1.6" }}>
              <li><strong>NexusCalculator.net:</strong> 312 live tools in 4 languages</li>
              <li><strong>Programming Hero 2025:</strong> Batch-12 (WEB12-3991)</li>
              <li><strong>Oman &amp; BD Work History:</strong> 7+ yrs verified roles</li>
              <li><strong>Open Work Mode:</strong> Remote, B2B &amp; On-Site</li>
            </ul>
          </div>
          <Link
            href="/resume"
            style={{
              display: "block",
              textAlign: "center",
              padding: "8px 12px",
              backgroundColor: "#1e293b",
              color: "#38bdf8",
              border: "1px solid #334155",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Inspect Full CV &amp; Background &rsaquo;
          </Link>
        </div>
      </div>
    </div>
  );
}
