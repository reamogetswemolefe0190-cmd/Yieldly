# Yieldly — Dashboard Page (`/dashboard`)

## Route & Purpose
- **Route**: `/dashboard`
- **Purpose**: The user's central hub after onboarding. Shows financial overview, active stokvels, recent activity, and quick actions.
- **Layout**: Authenticated app shell (`AppShell`). Desktop: left sidebar + content area with `TopBar`. Mobile: bottom nav + scrollable content.
- **Page title**: "Dashboard" (shown in `TopBar` on desktop, or as screen title on mobile if not using TopBar).

---

## Section-by-Section Layout

### 1. Stats Cards Row (`StatsCards`)
- **Position**: Top of content area, below `TopBar` (desktop) or below page title (mobile).
- **Layout**: 3 columns on desktop (`xl`), 2 on `md`, 1 on mobile. Gap 1.5rem.
- **Cards** (`StatCard`):
  - Background: white, border radius 16px, padding 1.5rem, border `1px solid #E2E4E8`.
  - Top row: Icon (32px, inside 48px circle with soft bg) + label (`text-body-sm`, color `#8A8A9A`).
  - Bottom row: Value (`text-h2`, color `#1A1A2E`, weight 700) + trend indicator (if applicable).
  - Trend: `text-caption`, color `#2A9D8F` for positive, `#E76F51` for negative. With Lucide `TrendingUp` / `TrendingDown` icon.
- **Stats**:
  1. **Total Contributed**
     - Icon: `Wallet`, circle bg `#E2F0EC`, icon color `#0B8C6B`.
     - Value: "R 24 500.00"
     - Label: "Total contributed"
     - Trend: "+R 2 500 this month" (green).
  2. **Active Stokvels**
     - Icon: `Users`, circle bg `#FEF3E2`, icon color `#B8860B`.
     - Value: "3"
     - Label: "Active stokvels"
     - Trend: "2 public, 1 invite-only" (gray).
  3. **Projected Value**
     - Icon: `TrendingUp`, circle bg `#E2F0EC`, icon color `#0B8C6B`.
     - Value: "R 31 200.00"
     - Label: "Projected value (12 mo)"
     - Trend: "+27% estimated growth" (green).
- **Entrance animation**: Stagger fade in + translateY(16px), 0.1s stagger.

---

### 2. Quick Actions Row (`QuickActions`)
- **Layout**: Horizontal row of 3 buttons on desktop, stacked on mobile. Gap 1rem. Margin-top 2rem.
- **Buttons**:
  1. **Join a Stokvel** (secondary button, with Lucide `Search` icon). Links to `/stokvels`.
  2. **Create a Stokvel** (primary button, with Lucide `Plus` icon). Links to `/stokvels/create`.
  3. **Invite Friends** (accent button, with Lucide `Share2` icon). Opens mock modal: "Invite link copied to clipboard!" (simulated).
- **Mobile**: Buttons are full width, stacked vertically.

---

### 3. My Stokvels Section (`MyStokvelsSection`)
- **Header**: Flex row, space-between.
  - Left: H2 "My stokvels" (`text-h2`).
  - Right: "View all" link (`text-body-sm`, color `#0B8C6B`, with `ArrowRight` icon). Links to `/stokvels`.
- **Layout**: Vertical list on mobile, 2-column grid on desktop (`lg`). Gap 1.5rem. Margin-top 1.5rem.
- **Stokvel list cards** (`StokvelListCard`):
  - Background: white, border radius 16px, padding 1.5rem, border `1px solid #E2E4E8`.
  - Hover: `translateY(-2px)` + shadow (if clickable, linking to detail).
  - Content structure:
    - Top row: Goal badge (`Badge` component) + Risk badge (`Badge` component) on the right.
    - Title: `text-h3`. Example: "Thembisa Home Builders".
    - Meta row: `text-body-sm`, color `#8A8A9A`. Lucide `Calendar` icon + "24 months" • `Users` icon + "8/12 members" • `Wallet` icon + "R 1 500/mo".
    - Progress section: Label row with "Progress" (`text-body-sm`, color `#4A4A5A`) and "Month 8 of 24" (`text-caption`, color `#8A8A9A`).
    - `ProgressBar`: fill `#0B8C6B`, 33% width (8/24).
    - Bottom row: "R 12 000 contributed" (`text-body-sm`, weight 600, color `#0B8C6B`) + "R 36 000 goal" (`text-body-sm`, color `#8A8A9A`).
  - **Mock data** (3 cards):
    1. Thembisa Home Builders — Buy a home — 24 months — R 1 500/mo — Moderate — 8/12 members — Month 8/24 — R 12 000 / R 36 000.
    2. Luthuli Street Entrepreneurs — Start a business — 36 months — R 2 000/mo — Aggressive — 5/10 members — Month 14/36 — R 28 000 / R 72 000.
    3. Maboneng Education Fund — Education — 12 months — R 800/mo — Conservative — 10/10 members — Month 5/12 — R 4 000 / R 9 600.
