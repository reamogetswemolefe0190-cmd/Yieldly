# Yieldly — Landing Page (`/`)

## Route & Purpose
- **Route**: `/`
- **Purpose**: Marketing, trust-building, and conversion. Explain what Yieldly is, how it works, and drive users to register or log in.
- **Layout**: Full-width sections with inner `max-w-landing` container. No authenticated shell (no sidebar/bottom nav). Top nav is a standalone landing header.

---

## Section-by-Section Layout

### 1. Landing Header (`LandingHeader`)
- **Position**: Fixed top, full width, `z-index: 50`.
- **Background**: White, bottom border `1px solid #E2E4E8`.
- **Height**: 64px.
- **Left**: Logo icon (`logo-icon.svg`) + wordmark (`logo-wordmark.svg`), horizontally aligned, gap 0.5rem.
- **Right**: Nav links (desktop only): "How it works", "Featured", "Testimonials". Text `text-nav`, color `#4A4A5A`, hover color `#0B8C6B`.
- **Far right**: "Log in" (ghost button) + "Get started" (primary button, small size).
- **Mobile**: Hamburger menu icon (Lucide `Menu`). Opens full-screen overlay with nav links stacked vertically and the two CTA buttons at bottom.
- **Behavior**: On scroll > 50px, add subtle shadow `0 1px 6px rgba(0,0,0,0.06)`.

---

### 2. Hero Section (`HeroSection`)
- **Background**: White on left, `hero-people.jpg` on right (desktop). On mobile, image is above text, full width, with a slight gradient overlay from bottom (`rgba(255,255,255,0.8)`) to ensure text readability.
- **Desktop layout**: Two columns, 55% text / 45% image. Image is rounded (`border-radius: 16px`), slight shadow.
- **Text block (left)**:
  - Eyebrow: `text-caption`, uppercase, tracking wide, color `#0B8C6B`, weight 600. Copy: "South Africa's first digital stokvel platform"
  - H1: `text-hero`, `Poppins` 700, color `#1A1A2E`. Copy: "Save together. Build wealth. Together."
  - Subtitle: `text-body`, color `#4A4A5A`, max-width 480px. Copy: "Yieldly brings the trusted stokvel tradition into the digital age. Pool money with your community and invest in ETFs aligned to your shared goals."
  - CTA row: "Get started free" (primary button, large) + "See how it works" (secondary button, large, with Lucide `ArrowDown` icon). Gap 1rem.
  - Trust microcopy below buttons: `text-caption`, color `#8A8A9A`. Copy: "No fees to join. Your money stays in ZAR. 🇿🇦"
- **Image block (right)**: `hero-people.jpg`, object-fit cover, height ~400px desktop.
- **Entrance animation**: Eyebrow, H1, subtitle, CTAs stagger in with fade + translateY(24px → 0), 0.6s total, ease-out. Image fades in 0.2s later.
- **Responsive**: Mobile stacks vertically. Image first, then text below. Image height 280px.

---

### 3. How It Works Section (`HowItWorksSection`)
- **Background**: `#F6F7F9` (banded).
- **Padding**: `padding-y: 6rem` desktop / `4rem` mobile.
- **Header**: Centered.
  - H2: `text-h2`, color `#1A1A2E`. Copy: "How Yieldly works"
  - Subtitle: `text-body`, color `#4A4A5A`, max-width 560px centered. Copy: "From joining a stokvel to watching your pooled investments grow — three simple steps."
- **Steps grid**: 3 columns on desktop, 1 column on mobile. Gap 2rem.
- **Step cards** (`StepCard`):
  - Background: white, border radius 16px, padding 2rem, border `1px solid #E2E4E8`.
  - Each card contains:
    - **Step number**: Circular badge, 32px, bg `#E2F0EC`, text `#0B8C6B`, `text-caption`, weight 700. Numbers 1, 2, 3.
    - **Illustration**: `how-it-works-{n}.svg`, width 160px, height 160px, centered, margin-bottom 1.5rem. If missing, fallback to a 48px Lucide icon inside a soft circle (`bg-[#E2F0EC]`, `text-[#0B8C6B]`).
    - **Title**: `text-h3`, color `#1A1A2E`. Copies: "1. Join or create a stokvel", "2. Pool & invest monthly", "3. Reach your goal together".
    - **Description**: `text-body`, color `#4A4A5A`. Copies:
      - "Find a community saving for the same goal — or start your own. Set your contribution and duration."
      - "Your monthly pool is allocated to low-cost ETFs based on your group's risk appetite. Track growth in real time."
      - "When the term ends, the fund is distributed to members. Celebrate the milestone you've built together."
  - **Connector line (desktop only)**: A subtle horizontal line connecting the step numbers across the three cards, color `#E2E4E8`, dashed, positioned behind the number badges. Not visible on mobile.
