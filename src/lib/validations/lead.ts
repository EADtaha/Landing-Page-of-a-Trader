import { z } from "zod";

/**
 * Destination keys must match the redirect_logs.destination CHECK constraint
 * defined in the migration script.
 */
export const REDIRECT_DESTINATIONS = [
  "free_telegram",
  "vip_telegram",
  "copy_trading_telegram",
  "mentorship_whatsapp",
  "video_course_whatsapp",
] as const;

export type RedirectDestination = (typeof REDIRECT_DESTINATIONS)[number];

export const leadSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .regex(
      /^\+?[0-9\s\-]{7,20}$/,
      "Please enter a valid phone number (7–20 digits, optional + prefix)"
    ),

  // BUG FIX #1: Zod v4 removed the second-argument errorMap on z.literal.
  // Use z.boolean() + refine to produce the custom error message instead.
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the Privacy Policy to continue",
    }),

  /**
   * Which CTA triggered this submission.
   * Determines the redirect URL returned to the client.
   * Defaults to 'free_telegram' (hero hook form – §4.2.1).
   */
  destination: z.enum(REDIRECT_DESTINATIONS).default("free_telegram"),

  /**
   * Captcha token from Cloudflare Turnstile or reCAPTCHA v3 (§4.2.1).
   * BUG FIX #2 & #3: Removed process.env check from inside the schema —
   * process.env is not reliably available in client bundles, and the
   * production enforcement belongs in route.ts (server-side only).
   * The field is simply optional here; route.ts enforces it in production.
   */
  captchaToken: z.string().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;
