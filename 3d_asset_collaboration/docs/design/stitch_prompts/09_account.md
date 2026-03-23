# Screen: Account Settings

> Route: `/settings` | Platform: Web | Figma Page: Screens — Account

## Stitch Prompt

The user account settings page with profile management, API keys, and notification preferences. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Logo + "AssetHub 3D".
- Center: Search bar.
- Right: Notification bell, user avatar.

**Page layout** — Left sidebar navigation + main content area:

**Settings sidebar** (240px wide, white bg, border-right 1px #E5E7EB, 16px padding):
- "Account" heading bold 16px #111827.
- Nav items (same style as Brand Settings):
  - "Profile" (active — #EEF2FF bg, #6366F1 text)
  - "API Keys" (#374151)
  - "Notifications" (#374151)
  - "Security" (#374151)
- Icons: user, key, bell, shield.

**Main content** (right of sidebar, 32px padding, max-width 800px):

**Section: Profile**:
- Heading: "Profile" bold 24px #111827 + "Manage your personal information" 14px #6B7280.
- Avatar area: Large circle (96px) with user initials "MW" on indigo background. "Change avatar" link below in #6366F1.
- Form (24px top margin, 16px gap between fields):
  - "Full Name" label + input "Maya Watanabe" (full width, 44px, radius 8px).
  - "Email" label + input "maya@company.com" (full width, 44px, grayed out #F9FAFB bg, disabled) + "Managed by SSO" note in 12px #9CA3AF.
  - "Job Title" label + input "3D Artist" (full width, 44px).
  - "Time Zone" label + dropdown "UTC-8 (Pacific Time)" (full width, 44px, radius 8px).
- "Save Profile" button (indigo bg, white text, radius 8px, 40px height).

**Section: API Keys**:
- Heading: "API Keys" bold 24px #111827 + "Manage machine-to-machine authentication keys" 14px #6B7280.
- "Generate New Key" button (indigo bg, white text, plus icon, radius 8px, 40px height, right-aligned).
- Keys table (white card, radius 12px, shadow):
  - Columns: Name, Key (masked), Created, Last Used, Actions.
  - 3 rows:
    - "Unity Client" | "sk-xxxx...x4f2" (monospace 14px) | "2026-02-01" | "2 hours ago" | "Revoke" (#EF4444)
    - "CI/CD Pipeline" | "sk-xxxx...x8a1" | "2026-03-01" | "5 min ago" | "Revoke"
    - "Dev Testing" | "sk-xxxx...x3b7" | "2026-03-15" | "Never" (#9CA3AF italic) | "Revoke"
  - Table row height 48px, alternating bg.
- Warning banner below table: light yellow (#FEF3C7) bg, radius 8px, padding 12px. Warning icon (#F59E0B) + "API keys grant full access to your account. Keep them secret." in 14px #374151.

**Section: Notifications**:
- Heading: "Notifications" bold 24px #111827 + "Choose what you want to be notified about" 14px #6B7280.
- Notification categories (each is a row, 56px height, border-bottom 1px #E5E7EB):
  - "Asset uploaded to your brand" — toggle switch (right-aligned, on = indigo #6366F1) — ON
  - "New version of an asset you follow" — toggle ON
  - "IoT alert triggered (critical)" — toggle ON
  - "IoT alert triggered (warning)" — toggle OFF (gray #D1D5DB)
  - "Someone shares an asset with you" — toggle ON
  - "Weekly digest of brand activity" — toggle OFF
- Each row: description (14px #374151) on left, toggle on right. Some have a sub-label in 12px #9CA3AF (e.g., "Email + Push" or "Push only").

## Design Tokens

| Token | Value |
|-------|-------|
| Settings sidebar width | 240px |
| Content max-width | 800px |
| Avatar size | 96px |
| Input height | 44px |
| Input radius | 8px |
| Table card radius | 12px |
| Table card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Table row height | 48px |
| Toggle size | 48x24px |
| Toggle on | #6366F1 |
| Toggle off | #D1D5DB |
| Warning bg | #FEF3C7 |
| Warning icon | #F59E0B |
| Primary | #6366F1 |
| Danger | #EF4444 |
| Notification row height | 56px |

## States to Generate

1. **Default — Profile** — Form with filled fields, save button
2. **API Keys** — Table with 3 keys, generate button, warning banner
3. **Notifications** — Toggle list with mixed on/off states
4. **New API key generated** — Modal overlay showing the full key "sk-abcdef123456..." in monospace with "Copy" button and warning "This key will only be shown once"
5. **Revoke confirmation** — Dialog: "Revoke 'Unity Client' API key? Any applications using this key will stop working." with Cancel and "Revoke" (red) buttons

## Style Direction

- Standard SaaS account settings — familiar patterns users already know
- API key management is prominent because M2M auth is a core feature of this platform
- Notification toggles are scannable — each category on its own row
- Warning banner for API keys adds appropriate caution without being alarming
- Monospace font for API key display reinforces the technical nature
- Clean, functional, no-nonsense admin interface

## Acceptance Criteria

- [ ] Settings sidebar: Profile, API Keys, Notifications, Security nav items
- [ ] Profile section: large avatar, name, email (disabled/SSO), job title, timezone
- [ ] API Keys section: table with masked keys, create and revoke actions
- [ ] API key warning banner (yellow background)
- [ ] Notifications section: toggle switches for each notification category
- [ ] Toggle states: indigo for on, gray for off
- [ ] Save button on profile section
- [ ] Monospace font for API key display
