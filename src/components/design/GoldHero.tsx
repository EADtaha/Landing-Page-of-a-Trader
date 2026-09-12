"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function GoldHero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background portrait ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/hero_image.jpeg"
          alt="Yassine El Aroui - Multi-Market Day Trader"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[65%_12%] md:object-[60%_15%] opacity-75 md:opacity-85 scale-100 transition-all duration-700"
        />

        {/* Subtle vertical wash — dark at top/bottom, open in middle */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/70 via-transparent to-[#0a0a0c] z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Left-side text legibility vignette — shields the copy column, right stays clear */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom fade to canvas */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a0a0c, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Top notification bar ── */}
      <div className="relative z-20 w-full flex justify-center pt-4 px-4">
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full transition-all hover:scale-[1.02]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#D1D5DB",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a537] flex-shrink-0" />
          {t.hero.topPill}
          <span style={{ color: "#d4a537", fontWeight: 600 }}>{t.hero.topJoin}</span>
        </button>
      </div>

      {/* ── Hero copy — centred ── */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-3xl w-full text-center flex flex-col items-center gap-7">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              {t.hero.tag}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-display font-black leading-[1.05] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <span className="block text-white">{t.hero.titlePart1}</span>
            <span style={{ color: "#d4a537" }}>{t.hero.titlePart2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg max-w-xl leading-relaxed drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            style={{ color: "#D1D5DB", fontWeight: 300 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col items-center gap-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "#d4a537",
                color: "#0a0a0c",
                boxShadow: "0 8px 32px rgba(212,165,55,0.35)",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              {t.hero.cta}
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <p className="text-xs text-neutral-500">{t.hero.subCta}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-4 mt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: "1,700+", label: t.hero.stats.traders    },
              { value: "85.4%",  label: t.hero.stats.accuracy   },
              { value: "6+ yrs", label: t.hero.stats.experience },
              { value: "38",     label: t.hero.stats.countries  },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl"
                  style={{ color: "#d4a537", fontStyle: "italic" }}>
                  {s.value}
                </div>
                <div className="text-[11px] text-neutral-500 uppercase tracking-wide mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
