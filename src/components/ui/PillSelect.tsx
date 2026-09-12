"use client";

interface Option {
  label: string;
  value: string;
}

interface PillSelectProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  name?: string;
}

export default function PillSelect({
  options,
  value,
  onChange,
  name,
}: PillSelectProps) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-xl px-4 py-2.5 text-sm cursor-pointer transition text-center",
              isSelected
                ? "bg-amber-400/10 border border-amber-400 text-amber-400 font-medium"
                : "bg-[#16161a] border border-white/10 text-neutral-400 hover:border-white/20 hover:text-white",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
