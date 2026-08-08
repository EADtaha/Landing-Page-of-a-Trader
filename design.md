# YassICTFX --- Website Redesign Specification

## 1. Design Direction

### Core concept

Transform YassICTFX from a traditional long landing page into a
**premium, cinematic trading brand**.

The visual direction should combine:

-   Institutional trading / hedge-fund aesthetics
-   White Luxury & Matte Gold Edition
-   Live market movement
-   Subtle neon green accents
-   Cinematic video
-   Smooth scroll animations
-   Strong conversion-focused sections
-   A very different desktop and mobile composition

The site should feel like:

> **"A serious trader and trading ecosystem"**

---not a generic crypto website and not a "get rich quick" investment
page.

### Visual language & Color Balance

Follow the strict **80–15–5 Color Hierarchy Rule** to maintain an institutional wealth feel and prevent a cheap "crypto guru" aesthetic:

- **Primary Base (80–85%):**
  - Background: Off-white `#F9F9FB` / Crisp White `#FFFFFF`
  - Cards & Surfaces: White Glassmorphism / `#FFFFFF` with light subtle borders (`#E5E7EB`)
  - Typography Headers: Deep Charcoal `#0D0E12`
  - Body & Subtitles: Muted Charcoal `#4A4C54` / Metadata `#71737C`
- **Primary Accent (10–15%):**
  - Metallic Matte Gold `#D4AF37` (Gradients: `#C5A028` to `#9A7B1C`)
  - **Constraint:** Gold is strictly reserved for primary CTAs, key status highlights, active tab indicators, and subtle line accents. Do NOT paint all headlines, borders, or backgrounds gold.
- **Signal Accent (< 5%):**
  - Candlestick / Status Green `#00C853` (Used strictly for positive P&L metrics, live volatility indicators, and positive market status).
- **Styling Rules:**
  - Borders: Thin, low-contrast 1px dividers (`rgba(212, 175, 55, 0.2)` or `#E5E7EB`).
  - Shadows: Soft, ambient drop shadows (`0 10px 30px -10px rgba(0,0,0,0.05)`).
  - Anti-Patterns: No heavy neon glows, no excessive floating particles, no fake luxury gold foil overlays, and zero "get-rich-quick" graphics.

------------------------------------------------------------------------
# 2. HERO — Major Change & Cohesive Composition

## Concept & Objective

The hero section must immediately establish four core signals within 5 seconds:
1. **This is a real trader** (Cinematic trading footage).
2. **The asset specialization is XAU/USD / Gold** (3D Gold Bar + Ambient Gold Chart).
3. **The ecosystem offers Signals + Education + Mentorship** (Clear subheadline).
4. **There is an explicit next action** (Primary CTA to Lead Ticket / VIP Access).

---

### 2.1 Hero Visual Elements

1. **3D Gold Bar Hook (`src/components/SpinningGoldBar.tsx`):**
   - **Location:** Left Column, above the volatility badge.
   - **Animation Speed:** Slow, heavy, continuous 360° rotation (12–15s duration). It must feel like an institutional asset emblem rather than a fast crypto coin loop.
   - **Lighting:** Soft ambient gold glow (`#D4AF37/20 blur-xl`).

2. **Ambient Background XAU/USD Chart (`src/components/BackgroundChart.tsx`):**
   - **Location:** Absolute background layer behind left/right hero content (`z-0`).
   - **Opacity:** Locked at 10–15% opacity with a radial gradient mask so it stays subtle and never interferes with text readability.

3. **Cinematic 9:16 Video Container (Right Column):**
   - Vertical ratio container showing Yassine at work, close-ups of XAU/USD terminals, and London/NY session chart markups.

---

### 2.2 Hero Copy & Desktop Layout (`grid-cols-12`)

- **Primary Headline (H1):**
  > **MASTER GOLD. TRADE WITH PRECISION.** *(Alternative: "MASTER GOLD. COMMAND THE MARKET.")*

