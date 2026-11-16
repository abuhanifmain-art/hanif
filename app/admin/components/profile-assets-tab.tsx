"use client";

import React from "react";
import Link from "next/link";
import { ProfileData } from "../../data/portfolio-data";
import AdminImageUploader from "../../components/admin-image-uploader";

interface ProfileAssetsTabProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  isSavingProfile: boolean;
  persistenceMode: "supabase-secret-key" | "local-fallback";
  onSaveProfile: (e: React.FormEvent) => Promise<void>;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  backgroundColor: "#071324",
  border: "1px solid #1e293b",
  color: "#fff",
  borderRadius: "4px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#0a192f",
  border: "1px solid #1e293b",
  borderRadius: "6px",
  padding: "24px",
};

export default function ProfileAssetsTab({
  profile,
  setProfile,
  isSavingProfile,
  persistenceMode,
  onSaveProfile,
}: ProfileAssetsTabProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 4px 0" }}>
            Profile, Visual Assets, Billing &amp; GDPR Legal
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
            Replace your profile photo, hero slides, course certificate scan, invoice issuer settings, and live{" "}
            <Link href="/privacy" target="_blank" style={{ color: "#38bdf8", textDecoration: "underline" }}>
              /privacy
            </Link>{" "}
            &amp;{" "}
            <Link href="/terms" target="_blank" style={{ color: "#38bdf8", textDecoration: "underline" }}>
              /terms
            </Link>{" "}
            disclosures.
          </p>
        </div>

        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: persistenceMode === "supabase-secret-key" ? "#064e3b" : "#451a03",
            color: persistenceMode === "supabase-secret-key" ? "#6ee7b7" : "#fcd34d",
            border:
              persistenceMode === "supabase-secret-key"
                ? "1px solid #059669"
                : "1px solid #d97706",
          }}
        >
          {persistenceMode === "supabase-secret-key"
            ? "● Live DB Persistence (SUPABASE_SECRET_KEY Active)"
            : "● Preview / Fallback Store (Set SUPABASE_SECRET_KEY in Env to Persist Across Restarts)"}
        </span>
      </div>

      <form onSubmit={onSaveProfile} style={{ display: "grid", gap: "20px", maxWidth: "980px" }}>
        {/* SECTION A: CORE IDENTITY & CONTACT */}
        <div style={cardStyle}>
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "16px",
              fontWeight: "700",
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            1. Core Identity, Availability &amp; Contact
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Full Name
              </label>
              <input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Role Title / Kicker
              </label>
              <input
                value={profile.kicker}
                onChange={(e) => setProfile({ ...profile, kicker: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Hero Top Tagline
              </label>
              <input
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Availability Status
              </label>
              <input
                value={profile.availabilityStatus}
                onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Primary Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Public Phone Number
              </label>
              <input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
              Location
            </label>
            <input
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
              Profile Summary / Bio
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        {/* SECTION B: VISUAL ASSETS REPLACE CONTROLS */}
        <div style={cardStyle}>
          <h3
            style={{
              margin: "0 0 6px 0",
              fontSize: "16px",
              fontWeight: "700",
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            2. Visual Assets Replacement (Headshot, Certificate &amp; Hero Slides)
          </h3>
          <p style={{ margin: "0 0 18px 0", fontSize: "12.5px", color: "#94a3b8" }}>
            Upload your real photographs or paste hosted image URLs to replace any default visual asset across the homepage, header, bio, and credentials viewer.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
              marginBottom: "20px",
            }}
          >
            <AdminImageUploader
              label="Profile Headshot Photo"
              helperText="Displayed on Hero Card, Header Drawer & About (/images/profile.png default)"
              mode="single"
              value={profile.visualAssets?.profilePhotoUrl || ""}
              onChangeSingle={(url) =>
                setProfile({
                  ...profile,
                  visualAssets: { ...profile.visualAssets, profilePhotoUrl: url },
                })
              }
              onClearSingle={() =>
                setProfile({
                  ...profile,
                  visualAssets: { ...profile.visualAssets, profilePhotoUrl: "/images/profile.png" },
                })
              }
            />
            <AdminImageUploader
              label="Certificate / Credential Scan"
              helperText="Displayed in Credentials card (/images/programming-hero-certificate.png default)"
              mode="single"
              value={profile.visualAssets?.certificatePhotoUrl || ""}
              onChangeSingle={(url) =>
                setProfile({
                  ...profile,
                  visualAssets: { ...profile.visualAssets, certificatePhotoUrl: url },
                })
              }
              onClearSingle={() =>
                setProfile({
                  ...profile,
                  visualAssets: {
                    ...profile.visualAssets,
                    certificatePhotoUrl: "/images/programming-hero-certificate.png",
                  },
                })
              }
            />
          </div>

          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#e2e8f0" }}>
              Hero Banner Slides (4 Workspace / Project Slides)
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "16px",
              }}
            >
              {(profile.visualAssets?.heroSlides || []).map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  style={{
                    backgroundColor: "#071324",
                    border: "1px solid #1e293b",
                    borderRadius: "6px",
                    padding: "14px",
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", marginBottom: "8px" }}>
                    Hero Slide #{idx + 1}
                  </div>
                  <AdminImageUploader
                    label={`Replace Slide #${idx + 1} Image`}
                    mode="single"
                    value={slide.src}
                    onChangeSingle={(url) => {
                      const nextSlides = [...(profile.visualAssets?.heroSlides || [])];
                      nextSlides[idx] = { ...slide, src: url };
                      setProfile({
                        ...profile,
                        visualAssets: { ...profile.visualAssets, heroSlides: nextSlides },
                      });
                    }}
                  />
                  <div style={{ marginTop: "8px", display: "grid", gap: "8px" }}>
                    <input
                      value={slide.title}
                      placeholder="Slide Title"
                      onChange={(e) => {
                        const nextSlides = [...(profile.visualAssets?.heroSlides || [])];
                        nextSlides[idx] = { ...slide, title: e.target.value };
                        setProfile({
                          ...profile,
                          visualAssets: { ...profile.visualAssets, heroSlides: nextSlides },
                        });
                      }}
                      style={{ ...inputStyle, backgroundColor: "#0a192f", fontSize: "12px" }}
                    />
                    <input
                      value={slide.subtitle}
                      placeholder="Slide Subtitle"
                      onChange={(e) => {
                        const nextSlides = [...(profile.visualAssets?.heroSlides || [])];
                        nextSlides[idx] = { ...slide, subtitle: e.target.value };
                        setProfile({
                          ...profile,
                          visualAssets: { ...profile.visualAssets, heroSlides: nextSlides },
                        });
                      }}
                      style={{ ...inputStyle, backgroundColor: "#0a192f", fontSize: "12px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION C: GDPR, LEGAL & OMS INVOICE BILLING DETAILS */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "700",
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              3. UK / EU GDPR, Legal &amp; OMS Invoice Settings
            </h3>
            <div style={{ display: "flex", gap: "10px", fontSize: "12px" }}>
              <Link href="/privacy" target="_blank" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                Preview /privacy ↗
              </Link>
              <Link href="/terms" target="_blank" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                Preview /terms ↗
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Data Controller Name
              </label>
              <input
                value={profile.legalGdpr?.controllerName || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, controllerName: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Trading Name / Legal Entity Label
              </label>
              <input
                value={profile.legalGdpr?.tradingAs || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, tradingAs: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Privacy Contact Email
              </label>
              <input
                type="email"
                value={profile.legalGdpr?.controllerEmail || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, controllerEmail: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Legal / Contact Phone
              </label>
              <input
                value={profile.legalGdpr?.controllerPhone || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, controllerPhone: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Registered / Mailing Address
              </label>
              <input
                value={profile.legalGdpr?.controllerAddress || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, controllerAddress: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Effective / Last Updated Date
              </label>
              <input
                value={profile.legalGdpr?.lastUpdated || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, lastUpdated: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: "grid", gap: "12px", marginBottom: "18px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Registration / ICO / Tax Note
              </label>
              <input
                value={profile.legalGdpr?.icoOrRegistrationNote || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, icoOrRegistrationNote: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Data Retention Summary
              </label>
              <textarea
                rows={2}
                value={profile.legalGdpr?.dataRetentionSummary || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, dataRetentionSummary: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Sub-Processors Disclosure
              </label>
              <textarea
                rows={2}
                value={profile.legalGdpr?.subProcessorsNote || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, subProcessorsNote: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Custom Privacy Notice / UK &amp; EU Rep Addendum
              </label>
              <textarea
                rows={2}
                value={profile.legalGdpr?.privacyPolicyCustomNotes || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, privacyPolicyCustomNotes: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Custom Terms of Service Addendum
              </label>
              <textarea
                rows={2}
                value={profile.legalGdpr?.termsCustomNotes || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, termsCustomNotes: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>

          {/* Commercial Invoice Issuer Fields */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#38bdf8" }}>
              Commercial Invoice Issuer Settings (/orders/invoice)
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div>
                <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                  Invoice Tax / Registration Ref
                </label>
                <input
                  value={profile.legalGdpr?.invoiceTaxId || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      legalGdpr: { ...profile.legalGdpr, invoiceTaxId: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                  Bank / Payment Rail Label
                </label>
                <input
                  value={profile.legalGdpr?.invoiceBankName || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      legalGdpr: { ...profile.legalGdpr, invoiceBankName: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                  SWIFT / BIC / Routing Note
                </label>
                <input
                  value={profile.legalGdpr?.invoiceSwiftBic || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      legalGdpr: { ...profile.legalGdpr, invoiceSwiftBic: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                  Account / IBAN Instructions
                </label>
                <input
                  value={profile.legalGdpr?.invoiceAccountOrIban || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      legalGdpr: { ...profile.legalGdpr, invoiceAccountOrIban: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                Invoice Terms / IP Handover Note
              </label>
              <textarea
                rows={2}
                value={profile.legalGdpr?.invoiceNotes || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    legalGdpr: { ...profile.legalGdpr, invoiceNotes: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSavingProfile}
            style={{
              padding: "12px 28px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: isSavingProfile ? "not-allowed" : "pointer",
              opacity: isSavingProfile ? 0.7 : 1,
            }}
          >
            {isSavingProfile
              ? "Saving All Settings..."
              : "Save Profile, Visual Assets, Billing & GDPR Legal Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
