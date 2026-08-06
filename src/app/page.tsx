"use client";

import { useEffect, useState } from "react";
import FloatingTelegramBtn  from "@/components/design/FloatingTelegramBtn";
import GoldNavbar           from "@/components/design/GoldNavbar";
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
      style={{ background: "#080808", minHeight: "100vh" }}
      className="selection:bg-[rgba(201,168,76,0.25)] selection:text-[#E8C97A]"
    >
      {/* FloatingTelegramBtn only renders client-side to avoid scroll-state mismatch */}
      {mounted && <FloatingTelegramBtn />}

      <GoldNavbar />

      <main>
        <GoldHero  onOpenModal={() => openModal("free_telegram")} />
        <GoldAbout />
        <ResultsCarousel />
        {/* GoldPricing: each card CTA calls openModal with its own destination */}
        <GoldPricing onOpenModal={openModal} />
        {/* GoldBenefits: bottom strip CTA opens modal */}
        <GoldBenefits onOpenModal={() => openModal("free_telegram")} />
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
