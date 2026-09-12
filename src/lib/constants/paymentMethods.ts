import type { CheckoutTier } from "@/lib/validation/funnels.schema";

// ─── Account Holder ───────────────────────────────────────────────────────────

export const ACCOUNT_HOLDER =
  process.env.NEXT_PUBLIC_BANK_HOLDER ?? "YASSINE ELAROUI";

// ─── Bank Transfer Options ────────────────────────────────────────────────────

export interface BankOption {
  id: string;
  name: string;
  rib: string;
}

export const BANK_OPTIONS: BankOption[] = [
  {
    id:   "cih",
    name: "CIH BANK",
    rib:  process.env.NEXT_PUBLIC_CIH_RIB ?? "230780590427221101410020",
  },
  {
    id:   "attijari",
    name: "Attijariwafa Bank",
    rib:  process.env.NEXT_PUBLIC_ATTIJARI_RIB ?? "007780000299500030743788",
  },
];

// ─── Crypto Options ───────────────────────────────────────────────────────────

export const USDT_TRC20 = {
  address: process.env.NEXT_PUBLIC_USDT_TRC20_ADDRESS ?? "TFpWnfutXv6CCTizLZHnBFix7TsXAn6oLk",
  network: "TRC20 (Tron)",
} as const;

export const BINANCE = {
  payId: process.env.NEXT_PUBLIC_BINANCE_PAY_ID ?? "569042414",
} as const;

// ─── Service Tiers ────────────────────────────────────────────────────────────

export interface TierMeta {
  name:        string;
  price:       string;
  period:      string;
  description: string;
}

export const TIER_META: Record<CheckoutTier, TierMeta> = {
  vip_telegram: {
    name:        "VIP Telegram Membership",
    price:       "$50",
    period:      "/ month",
    description: "Institutional XAU/USD setups, daily market reviews, and trade execution.",
  },
  full_course: {
    name:        "Full Video Course",
    price:       "$110",
    period:      "one-time",
    description: "Complete ICT trading framework from foundation to advanced setups.",
  },
};

// ─── Coaching Price ───────────────────────────────────────────────────────────

export const COACHING_PRICE = "$400";
