"use client";

import { useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import LeadModal from "@/components/LeadModal";
import type { RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

// Cubic-bezier tuple typed as a const so TS narrows it to
// [number, number, number, number] rather than number[].
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH, delay },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

// ---------------------------------------------------------------------------
// Background — animated candlestick grid (pure CSS/SVG, no canvas dep)
// ---------------------------------------------------------------------------

function CandlestickBackground() {
  // Static decorative bars that suggest a trading chart
  const candles = [
    { x: "8%",  high: 22, low: 78, open: 35, close: 62 },
    { x: "16%", high: 18, low: 82, open: 55, close: 30 },
    { x: "24%", high: 10, low: 70, open: 40, close: 65 },
    { x: "32%", high: 15, low: 75, open: 60, close: 38 },
    { x: "40%", high: 5,  low: 68, open: 35, close: 58 },
    { x: "48%", high: 12, low: 80, open: 50, close: 28 },
    { x: "56%", high: 8,  low: 72, open: 38, close: 62 },
    { x: "64%", high: 20, low: 85, open: 58, close: 35 },
    { x: "72%", high: 14, low: 76, open: 42, close: 66 },
    { x: "80%", high: 6,  low: 70, open: 52, close: 30 },
    { x: "88%", high: 10, low: 78, open: 32, close: 58 },
    { x: "96%", high: 18, low: 82, open: 55, close: 38 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgb(245_158_11/0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgb(16_185_129/0.06),transparent)]" />

      {/* Candlestick SVG overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {candles.map((c, i) => {
          const bullish = c.close > c.open;
          const color = bullish ? "#10b981" : "#ef4444";
          const bodyTop = Math.min(c.open, c.close);
          const bodyH = Math.abs(c.close - c.open);

          return (
            <g key={i} transform={`translate(${c.x.replace("%", "")} 0)`}>
              {/* Wick */}
              <line
                x1="0.5" y1={c.high} x2="0.5" y2={c.low}
                stroke={color} strokeWidth="0.3"
              />
              {/* Body */}
              <rect
                x="0" y={bodyTop}
                width="1" height={Math.max(bodyH, 0.5)}
                fill={color}
              />
            </g>
          );
        })}
        {/* Faint horizontal grid lines */}
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y}
            stroke="white" strokeWidth="0.15" strokeDasharray="2 3" />
        ))}
      </svg>

      {/* Bottom fade to bg */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-dark-900)] to-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat badge
// ---------------------------------------------------------------------------

interface StatBadgeProps {
  value: string;
  label: string;
  delay: number;
}

function StatBadge({ value, label, delay }: StatBadgeProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="glass-card flex flex-col items-center gap-0.5 px-5 py-3 text-center"
    >
      <span className="text-lg font-bold text-[var(--color-gold-400)]">
        {value}
      </span>
      <span className="text-[11px] text-slate-400">{label}</span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CTA button
// ---------------------------------------------------------------------------

interface CtaButtonProps {
  label: string;
  variant: "gold" | "ghost";
  icon?: React.ReactNode;
  onClick: () => void;
  delay: number;
}

function CtaButton({ label, variant, icon, onClick, delay }: CtaButtonProps) {
  return (
    <motion.button
      variants={fadeUp}
      custom={delay}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={[
        "flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200",
        variant === "gold" ? "btn-gold" : "btn-ghost",
      ].join(" ")}
    >
      {icon}
      {label}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [destination, setDestination] = useState<RedirectDestination>("free_telegram");

  const openModal = useCallback((dest: RedirectDestination) => {
    setDestination(dest);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* ── Section ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-dark-900)] px-4 py-24"
        aria-label="Hero section"
      >
        <CandlestickBackground />

        {/* ── Glass hero card ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-3xl"
        >
          <div className="glass-card-gold px-8 py-14 text-center sm:px-14">

            {/* Live badge */}
            <motion.div
              variants={fadeIn}
              custom={0}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-500)]/20 bg-[var(--color-gold-500)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-400)]"
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold-400)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold-500)]" />
              </span>
              Live Signals Active
            </motion.div>

            {/* H1 – §3.2 & SEO heading hierarchy */}
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-gradient-gold mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              Trade Smarter.
              <br />
              Grow Faster.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Professional Gold Trading Signals, Copy Trading &amp; VIP
              Mentorship.
            </motion.p>

            {/* ── CTA buttons ── */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {/* Join VIP → vip_telegram */}
              <CtaButton
                label="Join VIP"
                variant="gold"
                icon={<StarIcon />}
                onClick={() => openModal("vip_telegram")}
                delay={0.35}
              />

              {/* Start Copy Trading → copy_trading_telegram */}
              <CtaButton
                label="Start Copy Trading"
                variant="ghost"
                icon={<TelegramIcon />}
                onClick={() => openModal("copy_trading_telegram")}
                delay={0.4}
              />

              {/* Join Free Telegram → free_telegram */}
              <CtaButton
                label="Join Free Telegram"
                variant="ghost"
                icon={<TelegramIcon />}
                onClick={() => openModal("free_telegram")}
                delay={0.45}
              />
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              variants={fadeIn}
              custom={0.5}
              className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* ── Stat badges ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              <StatBadge value="2 400+"  label="Active Members"    delay={0.55} />
              <StatBadge value="87%"     label="Success Rate"      delay={0.6}  />
              <StatBadge value="5 Yrs"   label="Experience"        delay={0.65} />
              <StatBadge value="12 000+" label="Signals Sent"      delay={0.7}  />
            </motion.div>

            {/* WhatsApp coaching CTA – secondary */}
            <motion.p
              variants={fadeUp}
              custom={0.75}
              className="mt-8 text-xs text-slate-500"
            >
              Looking for personalised coaching?{" "}
              <button
                type="button"
                onClick={() => openModal("mentorship_whatsapp")}
                className="inline-flex items-center gap-1 text-[var(--color-gold-400)] underline underline-offset-2 transition-colors hover:text-[var(--color-gold-300)]"
              >
                Message us on WhatsApp
                <WhatsAppIcon />
              </button>
            </motion.p>

          </div>
        </motion.div>

        {/* Subtle bottom border glow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-500)]/30 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ── Lead capture modal ── */}
      <LeadModal
        isOpen={modalOpen}
        onClose={closeModal}
        destination={destination}
      />
    </>
  );
}
