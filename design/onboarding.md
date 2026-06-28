# Yieldly — Onboarding Wizard (`/onboarding`)

## Route & Purpose
- **Route**: `/onboarding`
- **Purpose**: Multi-step KYC and preference setup. Collects personal info, financial profile, goals, risk appetite, contribution amount, payment method, and final confirmation.
- **Layout**: Authenticated shell (mobile bottom nav / desktop sidebar) is NOT shown. This is a standalone focused flow. Only the logo is shown at top center. No sidebar, no bottom nav, no TopBar.
- **State**: Wizard state must persist across steps (React context or local state). Users can navigate back to previous steps.

---

## Global Wizard Layout (`WizardLayout`)
- **Background**: `#F6F7F9`.
- **Top**: Centered logo (`logo-icon.svg` 40px + `logo-wordmark.svg`), margin-top 2rem, margin-bottom 2rem.
- **Step Indicator**: `StepIndicator` component (see `design.md`), centered, max-width 720px, margin-bottom 3rem. Shows 7 steps.
- **Content area**: `max-w-narrow` (560px), centered, white card (`Card` style), padding 2rem (mobile 1.5rem).
- **Navigation footer inside card**: Fixed at bottom of card (or below content on mobile):
  - Left: "Back" button (secondary, small). Disabled on Step 1.
  - Right: "Next" or "Confirm" button (primary, small). "Next" on steps 1-6. "Confirm & submit" on step 7.
- **Progress persistence**: If user refreshes, mock behavior: warn "Your progress is not saved yet." (real persistence not required for demo).

---

## Step 1: Personal Info (`StepPersonalInfo`)
- **Step label**: "Personal Info"
- **Header inside card**: `text-h2` "Tell us about yourself". Subtitle: `text-body` color `#4A4A5A`. Copy: "We need this for your KYC profile. Your data is kept secure."
- **Fields**:
  1. **Full Name** (text): Pre-filled from registration. Editable. Label: "Full name (as per ID)". Placeholder: "Thabo Mokoena".
  2. **SA ID Number** (text): Label: "South African ID number". Placeholder: "000101 1234 087". Validation: 13 digits, basic SA format regex.
  3. **Phone Number** (tel): Label: "Mobile number". Placeholder: "+27 82 123 4567". Validation: required, min 10 digits.
  4. **Residential Address** (textarea): Label: "Residential address". Placeholder: "123 Luthuli Street, Berea, Johannesburg, 2198". Rows: 3. Validation: required, min 10 characters.
- **Validation**: All fields required. Show inline errors. "Next" disabled until valid.

---

## Step 2: Financial Profile (`StepFinancialProfile`)
- **Step label**: "Financial Profile"
- **Header**: `text-h2` "Your financial picture". Subtitle: `text-body`. Copy: "This helps us understand your capacity and recommend suitable stokvels."
- **Fields**:
  1. **Employment Status** (select / dropdown):
     - Label: "Employment status"
     - Options: "Employed full-time", "Employed part-time", "Self-employed", "Contractor / Freelance", "Student", "Unemployed", "Retired".
     - Validation: required.
  2. **Monthly Income Range** (segmented control / radio buttons):
     - Label: "Monthly income range (ZAR)"
     - Options: "Under R 5 000", "R 5 000 – R 10 000", "R 10 000 – R 20 000", "R 20 000 – R 40 000", "Over R 40 000", "Prefer not to say".
     - Visual: 3-column grid of selectable cards (radio style). Selected card has border `#0B8C6B` and bg `rgba(11,140,107,0.06)`.
     - Validation: required.
- **Note**: `text-caption`, color `#8A8A9A`. Copy: "This information is only used for your profile and will never be shared with other members."

---

## Step 3: Goals & Duration (`StepGoalsDuration`)
- **Step label**: "Goals & Duration"
- **Header**: `text-h2` "What are you saving for?". Subtitle: `text-body`. Copy: "Choose a goal and how long your stokvel will run."
- **Goal Selection** (grid of selectable cards):
  - Label: "Select your primary goal"
  - Options (icon + label + description inside each card):
    - 🏠 **Buy a home** — "Save for a deposit or bond repayment."
    - 🚀 **Start a business** — "Pool capital to launch a venture."
    - 🎓 **Education** — "Tuition, textbooks, or skills courses."
    - 🛡️ **Emergency fund** — "A safety net for the unexpected."
    - ✈️ **Travel** — "Dream trip with friends or family."
    - ✏️ **Custom** — "Describe your own goal."
  - Icons: Lucide icons (`Home`, `Rocket`, `GraduationCap`, `Shield`, `Plane`, `Pencil`). Size 24px, color `#0B8C6B`.
  - Grid: 2 columns on mobile, 3 on desktop. Gap 1rem.
  - Selected card: border `#0B8C6B`, bg `rgba(11,140,107,0.06)`, icon color `#0B8C6B`.
  - If "Custom" selected, reveal a text input below: "Describe your goal".
  - Validation: required.
