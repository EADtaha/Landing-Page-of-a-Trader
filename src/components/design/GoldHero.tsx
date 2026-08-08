"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import BackgroundChart from "./BackgroundChart";
import MarketTicker from "./MarketTicker";
import type { RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Hero — White Luxury & Matte Gold Edition
// Cinematic 9:16 video with ambient 3D Gold Bar and Background Chart
// ---------------------------------------------------------------------------

export default function GoldHero({ onOpenModal }: { onOpenModal: (dest: RedirectDestination) => void }) {
  const [playing, setPlaying] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);

  const handleVideoError = useCallback(() => {
    console.warn("Video failed to load, using fallback image");
    setVideoErrored(true);
  }, []);

  return (
    <>
      <MarketTicker />
      
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-base-offwhite"
        aria-label="Hero section"
      >
        {/* Ambient Background Chart (z-0) */}
        <BackgroundChart />

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-7xl px-6 pt-36 pb-20 md:pt-44 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text (7 columns on desktop) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
              
              {/* Live Signal Badge */}
              <div className="flex items-center gap-2 rounded-full px-4 py-2">
                <div
                  className="h-2 w-2 rounded-full bg-signal-green animate-pulse"
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#00C853" }}
                >
                  Market Live
                </span>
              </div>

              {/* Primary Headline */}
              <h1
                className="font-display font-black leading-[0.92] tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                <span className="block text-base-charcoal mb-2">Master Gold.</span>
                <span
                  className="inline-block"
                  style={{
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
                className="text-base-charcoal-muted text-lg md:text-xl max-w-xl leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                Institutional XAU/USD signals, structured video education, and
                1-on-1 mentorship designed for traders who demand real execution
                over random signals.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenModal("free_telegram")}
                  className="flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-gold"
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
                  className="rounded-xl px-8 py-4 text-sm font-bold transition-all duration-300 hover:bg-base-offwhite hover:shadow-soft border border-base-border"
                  style={{ color: "#4A4C54" }}
                >
                  Explore Services
                </a>
              </div>

            </div>

            {/* Right Column: Cinematic 9:16 Video (4 columns on desktop) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="relative overflow-hidden rounded-2xl shadow-soft"
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/assets/yassine.jpg"
                      alt="Yassine trading"
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                      style={{ background: "linear-gradient(to top, rgba(13,14,18,0.95), transparent)" }}
                    >
                      <span className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: "#D4AF37", color: "#0D0E12" }}>
                        Watch Story
                      </span>
                    </div>
                  </div>
                )}

                {/* Play Button Overlay (visible on hover) */}
                {!playing && !videoErrored && (
                  <button
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-300 group"
                    style={{
                      background: "linear-gradient(to top, rgba(13,14,18,0.85), transparent)",
                    }}
                  >
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(212, 175, 55, 0.95)",
                        boxShadow: "0 12px 40px rgba(212, 175, 55, 0.5)",
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="#0D0E12"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
                      style={{ background: "rgba(212, 175, 55, 0.95)", color: "#0D0E12" }}
                    >
                      Watch My Story
                    </span>
                  </button>
                )}

                {/* Live Stats Badge (bottom overlay) */}
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold font-mono-data"
                  style={{ background: "rgba(13,14,18,0.85)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}
                >
                  XAU/USD: $2,387.42 ↑
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { label: "6+ Years", value: "Experience" },
              { label: "1,700+", value: "Active Traders" },
              { label: "85.4%", value: "Verified Signal Accuracy" },
              { label: "1:2.4", value: "Avg. Risk/Reward" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center group">
                <div
                  className="font-display font-bold text-3xl md:text-4xl mb-2 transition-colors group-hover:text-accent-gold"
                  style={{ fontStyle: "italic", color: "#0D0E12" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm md:text-base text-base-metadata font-medium tracking-wide uppercase"
                  style={{ opacity: 0.7 }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-white via-base-white/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>
    </>
  );
}
