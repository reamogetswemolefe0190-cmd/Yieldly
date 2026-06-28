# Yieldly — Settings Page (`/settings`)

## Route & Purpose
- **Route**: `/settings`
- **Purpose**: User account management. Tabs for profile, notifications, security, KYC status, and bank cards.
- **Layout**: Authenticated app shell (`AppShell`). Desktop: sidebar + content. Mobile: bottom nav.
- **Page title**: "Settings" (in `TopBar` on desktop, screen title on mobile).

---

## Page Layout (`SettingsPage`)
- **Container**: `max-w-app` (1200px), centered. Padding 2rem mobile / 3rem desktop.
- **Tab Navigation** (`SettingsTabs`):
  - Desktop: Horizontal tab bar at top of content area, sticky below `TopBar`, bg white, border-bottom `1px solid #E2E4E8`.
  - Mobile: Vertical tab list (accordion-style or scrollable horizontal pills at top). Prefer horizontal scrollable pills on mobile for space.
  - Tab items: "Profile", "Notifications", "Security", "KYC Status", "Bank Cards".
  - Active tab: text `#0B8C6B`, border-bottom `2px solid #0B8C6B` (desktop). Mobile: bg `#0B8C6B`, text white pill.
  - Inactive: text `#4A4A5A`, hover text `#0B8C6B`.
  - Transition: `border-color 0.2s ease`, `color 0.2s ease`.
- **Content area**: White card (`Card` style), border radius 16px, padding 2rem (mobile 1.5rem), margin-top 1.5rem.
- **Tab content transition**: Fade in + translateY(8px → 0), 0.2s ease, on tab switch.

---

## Tab 1: Profile (`ProfileTab`)
- **Header**: `text-h2` "Profile". Subtitle: `text-body` "Manage your personal information."
- **Avatar section**:
  - Large avatar (80px circle) centered or left-aligned. Current image or initials fallback.
  - Below: "Change photo" link (ghost button, small). Mock — opens file picker (non-functional) or shows toast "Photo upload is simulated."
- **Form fields** (`SettingsForm`):
  1. **Full Name** (text): Pre-filled from onboarding. Label: "Full name". Validation: required.
  2. **Email** (email): Pre-filled. Label: "Email address". Disabled (cannot change in demo) or editable with verification note.
  3. **Phone Number** (tel): Pre-filled. Label: "Mobile number".
  4. **Residential Address** (textarea): Pre-filled. Label: "Residential address". Rows: 3.
- **Save button**: "Save changes" (primary, medium). Bottom right of card. Loading: "Saving...". Success toast: "Profile updated."

---

## Tab 2: Notifications (`NotificationsTab`)
- **Header**: `text-h2` "Notifications". Subtitle: `text-body` "Choose how you want to be notified."
- **Section A: Email Notifications**
  - Toggle list (`ToggleList`):
    - Each row: label (`text-body-sm`, weight 500) + description (`text-caption`, color `#8A8A9A`) + `Switch` toggle (right side).
    - Items:
      1. "Contribution reminders" — "Get reminded before your monthly contribution is due."
      2. "Stokvel updates" — "When a member joins, leaves, or a milestone is reached."
      3. "Goal progress" — "Weekly summary of your stokvel goals and projected values."
      4. "Marketing & tips" — "Occasional updates about new features and savings tips."
  - Toggle style: `Switch` from Headless UI / Radix. Track 44px × 24px, thumb 20px. Checked: bg `#0B8C6B`. Unchecked: bg `#E2E4E8`. Transition: `0.2s`.
- **Section B: Push Notifications (Mock)**
  - Same toggle list but with note: "Push notifications are simulated in this demo."
  - Items: "Enable push notifications", "Contribution due alerts", "Stokvel invites".
- **Section C: Notification Preferences**
  - Frequency select: "Digest frequency" — Daily, Weekly, Monthly. Dropdown.

---

## Tab 3: Security (`SecurityTab`)
- **Header**: `text-h2` "Security". Subtitle: `text-body` "Manage your password and account security."
- **Section A: Change Password**
  - Fields:
    1. **Current Password** (`PasswordField`): Label "Current password". Required.
    2. **New Password** (`PasswordField`): Label "New password". Required, min 8 chars. With strength bar.
    3. **Confirm New Password** (`PasswordField`): Label "Confirm new password". Must match.
  - Button: "Update password" (primary, medium). Mock success: toast "Password updated (simulated)."
- **Section B: Two-Factor Authentication (2FA)**
  - Divider above.
  - Header: `text-h3` "Two-factor authentication".
  - Description: `text-body-sm`. Copy: "Add an extra layer of security to your account. In this demo, 2FA is simulated."
  - Toggle: `Switch` + label "Enable 2FA". Default: off.
  - When toggled on: reveal mock setup steps (1. Scan QR code [placeholder box], 2. Enter 6-digit code [input]) + "Verify" button. Simulated success toast.
- **Section C: Active Sessions (Mock)**
  - Header: `text-h3` "Active sessions".
  - List of mock sessions:
    - "Johannesburg, South Africa — Chrome on Windows — Current" — green dot.
    - "Cape Town, South Africa — Safari on iPhone — 2 days ago" — gray dot + "Logout" link (danger ghost, small).

