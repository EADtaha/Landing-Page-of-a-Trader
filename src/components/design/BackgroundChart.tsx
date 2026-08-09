"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";
import type { UTCTimestamp, CandlestickData } from "lightweight-charts";

// ---------------------------------------------------------------------------
// BackgroundChart — live-scrolling XAU/USD candlestick chart using
// TradingView lightweight-charts v5.
// Decorative only — candle data is a random walk, not real market data.
// ---------------------------------------------------------------------------

function generateInitialCandles(count: number): CandlestickData<UTCTimestamp>[] {
  const candles: CandlestickData<UTCTimestamp>[] = [];
  // Start ~60 minutes back so we have history to display
  const now = Math.floor(Date.now() / 1000);
  let price = 2387;

  for (let i = count - 1; i >= 0; i--) {
    const time = (now - i * 60) as UTCTimestamp;
    const open = price;
    const move = (Math.random() - 0.48) * 3;
    const close = Math.max(2300, Math.min(2500, open + move));
    const high = Math.max(open, close) + Math.random() * 1.5;
    const low  = Math.min(open, close) - Math.random() * 1.5;
    price = close;
    candles.push({ time, open, high, low, close });
  }
  return candles;
}

export default function BackgroundChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Create chart ──────────────────────────────────────────────────────
    const chart = createChart(container, {
      width:  container.offsetWidth,
      height: container.offsetHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor:  "transparent",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "rgba(212,175,55,0.05)" },
        horzLines: { color: "rgba(212,175,55,0.05)" },
      },
      crosshair:  { horzLine: { visible: false }, vertLine: { visible: false } },
      rightPriceScale: { visible: false },
      leftPriceScale:  { visible: false },
      timeScale: {
        visible:     false,
        borderColor: "transparent",
      },
      handleScroll: false,
      handleScale:  false,
    });

    // ── Add candlestick series ─────────────────────────────────────────────
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor:          "#00C853",
      downColor:        "#FF5252",
      borderUpColor:    "#00C853",
      borderDownColor:  "#FF5252",
      wickUpColor:      "#00C853",
      wickDownColor:    "#FF5252",
    });

    // ── Seed with 60 minutes of history ───────────────────────────────────
    const candles = generateInitialCandles(60);
    candleSeries.setData(candles);
    chart.timeScale().fitContent();

    // ── Live tick — update current candle every second ────────────────────
    let lastCandle = { ...candles[candles.length - 1] };

    const ticker = setInterval(() => {
      const move   = (Math.random() - 0.48) * 1.2;
      const close  = Math.max(2300, Math.min(2500, lastCandle.close + move));
      const high   = Math.max(lastCandle.high, close);
      const low    = Math.min(lastCandle.low,  close);

      lastCandle = { ...lastCandle, close, high, low };
      candleSeries.update(lastCandle);

      // Every 60 ticks (~1 min) open a new candle
    }, 1000);

    // Open a fresh candle every 60 s
    const newBarTimer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
      const open = lastCandle.close;
      lastCandle = { time: now, open, high: open, low: open, close: open };
      candleSeries.update(lastCandle);
    }, 60_000);

    // ── Resize observer ───────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      chart.resize(container.offsetWidth, container.offsetHeight);
    });
    ro.observe(container);

    return () => {
      clearInterval(ticker);
      clearInterval(newBarTimer);
      ro.disconnect();
      chart.remove();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* TradingView chart container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Gold gradient at top — blends the chart edge into the off-white bg */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.25) 0%, rgba(249,249,251,0.92) 55%, transparent 100%)",
        }}
      />

      {/* Radial centre wash — keeps headline text crisp */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 38% 48%, rgba(249,249,251,0.85) 0%, rgba(249,249,251,0.50) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
