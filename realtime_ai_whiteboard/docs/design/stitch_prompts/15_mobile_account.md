# Screen: Mobile Account Settings

> Route: `/settings` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A mobile account/profile settings screen for a whiteboard app. iPhone 14 frame (390x844px). Full-screen with iOS-style grouped settings. Accessed from the "Settings" tab in the tab bar.

**Status bar**: Standard iOS status bar.

**Navigation bar** (44px): Center has large bold title "Settings" (iOS large title style, 28px).

**Scrollable content** (grouped sections on #F3F4F6 background):

**Profile header** (white bg, full width, center-aligned, 24px vertical padding):
- Large circular avatar (72px) centered. A small blue camera icon circle (24px) overlaps the bottom-right corner of the avatar (for changing photo).
- Below avatar (8px gap): Bold name "Jerry Wolf" (18px).
- Below name (4px gap): Email "jerry@example.com" in gray 14px with a green "Verified" badge (small, inline).
- Below email (12px gap): Blue outlined button "Edit Profile" (small, 32px height, 8px radius).

**Section 1 — Account** (white bg group, section header "ACCOUNT"):
- Row 1: User icon + "Display Name" label, right side "Jerry Wolf" in gray + chevron.
- Row 2: Mail icon + "Email" label, right side "jerry@example.com" in gray + chevron.
- Row 3: Lock icon + "Password" label, right side "Change" in blue text.
- Row 4: Shield icon + "Two-Factor Auth" label, right side toggle switch (currently off).
- Each row 48px, hairline separator.

**Section 2 — Plan & Usage** (white bg group, section header "PLAN & USAGE"):
- Row 1: "Current Plan" label, right side "Free" in a rounded badge (light blue bg #EFF6FF, blue text). Chevron.
- Below row 1 (inline, 12px padding): Two mini progress bars stacked:
  - "Boards: 2 / 3" — label left, progress bar right (66% full, blue #2563EB)
  - "AI Queries: 47 / 100" — label left, progress bar right (47% full, blue)
  - Progress bars are 120px wide, 6px height, rounded.
- Row 2: Star icon + "Upgrade to Pro" in blue bold text. Chevron. This row has a light blue (#EFF6FF) background to stand out as a CTA.

**Section 3 — Team** (white bg group, section header "TEAM"):
- Row 1: Users icon + "Team Members" label, right side "3" count in gray + chevron — pushes to team management screen.
- Row 2: Link icon + "Invite Members" label, blue text + chevron.

**Section 4 — Preferences** (white bg group, section header "PREFERENCES"):
- Row 1: Bell icon + "Notifications" label + chevron.
- Row 2: Moon icon + "Dark Mode" label + toggle switch (off).
- Row 3: Hand icon + "Haptic Feedback" label + toggle switch (on, blue).

**Section 5 — About** (white bg group, section header "ABOUT"):
- Row 1: Info icon + "Version" label, right side "1.0.0" in gray. No chevron.
- Row 2: Document icon + "Terms of Service" + chevron.
- Row 3: Shield icon + "Privacy Policy" + chevron.

**Log out button** (below all sections, 32px margin top): Full-width red text button centered "Log Out" (no background, just red #EF4444 text, 48px height, inside a white bg group). Tapping shows action sheet: "Log Out" (red) + "Cancel".

**Tab bar** (bottom, 49px): Same as mobile home — "Home", "Search", "Create", "Settings" (active — blue).

Style: iOS Settings aesthetic. Grouped rows, icons on left, values + chevrons on right. Clean, native feel. Inter or SF Pro font.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Background | #F3F4F6 |
| Group bg | #FFFFFF |
| Row height | 48px |
| Row padding | 16px horizontal |
| Section header | 12px uppercase #6B7280 |
| Hairline separator | 0.5px #E5E7EB |
| Avatar size | 72px |
| Camera overlay size | 24px |
| Toggle on bg | #2563EB |
| Progress bar height | 6px |
| Progress bar width | 120px |
| Progress bar bg | #E5E7EB |
| Progress bar fill | #2563EB |
| CTA row bg | #EFF6FF |
| Logout text | #EF4444 |
| Tab bar height | 49px |
| Badge bg | #EFF6FF |
| Badge text | #2563EB |

## States to Generate

1. **Default** — All sections visible, free plan, 3 team members
2. **Upgrade CTA highlight** — "Upgrade to Pro" row has subtle pulse or stands out with blue bg
3. **Log out confirmation** — iOS action sheet: "Are you sure you want to log out?" + red "Log Out" + "Cancel"
4. **Loading** — Profile header shows skeleton avatar circle + 2 text line pulses

## Style Direction

- iOS Settings app pattern — the gold standard for mobile settings
- Profile header with avatar gives a personal touch
- Usage bars make plan limits tangible (users see how close they are)
- Upgrade CTA row is subtly highlighted but not aggressive
- Log out is at the very bottom, red text, with confirmation

## Acceptance Criteria

- [ ] Profile header: avatar (with camera icon), name, email, edit button
- [ ] Account section: name, email, password, 2FA toggle
- [ ] Plan section: current plan badge, usage progress bars, upgrade CTA
- [ ] Team section: member count, invite link
- [ ] Preferences: notifications, dark mode, haptics toggles
- [ ] About: version, terms, privacy
- [ ] Log out button (red) with confirmation
- [ ] Tab bar with Settings active
- [ ] All rows ≥ 48px, iOS grouped style
- [ ] Feels like native iOS Settings app
