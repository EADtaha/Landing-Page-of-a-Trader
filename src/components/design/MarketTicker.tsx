"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// MarketTicker — Hydration-safe live market data bar
//
// Architecture:
//  - Initial render uses STATIC_FALLBACK so SSR and client HTML match exactly
//    (avoids Next.js hydration mismatch).
//  - After mount, fetches real XAU/USD from goldprice.dev (free, no API key)
//    and real FX rates from Frankfurter API, polling every 5 s.
//  - DXY and S&P 500 are not available on free public APIs; they show
//    "—" when live data is unavailable.
// ---------------------------------------------------------------------------

interface MarketItem {
  symbol:   string;
  price:    string;
  change:   string;
  positive: boolean;
}

const STATIC_FALLBACK: MarketItem[] = [
  { symbol: "XAU/USD",  price: "—",       change: "—",      positive: true  },
  { symbol: "EUR/USD",  price: "—",       change: "—",      positive: true  },
  { symbol: "GBP/USD",  price: "—",       change: "—",      positive: true  },
  { symbol: "DXY",      price: "—",       change: "—",      positive: false },
  { symbol: "S&P 500",  price: "—",       change: "—",      positive: true  },
  { symbol: "BTC/USD",  price: "—",       change: "—",      positive: true  },
  { symbol: "OIL (WTI)",price: "—",       change: "—",      positive: false },
  { symbol: "GOLD FUT", price: "—",       change: "—",      positive: true  },
];

// Fetch XAU/USD spot from goldprice.dev (free, no key, ~1 min latency)
async function fetchGold(): Promise<{ price: number } | null> {
  try {
    const res = await fetch(
      "https://goldprice.dev/v1/prices?symbol=XAU-USD-SPOT",
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Response: { price: number, bid: number, ask: number, computed_at: string }
    if (typeof data?.price === "number") return { price: data.price };
    return null;
  } catch {
    return null;
  }
}

// Fetch EUR/USD and GBP/USD from Frankfurter (free, no key)
async function fetchFx(): Promise<{ eur: number; gbp: number } | null> {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP",
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const eur = data?.rates?.EUR;
    const gbp = data?.rates?.GBP;
    if (typeof eur === "number" && typeof gbp === "number") {
      // Frankfurter gives USD → EUR; invert for EUR/USD
      return { eur: 1 / eur, gbp: 1 / gbp };
    }
    return null;
  } catch {
    return null;
  }
}

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function getSession(): "LONDON" | "NEW YORK" | "ASIAN" | null {
  const hour = new Date().getUTCHours();
  if (hour >= 8 && hour < 17) return "LONDON";
  if (hour >= 13 && hour < 22) return "NEW YORK";
  if (hour >= 0  && hour < 8 ) return "ASIAN";
  return null;
}

export default function MarketTicker() {
  // Start with static fallback — never causes hydration mismatch
  const [items, setItems]     = useState<MarketItem[]>(STATIC_FALLBACK);
  const [session, setSession] = useState<"LONDON" | "NEW YORK" | "ASIAN" | null>(null);

  useEffect(() => {
    // Session is client-only (depends on current time)
    setSession(getSession());

    let prevGold = 0;
    let prevEur  = 0;
    let prevGbp  = 0;

    async function refresh() {
      const [gold, fx] = await Promise.all([fetchGold(), fetchFx()]);

      setItems(prev => prev.map(item => {
        switch (item.symbol) {
          case "XAU/USD": {
            if (!gold) return item;
            const p    = gold.price;
            const diff = prevGold ? ((p - prevGold) / prevGold) * 100 : 0;
            prevGold   = p;
            return {
              ...item,
              price:    `$${fmt(p, 2)}`,
              change:   prevGold === p ? item.change : `${diff >= 0 ? "+" : ""}${diff.toFixed(2)}%`,
              positive: diff >= 0,
            };
          }
          case "EUR/USD": {
            if (!fx) return item;
            const p    = fx.eur;
            const diff = prevEur ? ((p - prevEur) / prevEur) * 100 : 0;
            prevEur    = p;
            return {
              ...item,
              price:    fmt(p, 4),
              change:   prevEur === p ? item.change : `${diff >= 0 ? "+" : ""}${diff.toFixed(3)}%`,
              positive: diff >= 0,
            };
          }
          case "GBP/USD": {
            if (!fx) return item;
            const p    = fx.gbp;
            const diff = prevGbp ? ((p - prevGbp) / prevGbp) * 100 : 0;
            prevGbp    = p;
            return {
              ...item,
              price:    fmt(p, 4),
              change:   prevGbp === p ? item.change : `${diff >= 0 ? "+" : ""}${diff.toFixed(3)}%`,
              positive: diff >= 0,
            };
          }
          default:
            return item;
        }
      }));
    }

    refresh();
    const id = setInterval(refresh, 5_000);
    return () => clearInterval(id);
  }, []);

  // Duplicate items for seamless CSS ticker loop
  const all = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background:   "#FFFFFF",
        borderBottom: "1px solid rgba(229,231,235,1)",
      }}
      aria-label="Live market ticker"
    >
      <div className="flex items-stretch">
        {/* Sticky session badge */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5"
          style={{ borderRight: "1px solid rgba(212,175,55,0.2)", background: "#F9F9FB" }}
        >
          <div
            className={`h-2 w-2 rounded-full flex-shrink-0 ${
              session ? "bg-[#00C853] animate-pulse" : "bg-[#71737C]"
            }`}
          />
          <span
            className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap"
            style={{ color: session ? "#00C853" : "#71737C" }}
          >
            {session ? `${session} LIVE` : "CLOSED"}
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="ticker-wrap flex-1 overflow-hidden">
          <div
            className="ticker-inner"
            style={{ animation: "ticker 28s linear infinite" }}
          >
            {all.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-5 py-2.5"
                style={{ borderRight: "1px solid rgba(212,175,55,0.08)" }}
              >
                <span
                  className="text-[11px] font-mono-data font-semibold"
                  style={{ color: "#0D0E12" }}
                >
                  {item.symbol}
                </span>
                <span
                  className="text-[11px] font-mono-data"
                  style={{ color: "#4A4C54" }}
                >
                  {item.price}
                </span>
                <span
                  className="text-[11px] font-mono-data font-medium"
                  style={{ color: item.positive ? "#00C853" : "#FF5252" }}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
