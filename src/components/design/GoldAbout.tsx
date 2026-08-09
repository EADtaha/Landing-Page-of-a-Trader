"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add('section-reveal');
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const STATS = [
  { val: '6+ Years', label: 'Trading Experience' },
  { val: '1,700+',   label: 'Active Community' },
  { val: 'XAU/USD',  label: 'Specialization' },
  { val: '1:2.4',    label: 'Avg Risk/Reward' },
];

export default function GoldAbout() {
  const ref = useReveal();
  return (
    <section id="about" className="py-24 px-6 bg-base-offwhite">
      <div className="max-w-7xl mx-auto">
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
            <div className="relative overflow-hidden rounded-2xl shadow-soft"
              style={{ aspectRatio: '3/4', maxWidth: '420px', border: '1px solid rgba(229, 231, 235, 1)' }}>
              <Image
                src="/assets/yassine.jpg"
                alt="Yassine"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,14,18,0.85) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="font-display font-bold text-white text-2xl mb-1"
                  style={{ fontStyle: 'italic' }}
                >
                  Yassine
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: '#D4AF37' }}
                >
                  Lead Trader & Founder · YassICTFX
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl -z-10"
              style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.15)' }}
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
              style={{ color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.25)', background: 'rgba(212, 175, 55, 0.08)' }}
            >
              The Trader Behind The System
            </div>
            <h2
              className="font-display font-bold leading-tight mb-6 text-base-charcoal"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
            >
              Six years of <span
                className="inline-block"
                style={{ color: '#D4AF37', fontStyle: 'italic' }}
              >
                proven
              </span>
              <br />
              gold trading results.
            </h2>
            <p className="text-base-charcoal-muted text-base leading-relaxed mb-5">
              Yassine started trading gold full-time in 2020. After a tough first year, he rebuilt
              from scratch — focusing exclusively on XAU/USD price action, ICT concepts, and reading
              institutional order flow.
            </p>
            <p className="text-base-charcoal-muted text-base leading-relaxed mb-8">
              What followed was six years of consistent, documented results. He built YassICTFX
              to share the exact method without the noise — no indicators, no complex theory.
              Just a repeatable system that works in London and New York sessions, taught to
              over 1,700 traders who follow his signals live every day.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, index) => (
                <motion.div
                  key={s.label}
                  className="p-5 rounded-2xl text-center transition-colors hover:bg-base-offwhite"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(229, 231, 235, 1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div
                    className="font-display font-bold text-2xl mb-1"
                    style={{ fontStyle: 'italic', color: '#D4AF37' }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: '#71737C' }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
