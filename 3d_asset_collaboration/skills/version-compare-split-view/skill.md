---
name: version-compare-split-view
description: Build a side-by-side React diff viewer page with vertical split, version badges, sync-rotation toggle, per-side toolbar, and footer with diff stats.
---

## When to use

Trigger when the user asks to:
- add a side-by-side comparison page
- show two versions of an asset / model / file with diff stats
- mentions `VersionComparePage`, `Sync rotation`, `leftMeta`, `rightMeta`, split view
- visualize a binary diff (textures / vertex counts / file size)

## Context

`asset-portal/src/pages/VersionComparePage.tsx:1-493` is the canonical split-view diff page. Defining traits:

1. **3-row layout**: Header (56px) → Main (`flex: 1`) → Footer (64px). Header is white, main is dark `#1A1A2E`, footer is white again.
2. **Vertical 50/50 split** with an absolute-positioned `<div>` divider at `left: "50%"` over the main area for the visual seam.
3. **Per-side panel** is a `flex: 1` container with absolute-positioned overlays: version badge top-center, warning chip bottom-center (only on diff side), tool sidebar bottom-left.
4. **Header center** has the page title with `letterSpacing: -0.4` and a small subtitle. Header right has a "Sync rotation" custom pill toggle.
5. **Footer left** shows left-version metadata, **footer center** shows the diff summary with `+/- texture` chips and vertex diff badge, **footer right** shows right-version metadata. Right-side `size` field is colored `#4F46E5` to indicate it's the "current" version.
6. **No real 3D** — both panels render placeholder SVG icons, NOT actual r3f canvases. The page is a layout/design demo for the diff UX.
7. **Backdrop blur badges** use `backdropFilter: "blur(10px)"` over `rgba(0,0,0,0.7)` for the floating chrome.

## Operating instructions

1. Create the page with the 3-row vertical layout.
2. Header: `<Link to="/...">` back button left, title block center (with `letterSpacing: -0.4`), Sync rotation toggle + refresh icon right.
3. Main area: `flex: 1` with `display: "flex"` for the 50/50 split. Place an absolute divider at `left: "50%"` width 1px over the parent.
4. Each side panel: `{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }`. Inside it, the placeholder content + absolute-positioned overlays.
5. Version badge format: dot + label, wrapped in `rgba(0,0,0,0.7)` background with `backdropFilter: blur(10px)`.
6. Warning chip (only on diff side): `background: "#A36700"` with white triangle SVG icon + uppercase text.
7. Tool sidebar: 6px-padding column with 32×32 buttons over `rgba(0,0,0,0.7)` blurred background.
8. Footer: 3-section flex (left meta / center diffs / right meta). Diff badges use `#FFDAD6` red bg for `-` and `#6CF8BB` green bg for `+`. Vertex diff uses `#00714D` background.
9. To wire to real 3D, replace the placeholder SVG with `<ThreeViewer>` from the `three-viewer-r3f` skill. Be careful — synchronizing two cameras requires a shared ref, NOT React state.

## Reusable prompts / code patterns

3-row layout shell:
```tsx
<div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1A1A2E" }}>
  <div style={{ height: 56, background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", flexShrink: 0 }}>
    {/* header */}
  </div>
  <div style={{ flex: 1, display: "flex", position: "relative" }}>
    <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.1)", zIndex: 10 }} />
    {/* left panel */}
    {/* right panel */}
  </div>
  <div style={{ height: 64, background: "#FFFFFF", borderTop: "1px solid #E2E8F0", flexShrink: 0 }}>
    {/* footer */}
  </div>
</div>
```

Floating version badge:
```tsx
<div style={{
  position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
  display: "flex", alignItems: "center", gap: 8,
  background: "rgba(0,0,0,0.7)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: 12, padding: "6px 16px",
}}>
  <div style={{ width: 8, height: 8, borderRadius: 12, background: version.dotColor }} />
  <span style={{ fontSize: 11, fontWeight: 700, color: "#FFF", letterSpacing: 0.275 }}>
    {version.label}
  </span>
</div>
```

Diff badge row (footer center):
```tsx
<div style={{ display: "flex", alignItems: "center", gap: 12, background: "#F1F3FF", borderRadius: 8, padding: "8px 16px" }}>
  <span style={{ background: "#FFDAD6", color: "#93000A", padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700 }}>
    − 2 textures
  </span>
  <span style={{ background: "#6CF8BB", color: "#00714D", padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700 }}>
    + 3 textures
  </span>
</div>
```

## Anti-patterns

- Do NOT split the page with CSS Grid — use `flex: 1` per side so the absolute divider lines up correctly.
- Do NOT skip `backdropFilter: blur(10px)` on floating badges — without it they look opaque and break the dark theme.
- Do NOT mount two `<Canvas>` components without sharing a camera ref if Sync Rotation is on — React state can't sync at 60fps.
- Do NOT use `position: fixed` for overlays — use `position: absolute` so they scope to the panel.
- Do NOT remove the divider z-index — the panels would overlap visually.

## References

- `asset-portal/src/pages/VersionComparePage.tsx:11-93` — header + back link + sync toggle
- `asset-portal/src/pages/VersionComparePage.tsx:96-244` — left panel with badges + warnings + toolbar
- `asset-portal/src/pages/VersionComparePage.tsx:247-347` — right panel
- `asset-portal/src/pages/VersionComparePage.tsx:350-490` — footer with meta + diff stats
