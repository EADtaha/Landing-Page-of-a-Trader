"use client";

import PillSelect from "@/components/ui/PillSelect";
import type { AccountSize, StartTiming } from "@/lib/validation/funnels.schema";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StepGoalsData {
  accountSize:  AccountSize;
  obstacle:     string;
  startTiming:  StartTiming;
  notes:        string;
}

interface CoachingStepGoalsProps {
  data:        StepGoalsData;
  onChange:    <K extends keyof StepGoalsData>(field: K, value: StepGoalsData[K]) => void;
  errors:      Partial<Record<keyof StepGoalsData, string>>;
  isSubmitting: boolean;
  onBack:      () => void;
  onSubmit:    () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCOUNT_SIZE_OPTIONS: { label: string; value: AccountSize }[] = [
  { label: "Under $1k",    value: "under_1k" },
  { label: "$1k – $5k",   value: "1k_5k"    },
  { label: "$5k – $20k",  value: "5k_20k"   },
  { label: "$20k+",        value: "20k_plus" },
];

const OBSTACLE_OPTIONS = [
  { label: "No clear strategy",         value: "No clear strategy"         },
  { label: "I keep blowing accounts",   value: "I keep blowing accounts"   },
  { label: "Emotions & discipline",     value: "Emotions & discipline"     },
  { label: "Stuck at break-even",       value: "Stuck at break-even"       },
  { label: "I'm just starting out",     value: "I'm just starting out"     },
];

const TIMING_OPTIONS: { label: string; value: StartTiming }[] = [
  { label: "Ready now",        value: "ready_now"     },
  { label: "Within a month",   value: "within_month"  },
  { label: "Just exploring",   value: "just_exploring"},
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingStepGoals({
  data,
  onChange,
  errors,
  isSubmitting,
  onBack,
  onSubmit,
}: CoachingStepGoalsProps) {
  return (
    <div className="space-y-6">

      {/* Account size */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">
          Account size you trade
        </label>
        <PillSelect
          name="accountSize"
          options={ACCOUNT_SIZE_OPTIONS}
          value={data.accountSize}
          onChange={(v) => onChange("accountSize", v as AccountSize)}
        />
        {errors.accountSize && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.accountSize}</p>
        )}
      </div>

      {/* Obstacle */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">
          What&apos;s holding you back right now?
        </label>
        <PillSelect
          name="obstacle"
          options={OBSTACLE_OPTIONS}
          value={data.obstacle}
          onChange={(v) => onChange("obstacle", v)}
        />
        {errors.obstacle && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.obstacle}</p>
        )}
      </div>

      {/* Start timing */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">
          When do you want to start?
        </label>
        <PillSelect
          name="startTiming"
          options={TIMING_OPTIONS}
          value={data.startTiming}
          onChange={(v) => onChange("startTiming", v as StartTiming)}
        />
        {errors.startTiming && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.startTiming}</p>
        )}
      </div>

      {/* Notes (optional) */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          Anything else I should know?{" "}
          <span className="normal-case text-neutral-600">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Any context that would help me prepare for our conversation…"
          value={data.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          className={[
            "w-full bg-white/5 text-white placeholder:text-white/25 text-sm",
            "px-4 py-3 rounded-xl outline-none transition-colors resize-none",
            "border",
            errors.notes
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-amber-400/40",
          ].join(" ")}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-[2] flex items-center justify-center gap-2 bg-[#e0b13e] hover:bg-[#f0c454] text-black font-semibold py-3.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              <span>Submitting…</span>
            </>
          ) : (
            "Submit application →"
          )}
        </button>
      </div>
    </div>
  );
}
