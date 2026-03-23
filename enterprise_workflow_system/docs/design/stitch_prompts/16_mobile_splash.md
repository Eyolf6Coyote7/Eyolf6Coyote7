# Screen: Mobile Splash

> Route: — | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile splash screen for an enterprise workflow app. iPhone 14 frame (390x844px). The screen is displayed briefly while the app loads.

**Full-screen layout** (390x844px):

**Status bar** (top, 47px height, transparent over background): Standard iOS status bar with time "9:41" on the left, signal/wifi/battery icons on the right, all in white.

**Background**: Solid primary blue (#409EFF) filling the entire screen. No gradients, no patterns — clean and professional.

**Center content** (vertically and horizontally centered): The app logo — a large white icon (80x80px) representing a workflow/approval concept: a stylized checkmark inside a circular arrow (workflow cycle). Below the icon (16px gap), the app name "WorkflowOS" in 24px bold white, PingFang SC font. Below (8px gap), the tagline "Enterprise Workflow System" in 14px regular white, opacity 0.7.

**Bottom area** (40px from bottom, centered): A small white loading spinner (24px diameter, thin 2px stroke, animated rotation) or three pulsing dots (8px each, white, 4px gap between, sequential opacity animation).

**Below the spinner** (8px gap): "v1.0.0" version text in 12px white, opacity 0.5.

No other elements. The splash is minimal and brand-focused.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px (iPhone 14) |
| Background | #409EFF solid |
| Logo icon size | 80x80px |
| Logo color | #FFFFFF |
| App name size | 24px bold |
| App name color | #FFFFFF |
| Tagline size | 14px regular |
| Tagline color | rgba(255,255,255,0.7) |
| Spinner size | 24px |
| Spinner stroke | 2px white |
| Version text | 12px, rgba(255,255,255,0.5) |
| Status bar | light content (white icons) |

## States to Generate

1. **Default** — Splash screen with logo, name, spinner
2. **Loading complete** — Spinner disappears, brief fade-out transition before navigating to login or home

## Style Direction

- Minimal, brand-centric splash screen — blue background with white logo
- No imagery, illustrations, or decorative elements
- Professional and corporate — this is an enterprise tool, not a consumer app
- The spinner indicates the app is loading without being distracting
- Version number at bottom for support/debugging purposes
- Consistent with the primary blue (#409EFF) used throughout the system

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Full-screen primary blue (#409EFF) background
- [ ] White app logo icon centered (80x80px)
- [ ] App name "WorkflowOS" in white below logo
- [ ] Tagline below name at reduced opacity
- [ ] Loading spinner or pulsing dots near bottom
- [ ] Version number at very bottom
- [ ] iOS status bar with white (light) content
- [ ] No decorative elements — clean and professional
