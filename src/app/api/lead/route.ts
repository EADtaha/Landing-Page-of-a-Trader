import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validation/funnels.schema";

// ---------------------------------------------------------------------------
// POST /api/lead
// Validates the body, persists to Supabase leads table, and returns a
// redirectUrl so the client can forward the user to the right destination.
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // 2. Server-side validation
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { name, email, phone, consent } = parsed.data;

  // 3. Resolve redirect URL — FREE_TG_INVITE is the server-only canonical key
  const redirectUrl =
    process.env.FREE_TG_INVITE ??
    process.env.NEXT_PUBLIC_TG_FREE_INVITE ??
    "";

  // 4. Extract IP for abuse detection (best-effort)
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  // 5. Persist to Supabase — gracefully skip when credentials are missing
  const supabase = createServiceClient();

  if (!supabase) {
    console.info("[/api/lead] DEV FALLBACK — lead not persisted (no Supabase credentials):", {
      name,
      email,
      phone,
      consent,
    });
    return NextResponse.json({ success: true, redirectUrl }, { status: 200 });
  }

  const { error: leadError } = await supabase
    .from("leads")
    .upsert(
      {
        name,
        email,
        phone,
        consent,
        source: "free_telegram",
        ip_address: ip,
      },
      { onConflict: "email", ignoreDuplicates: false }
    )
    .select("id")
    .single();

  if (leadError) {
    // Log the error but do NOT block the client redirect
    console.error("[/api/lead] Supabase insert error:", leadError);
    return NextResponse.json(
      { success: true, warning: leadError.message, redirectUrl },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, redirectUrl }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
