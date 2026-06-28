# Yieldly — Global Design System

## Product Concept

Yieldly is a demo MVP of a social stokvel platform for South Africa. It digitizes the traditional community savings group (stokvel) — allowing users to join existing stokvels or create their own, with pooled funds theoretically invested in ETFs based on the group's common risk appetite.

**Target user**: South African millennials and Gen Z familiar with stokvel culture but wanting a modern, digital, investment-focused experience. The app must feel trustworthy (financial), community-driven (social), and aspirational (wealth building).

**Domain concepts**:
- **Stokvel**: A savings group with a goal, duration, monthly contribution, and members.
- **Risk Appetite**: Conservative (cash/bonds), Moderate (balanced ETFs), Aggressive (equity ETFs).
- **Pool**: Collective monthly contributions.
- **ETF Allocation**: How pooled money would be invested across different ETFs.
- **KYC**: Know Your Customer onboarding (personal details, ID, proof of address).

---

## Page / Route List

| Route | Page Name | Purpose | Suggested Worker |
|-------|-----------|---------|------------------|
| `/` | Landing Page | Marketing, acquisition, trust building | `home-worker` |
| `/login` | Login | Authentication entry | `auth-worker` |
| `/register` | Register | Account creation | `auth-worker` |
| `/onboarding` | Onboarding Wizard | 7-step KYC + goal + risk + contribution setup | `onboarding-worker` |
| `/dashboard` | Dashboard | User hub, stats, stokvels, activity | `dashboard-worker` |
| `/stokvels` | Browse Stokvels | Discovery, join public stokvels | `stokvels-worker` |
| `/stokvels/create` | Create Stokvel | Form to launch a new stokvel | `stokvels-worker` |
| `/stokvels/[id]` | Stokvel Detail | View stokvel stats, members, activity, ETF allocation | `stokvels-worker` |
| `/settings` | Settings | Profile, notifications, security, KYC, bank cards | `settings-worker` |

---

## Color Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--color-primary` | `#0B8C6B` | Primary brand | Buttons, links, active nav, key accents |
| `--color-primary-light` | `#14A085` | Primary hover / emphasis | Button hover, hover states |
| `--color-primary-dark` | `#07634A` | Primary pressed / dark | Active button, pressed states |
| `--color-accent` | `#E88D3A` | Warm accent | Community badges, CTAs, highlights, culture feel |
| `--color-accent-light` | `#F4CBA6` | Accent backgrounds | Tags, chips, warm surfaces |
| `--color-text-primary` | `#1A1A2E` | Headings, primary text | All major body text |
| `--color-text-secondary` | `#4A4A5A` | Subheadings, labels | Captions, metadata |
| `--color-text-muted` | `#8A8A9A` | Placeholders, disabled | Hints, disabled text |
| `--color-bg` | `#F6F7F9` | Page background | App canvas, empty areas |
| `--color-surface` | `#FFFFFF` | Cards, modals, panels | Foreground surfaces |
| `--color-surface-elevated` | `#FFFFFF` | Elevated cards | With shadow on hover |
| `--color-success` | `#2A9D8F` | Positive states | Verified, completed, gains |
| `--color-warning` | `#E9C46A` | Caution | Pending, warning |
| `--color-error` | `#E76F51` | Error / danger | Validation errors, failed states |
| `--color-border` | `#E2E4E8` | Dividers, borders | Card borders, input borders |
| `--color-border-focus` | `#0B8C6B` | Focused input borders | Focus ring |
| `--color-overlay` | `rgba(26,26,46,0.55)` | Modal backdrop | Dialog overlays |

**Color usage rules**:
- Primary green/teal dominates financial actions (payments, contributions, progress).
- Warm accent (`#E88D3A`) is used for community/social moments (joining, member count, testimonials, culture nods).
- Never use pure black (`#000000`); `--color-text-primary` is the darkest text.
- Background is always `#F6F7F9` inside authenticated app pages; landing page may use white sections with `#F6F7F9` banding.

---

## Typography

**Font families**:
- **Headings**: `Poppins`, weights 600, 700. Fallback: `system-ui, -apple-system, sans-serif`.
- **Body / UI**: `Inter`, weights 400, 500, 600. Fallback: `system-ui, -apple-system, sans-serif`.

**Type scale** (desktop / mobile in `rem`):