- **Entrance animation**: Cards stagger in on scroll intersection, fade + translateY(16px → 0), 0.1s stagger.

---

### 4. Featured Stokvels Section (`FeaturedStokvelsSection`)
- **Background**: White.
- **Padding**: `padding-y: 6rem` desktop / `4rem` mobile.
- **Header**: Centered.
  - H2: `text-h2`, color `#1A1A2E`. Copy: "Featured stokvels"
  - Subtitle: `text-body`, color `#4A4A5A`. Copy: "Popular communities already saving and investing."
- **Cards grid**: 3 columns on `xl`, 2 on `md`, 1 on mobile. Gap 1.5rem. `max-w-landing` container.
- **Cards** (`StokvelCard` — shared with `/stokvels` browse page, see `stokvels.md`):
  - Show 3 featured cards with realistic mock data:
    1. **"Thembisa Home Builders"** — Goal: Buy a home — 24 months — R 1 500/month — Moderate — 8/12 members — 67% filled.
    2. **"Luthuli Street Entrepreneurs"** — Goal: Start a business — 36 months — R 2 000/month — Aggressive — 5/10 members — 50% filled.
    3. **"Maboneng Education Fund"** — Goal: Education — 12 months — R 800/month — Conservative — 10/10 members — 100% filled (badge: "Full").
  - Each card shows: name (`text-h3`), goal (`text-body-sm` with Lucide `Target` icon), member count + progress bar, monthly contribution in bold, risk badge, duration.
  - "Full" stokvel card has reduced opacity (0.7) and a "Full" badge instead of a join button.
  - CTA on each card: "Join stokvel" (primary, small) or "View details" (ghost, small) for full ones.
- **Section footer**: Centered "Browse all stokvels" link (primary color, with `ArrowRight` icon). Links to `/stokvels`.
- **Entrance animation**: Cards stagger in 0.08s on scroll.

---

### 5. Testimonials Section (`TestimonialsSection`)
- **Background**: `#F6F7F9` (banded).
- **Padding**: `padding-y: 6rem` desktop / `4rem` mobile.
- **Header**: Centered.
  - H2: `text-h2`, color `#1A1A2E`. Copy: "What our community says"
  - Subtitle: `text-body`, color `#4A4A5A`. Copy: "Real stories from South Africans building wealth together."
- **Testimonials grid**: 3 columns desktop, 1 mobile. Gap 1.5rem.
- **Testimonial cards** (`TestimonialCard`):
  - Background: white, border radius 16px, padding 2rem, border `1px solid #E2E4E8`.
  - Top: Large quote icon (Lucide `Quote`), color `#0B8C6B`, opacity 0.2, size 32px.
  - Quote text: `text-body`, color `#1A1A2E`, italic feel (not actually italic font, just warm tone). Copies:
    1. "Yieldly helped our group save R 45 000 in 18 months for a family home deposit. The ETF tracking made it feel real." — Thando M., Johannesburg
    2. "Finally, a stokvel that feels modern. I love seeing exactly how our pooled money is growing every month." — Sizwe K., Durban
    3. "We started a business stokvel on Yieldly and hit our goal in 2 years. The community aspect kept us accountable." — Lerato N., Cape Town
  - Bottom: avatar (`testimonial-{n}.jpg` or initials fallback), name in `text-body-sm` weight 600, location in `text-caption` color `#8A8A9A`.
- **Entrance animation**: Fade in + translateY(16px), stagger 0.1s.

---

