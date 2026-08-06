import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── Ticker data ─────────────────────────────────────────────────────────────
const tickerItems = [
  { label: 'XAU/USD', val: '+2.34%', dir: 1 },
  { label: 'GOLD FUTURES', val: '$2,387.40', dir: 1 },
  { label: 'SILVER', val: '+1.12%', dir: 1 },
  { label: 'DXY', val: '-0.43%', dir: -1 },
  { label: 'S&P 500', val: '+0.87%', dir: 1 },
  { label: 'OIL', val: '-1.20%', dir: -1 },
  { label: 'BTC', val: '+4.55%', dir: 1 },
  { label: 'XAU/USD', val: '+2.34%', dir: 1 },
  { label: 'GOLD FUTURES', val: '$2,387.40', dir: 1 },
  { label: 'SILVER', val: '+1.12%', dir: 1 },
  { label: 'DXY', val: '-0.43%', dir: -1 },
  { label: 'S&P 500', val: '+0.87%', dir: 1 },
  { label: 'OIL', val: '-1.20%', dir: -1 },
  { label: 'BTC', val: '+4.55%', dir: 1 },
]

// ─── Telegram trade screenshots ───────────────────────────────────────────────
const telegramScreenshots = [
  {
    user: 'Ahmed K.',
    avatar: 'AK',
    time: '09:14 AM',
    date: '12 Mar 2024',
    msg: 'Closed XAU/USD long from 2,178 → TP2 hit at 2,209 🔥 +$1,840 on 0.5 lot. Marcus called it perfectly before London open.',
    profit: '+$1,840',
    tag: 'XAU/USD Long',
    win: true,
  },
  {
    user: 'Sophie R.',
    avatar: 'SR',
    time: '02:47 PM',
    date: '19 Mar 2024',
    msg: 'TP3 hit on the NFP signal! Was nervous but trusted the setup. +$3,200 today 🤑 This group is insane.',
    profit: '+$3,200',
    tag: 'NFP Setup',
    win: true,
  },
  {
    user: 'Karim B.',
    avatar: 'KB',
    time: '11:03 AM',
    date: '4 Apr 2024',
    msg: 'Signal from last night finally hit TP1 and TP2 this morning. Closed half at TP1 (+$640) letting the rest run 📈',
    profit: '+$640',
    tag: 'Asian Session',
    win: true,
  },
  {
    user: 'Daniel M.',
    avatar: 'DM',
    time: '03:22 PM',
    date: '23 Apr 2024',
    msg: 'Just closed my week with +$2,150 profit. Four signals, four wins. I genuinely don\'t know how I traded before finding this channel.',
    profit: '+$2,150',
    tag: 'Weekly Close',
    win: true,
  },
  {
    user: 'Yara T.',
    avatar: 'YT',
    time: '10:55 AM',
    date: '7 May 2024',
    msg: 'First month in the VIP and already +12.4% on account. Only took 3 signals all month, no overtrading. Game changer 🙏',
    profit: '+12.4%',
    tag: 'Monthly Result',
    win: true,
  },
  {
    user: 'James O.',
    avatar: 'JO',
    time: '08:30 AM',
    date: '14 May 2024',
    msg: 'CPI setup was a banger. Entered at 2,334, TP3 at 2,371. +$4,100 in 6 hours. This is the real deal.',
    profit: '+$4,100',
    tag: 'CPI Scalp',
    win: true,
  },
]