| Token | Size | Line-height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-hero` | 3.5rem / 2.25rem | 1.1 | 700 | Landing hero H1 |
| `text-h1` | 2.25rem / 1.75rem | 1.2 | 700 | Page titles |
| `text-h2` | 1.75rem / 1.5rem | 1.25 | 600 | Section headings |
| `text-h3` | 1.375rem / 1.25rem | 1.3 | 600 | Card titles, sub-sections |
| `text-h4` | 1.125rem / 1rem | 1.35 | 600 | Labels, small headings |
| `text-body` | 1rem / 0.9375rem | 1.6 | 400 | Body paragraphs |
| `text-body-sm` | 0.875rem / 0.8125rem | 1.5 | 400 | Secondary text |
| `text-caption` | 0.75rem / 0.6875rem | 1.4 | 500 | Captions, badges, metadata |
| `text-button` | 0.9375rem / 0.875rem | 1 | 600 | Button labels |
| `text-nav` | 0.875rem / 0.8125rem | 1 | 500 | Nav items |

**Typography rules**:
- All headings use `Poppins`. All body, labels, buttons, nav use `Inter`.
- Currency values (ZAR) are always in `Inter` 600, `text-h3` or larger, with a space between the symbol and amount: `R 1 250.00` (using narrow non-breaking space `&#8239;` or ` ` if available, otherwise plain space).
- Use `letter-spacing: -0.01em` on headings at `text-hero` and `text-h1` for tighter feel.

---

## Layout Rules

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Containers**:
- `max-w-app`: 1200px (authenticated pages, centered with auto margins).
- `max-w-landing`: 1280px (landing page, centered).
- `max-w-narrow`: 560px (auth forms, wizard, centered narrow flows).
- `max-w-wide`: 1440px (dashboard full-bleed sections on large screens).

**Spacing scale** (in `rem`):
- Base unit: 0.25rem (4px).
- Scale: 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12.

**Section rhythm**:
- Authenticated pages: `padding-y: 2rem` (mobile) / `3rem` (desktop) between major sections.
- Landing page: `padding-y: 4rem` (mobile) / `6rem` (desktop) between sections.
- Card internal padding: `1.5rem` (mobile) / `2rem` (desktop).

**Grid**:
- Default authenticated layout: single-column mobile; two-column `lg` for dashboard stats + sidebar; three-column `xl` for stokvel grids.
- Landing page: full-width bands with inner max-width containers.

**Mobile navigation**:
- Authenticated app uses a **bottom tab bar** on mobile (`< 768px`) with icons + labels: Home (Dashboard), Explore (Stokvels), Create (+), Settings.
- Desktop (`≥ 768px`) uses a **left sidebar** (width 240px, collapsible to 64px icon-only) inside the app shell.
- Landing page uses a top horizontal nav on all breakpoints.

---

## Shared Components

### AppShell (`AppShell`)
- Wraps all authenticated pages.
- Mobile: bottom tab bar fixed at bottom, safe-area inset, height 64px, white background, top border `1px solid #E2E4E8`.
- Desktop: left sidebar fixed, width 240px, collapsible to 64px. Top: logo area. Bottom: user mini-profile.
- Content area scrolls independently; `padding-bottom: 80px` on mobile to clear bottom nav.

### TopBar (`TopBar`)
- Appears on desktop inside the content area, sticky at top, `z-index: 40`.
- Left: page title (`text-h2`).
- Right: notification bell icon (with red dot badge), user avatar circle (40px).
- Background: white, bottom border `1px solid #E2E4E8`, height 64px.

### Card (`Card`)
- Background: white.
- Border radius: `12px` (mobile) / `16px` (desktop).
- Border: `1px solid #E2E4E8`.
- Shadow: `0 1px 3px rgba(26,26,46,0.06)` default.
- Hover shadow (if clickable): `0 8px 24px rgba(26,26,46,0.10)`.
- Transition: `box-shadow 0.2s ease, transform 0.2s ease`.
- Hover transform: `translateY(-2px)`.
- Padding: `1.5rem` (mobile) / `2rem` (desktop).

### Button (`Button`)
- **Primary**: bg `#0B8C6B`, text white, border radius `10px`, padding `0.75rem 1.5rem`, font `text-button`, weight 600. Hover: bg `#14A085`. Active: bg `#07634A`. Focus: `ring-2 ring-offset-2 ring-[#0B8C6B]`.
- **Secondary**: bg white, border `1px solid #E2E4E8`, text `#1A1A2E`, border radius `10px`. Hover: bg `#F6F7F9`. Active: border `#0B8C6B`.
- **Accent**: bg `#E88D3A`, text white, border radius `10px`. Hover: bg `#D47B2A`. Active: bg `#B86920`. Used for community CTAs.
- **Ghost**: transparent, text `#0B8C6B`. Hover: bg `rgba(11,140,107,0.06)`.
- **Danger**: bg `#E76F51`, text white.
- Disabled: opacity 0.5, cursor not-allowed.
- Loading: spinner icon replaces label, reduced opacity.

