"use client";

import { useEffect, useRef } from 'react';
import { ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';

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

const ADVANTAGES = [
  {
    Icon:      ShieldCheck,
    tag:       'Verified & Public',
    title:     'Total Transparency',
    desc:      'Full access to my trading ideas, markups, and exact entry/exit reasons. No hidden losses.',
    highlight: false,
  },
  {
    Icon:      TrendingUp,
    tag:       'Capital First',
    title:     'Professional Risk Management',
    desc:      'Learn how to protect your capital. Discover how top traders calculate lot sizes and manage drawdowns.',
    highlight: true,
  },
  {
    Icon:      Users,
    tag:       'Community Driven',
    title:     'Cure Trading Isolation',
    desc:      "Trading alone is mentally draining. Surround yourself with a network of driven individuals pushing for exponential growth.",
    highlight: false,
  },
  {
    Icon:      Award,
    tag:       'Direct Access',
    title:     'Learn From a Mentor',
    desc:      "Stop guessing. Learn from someone who has already been through the highs and lows, so you don't have to make the same mistakes.",
    highlight: false,
  },
] as const;

const TG_FREE = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

export default function GoldBenefits({ onOpenModal }: { onOpenModal?: () => void }) {
  const ref = useReveal();

  return (
    <section
      id="advantages"
      className="py-32 px-6"
      style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
          >
            Why YassICTFX
          </div>
          <h2
            className="font-display font-bold text-black leading-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Advantages of Joining.
          </h2>
          <p className="text-black/40 mt-4 text-base max-w-xl mx-auto">
            Not another signal group. A complete ecosystem built around one goal — making you a
            consistently profitable trader with a real edge.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {ADVANTAGES.map((a) => {
            const Icon = a.Icon;
            return (
            <div
              key={a.title}
              className="relative p-8 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={
                a.highlight
                  ? {
                      background: 'linear-gradient(135deg,rgba(201,168,76,0.10),rgba(201,168,76,0.04))',
                      border: '1px solid rgba(201,168,76,0.4)',
                      boxShadow: '0 0 40px rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.08)',
                    }
                  : {
                      background: '#F8F6F0',
                      border: '1px solid rgba(201,168,76,0.12)',
                    }
              }
            >
              {/* Tag chip */}
              <div
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5"
                style={{
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.06)',
                }}
              >
                {a.tag}
              </div>

              <div className="flex items-start gap-5">
                {/* Lucide icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#C9A84C' }} strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div>
                  <h3
                    className="font-display font-bold text-black text-xl mb-2 leading-tight"
                    style={{ fontStyle: 'italic' }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-black/55 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-14 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg,#0A0A0A,#141414)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <div>
            <div
              className="font-display font-bold text-white text-2xl mb-1"
              style={{ fontStyle: 'italic' }}
            >
              Join 1,700+ traders already profiting.
            </div>
            <div className="text-white/40 text-sm">
              Active community · New signals daily · Zero fluff
            </div>
          </div>
          {onOpenModal ? (
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm transition-all hover:scale-[1.03] flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
                color: '#080808',
                boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Get Free Access Now
            </button>
          ) : (
            <a
              href={TG_FREE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm transition-all hover:scale-[1.03] flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
                color: '#080808',
                boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
              }}
            >
              Join Free Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
