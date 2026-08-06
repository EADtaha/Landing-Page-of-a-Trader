"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ---------------------------------------------------------------------------
// Scroll-reveal hook
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Testimonial image data — all 8 real screenshots from /public/testimonials/
// ---------------------------------------------------------------------------

const TESTIMONIALS = [
  { src: '/testimonials/output_0.webp', alt: 'Community trade result 1' },
  { src: '/testimonials/output_1.webp', alt: 'Community trade result 2' },
  { src: '/testimonials/output_2.webp', alt: 'Community trade result 3' },
  { src: '/testimonials/output_3.webp', alt: 'Community trade result 4' },
  { src: '/testimonials/output_4.webp', alt: 'Community trade result 5' },
  { src: '/testimonials/output_5.webp', alt: 'Community trade result 6' },
  { src: '/testimonials/output_6.webp', alt: 'Community trade result 7' },
  { src: '/testimonials/output_7.webp', alt: 'Community trade result 8' },
];

// ---------------------------------------------------------------------------
// Phone frame with real image inside
// ---------------------------------------------------------------------------

interface PhoneCardProps {
  item: (typeof TESTIMONIALS)[number];
  isCenter: boolean;
}

function PhoneCard({ item, isCenter }: PhoneCardProps) {
  return (
    <div
      className="rounded-[2.5rem] overflow-hidden"
      style={{
        background: '#1a1a1a',
        border: isCenter
          ? '2px solid rgba(201,168,76,0.45)'
          : '2px solid rgba(255,255,255,0.06)',
        boxShadow: isCenter
          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,76,0.12)'
          : 'none',
        padding: '10px',
      }}
    >
      <div
        className="rounded-[2rem] overflow-hidden"
        style={{ background: '#0d1117' }}
      >
        {/* Telegram-style app bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: '#161b22',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
              color: '#080808',
            }}
          >
            Y
          </div>
          <div className="min-w-0">
            <div className="text-white text-xs font-semibold leading-none truncate">
              YassICTFX VIP 🏆
            </div>
            <div className="text-white/30 text-[10px] mt-0.5">1,700+ members</div>
          </div>
          {/* Status dot */}
          <div className="ml-auto flex-shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[9px] text-white/30">online</span>
          </div>
        </div>

        {/* Screenshot fills the phone body — white bg so the image pops */}
        <div
          className="relative w-full bg-white"
          style={{ aspectRatio: '9/16' }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 85vw, 340px"
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Fake input bar — keeps phone illusion intact */}
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{
            background: '#161b22',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="flex-1 h-7 rounded-full px-3 flex items-center text-[10px]"
            style={{ background: '#0d1117', color: 'rgba(255,255,255,0.2)' }}
          >
            Message…
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#2a7ae2' }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------

export default function ResultsCarousel() {
  const [current, setCurrent] = useState(0);
  const ref  = useReveal();
  const total = TESTIMONIALS.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  // Auto-advance every 4.5 s
  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      id="results"
      className="py-32 px-6 overflow-hidden"
      style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: '#C9A84C',
              border: '1px solid rgba(201,168,76,0.25)',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            Verified Performance
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Real members. Real profits.
          </h2>
          <p className="text-white/40 mt-4 text-base max-w-xl mx-auto">
            Screenshots from inside our VIP Telegram channel. Unedited, timestamped,
            posted directly by community members.
          </p>
        </div>

        {/* Phone frame carousel — 3-up: prev (faded) · center · next (faded) */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6 min-h-[520px]">
          {[-1, 0, 1].map(offset => {
            const idx      = (current + offset + total) % total;
            const item     = TESTIMONIALS[idx];
            const isCenter = offset === 0;

            return (
              <div
                key={`${offset}-${idx}`}
                onClick={() => {
                  if (offset === -1) prev();
                  if (offset === 1)  next();
                }}
                className="transition-all duration-500 flex-shrink-0"
                style={{
                  width:     isCenter ? 'min(300px, 80vw)' : 'min(220px, 28vw)',
                  opacity:   isCenter ? 1 : 0.3,
                  transform: isCenter ? 'scale(1)' : 'scale(0.87) translateY(20px)',
                  cursor:    isCenter ? 'default' : 'pointer',
                  zIndex:    isCenter ? 10 : 5,
                  // Hide side cards on very small screens to avoid overflow
                  display:   offset !== 0 ? undefined : undefined,
                }}
              >
                <PhoneCard item={item} isCenter={isCenter} />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              border: '1px solid rgba(201,168,76,0.25)',
              color: '#C9A84C',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            ←
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`View testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      i === current ? '24px' : '6px',
                  height:     '6px',
                  background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              border: '1px solid rgba(201,168,76,0.25)',
              color: '#C9A84C',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            →
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-[11px] text-white/20">
          Individual results vary. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
}
