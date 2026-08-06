"use client";

import { useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Check, Zap, Star, Infinity } from "lucide-react";
import LeadModal from "@/components/LeadModal";
import type { RedirectDestination } from "@/lib/validations/lead";

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardAnim: Variants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// ---------------------------------------------------------------------------
// Plan data
// ---------------------------------------------------------------------------

const PLANS = [
  {
    id:          "monthly",
    icon:        Zap,
    name:        "Monthly VIP",
    price:       "$50",
    period:      "/ month",
    description: "Start profiting with institutional-grade signals. Full VIP access, cancel any time.",
    popular:     false,
    destination: "vip_telegram" as RedirectDestination,
    cta:         "Get Monthly VIP",
    features: [
      "Daily XAU/USD & Forex signals",
      "Entry, Stop-Loss & Take-Profit levels",
      "Market analysis commentary",
      "VIP Telegram channel access",
      "Monthly performance reports",
    ],
    accent:     "cyan",
    borderCls:  "border-white/10",
    glowColor:  "rgba(6,182,212,0.08)",
    badgeCls:   "",
  },
  {
    id:          "quarterly",
    icon:        Star,
    name:        "Quarterly Pro",
    price:       "$120",
    period:      "/ 3 months",
    description: "The most popular plan — full signal suite plus weekly webinars and risk tools.",
    popular:     true,
    destination: "vip_telegram" as RedirectDestination,
    cta:         "Get Quarterly Pro",
    features: [
      "Everything in Monthly VIP",
      "Weekly live chart breakdowns",
      "Live webinar recordings archive",
      "Risk management calculator",
      "Priority support response",
      "Drawdown recovery framework",
    ],
    accent:     "cyan",
    borderCls:  "border-cyan-500/50",
    glowColor:  "rgba(6,182,212,0.18)",
    badgeCls:   "bg-cyan-500 text-white",
  },
  {
    id:          "lifetime",
    icon:        Infinity,
    name:        "Lifetime Access",
    price:       "$350",
    period:      "one-time",
    description: "Unlimited, permanent access to all current and future tools, signals, and mentorship.",
    popular:     false,
    destination: "mentorship_whatsapp" as RedirectDestination,
    cta:         "Get Lifetime Access",
    features: [
      "Everything in Quarterly Pro",
      "1-on-1 mentorship sessions",
      "Video course (self-paced)",
      "Lifetime signal updates",
      "All future features & tools",
      "VIP community for life",
    ],
    accent:     "emerald",
    borderCls:  "border-emerald-500/30",
    glowColor:  "rgba(16,185,129,0.10)",
    badgeCls:   "",
  },
] as const;

// ---------------------------------------------------------------------------
// PricingCard
// ---------------------------------------------------------------------------

function PricingCard({
  plan,
  onSelect,
}: {
  plan: (typeof PLANS)[number];
  onSelect: (dest: RedirectDestination) => void;
}) {
  const Icon = plan.icon;

  return (
    <motion.article
      variants={cardAnim}
      whileHover={{ y: plan.popular ? -6 : -4 }}
      transition={{ duration: 0.2 }}
      className={[
        "relative flex flex-col overflow-hidden rounded-2xl border p-8",
        "bg-slate-900/70 backdrop-blur-sm",
        plan.borderCls,
        plan.popular ? "ring-1 ring-cyan-500/40" : "",
      ].join(" ")}
      style={{ boxShadow: `0 0 60px ${plan.glowColor}, 0 8px 32px rgba(0,0,0,0.4)` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute right-0 top-0">
          <div className="rounded-bl-xl rounded-tr-2xl bg-cyan-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
            Most Popular
          </div>
        </div>
      )}

      {/* Icon + name */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-xl border",
            plan.accent === "emerald"
              ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-400"
              : "border-cyan-500/25 bg-cyan-500/15 text-cyan-400",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
      </div>

      {/* Price */}
      <div className="mb-4 flex items-end gap-1">
        <span
          className={[
            "text-4xl font-extrabold",
            plan.accent === "emerald" ? "text-emerald-400" : "text-cyan-400",
          ].join(" ")}
        >
          {plan.price}
        </span>
        <span className="mb-1 text-sm text-slate-500">{plan.period}</span>
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-slate-400">
        {plan.description}
      </p>

      {/* Divider */}
      <div className="divider-glow mb-6" />

      {/* Feature list */}
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check
              className={[
                "mt-0.5 h-4 w-4 shrink-0",
                plan.accent === "emerald" ? "text-emerald-400" : "text-cyan-400",
              ].join(" ")}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onSelect(plan.destination)}
        className={plan.popular ? "btn-primary w-full" : "btn-outline w-full"}
      >
        {plan.cta}
      </button>

      {/* No payment note */}
      <p className="mt-3 text-center text-[10px] text-slate-600">
        Payment handled via Telegram / WhatsApp
      </p>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export default function Pricing() {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [destination, setDestination] = useState<RedirectDestination>("vip_telegram");

  const onSelect  = useCallback((dest: RedirectDestination) => {
    setDestination(dest);
    setModalOpen(true);
  }, []);
  const onClose = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="relative overflow-hidden bg-slate-900 px-4 py-24 sm:py-32"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-80 w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">

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
              Membership Plans
            </p>
            <h2
              id="pricing-heading"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Choose Your{" "}
              <span className="text-gradient-cyan">Trading Edge</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              No hidden fees. No payment gateways on this site. All subscriptions
              are activated directly via Telegram or WhatsApp.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} onSelect={onSelect} />
            ))}
          </motion.div>

          {/* Money-back note */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
            className="mt-10 text-center text-xs text-slate-600"
          >
            All pricing is informational. Contact the admin for current rates and availability.
            Trading involves substantial risk — only invest what you can afford to lose.
          </motion.p>

        </div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={onClose} destination={destination} />
    </>
  );
}
