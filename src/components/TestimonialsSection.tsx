"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH, delay },
  }),
};

// ---------------------------------------------------------------------------
// Data  (placeholder content – §6: final copy to be supplied by client)
// ---------------------------------------------------------------------------

const TESTIMONIALS = [
  {
    id: 1,
    name: "Karim B.",
    location: "Casablanca, MA",
    avatar: "KB",
    avatarBg: "from-amber-500 to-orange-600",
    stars: 5,
    result: "+$1 240 in 3 weeks",
    resultColor: "text-emerald-400",
    text: "The XAU/USD signals are incredibly precise. I followed the VIP channel for one month and my account grew by 18%. The risk management advice alone is worth the subscription.",
    service: "VIP Signals",
  },
  {
    id: 2,
    name: "Yasmine T.",
    location: "Paris, FR",
    avatar: "YT",
    avatarBg: "from-violet-500 to-purple-700",
    stars: 5,
    result: "Consistent +12% / month",
    resultColor: "text-emerald-400",
    text: "Copy Trading changed everything for me. I have a full-time job and zero time to watch charts. My account runs on autopilot and the results have been consistent since day one.",
    service: "Copy Trading",
  },
  {
    id: 3,
    name: "Mehdi A.",
    location: "Dubai, UAE",
    avatar: "MA",
    avatarBg: "from-sky-500 to-blue-700",
    stars: 5,
    result: "Profitable after 6 sessions",
    resultColor: "text-emerald-400",
    text: "I tried learning trading alone for two years with no real progress. After 6 mentorship sessions with Yassine I finally understood SMC and my win rate jumped from 35% to 72%.",
    service: "1-on-1 Mentorship",
  },
  {
    id: 4,
    name: "Sara L.",
    location: "Lyon, FR",
    avatar: "SL",
    avatarBg: "from-rose-500 to-pink-700",
    stars: 5,
    result: "+$680 first month",
    resultColor: "text-emerald-400",
    text: "Joined the free Telegram first, then upgraded to VIP after seeing two winning calls in a row. Haven't looked back. Clear entries, clear exits, no noise.",
    service: "VIP Signals",
  },
  {
    id: 5,
    name: "Omar F.",
    location: "Rabat, MA",
    avatar: "OF",
    avatarBg: "from-teal-500 to-emerald-700",
    stars: 5,
    result: "ROI 23% in 45 days",
    resultColor: "text-emerald-400",
    text: "The video course covers everything I needed — from reading order blocks to managing drawdown. The self-paced format is perfect. I rewatch lessons as I trade live.",
    service: "Video Course",
  },
  {
    id: 6,
    name: "Nadia R.",
    location: "Montreal, CA",
    avatar: "NR",
    avatarBg: "from-amber-400 to-yellow-600",
    stars: 5,
    result: "Turned $500 into $1 100",
    resultColor: "text-emerald-400",
    text: "Started with the minimum $200 on Copy Trading as a test. Doubled my account in 6 weeks. Now managing a much larger allocation. Support from the team is always fast.",
    service: "Copy Trading",
  },
];

// ---------------------------------------------------------------------------
// Star rating
// ---------------------------------------------------------------------------

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1}
          className={`h-3.5 w-3.5 ${i < count ? "text-amber-400" : "text-slate-600"}`}
          aria-hidden="true"
        >
          <path d="M8 1l1.854 3.756 4.146.602-3 2.926.708 4.129L8 10.202l-3.708 2.211.708-4.129-3-2.926 4.146-.602z" />
        </svg>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TestimonialCard
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: (typeof TESTIMONIALS)[number];
}

function TestimonialCard({ testimonial: t }: TestimonialCardProps) {
  return (
    <article className="glass-card flex h-full flex-col gap-4 p-6">
      {/* Stars + result */}
      <div className="flex items-center justify-between gap-2">
        <Stars count={t.stars} />
        <span className={`text-xs font-bold ${t.resultColor}`}>
          {t.result}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
        {/* Avatar */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarBg} text-xs font-bold text-white`}
          aria-hidden="true"
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{t.name}</p>
          <p className="truncate text-[11px] text-slate-500">{t.location}</p>
        </div>
        {/* Service badge */}
        <span className="ml-auto shrink-0 rounded-full border border-amber-400/20 bg-amber-400/8 px-2.5 py-0.5 text-[10px] font-medium text-amber-400">
          {t.service}
        </span>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Auto-scrolling carousel (CSS scroll-snap, no external dep)
// ---------------------------------------------------------------------------

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TESTIMONIALS.length;

  // Observe which card is centred in the scroll container
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const { scrollLeft, clientWidth } = track;
      const cardWidth = clientWidth / Math.min(3, total);
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, total - 1));
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / total;
    track.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }

  return (
    <section
      id="performance"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[var(--color-dark-800)] px-4 py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-400)]">
            Member Results
          </p>
          {/* H2 – heading hierarchy */}
          <h2
            id="testimonials-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Traders Who{" "}
            <span className="text-gradient-gold">Changed Their Results</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Real feedback from community members across VIP Signals, Copy Trading,
            and Mentorship programmes.
          </p>
        </motion.div>

        {/* Desktop grid (≥ lg) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={0.1}
          className="hidden gap-5 lg:grid lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>

        {/* Mobile / tablet horizontal scroll carousel (< lg) */}
        <div className="lg:hidden">
          <div
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="w-[min(85vw,22rem)] shrink-0 snap-center"
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`View testimonial ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-6 bg-[var(--color-gold-400)]"
                    : "w-1.5 bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="mt-12 text-center text-[11px] leading-relaxed text-slate-600"
        >
          Past performance is not indicative of future results. Individual
          outcomes vary based on market conditions, capital, and risk tolerance.
        </motion.p>
      </div>
    </section>
  );
}
