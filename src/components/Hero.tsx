"use client";

import { useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Play, ArrowRight, TrendingUp, Users, Trophy, Clock } from "lucide-react";
import LeadModal from "@/components/LeadModal";
import type { RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const EASE = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (d: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: d },
  }),
};

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

const STATS = [
  { icon: Trophy,    value: "85%+",   label: "Win Rate*",      color: "text-emerald-400" },
  { icon: Users,     value: "5,000+", label: "Active Traders", color: "text-cyan-400"    },
  { icon: Clock,     value: "24/7",   label: "VIP Support",    color: "text-cyan-400"    },
  { icon: TrendingUp,value: "1:3+",   label: "Avg Risk:Reward",color: "text-emerald-400" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function Hero() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [destination, setDestination] = useState<RedirectDestination>("free_telegram");

  const open  = useCallback((d: RedirectDestination) => { setDestination(d); setModalOpen(true);  }, []);
  const close = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <section
        id="hero"
        aria-label="Hero — Yass-ICTFX"
        className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-24 pt-28 sm:pt-32"
      >
        {/* Background radial glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-emerald-500/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-600/5 blur-3xl" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(6 182 212 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(6 182 212 / 1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">

          {/* ── Live badge ── */}
          <motion.div
            initial="hidden" animate="visible"
            variants={fadeIn} custom={0}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              ICT Institutional Signals — Live Now
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.div
            initial="hidden" animate="visible"
            className="mb-6 text-center"
          >
            <motion.h1
              variants={fadeUp} custom={0.08}
              className="text-gradient-cyan mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Institutional Precision.<br />
              <span className="text-white">Financial Freedom.</span>
            </motion.h1>
          </motion.div>

          {/* ── Subheadline ── */}
          <motion.p
            initial="hidden" animate="visible"
            variants={fadeUp} custom={0.16}
            className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Daily ICT-based XAU/USD &amp; Forex signals with precise entry, stop-loss,
            and take-profit levels. Backed by institutional order-flow analysis, strict
            risk management rules, and live market mentorship.
          </motion.p>

          {/* ── CTA group ── */}
          <motion.div
            initial="hidden" animate="visible"
            variants={fadeUp} custom={0.24}
            className="mb-14 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => open("free_telegram")}
              className="btn-primary gap-2 px-7 py-3.5 text-base"
            >
              Get Instant Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => open("vip_telegram")}
              className="btn-outline gap-2 px-7 py-3.5 text-base"
            >
              View Live Results
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>

          {/* ── Video placeholder ── */}
          <motion.div
            initial="hidden" animate="visible"
            variants={fadeUp} custom={0.32}
            className="mx-auto mb-16 max-w-3xl"
          >
            <div
              className="glass aspect-video flex flex-col items-center justify-center gap-4 border border-slate-700 bg-slate-800/50"
              role="img"
              aria-label="Live trading session preview — video placeholder"
            >
              {/* Play button */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/15 text-cyan-400 transition-transform duration-200 hover:scale-105">
                <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                Live Trading Session Preview
              </p>
              <p className="text-xs text-slate-600">Video Placeholder</p>
            </div>
          </motion.div>

          {/* ── Stats grid ── */}
          <motion.div
            initial="hidden" animate="visible"
            variants={fadeUp} custom={0.4}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="glass flex flex-col items-center gap-2 p-5 text-center"
              >
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Risk disclaimer */}
          <motion.p
            initial="hidden" animate="visible"
            variants={fadeIn} custom={0.5}
            className="mt-6 text-center text-[11px] text-slate-600"
          >
            *Past performance is not indicative of future results. Trading involves substantial risk.
          </motion.p>

        </div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={close} destination={destination} />
    </>
  );
}