// ─── Pricing tiers ────────────────────────────────────────────────────────────
const pricingTiers = [
  {
    name: 'Free Signal Channel',
    tag: 'Free Forever',
    price: '$0',
    per: '/month',
    highlight: false,
    features: [
      '2–3 gold signals per week',
      'Entry zone & direction only',
      'Weekly market outlook post',
      'Access to public community chat',
      'Monthly performance recap',
    ],
    cta: 'Join Free',
    icon: '✦',
  },
  {
    name: 'Gold Trader Pro',
    tag: 'Most Popular',
    price: '$79',
    per: '/month',
    highlight: true,
    features: [
      'Daily XAU/USD signals (full details)',
      'Entry, TP1 / TP2 / TP3 & stop-loss',
      'Pre-session London & NY briefings',
      'Live trade management updates',
      'Priority community access',
      'Cancel anytime, no contracts',
    ],
    cta: 'Start Today',
    icon: '◈',
  },
  {
    name: 'Masterclass Bundle',
    tag: 'Best Value',
    price: '$349',
    per: 'one-time',
    highlight: false,
    features: [
      'Gold Trader Pro signals included',
      '9-module video trading course',
      'Sniper entry & confluence method',
      'Session timing & liquidity maps',
      'Private student Telegram group',
      'Lifetime access + future updates',
      '30-day money-back guarantee',
    ],
    cta: 'Get Lifetime Access',
    icon: '◇',
  },
  {
    name: 'Elite Mentorship',
    tag: '1-on-1',
    price: '$899',
    per: '/month',
    highlight: false,
    features: [
      'Everything in Masterclass Bundle',
      '4 private Zoom sessions monthly',
      'Real-time chart reviews together',
      'Personalised trade plan built for you',
      'Direct Telegram line to Marcus',
      'Trade journal accountability review',
      'Limited to 5 students at a time',
    ],
    cta: 'Apply for a Spot',
    icon: '⬡',
  },
]

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  { icon: '⚡', title: 'Real-Time Signals', desc: 'Every trade setup with entry, stop-loss, and take-profit levels pushed to your phone before the market moves.' },
  { icon: '🎯', title: 'Sniper Precision', desc: 'High-conviction setups only. No noise, no overtrading. We wait for A+ confluences before committing capital.' },
  { icon: '📊', title: 'Full Transparency', desc: 'Every call is timestamped, tracked, and audited. Monthly P&L reports shared publicly with the community.' },
  { icon: '🛡️', title: 'Risk-First Mindset', desc: 'Capital preservation is rule zero. Every signal includes clear invalidation and max 1-2% account risk guidelines.' },
  { icon: '🌍', title: 'Active Community', desc: '1,700+ traders inside the channel every day — asking questions, sharing wins, and holding each other accountable. 24/7 active chat, not a ghost town.' },
  { icon: '📚', title: 'Structured Education', desc: 'From reading a candlestick to executing institutional-grade entries — the curriculum builds you into a complete trader.' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Do I need trading experience to join?',
    a: "No. The VIP Telegram channel and Full Course are designed to work for both beginners and experienced traders. Beginners get structured education; experienced traders get refined execution methods. The 1-on-1 coaching is tailored entirely to wherever you are in your journey.",
  },
  {
    q: 'What markets do you focus on?',
    a: "Primarily XAU/USD (gold) during London and New York sessions. Occasional setups on silver, crude oil, and major FX pairs when institutional-grade opportunities arise. Gold remains the primary focus because of its liquidity, range, and predictable session behavior.",
  },
  {
    q: 'How are signals delivered?',
    a: "All signals are sent directly to the private Telegram channel with full context: entry zone, stop-loss, take-profit targets (TP1/TP2/TP3), risk percentage, and the reasoning behind the setup. You also receive invalidation alerts if the thesis changes.",
  },
  {
    q: 'What is your verified win rate?',
    a: "Our 12-month audited win rate across all published signals is 81.4%, with an average risk-to-reward of 1:2.7. Full monthly breakdowns are shared publicly inside the community. Past performance does not guarantee future results.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. VIP Telegram and Copy Trading are month-to-month with no contracts. Cancel directly inside your billing portal. The Full Course is a one-time payment with lifetime access. 1-on-1 Coaching has a 7-day notice period.",
  },
  {
    q: 'Is copy trading regulated?',
    a: "Copy trading involves real financial risk. We operate through regulated broker partnerships. You retain full ownership and control of your funds at all times — we never have access to withdraw from your account. Read our full risk disclosure in the legal footer.",
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function TelegramCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      href="https://t.me/goldtrader"
      target="_blank"
      rel="noopener noreferrer"
      className="telegram-btn fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
        color: '#080808',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
        boxShadow: '0 8px 32px rgba(201, 168, 76, 0.45)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
      Join Free
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 8, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: '#C9A84C', fontSize: '20px' }}>◈</span>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            AURUM<span style={{ color: '#C9A84C' }}>FX</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#results" className="hover:text-white transition-colors">Results</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <a
          href="https://t.me/goldtrader"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 hover:scale-[1.03]"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            color: '#080808',
          }}
        >
          Join Now
        </a>
      </div>
    </nav>
  )
}

