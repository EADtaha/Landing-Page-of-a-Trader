import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CoachingWizard from "@/components/funnels/CoachingWizard";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Apply for 1-on-1 Coaching | YassICTFX",
  description:
    "One month of private 1-on-1 coaching with Yassine. Limited spots. Apply to see if it's a fit before you pay anything.",
};

// ─── Static content ───────────────────────────────────────────────────────────

const WHAT_WE_COVER = [
  "Reading the chart",
  "Market analysis",
  "Strategy & execution",
  "Trading psychology",
];

const SPECS = [
  "1 month of private coaching",
  "20 minutes a day, 1-on-1",
  "We stay until you're profitable",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#080810] text-white flex flex-col">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto w-full">
        <Link href="/" aria-label="YassICTFX — back to home">
          <Image
            src="/assets/yassine_logo.png"
            alt="YassICTFX"
            width={120}
            height={36}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition"
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </header>

      {/* ── Hero text ── */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-12 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            1-on-1 Coaching
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Apply for 1-on-1 coaching
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed">
            One month with me directly, then ongoing support. This application helps me
            see if I can actually help you, before we talk.
          </p>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 items-start">

          {/* ── Left info card ── */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            {/* Portrait image */}
            <div className="relative w-full aspect-[4/3] bg-[#111118]">
              <Image
                src="/assets/hero_image.jpeg"
                alt="Yassine — 1-on-1 coaching"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/30 to-transparent" />
            </div>

            <div className="p-6 space-y-6">
              {/* Quote */}
              <blockquote className="border-l-2 border-amber-400/50 pl-4">
                <p className="text-white font-medium text-base leading-relaxed italic">
                  &ldquo;You don&apos;t get dropped after 30 days. That&apos;s the point.&rdquo;
                </p>
              </blockquote>

              {/* Specs */}
              <ul className="space-y-2">
                {SPECS.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm text-neutral-300">
                    <svg
                      width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#e0b13e" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0" aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {spec}
                  </li>
                ))}
              </ul>

              {/* What we cover */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
                  What we cover
                </p>
                <div className="flex flex-wrap gap-2">
                  {WHAT_WE_COVER.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing note */}
              <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <span className="text-amber-400 font-semibold">$320 for the month.</span>{" "}
                  We make sure it&apos;s a fit before you pay anything.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right wizard card ── */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 lg:sticky lg:top-6">
            <CoachingWizard />

            {/* Footer notice */}
            <p className="text-center text-xs text-neutral-600 pt-2 border-t border-white/5">
              No spam, no hard pitch. Just a conversation to see if I can help.
            </p>
          </div>

        </div>
      </div>

      {/* ── Page footer ── */}
      <footer className="py-6 text-center text-xs text-neutral-600 border-t border-white/5">
        © {new Date().getFullYear()} YassICTFX. Trading involves substantial risk. Past
        performance is not indicative of future results.
      </footer>
    </main>
  );
}
