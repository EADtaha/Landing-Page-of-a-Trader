"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// MarketTicker — Live market data with hydration-safe architecture
// - Server-side: Static fallback snapshot
// - Client-side: WebSocket connection after hydration
// ---------------------------------------------------------------------------

// Static fallback data for SSR/hydration safety
const STATIC_FALLBACK = [
  { symbol: "XAU/USD", price: "2,387.42", change: "+2.34%", positive: true },
  { symbol: "XAG/USD", price: "28.45", change: "+1.12%", positive: true },
  { symbol: "DXY", price: "104.23", change: "-0.43%", positive: false },
  { symbol: "S&P 500", price: "5,240.18", change: "+0.87%", positive: true },
  { symbol: "OIL", price: "78.45", change: "-1.20%", positive: false },
  { symbol: "BTC", price: "68,450.22", change: "+4.55%", positive: true },
  { symbol: "ETH", price: "3,450.12", change: "+2.18%", positive: true },
  { symbol: "GOLD FUTURES", price: "2,390.15", change: "+2.10%", positive: true },
];

interface MarketData {
  symbol: string;
  price: string;
  change: string;
  positive: boolean;
}

export default function MarketTicker() {
  const [data, setData] = useState<MarketData[]>(STATIC_FALLBACK);
  const [session, setSession] = useState<"LONDON" | "NEW YORK" | "ASIAN" | null>(null);

  // Determine current session based on UTC time
  useEffect(() => {
    const getSession = (): "LONDON" | "NEW YORK" | "ASIAN" | null => {
      const hour = new Date().getUTCHours();
      // London: 8:00-17:00 UTC
      if (hour >= 8 && hour < 17) return "LONDON";
      // New York: 13:00-22:00 UTC
      if (hour >= 13 && hour < 22) return "NEW YORK";
      // Asian: 0:00-8:00 UTC
      if (hour >= 0 && hour < 8) return "ASIAN";
      return null;
    };

    setSession(getSession());
  }, []);

  // WebSocket simulation for production (replace with actual socket implementation)
  useEffect(() => {
    // Only connect after client hydration to avoid hydration mismatch
    const connectWebSocket = () => {
      // In production, replace this with actual WebSocket connection
      // Example: const ws = new WebSocket('wss://api.example.com/market');
      
      // For now, simulate live updates with a random walk
      const interval = setInterval(() => {
        setData(prev => prev.map(item => {
          // Small random change to simulate live market
          const changeMultiplier = Math.random() > 0.5 ? 1 : -1;
          const changeAmount = (Math.random() * 0.05).toFixed(2);
          const newChange = `${changeMultiplier > 0 ? '+' : ''}${changeAmount}%`;
          
          return {
            ...item,
            price: item.price, // Keep stable for demo
            change: newChange,
            positive: changeMultiplier > 0,
          };
        }));
      }, 3000);

      return () => clearInterval(interval);
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, []);

  return (
    <div
      className="ticker-wrap overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      <div className="ticker-inner flex">
        {/* Session indicator */}
        <div
          className="flex items-center gap-2 px-6 py-3"
          style={{ borderRight: "1px solid rgba(212,175,55,0.2)" }}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              session === "LONDON"
                ? "bg-[#00C853] animate-pulse"
                : session === "NEW YORK"
                ? "bg-[#00C853] animate-pulse"
                : session === "ASIAN"
                ? "bg-[#00C853]"
                : "bg-[#71737C]"
            }`}
          />
          <span
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: session ? "#00C853" : "#71737C" }}
          >
            {session ? `${session} SESSION LIVE` : "MARKET CLOSED"}
          </span>
        </div>

        {/* Market data */}
        {data.map((item, i) => (
          <div
            key={`${item.symbol}-${i}`}
            className="flex items-center gap-3 px-6 py-3"
            style={{
              borderRight: i < data.length - 1 ? "1px solid rgba(212,175,55,0.1)" : "none",
            }}
          >
            <span
              className="text-xs font-mono-data font-medium"
              style={{ color: "#0D0E12" }}
            >
              {item.symbol}
            </span>
            <span
              className="text-xs font-mono-data font-bold"
              style={{ color: "#4A4C54" }}
            >
              {item.price}
            </span>
            <span
              className="text-xs font-mono-data"
              style={{
                color: item.positive ? "#00C853" : "#FF5252",
              }}
            >
              {item.change}
            </span>
          </div>
        ))}

        {/* Duplicate for seamless loop */}
        {data.map((item, i) => (
          <div
            key={`dup-${item.symbol}-${i}`}
            className="flex items-center gap-3 px-6 py-3"
            style={{
              borderRight: i < data.length - 1 ? "1px solid rgba(212,175,55,0.1)" : "none",
            }}
          >
            <span
              className="text-xs font-mono-data font-medium"
              style={{ color: "#0D0E12" }}
            >
              {item.symbol}
            </span>
            <span
              className="text-xs font-mono-data font-bold"
              style={{ color: "#4A4C54" }}
            >
              {item.price}
            </span>
            <span
              className="text-xs font-mono-data"
              style={{
                color: item.positive ? "#00C853" : "#FF5252",
              }}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
