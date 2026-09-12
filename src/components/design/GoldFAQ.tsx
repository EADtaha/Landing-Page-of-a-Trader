"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('section-reveal'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const FAQS = [
  {
    q: 'Do I need trading experience to join?',
    a: "No. The VIP Telegram channel and Full Course work for both beginners and experienced traders. Beginners get structured education; experienced traders get refined execution methods. The 1-on-1 coaching is tailored entirely to your journey.",
  },
  {
    q: 'What markets do you focus on?',
    a: "Primarily XAU/USD (gold) during London and New York sessions. Occasional setups on silver, crude oil, and major FX pairs when institutional-grade opportunities arise.",
  },
  {
    q: 'How are signals delivered?',
    a: "Directly to the private Telegram channel with full context: entry zone, stop-loss, take-profit targets (TP1/TP2/TP3), risk percentage, and reasoning. You also receive invalidation alerts if the thesis changes.",
  },
  {
    q: 'What is your verified win rate?',
    a: "Our 12-month audited win rate is 85.4%, with an average risk-to-reward of 1:2.4. Full monthly breakdowns are shared publicly. Past performance does not guarantee future results.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. VIP Telegram is month-to-month, no contracts. The Full Course is a one-time payment with lifetime access. 1-on-1 Coaching has a 7-day notice period.",
  },
  {
    q: 'Is copy trading regulated?',
    a: "Copy trading involves real financial risk. We operate through regulated broker partnerships. You retain full ownership and control of your funds — we never have withdrawal access to your account.",
  },
];

export default function GoldFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useReveal();

  return (
    <section
      id="faq"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0c', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(224,177,62,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="section-reveal text-center mb-14">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#e0b13e', border: '1px solid rgba(224,177,62,0.25)', background: 'rgba(224,177,62,0.06)' }}
          >
            FAQ
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Answers, not filler.
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: isOpen
                    ? '1px solid rgba(224,177,62,0.3)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isOpen ? '#111114' : 'transparent',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ type: 'spring', stiffness: 100, delay: i * 0.06, damping: 14 }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-sm md:text-base leading-snug"
                    style={{ color: isOpen ? '#e0b13e' : '#FFFFFF' }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300"
                    style={{
                      color: '#e0b13e',
                      border: '1px solid rgba(224,177,62,0.3)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