- **Subheadline Copy:**
  > Institutional XAU/USD signals, structured video education, and 1-on-1 mentorship designed for traders who demand real execution over random signals.


- **Primary Buttons:**
  - `[ GET FREE ACCESS ]` (Triggers Lead Capture Modal for Free Telegram).
  - `[ EXPLORE SERVICES ]` (Smooth scroll to Services section).

# 3. LIVE MARKET TICKER & DYNAMIC DATA

### Real-Time Data Pipeline
- **API Engine:** Client-side `useXAUPrice` hook consuming real-time WebSocket ticks (XAU/USD, DXY, OIL, S&P 500, BTC).
- **Hydration Guard:** Pre-rendered on server using a static fallback snapshot array. Real-time WebSocket connection initializes strictly inside `useEffect` after client hydration.
- **Visual Terminal:** Edge-to-edge horizontal ticker with green (`#00C853`) positive / red (`#FF5252`) negative tick badges, live price pulses, and session status indicators (`● LONDON / NY SESSION LIVE`).

------------------------------------------------------------------------

# 4. INTRO / ABOUT YASSINE

## Major structural change

Move the personal story closer to the top.

The hero should sell the **brand**.

The next section should sell **the person behind it**.

### Section title

> THE TRADER BEHIND THE SYSTEM.

or

> MEET YASSINE.

### Layout

Desktop:

**Left:** portrait or short vertical video

**Right:**

> Six years of trading gold. One system built from experience.

Current content can be retained:

"Yassine started trading gold full-time in 2020..."

But rewrite it into shorter, stronger paragraphs.

Use animated statistics underneath:

-   6+ Years Trading
-   1,700+ Community
-   XAU/USD Focus
-   1:2.4 Avg. Risk/Reward

### Important

This section should feel personal and authentic.

Do not make it look like a corporate "About Us" page.

------------------------------------------------------------------------

# 5. PERFORMANCE / PROOF

Current section:

> Real members. Real profits.

Keep the concept but make it more premium.

### New title

> PROOF OVER PROMISES.

Subtitle:

> Real trade examples. Real timestamps. Real community activity.

Use a horizontal carousel of:

-   Telegram screenshots
-   Trade setups
-   Entry/SL/TP examples
-   Community messages
-   Market analysis screenshots

### Animation

Cards should horizontally move as the user scrolls.

On desktop:

-   3 cards visible
-   center card slightly larger

On mobile:

-   1 card visible
-   swipe horizontally

### Trust rule

Do not use exaggerated profit claims as the primary selling point.

Focus on:

-   process
-   transparency
-   execution
-   risk management
-   documented examples

Keep the existing risk disclaimer.

------------------------------------------------------------------------

# 6. SERVICES --- Main Conversion Section

Current section:

> Choose your level.

Keep the four existing services:

1.  VIP Telegram
2.  Full Course
3.  1-on-1 Coaching
4.  Copy Trading

But redesign the cards.

## Desktop

Use a 2x2 grid or a horizontal premium card layout.

### VIP TELEGRAM

\$90/month

-   2--5 Daily XAU/USD Signals
-   Exact Entry, SL & TP
-   Daily Market Analysis
-   Live Trade Management

CTA:

`JOIN VIP →`

------------------------------------------------------------------------

### FULL COURSE

\$149 one-time

-   HD Video Lessons
-   Price Action & SMC Strategies
-   Risk Management Framework
-   Downloadable PDF Resources

CTA:

`GET THE COURSE →`

------------------------------------------------------------------------

### 1-ON-1 COACHING

\$400 one-time

-   Private Zoom Sessions
-   Live Trading Together
-   Trade Reviews
-   Direct WhatsApp Access

CTA:

`APPLY NOW →`

Add a small "LIMITED TO 5 STUDENTS" label.

------------------------------------------------------------------------

### COPY TRADING

FREE / \$300 minimum capital

-   Hands-Free Trading
-   Auto-mirror Trades
-   Risk Management
-   Withdraw Anytime

CTA:

`LEARN MORE →`

Use very careful wording around performance and regulation.

