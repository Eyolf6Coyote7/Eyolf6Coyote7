# Screen: Login

> Route: `/auth` | Platform: Web | Figma Page: Screens — Auth

## Stitch Prompt

A clean, modern login page for a 3D asset management platform. Light theme, desktop 1440x900.

**Layout**: Centered card (480px wide, white background, border-radius 12px, shadow 0 8px 24px rgba(0,0,0,0.12)) on a very light gray (#F9FAFB) background. Subtle geometric pattern in the background — faint wireframe 3D shapes (cube, sphere outlines) in #E5E7EB at 10% opacity to hint at the 3D nature of the product.

**Card content** (top to bottom, 40px padding):

1. **Logo area** (centered): A stylized 3D cube icon in indigo (#6366F1), 48x48px, followed by the app name "AssetHub 3D" in bold 24px Inter, color #111827. Below it, a subtitle "Manage, preview, and collaborate on 3D assets" in 14px regular, #6B7280.

2. **Tab switcher** (centered, 320px wide, 40px height): Two tabs — "Email Login" (active, indigo text with bottom border 2px #6366F1) and "API Key" (inactive, #6B7280 text). The tabs are separated by a thin bottom border #E5E7EB.

3. **Email Login form** (visible when Email tab active):
   - Email input: full width, 44px height, border 1px #D1D5DB, border-radius 8px, placeholder "you@company.com", left icon: mail icon in #9CA3AF.
   - Password input: full width, 44px height, same style, placeholder "Password", left icon: lock icon, right icon: eye toggle.
   - "Remember me" checkbox (left) + "Forgot password?" link (right, indigo #6366F1, 14px) on the same row.
   - Sign In button: full width, 44px height, indigo (#6366F1) background, white text "Sign In", bold 14px, border-radius 8px. Hover state: #4F46E5.

4. **API Key form** (visible when API tab active):
   - API Key input: full width, 44px height, monospace font, placeholder "sk-xxxx-xxxx-xxxx", left icon: key icon in #9CA3AF.
   - Label below input: "For machine-to-machine authentication. Generate keys in Account Settings." in 12px #9CA3AF.
   - Connect button: full width, 44px height, indigo background, white text "Connect", border-radius 8px.

5. **Divider**: "or" text centered on a horizontal line (#E5E7EB), 14px #9CA3AF, 24px vertical margin.

6. **SSO button**: full width, 44px height, white background, border 1px #D1D5DB, border-radius 8px. Text "Sign in with SSO" in #374151, left icon: building/organization icon.

7. **Footer text**: "Don't have an account? Contact your admin" in 14px #6B7280, centered, 24px top margin.

## Design Tokens

| Token | Value |
|-------|-------|
| Page bg | #F9FAFB |
| Card bg | #FFFFFF |
| Card width | 480px |
| Card padding | 40px |
| Card radius | 12px |
| Card shadow | 0 8px 24px rgba(0,0,0,0.12) |
| Primary | #6366F1 |
| Primary hover | #4F46E5 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Border | #D1D5DB |
| Input height | 44px |
| Input radius | 8px |
| Button height | 44px |
| Button radius | 8px |
| Font | Inter, Helvetica Neue, Arial |

## States to Generate

1. **Default — Email tab** — Email login form visible, empty fields, Sign In button enabled
2. **Default — API Key tab** — API Key input visible with monospace placeholder
3. **Loading** — Sign In button shows spinner, inputs disabled, button text "Signing in..."
4. **Error** — Red border on email/password input, error message "Invalid email or password" in 14px #EF4444 below the password field
5. **API Key error** — Red border on API key input, "Invalid API key" error text

## Style Direction

- Enterprise SaaS login — clean, trustworthy, professional
- The subtle 3D wireframe background pattern differentiates this from generic login pages
- Indigo primary color feels modern and tech-forward without being flashy
- Tab switcher between Email and API Key supports both human and machine authentication
- Minimal decoration — the focus is on getting the user in quickly

## Acceptance Criteria

- [ ] Centered login card with logo, title, subtitle
- [ ] Tab switcher: Email Login / API Key
- [ ] Email form: email input, password input (with show/hide), remember me, forgot password
- [ ] API Key form: monospace input, helper text, connect button
- [ ] SSO button with organization icon
- [ ] Primary button in indigo (#6366F1)
- [ ] All inputs 44px height with 8px radius
- [ ] Subtle 3D wireframe background pattern
- [ ] Footer with "Contact your admin" text
