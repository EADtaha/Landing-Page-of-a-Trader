"use client";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export default function StepProgress({
  currentStep,
  totalSteps,
  stepLabel,
}: StepProgressProps) {
  return (
    <div className="w-full space-y-2">
      {/* Top row */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-neutral-500">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-neutral-300">{stepLabel}</span>
      </div>

      {/* Segmented progress track */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const filled = i + 1 <= currentStep;
          return (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: filled
                  ? "#e0b13e"
                  : "rgba(255, 255, 255, 0.1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
