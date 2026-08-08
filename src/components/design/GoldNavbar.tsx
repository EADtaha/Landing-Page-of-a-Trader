"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const TG_LINK = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

export default function GoldNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(229, 231, 235, 1)' : 'none',
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-base-charcoal-muted">
          {['#about', '#proof', '#services', '#faq'].map((href) => (
            <a key={href} href={href} className="hover:text-accent-gold transition-colors capitalize">
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
