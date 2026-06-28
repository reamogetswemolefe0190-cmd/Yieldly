# Yieldly — Stokvel Pages (`/stokvels`, `/stokvels/create`, `/stokvels/[id]`)

## Routes & Purpose
- **Route**: `/stokvels` — Browse public stokvels, filter, search, join.
- **Route**: `/stokvels/create` — Create a new stokvel with form + ETF preview.
- **Route**: `/stokvels/[id]` — View stokvel detail, members, ETF allocation, activity, timeline.
- **Layout**: Authenticated app shell (`AppShell`) for all three. Desktop: sidebar + content. Mobile: bottom nav.

---

## 1. Browse Stokvels (`/stokvels`)

### Page Header
- `TopBar` (desktop): Title "Explore stokvels". Right: search icon that expands inline search bar.
- Mobile: Title "Explore stokvels" as screen header, no TopBar.

### Search & Filter Bar (`SearchFilterBar`)
- **Position**: Sticky below header on desktop, static on mobile.
- **Background**: White, border-bottom `1px solid #E2E4E8`, padding-y 1rem.
- **Layout**: Flex row, wrap. Gap 1rem.
- **Search input**:
  - Width: 100% mobile, 320px desktop.
  - Icon: Lucide `Search`, left inside input, color `#8A8A9A`.
  - Placeholder: "Search by name or goal..."
  - Clear button (Lucide `X`) appears when text is entered.
- **Filters** (dropdowns / pill selects):
  1. **Risk level**: All, Conservative, Moderate, Aggressive. Pill-style segmented control.
  2. **Goal category**: All, Home, Business, Education, Emergency, Travel, Custom. Dropdown select.
  3. **Duration**: All, 6 months, 12 months, 24 months, 36 months, 60 months. Dropdown select.
- **Active filter tags**: If any filter is selected, show pill tags below with "X" to remove. Tag style: bg `#E2F0EC`, text `#0B8C6B`, `text-caption`.
- **Results count**: `text-body-sm`, color `#8A8A9A`. Copy: "Showing 12 stokvels".

### Stokvel Grid (`StokvelGrid`)
- **Layout**: 1 column mobile, 2 columns `md`, 3 columns `xl`. Gap 1.5rem. `max-w-app` container.
- **Cards** (`StokvelCard` — shared with landing page):
  - Background: white, border radius 16px, padding 1.5rem, border `1px solid #E2E4E8`.
  - Hover: `translateY(-2px)` + shadow increase. Cursor pointer.
  - Content:
    - Top row: Goal badge (left) + Privacy badge (right).
    - Title: `text-h3`, color `#1A1A2E`. E.g., "Soweto Business Circle".
    - Description: `text-body-sm`, color `#4A4A5A`, 2 lines max, ellipsis. E.g., "Pooling funds to support small business launches in our community."
    - Meta row: `Users` icon + member count + `Calendar` icon + duration.
    - Contribution: `text-body-sm`, weight 600. "R 1 200 / month".
    - Risk badge: `Badge` component.
    - Progress: `ProgressBar` showing filled slots (e.g., 7/10 members). Fill color `#E88D3A` (accent) for social/community feel.
    - Bottom CTA: "Join stokvel" (primary, small, full width) if public and not full. If full: "Full" (disabled, secondary). If invite-only: "Invite only" (secondary, disabled) + lock icon.
- **Mock data** (12 cards, mix of public/invite-only, various risks/goals/durations):
  - Thembisa Home Builders (Home, 24mo, R1500, Moderate, 8/12, Public)
  - Luthuli Street Entrepreneurs (Business, 36mo, R2000, Aggressive, 5/10, Public)
  - Maboneng Education Fund (Education, 12mo, R800, Conservative, 10/10, Public — Full)
  - Soweto Business Circle (Business, 24mo, R1200, Moderate, 7/10, Public)
  - Cape Town Travel Tribe (Travel, 12mo, R2500, Aggressive, 4/8, Invite-only)
  - Durban Emergency Pool (Emergency, 6mo, R500, Conservative, 6/6, Public — Full)
  - Johannesburg Youth Fund (Education, 36mo, R1000, Moderate, 3/15, Public)
  - Pretoria Family Savers (Home, 60mo, R3000, Conservative, 9/10, Public)
  - Gqeberha Startup Collective (Business, 12mo, R1500, Aggressive, 2/6, Invite-only)
  - Bloemfontein Custom Crew (Custom: "Farm equipment", 24mo, R2000, Moderate, 5/8, Public)
  - Polokwane Home Dreamers (Home, 36mo, R1800, Conservative, 7/12, Public)
  - Rustenburg Travel Group (Travel, 24mo, R2200, Moderate, 8/10, Public)
- **Empty state**: If no results match filters, show `Search` icon (48px, soft circle) + "No stokvels match your filters" + "Clear filters" button (secondary).

### Floating Action Button (Mobile only)
- Position: bottom-right, 24px from edges, above bottom nav.
- Style: Circle, 56px, bg `#0B8C6B`, white `Plus` icon, shadow `0 4px 12px rgba(0,0,0,0.2)`.
- Links to `/stokvels/create`.
- Hover: `scale(1.05)`.

