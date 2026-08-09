"use client";

import { useEffect, useState } from "react";
import GoldNavbar           from "@/components/design/GoldNavbar";
import MarketTicker         from "@/components/design/MarketTicker";
import GoldHero             from "@/components/design/GoldHero";
import GoldAbout            from "@/components/design/GoldAbout";
import ResultsCarousel      from "@/components/design/ResultsCarousel";
import GoldPricing          from "@/components/design/GoldPricing";
import GoldBenefits         from "@/components/design/GoldBenefits";
import GoldFAQ              from "@/components/design/GoldFAQ";
import GoldFooter           from "@/components/design/GoldFooter";
import GoldLeadModal        from "@/components/design/GoldLeadModal";
import type { RedirectDestination } from "@/lib/validations/lead";

export default function Page() {
  // mounted guard prevents any client-only state from causing hydration mismatches
  const [mounted,     setMounted]     = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [destination, setDestination] = useState<RedirectDestination>("free_telegram");

  useEffect(() => { setMounted(true); }, []);

  function openModal(dest: RedirectDestination = "free_telegram") {
    setDestination(dest);
    setModalOpen(true);
  }

  return (
    <div
      style={{ background: "#FFFFFF", minHeight: "100vh" }}
      className="selection:bg-[rgba(212,175,55,0.2)] selection:text-[#0D0E12]"
    >
      <GoldNavbar />
      {/* Ticker sits in normal flow directly below the solid navbar */}
      <MarketTicker />

      <main>
        {/* 1. HERO SECTION */}
        <GoldHero  onOpenModal={(d) => openModal(d)} />
        
        {/* 2. ABOUT / TRADER BEHIND SYSTEM */}
        <GoldAbout />
        
        {/* 3. PROOF OVER PROMISES */}
        <ResultsCarousel />
        
        {/* 4. SERVICES GRID */}
        <GoldPricing onOpenModal={openModal} />
        
        {/* 5. WHY YASSICTFX / COMMUNITY */}
        <GoldBenefits onOpenModal={() => openModal("free_telegram")} />
        
        {/* 6. FAQ */}
        <GoldFAQ />
      </main>

      <GoldFooter />

      {mounted && (
        <GoldLeadModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          destination={destination}
        />
      )}
    </div>
  );
}
