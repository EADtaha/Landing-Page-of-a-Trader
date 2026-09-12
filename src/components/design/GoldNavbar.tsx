"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface GoldNavbarProps {
  onOpenLeadModal: () => void;
}

export default function GoldNavbar({ onOpenLeadModal }: GoldNavbarProps) {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { href: "#about",    label: t.nav.howItWorks },
    { href: "#proof",    label: t.nav.results    },
    { href: "#services", label: t.nav.membership },
    { href: "/apply",    label: t.nav.coaching   },
    { href: "#faq",      label: t.nav.faq        },
  ];

  return (
    <nav
      className="sticky top-0 w-full z-40 backdrop-blur-md"
      style={{ background: "rgba(10,10,12,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="YassICTFX home">
          <Image
            src="/assets/yassine_logo.png"
            alt="YassICTFX"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
        </Link>

        {/* Centre nav links — desktop */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-400">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="transition-colors duration-150 hover:text-white">
              {label}
            </a>
          ))}
        </div>

        {/* Right group */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === "en" ? "text-amber-400 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === "ar" ? "text-amber-400 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              العربية
            </button>
          </div>

          {/* Join free CTA */}
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold rounded-xl px-5 py-2 transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#d4a537", color: "#0a0a0c", boxShadow: "0 4px 20px rgba(212,165,55,0.3)" }}
          >
            {t.nav.joinFree}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="block w-5 h-px bg-neutral-300 transition-all duration-200"
              style={{ transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
            <span className="block w-5 h-px bg-neutral-300 transition-all duration-200"
              style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="block w-5 h-px bg-neutral-300 transition-all duration-200"
              style={{ transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="lg:hidden px-5 pb-5 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              {label}
            </a>
          ))}

          {/* Mobile language toggle */}
          <div className="flex items-center gap-3 pt-1">
            <button type="button" onClick={() => setLang("en")}
              className={`text-sm font-semibold transition-colors ${lang === "en" ? "text-amber-400" : "text-neutral-400"}`}>
              EN
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button type="button" onClick={() => setLang("ar")}
              className={`text-sm font-semibold transition-colors ${lang === "ar" ? "text-amber-400" : "text-neutral-400"}`}>
              العربية
            </button>
          </div>

          <button
            type="button"
            onClick={() => { setMobileOpen(false); onOpenLeadModal(); }}
            className="mt-1 w-full py-3 rounded-xl text-sm font-semibold text-center transition-all"
            style={{ background: "#d4a537", color: "#0a0a0c" }}
          >
            {t.nav.joinFree} →
          </button>
        </div>
      )}
    </nav>
  );
}
