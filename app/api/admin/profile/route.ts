import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isRequestAuthorized } from "../../../lib/admin-auth";
import { getProfile, updateProfileSettings } from "../../../lib/portfolio-store";
import { isPrivilegedSupabaseConfigured } from "../../../lib/supabase-admin";

export async function GET(req: NextRequest) {
  const isAuth = await isRequestAuthorized(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const profile = await getProfile();
    return NextResponse.json({
      success: true,
      profile,
      persistenceMode: isPrivilegedSupabaseConfigured() ? "supabase-secret-key" : "local-fallback",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load profile settings.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await isRequestAuthorized(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid profile payload." },
        { status: 400 }
      );
    }

    const updated = await updateProfileSettings(body);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/privacy");
      revalidatePath("/terms");
      revalidatePath("/resume");
    } catch {
      // Safe no-op in isolated unit test environments without Next request store
    }

    return NextResponse.json({
      success: true,
      profile: updated,
      message: "Profile, visual assets, and GDPR/legal settings saved.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update profile settings.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
