"use client";

import Image from 'next/image';

const TG_LINK = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

// Navbar is always solid — sits in normal document flow above the ticker bar.
// No scroll-based transparency to avoid z-index overlap with the hero content.
export default function GoldNavbar() {
  return (
    <nav
      className="w-full z-40"
      style={{
        background: '#F9F9FB',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#4A4C54' }}>
          {['#about', '#proof', '#services', '#faq'].map((href) => (
            <a
              key={href}
              href={href}
              className="transition-colors capitalize"
              style={{ color: '#4A4C54' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4A4C54')}
            >
              {href.slice(1)}
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
