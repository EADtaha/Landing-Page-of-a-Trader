import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "YassICTFX — Institutional Gold Trading Signals & Mentorship",
  description: "Daily institutional-grade XAU/USD signals, Copy Trading, and 1-on-1 ICT mentorship. Trusted by 1,700+ active traders worldwide.",
  keywords: ["XAU USD signals", "gold trading signals", "ICT trading", "institutional forex", "copy trading", "gold mentorship", "YassICTFX"],
  openGraph: {
    title:       "YassICTFX — Trade Gold. Print Profits.",
    description: "Institutional-grade XAU/USD signals, live coaching, and a structured trading system trusted by 1,700+ active traders.",
    url:         "https://yassictfx.com",
    siteName:    "YassICTFX",
    locale:      "en_US",
    type:        "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "YassICTFX — Trade Gold. Print Profits.",
    description: "Institutional-grade XAU/USD signals, live coaching, and a structured trading system.",
  },
  metadataBase: new URL("https://yassictfx.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