- **Duration Selection** (segmented control):
  - Label: "Stokvel duration"
  - Options: 6, 12, 24, 36, 60 months.
  - Visual: horizontal row of pill buttons. Selected pill: bg `#0B8C6B`, text white. Unselected: bg `#F6F7F9`, text `#4A4A5A`.
  - Validation: required.
- **Helper text**: `text-body-sm`, color `#4A4A5A`. Copy: "Most members choose 12 or 24 months for a balance between commitment and flexibility."

---

## Step 4: Risk Appetite (`StepRiskAppetite`)
- **Step label**: "Risk Appetite"
- **Header**: `text-h2` "How do you feel about risk?". Subtitle: `text-body`. Copy: "This determines how your stokvel's pool will be allocated across ETFs."
- **Selector**: 3 large cards in a row (mobile stacks to 1 column). Gap 1.5rem.
- **Card layout**:
  - Top: Icon (Lucide `Shield`, `Scale`, `TrendingUp` for Conservative, Moderate, Aggressive). Size 40px, inside a 64px circle with soft background color matching the risk tone.
  - Title: `text-h3`, color `#1A1A2E`.
  - Description: `text-body-sm`, color `#4A4A5A`.
  - ETF allocation preview: small horizontal stacked bar (or 3 mini bars) showing approximate allocation percentages.
  - Risk badge at bottom.
- **Option details**:
  1. **Conservative** (`Shield` icon, circle bg `#E2F0EC`, icon `#0B8C6B`)
     - Copy: "Preserve capital with minimal risk. Suitable for short-term goals."
     - Allocation preview: Cash / Bonds 70%, Balanced ETFs 25%, Equity ETFs 5%.
     - Badge: "Conservative" (green pill).
  2. **Moderate** (`Scale` icon, circle bg `#FEF3E2`, icon `#B8860B`)
     - Copy: "Balance growth and stability. A mix of bonds and equities."
     - Allocation preview: Cash / Bonds 30%, Balanced ETFs 50%, Equity ETFs 20%.
     - Badge: "Moderate" (amber pill).
  3. **Aggressive** (`TrendingUp` icon, circle bg `#FDE8E4`, icon `#C0392B`)
     - Copy: "Maximize growth potential. Higher volatility for longer horizons."
     - Allocation preview: Cash / Bonds 10%, Balanced ETFs 30%, Equity ETFs 60%.
     - Badge: "Aggressive" (red pill).
- **Selection behavior**: Clicking a card selects it (border `#0B8C6B`, shadow ring). Only one selectable.
- **Bottom note**: `text-body-sm`, color `#8A8A9A`. Copy: "You can change this later when creating or joining a stokvel. This sets your default preference."
- **Validation**: required.

---

## Step 5: Monthly Contribution (`StepContribution`)
- **Step label**: "Contribution"
- **Header**: `text-h2` "How much will you contribute monthly?". Subtitle: `text-body`. Copy: "Set an amount you can comfortably commit to each month."
- **Slider** (`RangeSlider`):
  - Range: R 100 to R 10 000.
  - Step: R 100 increments.
  - Visual: horizontal track, height 6px, bg `#E2E4E8`, fill `#0B8C6B`, thumb 24px circle white with border `#0B8C6B` and shadow.
  - Label above slider: `text-h3`, color `#0B8C6B`. Shows formatted value: "R 2 500".
- **Quick select chips**: Row of pill buttons below slider for common values: R 500, R 1 000, R 2 500, R 5 000, R 10 000. Selected chip: bg `#0B8C6B`, text white. Unselected: bg `#F6F7F9`, text `#4A4A5A`.
- **Projected total** (`ProjectedTotal`):
  - Card below slider, bg `#E2F0EC`, border radius 12px, padding 1.5rem.
  - Label: `text-body-sm`, color `#0B8C6B`. Copy: "Projected total after [duration] months"
  - Value: `text-h2`, color `#0B8C6B`. Calculation: `contribution × duration` (no interest assumption for simplicity, or a small conservative growth note). Example: "R 30 000".
  - Subnote: `text-caption`, color `#0B8C6B`. Copy: "This is your pooled contribution. ETF returns are projected separately."
