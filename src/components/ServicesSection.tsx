"use client";

import { motion, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH, delay },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    id: "vip-signals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "VIP Signals",
    subtitle: "XAU/USD · Forex · Daily",
    badge: "$50 / month",
    badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    description:
      "Precision entry & exit points on Gold and major Forex pairs, delivered daily to your Telegram. Every signal includes stop-loss, take-profit, and live market context.",
    features: [
      "Daily XAU/USD signals with full analysis",
      "Strict risk management on every trade",
      "Live market commentary",
      "VIP-only Telegram community",
    ],
    cta: "Join VIP",
    ctaVariant: "gold" as const,
    gradient: "from-amber-500/10 via-transparent to-transparent",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    id: "copy-trading",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Copy Trading",
    subtitle: "100% Automated · Min. $200",
    badge: "Min. $200 deposit",
    badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    description:
      "Mirror professional trades automatically. No screen time required — your account follows expert positions in real time, with managed risk and full transparency.",
    features: [
      "Fully automated trade replication",
      "Professional risk management",
      "Compatible with major brokers",
      "Real-time performance dashboard",
    ],
    cta: "Start Copy Trading",
    ctaVariant: "ghost" as const,
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    glowColor: "rgba(16,185,129,0.10)",
  },
  {
    id: "mentorship",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    title: "1-on-1 Mentorship",
    subtitle: "Price Action · SMC · Risk Mgmt",
    badge: "Custom pricing",
    badgeColor: "text-violet-400 border-violet-400/30 bg-violet-400/10",
    description:
      "Structured coaching tailored to your level. Master Smart Money Concepts, Price Action, and disciplined risk management in personalised sessions and a self-paced video course.",
    features: [
      "Personalised SMC & Price Action sessions",
      "Structured video course (self-paced)",
      "Live trade review & feedback",
      "Long-term profitability framework",
    ],
    cta: "Book a Session",
    ctaVariant: "ghost" as const,
    gradient: "from-violet-500/10 via-transparent to-transparent",
    glowColor: "rgba(139,92,246,0.10)",
  },
];

// ---------------------------------------------------------------------------
// ServiceCard
// ---------------------------------------------------------------------------

interface ServiceCardProps {
  service: (typeof SERVICES)[number];
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
      style={{
        boxShadow: `0 0 60px ${service.glowColor}, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Gradient tint top-left corner */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`}
        aria-hidden="true"
      />

      {/* Icon + badge row */}
      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-gold-400)]">
          {service.icon}
        </div>
        <span
          className={`mt-0.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${service.badgeColor}`}
        >
          {service.badge}
        </span>
      </div>

      {/* Title */}
      <div className="relative mb-1">
        <h3 className="text-lg font-bold text-white">{service.title}</h3>
        <p className="text-xs text-slate-500">{service.subtitle}</p>
      </div>

      {/* Description */}
      <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="relative mt-5 space-y-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            {/* Gold checkmark */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold-400)]"
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
            {f}
          </li>
        ))}
      </ul>

      {/* Spacer pushes CTA to bottom */}
      <div className="flex-1" />

      {/* CTA */}
      <div className="relative mt-7">
        <a
          href="#hero"
          className={[
            "flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
            service.ctaVariant === "gold"
              ? "btn-gold"
              : "btn-ghost",
          ].join(" ")}
        >
          {service.cta}
        </a>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// ServicesSection
// ---------------------------------------------------------------------------

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[var(--color-dark-900)] px-4 py-24 sm:py-32"
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-400)]">
            What We Offer
          </p>
          {/* H2 – §5 heading hierarchy */}
          <h2
            id="services-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Services Built for{" "}
            <span className="text-gradient-gold">Serious Traders</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Whether you want to follow live signals, automate your trades, or master
            the markets yourself — there&apos;s a path for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Bottom disclaimer — §5 no payments */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
          className="mt-12 text-center text-xs text-slate-600"
        >
          All service subscriptions and payments are handled externally via
          WhatsApp or Telegram. No payment gateway is integrated on this site.
        </motion.p>
      </div>
    </section>
  );
}
