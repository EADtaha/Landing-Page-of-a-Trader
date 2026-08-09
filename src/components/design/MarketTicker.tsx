"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Institutional Telemetry Bar — No API calls, verified metrics only
// Displays live session + key ecosystem metrics
// ---------------------------------------------------------------------------

function getSession(): "LONDON" | "NEW YORK" | "ASIAN" | null {
  const hour = new Date().getUTCHours();
  if (hour >= 8 && hour < 17) return "LONDON";
  if (hour >= 13 && hour < 22) return "NEW YORK";
  if (hour >= 0 && hour < 8) return "ASIAN";
  return null;
}

const TELEMETRY_METRICS = [
  { label: "85.4%", desc: "WIN RATE" },
  { label: "12,450+", desc: "PIPS / MONTH" },
  { label: "1:2.4", desc: "AVG RISK/REWARD" },
  { label: "1,700+", desc: "VIP TRADERS" },
  { label: "6+ YEARS", desc: "XAU/USD SPEC" },
];

export default function MarketTicker() {
  const [session, setSession] = useState<"LONDON" | "NEW YORK" | "ASIAN" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSession(getSession());
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full h-16 flex items-center px-6"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(229, 231, 235, 1)",
        }}
      />
    );
  }

  return (
    <div
      className="w-full flex items-stretch"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(229, 231, 235, 1)",
      }}
      aria-label="Institutional telemetry bar"
    >
      {/* Live Session Badge (sticky left) */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-6 py-4"
        style={{
          borderRight: "1px solid rgba(229, 231, 235, 1)",
          background: "#F9F9FB",
        }}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
            session ? "bg-[#00C853] animate-pulse" : "bg-[#D1D5DB]"
          }`}
          style={{
            boxShadow: session ? "0 0 8px rgba(0, 200, 83, 0.6)" : "none",
          }}
        />
        <span
          className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap"
          style={{ color: session ? "#00C853" : "#6B7280" }}
        >
          {session ? `${session} · LIVE` : "CLOSED"}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="flex-1 flex items-stretch overflow-x-auto">
        {TELEMETRY_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center flex-1 min-w-max px-4 py-4"
            style={{
              borderRight:
                idx < TELEMETRY_METRICS.length - 1
                  ? "1px solid rgba(229, 231, 235, 1)"
                  : "none",
            }}
          >
            <div
              className="font-mono text-sm font-bold leading-tight"
              style={{ color: "#0D0E12", fontFamily: "JetBrains Mono, monospace" }}
            >
              {metric.label}
            </div>
            <div
              className="text-[10px] font-semibold tracking-wider uppercase mt-0.5"
              style={{ color: "#6B7280" }}
            >
              {metric.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
