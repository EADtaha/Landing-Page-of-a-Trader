"use client";

// ---------------------------------------------------------------------------
// SpinningGoldBar — 3D gold bar emblem for hero section
// Slow 360° rotation (14s) on Y-axis for institutional asset feel
// ---------------------------------------------------------------------------

export default function SpinningGoldBar() {
  return (
    <div
      className="relative mx-auto mb-6"
      style={{
        width: 120,
        height: 80,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 -m-8 rounded-xl blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0) 70%)',
        }}
      />

      {/* Gold bar SVG */}
      <svg
        viewBox="0 0 200 140"
        className="animate-spin-gold"
        style={{
          animationDuration: '14s',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
        }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldBarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C5A028" />
          </linearGradient>
          <linearGradient id="goldBarEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B58F2B" />
            <stop offset="50%" stopColor="#E8C97A" />
            <stop offset="100%" stopColor="#B58F2B" />
          </linearGradient>
        </defs>

        {/* Main bar body */}
        <rect
          x="20"
          y="30"
          width="160"
          height="80"
          rx="8"
          fill="url(#goldBarGradient)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* Shine effect */}
        <path
          d="M25 32C25 32 45 15 80 15C115 15 135 32 135 32"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        {/* Text */}
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="28"
          fontWeight="700"
          fill="#0D0E12"
          style={{ fontStyle: 'italic' }}
        >
          XAU/USD
        </text>

        {/* Purity stamp */}
        <rect
          x="140"
          y="45"
          width="30"
          height="20"
          rx="3"
          fill="rgba(255,255,255,0.1)"
        />
        <text
          x="155"
          y="59"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#0D0E12"
        >
          999.9
        </text>
      </svg>
    </div>
  );
}