### Input (`Input` / `TextField`)
- Background: white.
- Border: `1px solid #E2E4E8`, radius `10px`.
- Padding: `0.75rem 1rem`.
- Font: `Inter`, `text-body`.
- Focus: border `#0B8C6B`, shadow `0 0 0 3px rgba(11,140,107,0.15)`.
- Error state: border `#E76F51`, error message below in `text-caption` color `#E76F51`.
- Label above: `text-body-sm`, weight 500, color `#4A4A5A`, margin-bottom `0.5rem`.
- Placeholder: color `#8A8A9A`.

### StepIndicator (`StepIndicator`)
- Used in onboarding wizard.
- Horizontal row of circles (step numbers) connected by a line.
- Circle: 32px, border radius 50%, border `2px solid #E2E4E8`.
- Completed: bg `#0B8C6B`, border `#0B8C6B`, text white, checkmark icon.
- Active: bg white, border `#0B8C6B`, text `#0B8C6B`, ring `0 0 0 4px rgba(11,140,107,0.15)`.
- Upcoming: bg white, border `#E2E4E8`, text `#8A8A9A`.
- Connector line: height 2px, bg `#E2E4E8`; completed segments bg `#0B8C6B`.
- Transition: `background-color 0.3s ease, border-color 0.3s ease`.

### ProgressBar (`ProgressBar`)
- Height: 8px (mobile) / 12px (desktop).
- Background track: `#E2E4E8`, border radius full.
- Fill: `#0B8C6B` (primary) or `#E88D3A` (accent) depending on context.
- Label above: `text-caption`, weight 500, showing current / total (e.g., "6 of 12 members").
- Animated: width transitions `0.5s ease-out` on value change.

### Badge (`Badge`)
- Small rounded pill.
- **Risk Conservative**: bg `#E2F0EC`, text `#0B8C6B`.
- **Risk Moderate**: bg `#FEF3E2`, text `#B8860B`.
- **Risk Aggressive**: bg `#FDE8E4`, text `#C0392B`.
- **Public**: bg `#E2F0EC`, text `#0B8C6B`.
- **Invite-only**: bg `#F4F4F6`, text `#4A4A5A`.
- **KYC Verified**: bg `#E2F0EC`, text `#0B8C6B`, with check icon.
- **KYC Pending**: bg `#FEF3E2`, text `#B8860B`.

### Avatar (`Avatar`)
- Circular image, border radius 50%.
- Sizes: 32px (list), 40px (nav), 48px (detail), 64px (profile).
- Fallback: initials on solid color background (use deterministic hash from name to pick from a palette of muted greens, teals, ambers).
- Group: overlapping stack with `-margin-left` and white border.

### Skeleton (`Skeleton`)
- Rounded rectangles, bg `#E2E4E8`, pulse animation `opacity 0.4 ↔ 1.0`, duration 1.5s, infinite.
- Used for card placeholders, list rows, text lines.

### Toast (`Toast`)
- Fixed top-right (desktop) or top-center (mobile), `z-index: 50`.
- Types: success (`#2A9D8F`), error (`#E76F51`), info (`#0B8C6B`).
- Duration: 4 seconds. Auto-dismiss with slide-out animation.
- Shadow: `0 4px 12px rgba(0,0,0,0.15)`.
- Border radius: `10px`.

### Modal (`Modal`)
- Centered overlay, max-width 480px.
- Backdrop: `rgba(26,26,46,0.55)`.
- Content: white card, border radius 16px, padding 2rem.
- Entrance: opacity 0 → 1, scale 0.95 → 1, duration 0.2s, ease-out.
- Exit: reverse.
- Focus trap inside modal.

---

## Interaction Language

### Transitions
- Default easing: `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`.
- Fast: `0.15s` (buttons, hover color).
- Normal: `0.2s` (cards, shadows).
- Slow: `0.3s` (page transitions, modals).
- Wizard step transitions: `0.35s`.

### Entrance Animations
- Page sections: fade in + translateY(16px → 0), stagger 0.1s per element, trigger on scroll intersection or mount.
- Landing hero: fade in + translateY(24px → 0), 0.6s, ease-out.
- Cards: stagger 0.08s on list render.

### Hover / Active
- Buttons: `transform: scale(1.02)` on hover (subtle), `scale(0.98)` on active.
- Cards: `translateY(-2px)` + shadow increase.
- Links: underline grows from left to right (pseudo-element width 0 → 100%).
- Nav items: bg `rgba(11,140,107,0.06)` + color `#0B8C6B`.

### Scroll Behavior
- Smooth scroll: `scroll-behavior: smooth` on html.
- Sticky headers: `position: sticky`, `top: 0`, white background, `backdrop-filter: blur(8px)` where supported.
- Back-to-top: appear after scrolling 400px, fade in.

### Keyboard
- All interactive elements have visible focus rings (`ring-2 ring-offset-2 ring-[#0B8C6B]`).
- Wizard: `Enter` advances step if valid; `Escape` cancels confirmation modals.
- Modal: `Escape` closes; `Tab` cycles focus.

