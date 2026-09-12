"use client";

import { useState } from "react";
import StepProgress from "@/components/ui/StepProgress";
import CoachingStepAbout, { type StepAboutData } from "@/components/funnels/CoachingStepAbout";
import CoachingStepGoals, { type StepGoalsData } from "@/components/funnels/CoachingStepGoals";
import type {
  ExperienceLevel,
  AccountSize,
  StartTiming,
} from "@/lib/validation/funnels.schema";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

type StepAboutErrors  = Partial<Record<keyof StepAboutData, string>>;
type StepGoalsErrors  = Partial<Record<keyof StepGoalsData, string>>;

type ApiSuccessResponse = { success: true; whatsappUrl: string };
type ApiErrorResponse   = { error: string; fields?: Record<string, string[]> };

const STEP_LABELS: Record<1 | 2, string> = {
  1: "About you",
  2: "Trading & goals",
};

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_ABOUT: StepAboutData = {
  fullName:        "",
  email:           "",
  country:         "Morocco",
  experienceLevel: "just_starting" as ExperienceLevel,
};

const INITIAL_GOALS: StepGoalsData = {
  accountSize: "under_1k" as AccountSize,
  obstacle:    "",
  startTiming: "ready_now" as StartTiming,
  notes:       "",
};

// ─── Validators ───────────────────────────────────────────────────────────────

function validateAbout(data: StepAboutData): StepAboutErrors {
  const errors: StepAboutErrors = {};
  if (data.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name (at least 2 characters).";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (data.country.trim().length < 2)
    errors.country = "Please enter your country.";
  return errors;
}

function validateGoals(data: StepGoalsData): StepGoalsErrors {
  const errors: StepGoalsErrors = {};
  if (!data.obstacle)
    errors.obstacle = "Please select what's holding you back.";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [aboutData,   setAboutData]   = useState<StepAboutData>(INITIAL_ABOUT);
  const [goalsData,   setGoalsData]   = useState<StepGoalsData>(INITIAL_GOALS);
  const [aboutErrors, setAboutErrors] = useState<StepAboutErrors>({});
  const [goalsErrors, setGoalsErrors] = useState<StepGoalsErrors>({});
  const [apiError,    setApiError]    = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Field helpers ────────────────────────────────────────────────────────

  function setAboutField<K extends keyof StepAboutData>(
    field: K,
    value: StepAboutData[K]
  ) {
    setAboutData((prev) => ({ ...prev, [field]: value }));
    if (aboutErrors[field]) setAboutErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function setGoalsField<K extends keyof StepGoalsData>(
    field: K,
    value: StepGoalsData[K]
  ) {
    setGoalsData((prev) => ({ ...prev, [field]: value }));
    if (goalsErrors[field]) setGoalsErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  // ── Step navigation ──────────────────────────────────────────────────────

  function handleNextStep() {
    const errors = validateAbout(aboutData);
    if (Object.keys(errors).length > 0) {
      setAboutErrors(errors);
      return;
    }
    setAboutErrors({});
    setCurrentStep(2);
  }

  function handleBack() {
    setCurrentStep(1);
    setApiError(null);
  }

  // ── Final submit ─────────────────────────────────────────────────────────

  async function handleSubmit() {
    const errors = validateGoals(goalsData);
    if (Object.keys(errors).length > 0) {
      setGoalsErrors(errors);
      return;
    }
    setGoalsErrors({});
    setApiError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/coaching", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          fullName:        aboutData.fullName,
          email:           aboutData.email,
          country:         aboutData.country,
          experienceLevel: aboutData.experienceLevel,
          accountSize:     goalsData.accountSize,
          obstacle:        goalsData.obstacle,
          startTiming:     goalsData.startTiming,
          notes:           goalsData.notes || undefined,
        }),
      });

      const data: ApiSuccessResponse | ApiErrorResponse = await res.json();

      if (!res.ok || "error" in data) {
        const err = data as ApiErrorResponse;
        setApiError(err.error ?? "Something went wrong. Please try again.");
        return;
      }

      const { whatsappUrl } = data as ApiSuccessResponse;

      // Advance to success screen then open WhatsApp
      setCurrentStep(3);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Progress bar — shown only on steps 1 & 2 */}
      {currentStep !== 3 && (
        <StepProgress
          currentStep={currentStep}
          totalSteps={2}
          stepLabel={STEP_LABELS[currentStep as 1 | 2]}
        />
      )}

      {/* API-level error banner */}
      {apiError && (
        <div
          role="alert"
          className="rounded-xl px-4 py-3 text-sm text-red-300 bg-red-500/8 border border-red-500/20"
        >
          {apiError}
        </div>
      )}

      {/* Step 1 */}
      {currentStep === 1 && (
        <CoachingStepAbout
          data={aboutData}
          onChange={setAboutField}
          errors={aboutErrors}
          onNext={handleNextStep}
        />
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <CoachingStepGoals
          data={goalsData}
          onChange={setGoalsField}
          errors={goalsErrors}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}

      {/* Step 3 — success screen */}
      {currentStep === 3 && (
        <div className="py-8 text-center space-y-4">
          {/* Gold checkmark */}
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg,#C9A84C,#E8C97A)" }}
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="#080808"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="w-8 h-8" aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3 className="text-white font-bold text-xl">Application received!</h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
            Your application has been sent. A WhatsApp conversation has been opened — I&apos;ll
            be in touch within 24 hours.
          </p>

          <p className="text-xs text-neutral-600">
            Didn&apos;t see WhatsApp open?{" "}
            <button
              type="button"
              onClick={handleSubmit}
              className="text-amber-400 hover:text-amber-300 underline transition"
            >
              Tap here to retry
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
