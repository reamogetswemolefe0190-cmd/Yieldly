# Yieldly — Auth Pages (`/login`, `/register`)

## Routes & Purpose
- **Route**: `/login`
  - Purpose: Existing user authentication. Email + password.
- **Route**: `/register`
  - Purpose: New account creation. Name, email, password, confirm password, terms.
- **Layout**: No authenticated shell. Standalone centered layout with subtle background pattern. Both pages share the `AuthLayout` wrapper.

---

## Shared Auth Layout (`AuthLayout`)
- **Background**: `#F6F7F9` with a subtle top-left and bottom-right radial gradient using `#E2F0EC` (very light green) at 30% opacity, creating soft organic blobs. No harsh patterns.
- **Centering**: Flex column, min-height 100vh, justify-center, align-center.
- **Card container**: `max-w-narrow` (560px), centered, white background, border radius 16px, padding 2.5rem (mobile 1.5rem), shadow `0 4px 24px rgba(26,26,46,0.08)`.
- **Top of card**:
  - Logo icon (`logo-icon.svg`) centered, 48px, margin-bottom 1.5rem.
  - Wordmark below: `logo-wordmark.svg`, centered, margin-bottom 2rem.
- **Responsive**: Card has `margin: 1rem` on mobile so it doesn't touch edges; `margin: 0` on desktop.

---

## Login Page (`/login`)

### Page Title
- `text-h1`, centered, color `#1A1A2E`. Copy: "Welcome back"
- Subtitle: `text-body`, centered, color `#4A4A5A`, margin-bottom 2rem. Copy: "Log in to your Yieldly account and keep building with your stokvel."

### Form Fields (`LoginForm`)
- **Email** (`EmailField`):
  - Label: "Email address"
  - Type: email
  - Placeholder: "you@example.com"
  - Validation: required, valid email format.
  - Error: "Please enter a valid email address."
- **Password** (`PasswordField`):
  - Label: "Password"
  - Type: password
  - Placeholder: "••••••••"
  - Right side of input: eye icon (Lucide `Eye` / `EyeOff`) to toggle visibility.
  - Validation: required, min 8 characters.
  - Error: "Password must be at least 8 characters."
- **Submit button**:
  - Full width, primary button, size large.
  - Copy: "Log in"
  - Loading state: spinner + "Logging in..."
- **Forgot password link**:
  - Below password field, right-aligned.
  - `text-body-sm`, color `#0B8C6B`. Copy: "Forgot password?"
  - Click: opens mock modal (`Modal`) with message: "Password reset is simulated in this demo." + "Close" button.

### Divider
- Horizontal line with text in middle: `text-caption`, color `#8A8A9A`. Copy: "or"
- Line: `1px solid #E2E4E8`.

### Social Login (Mock)
- Two buttons side by side (stacked on mobile):
  - "Continue with Google" — secondary button, with Google "G" icon (SVG, 20px).
  - "Continue with Apple" — secondary button, with Apple icon (SVG, 20px).
- Both are non-functional mock buttons with tooltip or toast on click: "Social login is simulated in this demo."

### Footer Link
- Centered, `text-body-sm`, color `#4A4A5A`. Copy: "Don't have an account? " + "Register" link (color `#0B8C6B`, weight 600). Links to `/register`.

---

## Register Page (`/register`)

### Page Title
- `text-h1`, centered, color `#1A1A2E`. Copy: "Create your account"
- Subtitle: `text-body`, centered, color `#4A4A5A`, margin-bottom 2rem. Copy: "Start your stokvel journey in under 5 minutes."

### Form Fields (`RegisterForm`)
- **Full Name** (`TextField`):
  - Label: "Full name"
  - Placeholder: "e.g., Thabo Mokoena"
  - Validation: required, min 2 characters.
- **Email** (`EmailField`):
  - Same as login.
- **Password** (`PasswordField`):
  - Same as login, but with a strength hint below:
  - Password strength indicator: 4-segment bar below input. Colors: `#E2E4E8` (empty), `#E9C46A` (weak), `#E88D3A` (medium), `#2A9D8F` (strong), `#0B8C6B` (very strong).
  - Hint text: `text-caption`, color `#8A8A9A`. Copy: "Use at least 8 characters with a mix of letters and numbers."
- **Confirm Password** (`PasswordField`):
  - Label: "Confirm password"
  - Validation: must match password field.
  - Error: "Passwords do not match."
- **Terms Checkbox** (`Checkbox`):
  - Label: `text-body-sm`, color `#4A4A5A`. Copy: "I agree to the "Terms of Service" and "Privacy Policy" (simulated)."
  - Links: "Terms of Service" and "Privacy Policy" open mock modals with placeholder text.
  - Validation: must be checked.
  - Error: "You must agree to the terms to continue."
- **Submit button**:
  - Full width, primary button, size large.
  - Copy: "Create account"
  - Loading state: spinner + "Creating account..."

### Footer Link
- Centered, `text-body-sm`, color `#4A4A5A`. Copy: "Already have an account? " + "Log in" link (color `#0B8C6B`, weight 600). Links to `/login`.

---

## Form Validation Rules (Shared)

| Field | Rule | Error Message |
|-------|------|---------------|
| Full name | Required, min 2 chars | "Please enter your full name." |
| Email | Required, valid email | "Please enter a valid email address." |
| Password | Required, min 8 chars | "Password must be at least 8 characters." |
| Confirm password | Must match password | "Passwords do not match." |
| Terms | Must be checked | "You must agree to the terms." |

- Validation triggers `onBlur` for each field and `onSubmit` for the full form.
- Submit button is disabled until all fields are valid (or shows validation errors on attempt).
- Success: redirects to `/onboarding` (for register) or `/dashboard` (for login).
- Error toast: "Invalid email or password." (login) or "Account creation failed. Please try again." (register).

---

## Responsive Behavior
- Mobile: card has `margin: 1rem`, padding 1.5rem. Form fields stack vertically. Social login buttons stack vertically.
- Desktop: card is centered, max-width 560px, padding 2.5rem. Social login buttons are side by side.

---

## Interactions & State Changes
- **Input focus**: border color `#0B8C6B`, shadow ring appears (see `Input` in `design.md`).
- **Password toggle**: Eye icon switches to EyeOff; input type toggles between password and text. Transition opacity 0.15s on icon swap.
- **Submit loading**: Button becomes disabled, opacity 0.7, spinner icon rotates (CSS `animation: spin 1s linear infinite`).
- **Success redirect**: Brief full-screen loader (logo pulse + "Redirecting...") for 0.5s before route change.
- **Error states**: Error text appears below field with `0.2s` fade-in. Border turns `#E76F51`.
