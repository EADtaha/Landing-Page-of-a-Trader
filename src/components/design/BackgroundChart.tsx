"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// BackgroundChart — live-scrolling XAU/USD candlestick canvas
// Bullish candles: #00C853 | Bearish candles: #FF5252 | Wicks: same color
// Decorative only — values are a random walk, not real market data.
// ---------------------------------------------------------------------------

interface Candle {
  open: number;   // normalised 0-1
  close: number;
  high: number;
  low: number;
}

function generateCandles(n: number): Candle[] {
  const candles: Candle[] = [];
  let price = 0.5;
  for (let i = 0; i < n; i++) {
    const open  = price;
    const move  = (Math.random() - 0.48) * 0.06;
    const close = Math.max(0.1, Math.min(0.9, open + move));
    const wickUp   = Math.random() * 0.025;
    const wickDown = Math.random() * 0.025;
    const high = Math.max(open, close) + wickUp;
    const low  = Math.min(open, close) - wickDown;
    candles.push({ open, close, high: Math.min(high, 0.95), low: Math.max(low, 0.05) });
    price = close;
  }
  return candles;
}

export default function BackgroundChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fit canvas to parent dimensions
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pre-generate a large pool of candles; we'll scroll through them
    const POOL = 600;
    const candles = generateCandles(POOL);

    const CANDLE_W   = 14;   // candle body width (px)
    const CANDLE_GAP = 6;    // gap between candles (px)
    const CANDLE_STEP = CANDLE_W + CANDLE_GAP;
    const SPEED = 0.4;       // px per frame

    let offset = 0;
    let rafId: number;

    const BULLISH = "#00C853";
    const BEARISH = "#FF5252";
    const GRID    = "rgba(212,175,55,0.07)";

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      // ── Faint grid ──
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 0.5;
      for (let row = 1; row < 5; row++) {
        const y = (row / 5) * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── Candles ──
      // How many candles fit across the width + 2 buffer
      const visible = Math.ceil(W / CANDLE_STEP) + 2;
      const startCandle = Math.floor(offset / CANDLE_STEP);
      const pixelOffset = offset % CANDLE_STEP;

      // Vertical mapping: price 0-1 → canvas y (H*0.1 top margin, H*0.15 bottom margin)
      const priceToY = (p: number) => H * 0.9 - p * H * 0.75;

      for (let i = 0; i <= visible; i++) {
        const idx = (startCandle + i) % POOL;
        const candle = candles[idx];
        const x = i * CANDLE_STEP - pixelOffset;

        const bullish  = candle.close >= candle.open;
        const color    = bullish ? BULLISH : BEARISH;
        const bodyTop  = priceToY(Math.max(candle.open, candle.close));
        const bodyBot  = priceToY(Math.min(candle.open, candle.close));
        const bodyH    = Math.max(bodyBot - bodyTop, 1);
        const wickX    = x + CANDLE_W / 2;

        ctx.strokeStyle = color;
        ctx.fillStyle   = color;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth   = 1.2;

        // Upper wick
        ctx.beginPath();
        ctx.moveTo(wickX, priceToY(candle.high));
        ctx.lineTo(wickX, bodyTop);
        ctx.stroke();

        // Lower wick
        ctx.beginPath();
        ctx.moveTo(wickX, bodyBot);
        ctx.lineTo(wickX, priceToY(candle.low));
        ctx.stroke();

        // Body
        ctx.fillRect(x, bodyTop, CANDLE_W, bodyH);
      }

      ctx.globalAlpha = 1;

      // ── Advance scroll ──
      offset += SPEED;

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Candlestick canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Gold gradient at top blending into the off-white background */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(212,175,55,0.18), rgba(249,249,251,0.82), rgba(249,249,251,0))",
        }}
      />

      {/* Centre radial wash — keeps headline text crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 40% 45%, rgba(249,249,251,0.82) 0%, rgba(249,249,251,0.50) 55%, rgba(249,249,251,0) 100%)",
        }}
      />
    </div>
  );
}
