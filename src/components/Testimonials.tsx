"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const EASE = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE, delay: d },
  }),
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ---------------------------------------------------------------------------
// Image data — output_0.webp … output_7.webp
// ---------------------------------------------------------------------------

const RESULTS = Array.from({ length: 8 }, (_, i) => ({
  src:  `/testimonials/output_${i}.webp`,
  alt:  `Community trading result ${i + 1}`,
  id:   i,
}));

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export default function Testimonials() {
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="relative overflow-hidden bg-slate-900 px-4 py-24 sm:py-32"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-500/6 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Social Proof
          </p>
          <h2
            id="results-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Proven{" "}
            <span className="text-gradient-emerald">Community Results</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Real trade results shared by our members. Screenshots sourced directly
            from community channels — unedited, unfiltered.
          </p>
        </motion.div>

        {/* 4-column results grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {RESULTS.map((item) => (
            <motion.div
              key={item.id}
              variants={cardReveal}
              className="group overflow-hidden rounded-2xl border border-white/8 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Standard aspect-[2/3] container, white background for trade screenshots */}
              <div className="relative aspect-[2/3] w-full bg-white">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="mt-10 text-center text-xs text-slate-600"
        >
          Individual results vary. Past performance is not indicative of future results.
          These screenshots represent selected community submissions and do not guarantee similar outcomes.
        </motion.p>

      </div>
    </section>
  );
}
