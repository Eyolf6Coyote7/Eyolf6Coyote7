# Screen: Mobile Login

> Route: `/auth` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A full-screen mobile login screen for an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content — black icons on white/light background).

**Background**: White (#FFFFFF) full screen.

**Top section** (centered, starting 100px from top): App logo — 56x56px blue (#409EFF) icon (same workflow checkmark icon as splash). Below (12px gap), "WorkflowOS" in 20px bold #303133. Below (4px gap), "Sign in to continue" in 14px #909399.

**Login form** (below top section, 40px gap, padding 24px left and right):

"Email" input field (full width, 48px height — larger than web for touch targets, border 1px #DCDFE6, border-radius 8px, padding-left 44px, placeholder "Email address" in #C0C4CC). A mail icon (20px, #909399) is positioned inside the input on the left (12px from left edge).

Below (12px gap), "Password" input (same style, 48px height, lock icon on left, eye-toggle icon on right, placeholder "Password").

Below (16px gap), "Sign in with SSO" primary button (full width, 48px height, bg #409EFF, white text 16px bold, border-radius 8px, centered). Keycloak shield icon (white, 18px) to the left of text.

Below (12px gap), "Forgot password?" text link centered, 14px #409EFF.

**Divider** (below, 24px gap): horizontal line with "or" text centered (same pattern as web but mobile-sized).

**Social SSO buttons** (below divider, 24px gap, stacked vertically, 12px gap between): "Continue with Microsoft" (full width, 48px height, white bg, 1px border #DCDFE6, radius 8px, Microsoft icon + 14px #606266 text, centered). "Continue with Google" (same style, Google icon).

**2FA screen** (separate state, same frame): Status bar at top. Back arrow (44x44px touch target) in top-left, 16px from edges. Title "Two-Factor Authentication" in 18px bold #303133, centered. Below (8px gap), "Enter the 6-digit code" in 14px #909399, centered. Below (32px gap), six code input boxes in a row (each 44x44px, border 1px #DCDFE6, radius 8px, font-size 24px bold centered, min 8px gap between boxes). First three filled: "4", "7", "2". Fourth active (border #409EFF). Below (24px gap), "Verify" button (full width, 48px height, primary blue, 16px bold white). Below (12px gap), "Resend code" text link in #409EFF, centered. Below (8px gap), "Try another method" text link in #909399.

**Bottom** (32px from bottom, centered): "© 2025 WorkflowOS" in 12px #C0C4CC.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Logo size | 56x56px |
| Input height | 48px (touch-friendly) |
| Input radius | 8px |
| Input icon size | 20px |
| Button height | 48px |
| Button radius | 8px |
| Button text size | 16px bold |
| Touch target minimum | 44x44px |
| Form padding | 24px horizontal |
| 2FA box size | 44x44px |
| 2FA box radius | 8px |
| 2FA font size | 24px bold |
| Back arrow touch area | 44x44px |
| Primary | #409EFF |
| Text primary | #303133 |
| Text secondary | #909399 |
| Placeholder | #C0C4CC |
| Border | #DCDFE6 |

## States to Generate

1. **Default — Login form** — Email and password inputs, SSO button, social login
2. **2FA step** — Back arrow, 6-digit code boxes, verify button
3. **Loading** — SSO button shows white spinner, inputs disabled
4. **Error** — Red text below email: "Invalid credentials" (#F56C6C), input borders red
5. **Keyboard visible** — Virtual keyboard pushed up, form scrolls to show active input above keyboard

## Style Direction

- Mobile-first: all touch targets at least 44x44px, inputs 48px tall
- Stacked layout — nothing side-by-side on mobile
- Clean white background, no decorative elements
- Input border-radius is 8px (slightly rounder than web 4px for mobile feel)
- Button text is 16px (larger than web 14px) for readability on mobile
- 2FA boxes are generously spaced for thumb input
- Back navigation on 2FA is a clear arrow, not gesture-only
- Professional and enterprise — no playful elements

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] App logo and name at top
- [ ] Email and password inputs with icons (48px height)
- [ ] "Sign in with SSO" primary button (48px height)
- [ ] Forgot password link
- [ ] Social login buttons stacked vertically
- [ ] 2FA state with 6 code boxes (44x44px each)
- [ ] Back arrow on 2FA screen (44x44px touch target)
- [ ] All touch targets at least 44x44px
- [ ] Footer copyright text
