"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add('visible');
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const STATS = [
  { val: '4 Years', label: 'Full-time gold trading' },
  { val: '78.6%',   label: 'Verified win rate'      },
  { val: '1,700+',  label: 'Active community'        },
  { val: '1:2.4',   label: 'Avg risk-to-reward'      },
];

export default function GoldAbout() {
  const ref = useReveal();
  return (
    <section id="about" className="py-32 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="section-reveal grid md:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3/4', maxWidth: '420px', border: '1px solid rgba(201,168,76,0.2)' }}>
              <Image
                src="/assets/yassine.jpg"
                alt="Yassine"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-display font-bold text-white text-2xl" style={{ fontStyle: 'italic' }}>Yassine</div>
                <div className="text-sm font-medium mt-1" style={{ color: '#C9A84C' }}>Lead Trader & Founder · YassICTFX</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-2xl -z-10"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }} />
          </div>

          {/* Bio */}
          <div>
            <div className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 pb-1"
              style={{ color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
              About the Trader
            </div>
            <h2 className="font-display font-bold leading-tight mb-6 text-black"
              style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.02em' }}>
              Four years of <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>proven</span> gold trading results.
            </h2>
            <p className="text-black/60 text-base leading-relaxed mb-5">
              Yassine started trading gold full-time in 2021. After a tough first year he rebuilt from scratch — focusing
              exclusively on XAU/USD price action, ICT concepts, and reading institutional order flow. What followed was
              four years of consistent, documented results.
            </p>
            <p className="text-black/60 text-base leading-relaxed mb-8">
              He built YassICTFX to share the exact method without the noise — no indicators, no complex theory.
              Just a repeatable ICT system that works in London and New York sessions, taught to over 1,700 traders
              who follow his signals live every day.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="p-4 rounded-xl"
                  style={{ background: '#F8F4EA', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div className="font-display font-bold text-2xl" style={{ fontStyle: 'italic', color: '#080808' }}>{s.val}</div>
                  <div className="text-xs text-black/40 mt-1 font-medium uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
