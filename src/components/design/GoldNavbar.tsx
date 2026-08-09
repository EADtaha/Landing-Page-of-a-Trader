"use client";

import Image from 'next/image';

const TG_LINK = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

// Always-solid navbar — in normal document flow (not fixed/absolute).
// Sits above MarketTicker which sits above the hero section.
export default function GoldNavbar() {
  return (
    <nav className="w-full bg-[#F9F9FB] border-b border-gray-200/80 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" aria-label="YassICTFX home">
          <Image
            src="/assets/yassine_logo.png"
            alt="YassICTFX Logo"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4C54]">
          {[
            { href: '#about',    label: 'About'    },
            { href: '#proof',    label: 'Results'  },
            { href: '#services', label: 'Services' },
            { href: '#faq',      label: 'FAQ'      },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-[#D4AF37]"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={TG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 hover:scale-[1.03]"
          style={{ background: 'linear-gradient(135deg, #C5A028, #D4AF37)', color: '#0D0E12' }}
        >
          Join Free
        </a>
      </div>
    </nav>
  );
}
