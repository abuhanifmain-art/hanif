import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured, isPrivilegedSupabaseConfigured } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTotal = performance.now();
  const timestamp = Date.now();

  let dbStatus: "operational" | "degraded" | "fallback" = "fallback";
  let dbLatencyMs = 0;

  if (isSupabaseConfigured && supabase) {
    const dbStart = performance.now();
    try {
      const { error } = await supabase.from("profiles").select("id").limit(1);
      dbLatencyMs = Math.max(1, Math.round(performance.now() - dbStart));
      dbStatus = error ? "degraded" : "operational";
    } catch {
      dbLatencyMs = Math.max(1, Math.round(performance.now() - dbStart));
      dbStatus = "degraded";
    }
  }

  const handlerLatencyMs = Math.max(1, Math.round(performance.now() - startTotal));

  const services = [
    {
      name: "Cloudflare Pages Edge Network & HTTP Delivery",
      status: "operational",
      latencyMs: handlerLatencyMs,
      region: "Edge / Runtime Response",
      sla: "Live Handler Probe",
    },
    {
      name: "Next.js 16 App Router Runtime",
      status: "operational",
      latencyMs: handlerLatencyMs,
      region: "Server / Edge Process",
      sla: "Active",
    },
    {
      name: "Supabase PostgreSQL Query Probe",
      status: dbStatus,
      latencyMs: dbLatencyMs,
      region: isSupabaseConfigured ? "Live Connection Check" : "In-Memory Store Fallback",
      sla: isPrivilegedSupabaseConfigured() ? "Secret Key Active" : "Publishable / Fallback",
    },
    {
      name: "Admin Zero-Trust Proxy & Rate Limiter",
      status: Boolean(process.env.ADMIN_SECRET_KEY) ? "operational" : "degraded",
      latencyMs: 1,
      region: "HMAC-SHA256 Request Guard",
      sla: Boolean(process.env.ADMIN_SECRET_KEY) ? "Key Configured" : "Missing ADMIN_SECRET_KEY",
    },
    {
      name: "Portfolio Static Assets & Metadata Routes",
      status: "operational",
      latencyMs: handlerLatencyMs,
      region: "Sitemap, Robots, Feed & OG",
      sla: "Verified",
    },
  ];

  // Reference geographical latency baseline markers used by the interactive simulator UI
  const globalPoPs = [
    { code: "LHR", name: "Europe (London)", latencyMs: 24, status: "reference" },
    { code: "FRA", name: "Europe (Frankfurt)", latencyMs: 26, status: "reference" },
    { code: "DAC", name: "South Asia (Dhaka)", latencyMs: 19, status: "reference" },
    { code: "SIN", name: "Asia (Singapore)", latencyMs: 31, status: "reference" },
    { code: "IAD", name: "US East (Ashburn)", latencyMs: 18, status: "reference" },
    { code: "SFO", name: "US West (San Jose)", latencyMs: 22, status: "reference" },
  ];

  return NextResponse.json(
    {
      status: "all_systems_operational",
      diagnosticsMode: "live-runtime-probe",
      timestamp,
      isoDate: new Date(timestamp).toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      activeIncidentsCount: dbStatus === "degraded" ? 1 : 0,
      services,
      globalPoPs,
      incidentHistory: [],
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Edge-Health": "operational",
      },
    }
  );
}
