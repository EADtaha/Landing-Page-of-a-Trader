"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const EASE = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE, delay: d },
  }),
};

const answerAnim: Variants = {
  hidden:  { opacity: 0, height: 0 },
  visible: {
    opacity: 1, height: "auto",
    transition: { duration: 0.28, ease: EASE },
  },
  exit: {
    opacity: 0, height: 0,
    transition: { duration: 0.2, ease: EASE },
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const FAQS = [
  {
    q: "Do I need trading experience to join?",
    a: "No prior experience is required for the free Telegram channel or VIP signals. The signals include full context so beginners can follow along. For the mentorship programme we do a quick onboarding call to tailor the curriculum to your current level — complete beginners are welcome.",
  },
  {
    q: "Which platforms do the signals work on?",
    a: "Signals are compatible with any MT4 or MT5 broker for XAU/USD and major Forex pairs. TradingView users can also follow along using the analysis provided. Brokers with zero-spread or raw-spread accounts are recommended to maximise signal accuracy.",
  },
  {
    q: "How quickly do I need to execute a signal?",
    a: "Most signals use pending limit orders — you set the order in advance and the market fills it automatically. You do not need to watch the screen. Signals delivered as market orders clearly state the current price and urgency level in the alert.",
  },
  {
    q: "What is the refund policy?",
    a: "Because all subscriptions are activated manually via Telegram or WhatsApp there is no automated billing. Refund requests for the monthly or quarterly plans are reviewed on a case-by-case basis within the first 7 days if no signals have been acted upon. Lifetime access is non-refundable after activation.",
  },
  {
    q: "How are signals delivered?",
    a: "All signals are sent to the private VIP Telegram channel instantly at the moment they are identified, usually during the London open (07:00–10:00 GMT) and New York open (13:00–16:00 GMT) sessions. You will receive a notification on your phone the moment a signal is posted.",
  },
  {
    q: "What is the ICT / SMC approach?",
    a: "ICT (Inner Circle Trader) concepts focus on how institutional players — banks and hedge funds — move price to hunt retail stop-losses and fill large orders. We identify these institutional footprints via order blocks, fair value gaps, and liquidity sweeps before entering high-probability setups aligned with smart money direction.",
  },
  {
    q: "How do I get started right now?",
    a: "Click the 'Get Instant Access' button, enter your name, email, and phone, and you will be redirected to the free Telegram invite link immediately. From there you can observe the free channel and upgrade to VIP whenever you are ready by messaging the admin directly.",
  },
] as const;

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId  = `faq-a-${index}`;
  const triggerId = `faq-q-${index}`;

  return (
    <div className="border-b border-white/7 last:border-b-0">
      <h3>
        <button
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 py-5 text-left text-sm font-semibold text-slate-200 transition-colors duration-150 hover:text-cyan-300 focus-visible:outline-none focus-visible:text-cyan-300"
        >
          <span className="leading-snug">{faq.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mt-0.5 shrink-0 text-cyan-400"
            aria-hidden="true"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={triggerId}
            key="answer"
            variants={answerAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <p className="pb-5 pr-9 text-sm leading-relaxed text-slate-400">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Questions &amp;{" "}
            <span className="text-gradient-cyan">Answers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
            Everything you need to know before getting started with Yass-ICTFX.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={0.1}
          className="glass rounded-2xl px-6"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm text-slate-400">
            Still have a question? We&apos;re happy to help.
          </p>
          <a
            href="https://t.me/yassinffx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
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
