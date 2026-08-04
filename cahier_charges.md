# REQUIREMENTS SPECIFICATION  
## Technical & Functional Specifications

**Project:** High-Performance Landing Page – YassineFX Elite  
**Project Name:** YassineFX Elite  
**Domain Name:** yassictfx.com (Yass + ICT + FX)  
**Reference Site:** fx-revolution.com  
**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Supabase  
**Version:** 1.1 (Revised)  
**Date:** August 2026

---

## 1 Project Overview & Objectives

### 1.1 General Context
YassineFX Elite is a professional trading brand specializing in the Gold market (XAU/USD), Forex, Copy Trading, and personalized coaching. To expand its community and maximise lead conversion, the client requires a high‑end, modern, and ultra‑fast landing page.

### 1.2 Strategic Objectives
- **Brand Image:** Position YassineFX Elite as a premium benchmark (White Luxury / sleek Fintech, Apple‑like aesthetics).
- **Lead Acquisition (Hook):** Capture **Name, Email, Phone** from every visitor in exchange for access to the free Telegram channel.
- **Smart Conversion Routing:**
  - Mentorship & Video Course requests → pre‑filled WhatsApp message.
  - VIP Signals & Copy Trading subscriptions → pre‑filled Telegram message.
- **No on‑site payments.** All transactions are handled externally via WhatsApp/Telegram. The pricing table is informational only.

---

## 2 Artistic Direction & User Experience (UX/UI)

### 2.1 Visual Identity & Theme
- **Style:** White Luxury Theme, **Dark Mode enabled by default** (Tailwind `class` strategy – `<html>` gets `dark` class on load, no manual toggle unless later required).
- **Inspiration:** Modern Fintech / Apple – clean, fast, high‑end.
- **Glassmorphism Cards:** `backdrop-blur`, subtle borders, soft shadows.
- **Backgrounds:** Dynamic market charts (Gold, Japanese candlesticks, Forex pairs).
- **Typography:** Inter / Plus Jakarta Sans.

### 2.2 Responsiveness & Animations
- **Mobile‑First:** Primary traffic comes from Instagram/Telegram – flawless smartphone experience.
- **Framer Motion:** Scroll‑triggered reveals, button micro‑interactions, animated pricing cards.
- **Animated Counters:** Numbers count up when the statistics section enters the viewport.

---

## 3 Structure & Detailed Content

Single‑page layout with smooth anchor navigation.

### 3.1 Header & Navigation
- Official YassineFX Elite logo.
- Anchor links: Services, Performance, Pricing, About, FAQ, Contact.
- Primary CTA button: “Join Free Telegram” → opens lead capture modal.

### 3.2 Hero Section
- **Main Title:** “Trade Smarter. Grow Faster.”
- **Subtitle:** “Professional Gold Trading Signals, Copy Trading & VIP Mentorship.”
- **Action Buttons:**
  - [Join VIP] → automated Telegram redirect.
  - [Start Copy Trading] → automated Telegram redirect.
- **Express Hook Form (inside hero or via modal):**  
  Fields: **Name, Email, Phone** (all required).  
  On submit → data stored in Supabase, then user redirected to free Telegram group.

### 3.3 Statistics Section (Key Figures)
Four animated counter cards:
1. Active Members
2. Success Rate
3. Years of Experience
4. Signals Sent

### 3.4 Services Section
- **VIP Signals:** Daily XAU/USD signals, strict risk management, live market analyses.
- **Copy Trading:** Minimum capital $200, 100% automated, beginner‑friendly.
- **Trading Mentorship:**
  - 1‑on‑1 Coaching (Price Action, SMC, Risk Management)
  - Structured video course (self‑paced)

### 3.5 TradingView Widget & Performance Section
- Live TradingView chart (XAU/USD).
- Performance proofs: profit charts, winning trade screenshots, monthly recaps. *(Assets to be provided by client)*
- Client reviews: testimonial carousel. *(Content to be provided by client)*

### 3.6 Pricing Section (Informational – No Payments)
| Offer               | Price / Condition      | Main Features                                           |
|---------------------|------------------------|---------------------------------------------------------|
| VIP Membership      | $50/month              | Daily signals, analyses, VIP community                  |
| Copy Trading        | Min. deposit $200      | Professional risk management, 100% managed              |
| 1-on-1 Coaching     | Custom                 | Personalized SMC & Price Action mentorship              |

**All CTAs in this section redirect to Telegram or WhatsApp** with a pre‑filled message (see §4.2). No payment gateway integration.

### 3.7 About Section
Brand story: disciplined trading, risk management, guiding traders toward long‑term profitability.

### 3.8 FAQ Section (8–10 Questions)
Collapsible accordions covering VIP channel operation, required capital, coaching access, account security, payment options.  
*(Client to provide final Q&A list – placeholder questions can be used during development.)*

