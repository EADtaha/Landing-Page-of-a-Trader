"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { leadSchema, type RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Which CTA triggered this modal – determines redirect destination */
  destination?: RedirectDestination;
}

type FormFields = {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof FormFields, string[]>>;

type ApiSuccessResponse = {
  success: true;
  redirectUrl: string | null;
};

type ApiErrorResponse = {
  error: string;
  fields?: FieldErrors;
};

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DESTINATION_LABELS: Record<RedirectDestination, string> = {
  free_telegram:         "Join Free Telegram",
  vip_telegram:          "Join VIP Channel",
  copy_trading_telegram: "Start Copy Trading",
  mentorship_whatsapp:   "Book 1-on-1 Coaching",
  video_course_whatsapp: "Get Video Course",
};

const INITIAL_FORM: FormFields = {
  name: "",
  email: "",
  phone: "",
  consent: false,
};

// Client-side Zod schema (omit captchaToken – handled server-side only)
const clientSchema = leadSchema.omit({ captchaToken: true });

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  errors?: string[];
  autoComplete?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  errors,
  autoComplete,
  inputRef,
}: InputFieldProps) {
  const hasError = errors && errors.length > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={[
          "w-full rounded-xl px-4 py-3 text-sm",
          "bg-white/5 text-white placeholder:text-slate-500",
          "border transition-colors duration-200",
          "input-gold-focus",
          hasError
            ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgb(239_68_68/0.2)]"
            : "border-white/10",
        ].join(" ")}
      />
      <AnimatePresence mode="wait">
        {hasError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-red-400"
          >
            {errors[0]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LeadModal
// ---------------------------------------------------------------------------

export default function LeadModal({
  isOpen,
  onClose,
  destination = "free_telegram",
}: LeadModalProps) {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus the first input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear field-level error on change
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (apiError) setApiError(null);
  }

  function reset() {
    setForm(INITIAL_FORM);
    setFieldErrors({});
    setApiError(null);
    setLoading(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    // Client-side validation first
    const clientResult = clientSchema.safeParse({ ...form, destination });
    if (!clientResult.success) {
      setFieldErrors(
        clientResult.error.flatten().fieldErrors as FieldErrors
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, destination }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || "error" in data) {
        const errData = data as ApiErrorResponse;
        if (errData.fields) {
          setFieldErrors(errData.fields as FieldErrors);
        }
        setApiError(errData.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Success — redirect if a URL was returned, otherwise close the modal.
      // redirectUrl may be null in dev when destination env vars are not set yet.
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        handleClose();
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const ctaLabel = DESTINATION_LABELS[destination];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* ── Modal panel ── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Lead capture – ${ctaLabel}`}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={[
              "fixed inset-x-4 top-1/2 z-50 -translate-y-1/2",
              "mx-auto w-full max-w-md",
              "glass-card-gold p-8",
            ].join(" ")}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className={[
                "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full",
                "text-slate-400 transition-colors duration-150",
                "hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-7 space-y-1.5">
              {/* Gold decorative bar */}
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
              <h2 className="text-xl font-bold text-white">{ctaLabel}</h2>
              <p className="text-sm text-slate-400">
                Enter your details to get instant access.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <InputField
                id="lead-name"
                label="Full Name"
                placeholder="Ahmed Yassine"
                value={form.name}
                onChange={(v) => setField("name", v)}
                errors={fieldErrors.name}
                autoComplete="name"
                inputRef={firstInputRef}
              />

              <InputField
                id="lead-email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(v) => setField("email", v)}
                errors={fieldErrors.email}
                autoComplete="email"
              />

              <InputField
                id="lead-phone"
                label="Phone Number"
                type="tel"
                placeholder="+212 6 00 000 000"
                value={form.phone}
                onChange={(v) => setField("phone", v)}
                errors={fieldErrors.phone}
                autoComplete="tel"
              />

              {/* Consent checkbox */}
              <div className="space-y-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      id="lead-consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      aria-invalid={
                        fieldErrors.consent?.length ? "true" : undefined
                      }
                      aria-describedby={
                        fieldErrors.consent?.length
                          ? "consent-error"
                          : undefined
                      }
                      className="peer sr-only"
                    />
                    {/* Custom checkbox visual */}
                    <div
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded-md border transition-colors duration-200",
                        form.consent
                          ? "border-[var(--color-gold-500)] bg-[var(--color-gold-500)]"
                          : fieldErrors.consent?.length
                          ? "border-red-500/70 bg-transparent"
                          : "border-white/20 bg-white/5",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {form.consent && (
                        <svg
                          className="h-3 w-3 text-black"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="1.5 6 4.5 9 10.5 3" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs leading-relaxed text-slate-400">
                    I agree to the{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-gold-400)] underline underline-offset-2 hover:text-[var(--color-gold-300)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted.
                  </span>
                </label>

                <AnimatePresence mode="wait">
                  {fieldErrors.consent?.length && (
                    <motion.p
                      id="consent-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="pl-8 text-xs text-red-400"
                    >
                      {fieldErrors.consent[0]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* API-level error banner */}
              <AnimatePresence mode="wait">
                {apiError && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm"
              >
                {loading ? (
                  <>
                    {/* Spinner */}
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing…
                  </>
                ) : (
                  ctaLabel
                )}
              </button>

              {/* Legal disclaimer – §5 risk warning */}
              <p className="text-center text-[10px] leading-relaxed text-slate-600">
                Trading leveraged instruments involves significant risk and may
                not be suitable for all investors. Past performance is not
                indicative of future results.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
