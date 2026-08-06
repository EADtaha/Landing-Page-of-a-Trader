import { TrendingUp } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_COLS = [
  {
    title: "Platform",
    links: [
      { label: "Features",      href: "#features"  },
      { label: "Results",       href: "#results"   },
      { label: "Services",      href: "#services"  },
      { label: "Pricing",       href: "#pricing"   },
      { label: "FAQ",           href: "#faq"       },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Free Telegram Channel", href: "#hero"    },
      { label: "Join VIP Signals",      href: "#pricing" },
      { label: "Book Mentorship",       href: "#pricing" },
      { label: "Start Copy Trading",    href: "#hero"    },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",     href: "/privacy"    },
      { label: "Terms of Service",   href: "/terms"      },
      { label: "Risk Disclaimer",    href: "/disclaimer" },
      { label: "Contact Support",    href: "mailto:contact@yassictfx.com" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Telegram",
    href: "https://t.me/yassinffx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/212602716624",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yassictfx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
      </svg>
    ),
  },
] as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-white/6 bg-slate-950 px-4 pb-8 pt-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-gradient-cyan">Yass</span>
                <span className="text-slate-300">-ICTFX</span>
              </span>
            </div>
            <p className="mb-5 max-w-xs text-xs leading-relaxed text-slate-500">
              Institutional-grade ICT trading signals, copy trading, and 1-on-1
              mentorship. Built for traders who demand a real edge.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-glow my-10" />

        {/* Risk disclaimer */}
        <div className="mb-6 rounded-xl border border-slate-700/60 bg-slate-900/60 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-300">Risk Warning:</span>{" "}
            Forex and futures trading, including Gold (XAU/USD), carries substantial
            risk of loss and is not appropriate for all investors. Leverage can work
            against you as well as for you. Past performance — including signal win
            rates, profit charts, and member results shown on this website — is not
            indicative of future results and does not guarantee similar outcomes.
            Never risk capital you cannot afford to lose. Yass-ICTFX does not provide
            regulated financial advice; all content is for informational and
            educational purposes only. Please read our full{" "}
            <a href="/disclaimer" className="underline hover:text-slate-300">
              Risk Disclaimer
            </a>{" "}
            before trading.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-slate-600 sm:flex-row">
          <p>© {year} Yass-ICTFX. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/terms"      className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="/privacy"    className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="/disclaimer" className="hover:text-slate-400 transition-colors">Risk Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