### 3.9 Contact Section & Footer
- Direct links: WhatsApp, Telegram, Instagram, Email.
- Web contact form.
- Legal pages: **Privacy Policy**, **Terms & Conditions**, **Risk Disclaimer** – text to be supplied by client; developer will create dedicated pages (or modals) and link them in the footer.
- Copyright notice: © 2026 YassineFX Elite.

---

## 4 Technical Architecture & Backend

### 4.1 Tech Stack
- **Frontend:** Next.js (App Router, SSR/SSG for SEO)
- **Styling:** Tailwind CSS (mobile‑first, dark mode `class` strategy)
- **Animations:** Framer Motion
- **Backend/Database:** Supabase (leads storage, optional API)
- **Hosting:** Vercel (CI/CD, global CDN, HTTPS)
- **Domain:** yassictfx.com

### 4.2 Business Logic & Lead Automation

#### 4.2.1 Mandatory Lead Capture (Free Telegram Access)
- Form collects **Name, Email, Phone**.
- Form includes:
  - **Mandatory consent checkbox** – “I agree to the Privacy Policy and consent to being contacted.”
  - **Anti‑spam protection** – Cloudflare Turnstile or Google reCAPTCHA v3.
- On successful submission:
  1. Data stored in Supabase `leads` table (columns: `name`, `email`, `phone`, `created_at`).
  2. User is automatically redirected to the Free Telegram invite link.
- *No lead will be stored without explicit consent and spam check.*

#### 4.2.2 WhatsApp Dynamic Routing (Mentorship & Video Course)
Click on any Coaching/Course CTA generates a WhatsApp URL:  
`https://wa.me/<PHONE_NUMBER>?text=Hello,%20I%20would%20like%20information%20about%20the%20[1-on-1%20Coaching/Course]`

- Replace `<PHONE_NUMBER>` with the client’s official WhatsApp number in international format (no `+`).  
  **→ Configuration placeholder – client to provide number**

#### 4.2.3 Telegram Dynamic Routing (VIP & Copy Trading)
Click on VIP/Copy Trading CTA opens a direct Telegram link with a pre‑filled message to the admin or bot.  
**→ Configuration placeholder – client to provide Telegram username, bot link, or invite link and the exact message text**

#### 4.2.4 Configuration Table (to be filled before deployment)
| Variable              | Description                             | Example value                        |
|-----------------------|-----------------------------------------|--------------------------------------|
| `WA_NUMBER`           | WhatsApp phone number (no +)           | `212600000000`                       |
| `TG_VIP_LINK`         | Telegram link for VIP/Copy Trading      | `https://t.me/username`              |
| `FREE_TG_INVITE`      | Free Telegram group invite link         | `https://t.me/+invitehash`           |

---

## 5 Non‑Functional Requirements & Security

- **Performance:** Google PageSpeed score > 90/100. Full page load under 1.5 seconds.
- **SEO:**
  - OpenGraph tags (title, description, social image).
  - Optimised meta tags.
  - **Strict heading hierarchy:**  
    - H1: “Trade Smarter. Grow Faster.” (Hero title)  
    - H2: Section titles (Services, Performance, Pricing, About, FAQ, Contact)  
    - H3: Sub‑section titles (e.g., “VIP Signals”, “Copy Trading”, “1‑on‑1 Coaching”)
- **Compliance & Security:**
  - Server‑side or edge validation of all form inputs.
  - Anti‑spam (Turnstile/reCAPTCHA v3).
  - GDPR‑compliant consent mechanism for storing personal data (checkbox + privacy link).
- **Legal Disclaimers:** High‑risk warning about leveraged financial instruments must appear clearly (e.g., footer or form disclaimer).
- **Analytics & Cookies (Optional but Recommended):**
  - Integrate Google Analytics 4 and/or Meta Pixel if needed.
  - Implement a cookie consent banner (e.g., CookieYes, Osano) that fires only when tracking scripts are active.  
  - *Tracking IDs to be supplied by client.*
- **Dark Mode Implementation:** Tailwind `darkMode: 'class'`, `<html>` tag rendered with `class="dark"` on initial load.

---

## 6 Content & Assets Delivery
The following items are required from the client and are **not** included in development scope unless specified otherwise:
- FAQ questions & answers (8–10 items)
- Performance screenshots / profit charts / trade images
- Testimonial text and/or user photos
- Privacy Policy, Terms & Conditions, Risk Disclaimer full text
- Exact WhatsApp/Telegram link parameters (see §4.2.4)

*During development, placeholder content may be used; final integration will happen once assets are supplied.*

---

## 7 Out of Scope
- Payment gateway integration (Stripe, PayPal, etc.)
- Multi‑language support
- User dashboard or member area beyond lead capture
- Manual dark/light mode toggle

---

*End of specification.*