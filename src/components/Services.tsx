"use client";

import { motion, type Variants } from "framer-motion";
import {
  BellRing,
  GraduationCap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const EASE = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const cardAnim: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------

const FEATURES = [
  {
    icon: BellRing,
    color:       "text-cyan-400",
    iconBg:      "bg-cyan-500/15 border-cyan-500/25",
    glowColor:   "rgba(6,182,212,0.10)",
    title:       "Daily ICT Setup Signals",
    description:
      "Real-time Telegram alerts with institutional-grade entry zones, stop-loss, and take-profit levels. Every signal backed by order-block and liquidity analysis on XAU/USD and major Forex pairs.",
    bullets: [
      "Precise entry, SL & TP on every alert",
      "London & New York session coverage",
      "Telegram + Discord delivery",
    ],
  },
  {
    icon: GraduationCap,
    color:       "text-emerald-400",
    iconBg:      "bg-emerald-500/15 border-emerald-500/25",
    glowColor:   "rgba(16,185,129,0.10)",
    title:       "1-on-1 Mentorship & Live Webinars",
    description:
      "Weekly live chart breakdowns and dedicated coaching sessions. From total beginner to consistent trader — structured curriculum covering ICT concepts, SMC, and trade management.",
    bullets: [
      "Weekly live trading sessions",
      "Personal chart review & feedback",
      "SMC, ICT & Price Action curriculum",
    ],
  },
  {
    icon: ShieldCheck,
    color:       "text-cyan-400",
    iconBg:      "bg-cyan-500/15 border-cyan-500/25",
    glowColor:   "rgba(6,182,212,0.10)",
    title:       "Risk Management Framework",
    description:
      "A professional capital-protection system: position sizing calculator, max daily drawdown rules, and a structured recovery protocol that keeps your account safe during losing streaks.",
    bullets: [
      "Position sizing calculator",
      "Max 1–2% risk per trade rules",
      "Drawdown recovery protocol",
    ],
  },
  {
    icon: BarChart3,
    color:       "text-emerald-400",
    iconBg:      "bg-emerald-500/15 border-emerald-500/25",
    glowColor:   "rgba(16,185,129,0.10)",
    title:       "Institutional Order Flow Analysis",
    description:
      "Deep-dive market structure breakdowns delivered weekly. Learn to read smart money footprints: order blocks, fair value gaps, inducement zones, and liquidity sweeps across multiple timeframes.",
    bullets: [
      "Order blocks & fair value gaps",
      "Liquidity sweep identification",
      "Multi-timeframe confluence guides",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  const Icon = feature.icon;
  return (
    <motion.article
      variants={cardAnim}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-slate-900/60 p-7 backdrop-blur-sm"
      style={{ boxShadow: `0 0 50px ${feature.glowColor}, 0 8px 32px rgba(0,0,0,0.4)` }}
    >
      {/* Icon */}
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconBg} ${feature.color}`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      {/* Title — H3 for heading hierarchy */}
      <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
        {feature.description}
      </p>

      {/* Bullet list */}
      <ul className="space-y-2">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`mt-0.5 h-4 w-4 shrink-0 ${feature.color}`}
              aria-hidden="true"
            >
              <path
                d="M3 8l3.5 3.5 6.5-7"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {b}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Core Features
          </p>
          <h2
            id="services-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Everything You Need to{" "}
            <span className="text-gradient-cyan">Trade Like an Institution</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Four pillars that turn raw market exposure into a systematic, repeatable edge.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
