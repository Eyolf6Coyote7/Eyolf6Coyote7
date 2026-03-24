# Screen: Mobile Profile

> Route: `/profile` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

The profile/settings screen using iOS Settings grouped-list pattern. iPhone 14 frame (390x844px). Light theme.

**Status bar** (47px, iOS default).

**Navigation bar** (44px height, white bg, border-bottom 1px #E5E7EB):
- Center: "Profile" bold 17px #111827.

**Content** (scrollable, #F2F2F7 background — iOS Settings gray):

1. **User profile card** (16px horizontal margin, 16px top margin, white bg, 12px radius):
   - 80px height, 16px padding. Left: Avatar circle (56x56px, indigo #6366F1 bg, white initials "MW" bold 22px). Right content (12px left margin):
     - "Maya Watanabe" bold 17px #111827.
     - "maya@company.com" 15px #6B7280.
     - "3D Artist · Nike" 14px #9CA3AF.
   - Chevron right (16px, #D1D5DB), right edge, vertically centered. Entire card tappable (navigates to edit profile).

2. **Account section** (16px horizontal margin, 24px top margin):
   - Section header: "ACCOUNT" 13px #6B7280, 8px left padding, 8px bottom margin.
   - Grouped list (white bg, 12px radius, overflow hidden):
     - Row: Person icon (20px, #6B7280) + "Edit Profile" 15px #374151 | chevron right. 48px height, 16px horizontal padding, divider 1px #E5E7EB (inset left 52px).
     - Row: Key icon + "API Keys" 15px #374151 + count badge "3" (13px #9CA3AF, bg #F3F4F6, radius 10px, padding 0 8px) | chevron right. 48px height.
     - Row: Building icon + "Brand: Nike" 15px #374151 | chevron right. 48px height.

3. **Notifications section** (16px horizontal margin, 24px top margin):
   - Section header: "NOTIFICATIONS" 13px #6B7280.
   - Grouped list (white bg, 12px radius):
     - Row: Bell icon + "Push Notifications" 15px #374151 | toggle switch (51x31px, ON = #6366F1). 48px height.
     - Row: Mail icon + "Email Notifications" 15px #374151 | toggle switch (ON = #6366F1). 48px height.
     - Row: Alert-triangle icon + "IoT Alerts" 15px #374151 | toggle switch (ON = #10B981 green). 48px height.
     - Row: Chart icon + "Weekly Digest" 15px #374151 | toggle switch (OFF = #D1D5DB). 48px height.

4. **Preferences section** (16px horizontal margin, 24px top margin):
   - Section header: "PREFERENCES" 13px #6B7280.
   - Grouped list (white bg, 12px radius):
     - Row: Globe icon + "Language" 15px #374151 | "English" 15px #9CA3AF + chevron right. 48px height.
     - Row: Clock icon + "Time Zone" 15px #374151 | "UTC-8 Pacific" 15px #9CA3AF + chevron right. 48px height.
     - Row: Moon icon + "Appearance" 15px #374151 | "System" 15px #9CA3AF + chevron right. 48px height.

5. **Support section** (16px horizontal margin, 24px top margin):
   - Section header: "SUPPORT" 13px #6B7280.
   - Grouped list (white bg, 12px radius):
     - Row: Help-circle icon + "Help Center" 15px #374151 | chevron right + external link icon. 48px height.
     - Row: Message icon + "Contact Support" 15px #374151 | chevron right. 48px height.
     - Row: Info icon + "About" 15px #374151 | "v1.2.0" 15px #9CA3AF + chevron right. 48px height.

6. **Logout button** (16px horizontal margin, 32px top margin):
   - Grouped list style (white bg, 12px radius, single row):
     - Row: "Log Out" centered 15px #EF4444 (red text). 48px height. Entire row tappable.

7. **Footer** (centered, 16px top margin, 24px bottom margin):
   - "AssetHub 3D v1.2.0" 12px #9CA3AF.
   - "Build 2026.03.20" 12px #D1D5DB.

**Tab bar** (bottom, 49px + 34px home indicator): 4 tabs — Assets, Search, Notifications, Profile (active, #6366F1, person icon filled).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Settings bg | #F2F2F7 |
| Group bg | #FFFFFF |
| Group radius | 12px |
| Row height | 48px |
| Row padding | 16px horizontal |
| Divider inset | 52px from left |
| Icon size | 20px |
| Icon color | #6B7280 |
| Avatar size | 56x56px |
| Toggle size | 51x31px (iOS standard) |
| Toggle on | #6366F1 |
| Toggle on (alerts) | #10B981 |
| Toggle off | #D1D5DB |
| Section header | 13px #6B7280 |
| Logout text | #EF4444 |
| Chevron | 16px #D1D5DB |
| Primary | #6366F1 |
| Text primary | #111827 |
| Text secondary | #374151 |
| Text muted | #9CA3AF |
| Touch target min | 44x44px |

## States to Generate

1. **Default** — All sections visible, toggles in mixed states, scrolled to top
2. **Scrolled** — Content scrolled partway, profile card partially hidden
3. **Logout confirmation** — iOS action sheet from bottom: "Log Out" (red, destructive) + "Cancel" — with dimmed overlay background
4. **API Keys detail** — Sub-screen (push navigation): list of API keys with masked values, "Generate New Key" button

## Style Direction

- Pure iOS Settings pattern — users immediately know how to navigate
- Grouped lists with rounded corners and inset dividers
- #F2F2F7 background is the exact iOS Settings gray
- Toggle switches follow iOS sizing (51x31px) and behavior
- Section headers are uppercase, small, gray — iOS convention
- Logout is isolated in its own group with red text — destructive action pattern
- Icons in each row provide scannable visual anchors
- Chevrons indicate navigation, toggles indicate in-place settings
- No custom UI patterns — maximum familiarity on mobile

## Acceptance Criteria

- [ ] iPhone 14 frame: 390x844px
- [ ] #F2F2F7 iOS Settings background
- [ ] User profile card: avatar, name, email, role
- [ ] Account section: Edit Profile, API Keys (with count badge), Brand
- [ ] Notifications section: 4 toggles (Push, Email, IoT Alerts, Weekly Digest)
- [ ] Preferences section: Language, Time Zone, Appearance
- [ ] Support section: Help Center, Contact Support, About (with version)
- [ ] Logout button: red text, isolated group
- [ ] Version footer at bottom
- [ ] iOS grouped list style with 12px radius
- [ ] Inset dividers (52px from left)
- [ ] Tab bar: Profile tab active
- [ ] All rows 48px height (>= 44px touch target)
