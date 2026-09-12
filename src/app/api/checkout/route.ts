import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validation/funnels.schema";
import { buildCheckoutMessage, waLink } from "@/lib/whatsapp";

// ---------------------------------------------------------------------------
// POST /api/checkout
// Validates checkout intent, persists to Supabase, returns WhatsApp URL.
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
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { tier, paymentMethod, buyerName, buyerPhone } = parsed.data;

  // 3. Build WhatsApp URL
  const message = buildCheckoutMessage(buyerName, buyerPhone, tier, paymentMethod);
  const whatsappUrl = waLink(undefined, message);

  // 4. Persist intent — gracefully skip when credentials are missing
  const supabase = createServiceClient();

  if (!supabase) {
    console.info("[/api/checkout] DEV FALLBACK — intent not persisted (no Supabase credentials):", {
      tier,
      paymentMethod,
      buyerName,
      buyerPhone,
    });
    return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
  }

  const { error: insertError } = await supabase
    .from("checkout_intents")
    .insert({
      tier,
      payment_method: paymentMethod,
      buyer_name:     buyerName,
      buyer_phone:    buyerPhone,
      status:         "pending_proof",
    });

  if (insertError) {
    // Log but do NOT block the user — they can still proceed via WhatsApp
    console.error("[/api/checkout] Supabase insert error:", insertError);
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
