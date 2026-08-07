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
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  phone: z
    .string({ error: "Phone is required" })
    .trim()
    .regex(
      /^\+?[0-9\s\-]{7,20}$/,
      "Please enter a valid phone number (7–20 digits, optional + prefix)"
    ),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the Privacy Policy to continue",
    }),

  destination: z.enum(REDIRECT_DESTINATIONS).default("free_telegram"),
});

export type LeadPayload = z.infer<typeof leadSchema>;
