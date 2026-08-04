"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH, delay },
  }),
};

const answerReveal: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.28, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
};

// ---------------------------------------------------------------------------
// FAQ data  (§3.8 — placeholder Q&A; final content to be supplied by client)
// ---------------------------------------------------------------------------

const CATEGORIES = [
  {
    label: "Signals & Execution",
    faqs: [
      {
        q: "How and when are the signals delivered?",
        a: "All signals are sent directly to the VIP Telegram channel, typically between 07:00 and 10:00 GMT, before the major London session opens. Each signal includes the asset, entry zone, stop-loss, and one or two take-profit levels. Occasional intraday updates are posted when market conditions change significantly.",
      },
      {
        q: "What markets do the signals cover?",
        a: "The primary focus is Gold (XAU/USD), which offers high volatility and consistent setups. Selected Forex pairs — EUR/USD, GBP/USD, USD/JPY — are also covered when high-quality setups arise. Crypto signals are outside scope.",
      },
      {
        q: "What is the average win rate?",
        a: "Historically, the win rate on VIP signals sits around 75–85% depending on the month and market regime. Full performance recaps, including losing trades, are published monthly inside the VIP channel so members can track results transparently.",
      },
      {
        q: "Do I need to monitor my screen all day?",
        a: "No. Every signal comes with a clearly defined entry zone, stop-loss, and take-profit. You set your orders in advance and let the market do the work. Limit and pending orders are used wherever possible to minimise screen time.",
      },
    ],
  },
  {
    label: "Telegram Access",
    faqs: [
      {
        q: "How do I join the free Telegram group?",
        a: 'Click the "Join Free Telegram" button anywhere on this page, fill in your name, email, and phone, and you\'ll be redirected to the free group invite link immediately. No payment is required to join the free channel.',
      },
      {
        q: "What is the difference between the free and VIP channels?",
        a: "The free channel receives general market commentary, educational tips, and occasional signal highlights. The VIP channel receives all live signals with full analysis, entry/exit details, priority support, and access to monthly performance reports.",
      },
      {
        q: "How do I upgrade to VIP after joining the free group?",
        a: "Message the admin directly on Telegram or WhatsApp (links in the footer). Provide your contact details and the admin will guide you through the simple payment process. VIP access is activated within minutes of confirmation.",
      },
    ],
  },
  {
    label: "Copy Trading & Brokers",
    faqs: [
      {
        q: "Which brokers are compatible with Copy Trading?",
        a: "Copy Trading is compatible with most MT4/MT5 brokers. We recommend regulated brokers with low spreads on XAU/USD — specific broker recommendations are shared privately after onboarding. The minimum required deposit to participate is $200.",
      },
      {
        q: "Is my capital at risk with Copy Trading?",
        a: "Yes. All forms of trading involve risk, including Copy Trading. While trades are managed by an experienced trader, losses can still occur. Never allocate capital you cannot afford to lose, and always use the recommended lot sizing provided during setup.",
      },
      {
        q: "Can I stop Copy Trading at any time?",
        a: "Yes, you can disconnect the copy link and close all open positions at any time through your broker's platform. There are no lock-in periods or exit fees. Your capital remains in your own brokerage account at all times.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  const id = `faq-answer-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="border-b border-white/8 last:border-b-0">
      <h3>
        <button
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 py-5 text-left text-sm font-semibold text-white transition-colors duration-150 hover:text-[var(--color-gold-300)]"
        >
          <span className="leading-snug">{question}</span>
          {/* Chevron */}
          <span
            className={[
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--color-gold-400)] transition-transform duration-250",
              isOpen ? "rotate-180" : "rotate-0",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <polyline points="2 4 6 8 10 4" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={triggerId}
            key="answer"
            variants={answerReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <p className="pb-5 pr-9 text-sm leading-relaxed text-slate-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQSection
// ---------------------------------------------------------------------------

export default function FAQSection() {
  // Track open item per category: Record<categoryIndex, faqIndex | null>
  const [openMap, setOpenMap] = useState<Record<number, number | null>>({});

  function toggle(catIdx: number, faqIdx: number) {
    setOpenMap((prev) => ({
      ...prev,
      [catIdx]: prev[catIdx] === faqIdx ? null : faqIdx,
    }));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[var(--color-dark-900)] px-4 py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-amber-500/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-400)]">
            FAQ
          </p>
          {/* H2 */}
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Questions &amp;{" "}
            <span className="text-gradient-gold">Answers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion groups */}
        <div className="space-y-8">
          {CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={catIdx * 0.08}
            >
              {/* Category label */}
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-gold-500)]">
                {cat.label}
              </p>

              {/* Items */}
              <div className="glass-card px-6">
                {cat.faqs.map((faq, faqIdx) => {
                  const globalIdx = catIdx * 10 + faqIdx;
                  return (
                    <AccordionItem
                      key={faq.q}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openMap[catIdx] === faqIdx}
                      onToggle={() => toggle(catIdx, faqIdx)}
                      index={globalIdx}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
          className="mt-14 text-center"
        >
          <p className="mb-4 text-sm text-slate-400">
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="https://t.me/REPLACE_WITH_ADMIN"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Ask on Telegram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
