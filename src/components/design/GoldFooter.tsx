"use client";

import Image from 'next/image';

const TG_FREE = process.env.NEXT_PUBLIC_TG_FREE_INVITE || 'https://t.me/XAUYASSINE';

const COLS = [
  { heading: 'Platform',  links: ['VIP Telegram', 'Full Course', '1-on-1 Coaching', 'Copy Trading'] },
  { heading: 'Company',   links: ['About Yassine', 'Results', 'Community', 'Contact'] },
  { heading: 'Legal',     links: ['Privacy Policy', 'Terms of Service', 'Risk Disclosure', 'Refund Policy'] },
];

export default function GoldFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-16 px-6 bg-base-offwhite" style={{ borderTop: '1px solid rgba(229, 231, 235, 1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <div className="mb-4">
              <Image
                src="/assets/yassine_logo.png"
                alt="YassICTFX"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-base-charcoal-muted text-sm leading-relaxed">
              Professional gold trading education and signal services for serious traders.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {COLS.map(col => (
              <div key={col.heading}>
                <div className="font-bold text-base-charcoal mb-3 uppercase tracking-wider text-xs" style={{ color: "#4A4C54" }}>{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-base-charcoal-muted hover:text-accent-gold transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(229, 231, 235, 1)', marginBottom: '1.5rem' }} />
        <div className="space-y-3 mb-8">
          <p className="text-base-charcoal-muted text-xs leading-relaxed">
            <strong className="text-base-charcoal">RISK WARNING:</strong> Trading gold, forex, and other financial instruments involves substantial risk of loss and is not suitable for all investors. You should not invest money that you cannot afford to lose. Past performance is not indicative of future results. All signal results shown on this website are from live historical trades; individual results will vary based on account size, broker, timing, execution, and personal discipline.
          </p>
          <p className="text-base-charcoal-muted text-xs leading-relaxed">
            YassICTFX is not a registered investment advisor or broker in any jurisdiction. The content provided through our Telegram channels, website, courses, and coaching sessions is for educational purposes only and does not constitute financial advice. You are solely responsible for your own trading decisions.
          </p>
          <p className="text-base-charcoal-muted text-xs leading-relaxed">
            Copy trading involves automated execution of trades in your own brokerage account. You retain full ownership and control of your funds at all times. YassICTFX does not hold, manage, or have withdrawal access to client funds under any circumstances.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-metadata">
          <span>© {year} YassICTFX. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy"    className="hover:text-accent-gold transition-colors">Privacy</a>
            <a href="/terms"      className="hover:text-accent-gold transition-colors">Terms</a>
            <a href="/disclaimer" className="hover:text-accent-gold transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
