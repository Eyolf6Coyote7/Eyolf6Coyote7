# Screen: Board Settings

> Route: `/board/:id/settings` | Platform: Web | Figma Page: Screens — Settings

## Stitch Prompt

Desktop web page, 1440px width.

A settings modal (or page) for a single whiteboard board. Centered modal, 560px wide, border-radius 16px, white background with overlay behind it (dark semi-transparent).

**Modal header** (56px): Bold title "Board Settings" on the left, X close button on the right. Thin bottom border.

**Modal body** (scrollable, padded 24px):

**Section 1 — General**:
- "Board Name" label with a text input below, pre-filled with "Product Brainstorm". Input has 8px radius, gray border.
- "Description" label with a textarea (3 rows), placeholder "Add a description for this board..."
- "Board Color" label with 8 small color circles in a row (blue, green, yellow, red, purple, orange, pink, gray). The active one (blue) has a checkmark overlay.

**Section 2 — Sharing & Permissions** (separated by a thin line):
- "Board visibility" label with a dropdown select: options "Private (only you)", "Team (invited members)", "Public (anyone with link)". Currently showing "Team".
- "Invite members" — a text input with placeholder "Enter email..." and a blue "Invite" button next to it.
- **Members list**: 3 rows, each with circular avatar (32px), name, email in gray, and a role dropdown ("Editor" / "Viewer" / "Remove"). First member shows "(you)" tag and "Owner" badge that can't be changed.
- "Guest link" — a read-only text input showing a URL, with a "Copy Link" button (icon + text). Below it, a toggle switch "Allow guest editing" (currently off).

**Section 3 — Danger Zone** (separated by thin line, red-tinted section):
- Red text heading "Danger Zone".
- "Delete this board" description text: "This action cannot be undone. All content will be permanently deleted."
- Red outlined button "Delete Board" with trash icon.

**Modal footer** (56px, top border): "Cancel" gray text button on the left, "Save Changes" blue solid button on the right.

Style: Inter font, clean form layout, 16px gap between fields, labels 14px semi-bold, inputs 14px regular. Modal shadow: 0 8px 24px rgba(0,0,0,0.15).

## Design Tokens

| Token | Value |
|-------|-------|
| Modal width | 560px |
| Modal radius | 16px |
| Modal shadow | 0 8px 24px rgba(0,0,0,0.15) |
| Input radius | 8px |
| Input border | #E5E7EB |
| Section gap | 24px |
| Danger zone bg | #FEF2F2 |
| Danger button border | #EF4444 |
| Danger button text | #EF4444 |
| Toggle active bg | #2563EB |

## States to Generate

1. **Default** — All fields populated, 3 members listed
2. **Link copied** — "Copy Link" button changes to checkmark + "Copied!" for 2 seconds
3. **Delete confirmation** — Clicking "Delete Board" shows an inline confirmation: "Type board name to confirm" input + red "Confirm Delete" button

## Style Direction

- Standard SaaS settings modal (like Notion page settings or Linear project settings)
- Clear section separation
- Danger zone visually distinct — light red background, red text
- Form fields well-spaced, not cramped

## Acceptance Criteria

- [ ] Modal with overlay backdrop
- [ ] Board name + description editable
- [ ] Color picker (8 colors)
- [ ] Visibility dropdown
- [ ] Member list with role management
- [ ] Guest link with copy + toggle
- [ ] Danger zone with delete + confirmation
- [ ] Cancel / Save buttons in footer
