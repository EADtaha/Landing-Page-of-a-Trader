"use client";

import Image from 'next/image';

const TELEGRAM_URL  = "https://t.me/SMARTvTRADERS";
const INSTAGRAM_URL = "https://www.instagram.com/realyassinfx?stkn=YmNwNHBvb2Nybjc4";

const COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'VIP Telegram',    href: '/checkout/vip_telegram' },
      { label: 'Full Course',     href: '/checkout/full_course'  },
      { label: '1-on-1 Coaching', href: '/apply'                 },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Yassine', href: '#about'     },
      { label: 'Results',       href: '#proof'     },
      { label: 'Community',     href: '#community' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',  href: '/privacy'    },
      { label: 'Terms of Service',href: '/terms'      },
      { label: 'Risk Disclosure', href: '/disclaimer' },
      { label: 'Refund Policy',   href: '/refunds'    },
    ],
  },
];

interface GoldFooterProps {
  onOpenLeadModal: () => void;
}

export default function GoldFooter({ onOpenLeadModal }: GoldFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-16 px-6"
      style={{ background: '#0a0a0c', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="mb-4">
              <Image
                src="/assets/yassine_logo.png"
                alt="YassICTFX"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Professional gold trading education and signal services for serious traders.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {/* Telegram */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#e0b13e" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e0b13e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#e0b13e"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {COLS.map((col) => (
              <div key={col.heading}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3">
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-neutral-400 hover:text-[#e0b13e] transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

        {/* Risk disclaimer */}
        <div className="space-y-3 mb-8">
          <p className="text-neutral-600 text-xs leading-relaxed">
            <strong className="text-neutral-500">RISK WARNING:</strong>{' '}
            Trading gold, forex, and other financial instruments involves substantial risk of loss and
            is not suitable for all investors. You should not invest money that you cannot afford to
            lose. Past performance is not indicative of future results. All signal results shown on
            this website are from live historical trades; individual results will vary based on account
            size, broker, timing, execution, and personal discipline.
          </p>
          <p className="text-neutral-600 text-xs leading-relaxed">
            YassICTFX is not a registered investment advisor or broker in any jurisdiction. The content
            provided through our Telegram channels, website, courses, and coaching sessions is for
            educational purposes only and does not constitute financial advice. You are solely
            responsible for your own trading decisions.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <span>© {year} YassICTFX. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="font-semibold transition-colors hover:text-[#e0b13e]"
              style={{ color: '#e0b13e' }}
            >
              Join Free Telegram
            </button>
            <a href="/privacy"    className="hover:text-neutral-300 transition-colors">Privacy</a>
            <a href="/terms"      className="hover:text-neutral-300 transition-colors">Terms</a>
            <a href="/disclaimer" className="hover:text-neutral-300 transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