### 6. CTA Section (`CTASection`)
- **Background**: `#0B8C6B` (primary) with a subtle radial gradient from center (`#14A085` to `#0B8C6B`).
- **Padding**: `padding-y: 5rem` desktop / `4rem` mobile.
- **Content**: Centered, white text, max-width 600px.
  - H2: `text-h2`, color white. Copy: "Start your stokvel journey today"
  - Subtitle: `text-body`, color `rgba(255,255,255,0.85)`. Copy: "Join thousands of South Africans saving and investing together. No hidden fees, no complicated jargon — just community-driven wealth building."
  - CTA button: "Create your free account" (accent button — bg `#E88D3A`, text white, large). Hover: bg `#D47B2A`.
  - Secondary text below: `text-caption`, color `rgba(255,255,255,0.7)`. Copy: "Takes less than 5 minutes. No credit check required."
- **Entrance animation**: Fade in + scale(0.98 → 1), 0.4s, on scroll.

---

### 7. Footer (`LandingFooter`)
- **Background**: `#1A1A2E` (dark text color inverted as background).
- **Padding**: `padding-y: 4rem` desktop / `3rem` mobile.
- **Layout**: 4 columns on desktop, stacked on mobile. `max-w-landing` container.
- **Column 1 (Brand)**:
  - Logo wordmark in white.
  - Tagline: `text-body-sm`, color `rgba(255,255,255,0.6)`. Copy: "Modern stokvels for modern South Africans."
  - Social icons: Lucide `Twitter`, `Instagram`, `Facebook` (placeholder links). Size 20px, color `rgba(255,255,255,0.5)`, hover white.
- **Column 2 (Product)**:
  - Heading: `text-body-sm`, weight 600, white. Copy: "Product"
  - Links: "Browse stokvels", "Create a stokvel", "How it works", "Pricing" (mock). Color `rgba(255,255,255,0.6)`, hover white.
- **Column 3 (Company)**:
  - Heading: `text-body-sm`, weight 600, white. Copy: "Company"
  - Links: "About us", "Careers", "Press", "Contact" (all mock).
- **Column 4 (Legal)**:
  - Heading: `text-body-sm`, weight 600, white. Copy: "Legal"
  - Links: "Privacy policy", "Terms of service", "FAIS disclaimer" (mock). Note: "This is a demo MVP. No real financial services are offered."
- **Bottom bar**: Full width, border-top `1px solid rgba(255,255,255,0.1)`, padding-top 1.5rem, margin-top 2rem.
  - Left: `text-caption`, color `rgba(255,255,255,0.4)`. Copy: "© 2025 Yieldly Demo. Built for demonstration purposes."
  - Right: SA flag icon (`sa-flag.svg`) + "South Africa" text.

---

## Responsive Behavior Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header | Hamburger menu | Same as mobile | Full horizontal nav |
| Hero | Stacked, image top | Stacked | 55/45 split |
| How It Works | 1 column | 2 columns | 3 columns with connector |
| Featured Stokvels | 1 column | 2 columns | 3 columns |
| Testimonials | 1 column | 2 columns | 3 columns |
| CTA | Full width, centered | Same | Same |
| Footer | Stacked columns | 2x2 grid | 4 columns |

---

## Assets Used

- `hero-people.jpg` — Hero section right side.
- `how-it-works-1.svg`, `how-it-works-2.svg`, `how-it-works-3.svg` — Step cards.
- `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg` — Testimonial avatars.
- `logo-icon.svg`, `logo-wordmark.svg` — Header and footer.
- `sa-flag.svg` — Footer localization.

---

## Interactions & State Changes

- **Header scroll**: Shadow appears after 50px scroll, transition 0.2s.
- **Hero CTAs**: Primary scrolls to `/register` (or `/onboarding` if already registered). Secondary smooth-scrolls to `#how-it-works` anchor.
- **Featured cards**: Hover `translateY(-2px)` + shadow. Click navigates to `/stokvels/[id]` (or `/stokvels` if not logged in).
- **Mobile menu**: Full-screen overlay, bg white, slides in from right (translateX(100%) → 0), 0.3s ease. Close button (Lucide `X`) top right. Body scroll locked when open.
- **Testimonials**: No carousel; static grid for simplicity.
