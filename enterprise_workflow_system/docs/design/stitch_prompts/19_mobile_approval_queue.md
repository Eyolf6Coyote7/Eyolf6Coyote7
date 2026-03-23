# Screen: Mobile Approval Queue

> Route: `/approvals` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile approval queue with swipeable request cards for an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Center: "Approval Queue" in 17px bold #303133. Right: filter icon (24px, #606266, tap reveals bottom sheet filter).

**Segment control** (below nav, 48px, white bg, padding 8px 16px): A segmented control (Element Plus style) with 3 segments: "All (8)" (active — bg #409EFF, text white, radius 4px), "Pending (5)" (inactive — bg transparent, text #606266), "Urgent (2)" (inactive, text #606266). The whole control has a #F5F7FA bg with radius 4px.

**Scrollable list** (below segment, bg #F5F7FA, padding 8px 16px):

**Request cards** stacked vertically (8px gap between cards). Each card is white, radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), overflow hidden.

**Card default state** (padding 16px): Top row: "#WF-1234" in 13px bold #409EFF on left, "2h ago" in 12px #C0C4CC on right. Below (6px): title "Equipment Purchase — CNC Machine" in 15px bold #303133, max 2 lines. Below (6px): "Wei Chen · Engineering" in 13px #909399. Below (8px): row with priority badge "High" (bg #FDF6EC, text #E6A23C, 11px, radius 10px) on left, amount "¥45,000" in 14px bold #303133 on right.

**Card swiped right** (approve gesture — the key interaction): The card content slides right revealing a green (#67C23A) action area behind it on the left side. The green area shows a white check icon (32px) and "Approve" text (14px bold white) vertically centered. The card content is offset ~120px to the right. The green area is approximately 120px wide.

**Card swiped left** (reject gesture): The card content slides left revealing a red (#F56C6C) action area behind it on the right side. Red area shows white X icon (32px) and "Reject" text (14px bold white). Card offset ~120px to the left.

Show 6 cards in the list:
1. "Equipment Purchase — CNC Machine" — High priority, ¥45,000 — shown in **swiped-right state** (green approve revealed)
2. "Travel Approval — Beijing Trip" — Medium priority, ¥12,500 — default state
3. "Leave Request — Annual Leave" — Low priority — default state
4. "Expense Report — Q4" — Medium, ¥8,200 — default state
5. "Office Renovation Budget" — Urgent priority (badge bg #FEF0F0, text #F56C6C), ¥150,000 — card has a red left border (3px #F56C6C) indicating urgency
6. "Software License Renewal" — Low, ¥24,000 — default state

**Swipe hint** (shown on first visit, overlay on first card): A subtle animated arrow pointing right with ghost text "Swipe right to approve" in 13px #909399, semi-transparent overlay. A dismiss "Got it" pill button below.

**Tab bar** (bottom, 83px, same as mobile home): "Queue" tab is active (#409EFF filled icon), badge "8" on the Queue icon.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Segment control height | 32px |
| Segment active | bg #409EFF, text white |
| Segment inactive | bg transparent, text #606266 |
| Segment bg | #F5F7FA, radius 4px |
| Card radius | 8px |
| Card padding | 16px |
| Swipe reveal width | ~120px |
| Swipe approve bg | #67C23A |
| Swipe reject bg | #F56C6C |
| Swipe icon size | 32px white |
| Urgent left border | 3px #F56C6C |
| Card gap | 8px |
| Title size | 15px bold |
| ID size | 13px bold #409EFF |
| Priority High | bg #FDF6EC, text #E6A23C |
| Priority Urgent | bg #FEF0F0, text #F56C6C |
| Priority Medium | bg #ECF5FF, text #409EFF |
| Priority Low | bg #F0F9EB, text #67C23A |

## States to Generate

1. **Default** — 6 cards in list, first card swiped right showing approve action
2. **Card swiped left** — One card swiped left showing reject action
3. **Urgent filter** — Segment "Urgent" active, showing 2 cards only
4. **Empty** — No pending: illustration, "All caught up!" text
5. **Pull to refresh** — List pulled down with spinner
6. **Swipe hint** — First-visit overlay with swipe instruction animation

## Style Direction

- Swipe-to-approve is the hero interaction — it must feel natural and satisfying
- Cards are optimized for one-hand thumb reach
- Swipe reveal areas are large enough to feel confident about the action
- Urgent items have a visual accent (red left border) to draw immediate attention
- Segment control provides quick filtering without leaving the screen
- Pull to refresh is standard mobile list behavior
- First-time user hint explains the swipe gesture
- Professional, efficient — designed for managers processing approvals on the go

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Nav bar with filter icon
- [ ] Segment control: All, Pending, Urgent with counts
- [ ] 6 request cards with ID, title, requester, priority, amount
- [ ] Swipe right reveals green "Approve" action
- [ ] Swipe left reveals red "Reject" action
- [ ] Urgent card has red left border accent
- [ ] Swipe hint overlay for first-time users
- [ ] Tab bar with Queue active and badge
- [ ] All touch targets at least 44x44px
