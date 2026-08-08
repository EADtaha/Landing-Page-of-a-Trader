"use client";

// ---------------------------------------------------------------------------
// BackgroundChart — ambient SVG chart pattern for hero background
// Subtle 10-15% opacity with radial gradient mask for readability
// ---------------------------------------------------------------------------

export default function BackgroundChart() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Radial gradient mask - white center fading to transparent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Chart SVG with animated path */}
      <svg
        className="absolute inset-0 h-full w-full opacity-12"
        preserveAspectRatio="none"
        viewBox="0 0 1000 500"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Candle stick pattern (decorative) */}
        <g fill="#D4AF37" stroke="#D4AF37" strokeOpacity="0.4">
          {/* Candle 1 */}
          <line x1="80" y1="200" x2="80" y2="350" strokeWidth="4" />
          <rect x="65" y="240" width="30" height="80" rx="4" fillOpacity="0.6" />
          {/* Candle 2 */}
          <line x1="180" y1="180" x2="180" y2="320" strokeWidth="4" />
          <rect x="165" y="220" width="30" height="60" rx="4" fillOpacity="0.6" />
          {/* Candle 3 */}
          <line x1="280" y1="220" x2="280" y2="380" strokeWidth="4" />
          <rect x="265" y="260" width="30" height="100" rx="4" fillOpacity="0.6" />
          {/* Candle 4 */}
          <line x1="380" y1="150" x2="380" y2="300" strokeWidth="4" />
          <rect x="365" y="180" width="30" height="90" rx="4" fillOpacity="0.6" />
          {/* Candle 5 */}
          <line x1="480" y1="100" x2="480" y2="280" strokeWidth="4" />
          <rect x="465" y="140" width="30" height="120" rx="4" fillOpacity="0.6" />
          {/* Candle 6 */}
          <line x1="580" y1="120" x2="580" y2="260" strokeWidth="4" />
          <rect x="565" y="150" width="30" height="80" rx="4" fillOpacity="0.6" />
          {/* Candle 7 */}
          <line x1="680" y1="140" x2="680" y2="320" strokeWidth="4" />
          <rect x="665" y="180" width="30" height="120" rx="4" fillOpacity="0.6" />
          {/* Candle 8 */}
          <line x1="780" y1="180" x2="780" y2="340" strokeWidth="4" />
          <rect x="765" y="220" width="30" height="90" rx="4" fillOpacity="0.6" />
          {/* Candle 9 */}
          <line x1="880" y1="200" x2="880" y2="360" strokeWidth="4" />
          <rect x="865" y="240" width="30" height="100" rx="4" fillOpacity="0.6" />
        </g>

        {/* Trend line with gradient fill */}
        <path
          d="M 0 380 C 150 360 250 420 400 340 C 550 260 650 380 800 300 L 1000 280 L 1000 500 L 0 500 Z"
          fill="url(#chartGradient)"
          className="animate-draw-chart"
        />
        <path
          d="M 0 380 C 150 360 250 420 400 340 C 550 260 650 380 800 300 L 1000 280"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="10 5"
          className="animate-draw-chart"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>
    </div>
  );
}
