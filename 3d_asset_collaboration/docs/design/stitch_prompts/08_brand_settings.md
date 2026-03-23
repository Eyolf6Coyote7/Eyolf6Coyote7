# Screen: Brand Settings

> Route: `/admin/brand` | Platform: Web | Figma Page: Screens — Brand Admin

## Stitch Prompt

The brand administration settings page with ACL (Access Control List) editor, member management, and shared links. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Logo + "AssetHub 3D".
- Center: Search bar (same as library).
- Right: Brand switcher "Nike" dropdown, notification bell, user avatar.

**Page layout** — Left sidebar navigation + main content area:

**Settings sidebar** (240px wide, white bg, border-right 1px #E5E7EB, 16px padding):
- "Settings" heading bold 16px #111827, 16px bottom margin.
- Nav items (vertical list, 40px height each, 4px gap, radius 8px, 12px horizontal padding):
  - "Brand Profile" (active — #EEF2FF background, #6366F1 text, bold)
  - "Members" (#374151 text)
  - "Shared Links" (#374151 text)
  - "Integrations" (#374151 text)
  - "Danger Zone" (#EF4444 text)
- Each item has a 20px icon left of text (building, users, link, puzzle, alert-triangle).

**Main content** (right of sidebar, fills remaining space, 32px padding, max-width 800px):

**Section: Brand Profile** (visible when "Brand Profile" nav item active):
- Heading: "Brand Profile" bold 24px #111827 + "Manage your brand identity and settings" 14px #6B7280.
- Form (24px top margin):
  - "Brand Name" label (bold 12px #6B7280) + text input "Nike" (full width, 44px, radius 8px).
  - "Brand Logo" label + logo upload area: 80x80px square with current logo (or placeholder icon), "Change logo" link in #6366F1 below.
  - "Description" label + textarea (100% width, 80px height, radius 8px).
  - "Save Changes" button (indigo #6366F1 bg, white text, radius 8px, 40px height).

**Section: Members** (visible when "Members" nav item active):
- Heading: "Members" bold 24px #111827 + "Manage who has access to Nike assets" 14px #6B7280.
- "Invite Member" button (indigo bg, white text, radius 8px, 40px height, plus icon, right-aligned).
- Member table (24px top margin, white bg, radius 12px, shadow 0 2px 8px rgba(0,0,0,0.08)):
  - Columns: User (avatar + name + email), Role, Added, Actions.
  - 5 rows:
    - Avatar (32px circle) + "Maya Chen" bold 14px + "maya@company.com" 12px #9CA3AF | Role dropdown: "Owner" (disabled, gray) | "2026-01-15" | — (no actions for owner)
    - "Jake Liu" | "Editor" dropdown (active, border #D1D5DB, radius 8px) | "2026-02-01" | "Remove" link (#EF4444)
    - "Sarah Park" | "Viewer" dropdown | "2026-03-10" | "Remove" link
    - "Alex Kim" | "Editor" dropdown | "2026-03-12" | "Remove" link
    - "Pending: tom@agency.com" (italic, #9CA3AF) | "Viewer" | "2026-03-20" | "Resend" (#6366F1) + "Cancel" (#EF4444)
  - Table: 48px row height, alternating #F9FAFB / white.
  - Role options in dropdown: Owner, Editor, Viewer.

**Section: Shared Links**:
- Heading: "Shared Links" bold 24px + subtext.
- "Create Link" button (indigo, right-aligned).
- Links table: columns — Link Name, Asset/Folder, Permissions, Expires, Status, Actions.
  - "Campaign Q3 Assets" | "/ campaign-q3" folder icon | "View only" | "2026-06-30" | "Active" (green pill) | "Copy" + "Revoke"
  - "Partner Review" | "Air Max 2026" asset icon | "View + Download" | "2026-04-15" | "Active" (green pill) | "Copy" + "Revoke"
  - "Old Share" | "/ legacy" | "View only" | "2026-01-01" | "Expired" (gray pill) | "Delete"

## Design Tokens

| Token | Value |
|-------|-------|
| Settings sidebar width | 240px |
| Nav item height | 40px |
| Nav active bg | #EEF2FF |
| Nav active text | #6366F1 |
| Content max-width | 800px |
| Content padding | 32px |
| Table row height | 48px |
| Table alt row bg | #F9FAFB |
| Table card radius | 12px |
| Table card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Input height | 44px |
| Input radius | 8px |
| Primary | #6366F1 |
| Danger | #EF4444 |
| Success pill | #10B981 |
| Avatar size | 32px |

## States to Generate

1. **Default — Members** — Member table with 5 rows, invite button visible
2. **Brand Profile** — Form with editable fields, save button
3. **Shared Links** — Links table with active and expired entries
4. **Invite modal** — Overlay modal (480px wide, white, radius 12px, shadow): email input + role dropdown + "Send Invite" button
5. **Remove confirmation** — Small dialog: "Remove Jake Liu from Nike? They will lose access to all assets." with "Cancel" and "Remove" (red) buttons

## Style Direction

- Settings page follows standard SaaS admin patterns — left nav, right content
- Member management is table-based with inline role editing via dropdowns
- Role hierarchy is clear: Owner > Editor > Viewer
- Shared links provide external collaboration without requiring accounts
- Danger zone is visually separated with red styling to prevent accidental actions
- Clean, functional admin interface — no unnecessary decoration

## Acceptance Criteria

- [ ] Settings sidebar: 240px, nav items with icons, active state highlighted
- [ ] Brand Profile: name input, logo upload, description, save button
- [ ] Members table: avatar, name, email, role dropdown, added date, remove action
- [ ] Role dropdown with Owner/Editor/Viewer options
- [ ] Pending invitations shown in italic with resend/cancel actions
- [ ] Shared Links table: name, target, permissions, expiry, status pill, actions
- [ ] Invite Member button (primary, indigo)
- [ ] Alternating row backgrounds in tables
