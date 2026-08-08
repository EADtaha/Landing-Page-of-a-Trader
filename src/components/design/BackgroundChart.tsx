"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// BackgroundChart — live-scrolling XAU/USD price line on HTML5 canvas
// Runs at 60 FPS with requestAnimationFrame. Absolute z-0, pointer-events-none.
// Text readability preserved via a white/offwhite radial overlay on top.
// ---------------------------------------------------------------------------

export default function BackgroundChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fill parent
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ----- Price data -----
    // Simulate a scrolling XAU/USD line using a random walk seeded with
    // realistic price levels. This is decorative only — not real market data.
    const NUM_POINTS = 200;
    const prices: number[] = [];
    let base = 0.5; // normalised 0-1
    for (let i = 0; i < NUM_POINTS; i++) {
      base += (Math.random() - 0.5) * 0.04;
      base = Math.max(0.15, Math.min(0.85, base));
      prices.push(base);
    }

    let offset = 0;           // horizontal scroll position (pixels)
    let tickTimer = 0;        // counter for pulse ticks
    let lastPulseX = -1;      // x-position of the last green tick pulse
    let pulseRadius = 0;      // growing circle radius for tick pulse
    let rafId: number;

    const GOLD   = "#D4AF37";
    const GREEN  = "#00C853";
    const GOLD_A = "rgba(212,175,55,";
    const SPEED  = 0.6;       // px per frame — slow ambient drift

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      const STEP = W / (NUM_POINTS - 1);  // pixels between data points

      // --- Grid lines (very faint) ---
      ctx.strokeStyle = "rgba(212,175,55,0.06)";
      ctx.lineWidth = 0.5;
      for (let row = 0; row < 6; row++) {
        const y = (row / 5) * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      for (let col = 0; col < 9; col++) {
        const x = (col / 8) * W;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // --- Area fill under the price line ---
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, GOLD_A + "0.12)");
      grad.addColorStop(1, GOLD_A + "0.0)");

      ctx.beginPath();
      for (let i = 0; i < NUM_POINTS; i++) {
        const x = i * STEP - (offset % STEP) + (offset % STEP) * 0;
        // Shift x by the scroll offset wrapping NUM_POINTS cyclically
        const idx = (i + Math.floor(offset / STEP)) % NUM_POINTS;
        const y = H - prices[idx] * H * 0.6 - H * 0.15;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // --- Price line ---
      ctx.beginPath();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = GOLD_A + "0.35)";
      ctx.shadowBlur = 8;
      for (let i = 0; i < NUM_POINTS; i++) {
        const x = i * STEP - (offset % STEP);
        const idx = (i + Math.floor(offset / STEP)) % NUM_POINTS;
        const y = H - prices[idx] * H * 0.6 - H * 0.15;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // --- Live price dot at right edge ---
      const lastIdx = (NUM_POINTS - 1 + Math.floor(offset / STEP)) % NUM_POINTS;
      const dotY = H - prices[lastIdx] * H * 0.6 - H * 0.15;
      const dotX = W - 4;

      // Pulse ring
      tickTimer++;
      if (tickTimer % 90 === 0) {
        lastPulseX = dotX;
        pulseRadius = 0;
      }
      if (pulseRadius < 20) {
        pulseRadius += 0.4;
        const alpha = 1 - pulseRadius / 20;
        ctx.beginPath();
        ctx.arc(dotX, dotY, pulseRadius * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,200,83,${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Solid dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = GREEN;
      ctx.shadowColor = "rgba(0,200,83,0.8)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- Advance scroll ---
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
      {/* Canvas — fills the section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.55]"
        style={{ display: "block" }}
      />

      {/* Soft white radial overlay keeps headline 100% readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(249,249,251,0.88) 0%, rgba(249,249,251,0.60) 55%, rgba(249,249,251,0) 100%)",
        }}
      />
    </div>
  );
}
