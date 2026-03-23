# Screen: Mobile Splash

> Route: — (app launch) | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile app splash/loading screen. iPhone 14 frame (390x844px). This is the first screen users see when opening the app.

**Full screen, centered content**: Solid white background. In the exact center of the screen, the app logo — a stylized whiteboard icon (a rounded rectangle with a small pen/cursor on top-right corner) in blue (#2563EB), 64px size. Below the icon (16px gap), the app name "Whiteboard AI" in bold 24px Inter font, dark gray (#111827). Below the name (8px gap), a tagline "Think together, in real time" in 14px regular Inter, medium gray (#6B7280).

**Loading indicator**: 40px below the tagline, a subtle horizontal progress bar (120px wide, 3px height, rounded). The background track is light gray (#E5E7EB), and a blue (#2563EB) animated fill moves left to right. Alternatively, show 3 small bouncing dots in blue.

**Bottom of screen** (32px from bottom, centered): Small text "by Jerry Wolf" in 12px light gray (#9CA3AF). This is the attribution/branding.

**Status bar**: Standard iOS status bar at top (time, signal, battery) — light style (dark text on white bg).

No navigation, no buttons — this is a passive loading screen that auto-transitions to Login or Home after 1-2 seconds.

Style: Minimal, clean, premium feel. The logo and name should feel centered and balanced. Lots of breathing room. White background keeps it fast and light.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Background | #FFFFFF |
| Logo size | 64px |
| Logo color | #2563EB |
| App name size | 24px bold |
| App name color | #111827 |
| Tagline size | 14px regular |
| Tagline color | #6B7280 |
| Progress bar width | 120px |
| Progress bar height | 3px |
| Progress bar track | #E5E7EB |
| Progress bar fill | #2563EB |
| Attribution color | #9CA3AF |
| Attribution size | 12px |

## States to Generate

1. **Loading** — Progress bar animating (show at ~40% fill)
2. **Loaded** — Progress bar full, about to transition (brief moment)

## Style Direction

- App splash screens should feel instant and premium
- Centered logo + name is the universal pattern
- Minimal elements — do not add feature text or onboarding here
- Loading indicator is subtle, not a large spinner

## Acceptance Criteria

- [ ] White background, content vertically centered
- [ ] App logo icon (blue, 64px)
- [ ] App name "Whiteboard AI" below logo
- [ ] Tagline text below name
- [ ] Subtle loading indicator (progress bar or dots)
- [ ] Attribution at bottom
- [ ] No buttons, no navigation — passive screen
- [ ] Feels polished and premium