------------------------------------------------------------------------

# 7. SERVICE CARD INTERACTION (WHITE LUXURY)

### Default State
- Background: Pure White `#FFFFFF` with glassmorphism blur (`backdrop-blur-md bg-white/90`).
- Border: Subtle 1px divider (`border border-[#E5E7EB]`).
- Typography: Deep Charcoal `#0D0E12` headers with muted `#4A4C54` details.

### Hover State
- Card Elevation: Lifts `-4px` (`translateY(-4px)`).
- Border Highlight: Transitions to Matte Gold (`border-[#D4AF37]/60`).
- Ambient Glow: Soft gold inset shadow (`box-shadow: 0 12px 30px -10px rgba(212, 175, 55, 0.15)`).
- CTA Action: Matte Gold button fills with `#D4AF37` gradient.

------------------------------------------------------------------------

# 8. "HOW IT WORKS"

Add a simple visual process.

### Title

> FROM ANALYSIS TO EXECUTION.

Four steps:

### 01 --- ANALYZE

Institutional-style market analysis.

↓

### 02 --- SIGNAL

Entry, stop-loss, take-profit and reasoning.

↓

### 03 --- EXECUTE

Follow the setup according to your own risk plan.

↓

### 04 --- REVIEW

Learn from execution and improve.

Animate the connecting line as the user scrolls.

------------------------------------------------------------------------

# 9. WHY YASSICTFX

Current section:

> Advantages of Joining.

Keep the four concepts:

### TOTAL TRANSPARENCY

Full access to trade ideas, markups and reasoning.

### PROFESSIONAL RISK MANAGEMENT

Focus on protecting capital before chasing returns.

### COMMUNITY

A community of traders sharing ideas and experiences.

### DIRECT ACCESS

Learn directly from Yassine.

### Design

Instead of four ordinary cards, use a large asymmetric layout.

Example:

One large feature card:

> BUILT AROUND ONE GOAL: BETTER TRADING DECISIONS.

Then three smaller cards around it.

------------------------------------------------------------------------

# 10. COMMUNITY SECTION

Add a visual Telegram/community section.

Possible headline:

> YOU DON'T HAVE TO TRADE ALONE.

Show:

-   Telegram interface mockup
-   blurred community activity
-   number of members
-   recent signal example

CTA:

`JOIN THE COMMUNITY →`

This creates a stronger emotional connection than simply displaying
screenshots.

------------------------------------------------------------------------

# 11. COURSE SECTION

Give the course its own premium promotional section.

### Headline

> STOP FOLLOWING. START UNDERSTANDING.

Supporting text:

> Learn the framework behind the setups --- from market structure and
> price action to execution and risk management.

Show:

-   course dashboard
-   lesson thumbnails
-   progress indicator
-   PDF resources
-   chart screenshots

CTA:

`EXPLORE THE COURSE →`

Use a white horizontal section with subtle golden chart lines in the
background.

------------------------------------------------------------------------

# 12. 1-ON-1 COACHING

Make this feel exclusive.

### Headline

> TRADE WITH YASSINE. ONE-ON-ONE.

Show a vertical video or image of a Zoom/trading session.

Include:

-   Personalized strategy review
-   Live trading
-   Trade analysis
-   Direct communication

Use:

> Only 5 students at a time.

CTA:

`APPLY FOR COACHING →`

------------------------------------------------------------------------

# 13. FAQ

Keep the FAQ content.

Improve the interaction:

-   Accordion animation
-   Smooth height transition
-   Plus icon rotates into an X
-   Only one item open at a time on mobile

Keep the existing questions, especially:

-   Experience requirements
-   Markets
-   Signal delivery
-   Performance
-   Cancellation
-   Copy trading

------------------------------------------------------------------------

# 14. FINAL CTA

Before the footer, create a very strong final section.

### Headline

> YOUR NEXT TRADE STARTS WITH A BETTER SYSTEM.

Subtitle:

> Signals. Education. Mentorship. One ecosystem.

Buttons:

