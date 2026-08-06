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
    <footer className="py-16 px-6" style={{ background: '#050505', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <div className="mb-4">
              <Image
                src="/assets/yassine_logo.png"
                alt="YassICTFX"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              Professional gold trading education and signal services for serious traders. Based in Morocco.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {COLS.map(col => (
              <div key={col.heading}>
                <div className="font-semibold text-white/60 mb-3 uppercase tracking-wider text-xs">{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-white/30 hover:text-white/60 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />
        <div className="space-y-3 mb-8">
          <p className="text-white/20 text-xs leading-relaxed">
            <strong className="text-white/30">RISK WARNING:</strong> Trading gold, forex, and other financial instruments involves substantial risk of loss and is not suitable for all investors. You should not invest money that you cannot afford to lose. Past performance is not indicative of future results. All signal results shown on this website are from live historical trades; individual results will vary based on account size, broker, timing, execution, and personal discipline.
          </p>
          <p className="text-white/20 text-xs leading-relaxed">
            YassICTFX is not a registered investment advisor or broker in any jurisdiction. The content provided through our Telegram channels, website, courses, and coaching sessions is for educational purposes only and does not constitute financial advice. You are solely responsible for your own trading decisions.
          </p>
          <p className="text-white/20 text-xs leading-relaxed">
            Copy trading involves automated execution of trades in your own brokerage account. You retain full ownership and control of your funds at all times. YassICTFX does not hold, manage, or have withdrawal access to client funds under any circumstances.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <span>© {year} YassICTFX. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy"    className="hover:text-white/40 transition-colors">Privacy</a>
            <a href="/terms"      className="hover:text-white/40 transition-colors">Terms</a>
            <a href="/disclaimer" className="hover:text-white/40 transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
