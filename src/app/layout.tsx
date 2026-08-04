import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YassineFX Elite – Professional Gold Trading Signals & VIP Mentorship",
  description:
    "Daily XAU/USD signals, Copy Trading, and 1-on-1 coaching by YassineFX Elite. Trade smarter. Grow faster.",
  openGraph: {
    title: "YassineFX Elite – Trade Smarter. Grow Faster.",
    description:
      "Professional Gold Trading Signals, Copy Trading & VIP Mentorship.",
    url: "https://yassictfx.com",
    siteName: "YassineFX Elite",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YassineFX Elite – Trade Smarter. Grow Faster.",
    description:
      "Professional Gold Trading Signals, Copy Trading & VIP Mentorship.",
  },
  metadataBase: new URL("https://yassictfx.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dark class set on <html> at the root — §2.1 (Tailwind darkMode: 'class')
    // No flash of light mode: the class is present on the initial server render.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