function Ticker() {
  return (
    <div
      className="ticker-wrap py-2 border-b border-t"
      style={{ borderColor: 'rgba(201, 168, 76, 0.15)', background: 'rgba(201, 168, 76, 0.04)' }}
    >
      <div className="ticker-inner">
        {tickerItems.map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-6 font-mono-data text-xs">
            <span className="text-white/40">{item.label}</span>
            <span style={{ color: item.dir > 0 ? '#22c55e' : '#ef4444' }}>{item.val}</span>
            <span style={{ color: 'rgba(201,168,76,0.3)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const [playing, setPlaying] = useState(false)
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, #080808 70%)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <Ticker />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-12 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{ border: '1px solid rgba(201,168,76,0.35)', color: '#C9A84C', background: 'rgba(201,168,76,0.06)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          Live Signals Active
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black leading-[0.95] mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }}
        >
          <span className="text-white block">Trade Gold.</span>
          <span className="block gold-shimmer-text">Print Profits.</span>
        </h1>

        <p className="text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ fontWeight: 300 }}>
          Institutional-grade XAU/USD signals, live coaching, and a structured trading system
          trusted by 1,700+ active traders worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a
            href="https://t.me/goldtrader"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-base transition-all duration-200 hover:scale-[1.04] hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              color: '#080808',
              boxShadow: '0 12px 40px rgba(201, 168, 76, 0.35)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Join Free Telegram
          </a>
          <a
            href="#pricing"
            className="rounded-full px-8 py-4 font-semibold text-base transition-all duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
          >
            View Pricing →
          </a>
        </div>

        {/* 9:16 Video */}
        <div
          className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: 'min(340px, 85vw)',
            aspectRatio: '9/16',
            background: '#0F0F0F',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 0 80px rgba(201,168,76,0.15), 0 40px 120px rgba(0,0,0,0.7)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1762463176312-1757d5125c85?w=400&h=711&fit=crop&auto=format"
            alt="Gold trading setup"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%, rgba(8,8,8,0.3) 100%)' }}
          />
          {/* Play button */}
          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.9)', boxShadow: '0 8px 32px rgba(201,168,76,0.5)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#080808">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-white/80 text-sm font-medium">Watch My Story</span>
            </button>
          )}
          {playing && (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              frameBorder="0"
              title="Trader story video"
            />
          )}
          {/* Bottom tag */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold font-mono-data"
              style={{ background: 'rgba(201,168,76,0.9)', color: '#080808' }}
            >
              +$127,340 YTD 2024
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-16 w-full max-w-xl">
          {[
            { val: '78.6%', label: 'Win Rate' },
            { val: '1,700+', label: 'Active Traders' },
            { val: '4.9★', label: 'Avg. Rating' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="font-display font-bold text-3xl mb-1"
                style={{ color: '#C9A84C', fontStyle: 'italic' }}
              >
                {s.val}
              </div>
              <div className="text-white/40 text-xs font-medium tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const ref = useReveal()
  return (
    <section id="about" className="py-32 px-6" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="section-reveal grid md:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: '3/4',
                maxWidth: '420px',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&auto=format"
                alt="Marcus Gold – Lead Trader & Founder"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-display font-bold text-white text-2xl" style={{ fontStyle: 'italic' }}>
                  Marcus Gold
                </div>
                <div className="text-sm font-medium mt-1" style={{ color: '#C9A84C' }}>
                  Lead Trader & Founder · AurumFX
                </div>
              </div>
            </div>
            {/* Accent detail */}
            <div
              className="absolute -bottom-4 -right-4 w-40 h-40 rounded-2xl -z-10"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
            />
          </div>

          {/* Bio copy */}
          <div>
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 pb-1"
              style={{ color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.3)' }}
            >
              About the Trader
            </div>
            <h2
              className="font-display font-bold leading-tight mb-6 text-black"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
            >
              Four years of{' '}
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>proven</span>{' '}
              gold trading results.
            </h2>
            <p className="text-black/60 text-base leading-relaxed mb-5" style={{ fontWeight: 400 }}>
              Marcus started trading gold full-time in 2021. After a brutal first year of drawdowns and broken
              strategies, he rebuilt from scratch — focusing exclusively on XAU/USD price action, session timing,
              and reading institutional order flow. What followed was four years of consistent, documented results.
            </p>
            <p className="text-black/60 text-base leading-relaxed mb-8">
              He built AurumFX to share the exact method without the noise — no indicators, no complex theory,
              no upsell ladders. Just a repeatable system that works in London and New York sessions,
              taught to over 1,700 traders who follow his signals live every day.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '4 Years', label: 'Full-time gold trading' },
                { val: '78.6%', label: 'Verified win rate' },
                { val: '1,700+', label: 'Active community' },
                { val: '1:2.4', label: 'Avg risk-to-reward' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{ background: '#F8F4EA', border: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <div className="font-display font-bold text-2xl text-black" style={{ fontStyle: 'italic', color: '#080808' }}>{s.val}</div>
                  <div className="text-xs text-black/40 mt-1 font-medium uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultsCarousel() {
  const [current, setCurrent] = useState(0)
  const ref = useReveal()
  const total = telegramScreenshots.length

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

  useEffect(() => {
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [next])

  // show 3 visible cards: prev (faded), current, next (faded)
  const getIdx = (offset: number) => (current + offset + total) % total
  const visible = [-1, 0, 1].map(o => ({ s: telegramScreenshots[getIdx(o)], offset: o }))

  return (
    <section
      id="results"
      className="py-32 px-6 overflow-hidden"
      style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
          >
            Verified Performance
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Real members. Real profits.
          </h2>
          <p className="text-white/40 mt-4 text-base max-w-xl mx-auto">
            Screenshots from inside our Telegram channel. Unedited, timestamped, posted by real members.
          </p>
        </div>

        {/* Phone frame carousel */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6 min-h-[520px]">
          {visible.map(({ s, offset }) => {
            const isCenter = offset === 0
            return (
              <div
                key={s.user + s.date}
                onClick={() => { if (offset === -1) prev(); if (offset === 1) next(); }}
                className="transition-all duration-500 flex-shrink-0"
                style={{
                  width: isCenter ? 'min(340px, 85vw)' : 'min(260px, 35vw)',
                  opacity: isCenter ? 1 : 0.35,
                  transform: isCenter ? 'scale(1)' : `scale(0.88) translateY(16px)`,
                  cursor: isCenter ? 'default' : 'pointer',
                  zIndex: isCenter ? 10 : 5,
                  display: offset !== 0 && window.innerWidth < 640 ? 'none' : 'block',
                }}
              >
                {/* Phone shell */}
                <div
                  className="rounded-[2.5rem] overflow-hidden"
                  style={{
                    background: '#1a1a1a',
                    border: isCenter ? '2px solid rgba(201,168,76,0.4)' : '2px solid rgba(255,255,255,0.06)',
                    boxShadow: isCenter ? '0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,76,0.1)' : 'none',
                    padding: '12px',
                  }}
                >
                  {/* Telegram app chrome */}
                  <div
                    className="rounded-[2rem] overflow-hidden"
                    style={{ background: '#0d1117' }}
                  >
                    {/* Telegram header */}
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#080808' }}
                      >
                        A
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold leading-none">AurumFX VIP 🏆</div>
                        <div className="text-white/30 text-[10px] mt-0.5">1,700+ members</div>
                      </div>
                      <div className="ml-auto">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)">
                          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                        </svg>
                      </div>
                    </div>

                    {/* Chat messages area */}
                    <div className="px-3 py-4 space-y-3" style={{ minHeight: '300px', background: '#0d1117' }}>
                      {/* Date divider */}
                      <div className="flex items-center justify-center">
                        <span
                          className="text-[10px] px-3 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
                        >
                          {s.date}
                        </span>
                      </div>

                      {/* System message */}
                      <div className="flex justify-center">
                        <div
                          className="text-[10px] px-3 py-1.5 rounded-xl text-center max-w-[200px]"
                          style={{ background: 'rgba(201,168,76,0.08)', color: 'rgba(201,168,76,0.7)', border: '1px solid rgba(201,168,76,0.15)' }}
                        >
                          ✅ Signal TP hit — {s.tag}
                        </div>
                      </div>

                      {/* User message bubble */}
                      <div className="flex items-end gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #4a4a6a, #6a5acd)', color: '#fff' }}
                        >
                          {s.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-semibold mb-1" style={{ color: '#7eb8f7' }}>{s.user}</div>
                          <div
                            className="rounded-2xl rounded-bl-sm px-3 py-2.5 text-xs leading-relaxed"
                            style={{ background: '#1e2533', color: 'rgba(255,255,255,0.85)' }}
                          >
                            {s.msg}
                          </div>
                          <div className="text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>{s.time} ✓✓</div>
                        </div>
                      </div>

                      {/* Profit badge */}
                      <div className="flex justify-end">
                        <div
                          className="px-3 py-2 rounded-2xl rounded-br-sm text-xs font-bold font-mono-data"
                          style={{
                            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.08))',
                            border: '1px solid rgba(34,197,94,0.25)',
                            color: '#4ade80',
                          }}
                        >
                          {s.profit} 🎯
                        </div>
                      </div>

                      {/* Reaction row */}
                      <div className="flex items-center gap-2 mt-2">
                        {['🔥 24', '💰 18', '👑 12'].map(r => (
                          <div
                            key={r}
                            className="px-2 py-0.5 rounded-full text-[10px]"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Input bar */}
                    <div
                      className="flex items-center gap-2 px-3 py-2.5"
                      style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div
                        className="flex-1 h-7 rounded-full px-3 flex items-center text-[10px]"
                        style={{ background: '#0d1117', color: 'rgba(255,255,255,0.2)' }}
                      >
                        Message...
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#2a7ae2' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', background: 'rgba(201,168,76,0.05)' }}
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {telegramScreenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '6px',
                  height: '6px',
                  background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', background: 'rgba(201,168,76,0.05)' }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const ref = useReveal()
  return (
    <section
      id="pricing"
      className="py-32 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0C09 50%, #0A0A0A 100%)',
      }}
    >
      {/* Gold orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
          >
            Membership Options
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Choose your level.
          </h2>
          <p className="text-white/40 mt-4 text-base max-w-lg mx-auto">
            From live signals to full mentorship — every tier is designed for a different stage of your trading journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`section-reveal stagger-${i + 1} relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1`}
              style={tier.highlight
                ? {
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))',
                    border: '1px solid rgba(201,168,76,0.5)',
                    boxShadow: '0 0 60px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.5)',
                  }
                : {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                  }
              }
            >
              {tier.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#080808' }}
                >
                  {tier.tag}
                </div>
              )}
              {!tier.highlight && (
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(201,168,76,0.5)' }}>
                  {tier.tag}
                </div>
              )}
              {tier.highlight && <div className="mb-4" />}

              <div className="text-2xl mb-3" style={{ color: tier.highlight ? '#C9A84C' : 'rgba(201,168,76,0.4)' }}>
                {tier.icon}
              </div>

              <h3 className="font-display font-bold text-white text-xl mb-1" style={{ fontStyle: 'italic' }}>
                {tier.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-6 mt-2">
                <span
                  className="font-display font-black leading-none"
                  style={{ fontSize: '2.25rem', color: tier.highlight ? '#C9A84C' : '#ffffff', fontStyle: 'italic' }}
                >
                  {tier.price}
                </span>
                <span className="text-white/30 text-sm">{tier.per}</span>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-white/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" className="mt-0.5 flex-shrink-0" opacity={tier.highlight ? 1 : 0.7}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://t.me/goldtrader"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                style={tier.highlight
                  ? { background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#080808', boxShadow: '0 8px 24px rgba(201,168,76,0.35)' }
                  : { border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', background: 'transparent' }
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const ref = useReveal()
  return (
    <section
      className="py-32 px-6"
      style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
          >
            Why AurumFX
          </div>
          <h2
            className="font-display font-bold text-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Built different.
          </h2>
          <p className="text-black/40 mt-4 text-base max-w-lg mx-auto">
            Not another signal group. A complete ecosystem built around one goal — making you a consistently profitable trader.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`section-reveal stagger-${(i % 4) + 1} p-7 rounded-2xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              style={{
                background: '#F8F6F0',
                border: '1px solid rgba(201,168,76,0.12)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-all duration-200 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                {b.icon}
              </div>
              <h3 className="font-display font-bold text-black text-xl mb-2" style={{ fontStyle: 'italic' }}>
                {b.title}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Community social proof strip */}
        <div
          className="mt-16 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A, #141414)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <div>
            <div className="font-display font-bold text-white text-2xl mb-1" style={{ fontStyle: 'italic' }}>
              Join 1,700+ traders already profiting.
            </div>
            <div className="text-white/40 text-sm">Active community · New signals daily · Zero fluff</div>
          </div>
          <a
            href="https://t.me/goldtrader"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm transition-all hover:scale-[1.03] flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              color: '#080808',
              boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Join Free Now
          </a>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const ref = useReveal()
  return (
    <section
      id="faq"
      className="py-32 px-6"
      style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className="section-reveal text-center mb-16">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
          >
            FAQ
          </div>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Answers, not filler.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                border: open === i ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(255,255,255,0.06)',
                background: open === i ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-semibold text-base"
                  style={{ color: open === i ? '#E8C97A' : 'rgba(255,255,255,0.85)' }}
                >
                  {faq.q}
                </span>
                <span
                  className="text-lg flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#C9A84C',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0px' }}
              >
                <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: '#C9A84C', fontSize: '18px' }}>◈</span>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                AURUM<span style={{ color: '#C9A84C' }}>FX</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              Professional gold trading education and signal services for serious traders. Based in Dubai, UAE.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {[
              { heading: 'Platform', links: ['VIP Telegram', 'Full Course', '1-on-1 Coaching', 'Copy Trading'] },
              { heading: 'Company', links: ['About Marcus', 'Results', 'Community', 'Contact'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Risk Disclosure', 'Refund Policy'] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="font-semibold text-white/60 mb-3 uppercase tracking-wider text-xs">{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/30 hover:text-white/60 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />

        {/* Legal text */}
        <div className="space-y-3 mb-8">
          <p className="text-white/20 text-xs leading-relaxed">
            <strong className="text-white/30">RISK WARNING:</strong> Trading gold, forex, and other financial instruments involves substantial risk of loss and is not suitable for all investors. You should not invest money that you cannot afford to lose. Past performance is not indicative of future results. All signal results and P&L figures shown on this website are from live historical trades and have been independently verified; however, individual results will vary based on account size, broker, timing, execution, and personal discipline.
          </p>
          <p className="text-white/20 text-xs leading-relaxed">
            AurumFX and Marcus Gold are not registered investment advisors or brokers in any jurisdiction. The content provided through our Telegram channels, website, courses, and coaching sessions is for educational purposes only and does not constitute financial advice. You are solely responsible for your own trading decisions. AurumFX is not liable for any financial losses incurred by subscribers or students.
          </p>
          <p className="text-white/20 text-xs leading-relaxed">
            Copy trading involves automated execution of trades in your own brokerage account. You retain full ownership and control of your funds at all times. AurumFX does not hold, manage, or have withdrawal access to client funds under any circumstances. Performance fees of 20% apply only to profitable months as calculated by net realized P&L.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <span>© {new Date().getFullYear()} AurumFX. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/40 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <TelegramCTA />
      <Navbar />
      <Hero />
      <About />
      <ResultsCarousel />
      <Pricing />
      <Benefits />
      <FAQ />
      <Footer />
    </div>
  )
}