---

## Tab 4: KYC Status (`KYCTab`)
- **Header**: `text-h2` "KYC Status". Subtitle: `text-body` "Your identity verification status."
- **Status Banner** (`KYCStatusBanner`):
  - Full width inside card, border radius 12px, padding 1.5rem.
  - If verified: bg `#E2F0EC`, icon `CheckCircle` (`#0B8C6B`), title "Verified", description "Your identity has been verified. You can create and join stokvels."
  - If pending: bg `#FEF3E2`, icon `Clock` (`#B8860B`), title "Verification pending", description "We're reviewing your documents. This usually takes 1-2 business days."
  - If rejected: bg `#FDE8E4`, icon `XCircle` (`#C0392B`), title "Verification failed", description "Please review the issues below and resubmit." + CTA button "Resubmit documents".
- **Demo default**: "Verified" status.
- **Details list**:
  - Vertical list of KYC fields, each row showing field name, submitted value, and status icon.
  - Rows:
    - Full Name — "Thabo Mokoena" — ✓
    - SA ID Number — "000101 1234 087" — ✓
    - Phone Number — "+27 82 123 4567" — ✓
    - Address — "123 Luthuli Street, Berea, Johannesburg, 2198" — ✓
    - Employment Status — "Employed full-time" — ✓
    - Income Range — "R 10 000 – R 20 000" — ✓
  - Each row: flex, border-bottom `1px solid #E2E4E8`, padding-y 1rem. Label (`text-body-sm`, color `#4A4A5A`) + value (`text-body-sm`, weight 500) + icon (`CheckCircle`, color `#2A9D8F`, 20px).
- **Note at bottom**: `text-caption`, color `#8A8A9A`. Copy: "KYC data is encrypted and stored in compliance with POPIA (Protection of Personal Information Act). This is a demo — no real data is stored."

---

## Tab 5: Bank Cards (`BankCardsTab`)
- **Header**: `text-h2` "Bank Cards". Subtitle: `text-body` "Manage your linked payment methods."
- **Card List** (`BankCardList`):
  - Vertical list of saved cards. Each card is a visual card component (`BankCardVisual`):
    - Size: full width, height 180px, border radius 16px, gradient bg matching bank brand color (or default `#0B8C6B` to `#14A085` if unknown).
    - Top-left: Bank logo (text or SVG). Top-right: Lucide `CreditCard` icon (white, 24px).
    - Middle: Card number masked: "•••• •••• •••• 4242". Font: monospace `text-h3`, white, letter-spacing wide.
    - Bottom-left: "Cardholder name" label + name (`text-body-sm`, white). Bottom-right: "Expiry" label + "MM/YY".
    - Top-right corner: menu button (Lucide `MoreVertical`, white) with dropdown: "Set as default", "Remove". "Remove" opens confirmation modal.
  - **Mock data** (2 cards):
    1. FNB — ending in 4242 — Expiry 09/27 — Default (small "Default" badge, white bg, green text, top-left below bank name).
    2. Capitec — ending in 8888 — Expiry 12/26 — Not default.
- **Add Card Button**:
  - Below card list: "Add new card" (secondary, full width, with `Plus` icon). Opens mock modal with the same card form as onboarding Step 6 (non-functional, shows toast "Card added (simulated).").
- **Empty state**: If no cards, show `CreditCard` icon (48px, soft circle) + "No cards linked" + "Add your first card" button (primary).
- **Security note**: `text-caption`, color `#8A8A9A`. Copy: "Your card details are tokenized and encrypted. This is a demo — no real payments are processed."

---

## Responsive Behavior Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Tabs | Horizontal scrollable pills | Horizontal scrollable or vertical | Horizontal sticky tab bar |
| Card content | Full width, padding 1.5rem | Same | Same, padding 2rem |
| Bank card visual | Full width, 160px height | Same | 320px max width, 180px height |
| Avatar | Centered, 80px | Left-aligned, 80px | Left-aligned, 80px |
| Form buttons | Full width | Auto width | Auto width, bottom-right |

---

## Interactions & State Changes
- **Tab switch**: Content fades + translateY(8px), 0.2s. URL does not change (client-side tabs).
- **Toggle switches**: Smooth thumb slide, color transition 0.2s. Immediate state update (no save button needed for toggles). Toast on change: "Preference saved."
- **Save buttons**: Show loading spinner, then success toast. Fields revert to read-only until saved.
- **2FA toggle**: When enabled, reveal QR placeholder with `0.3s` height transition (expand/collapse). QR placeholder is a gray box (120px) with "QR code placeholder" caption.
- **Bank card menu**: Dropdown appears on click (absolute, shadow, white bg, border radius 8px). Dismiss on outside click.
- **Remove card modal**: "Remove card ending in XXXX?" + "Cancel" (secondary) + "Remove" (danger). Success toast.
- **Skeleton**: On initial mount, show skeleton for avatar, form fields, and card list. Replace after 0.5s.
