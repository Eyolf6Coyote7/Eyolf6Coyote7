# Screen: Unity Asset Inspector

> Platform: Unity (Desktop) | Figma Page: Screens — Unity

## Stitch Prompt

Desktop application (Unity), 1920x1080px.

A side panel within the Unity client showing detailed asset metadata, version history, and download controls. DARK theme. Desktop 1920x1080. This panel appears docked on the right side when a user selects an asset from the browser.

**Layout**: The asset browser grid is visible on the left (70% width, slightly dimmed), and the inspector panel is docked on the right (30% width, 360px min-width).

**Inspector panel** (right side, #1E1E3A background, border-left 1px rgba(255,255,255,0.08), full height):

**Panel header** (48px height, #252547 bg, border-bottom 1px rgba(255,255,255,0.08), padding 0 16px):
- Left: "Inspector" in bold 14px #E5E7EB.
- Right: Pin icon (toggle, 20px, #6B7280, active = #6366F1) + Close X icon (20px, #6B7280).

**Asset preview** (240px height, #0F0F23 background, full panel width):
- 3D model thumbnail render of the selected asset (a sneaker), centered, with soft ambient lighting. Not interactive (static render, not a full Three.js viewer).
- Overlay bottom-left: format badge "GLB" in rgba(0,0,0,0.6) bg, white text, radius 4px, 10px, 6px from edges.
- Overlay bottom-right: "52 MB" in same badge style.

**Scrollable content** (below preview, padding 16px, scroll if content exceeds height):

1. **Asset name + brand** (no header, immediately below preview):
   - "Air Max 2026 — Hero Shot" bold 16px #E5E7EB.
   - Brand: "Nike" pill (indigo #6366F1 bg, white text, 11px, radius 16px, padding 2px 8px).
   - Status: "Approved" pill (#10B981 bg, white text, 11px, radius 4px, padding 2px 8px) — right of brand pill.

2. **Metadata section** (16px top margin, border-top 1px rgba(255,255,255,0.08), padding-top 12px):
   - Section label: "Details" bold 11px #6B7280 uppercase, letter-spacing 1px.
   - Key-value pairs (single column, 4px row gap):
     - Format: GLB | Vertices: 124,500
     - Textures: 4 | Size: 52 MB
     - Created: 2026-03-15 | Updated: 2026-03-20
     - By: Maya Chen
   - Keys: 12px #6B7280. Values: 13px #E5E7EB. Arranged as two-column within the panel width.

3. **Tags** (16px top margin, border-top 1px rgba(255,255,255,0.08), padding-top 12px):
   - Section label: "Tags" bold 11px #6B7280 uppercase.
   - Row of small pills: "shoe" "hero" "campaign-2026" "air-max" — each: #252547 bg, #9CA3AF text, border 1px rgba(255,255,255,0.08), radius 12px, 11px, padding 2px 8px. Wraps to multiple rows if needed.

4. **Version history** (16px top margin, border-top 1px rgba(255,255,255,0.08), padding-top 12px):
   - Section label: "Versions" bold 11px #6B7280 uppercase.
   - Version list (vertical, 36px row height each):
     - v3: Indigo (#6366F1) dot (6px) + "v3" bold 13px #E5E7EB + "2026-03-20" 12px #6B7280 + "current" badge (#10B981 bg, 9px, white). Row bg: rgba(99,102,241,0.08).
     - v2: Gray (#6B7280) dot + "v2" 13px #9CA3AF + "2026-03-15" 12px #4B5563. Hover: #252547 bg.
     - v1: Same gray style. "2026-03-01".
   - "Compare" link (#6366F1, 12px) below list.

5. **Actions** (16px top margin, border-top 1px rgba(255,255,255,0.08), padding-top 12px):
   - "Download to Project" button: full width, 40px height, #6366F1 bg, white text bold 13px, radius 8px, download icon left of text.
   - "Import to Scene" button: full width, 40px height, transparent bg, border 1px #6366F1, #6366F1 text, radius 8px, 4px top margin, cube icon.
   - "Open in Web" link: centered, 13px #6B7280, underline, 8px top margin.

## Design Tokens

| Token | Value |
|-------|-------|
| Panel width | 30% (360px min) |
| Panel bg | #1E1E3A |
| Panel header bg | #252547 |
| Panel header height | 48px |
| Preview height | 240px |
| Preview bg | #0F0F23 |
| Content padding | 16px |
| Section label | 11px #6B7280 uppercase |
| Version row height | 36px |
| Current version bg | rgba(99,102,241,0.08) |
| Tag bg | #252547 |
| Tag border | 1px rgba(255,255,255,0.08) |
| Tag radius | 12px |
| Button height | 40px |
| Button radius | 8px |
| Primary | #6366F1 |
| Success | #10B981 |
| Text primary | #E5E7EB |
| Text secondary | #9CA3AF |
| Text muted | #6B7280 |
| Text dim | #4B5563 |

## States to Generate

1. **Default** — Inspector showing asset details, v3 current, actions visible
2. **Downloading** — Download button shows progress: "Downloading... 68%" with progress bar fill in button
3. **Downloaded** — Download button changes to green (#10B981) bg with checkmark "Downloaded" + "Import to Scene" becomes primary
4. **No selection** — Panel shows centered message "Select an asset to view details" in 14px #6B7280 with a faded 3D cube icon

## Style Direction

- Compact inspector panel optimized for Unity Editor docking
- All-dark theme consistent with Unity's look and feel
- The static 3D preview at top provides visual confirmation without being interactive
- Version history is compact — dot timeline with inline dates
- Action buttons are prominent: Download and Import are the primary actions in Unity
- Uppercase section labels with letter-spacing follow Unity's own UI patterns
- Tags are subtle and compact — they are reference info, not primary interaction
- The panel should feel like a native Unity window, not a web view

## Acceptance Criteria

- [ ] Inspector panel docked right, 30% width, dark theme
- [ ] Panel header: "Inspector" title, pin and close buttons
- [ ] Static 3D preview: 240px height, dark background, format and size badges
- [ ] Asset name, brand pill, status pill
- [ ] Metadata: key-value pairs in two columns
- [ ] Tags: small dark pills
- [ ] Version history: dot timeline, current highlighted, compare link
- [ ] Action buttons: Download to Project (primary), Import to Scene (secondary), Open in Web (link)
- [ ] Full dark theme — matches Unity Editor aesthetic
