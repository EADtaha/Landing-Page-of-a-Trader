/**
 * Client-safe routing constants derived from NEXT_PUBLIC_ environment variables.
 * All values are safe to import in "use client" components.
 *
 * Server-only keys (WA_NUMBER, FREE_TG_INVITE) are intentionally excluded here;
 * they are consumed directly in /api/* route handlers.
 */

/** Free Telegram group — used by FloatingTelegramBtn, Hero CTAs, and LeadCaptureModal redirect */
export const FREE_TG_URL =
  process.env.NEXT_PUBLIC_TG_FREE_INVITE ?? "";

/** VIP / Signals Telegram channel */
export const VIP_TG_URL =
  process.env.NEXT_PUBLIC_TG_VIP_LINK ?? "";

/** WhatsApp base URL (wa.me/number) — append ?text= for pre-filled messages */
export const WA_BASE_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "";

/** Bare WhatsApp number (digits only, no +) — used by waLink() and direct links */
export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

/**
 * Builds a wa.me deep-link with an optional pre-filled message.
 * Uses NEXT_PUBLIC_WA_NUMBER from .env.local.
 */
export function buildWaUrl(message?: string): string {
  const number = WA_NUMBER;
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
