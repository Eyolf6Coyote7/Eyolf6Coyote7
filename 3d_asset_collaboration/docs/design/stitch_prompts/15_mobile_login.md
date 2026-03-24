# Screen: Mobile Login

> Route: `/auth` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A full-screen mobile login page optimized for iPhone 14 (390x844px). Light theme with indigo primary.

**Status bar** (top, 47px, system default): Time, signal, battery — standard iOS status bar in dark text on white.

**Screen background**: White (#FFFFFF) full screen.

**Content** (centered vertically, 24px horizontal padding):

1. **Logo area** (centered, 80px from top of safe area): 3D cube icon in indigo (#6366F1), 56x56px. Below: "AssetHub 3D" in bold 28px #111827 Inter. Below: "Manage your 3D assets on the go" in 15px #6B7280, centered, 8px top margin.

2. **Login form** (48px below logo area):
   - Email input: full width (342px), 50px height (meets 44px minimum touch target), border 1px #D1D5DB, border-radius 10px, #F9FAFB background. Left icon: mail (20px, #9CA3AF). Placeholder: "Email address" 16px #9CA3AF. 12px gap below.
   - Password input: same dimensions and style. Left icon: lock. Right icon: eye toggle (44x44px touch target). Placeholder: "Password".
   - "Forgot password?" link: right-aligned, 14px #6366F1, 44px touch target height (includes padding), 8px top margin.

3. **Sign In button** (16px below forgot link): Full width, 50px height, indigo (#6366F1) background, white text "Sign In" bold 16px, border-radius 10px. Active/pressed state: #4F46E5.

4. **Divider** (24px vertical margin): Horizontal line (#E5E7EB) with centered "or" text on white bg, 14px #9CA3AF.

5. **API Key button**: Full width, 50px height, white background, border 1px #D1D5DB, border-radius 10px. Key icon (20px, #6B7280) + "Sign in with API Key" 16px #374151.

6. **SSO button** (12px below): Full width, 50px height, white bg, border 1px #D1D5DB, radius 10px. Building icon + "Sign in with SSO" 16px #374151.

7. **Footer** (fixed to bottom safe area, 16px from bottom): "Don't have an account? Contact your admin" in 14px #6B7280, centered.

**Home indicator** (bottom, standard iOS home indicator bar).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px (iPhone 14) |
| Horizontal padding | 24px |
| Input height | 50px |
| Input radius | 10px |
| Input bg | #F9FAFB |
| Input border | 1px #D1D5DB |
| Button height | 50px |
| Button radius | 10px |
| Touch target minimum | 44x44px |
| Primary | #6366F1 |
| Primary pressed | #4F46E5 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Border | #D1D5DB |
| Logo icon size | 56x56px |
| Screen bg | #FFFFFF |

## States to Generate

1. **Default** — Empty form, Sign In button enabled
2. **Keyboard open** — iOS keyboard visible, content scrolls up, logo partially hidden
3. **Loading** — Sign In button shows spinner, "Signing in..." text
4. **Error** — Red border on inputs, "Invalid email or password" error text in #EF4444 below password
5. **API Key mode** — Tapping "Sign in with API Key" navigates to a separate screen with monospace input

## Style Direction

- Clean, native-feeling iOS login — follows Apple HIG patterns
- Large touch targets (50px inputs, 44px minimum tap zones) for comfortable mobile use
- Logo is prominent but not overwhelming — the form is the focus
- Indigo primary button stands out on the white background
- No 3D-specific decoration on mobile login — keep it fast-loading and simple
- Alternative login methods (API Key, SSO) are secondary but accessible
- Vertical rhythm uses generous spacing for a non-cramped feel

## Acceptance Criteria

- [ ] iPhone 14 frame: 390x844px
- [ ] Logo: 3D cube icon + app name + subtitle
- [ ] Email input: 50px height, mail icon, 10px radius
- [ ] Password input: 50px height, lock icon, eye toggle
- [ ] "Forgot password?" link right-aligned
- [ ] Sign In button: full width, indigo, 50px height
- [ ] "or" divider
- [ ] API Key and SSO alternative buttons
- [ ] Footer text at bottom
- [ ] All touch targets >= 44x44px