---

## 2. Create Stokvel (`/stokvels/create`)

### Page Header
- `TopBar`: Title "Create a stokvel". Right: "Cancel" link (ghost button) that navigates back to `/stokvels`.
- Mobile: Back arrow (Lucide `ArrowLeft`) + title.

### Form Layout
- `max-w-narrow` (560px) centered card, white, padding 2rem. Sections separated by `1px solid #E2E4E8` dividers with section headers.

### Form Sections (`CreateStokvelForm`)

**Section A: Basic Info**
- **Stokvel Name** (text): Label "Stokvel name". Placeholder "e.g., Soweto Business Circle". Validation: required, min 3, max 60.
- **Description** (textarea): Label "Description". Placeholder "What is this stokvel about?". Rows 3. Validation: required, max 280 chars. Char counter below: `text-caption`, color `#8A8A9A`. "0 / 280".
- **Goal** (select + optional custom): Label "Goal". Options: Home, Business, Education, Emergency, Travel, Custom. If Custom selected, show text input: "Describe your goal".
- **Privacy** (segmented control): Label "Privacy". Two options: "Public" (anyone can join) and "Invite-only" (members must be invited). Default: Public. Icons: `Globe` and `Lock`.

**Section B: Financial Setup**
- **Duration** (segmented control): Label "Duration". Options: 6, 12, 24, 36, 60 months. Default: 12.
- **Monthly Contribution** (slider + input): Same component as onboarding (`RangeSlider`), R 100 – R 10 000. Default: R 1 000. Show formatted value above.
- **Max Members** (number input): Label "Maximum members". Min 2, max 50. Default: 10. Helper: "Including yourself".
- **Risk Appetite** (3-card selector): Same as onboarding `StepRiskAppetite`. Default: Moderate. Selection updates the ETF preview in real time.

**Section C: ETF Allocation Preview (`ETFAllocationPreview`)**
- **Position**: Below Risk selector, inside a highlighted card, bg `#F6F7F9`, border radius 12px, padding 1.5rem.
- **Header**: `text-h4` "ETF Allocation Preview". Subtitle: `text-body-sm` "Based on your selected risk appetite."
- **Visual**: A horizontal stacked bar chart (or donut/pie if space permits) showing the allocation:
  - Conservative: Cash/Bonds 70%, Balanced 25%, Equity 5%.
  - Moderate: Cash/Bonds 30%, Balanced 50%, Equity 20%.
  - Aggressive: Cash/Bonds 10%, Balanced 30%, Equity 60%.
- **Legend**: Color swatch + label + percentage for each category. Colors:
  - Cash/Bonds: `#0B8C6B` (primary green).
  - Balanced ETFs: `#E9C46A` (yellow).
  - Equity ETFs: `#E88D3A` (accent orange).
- **Note**: `text-caption`, color `#8A8A9A`. Copy: "This is a theoretical allocation. Actual ETFs are selected during formal registration."

**Section D: Submit**
- **Submit button**: "Create stokvel" (primary, large, full width). Loading: "Creating..."
- **Success**: Redirect to `/stokvels/[newId]` with success toast: "Your stokvel 'Name' has been created!"
- **Validation**: All required fields must be valid. Show inline errors.

---

## 3. Stokvel Detail (`/stokvels/[id]`)

### Page Header (`StokvelDetailHeader`)
- **Back button**: `ArrowLeft` icon, ghost button, small. Navigates to `/stokvels`.
- **Title area**:
  - H1: `text-h1`, stokvel name. E.g., "Thembisa Home Builders".
  - Subtitle row: Goal badge + Risk badge + Privacy badge. Gap 0.5rem.
- **Action buttons** (right side on desktop, below title on mobile):
  - If member: "Invite members" (secondary, with `UserPlus` icon) + "Leave stokvel" (danger ghost, small).
  - If non-member + public + not full: "Join stokvel" (primary, large).
  - If non-member + invite-only: "Invite only" (disabled secondary, with `Lock` icon).
  - If full: "Full" (disabled secondary).

### Stats Row (`StokvelStatsRow`)
- **Layout**: 4 columns on desktop, 2x2 grid on mobile. Gap 1rem. Margin-top 2rem.
- **Mini stat cards** (white, border radius 12px, padding 1rem, border `1px solid #E2E4E8`):
  1. **Total Pool**: `text-h3` "R 108 000" • `text-caption` "Total pool (monthly × members)".
  2. **Members**: `text-h3` "8/12" • `text-caption` "Members joined". With avatar stack (4 overlapping avatars, then "+4" count).
  3. **Monthly Contribution**: `text-h3` "R 1 500" • `text-caption` "Per member / month".
  4. **Months Remaining**: `text-h3` "16" • `text-caption` "Months left (of 24)".

### Main Content Grid (`StokvelDetailGrid`)
- **Desktop**: 2 columns, 60% left / 40% right. Gap 2rem. Margin-top 2rem.
- **Mobile**: Single column, stacked.

#### Left Column

