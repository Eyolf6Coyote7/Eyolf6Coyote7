# Screen: Asset Library

> Route: `/` | Platform: Web | Figma Page: Screens — Library

## Stitch Prompt

The main asset library page for a 3D asset collaboration platform. Light theme, desktop 1440x900. This is the primary screen users see after login — a searchable, filterable grid of 3D asset thumbnails.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB, full width):
- Left: Logo — 3D cube icon (24px, indigo #6366F1) + "AssetHub 3D" text (bold 16px, #111827). 16px left padding.
- Center: Search bar — 480px wide, 40px height, border-radius 20px (pill shape), border 1px #D1D5DB, background #F9FAFB. Left icon: magnifying glass (#9CA3AF). Placeholder: "Search assets by name, tag, or format..." in 14px #9CA3AF. Right side: small "Cmd+K" keyboard shortcut badge in #E5E7EB rounded 4px.
- Right: Brand switcher dropdown — "Nike" with chevron down icon, 14px #374151, border 1px #D1D5DB, radius 8px, 36px height. Then a notification bell icon (24px, #6B7280) with a small red (#EF4444) dot badge showing "3". Then a user avatar circle (32px, with initials "MW" on indigo background).

**Filter sidebar** (240px wide, left side, white background, border-right 1px #E5E7EB, full height below top bar, 16px padding):
- Header: "Filters" in bold 14px #111827, with a "Clear all" link in 14px #6366F1 to the right.
- Section 1 — "Format" (bold 12px #6B7280 uppercase, 8px bottom margin): Checkboxes in a vertical list: GLB (checked, indigo checkbox), FBX, OBJ, USD. Each checkbox label is 14px #374151 with a count badge in #9CA3AF (e.g., "GLB (142)"). 4px gap between items.
- Section 2 — "Brand" (same header style, 24px top margin): Checkboxes: Nike (checked), Adidas, Under Armour, Puma. Each with count.
- Section 3 — "Date Range" (same header style): Two date inputs stacked — "From" and "To", each 40px height, full sidebar width, border-radius 8px, border 1px #D1D5DB.
- Section 4 — "Tags" (same header style): A tag cloud of pill-shaped tags: "hero" "campaign-2026" "shoe" "car" "packaging" — each tag is a pill (border-radius 16px, border 1px #D1D5DB, 14px #374151, padding 4px 12px). Selected tags have indigo background with white text.

**Asset grid** (fills remaining space right of sidebar, 24px padding, #F9FAFB background):
- Grid info bar (top): Left — "Assets" heading (bold 20px #111827) + count "247 assets" in 14px #6B7280. Right — View toggle (grid icon active with indigo bg / list icon inactive), Sort dropdown "Newest first" with chevron, and a blue "Upload" button (indigo #6366F1 bg, white text, 14px bold, radius 8px, 40px height, plus icon left of text).
- Grid: 3 columns, 16px gap. Each card:
  - 3D thumbnail area: 100% width, 200px height, #1A1A2E (dark) background, border-radius 12px 12px 0 0. Shows a rendered 3D model preview (e.g., a shoe, a car, packaging) centered, slightly rotated, with subtle ambient lighting. A small format badge "GLB" in the top-right corner (8px padding from edges) — white text on rgba(0,0,0,0.5) background, radius 4px, 11px font.
  - Card body: white background, padding 12px, border-radius 0 0 12px 12px. Asset name in bold 14px #111827 (e.g., "Air Max 2026 — Hero Shot"). Below: brand tag "Nike" as a small pill (12px, #6366F1 text, #EEF2FF background, radius 16px) + version "v3" in 12px #9CA3AF. Bottom row: "52 MB" in 12px #9CA3AF (left) + "3 days ago" in 12px #9CA3AF (right).
  - Card has: border-radius 12px, shadow 0 2px 8px rgba(0,0,0,0.08). Hover: shadow 0 8px 24px rgba(0,0,0,0.12).
- Show 6 cards (2 rows of 3). Variety of 3D models across cards.

**Pagination** (bottom center, 48px height): Left arrow, page numbers "1 2 3 ... 12", right arrow. Current page (1) has indigo background circle, others are plain text. 14px Inter.

## Design Tokens

| Token | Value |
|-------|-------|
| Top bar height | 56px |
| Top bar bg | #FFFFFF |
| Top bar border | 1px #E5E7EB |
| Search width | 480px |
| Search height | 40px |
| Search radius | 20px (pill) |
| Sidebar width | 240px |
| Sidebar bg | #FFFFFF |
| Grid bg | #F9FAFB |
| Grid columns | 3 |
| Grid gap | 16px |
| Card radius | 12px |
| Card shadow | 0 2px 8px rgba(0,0,0,0.08) |
| Card hover shadow | 0 8px 24px rgba(0,0,0,0.12) |
| Thumbnail height | 200px |
| Thumbnail bg | #1A1A2E |
| Primary | #6366F1 |
| Primary light bg | #EEF2FF |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Border | #D1D5DB |
| Tag radius | 16px (pill) |

## States to Generate

1. **Default** — Grid with 6 asset cards, filter sidebar expanded, search empty
2. **Empty** — No assets. Grid area shows illustration of a 3D cube outline, heading "No assets yet", subtext "Upload your first 3D model to get started", indigo "Upload" button
3. **Loading** — 6 skeleton cards: dark rectangle (thumbnail) + 3 gray shimmer lines (text area), pulsing animation
4. **Search active** — Search bar focused (indigo border), autocomplete dropdown below showing 4 suggestions with thumbnails
5. **Error** — Red banner below top bar: "Failed to load assets. Check your connection." with "Retry" button

## Style Direction

- Content-dense but organized — the grid is the hero, filters assist discovery
- Dark 3D thumbnail backgrounds (#1A1A2E) create a cinematic preview feel against the light UI
- Pill-shaped search bar invites interaction — it is the primary discovery tool
- Brand switcher in top bar enables multi-tenant workflow
- Cards have generous whitespace — the 3D preview dominates each card
- Professional, tool-like interface suitable for creative production teams

## Acceptance Criteria

- [ ] Top bar: logo, pill search bar (480px), brand switcher dropdown, notification bell with badge, user avatar
- [ ] Filter sidebar: 240px wide, sections for Format, Brand, Date Range, Tags
- [ ] Asset grid: 3 columns, 16px gap, cards with dark 3D thumbnails
- [ ] Each card: thumbnail (200px, dark bg), name, brand pill, version, size, date
- [ ] Card shadow on default, elevated shadow on hover
- [ ] Grid info bar: count, view toggle, sort dropdown, Upload button
- [ ] Pagination at bottom center
- [ ] Format badge on thumbnail corner
