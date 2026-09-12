"use client";

import { useRef, useState } from "react";
import { MessageCircle, AlertCircle } from "lucide-react";
import type { CheckoutTier, PaymentMethod } from "@/lib/validation/funnels.schema";
import { TIER_META } from "@/lib/constants/paymentMethods";
import PaymentMethodTabs from "@/components/funnels/PaymentMethodTabs";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckoutPanelProps {
  tier: CheckoutTier;
}

type ApiSuccessResponse = { success: true; whatsappUrl: string };
type ApiErrorResponse = { error: string; fields?: Record<string, string[]> };

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutPanel({ tier }: CheckoutPanelProps) {
  const meta = TIER_META[tier];

  // Form state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank_transfer");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Typed refs
  const nameRef: React.RefObject<HTMLInputElement | null> = useRef(null);
  const phoneRef: React.RefObject<HTMLInputElement | null> = useRef(null);

  function validate(): boolean {
    let valid = true;
    if (buyerName.trim().length < 2) {
      setNameError("Please enter your full name (at least 2 characters).");
      valid = false;
    } else {
      setNameError(null);
    }
    if (buyerPhone.trim().length < 8) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    } else {
      setPhoneError(null);
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, paymentMethod, buyerName, buyerPhone }),
      });

      const data: ApiSuccessResponse | ApiErrorResponse = await res.json();

      if (!res.ok || "error" in data) {
        const err = data as ApiErrorResponse;
        // Surface field errors if returned
        if (err.fields?.buyerName) setNameError(err.fields.buyerName[0]);
        if (err.fields?.buyerPhone) setPhoneError(err.fields.buyerPhone[0]);
        setApiError(err.error ?? "Something went wrong. Please try again.");
        return;
      }

      window.open((data as ApiSuccessResponse).whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">

      {/* ── Left: Tier summary card ── */}
      <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 h-fit">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-semibold tracking-widest uppercase w-fit">
          Order Summary
        </div>

        {/* Tier name & price */}
        <div>
          <h2 className="text-white font-bold text-lg leading-snug">{meta.name}</h2>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-amber-400 font-black text-3xl">{meta.price}</span>
            <span className="text-neutral-500 text-sm">{meta.period}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed">{meta.description}</p>

        {/* Activation notice */}
        <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
          <AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            Access is activated manually within{" "}
            <span className="text-white font-medium">2 hours</span> of payment
            confirmation via WhatsApp.
          </p>
        </div>
      </div>

      {/* ── Right: Payment form ── */}
      <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 space-y-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 text-xs font-bold shrink-0">
                1
              </span>
              <h3 className="text-white font-semibold text-sm">Choose how to pay</h3>
            </div>
            <PaymentMethodTabs value={paymentMethod} onChange={setPaymentMethod} />
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 text-xs font-bold shrink-0">
                2
              </span>
              <h3 className="text-white font-semibold text-sm">Send proof &amp; get access</h3>
            </div>

            {/* Name */}
            <div>
              <input
                ref={nameRef}
                type="text"
                placeholder="Your Full Name"
                value={buyerName}
                onChange={(e) => {
                  setBuyerName(e.target.value);
                  if (nameError) setNameError(null);
                }}
                autoComplete="name"
                className={[
                  "w-full bg-white/5 text-white placeholder:text-white/25 text-sm",
                  "px-4 py-3 rounded-xl outline-none transition-colors border",
                  nameError
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-amber-400/40",
                ].join(" ")}
              />
              {nameError && (
                <p className="text-red-400 text-xs mt-1" role="alert">{nameError}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                ref={phoneRef}
                type="tel"
                placeholder="Your Phone / WhatsApp Number"
                value={buyerPhone}
                onChange={(e) => {
                  setBuyerPhone(e.target.value);
                  if (phoneError) setPhoneError(null);
                }}
                autoComplete="tel"
                className={[
                  "w-full bg-white/5 text-white placeholder:text-white/25 text-sm",
                  "px-4 py-3 rounded-xl outline-none transition-colors border",
                  phoneError
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-amber-400/40",
                ].join(" ")}
              />
              {phoneError && (
                <p className="text-red-400 text-xs mt-1" role="alert">{phoneError}</p>
              )}
            </div>

            {/* Instruction notice */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
              <MessageCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs text-neutral-400 leading-relaxed">
                After sending your payment, attach your{" "}
                <span className="text-white">receipt or transaction ID</span> on WhatsApp.
                Access is activated within 2 hours.
              </p>
            </div>

            {/* API error */}
            {apiError && (
              <div
                role="alert"
                className="rounded-xl px-4 py-3 text-sm text-red-300 bg-red-500/8 border border-red-500/20"
              >
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#e0b13e] hover:bg-[#f0c454] text-black font-semibold py-3.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  <span>Opening WhatsApp…</span>
                </>
              ) : (
                <>
                  <MessageCircle size={16} strokeWidth={2} />
                  <span>Send proof on WhatsApp →</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
