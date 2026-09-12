"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// ─── Reveal hook ─────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("section-reveal"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface GoldPricingProps {
  onOpenLeadModal: () => void;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Check({ gold = false }: { gold?: boolean }) {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={gold ? "#d4a537" : "#6B7280"} strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      className="mt-0.5 flex-shrink-0" aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" rx="1"/>
      <path d="M3 10l9-7 9 7"/>
      <line x1="9" y1="21" x2="9" y2="10"/>
      <line x1="15" y1="21" x2="15" y2="10"/>
    </svg>
  );
}

function CryptoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.5 9H14a2 2 0 0 1 0 4H9.5V9z"/>
      <path d="M9.5 13H15a2 2 0 0 1 0 4H9.5v-4z"/>
      <line x1="9.5" y1="9" x2="9.5" y2="17"/>
      <line x1="12" y1="7" x2="12" y2="9"/>
      <line x1="12" y1="17" x2="12" y2="19"/>
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="8" y1="8" x2="16" y2="16"/>
      <line x1="16" y1="8" x2="8" y2="16"/>
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function GoldPricing({ onOpenLeadModal: _onOpenLeadModal }: GoldPricingProps) {
  const { t } = useLanguage();
  const ref = useReveal();
  const p = t.pricing;

  const trustItems = [
    { icon: <BankIcon />,   label: p.trust.bank   },
    { icon: <CryptoIcon />, label: p.trust.usdt   },
    { icon: <RefundIcon />, label: p.trust.refund },
  ];

  return (
    <section
      id="services"
      className="py-14 md:py-20 px-6 relative overflow-hidden"
      style={{ background: "#0a0a0c", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Ambient bokeh */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full flex justify-center items-center"
        aria-hidden="true"
      >
        <div
          className="w-[900px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(212,165,55,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="section-reveal text-center mb-14">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: "#d4a537", border: "1px solid rgba(212,165,55,0.25)", background: "rgba(212,165,55,0.06)" }}
          >
            Services &amp; Membership
          </div>
          <h2
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
          >
            {p.title}
          </h2>
          <p className="text-neutral-400 text-base max-w-2xl mx-auto">{p.subtitle}</p>
        </div>

        {/* 3-card grid — VIP Telegram is center/dominant */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

          {/* ── Card 1: Full Course (recessed, left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="opacity-90"
          >
            <div
              className="rounded-3xl p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#111114",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              {/* Spacer — aligns with badge on VIP card */}
              <div className="h-7 mb-1" />

              <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-3">
                {p.fullCourse.name}
              </h3>

              <div className="mb-5">
                <span className="line-through text-neutral-600 text-base mr-2 font-mono">
                  {p.fullCourse.strikethrough}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-black text-white"
                    style={{ fontSize: "2.4rem", lineHeight: 1, fontStyle: "italic" }}
                  >
                    {p.fullCourse.price}
                  </span>
                  <span className="text-neutral-500 text-sm">{p.fullCourse.period}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">{p.fullCourse.description}</p>

              <ul className="flex-1 space-y-3 mb-8">
                {p.fullCourse.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <Check />{f}
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout/full_course"
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-center block transition-all duration-200 hover:border-amber-400 hover:text-[#d4a537]"
                style={{
                  border: "1px solid rgba(212,165,55,0.35)",
                  color: "#d4a537",
                  background: "transparent",
                }}
              >
                {p.fullCourse.cta}
              </Link>
            </div>
          </motion.div>

          {/* ── Card 2: VIP Telegram (dominant, center) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="md:scale-105 md:-translate-y-2 z-10"
          >
            <div
              className="relative rounded-3xl p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#121217",
                border: "1px solid rgba(251,191,36,0.8)",
                boxShadow: "0 0 30px rgba(251,191,36,0.15), 0 20px 50px rgba(0,0,0,0.4)",
              }}
            >
              {/* MOST POPULAR badge */}
              <div className="mb-3">
                <span
                  className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #c99828, #e0b13e)",
                    color: "#0a0a0c",
                  }}
                >
                  MOST POPULAR
                </span>
              </div>

              <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-3">
                {p.vipTelegram.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-5">
                <span
                  className="font-display font-black"
                  style={{ fontSize: "2.4rem", lineHeight: 1, fontStyle: "italic", color: "#d4a537" }}
                >
                  {p.vipTelegram.price}
                </span>
                <span className="text-neutral-500 text-sm">{p.vipTelegram.period}</span>
              </div>

              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">{p.vipTelegram.description}</p>

              <ul className="flex-1 space-y-3 mb-8">
                {p.vipTelegram.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-200">
                    <Check gold />{f}
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout/vip_telegram"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-center block transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #c99828, #e0b13e)",
                  color: "#0a0a0c",
                  boxShadow: "0 8px 24px rgba(212,165,55,0.35)",
                }}
              >
                {p.vipTelegram.cta}
              </Link>
            </div>
          </motion.div>

          {/* ── Card 3: 1-on-1 Coaching (recessed, right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="opacity-90"
          >
            <div
              className="relative rounded-3xl p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#111114",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              {/* Badge */}
              <div className="mb-3">
                <span
                  className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(212,165,55,0.1)",
                    color: "#d4a537",
                    border: "1px solid rgba(212,165,55,0.3)",
                  }}
                >
                  {p.coaching.badge}
                </span>
              </div>

              <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-3">
                {p.coaching.name}
              </h3>

              <div className="mb-5">
                <span className="line-through text-neutral-600 text-base mr-2 font-mono">
                  {p.coaching.strikethrough}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-black text-white"
                    style={{ fontSize: "2.4rem", lineHeight: 1, fontStyle: "italic" }}
                  >
                    {p.coaching.price}
                  </span>
                  <span className="text-neutral-500 text-sm">{p.coaching.period}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">{p.coaching.description}</p>

              <ul className="flex-1 space-y-3 mb-8">
                {p.coaching.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <Check />{f}
                  </li>
                ))}
              </ul>

              <Link
                href="/apply"
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-center block transition-all duration-200 hover:border-amber-400 hover:text-[#d4a537]"
                style={{
                  border: "1px solid rgba(212,165,55,0.35)",
                  color: "#d4a537",
                  background: "transparent",
                }}
              >
                {p.coaching.cta}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <p className="text-neutral-400 text-sm font-medium">{p.trust.line}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustItems.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-neutral-400"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span style={{ color: "#d4a537" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
          <p className="text-neutral-700 text-xs text-center max-w-lg">{p.trust.legal}</p>
        </div>
      </div>
    </section>
  );
}
