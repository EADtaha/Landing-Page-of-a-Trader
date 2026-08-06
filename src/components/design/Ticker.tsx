"use client";

const ITEMS = [
  { label: 'XAU/USD',      val: '+2.34%',    dir: 1  },
  { label: 'GOLD FUTURES', val: '$2,387.40', dir: 1  },
  { label: 'SILVER',       val: '+1.12%',    dir: 1  },
  { label: 'DXY',          val: '-0.43%',    dir: -1 },
  { label: 'S&P 500',      val: '+0.87%',    dir: 1  },
  { label: 'OIL',          val: '-1.20%',    dir: -1 },
  { label: 'BTC',          val: '+4.55%',    dir: 1  },
  { label: 'XAU/USD',      val: '+2.34%',    dir: 1  },
  { label: 'GOLD FUTURES', val: '$2,387.40', dir: 1  },
  { label: 'SILVER',       val: '+1.12%',    dir: 1  },
  { label: 'DXY',          val: '-0.43%',    dir: -1 },
  { label: 'S&P 500',      val: '+0.87%',    dir: 1  },
  { label: 'OIL',          val: '-1.20%',    dir: -1 },
  { label: 'BTC',          val: '+4.55%',    dir: 1  },
];

export default function Ticker() {
  return (
    <div
      className="ticker-wrap py-2 border-b border-t"
      style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.04)' }}
    >
      <div className="ticker-inner">
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-6 font-mono-data text-xs">
            <span className="text-white/40">{item.label}</span>
            <span style={{ color: item.dir > 0 ? '#22c55e' : '#ef4444' }}>{item.val}</span>
            <span style={{ color: 'rgba(201,168,76,0.3)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
