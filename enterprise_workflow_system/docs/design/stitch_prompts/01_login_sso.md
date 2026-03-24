# Screen: Login (SSO)

> Route: `/auth` | Platform: Web | Figma Page: Screens — Auth

## Stitch Prompt

Desktop web page, 1440px width.

A professional enterprise SSO login screen for a workflow management system. The viewport is 1440x900px. The entire background is a solid light gray (#F5F7FA) with no decorative illustrations.

**Center card** (440px wide, auto height, centered both horizontally and vertically, white #FFFFFF background, border-radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 40px):

At the top of the card, the company logo placeholder — a 48x48px square icon in primary blue (#409EFF) with the text "WorkflowOS" next to it in 20px bold PingFang SC, color #303133. Below that, 8px gap, a subtitle "Enterprise Workflow System" in 14px regular, color #909399.

Below the logo area (24px gap), a horizontal divider line (1px, #EBEEF5).

Below the divider (24px gap), the heading "Sign In" in 18px bold, color #303133, left-aligned.

Below (16px gap), a full-width text input field (height 40px, border 1px #DCDFE6, border-radius 4px, placeholder text "Email address" in #C0C4CC, padding-left 12px). A small email icon (16px, #909399) sits inside the input on the left.

Below (12px gap), a second full-width text input for password (same style, placeholder "Password", lock icon on left, eye-toggle icon on right).

Below (16px gap), a full-width primary button "Sign in with SSO" (height 40px, background #409EFF, text white 14px bold, border-radius 4px, centered text). A small Keycloak shield icon (white, 16px) sits to the left of the text.

Below the button (12px gap), a text link "Forgot password?" in 14px, color #409EFF, right-aligned.

Below (24px gap), a horizontal rule with centered text "or" in 12px #909399 on a white background overlapping the line.

Below (24px gap), two social/corporate SSO buttons side by side (each 50% width minus 6px gap): "Microsoft SSO" button (white bg, 1px border #DCDFE6, height 40px, border-radius 4px, Microsoft icon placeholder on left) and "Google SSO" button (same style, Google icon placeholder on left). Both have 14px #606266 text.

**Second state — 2FA step** (same card replaces the login form contents):
The card now shows "Two-Factor Authentication" as heading (18px bold). Below, a subtitle "Enter the 6-digit code from your authenticator app" in 14px, color #606266. Below (24px gap), six individual square input boxes in a row (each 48x48px, border 1px #DCDFE6, border-radius 4px, font-size 24px bold, centered text, color #303133). The first three boxes have digits "4", "7", "2" filled in; the fourth box has a blinking cursor (active state, border color #409EFF); the fifth and sixth are empty. Below (16px gap), a text link "Resend code" in #409EFF, and next to it "Didn't receive it? Try another method" in #909399. Below (24px gap), a full-width button "Verify" (same primary style as the SSO button).

**Footer** (bottom of page, 32px from bottom): centered text "© 2025 WorkflowOS — Privacy Policy · Terms of Service" in 12px, color #C0C4CC.

## Design Tokens

| Token | Value |
|-------|-------|
| Page bg | #F5F7FA |
| Card bg | #FFFFFF |
| Card width | 440px |
| Card padding | 40px |
| Card radius | 8px |
| Card shadow | 0 2px 12px rgba(0,0,0,0.1) |
| Primary color | #409EFF |
| Text primary | #303133 |
| Text regular | #606266 |
| Text secondary | #909399 |
| Text placeholder | #C0C4CC |
| Border color | #DCDFE6 |
| Divider color | #EBEEF5 |
| Input height | 40px |
| Button height | 40px |
| Button radius | 4px |
| 2FA box size | 48x48px |
| Font family | PingFang SC, Helvetica Neue, Microsoft YaHei, Arial, sans-serif |

## States to Generate

1. **Default — Email/password form** — SSO login card with email, password, SSO button, social login options
2. **2FA step** — Same card, 6-digit code entry with partially filled boxes
3. **Loading** — SSO button shows a white spinner, disabled state, inputs disabled
4. **Error** — Red (#F56C6C) text below email input: "Invalid credentials. Please try again." Input borders turn red.
5. **2FA Error** — Red text below code boxes: "Invalid code. 2 attempts remaining."

## Style Direction

- Clean, corporate, trustworthy — this is the first impression of an enterprise system
- Element Plus form components and spacing conventions
- No background imagery or gradients — solid colors only, professional tone
- The Keycloak SSO integration should feel seamless, not like a redirect
- 2FA step should feel like a continuation of the same flow, not a separate page
- Neutral palette with blue accent — conveys security and reliability

## Acceptance Criteria

- [ ] Login card centered on light gray background
- [ ] Logo and product name at top of card
- [ ] Email and password inputs with icons
- [ ] Primary "Sign in with SSO" button with Keycloak icon
- [ ] Forgot password link
- [ ] Social/corporate SSO buttons (Microsoft, Google)
- [ ] 2FA state: six individual digit boxes with active state styling
- [ ] Footer with copyright and legal links
- [ ] All inputs have visible labels or clear placeholder text
- [ ] Button has hover state (darker blue)