### Reduced Motion
- If `prefers-reduced-motion: reduce`:
  - Disable entrance animations (use instant opacity 1).
  - Disable hover transforms (keep color changes only).
  - Disable progress bar width transitions.
  - Skeleton becomes static (no pulse).

---

## Dependencies

- **React Router** (or framework routing): for all page navigation.
- **Tailwind CSS**: utility-first styling (preferred; align with color tokens above).
- **Headless UI / Radix UI**: accessible primitives (dialog, tabs, slider, switch, checkbox).
- **Lucide React**: icon set (consistent, lightweight).
- **Recharts** (or similar): ETF allocation pie chart on stokvel detail page.
- **Framer Motion** (optional): page transitions, wizard step animations, entrance animations. If bundle size is a concern, use CSS transitions.
- **React Hook Form** (optional): form validation for onboarding, create stokvel, settings.
- **Zod** (optional): schema validation for forms.

---

## Asset Manifest

| Filename | Type | Page/Section | Dimensions | Prompt / Sourcing | Fallback |
|----------|------|--------------|------------|-------------------|----------|
| `hero-people.jpg` | Image | Landing hero | 16:9, 1200×675 | Diverse group of young South Africans smiling, warm natural light, modern casual setting, community feel | Solid `#0B8C6B` gradient background |
| `how-it-works-1.svg` | SVG | Landing / How It Works | 1:1, 400×400 | Illustration: person tapping phone to join a group | Simple icon + text |
| `how-it-works-2.svg` | SVG | Landing / How It Works | 1:1, 400×400 | Illustration: coins pooling into a shared jar with ETF arrows | Simple icon + text |
| `how-it-works-3.svg` | SVG | Landing / How It Works | 1:1, 400×400 | Illustration: group celebrating goal achievement | Simple icon + text |
| `testimonial-1.jpg` | Image | Landing / Testimonials | 1:1, 400×400 | Portrait: young South African woman, warm smile, natural light | Initials avatar fallback |
| `testimonial-2.jpg` | Image | Landing / Testimonials | 1:1, 400×400 | Portrait: young South African man, confident expression | Initials avatar fallback |
| `testimonial-3.jpg` | Image | Landing / Testimonials | 1:1, 400×400 | Portrait: young South African couple, friendly | Initials avatar fallback |
| `logo-icon.svg` | SVG | Global / Nav | 1:1, 32×32 | Stylized leaf or coin shape with green/teal gradient, minimal | Text "Y" in circle |
| `logo-wordmark.svg` | SVG | Global / Nav | ~5:1, 160×32 | "Yieldly" in Poppins 700, color `#0B8C6B` | Plain text "Yieldly" |
| `sa-flag.svg` | SVG | Footer / Onboarding | 4:3, 40×30 | South Africa flag icon for localization context | Emoji flag 🇿🇦 |
| `bank-logos/` | Image folder | Onboarding / Settings | Various | FNB, ABSA, Standard Bank, Capitec, Nedbank logos for bank selection (use official brand marks) | Text-only bank names |

**Notes**:
- All images are placed in `public/` and referenced as `/filename.ext`.
- If custom illustrations cannot be generated, use Lucide icons at 48px inside a soft-colored circle (e.g., `bg-[#E2F0EC]` + `text-[#0B8C6B]`).
- Avoid real people's faces without consent; use generated/diverse stock if possible.

---

## Worker Grouping Suggestions

To parallelize implementation, split into these worker groups:

1. **`home-worker`**: Landing page (`home.md`) — hero, how it works, featured stokvels, testimonials, footer. Can be built as a static marketing page first.
2. **`auth-worker`**: Auth pages (`auth.md`) — login, register. Includes form validation, redirect to onboarding on first register.
3. **`onboarding-worker`**: Onboarding wizard (`onboarding.md`) — 7-step form with state persistence, validation, step transitions, mock payment form.
4. **`dashboard-worker`**: Dashboard page (`dashboard.md`) — stats, stokvel list, activity feed, quick actions. Needs mock data.
5. **`stokvels-worker`**: Stokvel discovery + detail + creation (`stokvels.md`) — browse grid, create form, detail view with pie chart, member list, activity.
6. **`settings-worker`**: Settings page (`settings.md`) — tabs for profile, notifications, security, KYC, bank cards. Form-heavy.
7. **`shell-worker`**: Shared layout (`design.md`) — AppShell, TopBar, navigation, Toast, Modal, routing wrapper. Should be built early so other workers can import it.

**Recommended order**:
1. `shell-worker` first (design tokens, AppShell, shared components, router shell).
2. `auth-worker` + `home-worker` in parallel (no shared deps beyond shell).
3. `onboarding-worker` + `dashboard-worker` in parallel (both need authenticated shell).
4. `stokvels-worker` + `settings-worker` in parallel (both need authenticated shell + dashboard patterns).
