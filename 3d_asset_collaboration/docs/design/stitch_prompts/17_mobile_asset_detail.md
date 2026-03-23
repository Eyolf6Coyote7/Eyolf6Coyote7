# Screen: Mobile Asset Detail

> Route: `/asset/:id` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

The asset detail screen on mobile showing a static 2D preview image (no Three.js on mobile), metadata, and version list. iPhone 14 frame (390x844px). Light theme.

**Status bar** (47px, iOS default).

**Navigation bar** (44px height, white bg, border-bottom 1px #E5E7EB):
- Left: Back chevron (< icon, #6366F1, 44x44px tap target) + "Library" text (17px #6366F1).
- Right: Share icon (24px, #6366F1, 44x44px) + overflow menu icon (three dots, 24px, #6366F1, 44x44px).

**Content** (scrollable, white bg):

1. **2D Preview image** (full width 390px, 260px height, #1A1A2E background):
   - Static pre-rendered 2D image of the 3D asset (a sneaker from a 3/4 angle). Centered, high quality, well-lit.
   - Overlay top-right (8px from edges): Format badge "GLB · 52 MB" in rgba(0,0,0,0.6) bg, white text, 12px, radius 6px, padding 4px 10px.
   - Overlay bottom-center: "3D preview available on desktop" text in rgba(255,255,255,0.5), 12px, with a small desktop icon. This informs the user that interactive 3D is desktop-only.

2. **Asset info** (16px padding, below preview):
   - Asset name: "Air Max 2026 — Hero Shot" bold 20px #111827.
   - Row: Brand pill "Nike" (13px, #6366F1 text, #EEF2FF bg, radius 16px, padding 2px 10px) + Status "Approved" (#10B981 text, #ECFDF5 bg, same pill style) + "v3" in 14px #9CA3AF. 8px top margin.
   - Description: "Hero shot render of the Air Max 2026 for Q3 campaign. Final approved version." 15px #6B7280, 8px top margin.

3. **Action buttons** (16px horizontal padding, 16px top margin):
   - "Download" button: full width, 50px height, indigo (#6366F1) bg, white text bold 16px, radius 10px, download icon.
   - "Open in Unity" button: full width, 50px height, white bg, border 1px #D1D5DB, #374151 text 16px, radius 10px, cube icon. 8px top margin.

4. **Metadata section** (16px padding, 24px top margin):
   - Section header: "Details" bold 13px #6B7280 uppercase, with a divider line below.
   - iOS grouped list style (white bg, 12px radius, border 1px #E5E7EB):
     - Row: "Format" (15px #374151) | "GLB" (15px #111827, right-aligned). 48px height, 16px horizontal padding, divider.
     - Row: "Vertices" | "124,500"
     - Row: "Textures" | "4"
     - Row: "Created" | "Mar 15, 2026"
     - Row: "Author" | "Maya Chen"
     - Row: "Size" | "52 MB"
   - Each row has minimum 44px tap height.

5. **Tags section** (16px padding, 16px top margin):
   - Section header: "Tags" bold 13px #6B7280 uppercase.
   - Wrapping row of tag pills: "shoe" "hero" "campaign-2026" "air-max" — each pill: #F3F4F6 bg, #374151 text, radius 16px, 14px, padding 6px 14px, min-height 32px. 6px gap.

6. **Version history** (16px padding, 16px top margin):
   - Section header: "Versions" bold 13px #6B7280 uppercase.
   - iOS grouped list style (white bg, 12px radius, border 1px #E5E7EB):
     - Row: Green dot (8px) + "v3" bold 15px #111827 + "current" badge (green, 10px) | "Mar 20, 2026" 14px #9CA3AF | chevron right. 56px height.
     - Row: Gray dot + "v2" 15px #374151 | "Mar 15, 2026" | chevron right. 56px height.
     - Row: Gray dot + "v1" 15px #374151 | "Mar 1, 2026" | chevron right. 56px height.
   - Tapping a version row opens that version's detail (navigation).

**Home indicator** (bottom).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Preview height | 260px |
| Preview bg | #1A1A2E |
| Button height | 50px |
| Button radius | 10px |
| Metadata row height | 48px (min) |
| Version row height | 56px |
| Grouped list radius | 12px |
| Tag radius | 16px |
| Tag bg | #F3F4F6 |
| Primary | #6366F1 |
| Primary light bg | #EEF2FF |
| Success | #10B981 |
| Success light bg | #ECFDF5 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Divider | 1px #E5E7EB |
| Horizontal padding | 16px |
| Touch target min | 44x44px |

## States to Generate

1. **Default** — 2D preview, metadata, tags, versions, download button
2. **Loading** — Gray placeholder for preview, skeleton lines for metadata
3. **Downloading** — Download button shows progress "Downloading... 68%", button disabled
4. **Downloaded** — Download button changes to green "Downloaded" with checkmark
5. **Error** — Red banner below nav bar "Failed to load asset details. Tap to retry."

## Style Direction

- iOS-native feel with grouped list sections for metadata and versions
- Static 2D preview only — clearly communicates "3D preview available on desktop"
- Large touch targets throughout (50px buttons, 44px min rows)
- Download is the primary action on mobile — users may download for later desktop/Unity use
- Metadata is scannable in key-value rows
- Version history uses iOS-style disclosure rows with chevrons
- Clean vertical scroll — no complex layouts on mobile
- Tags are informational — not editable on mobile

## Acceptance Criteria

- [ ] iPhone 14 frame: 390x844px
- [ ] Nav bar: back button, share and overflow menu
- [ ] 2D static preview: 260px height, dark bg, "3D preview on desktop" note
- [ ] Asset name, brand pill, status pill, version
- [ ] Download button: full width, indigo, 50px
- [ ] "Open in Unity" secondary button
- [ ] Metadata: iOS grouped list, key-value rows
- [ ] Tags: wrapping pill row
- [ ] Version history: grouped list with green dot for current, chevrons
- [ ] No Three.js or 3D viewer on mobile
- [ ] All touch targets >= 44x44px