- **Empty state**: If no stokvels, show centered illustration (Lucide `Users` at 48px in soft circle) + "You haven't joined any stokvels yet" (`text-h3`) + "Browse or create one to get started" (`text-body-sm`) + "Browse stokvels" button (primary).

---

### 4. Recent Activity Feed (`ActivityFeed`)
- **Header**: H2 "Recent activity" (`text-h2`). Margin-top 3rem.
- **Layout**: Single column list, max-width 100%, gap 0.5rem between items.
- **Activity items** (`ActivityItem`):
  - Background: white, border radius 12px, padding 1rem, border `1px solid #E2E4E8`.
  - Layout: flex row. Left: icon (32px, inside 40px circle with soft bg). Middle: text. Right: timestamp.
  - Icon types:
    - `Wallet` (green bg) — contribution made.
    - `UserPlus` (amber bg) — new member joined.
    - `TrendingUp` (green bg) — ETF allocation update / growth.
    - `Bell` (gray bg) — system notification.
    - `CheckCircle` (green bg) — goal milestone reached.
  - Text: `text-body-sm`, color `#1A1A2E`. Example: "You contributed R 1 500 to Thembisa Home Builders".
  - Subtext (if any): `text-caption`, color `#8A8A9A`. Example: "Payment via FNB •••• 4242".
  - Timestamp: `text-caption`, color `#8A8A9A`, right-aligned. Example: "2 hours ago".
- **Mock data** (5 items):
  1. "You contributed R 1 500 to Thembisa Home Builders" — "Payment via FNB •••• 4242" — 2 hours ago — `Wallet` icon.
  2. "Sizwe K. joined Luthuli Street Entrepreneurs" — "5 of 10 spots filled" — 5 hours ago — `UserPlus` icon.
  3. "Maboneng Education Fund reached 50% of its goal" — "R 4 800 of R 9 600" — 1 day ago — `CheckCircle` icon.
  4. "Your ETF allocation was updated" — "Moderate profile rebalanced" — 2 days ago — `TrendingUp` icon.
  5. "Reminder: Your next contribution is due on 1 March" — "3 stokvels" — 3 days ago — `Bell` icon.
- **View more**: Bottom of list, "View all activity" link (ghost button, small). Links to `/settings` (mock) or expands inline.
- **Empty state**: "No recent activity" with `Bell` icon and "Check back after making your first contribution."

---

## Responsive Behavior Summary

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Stats Cards | 1 column | 2 columns | 3 columns |
| Quick Actions | Stacked, full width | Stacked | Horizontal row |
| My Stokvels | Vertical list | 2 columns | 2 columns |
| Activity Feed | Full width | Full width | Full width (could be sidebar) |

---

## Interactions & State Changes
- **StatCard hover**: Subtle shadow increase. No transform (they are not clickable links).
- **StokvelListCard hover**: `translateY(-2px)` + shadow, cursor pointer. Click navigates to `/stokvels/[id]`.
- **ActivityItem**: No hover transform (not a card). If clickable, bg `rgba(11,140,107,0.03)` on hover.
- **Quick actions**: Primary and accent buttons have standard hover/active states. Invite button opens modal with simulated copy-to-clipboard.
- **Pull-to-refresh (mobile)**: Optional. On pull, show spinner and refresh activity feed (mock).
- **Skeleton loading**: On initial mount, show `Skeleton` rectangles for stat cards (3 rectangles), stokvel list (2 cards), and activity list (3 items). Replace with real data after 0.8s simulated delay.
