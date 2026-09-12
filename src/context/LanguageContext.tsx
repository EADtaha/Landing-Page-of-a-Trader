"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "@/lib/i18n/translations";

// ─── Context shape ────────────────────────────────────────────────────────────

interface LanguageContextValue {
  lang:    Lang;
  setLang: (lang: Lang) => void;
  t:       Translations;
  isRTL:   boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const LanguageContext = createContext<LanguageContextValue>({
  lang:    "en",
  setLang: () => undefined,
  t:       translations.en,
  isRTL:   false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "preferred_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount — runs client-side only
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "ar") setLangState(stored);
    } catch {
      // localStorage may be unavailable (SSR safety)
    }
  }, []);

  // Sync document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
  }, []);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t:     translations[lang],
    isRTL: lang === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