- **Validation**: required (slider defaults to R 500, so always valid).

---

## Step 6: Payment Setup (`StepPaymentSetup`)
- **Step label**: "Payment"
- **Header**: `text-h2` "Set up your payment method". Subtitle: `text-body`. Copy: "Link a bank card for your monthly contributions."
- **Security visual treatment**:
  - Top of card: small banner, bg `#E2F0EC`, border radius 8px, padding 0.75rem, margin-bottom 1.5rem.
  - Icon: Lucide `Lock`, color `#0B8C6B`, size 20px.
  - Text: `text-body-sm`, color `#0B8C6B`. Copy: "This is a demo. No real payments are processed. Do not enter real card details."
- **Fields** (mock card form):
  1. **Cardholder Name** (text): Label: "Name on card". Placeholder: "Thabo Mokoena". Validation: required.
  2. **Card Number** (text): Label: "Card number". Placeholder: "0000 0000 0000 0000". Input formatting: auto-insert spaces every 4 digits. Max 19 chars. Validation: required, min 16 digits.
  3. **Expiry Date** (text, MM/YY): Label: "Expiry date". Placeholder: "MM/YY". Validation: required, valid future date format.
  4. **CVV** (text, password type): Label: "CVV". Placeholder: "123". Max 4 chars. Validation: required, 3-4 digits.
  5. **Bank Name** (select): Label: "Bank". Options: "FNB", "ABSA", "Standard Bank", "Capitec", "Nedbank", "Investec", "Other". Validation: required.
- **Card preview**: To the right of the form (desktop only, or below on mobile), a visual credit card mockup:
  - Size: 320px × 200px, border radius 16px, gradient bg from `#0B8C6B` to `#14A085`.
  - Shows: Yieldly logo, card number dots, expiry, cardholder name, chip icon (Lucide `CreditCard`).
  - Dynamic: card number, expiry, and name update as user types.
- **Validation**: All fields required. "Next" disabled until valid.

---

## Step 7: Review & Confirm (`StepReviewConfirm`)
- **Step label**: "Review"
- **Header**: `text-h2` "Review your profile". Subtitle: `text-body`. Copy: "Everything look correct? Submit to complete your onboarding."
- **Summary list** (`ReviewSummary`):
  - A vertical list of summary items, each row with a label and value, separated by `1px solid #E2E4E8` dividers.
  - Each row has an "Edit" link on the right (ghost button, small, with Lucide `Pencil` icon) that jumps back to the corresponding step.
  - Rows (in order):
    - **Personal Info**: Name, ID, Phone, Address. Truncated if long.
    - **Financial Profile**: Employment status + Income range.
    - **Goal**: Goal name + duration (e.g., "Buy a home — 24 months").
    - **Risk Appetite**: Selected level + brief allocation note.
    - **Monthly Contribution**: Amount + projected total.
    - **Payment**: Card ending in XXXX + Bank name.
- **Terms checkbox**:
  - Label: `text-body-sm`, color `#4A4A5A`. Copy: "I confirm that the information provided is accurate and I agree to Yieldly's simulated terms of service."
  - Validation: required.
- **Submit button**: "Complete onboarding" (primary, large, full width). Loading: "Submitting..."
- **Success**: Redirect to `/dashboard` with a success toast: "Welcome to Yieldly! Your profile is ready."

---

## Wizard Step Transitions
- **Animation**: When moving between steps, the content area slides horizontally (translateX: -20px → 0 on forward, 20px → 0 on back) + opacity fade (0 → 1), duration 0.35s, ease-out.
- **Content height**: Animate height if steps have different heights (optional; acceptable to have fixed min-height).
- **Step indicator**: Step circles update with a 0.3s color transition.

---

## Responsive Behavior
- Mobile: Step indicator shrinks to show only step numbers (no labels) or abbreviates. Card padding 1.5rem. Navigation buttons stack if needed (Back on left, Next on right in a flex row).
- Desktop: Step indicator shows step labels below circles. Card preview (Step 6) appears side by side.
- The wizard is always centered with `max-w-narrow`.

---

## Mock Data Defaults
- Pre-filled from registration: Full name, email.
- Default slider value: R 1 000.
- Default duration: 12 months.
- Default risk: Moderate.
