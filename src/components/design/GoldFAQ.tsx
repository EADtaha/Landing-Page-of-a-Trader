"use client";
import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('section-reveal'); }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const FAQS = [
  { q: 'Do I need trading experience to join?', a: "No. The VIP Telegram channel and Full Course work for both beginners and experienced traders. Beginners get structured education; experienced traders get refined execution methods. The 1-on-1 coaching is tailored entirely to your journey." },
  { q: 'What markets do you focus on?', a: "Primarily XAU/USD (gold) during London and New York sessions. Occasional setups on silver, crude oil, and major FX pairs when institutional-grade opportunities arise." },
  { q: 'How are signals delivered?', a: "Directly to the private Telegram channel with full context: entry zone, stop-loss, take-profit targets (TP1/TP2/TP3), risk percentage, and reasoning. You also receive invalidation alerts if the thesis changes." },
  { q: 'What is your verified win rate?', a: "Our 12-month audited win rate is 85.4%, with an average risk-to-reward of 1:2.4. Full monthly breakdowns are shared publicly. Past performance does not guarantee future results." },
  { q: 'Can I cancel anytime?', a: "Yes. VIP Telegram and Copy Trading are month-to-month, no contracts. The Full Course is a one-time payment with lifetime access. 1-on-1 Coaching has a 7-day notice period." },
  { q: 'Is copy trading regulated?', a: "Copy trading involves real financial risk. We operate through regulated broker partnerships. You retain full ownership and control of your funds — we never have withdrawal access to your account." },
];

export default function GoldFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useReveal();
  return (
    <section id="faq" className="py-24 px-6 bg-base-offwhite"
      style={{ borderTop:'1px solid rgba(229, 231, 235, 1)' }}>
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className="section-reveal text-center mb-16">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color:'#D4AF37', border:'1px solid rgba(212, 175, 55, 0.25)', background:'rgba(212, 175, 55, 0.08)' }}>FAQ</div>
          <h2 className="font-display font-bold text-base-charcoal leading-tight"
            style={{ fontSize:'clamp(2rem,4vw,3.5rem)', letterSpacing:'-0.02em' }}>Answers, not filler.</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ border: open===i ? '1px solid rgba(212, 175, 55, 0.35)' : '1px solid rgba(229, 231, 235, 1)',
                background: open===i ? '#FFFFFF' : '#FFFFFF' }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open===i ? null : i)}>
                <span className="font-semibold text-base" style={{ color: open===i ? '#D4AF37' : '#0D0E12' }}>{faq.q}</span>
                <span className="text-lg flex-shrink-0 transition-transform duration-300"
                  style={{ color:'#D4AF37', transform: open===i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open===i ? '300px' : '0px' }}>
                <p className="px-6 pb-5 text-base-charcoal-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
