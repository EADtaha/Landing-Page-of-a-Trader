"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import BackgroundChart from "./BackgroundChart";
import type { RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Hero — White Luxury & Matte Gold Edition
// Navbar + Ticker are in normal document flow above this section.
// No fixed-position clearance padding needed here.
// ---------------------------------------------------------------------------

export default function GoldHero({ onOpenModal }: { onOpenModal: (dest: RedirectDestination) => void }) {
  const [playing, setPlaying] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);

  const handleVideoError = useCallback(() => {
    console.warn("Video failed to load, using fallback image");
    setVideoErrored(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ background: '#F9F9FB' }}
      aria-label="Hero section"
    >
      {/* Live-scrolling candlestick background (z-0) */}
      <BackgroundChart />

      {/* Main content — sits above the canvas */}
      <div className="relative z-10 w-full max-w-7xl px-6 pt-12 pb-20 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left Column (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">

            {/* Primary Headline */}
            <h1
              className="font-display font-black leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              <span className="block" style={{ color: '#0D0E12', marginBottom: '0.25rem' }}>
                Master Gold.
              </span>
              <span
                style={{
                  display: 'inline-block',
                  background: "linear-gradient(90deg, #C5A028 0%, #D4AF37 25%, #E8C97A 50%, #D4AF37 75%, #C5A028 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Trade With Precision.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl max-w-xl leading-relaxed"
              style={{ color: '#4A4C54', fontWeight: 300 }}
            >
              Institutional XAU/USD signals, structured video education, and
              1-on-1 mentorship designed for traders who demand real execution
              over random signals.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenModal("free_telegram")}
                className="flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #C5A028, #D4AF37)",
                  color: "#0D0E12",
                  boxShadow: "0 12px 40px rgba(212, 175, 55, 0.25)",
                }}
              >
                Get Free Access
              </button>
              <a
                href="#services"
                className="rounded-xl px-8 py-4 text-sm font-bold transition-all duration-300"
                style={{
                  color: "#4A4C54",
                  border: '1px solid #E5E7EB',
                  background: 'transparent',
                }}
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* ── Right Column (5 cols) — Cinematic 9:16 Video ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: "min(380px, 90vw)",
                aspectRatio: "9/16",
                background: "#0D0E12",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
              }}
            >
              {!videoErrored ? (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&rel=0&modestbranding=1"
                  title="Trader story video"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src="/assets/yassine.jpg"
                    alt="Yassine trading"
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-4"
                    style={{ background: "linear-gradient(to top, rgba(13,14,18,0.95) 30%, transparent)" }}
                  >
                    <span
                      className="px-4 py-2 rounded-full text-xs font-bold"
                      style={{ background: "#D4AF37", color: "#0D0E12" }}
                    >
                      Watch Story
                    </span>
                  </div>
                </div>
              )}

              {/* Play Button Overlay */}
              {!playing && !videoErrored && (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-300 group"
                  style={{ background: "linear-gradient(to top, rgba(13,14,18,0.85), transparent)" }}
                >
                  <div
                    className="h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(212, 175, 55, 0.95)",
                      boxShadow: "0 12px 40px rgba(212, 175, 55, 0.5)",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0D0E12">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold"
                    style={{ background: "rgba(212, 175, 55, 0.95)", color: "#0D0E12" }}
                  >
                    Watch My Story
                  </span>
                </button>
              )}

              {/* Live price badge */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold font-mono-data whitespace-nowrap"
                style={{
                  background: "rgba(13,14,18,0.85)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                XAU/USD: $2,387.42 ↑
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {[
            { value: "6+ Years",  label: "Experience" },
            { value: "1,700+",    label: "Active Traders" },
            { value: "85.4%",     label: "Verified Signal Accuracy" },
            { value: "1:2.4",     label: "Avg. Risk/Reward" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display font-bold text-3xl md:text-4xl mb-2"
                style={{ fontStyle: "italic", color: "#0D0E12" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm md:text-base font-medium tracking-wide uppercase"
                style={{ color: '#71737C' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FFFFFF, transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
