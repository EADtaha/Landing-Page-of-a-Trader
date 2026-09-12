import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHECKOUT_TIERS, type CheckoutTier } from "@/lib/validation/funnels.schema";
import { TIER_META } from "@/lib/constants/paymentMethods";
import CheckoutClient from "./CheckoutClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier } = await params;
  const isValid = (CHECKOUT_TIERS as readonly string[]).includes(tier);
  const meta = isValid ? TIER_META[tier as CheckoutTier] : null;
  return {
    title: meta ? `Checkout — ${meta.name} | YassICTFX` : "Checkout | YassICTFX",
  };
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
// The full layout lives in CheckoutClient ("use client"), which uses an
// isMounted guard so CheckoutPanel only renders after hydration — preventing
// browser-extension attribute mismatches (bis_skin_checked, etc.).

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { tier } = await params;

  if (!(CHECKOUT_TIERS as readonly string[]).includes(tier)) {
    notFound();
  }

  return <CheckoutClient tier={tier as CheckoutTier} />;
}