**ETF Allocation Card (`ETFAllocationCard`)**
- Background: white, border radius 16px, padding 1.5rem.
- Header: `text-h3` "ETF Allocation". Risk badge on right.
- **Chart**: Recharts pie chart (or donut chart), 240px diameter, centered.
  - Segments: Cash/Bonds (`#0B8C6B`), Balanced (`#E9C46A`), Equity (`#E88D3A`).
  - Center label: Risk level name (`text-h4`).
  - Legend below: color swatch + label + percentage.
- **Description**: `text-body-sm`, color `#4A4A5A`. Copy varies by risk. E.g., for Moderate: "This balanced approach aims to protect capital while capturing moderate growth through a mix of bond and equity ETFs."
- **Mock data**: Thembisa Home Builders is Moderate: 30% Cash/Bonds, 50% Balanced, 20% Equity.

**Member List Card (`MemberListCard`)**
- Background: white, border radius 16px, padding 1.5rem. Margin-top 1.5rem.
- Header: `text-h3` "Members" + member count pill.
- **List**: Vertical list of `MemberItem`.
  - Layout: flex row. Avatar (40px) + name (`text-body-sm`, weight 600) + role (`text-caption`, color `#8A8A9A`).
  - Role tags: "Admin" (bg `#E2F0EC`, text `#0B8C6B`), "Member" (no tag), "Pending" (bg `#FEF3E2`, text `#B8860B`).
  - Right: contribution status dot (green = paid this month, gray = pending).
- **Mock data** (8 members):
  - Thabo M. (Admin) — green dot
  - Sizwe K. (Member) — green dot
  - Lerato N. (Member) — green dot
  - Nomsa D. (Member) — gray dot
  - Jabu S. (Member) — green dot
  - Kgosi P. (Member) — green dot
  - Thembi R. (Member) — gray dot
  - Bongani T. (Pending) — amber dot
- **Invite button**: Below list, "Invite more members" (secondary, full width, with `UserPlus` icon). Opens mock modal with "Copy invite link".

#### Right Column

**Timeline / Progress Card (`TimelineCard`)**
- Background: white, border radius 16px, padding 1.5rem.
- Header: `text-h3` "Timeline".
- **Progress bar**: `ProgressBar` showing overall timeline (e.g., 8/24 months = 33%). Fill `#0B8C6B`.
- **Milestone list**: Vertical list of milestones.
  - Each: icon (check circle or empty circle), title (`text-body-sm`), date (`text-caption`).
  - Completed: green check icon, text `#1A1A2E`.
  - Upcoming: gray empty circle, text `#8A8A9A`.
- **Mock milestones**:
  - ✓ Stokvel created — Jan 2024
  - ✓ 5 members joined — Feb 2024
  - ✓ First contribution cycle — Feb 2024
  - ○ 50% of goal reached — Aug 2024 (estimated)
  - ○ Goal reached — Jan 2026 (estimated)

**Payment History Card (`PaymentHistoryCard`)**
- Background: white, border radius 16px, padding 1.5rem. Margin-top 1.5rem.
- Header: `text-h3` "Payment history".
- **List**: 5 recent payment items.
  - Layout: flex row. Left: month label (`text-body-sm`). Right: amount (`text-body-sm`, weight 600, color `#0B8C6B`).
  - Separator: `1px solid #E2E4E8` between items.
- **Mock data**:
  - February 2025 — R 12 000 (8 members)
  - January 2025 — R 12 000 (8 members)
  - December 2024 — R 10 500 (7 members)
  - November 2024 — R 10 500 (7 members)
  - October 2024 — R 9 000 (6 members)
- **Footer link**: "View full history" (ghost, small). Mock.

**Activity Feed Card (`ActivityFeedCard`)**
- Background: white, border radius 16px, padding 1.5rem. Margin-top 1.5rem.
- Header: `text-h3` "Recent activity".
- Same `ActivityItem` style as dashboard but scoped to this stokvel.
- Mock items: member joined, contribution made, admin changed settings, etc.

---

## Responsive Behavior Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Browse grid | 1 column | 2 columns | 3 columns |
| Search/Filter | Stacked | Inline row | Inline row |
| Create form | Single column | Same | Same (narrow centered) |
| Detail header | Stacked | Stacked | Title + buttons inline |
| Detail stats | 2x2 grid | 4 columns | 4 columns |
| Detail main | Single column | Single column | 60/40 split |

---

## Interactions & State Changes
- **Browse card click**: Navigates to `/stokvels/[id]`. Hover: `translateY(-2px)`.
- **Join button**: Opens confirmation modal ("Join 'Name'? You will contribute R X monthly."). Confirm → success toast "You joined 'Name'!" → redirect to dashboard or detail page with member status updated.
- **Invite button**: Copies mock link to clipboard, toast "Invite link copied!".
- **Create form**: Real-time ETF preview updates as risk changes. Description char counter updates live.
- **Detail page**: Pie chart animates on mount (scale 0.8 → 1, opacity 0 → 1, 0.5s). Progress bar animates width on mount.
- **Skeleton**: On browse page, show 6 skeleton cards (rectangles with rounded corners) while loading. On detail page, skeleton for stats, pie chart, and member list.
