import { z } from "zod";

// ─── Lead Schema ─────────────────────────────────────────────────────────────
// Used by the top-of-funnel lead capture modal (POST /api/lead)

export const leadSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  phone: z
    .string({ error: "Phone is required" })
    .trim()
    .min(8, "Phone must be at least 8 characters"),

  consent: z.boolean().default(true),
});

export type LeadInput = z.infer<typeof leadSchema>;

// ─── Checkout Schema ──────────────────────────────────────────────────────────
// Submitted when the user selects a paid tier and proceeds to checkout

export const CHECKOUT_TIERS = ["vip_telegram", "full_course"] as const;
export type CheckoutTier = (typeof CHECKOUT_TIERS)[number];

export const PAYMENT_METHODS = [
  "bank_transfer",
  "usdt_trc20",
  "binance",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const checkoutSchema = z.object({
  tier: z.enum(CHECKOUT_TIERS),
  paymentMethod: z.enum(PAYMENT_METHODS),
  buyerName: z
    .string({ error: "Buyer name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),
  buyerPhone: z
    .string({ error: "Buyer phone is required" })
    .trim()
    .min(8, "Phone must be at least 8 characters"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ─── Coaching Application Schema ──────────────────────────────────────────────
// Multi-step application form for the 1-on-1 coaching offer

export const EXPERIENCE_LEVELS = [
  "just_starting",
  "some_experience",
  "experienced",
] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const ACCOUNT_SIZES = [
  "under_1k",
  "1k_5k",
  "5k_20k",
  "20k_plus",
] as const;
export type AccountSize = (typeof ACCOUNT_SIZES)[number];

export const START_TIMINGS = [
  "ready_now",
  "within_month",
  "just_exploring",
] as const;
export type StartTiming = (typeof START_TIMINGS)[number];

export const coachingSchema = z.object({
  fullName: z
    .string({ error: "Full name is required" })
    .trim()
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  country: z
    .string({ error: "Country is required" })
    .trim()
    .min(2, "Country must be at least 2 characters"),

  experienceLevel: z.enum(EXPERIENCE_LEVELS),

  accountSize: z.enum(ACCOUNT_SIZES),

  obstacle: z
    .string({ error: "Please describe your main obstacle" })
    .trim()
    .min(10, "Please provide at least 10 characters"),

  startTiming: z.enum(START_TIMINGS),

  notes: z.string().trim().optional(),
});

export type CoachingInput = z.infer<typeof coachingSchema>;
