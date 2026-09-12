"use client";

import { motion } from "framer-motion";

interface MidPageCTAProps {
  onOpenModal: () => void;
}

export default function MidPageCTA({ onOpenModal }: MidPageCTAProps) {
  return (
    <section
      aria-label="Mid-page call to action"
      className="px-6 py-8 md:py-10"
      style={{ background: "#0a0a0c" }}
    >
      <motion.div
        className="max-w-4xl mx-auto rounded-2xl px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,152,40,0.12) 0%, rgba(10,10,12,0.0) 100%)",
          border: "1px solid rgba(224,177,62,0.22)",
          boxShadow: "0 0 60px rgba(224,177,62,0.06)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {/* Copy */}
        <div className="max-w-xl">
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3"
            style={{ color: "#e0b13e" }}>
            The reality check
          </p>
          <h2
            className="font-display font-bold text-white leading-tight mb-2"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.01em" }}
          >
            Most traders lose for years alone — with no real system.
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Start free on Telegram. Get live signals, daily market breakdowns,
            and a community that actually trades.
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onOpenModal}
          className="flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-sm transition-all hover:scale-[1.03] flex-shrink-0 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #c99828, #e0b13e)",
            color: "#0a0a0c",
            boxShadow: "0 8px 24px rgba(224,177,62,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Join Free Telegram
        </button>
      </motion.div>
    </section>
  );
}
