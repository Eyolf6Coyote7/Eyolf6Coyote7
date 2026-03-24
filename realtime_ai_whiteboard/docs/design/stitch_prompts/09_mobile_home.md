# Screen: Mobile Home (Board List)

> Route: `/` | Platform: iOS + Android (390x844 iPhone 14 frame) | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A mobile app home screen showing a list of whiteboard boards. iPhone 14 frame (390x844px). Clean, native-feeling iOS design.

**Status bar** (top): Standard iOS status bar with time, signal, battery.

**Navigation bar** (44px): Left side "My Boards" as large bold title (iOS large title style, 28px). Right side has a circular user avatar (28px) for account access.

**Search bar** (below nav, 36px height): Rounded gray (#F3F4F6) search bar with magnifying glass icon and placeholder "Search boards...". Full width with 16px horizontal padding.

**Board list** (scrollable, vertical): Cards stacked vertically with 12px gap. Each card is full-width (horizontal padding 16px), border-radius 12px, white background, subtle shadow. Card structure:
- Left: 80x60px thumbnail of the board content (small preview with colorful shapes)
- Right of thumbnail: Board title bold "Sprint Planning", below it "Edited 2h ago" in small gray text, below that a row of 2 small overlapping avatars (collaborators)
- Far right: vertical "..." more button

Show 4-5 board cards visible.

**Floating Action Button** (bottom right, above tab bar): Blue (#2563EB) circle (56px) with white "+" icon. Shadow: 0 4px 12px rgba(37,99,235,0.3).

**Tab bar** (bottom, 49px, iOS-style): 4 tabs with icon + label: "Home" (house icon, active — blue), "Search" (magnifying glass, gray), "Create" (plus-circle, gray), "Settings" (gear, gray). Active tab icon and label are blue (#2563EB), inactive are gray (#9CA3AF). Thin top border.

Style: Inter or SF Pro font, white background, iOS-native feel. Cards have shadow 0 1px 3px rgba(0,0,0,0.1).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame | 390x844px (iPhone 14) |
| Card radius | 12px |
| Card shadow | 0 1px 3px rgba(0,0,0,0.1) |
| Thumbnail size | 80x60px |
| FAB size | 56px |
| FAB bg | #2563EB |
| FAB shadow | 0 4px 12px rgba(37,99,235,0.3) |
| Tab bar height | 49px |
| Active tab color | #2563EB |
| Inactive tab color | #9CA3AF |
| Search bar bg | #F3F4F6 |
| Card padding | 12px |

## States to Generate

1. **Default** — 4-5 board cards listed
2. **Empty** — No boards, center illustration (abstract whiteboard with sparkles), heading "No boards yet", subtext "Tap + to create your first board", arrow pointing to FAB
3. **Loading** — Skeleton: 4 card shapes pulsing gray (thumbnail block + 2 text lines)
4. **Pull to refresh** — Pulled down, spinner visible above first card

## Style Direction

- iOS-native home screen feel (like Apple Notes list, Notion mobile)
- Cards with thumbnails give visual preview of content
- FAB for primary action (new board) — Android-style but works on iOS too
- Tab bar is standard iOS pattern

## Acceptance Criteria

- [ ] Status bar + navigation title
- [ ] Search bar
- [ ] Vertical board card list with thumbnails
- [ ] FAB (blue + icon) for new board
- [ ] Tab bar with 4 items, active state
- [ ] Empty state with illustration + CTA
- [ ] Pull to refresh state
- [ ] Touch targets ≥ 44x44px
