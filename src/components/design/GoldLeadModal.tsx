"use client";

import { useEffect, useRef, useState } from 'react';
import { leadSchema, type RedirectDestination } from '@/lib/validations/lead';

// ---------------------------------------------------------------------------
// Per-destination config — what the modal shows and where to send the user
// ---------------------------------------------------------------------------

const WA_BASE = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '212602716624'}`;

function resolveRedirectUrl(destination: RedirectDestination): string {
  const FREE_TG  = process.env.NEXT_PUBLIC_TG_FREE_INVITE      || 'https://t.me/XAUYASSINE';
  const VIP_TG   = process.env.NEXT_PUBLIC_TG_VIP_LINK         || 'https://t.me/yassinffx';
  const ASST_TG  = process.env.NEXT_PUBLIC_TELEGRAM_ASSISTANT_LINK || VIP_TG;   // fallback to VIP if not set
  const WA_LINK  = process.env.NEXT_PUBLIC_WHATSAPP_LINK || WA_BASE;

  switch (destination) {
    case 'free_telegram':
      return FREE_TG;
    case 'vip_telegram':
      return ASST_TG;
    case 'copy_trading_telegram':
      return ASST_TG;
    case 'video_course_whatsapp':
      return `${WA_LINK}?text=${encodeURIComponent('Hi Yassine, I submitted my details for the Full Course.')}`;
    case 'mentorship_whatsapp':
      return `${WA_LINK}?text=${encodeURIComponent('Hi Yassine, I submitted my details for 1-on-1 Coaching.')}`;
  }
}

function isTelegramDestination(destination: RedirectDestination): boolean {
  return destination === 'free_telegram'
    || destination === 'vip_telegram'
    || destination === 'copy_trading_telegram';
}

// ---------------------------------------------------------------------------
// Modal content per destination
// ---------------------------------------------------------------------------

const DEST_META: Record<RedirectDestination, { badge: string; heading: string; sub: string }> = {
  free_telegram:         {
    badge:   'Free Access',
    heading: 'Get instant access to free gold signals.',
    sub:     'Join 1,700+ traders — no payment required.',
  },
  vip_telegram:          {
    badge:   'VIP Signals',
    heading: 'Join the VIP Telegram signal channel.',
    sub:     'Daily XAU/USD signals with full entry and exit details.',
  },
  copy_trading_telegram: {
    badge:   'Copy Trading',
    heading: 'Start 100% automated copy trading.',
    sub:     'Min. $200 capital. Our assistant will walk you through setup.',
  },
  mentorship_whatsapp:   {
    badge:   '1-on-1 Coaching',
    heading: 'Apply for private 1-on-1 mentorship.',
    sub:     'Limited spots. You\'ll be connected directly via WhatsApp.',
  },
  video_course_whatsapp: {
    badge:   'Full Course',
    heading: 'Get lifetime access to the full trading course.',
    sub:     '40+ HD lessons, PDF resources, and lifetime updates.',
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GoldLeadModalProps {
  isOpen:       boolean;
  onClose:      () => void;
  destination?: RedirectDestination;
}

type FormFields = { name: string; email: string; phone: string; consent: boolean };
type FieldErrors = Partial<Record<keyof FormFields, string[]>>;
type ApiSuccessResponse = { success: true; redirectUrl: string | null };
type ApiErrorResponse   = { error: string; fields?: FieldErrors };
type ApiResponse        = ApiSuccessResponse | ApiErrorResponse;

const clientSchema = leadSchema;
const INITIAL: FormFields = { name: '', email: '', phone: '', consent: false };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GoldLeadModal({
  isOpen,
  onClose,
  destination = 'free_telegram',
}: GoldLeadModalProps) {
  const [form,        setFormState]   = useState<FormFields>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError,    setApiError]    = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null); // set on success
  const nameRef = useRef<HTMLInputElement>(null);

  const isTelegram   = isTelegramDestination(destination);
  const meta         = DEST_META[destination];
  const continueCta  = isTelegram ? 'Continue on Telegram →' : 'Continue on WhatsApp →';

  /* Auto-focus */
  useEffect(() => {
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 80);
  }, [isOpen]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* Reset state fully when destination changes (modal reused across CTAs) */
  useEffect(() => {
    if (isOpen) {
      setFormState(INITIAL);
      setFieldErrors({});
      setApiError(null);
      setRedirectUrl(null);
    }
  }, [destination, isOpen]);

  function handleClose() {
    setFormState(INITIAL);
    setFieldErrors({});
    setApiError(null);
    setRedirectUrl(null);
    setLoading(false);
    onClose();
  }

  function setField<K extends keyof FormFields>(k: K, v: FormFields[K]) {
    setFormState(p => ({ ...p, [k]: v }));
    if (fieldErrors[k]) setFieldErrors(p => ({ ...p, [k]: undefined }));
    if (apiError) setApiError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = clientSchema.safeParse({ ...form, destination });
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch('/api/lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, destination }),
      });
      const data: ApiResponse = await res.json();

      if (!res.ok || 'error' in data) {
        const err = data as ApiErrorResponse;
        if (err.fields) setFieldErrors(err.fields as FieldErrors);
        setApiError(err.error ?? 'Something went wrong. Please try again.');
        return;
      }

      // Resolve the final redirect URL:
      // prefer what the API returns (it has env access), fall back to client-side resolution
      const url = (data as ApiSuccessResponse).redirectUrl ?? resolveRedirectUrl(destination);
      setRedirectUrl(url);

      // Auto-open the destination in a new tab immediately on success
      if (url) window.open(url, '_blank', 'noopener,noreferrer');

    } catch {
      setApiError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleContinue() {
    if (redirectUrl) window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  }

  if (!isOpen) return null;

  const showSuccess = redirectUrl !== null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={meta.heading}
        className="fixed inset-x-4 top-1/2 z-[60] mx-auto w-full max-w-md -translate-y-1/2 rounded-3xl p-8"
        style={{
          background:  '#0F0F0F',
          border:      '1px solid rgba(201,168,76,0.35)',
          boxShadow:   '0 0 80px rgba(201,168,76,0.15), 0 40px 120px rgba(0,0,0,0.7)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 text-white/30 hover:text-white/70 transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {/* ── Success view ── */}
        {showSuccess ? (
          <div className="py-8 text-center">
            {/* Animated gold checkmark */}
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3
              className="font-display font-bold text-white text-2xl mb-2"
              style={{ fontStyle: 'italic' }}
            >
              Details received!
            </h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {isTelegram
                ? 'Your link has been opened in a new tab. Continue the conversation on Telegram.'
                : 'Your details have been sent. Continue the conversation on WhatsApp.'}
            </p>

            {/* Manual continue button (in case pop-up was blocked) */}
            <button
              onClick={handleContinue}
              className="w-full rounded-xl py-3.5 font-semibold text-sm transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
                color:      '#080808',
                boxShadow:  '0 8px 24px rgba(201,168,76,0.35)',
              }}
            >
              {continueCta}
            </button>

            <button
              onClick={handleClose}
              className="mt-3 w-full text-sm text-white/30 hover:text-white/50 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (

        /* ── Form view ── */
        <>
          {/* Header */}
          <div className="mb-6">
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}
            >
              {meta.badge}
            </div>
            <h2
              className="font-display font-bold text-white text-2xl leading-tight"
              style={{ fontStyle: 'italic' }}
            >
              {meta.heading}
            </h2>
            <p className="text-white/40 text-sm mt-2">{meta.sub}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setField('name', e.target.value)}
                autoComplete="name"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${fieldErrors.name ? 'rgba(239,68,68,0.6)' : 'rgba(201,168,76,0.2)'}`,
                }}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
                autoComplete="email"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${fieldErrors.email ? 'rgba(239,68,68,0.6)' : 'rgba(201,168,76,0.2)'}`,
                }}
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={e => setField('phone', e.target.value)}
                autoComplete="tel"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${fieldErrors.phone ? 'rgba(239,68,68,0.6)' : 'rgba(201,168,76,0.2)'}`,
                }}
              />
              {fieldErrors.phone && (
                <p className="text-red-400 text-xs mt-1" role="alert">{fieldErrors.phone[0]}</p>
              )}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => setField('consent', e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-colors"
                  style={{
                    background: form.consent ? '#C9A84C' : 'transparent',
                    border: `1px solid ${
                      fieldErrors.consent ? 'rgba(239,68,68,0.6)'
                        : form.consent   ? '#C9A84C'
                        : 'rgba(201,168,76,0.3)'
                    }`,
                  }}
                >
                  {form.consent && (
                    <svg viewBox="0 0 12 12" fill="none" stroke="#080808"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className="w-3 h-3" aria-hidden="true">
                      <polyline points="1.5 6 4.5 9 10.5 3" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-white/40 leading-relaxed">
                I agree to the{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#C9A84C' }}
                  onClick={e => e.stopPropagation()}
                >
                  Privacy Policy
                </a>{' '}
                and consent to being contacted.
              </span>
            </label>
            {fieldErrors.consent && (
              <p className="text-red-400 text-xs -mt-2 pl-8" role="alert">{fieldErrors.consent[0]}</p>
            )}

            {/* API error */}
            {apiError && (
              <div
                role="alert"
                className="rounded-xl px-4 py-3 text-sm text-red-300"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
                color:      '#080808',
                boxShadow:  '0 8px 24px rgba(201,168,76,0.35)',
              }}
            >
              {loading ? 'Saving your details…' : `Submit & ${continueCta}`}
            </button>

            <p className="text-center text-[10px] text-white/20 leading-relaxed">
              Trading involves substantial risk. Past performance is not indicative of future results.
            </p>
          </form>
        </>
        )}
      </div>
    </>
  );
}
