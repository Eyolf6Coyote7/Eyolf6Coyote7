# Screen: Mobile Asset List

> Route: `/` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

The main asset browsing screen on mobile — a vertical list of asset cards with static 2D thumbnails (no 3D viewer on mobile). iPhone 14 frame (390x844px). Light theme.

**Status bar** (47px, iOS default, dark text on white).

**Navigation bar** (44px height, white bg, border-bottom 1px #E5E7EB):
- Left: Brand name "Nike" bold 17px #111827 + chevron down (indicates brand switcher).
- Right: Filter icon (24px, #6B7280, 44x44px tap target) with small red badge "2" (indicating 2 active filters).

**Search bar** (below nav bar, 16px horizontal padding, 8px vertical padding, #F9FAFB bg):
- Full width (358px), 44px height, #FFFFFF bg, border 1px #D1D5DB, border-radius 10px. Magnifying glass icon (#9CA3AF) + placeholder "Search assets..." 16px #9CA3AF.

**Asset list** (below search, fills remaining space above tab bar, scrollable, white bg):
- Vertical list, no gap between cards (separated by 1px #E5E7EB dividers).
- Each asset card (full width, 100px height, padding 12px 16px):
  - Left: Static 2D thumbnail (76x76px, #1A1A2E background, border-radius 8px). Shows a pre-rendered 2D image of the 3D asset. Format badge "GLB" in top-right of thumbnail (8px, white on rgba(0,0,0,0.5), radius 3px).
  - Right content (fills remaining width, 12px left margin):
    - Row 1: Asset name "Air Max 2026 — Hero Shot" bold 15px #111827, single line, truncate ellipsis.
    - Row 2: Brand pill "Nike" (11px, #6366F1 text, #EEF2FF bg, radius 12px, padding 1px 8px) + "v3" 13px #9CA3AF, 4px gap. 4px top margin.
    - Row 3: "52 MB · 3 days ago" 13px #9CA3AF. 4px top margin.
  - Right edge: Chevron right icon (16px, #D1D5DB), vertically centered.
  - Tap: entire card is tappable (full area >= 44px height).
- Show 7 cards with variety: different asset names, brands (Nike, Adidas), versions, dates.

**Active filters banner** (below search, above list, only visible when filters applied): 36px height, #EEF2FF bg, 16px horizontal padding. Row of small pills: "GLB" with X (12px, #6366F1) + "Nike" with X + "Clear all" link (#6366F1, right-aligned). Each X is 44x44px tap target.

**Tab bar** (bottom, 49px height + 34px home indicator, white bg, border-top 1px #E5E7EB):
- 4 tabs, equal width: Assets (cube icon, active = #6366F1 fill + text), Search (magnifying glass, inactive = #9CA3AF), Notifications (bell, with red badge "3"), Profile (person icon).
- Each tab: icon (24px) above label (10px). Active tab icon and label are #6366F1, inactive are #9CA3AF.
- All tab targets >= 44x44px.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Nav bar height | 44px |
| Search bar height | 44px |
| Search radius | 10px |
| Card height | 100px |
| Thumbnail size | 76x76px |
| Thumbnail radius | 8px |
| Thumbnail bg | #1A1A2E |
| Tab bar height | 49px + 34px home indicator |
| Tab active color | #6366F1 |
| Tab inactive color | #9CA3AF |
| Active filter bg | #EEF2FF |
| Primary | #6366F1 |
| Primary light bg | #EEF2FF |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Divider | 1px #E5E7EB |
| Touch target min | 44x44px |
| Horizontal padding | 16px |

## States to Generate

1. **Default** — List of 7 asset cards, search empty, tab bar visible, Assets tab active
2. **Filtered** — Active filters banner visible ("GLB", "Nike"), fewer cards shown
3. **Empty** — No assets: centered 3D cube icon (48px, #D1D5DB) + "No assets yet" 17px #374151 + "Assets uploaded on desktop will appear here" 15px #9CA3AF
4. **Loading** — 7 skeleton rows: gray rectangle (thumbnail) + 3 gray shimmer lines
5. **Search focused** — Keyboard open, recent searches dropdown below search bar
6. **Pull to refresh** — Spinner at top of list, "Updating..." text

## Style Direction

- iOS list pattern — familiar, thumb-friendly vertical scrolling
- Static 2D thumbnails only — no 3D rendering on mobile for performance
- Dark thumbnail backgrounds give the same cinematic feel as web
- Compact card layout (100px height) shows enough info without wasting space
- Tab bar provides quick navigation between main sections
- Brand switcher in nav bar title (chevron indicator) is a compact pattern
- Active filter pills give clear feedback on what is narrowing results
- No upload capability on mobile — this is a browsing/notification experience

## Acceptance Criteria

- [ ] iPhone 14 frame: 390x844px
- [ ] Nav bar: brand name with switcher chevron, filter icon with badge
- [ ] Search bar: full width, 44px height, 10px radius
- [ ] Asset cards: 2D thumbnail (76x76px), name, brand pill, version, size, date
- [ ] Static 2D thumbnails only — no 3D viewer
- [ ] Format badge on thumbnails
- [ ] Tab bar: 4 tabs (Assets active, Search, Notifications with badge, Profile)
- [ ] All touch targets >= 44x44px
- [ ] Active filters banner with removable pills
- [ ] Chevron right on each card (navigation indicator)
