"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("section-reveal"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function GoldAbout() {
  const { t } = useLanguage();
  const a = t.about;
  const ref = useReveal();

  const STATS = [
    { val: "6+",     label: a.stats.yearsLabel,     sub: a.stats.yearsSub     },
    { val: "1,700+", label: a.stats.communityLabel, sub: a.stats.communitySub },
    { val: "85.4%",  label: a.stats.winRateLabel,   sub: a.stats.winRateSub   },
    { val: "1:2.4",  label: a.stats.rrLabel,        sub: a.stats.rrSub        },
  ];

  return (
    <section
      id="about"
      className="py-14 md:py-20 px-6 relative overflow-hidden"
      style={{ background: "#0a0a0c", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse at right, rgba(224,177,62,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="section-reveal grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Portrait */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "3/4",
                maxWidth: "420px",
                border: "1px solid rgba(224,177,62,0.2)",
                boxShadow: "0 0 60px rgba(224,177,62,0.08)",
              }}
            >
              <Image
                src="/assets/hero_image.jpeg"
                alt="Yassine El Aroui — Lead Trader & Founder of YassICTFX"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,10,12,0.9) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-display font-bold text-white text-2xl mb-1" style={{ fontStyle: "italic" }}>
                  {a.nameLabel}
                </div>
                <div className="text-sm font-medium" style={{ color: "#e0b13e" }}>
                  {a.roleLabel}
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-5 -right-5 w-40 h-40 rounded-2xl -z-10"
              style={{ background: "rgba(224,177,62,0.05)", border: "1px solid rgba(224,177,62,0.12)" }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
              style={{ color: "#e0b13e", border: "1px solid rgba(224,177,62,0.25)", background: "rgba(224,177,62,0.06)" }}
            >
              {a.sectionTag}
            </div>

            <h2
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              {a.titlePart1}{" "}
              <span style={{ color: "#e0b13e", fontStyle: "italic" }}>{a.titleBold}</span>
              <br />
              {a.titlePart2}
            </h2>

            <p className="text-base leading-relaxed mb-5" style={{ color: "#D1D5DB" }}>{a.bio1}</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#D1D5DB" }}>{a.bio2}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STATS.map((s, index) => (
                <motion.div
                  key={s.label}
                  className="p-4 rounded-2xl text-center"
                  style={{
                    background: "#111114",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="font-display font-bold text-2xl mb-0.5"
                    style={{ fontStyle: "italic", color: "#e0b13e" }}>
                    {s.val}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-white leading-tight">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-0.5">{s.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
