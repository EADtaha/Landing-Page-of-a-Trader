import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { coachingSchema } from "@/lib/validation/funnels.schema";
import { buildCoachingMessage, waLink } from "@/lib/whatsapp";

// ---------------------------------------------------------------------------
// POST /api/coaching
// Validates application, persists to Supabase, returns WhatsApp URL.
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
  const parsed = coachingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // 3. Build WhatsApp URL
  const message = buildCoachingMessage(data);
  const whatsappUrl = waLink(undefined, message);

  // 4. Persist — gracefully skip when credentials are missing
  const supabase = createServiceClient();

  if (!supabase) {
    console.info(
      "[/api/coaching] DEV FALLBACK — application not persisted (no Supabase credentials):",
      { fullName: data.fullName, email: data.email }
    );
    return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
  }

  const { error: insertError } = await supabase
    .from("coaching_applications")
    .insert({
      full_name:        data.fullName,
      email:            data.email,
      country:          data.country,
      experience_level: data.experienceLevel,
      account_size:     data.accountSize,
      obstacle:         data.obstacle,
      start_timing:     data.startTiming,
      notes:            data.notes || null,
      status:           "submitted",
    });

  if (insertError) {
    // Log but never block the user
    console.error("[/api/coaching] Supabase insert error:", insertError);
    return NextResponse.json(
      { success: true, warning: insertError.message, whatsappUrl },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
