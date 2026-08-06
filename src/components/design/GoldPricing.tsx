"use client";

import { useEffect, useRef } from 'react';
import type { RedirectDestination } from '@/lib/validations/lead';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
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

const TIERS = [
  {
    id:            'vip' as const,
    icon:          '◈',
    name:          'VIP TELEGRAM',
    tag:           'Most Popular',
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
    icon:          '◇',
    name:          'FULL COURSE',
    tag:           'Lifetime Value',
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
    icon:          '⬡',
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
    icon:          '✦',
    name:          'COPY TRADING',
    tag:           'Hands-Free',
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
      className="relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={
        tier.highlight
          ? {
              background: 'linear-gradient(135deg,rgba(201,168,76,0.13),rgba(201,168,76,0.06))',
              border: '1px solid rgba(201,168,76,0.55)',
              boxShadow: '0 0 60px rgba(201,168,76,0.14), 0 20px 60px rgba(0,0,0,0.5)',
            }
          : {
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }
      }
    >
      {/* Popular badge */}
      {tier.highlight && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
          style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', color: '#080808' }}
        >
          {tier.tag}
        </div>
      )}

      {/* Tag (non-highlight) */}
      {!tier.highlight && (
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-4"
          style={{ color: 'rgba(201,168,76,0.55)' }}
        >
          {tier.tag}
        </div>
      )}
      {tier.highlight && <div className="mb-4" />}

      {/* Icon */}
      <div
        className="text-2xl mb-3"
        style={{ color: tier.highlight ? '#C9A84C' : 'rgba(201,168,76,0.4)' }}
      >
        {tier.icon}
      </div>

      {/* Name */}
      <h3
        className="font-display font-bold text-white text-xl mb-1"
        style={{ fontStyle: 'italic' }}
      >
        {tier.name}
      </h3>

      {/* Price — with optional strikethrough original price */}
      <div className="mb-2 mt-2">
        {tier.strikethrough && (
          <span className="line-through text-white/40 text-lg mr-2 font-mono-data">
            {tier.strikethrough}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span
            className="font-display font-black leading-none"
            style={{
              fontSize: '2rem',
              color: tier.highlight ? '#C9A84C' : '#ffffff',
              fontStyle: 'italic',
            }}
          >
            {tier.price}
          </span>
          <span className="text-white/30 text-sm">{tier.per}</span>
        </div>
      </div>

      {/* Advantage tag */}
      <p className="text-xs mb-5 leading-relaxed" style={{ color: 'rgba(201,168,76,0.6)' }}>
        {tier.advantage}
      </p>

      {/* Feature list */}
      <ul className="flex-1 space-y-2.5 mb-8">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="#C9A84C" strokeWidth="2.5"
              className="mt-0.5 flex-shrink-0"
              opacity={tier.highlight ? 1 : 0.7}
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
                background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
                color: '#080808',
                boxShadow: '0 8px 24px rgba(201,168,76,0.35)',
              }
            : {
                border: '1px solid rgba(201,168,76,0.25)',
                color: '#C9A84C',
                background: 'transparent',
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
      id="pricing"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#0A0A0A 0%,#0D0C09 50%,#0A0A0A 100%)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
          >
            Membership &amp; Services
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Choose your level.
          </h2>
          <p className="text-white/40 mt-4 text-base max-w-lg mx-auto">
            From live signals to full mentorship — every tier is designed for a different
            stage of your trading journey. All CTAs collect your details first so we can
            personalise your onboarding.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} onOpenModal={onOpenModal} />
          ))}
        </div>

        {/* Legal note */}
        <p className="mt-10 text-center text-xs text-white/20">
          All subscriptions are activated via Telegram or WhatsApp after form submission.
          No payment is processed on this website. Prices shown are indicative — contact
          for current availability.
        </p>
      </div>
    </section>
  );
}
