# Screen: Mobile Sign Up / Login

> Route: `/auth` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A mobile authentication screen for a whiteboard app. iPhone 14 frame (390x844px). Full-screen form, no card — content fills the screen directly.

**Status bar**: Standard iOS status bar (time, signal, battery).

**Top area** (centered, 80px from top): App logo icon (32px, blue #2563EB) and "Whiteboard AI" text (20px bold) on the same line, centered.

**Tab switcher** (below logo, 24px gap): Two horizontally centered text tabs: "Sign Up" and "Log In". Active tab is bold blue (#2563EB) with a 2px blue underline. Inactive tab is gray (#6B7280). Tabs are 120px wide each, centered together.

**Sign Up form** (default view, 24px below tabs, 16px horizontal padding):
- "Full Name" label (14px semi-bold, #374151) with text input below (48px height, full width, #F9FAFB bg, 12px radius, 1px #E5E7EB border, placeholder "Enter your name")
- 12px gap
- "Email" label with text input (placeholder "you@example.com")
- 12px gap
- "Password" label with text input (placeholder "Min 8 characters"). Right side of input has an eye icon toggle for show/hide password.
- 20px gap
- Blue (#2563EB) full-width button "Create Account" (48px height, 12px radius, white bold text 16px). This is the primary CTA.
- 20px gap
- Horizontal divider: thin gray line with "or" text centered on it in small gray
- 16px gap
- "Continue with Google" button: full-width, 48px height, white bg, 1px #D1D5DB border, 12px radius, Google "G" color icon on left + text.
- 8px gap
- "Continue with GitHub" button: same style, GitHub octocat icon on left + text.
- 24px gap
- Centered small text: "Already have an account? " + "Log in" as blue link

**Log In form** (when "Log In" tab is active):
- "Email" label + input
- "Password" label + input with show/hide eye icon
- Right-aligned blue link text "Forgot password?" below password field (14px)
- Blue "Log In" full-width button
- Same divider + OAuth buttons
- Bottom text: "Don't have an account? " + "Sign up" blue link

**Keyboard consideration**: When an input is focused, the form scrolls up so the active input stays visible above the keyboard. The primary button should remain visible.

Style: Inter font, clean mobile form. Large touch-friendly inputs (48px height). Full-width buttons. No background illustration — keep it clean on mobile. White background.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Background | #FFFFFF |
| Input height | 48px |
| Input bg | #F9FAFB |
| Input radius | 12px |
| Input border | #E5E7EB |
| Input focus border | #2563EB |
| Button height | 48px |
| Button radius | 12px |
| Primary button bg | #2563EB |
| OAuth button bg | #FFFFFF |
| OAuth button border | #D1D5DB |
| Tab active color | #2563EB |
| Tab inactive color | #6B7280 |
| Horizontal padding | 16px |
| Field gap | 12px |

## States to Generate

1. **Sign Up** — Empty form, all fields blank
2. **Log In** — Empty form, email + password only
3. **Validation error** — Red (#EF4444) border on invalid fields, small red error text below field (e.g., "Email is required", "Password must be at least 8 characters")
4. **Loading** — Button text replaced with small white spinner, inputs disabled (opacity 0.5)
5. **Keyboard open** — Show form scrolled up with iOS keyboard visible at bottom, active input field above keyboard

## Style Direction

- Mobile-native full-screen form — no card wrapper (unlike web version)
- Inputs are tall (48px) for easy thumb tapping
- OAuth buttons are prominent since mobile users prefer social login
- No background illustration — screen real estate is limited on mobile
- Clean and fast, minimal friction

## Acceptance Criteria

- [ ] Logo + app name at top
- [ ] Sign Up / Log In tab switcher
- [ ] Name, Email, Password inputs (sign up) or Email, Password (log in)
- [ ] Show/hide password toggle (eye icon)
- [ ] Full-width primary CTA button
- [ ] OAuth buttons (Google, GitHub) with icons
- [ ] "Forgot password?" link on login
- [ ] Switch between sign up / log in via bottom link
- [ ] Validation error state
- [ ] Loading state with spinner
- [ ] All touch targets ≥ 44x44px
