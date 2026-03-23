# Screen: Sign Up / Login

> Route: `/auth` | Platform: Web | Figma Page: Screens — Auth

## Stitch Prompt

A clean, centered authentication page for a SaaS whiteboard app. White background with a centered card (480px wide, border-radius 16px, subtle shadow).

**Card content**: App logo at top center (small, 32px icon + "Whiteboard AI" text). Below, two tabs: "Sign Up" and "Log In" — active tab has blue (#2563EB) underline.

**Sign Up tab (default view)**: Full name text input, email text input, password text input with show/hide toggle eye icon. Below inputs, a blue (#2563EB) full-width "Create Account" button. Then a divider line with "or" text in the middle. Below that, two OAuth buttons full-width: "Continue with Google" (with Google icon) and "Continue with GitHub" (with GitHub icon), both white with gray border. At the bottom, small text: "Already have an account? Log in" with "Log in" as a blue link.

**Log In tab**: Email text input, password text input with show/hide toggle. "Forgot password?" link aligned right below password field. Blue "Log In" button full-width. Same OAuth buttons below. Bottom text: "Don't have an account? Sign up".

Left side of the page (behind the card) shows a subtle, large-scale illustration of a whiteboard with abstract shapes — very light, decorative only.

Style: Inter font, inputs have 8px border-radius, light gray (#E5E7EB) borders, 16px padding inside card. Focus state: blue (#2563EB) border on inputs.

## Design Tokens

| Token | Value |
|-------|-------|
| Card width | 480px |
| Card radius | 16px |
| Card shadow | 0 8px 24px rgba(0,0,0,0.1) |
| Input radius | 8px |
| Input border | #E5E7EB |
| Input focus border | #2563EB |
| Button radius | 8px |
| Primary button bg | #2563EB |
| OAuth button bg | #FFFFFF |
| OAuth button border | #D1D5DB |

## States to Generate

1. **Sign Up** — Default empty form
2. **Log In** — Default empty form
3. **Validation error** — Red border on invalid fields, error text below
4. **Loading** — Button shows spinner, inputs disabled
5. **Mobile (< 768px)** — Card goes full-width with 16px margin

## Style Direction

- Centered card on minimal background — single focus point
- OAuth buttons are prominent (many users prefer social login)
- Background illustration is decorative, not distracting
- Form feels lightweight, not enterprise-heavy

## Acceptance Criteria

- [ ] Centered card with tabs (Sign Up / Log In)
- [ ] Name, email, password inputs with proper labels
- [ ] OAuth buttons (Google, GitHub)
- [ ] Show/hide password toggle
- [ ] Forgot password link on login
- [ ] Tab switching clearly indicated
- [ ] Validation error state visible
