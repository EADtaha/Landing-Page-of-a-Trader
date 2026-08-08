"use client";

import { useEffect, useRef } from 'react';
import type { RedirectDestination } from '@/lib/validations/lead';

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

interface GoldPricingProps {
  onOpenModal: (destination: RedirectDestination) => void;
}

// ─── Tier definitions ──────────────────────────────────────────────────────
// Prices per design.md spec
const TIERS = [
  {
    id:            'vip' as const,
    name:          'VIP TELEGRAM',
    tag:           null,
    price:         '$90',
    strikethrough: null,
    per:           '/month',
    highlight:     false,
    destination:   'vip_telegram' as RedirectDestination,
    cta:           'JOIN VIP',
    advantage:     'Best signal-to-noise ratio on XAU/USD — nothing else.',
    features: [
      '2-5 Daily XAU/USD Signals',
      'Exact Entry, SL & TP',
      'Daily Market Analysis',
      'Live Trade Management',
    ],
  },
  {
    id:            'course' as const,
    name:          'FULL COURSE',
    tag:           null,
    price:         '$149',
    strikethrough: '$297',
    per:           'one-time payment',
    highlight:     false,
    destination:   'video_course_whatsapp' as RedirectDestination,
    cta:           'GET COURSE',
    advantage:     'Learn the system once, trade it forever.',
    features: [
      '40+ HD Video Lessons',
      'Price Action & SMC Strategies',
      'Risk Management Framework',
      'Downloadable PDF Resources',
    ],
  },
  {
    id:            'mentorship' as const,
    name:          '1-ON-1 COACHING',
    tag:           'LIMITED PROMO',
    price:         '$400',
    strikethrough: '$599',
    per:           'one-time payment',
    highlight:     true,
    destination:   'mentorship_whatsapp' as RedirectDestination,
    cta:           'APPLY NOW',
    advantage:     'Fastest path to consistency. Limited to 5 students.',
    features: [
      'Private Zoom Sessions',
      'Live Trading Together',
      'Review of your Trades',
      'Direct WhatsApp Access',
    ],
  },
  {
    id:            'copy' as const,
    name:          'COPY TRADING',
    tag:           null,
    price:         'FREE',
    strikethrough: null,
    per:           'Min. Capital: $300',
    highlight:     false,
    destination:   'copy_trading_telegram' as RedirectDestination,
    cta:           'SETUP COPY',
    advantage:     'Zero screen time. 100% automated.',
    features: [
      '100% Hands-Free Trading',
      'Auto-mirror exact trades',
      'Strict Risk Management',
      'Withdraw anytime',
    ],
  },
] as const;

// ─── Card ─────────────────────────────────────────────────────────────────

function PricingCard({
  tier,
  onOpenModal,
}: {
  tier: (typeof TIERS)[number];
  onOpenModal: (d: RedirectDestination) => void;
}) {
  return (
    <div
      className="relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 border"
      style={
        tier.highlight
          ? {
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.6)',
              boxShadow: '0 12px 40px rgba(212, 175, 55, 0.15)',
            }
          : {
              background: '#FFFFFF',
              border: '1px solid rgba(229, 231, 235, 1)',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
            }
      }
    >
      {/* Promo badge for highlighted tier */}
      {tier.highlight && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm"
          style={{ background: 'linear-gradient(135deg, #C5A028, #D4AF37)', color: '#0D0E12' }}
        >
          {tier.tag}
        </div>
      )}

      {/* Tag for non-highlighted tiers */}
      {!tier.highlight && tier.tag && (
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-4"
          style={{ color: "#D4AF37" }}
        >
          {tier.tag}
        </div>
      )}
      {!tier.highlight && !tier.tag && <div className="mb-4" />}

      {/* Name */}
      <h3
        className="font-display font-bold text-base-charcoal text-xl mb-1"
        style={{ fontStyle: 'italic' }}
      >
        {tier.name}
      </h3>

      {/* Price — with optional strikethrough original price */}
      <div className="mb-2 mt-2">
        {tier.strikethrough && (
          <span
            className="line-through text-base-charcoal-muted text-lg mr-2 font-mono-data"
            style={{ color: "rgba(113, 115, 124, 0.5)" }}
          >
            {tier.strikethrough}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span
            className="font-display font-black leading-none"
            style={{
              fontSize: '2rem',
              color: tier.highlight ? '#D4AF37' : '#0D0E12',
              fontStyle: 'italic',
            }}
          >
            {tier.price}
          </span>
          <span className="text-base-charcoal-muted text-sm">{tier.per}</span>
        </div>
      </div>

      {/* Advantage tag */}
      <p className="text-sm mb-5 leading-relaxed" style={{ color: '#4A4C54' }}>
        {tier.advantage}
      </p>

      {/* Feature list */}
      <ul className="flex-1 space-y-3 mb-8">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-base-charcoal-muted">
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke={tier.highlight ? "#D4AF37" : "#71737C"} strokeWidth="2.5"
              className="mt-0.5 flex-shrink-0"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA — always goes through LeadModal */}
      <button
        onClick={() => onOpenModal(tier.destination)}
        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
        style={
          tier.highlight
            ? {
                background: 'linear-gradient(135deg, #C5A028, #D4AF37)',
                color: '#0D0E12',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
              }
            : {
                background: 'transparent',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
              }
        }
      >
        {tier.cta}
      </button>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────

export default function GoldPricing({ onOpenModal }: GoldPricingProps) {
  const ref = useReveal();

  return (
    <section
      id="services"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.08)' }}
          >
            Services &amp; Membership
          </div>
          <h2
            className="font-display font-bold text-base-charcoal leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Choose your level.
          </h2>
          <p className="text-base-charcoal-muted text-lg max-w-2xl mx-auto">
            From live signals to full mentorship — every tier is designed for a different
            stage of your trading journey. All CTAs collect your details first so we can
            personalise your onboarding.
          </p>
        </div>

        {/* Cards - Desktop 2x2, Mobile single column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-4">
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} onOpenModal={onOpenModal} />
          ))}
        </div>

        {/* Legal note */}
        <p className="mt-12 text-center text-xs text-base-metadata">
          All subscriptions are activated via Telegram or WhatsApp after form submission.
          No payment is processed on this website. Prices shown are indicative — contact
          for current availability.
        </p>
      </div>
    </section>
  );
}
