"use client";

import Image from 'next/image';
import { useState } from 'react';
import Ticker from './Ticker';

const FREE_TG = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

const TG_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function GoldHero({ onOpenModal }: { onOpenModal: () => void }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, #080808 70%)' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <Ticker />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-12 max-w-5xl mx-auto">
        {/* H1 */}
        <h1 className="font-display font-black leading-[0.95] mb-6"
          style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.02em' }}>
          <span className="text-white block">Trade Gold.</span>
          <span className="block gold-shimmer-text">Print Profits.</span>
        </h1>

        <p className="text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ fontWeight: 300 }}>
          Institutional-grade XAU/USD signals, live coaching, and a structured trading system trusted by 1,700+ active traders worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-base transition-all duration-200 hover:scale-[1.04] hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', color: '#080808', boxShadow: '0 12px 40px rgba(201,168,76,0.35)' }}>
            {TG_ICON}
            Get Instant Access
          </button>
          <a href="#pricing"
            className="rounded-full px-8 py-4 font-semibold text-base transition-all duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}>
            View Pricing →
          </a>
        </div>

        {/* 9:16 Video card */}
        <div className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl"
          style={{ width: 'min(340px,85vw)', aspectRatio: '9/16', background: '#0F0F0F',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 0 80px rgba(201,168,76,0.15), 0 40px 120px rgba(0,0,0,0.7)' }}>
          <Image
            src="/assets/yassine.jpg"
            alt="Yassine"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.6)' }}
            priority
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%, rgba(8,8,8,0.3) 100%)' }} />
          {!playing && (
            <button onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.9)', boxShadow: '0 8px 32px rgba(201,168,76,0.5)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#080808"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-white/80 text-sm font-medium">Watch My Story</span>
            </button>
          )}
          {playing && (
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen"
              frameBorder="0" title="Trader story video" />
          )}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="px-3 py-1 rounded-full text-xs font-semibold font-mono-data"
              style={{ background: 'rgba(201,168,76,0.9)', color: '#080808' }}>
              +$127,340 YTD 2024
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 w-full max-w-xl">
          {[{ val: '78.6%', label: 'Win Rate' }, { val: '1,700+', label: 'Active Traders' }, { val: '4.9★', label: 'Avg. Rating' }].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl mb-1" style={{ color: '#C9A84C', fontStyle: 'italic' }}>{s.val}</div>
              <div className="text-white/40 text-xs font-medium tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
