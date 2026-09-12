"use client";

import { useRef } from "react";
import PillSelect from "@/components/ui/PillSelect";
import type { ExperienceLevel } from "@/lib/validation/funnels.schema";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StepAboutData {
  fullName:        string;
  email:           string;
  country:         string;
  experienceLevel: ExperienceLevel;
}

interface CoachingStepAboutProps {
  data:     StepAboutData;
  onChange: <K extends keyof StepAboutData>(field: K, value: StepAboutData[K]) => void;
  errors:   Partial<Record<keyof StepAboutData, string>>;
  onNext:   () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel }[] = [
  { label: "Just starting",      value: "just_starting"   },
  { label: "Some experience",    value: "some_experience" },
  { label: "Experienced trader", value: "experienced"     },
];

const COUNTRIES = [
  "Morocco", "Algeria", "Tunisia", "Egypt", "Saudi Arabia",
  "UAE", "Jordan", "France", "Canada", "United Kingdom",
  "United States", "Germany", "Other",
];

// ─── Shared input style helper ────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return [
    "w-full bg-white/5 text-white placeholder:text-white/25 text-sm",
    "px-4 py-3 rounded-xl outline-none transition-colors border",
    hasError
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-amber-400/40",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingStepAbout({
  data,
  onChange,
  errors,
  onNext,
}: CoachingStepAboutProps) {
  const nameRef:    React.RefObject<HTMLInputElement | null> = useRef(null);
  const emailRef:   React.RefObject<HTMLInputElement | null> = useRef(null);
  const countryRef: React.RefObject<HTMLInputElement | null> = useRef(null);

  return (
    <div className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          Full Name
        </label>
        <input
          ref={nameRef}
          type="text"
          placeholder="e.g. Yassine El Aroui"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          autoComplete="name"
          className={inputCls(!!errors.fullName)}
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          Email Address
        </label>
        <input
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
          className={inputCls(!!errors.email)}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Country */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
          Country
        </label>
        <div className="relative">
          <select
            value={COUNTRIES.includes(data.country) ? data.country : "Other"}
            onChange={(e) => {
              if (e.target.value !== "Other") onChange("country", e.target.value);
              else onChange("country", "");
            }}
            className={[
              inputCls(!!errors.country),
              "appearance-none cursor-pointer",
            ].join(" ")}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-[#0e0e12]">
                {c}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {/* Freeform fallback for "Other" */}
        {(!COUNTRIES.includes(data.country) || data.country === "") && (
          <input
            ref={countryRef}
            type="text"
            placeholder="Enter your country"
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
            className={[inputCls(!!errors.country), "mt-2"].join(" ")}
            autoComplete="country-name"
          />
        )}
        {errors.country && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.country}</p>
        )}
      </div>

      {/* Experience level */}
      <div>
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">
          How much have you traded?
        </label>
        <PillSelect
          name="experienceLevel"
          options={EXPERIENCE_OPTIONS}
          value={data.experienceLevel}
          onChange={(v) => onChange("experienceLevel", v as ExperienceLevel)}
        />
        {errors.experienceLevel && (
          <p className="text-red-400 text-xs mt-1" role="alert">{errors.experienceLevel}</p>
        )}
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-[#e0b13e] hover:bg-[#f0c454] text-black font-semibold py-3.5 rounded-xl transition mt-2"
      >
        Continue →
      </button>
    </div>
  );
}
