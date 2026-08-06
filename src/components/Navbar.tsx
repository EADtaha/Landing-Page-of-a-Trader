"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";
import LeadModal from "@/components/LeadModal";

const NAV_LINKS = [
  { label: "Features",  href: "#features"  },
  { label: "Results",   href: "#results"   },
  { label: "Services",  href: "#services"  },
  { label: "FAQ",       href: "#faq"       },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [modalOpen,  setModalOpen]  = useState(false);

  /* Detect scroll to apply blur/border */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openModal  = useCallback(() => { setMenuOpen(false); setModalOpen(true);  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/8 bg-slate-950/80 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-2 focus-visible:outline-none"
            aria-label="Yass-ICTFX home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-gradient-cyan">Yass</span>
              <span className="text-slate-300">-ICTFX</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <button
              onClick={openModal}
              className="btn-primary text-sm"
            >
              Join VIP Signals
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300 lg:hidden"
          >
            {menuOpen
              ? <X className="h-5 w-5" aria-hidden="true" />
              : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-white/8 bg-slate-950/95 backdrop-blur-lg lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-4" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-cyan-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="mt-3">
                  <button
                    onClick={openModal}
                    className="btn-primary w-full"
                  >
                    Join VIP Signals
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Lead modal triggered from Navbar CTA */}
      <LeadModal isOpen={modalOpen} onClose={closeModal} destination="vip_telegram" />
    </>
  );
}
