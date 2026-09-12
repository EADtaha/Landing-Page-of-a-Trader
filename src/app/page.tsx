"use client";

import { useEffect, useState } from "react";
import GoldNavbar          from "@/components/design/GoldNavbar";
import GoldHero            from "@/components/design/GoldHero";
import GoldAbout           from "@/components/design/GoldAbout";
import ResultsCarousel     from "@/components/design/ResultsCarousel";
import MidPageCTA          from "@/components/design/MidPageCTA";
import GoldPricing         from "@/components/design/GoldPricing";
import GoldBenefits        from "@/components/design/GoldBenefits";
import GoldFAQ             from "@/components/design/GoldFAQ";
import GoldFooter          from "@/components/design/GoldFooter";
import FloatingTelegramBtn from "@/components/design/FloatingTelegramBtn";
import LeadCaptureModal    from "@/components/funnels/LeadCaptureModal";

export default function Page() {
  const [mounted,         setMounted]         = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function openLeadModal() { setIsLeadModalOpen(true); }

  return (
    <div
      suppressHydrationWarning
      style={{ background: "#0a0a0c", minHeight: "100vh" }}
      className="selection:bg-amber-400/20 selection:text-white"
    >
      <GoldNavbar onOpenLeadModal={openLeadModal} />

      <main>
        <GoldHero      onOpenModal={openLeadModal} />
        <GoldAbout />
        <ResultsCarousel />
        <MidPageCTA    onOpenModal={openLeadModal} />
        <GoldPricing   onOpenLeadModal={openLeadModal} />
        <GoldBenefits  onOpenModal={openLeadModal} />
        <GoldFAQ />
      </main>

      <GoldFooter onOpenLeadModal={openLeadModal} />
      <FloatingTelegramBtn onOpenLeadModal={openLeadModal} />

      {mounted && (
        <LeadCaptureModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}
    </div>
  );
}
