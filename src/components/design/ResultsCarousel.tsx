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
      ([e]) => { if (e.isIntersecting) el.classList.add('section-reveal'); },
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
        background: '#F8F9FA',
        border: isCenter
          ? '2px solid rgba(212, 175, 55, 0.45)'
          : '2px solid rgba(229, 231, 235, 1)',
        boxShadow: isCenter
          ? '0 32px 80px rgba(0,0,0,0.15), 0 0 40px rgba(212, 175, 55, 0.08)'
          : 'none',
        padding: '10px',
      }}
    >
      <div
        className="rounded-[2rem] overflow-hidden"
        style={{ background: '#FFFFFF' }}
      >
        {/* Telegram-style app bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: '#F8F9FA',
            borderBottom: '1px solid rgba(229, 231, 235, 1)',
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #C5A028, #D4AF37)',
              color: '#0D0E12',
            }}
          >
            Y
          </div>
          <div className="min-w-0">
            <div
              className="text-base-charcoal text-xs font-semibold leading-none truncate"
            >
              YassICTFX Community
            </div>
            <div
              className="text-base-metadata text-[10px] mt-0.5"
            >
              1,700+ members
            </div>
          </div>
          {/* Status dot */}
          <div className="ml-auto flex-shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
            <span className="text-[9px] text-base-metadata">online</span>
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
            background: '#F8F9FA',
            borderTop: '1px solid rgba(229, 231, 235, 1)',
          }}
        >
          <div
            className="flex-1 h-7 rounded-full px-3 flex items-center text-[10px]"
            style={{ background: '#F1F3F5', color: '#71737C' }}
          >
            Message…
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: '#00C853' }}
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
      id="proof"
      className="py-24 px-6 overflow-hidden bg-base-offwhite"
      style={{ borderTop: '1px solid rgba(229, 231, 235, 1)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: '#D4AF37',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              background: 'rgba(212, 175, 55, 0.08)',
            }}
          >
            Proof Over Promises
          </div>
          <h2
            className="font-display font-bold text-base-charcoal leading-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.02em' }}
          >
            Real members. Real trades.
          </h2>
          <p className="text-base-charcoal-muted mt-4 text-base max-w-xl mx-auto">
            Screenshots from inside our community channels. Unedited, timestamped,
            posted directly by members.
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
                  opacity:   isCenter ? 1 : 0.4,
                  transform: isCenter ? 'scale(1)' : 'scale(0.87) translateY(20px)',
                  cursor:    isCenter ? 'default' : 'pointer',
                  zIndex:    isCenter ? 10 : 5,
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
              border: '1px solid rgba(212, 175, 55, 0.25)',
              color: '#D4AF37',
              background: 'rgba(212, 175, 55, 0.08)',
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
                  background: i === current ? '#D4AF37' : 'rgba(212, 175, 55, 0.25)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              border: '1px solid rgba(212, 175, 55, 0.25)',
              color: '#D4AF37',
              background: 'rgba(212, 175, 55, 0.08)',
            }}
          >
            →
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-base-metadata">
          Individual results vary. Trading involves substantial risk. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
}
