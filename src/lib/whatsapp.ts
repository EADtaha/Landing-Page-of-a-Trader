import type { CheckoutInput, CoachingInput } from "@/lib/validation/funnels.schema";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIER_LABELS: Record<CheckoutInput["tier"], string> = {
  vip_telegram: "VIP Telegram Channel",
  full_course:  "Full Trading Course",
};

const METHOD_LABELS: Record<CheckoutInput["paymentMethod"], string> = {
  bank_transfer: "Bank Transfer",
  usdt_trc20:    "USDT (TRC-20)",
  binance:       "Binance Pay",
};

const EXPERIENCE_LABELS: Record<CoachingInput["experienceLevel"], string> = {
  just_starting:    "Just starting out",
  some_experience:  "Some experience",
  experienced:      "Experienced trader",
};

const ACCOUNT_LABELS: Record<CoachingInput["accountSize"], string> = {
  under_1k: "Under $1,000",
  "1k_5k":  "$1,000 – $5,000",
  "5k_20k": "$5,000 – $20,000",
  "20k_plus": "$20,000+",
};

const TIMING_LABELS: Record<CoachingInput["startTiming"], string> = {
  ready_now:      "Ready to start now",
  within_month:   "Within the next month",
  just_exploring: "Just exploring for now",
};

// ─── Message Builders ─────────────────────────────────────────────────────────

/**
 * Builds a WhatsApp message body for a checkout/payment inquiry.
 */
export function buildCheckoutMessage(
  buyerName: string,
  buyerPhone: string,
  tier: CheckoutInput["tier"],
  method: CheckoutInput["paymentMethod"]
): string {
  return [
    "*New Checkout Request*",
    "",
    `Name: ${buyerName}`,
    `Phone: ${buyerPhone}`,
    `Offer: ${TIER_LABELS[tier]}`,
    `Payment Method: ${METHOD_LABELS[method]}`,
    "",
    "Please confirm availability and send payment details. Thank you!",
  ].join("\n");
}

/**
 * Builds a WhatsApp message body for a coaching application.
 */
export function buildCoachingMessage(data: CoachingInput): string {
  const lines = [
    "*New Coaching Application*",
    "",
    `Full Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `Experience Level: ${EXPERIENCE_LABELS[data.experienceLevel]}`,
    `Account Size: ${ACCOUNT_LABELS[data.accountSize]}`,
    `Main Obstacle: ${data.obstacle}`,
    `Start Timing: ${TIMING_LABELS[data.startTiming]}`,
  ];

  if (data.notes?.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`);
  }

  lines.push("", "Please review and follow up as soon as possible. Thank you!");

  return lines.join("\n");
}

// ─── Link Builder ─────────────────────────────────────────────────────────────

/**
 * Returns a wa.me deep-link URL with the given message pre-filled.
 *
 * @param phoneE164  Recipient phone in E.164 format (digits only, no +).
 *                   Falls back to WA_NUMBER (server-only) then
 *                   NEXT_PUBLIC_WA_NUMBER (client-safe).
 * @param message    Plain-text message to pre-fill.
 */
export function waLink(phoneE164?: string, message?: string): string {
  const phone =
    phoneE164 ??
    process.env.WA_NUMBER ??
    process.env.NEXT_PUBLIC_WA_NUMBER ??
    "";

  // Strip any leading '+' in case the caller includes it
  const normalised = phone.replace(/^\+/, "");

  const base = `https://wa.me/${normalised}`;
  if (!message) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
}
