import HeroSection         from "@/components/HeroSection";
import ServicesSection     from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection          from "@/components/FAQSection";
import Footer              from "@/components/Footer";

export default function Page() {
  return (
    <main
      className={[
        // Full-width scrollable column — no overflow constraints
        "min-h-screen w-full overflow-y-auto",
        // Dark luxury base background
        "bg-[#07090e] text-white",
        // Gold-tinted text selection across the whole page
        "selection:bg-amber-500/30 selection:text-amber-200",
      ].join(" ")}
    >
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
