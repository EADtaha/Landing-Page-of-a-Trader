import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { leadSchema, type RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Redirect URL resolver
// Maps a destination key to the actual URL from environment variables.
// All placeholder values must be configured before deployment (§4.2.4).
// Returns null (with a console warning) when env vars are not yet set so the
// dev fallback path can still return a meaningful response.
// ---------------------------------------------------------------------------

function buildRedirectUrl(destination: RedirectDestination): string | null {
  // WA_NUMBER is the server-side var; fall back to NEXT_PUBLIC_WA_NUMBER
  // so the route works even if only the public alias was set in the deployment env.
  const WA_NUMBER =
    process.env.WA_NUMBER ||
    process.env.NEXT_PUBLIC_WA_NUMBER ||
    "";
  const TG_VIP_LINK    = process.env.TG_VIP_LINK    || process.env.NEXT_PUBLIC_TG_VIP_LINK    || "";
  const FREE_TG_INVITE = process.env.FREE_TG_INVITE  || process.env.NEXT_PUBLIC_TG_FREE_INVITE || "";

  switch (destination) {
    case "free_telegram":
      if (!FREE_TG_INVITE) {
        console.warn("[/api/lead] FREE_TG_INVITE is not configured");
        return null;
      }
      return FREE_TG_INVITE;

    case "vip_telegram":
      if (!TG_VIP_LINK) {
        console.warn("[/api/lead] TG_VIP_LINK is not configured");
        return null;
      }
      return TG_VIP_LINK;

    case "mentorship_whatsapp":
      if (!WA_NUMBER) {
        console.warn("[/api/lead] WA_NUMBER is not configured");
        return null;
      }
      return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        "Hello, I would like information about the 1-on-1 Coaching"
      )}`;

    case "video_course_whatsapp":
      if (!WA_NUMBER) {
        console.warn("[/api/lead] WA_NUMBER is not configured");
        return null;
      }
      return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        "Hello, I would like information about the Video Course"
      )}`;

    default: {
      const _exhaustive: never = destination;
      console.error(`[/api/lead] Unhandled destination: ${_exhaustive}`);
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// POST /api/lead
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // 1. Parse JSON body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    return await handlePost(req, body);
  } catch (error) {
    console.error("--- LEAD API ERROR ---", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

async function handlePost(req: NextRequest, body: unknown): Promise<Response> {

  // 2. Validate with Zod
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

  const { name, email, phone, consent, destination } =
    parsed.data;

  // 3. Resolve redirect URL — null means the env var is not configured yet.
  //    In production this is a hard error; in dev we still return success so
  //    the lead capture flow can be tested without all env vars set.
  const redirectUrl = buildRedirectUrl(destination);

  if (!redirectUrl) {
    // Log the missing config regardless of environment
    console.warn(
      `[/api/lead] No redirect URL resolved for destination "${destination}" — ` +
        "ensure WA_NUMBER / TG_VIP_LINK / FREE_TG_INVITE are set in environment variables."
    );
    // Return success with null redirectUrl — the client (GoldLeadModal) will
    // fall back to its own resolveRedirectUrl() so the user still gets redirected.
    // We never hard-block the user just because a server env var is missing.
  }

  // 5. Extract real IP for abuse detection
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  // 6. Persist to Supabase — gracefully skip when credentials are missing
  const supabase = createServiceClient();

  if (!supabase) {
    // Dev fallback: log the lead to the console so you can verify the payload
    console.info("[/api/lead] DEV FALLBACK — lead not persisted to Supabase:", {
      name,
      email,
      phone,
      consent,
      destination,
      ip,
    });

    return NextResponse.json(
      { success: true, redirectUrl: redirectUrl ?? null },
      { status: 200 }
    );
  }

  // 7. Upsert lead — idempotent on email
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .upsert(
      {
        name,
        email,
        phone,
        consent,
        source: destination,
        ip_address: ip,
      },
      {
        onConflict: "email",
        ignoreDuplicates: false,
      }
    )
    .select("id")
    .single();

  if (leadError) {
    // Print the exact Supabase error object to the terminal for diagnosis
    console.error("Supabase DB Insert Error:", leadError);
    // Dev-friendly fallback: return success with a warning so the form still
    // redirects the user even when the DB write fails (e.g. table not created yet)
    return NextResponse.json(
      {
        success: true,
        warning: leadError.message,
        redirectUrl: redirectUrl ?? null,
      },
      { status: 200 }
    );
  }

  // 8. Log the redirect — fire-and-forget, non-fatal
  if (redirectUrl) {
    supabase
      .from("redirect_logs")
      .insert({
        lead_id:      lead.id,
        destination,
        resolved_url: redirectUrl,
        user_agent:   req.headers.get("user-agent"),
        ip_address:   ip,
      })
      .then(({ error }) => {
        if (error) {
          console.error("[/api/lead] redirect_logs insert error:", {
            message: error.message,
            code:    error.code,
          });
        }
      });
  }

  // 9. Return success with the redirect URL
  return NextResponse.json(
    { success: true, redirectUrl: redirectUrl ?? null },
    { status: 200 }
  );
} // end handlePost

// Only POST is handled on this route
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