`GET STARTED` `VIEW SERVICES`

Background:

Very subtle animated XAU/USD chart.

------------------------------------------------------------------------

# 15. FOOTER

Keep the existing footer structure but simplify it.

Columns:

### YassICTFX

Professional gold trading education and signal services.

### PLATFORM

-   VIP Telegram
-   Full Course
-   1-on-1 Coaching
-   Copy Trading

### COMPANY

-   About Yassine
-   Results
-   Community
-   Contact

### LEGAL

-   Privacy
-   Terms
-   Risk Disclosure
-   Refund Policy

Keep the risk warning prominent but visually separated from normal
footer links.

------------------------------------------------------------------------

# 16. DESKTOP DESIGN

Desktop should NOT simply be a stretched mobile website.

Target:

-   1440px+
-   Maximum content width: approximately 1200--1400px
-   Large typography
-   Wide cards
-   Large cinematic video
-   Horizontal sections
-   Asymmetric layouts
-   More visual breathing room

### Desktop hero

Approximate structure:

  ------------------------------------------
  \| \|
  \| TRADE GOLD \|
  \| WITH AN EDGE. \[ CINEMATIC \|
  \| \[ VIDEO \] \|
  \| Description \|
  \| \[ GET ACCESS \] \[ WATCH VIDEO \] \|
  \| \|
  ------------------------------------------

Use the full screen height when appropriate.

------------------------------------------------------------------------

# 17. MOBILE DESIGN

Mobile must have a **different composition**, not just smaller desktop
elements.

### Mobile hero

Order:

1.  Logo / navigation
2.  Headline
3.  Description
4.  CTA
5.  Video
6.  Stats

Do NOT place a giant desktop-style video beside the text.

Use a vertical video ratio such as 9:16 or a cropped 4:5 video.

### Mobile navigation

Use:

Logo

`☰`

Menu opens as a full-screen/drawer navigation.

Primary CTA remains visible.

### Mobile services

Use:

One card per row.

Do not squeeze 4 cards into a grid.

### Mobile proof section

Use a horizontal swipe carousel.

### Mobile stats

Use a 2x2 grid:

4+ Years 1,700+ Traders

78.6% Win Rate

------------------------------------------------------------------------

# 18. ANIMATION & MOTION SYSTEM

The animation system must feel cinematic, smooth, and restrained (500ms–800ms duration with `easeOut` / `easeInOut` curves).

### Animation Rules

1. **Continuous Elements (3D Gold Bar & Chart):**
   - 3D Gold Bar rotates continuously on the Y-axis at **12–15 seconds per loop** (linear, subtle).
   - Background SVG chart path draws on initial entrance (~2.5s duration) and stays static or moves infinitely at ultra-slow speeds.

2. **Entrance Sequences (Page Load & Scroll Reveal):**
   - Standard reveal: `opacity: 0 → 1`, `translateY: 20px → 0px`.
   - Duration budget: 500ms–800ms max.
   - Staggered entrances: 100ms delay between consecutive card elements.

3. **Hover States:**
   - Cards lift slightly (`translateY: -4px`) with a subtle gold border opacity transition (`border-[#D4AF37]/20 → border-[#D4AF37]/60`).
   - Avoid aggressive scale transforms or heavy GPU particle canvas triggers.

4. **Performance Guardrail:**
   - All motion relies on pure CSS transforms (`transform`, `opacity`) or Framer Motion to ensure 60 FPS performance on mobile devices. Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 19. LIVE TRADING VISUALS

### Real-Time Data Pipeline
- **API Engine:** Client-side `useXAUPrice` hook consuming real-time WebSocket ticks (XAU/USD, DXY, OIL, S&P 500, BTC).
- **Hydration Guard:** Pre-rendered on server using a static fallback snapshot array. Real-time WebSocket connection initializes strictly inside `useEffect` after client hydration.
- **Visual Terminal:** Edge-to-edge horizontal ticker with green (`#00C853`) positive / red (`#FF5252`) negative tick badges, live price pulses, and session status indicators (`● LONDON / NY SESSION LIVE`).

------------------------------------------------------------------------

# 20. VIDEO IMPLEMENTATION

The hero video should:

-   Autoplay
-   Loop
-   Muted
-   Plays inline on mobile
-   Use a poster image
-   Be compressed for performance
-   Have a fallback image
-   Not block page loading

Use a lightweight preview/poster first.

Load the full video after the initial page becomes interactive.

------------------------------------------------------------------------

# 21. PERFORMANCE

The website should remain extremely smooth.

### Priorities

-   Lazy-load images
-   Compress WebP/AVIF images
-   Compress video
-   Use responsive image sizes
-   Lazy-load below-the-fold video
-   Avoid excessive JavaScript animation
-   Prefer CSS transforms
-   Use GPU-friendly animations
-   Respect `prefers-reduced-motion`

Target:

> Fast initial load + cinematic experience after loading.

Do not sacrifice performance for animation.

------------------------------------------------------------------------

# 22. CREDIBILITY, COMPLIANCE & CONTENT AUDIT

To pass Meta/Google financial marketing policies and maintain institutional trust, audit all copy for consistency:

1. **Unified Win Rate & Metrics:**
   - Lock win-rate references across all sections to a single verified figure (e.g., `85.4% Verified Signal Accuracy`). Do not mix conflicting percentages (e.g., 85.6% in Hero vs 81.4% in FAQ).
   - Remove outdated references like `+$127,340 YTD 2024`. Use evergreen, verifiable metric tags such as `6+ Years Trading Experience`, `1,700+ Community Members`, and `1:2.4 Avg. Risk/Reward`.

2. **Compliant Marketing Wording:**
   - **Avoid:** *"Join 1,700+ traders making daily profits."*
   - **Prefer:** *"Join 1,700+ traders executing structured XAU/USD strategies in the YassICTFX community."*

3. **Risk Disclosures:**
   - Keep mandatory risk disclaimers visible in the Lead Ticket Modal, Copy Trading Section, and Footer.

------------------------------------------------------------------------

# 23. CONSOLIDATED PAGE FLOW (10 SECTIONS)

To keep page scrolling intentional and high-converting without visitor fatigue, structure the homepage into 10 clear sections:

1. **HERO SECTION** (Slogan + 3D Gold Bar + 9:16 Video + Background Chart + Lead CTA)
2. **TRUST TICKER & STATS BAR** (Live XAU/USD ticker strip + 4 Key telemetry counters)
3. **MEET YASSINE** (Trader bio, 6+ years experience, personal trading philosophy)
4. **PROOF OVER PROMISES** (Horizontal carousel of real trade setups, Telegram entries, and timestamps)
5. **SERVICES GRID** (VIP Signals, Video Course, 1-on-1 Coaching, Copy Trading)
6. **HOW IT WORKS** (01 Analyze → 02 Signal → 03 Execute → 04 Review)
7. **SPOTLIGHT: COURSE & MENTORSHIP** (Deep dive into "Stop Following. Start Understanding")
8. **COMMUNITY SECTION** ("You Don't Have To Trade Alone" — Telegram interface preview)
9. **FAQ ACCORDION** (Answers on experience, copy trading capital, signal delivery)
10. **FINAL CTA & FOOTER** ("Your Next Trade Starts With A Better System" + Legal Risk Disclosure)

------------------------------------------------------------------------

# 24. Overall Design Goal

The final website should communicate three things within the first 5
seconds:

### 1. THIS IS A REAL TRADER

The video and personal story establish credibility.

### 2. THIS IS A REAL SYSTEM

Signals, education, analysis and risk management are clearly presented.

### 3. I KNOW WHAT TO DO NEXT

The visitor immediately understands the available options:

**Signals → Course → Mentorship → Copy Trading**

The site should feel:

**Premium + Cinematic + Institutional + Personal + Fast**

and avoid:

**Generic crypto + excessive neon + fake luxury + get-rich-quick
aesthetics.**
