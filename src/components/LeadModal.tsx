"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { leadSchema, type RedirectDestination } from "@/lib/validations/lead";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: RedirectDestination;
}

type FormFields = {
  name:    string;
  email:   string;
  phone:   string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof FormFields, string[]>>;

type ApiSuccessResponse = { success: true; redirectUrl: string | null };
type ApiErrorResponse   = { error: string; fields?: FieldErrors };
type ApiResponse        = ApiSuccessResponse | ApiErrorResponse;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DESTINATION_LABELS: Record<RedirectDestination, string> = {
  free_telegram:         "Join Free Telegram",
  vip_telegram:          "Join VIP Signals",
  copy_trading_telegram: "Start Copy Trading",
  mentorship_whatsapp:   "Book 1-on-1 Mentorship",
  video_course_whatsapp: "Get Video Course",
};

const INITIAL_FORM: FormFields = { name: "", email: "", phone: "", consent: false };

const clientSchema = leadSchema;

// ---------------------------------------------------------------------------
// InputField
// ---------------------------------------------------------------------------

interface InputFieldProps {
  id:           string;
  label:        string;
  type?:        string;
  placeholder?: string;
  value:        string;
  onChange:     (v: string) => void;
  errors?:      string[];
  autoComplete?:string;
  inputRef?:    React.RefObject<HTMLInputElement | null>;
}

function InputField({
  id, label, type = "text", placeholder,
  value, onChange, errors, autoComplete, inputRef,
}: InputFieldProps) {
  const hasError = !!errors?.length;

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
          "bg-slate-800/80 text-slate-100 placeholder:text-slate-500",
          "border transition-colors duration-200 input-focus",
          hasError
            ? "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_3px_rgb(239_68_68/0.2)]"
            : "border-slate-700",
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
            {errors![0]}
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
  const [form,        setFormState] = useState<FormFields>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError,    setApiError]    = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  /* Auto-focus first input */
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstInputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [isOpen]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function setField<K extends keyof FormFields>(key: K, val: FormFields[K]) {
    setFormState((p) => ({ ...p, [key]: val }));
    if (fieldErrors[key]) setFieldErrors((p) => ({ ...p, [key]: undefined }));
    if (apiError) setApiError(null);
  }

  function reset() {
    setFormState(INITIAL_FORM);
    setFieldErrors({});
    setApiError(null);
    setLoading(false);
  }

  function handleClose() { reset(); onClose(); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    const result = clientSchema.safeParse({ ...form, destination });
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch("/api/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, destination }),
      });
      const data: ApiResponse = await res.json();

      if (!res.ok || "error" in data) {
        const err = data as ApiErrorResponse;
        if (err.fields) setFieldErrors(err.fields as FieldErrors);
        setApiError(err.error ?? "Something went wrong. Please try again.");
        return;
      }

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
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={ctaLabel}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,    scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/2 rounded-2xl border border-cyan-500/25 bg-slate-900 p-8 shadow-2xl shadow-black/50"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" />
              <h2 className="text-xl font-bold text-white">{ctaLabel}</h2>
              <p className="mt-1 text-sm text-slate-400">
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
                label="Phone / Telegram Handle"
                type="tel"
                placeholder="+212 6 00 000 000"
                value={form.phone}
                onChange={(v) => setField("phone", v)}
                errors={fieldErrors.phone}
                autoComplete="tel"
              />

              {/* Consent */}
              <div className="space-y-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      id="lead-consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      aria-invalid={fieldErrors.consent?.length ? "true" : undefined}
                      aria-describedby={fieldErrors.consent?.length ? "consent-error" : undefined}
                      className="peer sr-only"
                    />
                    <div
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded-md border transition-colors duration-200",
                        form.consent
                          ? "border-cyan-500 bg-cyan-500"
                          : fieldErrors.consent?.length
                          ? "border-red-500/70 bg-transparent"
                          : "border-slate-600 bg-slate-800",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {form.consent && (
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor"
                          strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                          className="h-3 w-3 text-white">
                          <polyline points="1.5 6 4.5 9 10.5 3" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs leading-relaxed text-slate-400">
                    I agree to the{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                      onClick={(e) => e.stopPropagation()}>
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted.
                  </span>
                </label>
                <AnimatePresence mode="wait">
                  {!!fieldErrors.consent?.length && (
                    <motion.p id="consent-error" role="alert"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
                      className="pl-8 text-xs text-red-400">
                      {fieldErrors.consent[0]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* API error banner */}
              <AnimatePresence mode="wait">
                {apiError && (
                  <motion.div role="alert"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="btn-primary mt-2 w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Processing…
                  </>
                ) : ctaLabel}
              </button>

              {/* Risk disclaimer */}
              <p className="text-center text-[10px] leading-relaxed text-slate-600">
                Trading leveraged instruments involves significant risk. Past performance
                is not indicative of future results.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
