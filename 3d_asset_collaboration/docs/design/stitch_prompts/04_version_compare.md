# Screen: Version Compare

> Route: `/asset/:id/compare` | Platform: Web | Figma Page: Screens — Compare

## Stitch Prompt

A side-by-side 3D model comparison view for comparing two versions of the same asset. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Back arrow icon (24px, #6B7280) + "Back to Asset" text (14px, #6B7280).
- Center: "Compare Versions" in bold 18px #111827 + asset name "Air Max 2026 — Hero Shot" in 14px #6B7280 below.
- Right: "Sync rotation" toggle — a pill-shaped toggle switch (48x24px), active state indigo (#6366F1), with label "Sync" in 14px #374151. When active, rotating one viewer rotates both.

**Comparison area** — Full width below top bar, split into two equal halves with a 2px vertical divider (#E5E7EB) in the center:

**Left viewer** (~50% width, full height below top bar):
- **Version selector** (top of viewer, centered, floating): Dropdown on a semi-transparent dark pill (rgba(0,0,0,0.7), radius 8px, padding 8px 16px): "v2 — 2026-03-15" in white 14px Inter, chevron down icon. Yellow (#F59E0B) dot left of text indicating "older version."
- Three.js canvas with #1A1A2E background, showing the v2 model (slightly different textures/lighting from v3).
- **Viewer controls** (bottom-left, 8px from edges): Same floating toolbar as asset detail — rotate, zoom, pan icons, 36x36px each.
- **Change indicator** (bottom-center): Semi-transparent pill "Textures differ" in #F59E0B text on rgba(0,0,0,0.6) bg, 12px.

**Right viewer** (~50% width, full height):
- **Version selector** (same floating style): "v3 — 2026-03-20 (current)" in white 14px, with green (#10B981) dot indicating "current version."
- Three.js canvas with #1A1A2E background, showing the v3 model (current version, updated textures).
- Same viewer controls.

**Bottom comparison bar** (64px height, white background, border-top 1px #E5E7EB, full width):
- Left section: "v2" label bold, then metadata: "Size: 48 MB · Vertices: 118,200 · Textures: 3" in 14px #6B7280.
- Center: A horizontal diff indicator showing: red pill "- 2 textures removed" and green pill "+ 3 textures added", "Vertex count: +6,300 (+5.3%)" in 14px #374151.
- Right section: "v3" label bold, then metadata: "Size: 52 MB · Vertices: 124,500 · Textures: 4" in 14px #6B7280.

## Design Tokens

| Token | Value |
|-------|-------|
| Top bar height | 56px |
| Viewer bg | #1A1A2E |
| Divider | 2px #E5E7EB |
| Version selector bg | rgba(0,0,0,0.7) |
| Version selector radius | 8px |
| Current version dot | #10B981 |
| Older version dot | #F59E0B |
| Control icon size | 36x36px |
| Bottom bar height | 64px |
| Diff added | #10B981 |
| Diff removed | #EF4444 |
| Primary | #6366F1 |
| Text primary | #111827 |
| Text secondary | #6B7280 |

## States to Generate

1. **Default — Synced** — Both viewers showing models, sync toggle ON, rotating one rotates both
2. **Default — Independent** — Sync toggle OFF, each viewer rotates independently
3. **Loading** — Both viewers show centered spinner + "Loading v2..." / "Loading v3..."
4. **Single error** — Left viewer shows model, right viewer shows "Preview unavailable for v1" error state

## Style Direction

- True side-by-side comparison — both viewers get equal space and equal treatment
- Sync rotation is the key interaction — lets users compare the same angle instantly
- Floating version selectors keep the viewport maximized
- Bottom comparison bar provides quantitative diff data (size, vertex count, textures)
- Color-coded version indicators (yellow = older, green = current) prevent confusion
- Dark viewer backgrounds create immersive comparison environment

## Acceptance Criteria

- [ ] Two equal-width Three.js viewers with #1A1A2E background
- [ ] 2px vertical divider between viewers
- [ ] Floating version selector dropdown on each viewer
- [ ] Version indicators: green dot = current, yellow dot = older
- [ ] Sync rotation toggle in top bar
- [ ] Viewer controls (rotate, zoom, pan) on each viewer
- [ ] Bottom comparison bar: metadata for both versions + diff indicators
- [ ] Change indicators on each viewer (what differs)
