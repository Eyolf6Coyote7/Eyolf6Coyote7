# Screen: Asset Detail

> Route: `/asset/:id` | Platform: Web | Figma Page: Screens — Asset Detail

## Stitch Prompt

The asset detail page for viewing a single 3D model. The 3D viewer is the hero element, taking most of the screen. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Back arrow icon (24px, #6B7280) + "Back to Library" text (14px, #6B7280). 16px left padding.
- Center: Asset name "Air Max 2026 — Hero Shot" in bold 18px #111827.
- Right: "Download" button (indigo #6366F1 bg, white text, 14px bold, radius 8px, 40px height, download icon left of text) + "Share" button (white bg, border 1px #D1D5DB, #374151 text, same dimensions, share/link icon). 8px gap between buttons.

**Main content** — Two-column layout below top bar:

**Left column — 3D Viewer** (takes ~65% width, fills height):
- Full-height Three.js canvas with #1A1A2E (very dark navy) background, no border-radius (full bleed to edges).
- Shows a 3D model of a sneaker, well-lit with soft ambient + directional lighting, centered in the viewport, slightly rotated ~30 degrees to show dimensionality.
- **Viewer controls** (bottom-left of viewer, 8px from edges): A floating toolbar (white bg, radius 8px, shadow, padding 4px): icons for rotate (orbit icon, active/highlighted), zoom (magnifying glass +), pan (hand icon), fullscreen (expand icon). Each icon 36x36px, active one has #6366F1 background with white icon.
- **Model info overlay** (top-left of viewer, 8px from edges): Semi-transparent dark pill (rgba(0,0,0,0.6), radius 16px, padding 4px 12px): "GLB · 52 MB · v3" in white 12px Inter.
- Center of viewer: subtle "Drag to rotate" hint text in rgba(255,255,255,0.4) 14px (only shown on first visit).

**Right column — Metadata Panel** (35% width, white background, border-left 1px #E5E7EB, padding 24px, scrollable):

1. **Asset info section**:
   - Asset name: "Air Max 2026 — Hero Shot" bold 20px #111827.
   - Brand pill: "Nike" — indigo text on #EEF2FF background, radius 16px, 12px font, padding 4px 12px.
   - Description: "Hero shot render of the Air Max 2026 for Q3 campaign. Final approved version." in 14px #6B7280, 8px top margin.

2. **Metadata grid** (24px top margin): Two-column key-value grid, 8px row gap:
   - Format: GLB | Size: 52 MB
   - Vertices: 124,500 | Textures: 4
   - Created: 2026-03-15 | By: Maya Chen
   - Updated: 2026-03-20 | Status: Approved
   Keys in 12px #9CA3AF, values in 14px #374151.

3. **Tags section** (24px top margin): Label "Tags" in bold 14px #111827. Below: row of tag pills — "shoe" "hero" "campaign-2026" "air-max" — each pill has #F3F4F6 background, #374151 text, radius 16px, 14px, with a small X icon for removal. Last element: "+ Add tag" in dashed border pill, #6366F1 text.

4. **Version History** (24px top margin): Label "Versions" in bold 14px #111827. Below: vertical timeline:
   - v3 (current) — "2026-03-20 · Maya Chen · Final lighting pass" — left dot is filled indigo circle (8px), text bold 14px #111827. A "current" badge (green #10B981 bg, white text, 10px, radius 4px).
   - v2 — "2026-03-15 · Jake Liu · Texture update" — left dot is #D1D5DB circle (8px), text 14px #6B7280.
   - v1 — "2026-03-01 · Maya Chen · Initial upload" — same style as v2.
   - Timeline: 2px vertical line in #E5E7EB connecting the dots.
   - Below timeline: "Compare versions" link button in #6366F1, 14px, underline on hover.

5. **Share section** (24px top margin): Label "Shared with" in bold 14px #111827. Two user rows: avatar circle (24px) + "Maya Chen" (14px #374151) + role "Owner" (#9CA3AF). Second: "Jake Liu" + "Editor". Below: "Manage access" link in #6366F1.

## Design Tokens

| Token | Value |
|-------|-------|
| Top bar height | 56px |
| Viewer bg | #1A1A2E |
| Viewer width | ~65% |
| Metadata panel width | ~35% |
| Metadata padding | 24px |
| Control bar radius | 8px |
| Control icon size | 36x36px |
| Primary | #6366F1 |
| Primary light bg | #EEF2FF |
| Success | #10B981 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Border | #D1D5DB |
| Tag bg | #F3F4F6 |
| Tag radius | 16px |
| Timeline dot size | 8px |
| Timeline line | 2px #E5E7EB |

## States to Generate

1. **Default** — 3D model loaded, metadata panel showing, v3 current
2. **3D Loading** — Viewer shows dark bg with centered spinner (indigo ring) + "Loading model..." text in white 14px
3. **3D Error** — Viewer shows dark bg with warning icon + "Preview unavailable" heading + "Download to view in Unity" subtext, both in white
4. **Fullscreen viewer** — 3D viewer takes 100% screen, metadata panel hidden, floating X close button top-right

## Style Direction

- The 3D viewer is the undisputed hero — it gets 65% of the width and the dramatic dark background
- The metadata panel is an information sidebar, not a competitor for attention
- Version timeline makes history scannable at a glance
- Tag pills are interactive and editable in-place
- Viewer controls are subtle, floating, and do not obscure the model
- Professional digital asset management feel — this is a work tool for creative teams

## Acceptance Criteria

- [ ] Top bar: back button, asset name, Download (primary) and Share (secondary) buttons
- [ ] 3D Viewer: dark (#1A1A2E) background, ~65% width, full height
- [ ] Viewer controls: floating toolbar with rotate, zoom, pan, fullscreen icons
- [ ] Model info overlay: format, size, version in semi-transparent pill
- [ ] Metadata panel: name, brand pill, description, metadata grid
- [ ] Tags: editable pills with remove (X) and add capability
- [ ] Version history: vertical timeline with dots, current badge (green), compare link
- [ ] Share section: user list with roles
