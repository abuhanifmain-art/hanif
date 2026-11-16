"use client";

import { useState } from "react";
import Link from "next/link";

export default function BottomContactStripe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Full-Time Job / Interview Inquiry",
    message: "",
    disclaimer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.disclaimer) {
      setErrorMessage("Please confirm GDPR consent before submitting.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    const record = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      projectType: formData.projectType,
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
        `${msg} Please email abuhanifmain@gmail.com or call +880 1724-010261 directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stripes">
      <div className="stripe stripe-01" id="stripe-01">
        <div className="stripewrap">
          <div className="widget contactform" id="bottom-scf">
            {submitted ? (
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#0b132b",
                  color: "#10b981",
                  border: "2px solid #10b981",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                <strong>✓ Consultation Request Received</strong>
                <p style={{ margin: "6px 0 0 0", color: "#e2e8f0", fontSize: "13px" }}>
                  Thank you! Abu Hanif will review your project requirements and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form_designer" id="genericcontactform_bottom-scf" name="genericcontactform_bottom-scf">
                <strong className="heading4 widget-title">
                  <a href="#bottom-scf">
                    Direct Job, B2B &amp; Project Inquiry <span>Remote • Contract • On-Site (UK / EU / Global)</span>
                  </a>
                </strong>
                <div className="cfyaw">
                  <span className="fld">
                    <label htmlFor="20_Name_Required">Name (Required)</label>
                    <input
                      id="20_Name_Required"
                      name="20_Name_Required"
                      placeholder="Name (Required)"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </span>
                  <span className="fld">
                    <label htmlFor="30_Email_Required">Work Email (Required)</label>
                    <input
                      id="30_Email_Required"
                      name="30_Email_Required"
                      placeholder="Email (Required)"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </span>
                  <span className="fld">
                    <label htmlFor="40_Phone_Required">Phone (Optional)</label>
                    <input
                      id="40_Phone_Required"
                      name="40_Phone_Required"
                      placeholder="+44 7700 900077 or +880 1XXX-XXXXXX"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </span>
                  <span className="option">
                    <label htmlFor="footerInquiryType">Inquiry Type / Scope:</label>
                    <select
                      id="footerInquiryType"
                      name="project_scope"
                      aria-label="Inquiry Type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    >
                      <option value="Full-Time Job / Interview Inquiry">Full-Time Job / Interview (Remote or On-Site)</option>
                      <option value="Full-Stack Web App">Full-Stack Web App (Next.js/React/TypeScript)</option>
                      <option value="Cloud Architecture">Cloudflare Edge &amp; Hosting Setup</option>
                      <option value="Database Optimization">PostgreSQL / Supabase Database Work</option>
                      <option value="Dedicated Engineering Retainer">B2B Contract / Retainer</option>
                    </select>
                  </span>
                  <span className="fld">
                    <label htmlFor="70_Message">Message / Role / Project Details</label>
                    <textarea
                      cols={20}
                      id="70_Message"
                      name="70_Message"
                      placeholder="Share details about the role, location/remote setup, or web project requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </span>
                  <span className="disc">
                    <input
                      className="checkb"
                      id="bcf_Disclaimer"
                      name="60_Disclaimer"
                      required
                      type="checkbox"
                      checked={formData.disclaimer}
                      onChange={(e) => setFormData({ ...formData, disclaimer: e.target.checked })}
                    />
                    <label htmlFor="bcf_Disclaimer">
                      <span>
                        I agree to the{" "}
                        <Link href="/privacy" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                          Privacy &amp; GDPR Policy
                        </Link>{" "}
                        and consent to be contacted regarding this inquiry. (Required)
                      </span>
                    </label>
                  </span>
                </div>
                {errorMessage && (
                  <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px" }}>{errorMessage}</p>
                )}
                <span className="submit">
                  <button name="submitbtn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                  </button>
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
