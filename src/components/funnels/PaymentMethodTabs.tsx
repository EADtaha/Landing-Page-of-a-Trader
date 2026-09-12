"use client";

import { useState } from "react";
import Image from "next/image";
import type { PaymentMethod } from "@/lib/validation/funnels.schema";
import {
  ACCOUNT_HOLDER,
  BANK_OPTIONS,
  USDT_TRC20,
  BINANCE,
} from "@/lib/constants/paymentMethods";
import CopyButton from "@/components/ui/CopyButton";

// ─── Bank logo map — keyed by bank id ────────────────────────────────────────

const BANK_LOGOS: Record<string, { src: string; width: number; height: number }> = {
  cih:      { src: "/assets/cih.png", width: 100, height: 32 },
  attijari: { src: "/assets/attijari.webp", width: 110, height: 32 },
};

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS: { value: PaymentMethod; label: string }[] = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "usdt_trc20",    label: "USDT • TRC20"  },
  { value: "binance",       label: "Binance"        },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface PaymentMethodTabsProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaymentMethodTabs({ value, onChange }: PaymentMethodTabsProps) {
  const [selectedBank, setSelectedBank] = useState(BANK_OPTIONS[0].id);
  const activeBank = BANK_OPTIONS.find((b) => b.id === selectedBank) ?? BANK_OPTIONS[0];

  return (
    <div className="space-y-4">
      {/* Method tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => {
          const active = tab.value === value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={[
                "px-4 py-2 rounded-lg text-sm font-medium transition border",
                active
                  ? "bg-amber-400/10 border-amber-400 text-amber-400"
                  : "bg-[#16161a] border-white/10 text-neutral-400 hover:border-white/20 hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">

        {/* ── Bank Transfer ── */}
        {value === "bank_transfer" && (
          <>
            {/* Bank selector — logo pills */}
            <div className="flex gap-3 my-1 flex-wrap">
              {/* CIH Bank */}
              <button
                type="button"
                onClick={() => setSelectedBank("cih")}
                className={[
                  "h-14 min-w-[140px] px-4 py-2 rounded-xl border flex items-center justify-center transition-all",
                  selectedBank === "cih"
                    ? "border-amber-400 bg-amber-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/20",
                ].join(" ")}
              >
                {/* Wider bounding box + scale-150 compensates for CIH PNG transparent padding */}
                <div className="relative h-8 w-24 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/assets/cih.png"
                    alt="CIH Bank"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </button>

              {/* Attijariwafa Bank */}
              <button
                type="button"
                onClick={() => setSelectedBank("attijari")}
                className={[
                  "h-14 min-w-[140px] px-4 py-2 rounded-xl border flex items-center justify-center transition-all",
                  selectedBank === "attijari"
                    ? "border-amber-400 bg-amber-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/20",
                ].join(" ")}
              >
                <div className="relative h-7 w-24 flex items-center justify-center">
                  <Image
                    src="/assets/attijari.webp"
                    alt="Attijariwafa Bank"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </button>
            </div>

            {/* Selected bank logo + account holder */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Badge: fixed container, logo scales consistently for both banks */}
                <div className="relative h-10 w-20 px-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={selectedBank === "cih" ? "/assets/cih.png" : "/assets/attijari.webp"}
                    alt={selectedBank === "cih" ? "CIH Bank" : "Attijariwafa Bank"}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-0.5">
                    Account Holder
                  </p>
                  <p className="text-sm font-medium text-white">{ACCOUNT_HOLDER}</p>
                </div>
              </div>
              <CopyButton textToCopy={ACCOUNT_HOLDER} label="Copy" />
            </div>

            {/* RIB */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-0.5">
                  {activeBank.name} — RIB
                </p>
                <p className="text-sm font-mono text-white break-all">{activeBank.rib}</p>
              </div>
              <CopyButton textToCopy={activeBank.rib} label="Copy" className="shrink-0" />
            </div>
          </>
        )}

        {/* ── USDT TRC20 ── */}
        {value === "usdt_trc20" && (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    Wallet Address
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 text-emerald-400 bg-emerald-400/5 font-medium">
                    {USDT_TRC20.network}
                  </span>
                </div>
                <p className="text-sm font-mono text-white break-all">{USDT_TRC20.address}</p>
              </div>
              <CopyButton textToCopy={USDT_TRC20.address} label="Copy" className="shrink-0 mt-5" />
            </div>
            <p className="text-xs text-neutral-500">
              Send only USDT on the TRC20 (Tron) network. Other networks will result in permanent loss.
            </p>
          </>
        )}

        {/* ── Binance ── */}
        {value === "binance" && (
          <>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-0.5">
                  Binance Pay ID
                </p>
                <p className="text-sm font-mono text-white">{BINANCE.payId}</p>
              </div>
              <CopyButton textToCopy={BINANCE.payId} label="Copy" />
            </div>
            <p className="text-xs text-neutral-500">
              Open Binance app → Pay → Send → enter the Pay ID above.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
