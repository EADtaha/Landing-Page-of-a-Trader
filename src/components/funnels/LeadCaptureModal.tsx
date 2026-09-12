"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldErrors = {
  name?: string[];
  email?: string[];
  phone?: string[];
};

type ApiSuccessResponse = { success: true; redirectUrl: string };
type ApiErrorResponse   = { error: string; fields?: FieldErrors };

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const { t, isRTL } = useLanguage();
  const m = t.modal;

  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [phone,       setPhone]       = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError,    setApiError]    = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef:  React.RefObject<HTMLInputElement | null> = useRef(null);
  const emailRef: React.RefObject<HTMLInputElement | null> = useRef(null);
  const phoneRef: React.RefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 80);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") handleClose(); }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleClose() {
    setName(""); setEmail(""); setPhone("");
    setFieldErrors({}); setApiError(null); setIsSubmitting(false);
    onClose();
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({}); setApiError(null); setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, consent: true }),
      });
      const data: ApiSuccessResponse | ApiErrorResponse = await res.json();
      if (!res.ok || "error" in data) {
        const err = data as ApiErrorResponse;
        if (err.fields) setFieldErrors(err.fields);
        setApiError(err.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.open((data as ApiSuccessResponse).redirectUrl, "_blank", "noopener,noreferrer");
      handleClose();
    } catch {
      setApiError(m.networkError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  const inputCls = (hasErr: boolean) =>
    [
      "w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors border",
      hasErr ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-amber-400/40",
      isRTL ? "text-right" : "",
    ].join(" ");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog" aria-modal="true" aria-label={m.title}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="bg-[#0e0e12] border border-white/10 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative pointer-events-auto">

          {/* Close */}
          <button type="button" onClick={handleClose} aria-label="Close modal"
            className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} text-white/30 hover:text-white/70 transition-colors`}>
            <X size={18} strokeWidth={2} />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {m.badge}
          </div>

          <h2 className="text-xl font-bold text-white mb-1">{m.title}</h2>
          <p className="text-sm text-neutral-400 mb-6">{m.subtitle}</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {/* Name */}
            <div>
              <input ref={nameRef} type="text" placeholder={m.namePlaceholder}
                value={name} onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
                autoComplete="name" className={inputCls(!!fieldErrors.name)}
              />
              {fieldErrors.name && <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.name[0]}</p>}
            </div>

            {/* Email */}
            <div>
              <input ref={emailRef} type="email" placeholder={m.emailPlaceholder}
                value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                autoComplete="email" className={inputCls(!!fieldErrors.email)}
              />
              {fieldErrors.email && <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.email[0]}</p>}
            </div>

            {/* Phone */}
            <div>
              <input ref={phoneRef} type="tel" placeholder={m.phonePlaceholder}
                value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError("phone"); }}
                autoComplete="tel" className={inputCls(!!fieldErrors.phone)}
              />
              {fieldErrors.phone && <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.phone[0]}</p>}
            </div>

            <p className="text-xs text-neutral-500">{m.privacyNote}</p>

            {apiError && (
              <div role="alert" className="rounded-xl px-4 py-3 text-sm text-red-300 bg-red-500/8 border border-red-500/20">
                {apiError}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="bg-[#e0b13e] hover:bg-[#f0c454] text-black font-semibold w-full py-3.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  <span>{m.submitting}</span>
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2} />
                  <span>{m.submit}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
