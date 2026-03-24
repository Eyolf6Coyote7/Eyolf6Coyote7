# Screen: Mobile My Requests

> Route: `/requests` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A mobile screen listing the user's own submitted requests in an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Center: "My Requests" in 17px bold #303133. Right: plus icon (24px, #409EFF, 44x44px touch area) for creating a new request.

**Search bar** (below nav, white bg, padding 8px 16px, 44px height area): A rounded search input (full width minus 32px, 36px height, bg #F5F7FA, radius 18px, magnifying glass icon #C0C4CC on left, placeholder "Search requests..." in 14px #C0C4CC, padding-left 36px).

**Segment control** (below search, padding 8px 16px, 40px height area): Horizontal scrollable segment pills: "All (47)" (active, bg #409EFF, text white, radius 16px, padding 6px 16px), "Pending (3)" (inactive, bg #F5F7FA, text #606266), "In Progress (5)", "Approved (28)", "Rejected (4)", "Escalated (7)". Segments are horizontally scrollable if they exceed screen width.

**Request list** (below segments, bg #F5F7FA, padding 0 16px 16px):

Grouped by date. Section header: "Today" in 13px bold #909399, padding 12px 0 8px.

Request cards stacked vertically (8px gap):

Card 1: White, radius 8px, shadow, padding 16px. Left side has a vertical color bar (3px wide, full height, #409EFF for in-progress). Content: top row "#WF-1289" in 13px bold #409EFF on left, status badge "In Progress" (bg #ECF5FF, text #409EFF, 11px, radius 10px) on right. Below (6px): "Leave Request — Annual Leave Dec 20-31" in 15px bold #303133 (max 2 lines). Below (6px): "Submitted today at 09:15" in 12px #C0C4CC. Bottom row (8px gap above): right-arrow chevron (#C0C4CC, 16px) indicating the card is tappable.

Card 2: Left bar #E6A23C (pending). Badge "Pending". "Purchase Order — Office Chairs x20". "Submitted today at 08:30".

Section header: "Yesterday" in 13px bold #909399.

Card 3: Left bar #67C23A (approved). Badge "Approved" (green). "Travel Approval — Beijing Trip". "Submitted yesterday at 14:00". Below status, a note "Approved by Li Wei" in 12px #67C23A.

Card 4: Left bar #F56C6C (rejected). Badge "Rejected" (red). "Expense Report — Q3 Dinner". "Submitted yesterday at 10:45". Note "Rejected — see comments" in 12px #F56C6C.

Section header: "This Week".

Card 5-7: More cards with varying statuses.

Show approximately 7 cards total across 3 date groups.

**Tab bar** (bottom, 83px): "Requests" tab active (#409EFF filled icon).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Search bar height | 36px |
| Search bar radius | 18px (pill) |
| Search bar bg | #F5F7FA |
| Segment pill radius | 16px |
| Segment active | bg #409EFF, text white |
| Segment inactive | bg #F5F7FA, text #606266 |
| Card radius | 8px |
| Card padding | 16px |
| Card left bar width | 3px |
| Left bar In Progress | #409EFF |
| Left bar Pending | #E6A23C |
| Left bar Approved | #67C23A |
| Left bar Rejected | #F56C6C |
| Left bar Escalated | #E6A23C |
| Section header | 13px bold #909399 |
| Card gap | 8px |
| Chevron icon | 16px #C0C4CC |
| Plus icon | 24px #409EFF |

## States to Generate

1. **Default** — 7 cards across 3 date groups, mixed statuses
2. **Filtered** — "Rejected" segment active, showing 4 cards only
3. **Search active** — Keyboard visible, search input has "leave" typed, 2 matching cards
4. **Empty** — No requests: illustration, "No requests yet. Tap + to submit your first request." centered
5. **Pull to refresh** — Spinner at top with "Refreshing..." text
6. **Loading** — Skeleton cards pulsing

## Style Direction

- List view grouped by date for chronological context
- Color-coded left bar on each card provides instant status recognition
- Segment pills are horizontally scrollable for many filter options
- Search is persistent at the top for finding specific requests
- Cards are tappable (chevron indicator) navigating to request detail
- The plus icon in nav bar provides quick access to new request creation
- Professional, clean — enterprise list pattern
- Grouped sections follow iOS list grouping conventions

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Nav bar with plus icon for new request
- [ ] Pill-shaped search bar
- [ ] Horizontally scrollable segment pills with counts
- [ ] Cards grouped by date (Today, Yesterday, This Week)
- [ ] Each card has colored left bar matching status
- [ ] Cards show ID, title, submission time, status badge
- [ ] Approved/Rejected cards show additional note text
- [ ] Chevron icon on each card indicating tappable
- [ ] Tab bar with Requests active
- [ ] All touch targets at least 44x44px
