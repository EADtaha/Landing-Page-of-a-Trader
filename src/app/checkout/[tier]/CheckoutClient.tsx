"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CheckoutPanel from "@/components/funnels/CheckoutPanel";
import type { CheckoutTier } from "@/lib/validation/funnels.schema";

interface CheckoutClientProps {
  tier: CheckoutTier;
}

export default function CheckoutClient({ tier }: CheckoutClientProps) {
  // Return null during SSR and before hydration. Rendering any HTML here —
  // even a spinner — gives browser extensions (e.g. Bitdefender bis_skin_checked)
  // a target to mutate before React reconciles, causing attribute mismatch errors.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2" aria-label="YassICTFX — back to home">
          <Image
            src="/assets/yassine_logo.png"
            alt="YassICTFX"
            width={44}
            height={44}
            priority
            className="h-10 w-10 rounded-full object-cover"
          />
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition"
        >
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <CheckoutPanel tier={tier} />
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-neutral-600 border-t border-white/5">
        No payment is processed on this website. All transactions are handled directly
        via bank transfer or crypto wallet. Contact via WhatsApp for confirmation.
      </footer>
    </main>
  );
}
