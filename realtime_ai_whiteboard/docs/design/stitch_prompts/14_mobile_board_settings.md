# Screen: Mobile Board Settings

> Route: `/board/:id/settings` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile board settings screen for a whiteboard app. iPhone 14 frame (390x844px). Full-screen push navigation (not a modal — modals are awkward on mobile). iOS-style grouped settings list.

**Status bar**: Standard iOS status bar.

**Navigation bar** (44px): Left has blue "< Back" text or back chevron icon. Center has bold title "Board Settings". Right has blue "Save" text button.

**Scrollable content** (white background, grouped sections with gray #F3F4F6 separator background between groups — iOS Settings style):

**Section 1 — General** (white bg group with 16px horizontal padding):
- Row 1: "Board Name" label on left, right side shows current name "Product Brainstorm" in gray with a chevron ">" — tapping opens an inline text edit (or pushes to edit screen).
- Row 2: "Description" label on left, right side shows truncated text "Add a description..." in light gray with chevron.
- Row 3: "Board Color" label on left, right side shows a small colored circle (blue, 24px) with chevron. Tapping reveals a horizontal row of 8 color circles below the row (inline expand).
- Each row is 48px height, separated by thin gray hairline border.

**Section 2 — Sharing** (white bg group, section header "SHARING" in uppercase 12px gray text above):
- Row 1: "Visibility" label on left, right side shows "Team" in gray with chevron — tapping opens an action sheet with options: "Private", "Team", "Public".
- Row 2: "Invite Members" label with chevron — pushes to a new screen with email input + member list.
- Row 3: "Guest Link" — toggle switch on the right (blue when on). Below the row (if toggle is on), show a sub-row with the URL text (truncated) and a "Copy" blue text button.
- Row 4: "Allow Guest Editing" — toggle switch on the right (currently off, gray).

**Section 3 — Members** (white bg group, section header "MEMBERS (3)"):
- Row 1: Avatar (32px circle) + "You" bold + "jerry@example.com" gray + "Owner" blue badge on right. No action.
- Row 2: Avatar + "Alice Chen" + "alice@example.com" + dropdown-style text "Editor >" on right (tapping shows action sheet: Editor, Viewer, Remove).
- Row 3: Avatar + "Bob Kim" + "bob@example.com" + "Viewer >" on right.

**Section 4 — Danger Zone** (white bg group, section header "DANGER ZONE" in uppercase red text):
- Single row: Red text "Delete Board" with red trash icon on left. Tapping shows iOS-style destructive action sheet: "Delete Board" (red) and "Cancel".

Style: iOS Settings app aesthetic — grouped rows, hairline separators, chevron disclosure indicators, toggle switches. Inter or SF Pro font. Background between groups: #F3F4F6. Row height 48px minimum for touch targets.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Background | #F3F4F6 (between groups) |
| Group bg | #FFFFFF |
| Row height | 48px minimum |
| Row padding | 16px horizontal |
| Section header | 12px uppercase #6B7280 |
| Hairline separator | 0.5px #E5E7EB |
| Toggle on bg | #2563EB |
| Toggle off bg | #D1D5DB |
| Chevron color | #C7C7CC |
| Danger text | #EF4444 |
| Avatar size | 32px |
| Badge bg (Owner) | #DBEAFE |
| Badge text (Owner) | #2563EB |

## States to Generate

1. **Default** — All sections visible, 3 members, guest link toggle off
2. **Guest link enabled** — Toggle on, URL sub-row expanded with copy button
3. **Delete confirmation** — iOS action sheet overlay: "Delete this board? This cannot be undone." with red "Delete" button and gray "Cancel" button
4. **Color picker expanded** — Board Color row expanded to show 8 color circles inline

## Style Direction

- iOS Settings app pattern — universally understood on mobile
- Grouped sections with gray gaps between them
- Chevron (>) indicates tappable rows that navigate or expand
- Toggle switches for boolean settings
- Destructive actions use iOS action sheet pattern (not inline confirm)

## Acceptance Criteria

- [ ] Navigation bar: back, title, save button
- [ ] Grouped settings sections (iOS style)
- [ ] Board name, description, color editable
- [ ] Visibility selector (action sheet)
- [ ] Guest link toggle + copy URL
- [ ] Member list with role management
- [ ] Danger zone with delete + confirmation action sheet
- [ ] All rows ≥ 48px height
- [ ] Hairline separators between rows
- [ ] Feels like native iOS Settings
