# Screen: Mobile Home

> Route: `/` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A mobile home/dashboard screen for an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px height, white bg, bottom border 1px #EBEEF5): Left: nothing. Center: "Dashboard" in 17px bold #303133. Right: notification bell icon (24px, #606266) with red badge dot (8px circle, #F56C6C, no number — just a dot indicating unread) in the top-right of the icon.

**Scrollable content** (below nav bar, above tab bar, bg #F5F7FA, padding 16px):

**Greeting section** (top of content): "Good morning, Wei" in 20px bold #303133. Below (4px gap), "You have 3 pending approvals" in 14px #909399.

**Stats cards row** (below greeting, 16px gap): Two cards side by side (50% width each minus 8px gap, each white, radius 8px, shadow, padding 16px):

Card 1: "Pending" label in 12px #909399. Number "3" in 28px bold #E6A23C. Small clock icon (16px) in #E6A23C at top-right of card.

Card 2: "My Active" label in 12px #909399. Number "7" in 28px bold #409EFF. Document icon (16px) in #409EFF.

Below (8px gap), two more cards side by side:

Card 3: "Approved" label. Number "28" in 28px bold #67C23A. Check icon in #67C23A.

Card 4: "Avg Time" label. "4.2h" in 28px bold #303133. Timer icon in #909399.

**Recent Approvals section** (below stats, 24px gap): Section header row: "Pending Approvals" in 16px bold #303133 on left, "See All →" text link in 14px #409EFF on right.

Below (12px gap), 3 request cards stacked vertically (8px gap between):

Each card (white, radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 16px): Top row: request ID "#WF-1234" in 13px bold #409EFF on left, time "2h ago" in 12px #C0C4CC on right. Below (6px gap): title "Equipment Purchase — CNC Machine" in 15px bold #303133. Below (6px gap): requester "Wei Chen · Engineering" in 13px #909399. Below (8px gap): row with priority badge "High" (bg #FDF6EC, text #E6A23C, radius 10px, 11px) and amount "¥45,000" in 14px bold #303133 on the right. Below (12px gap): two buttons side by side: "Approve" (bg #67C23A, white text, 40px height, radius 8px, flex 1, check icon) and "Reject" (bg white, border 1px #F56C6C, text #F56C6C, 40px height, radius 8px, flex 1, X icon), 8px gap between them.

Second card: "#WF-1235", "Travel Approval — Beijing Trip", "Li Wei · Sales", priority "Medium" (bg #ECF5FF, text #409EFF), amount "¥12,500".

Third card: "#WF-1236", "Leave Request — Annual Leave", "Zhang Min · Finance", priority "Low" (bg #F0F9EB, text #67C23A), no amount field.

**Tab bar** (bottom, 83px including safe area, white bg, top border 1px #EBEEF5): 4 tabs evenly spaced. Each tab: 24px icon above, 10px label below. "Home" (grid icon, active — icon and text #409EFF, blue dot 4px above icon), "Queue" (check-circle icon, #909399, red badge "5" on icon), "Requests" (document icon, #909399), "Profile" (user icon, #909399). Active tab icon is filled, inactive tabs are outlined.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Nav bar height | 44px |
| Tab bar height | 83px (incl. safe area) |
| Content padding | 16px |
| Stats card padding | 16px |
| Stats number size | 28px bold |
| Stats label size | 12px #909399 |
| Request card padding | 16px |
| Request card radius | 8px |
| Request title size | 15px bold |
| Action button height | 40px |
| Action button radius | 8px |
| Approve button bg | #67C23A |
| Reject button border | 1px #F56C6C |
| Tab icon size | 24px |
| Tab label size | 10px |
| Tab active | #409EFF |
| Tab inactive | #909399 |
| Tab badge | red dot 8px or number badge |
| Notification bell badge | 8px #F56C6C dot |

## States to Generate

1. **Default** — Stats cards + 3 pending approval cards with actions
2. **Empty** — No pending approvals: stats show "0" for pending, illustration with "All caught up! No pending approvals." text
3. **Loading** — Skeleton cards: 4 pulsing stat rectangles and 3 pulsing card rectangles
4. **Pull to refresh** — Content pulled down, blue spinner visible at top with "Refreshing..." text
5. **Offline** — Yellow banner below nav bar: "You're offline — showing cached data" with offline icon

## Style Direction

- Mobile dashboard optimized for quick glance and immediate action
- Stats cards are compact and scannable — large numbers, small labels
- Approval cards have inline action buttons for one-tap approve/reject
- Tab bar provides persistent navigation to main sections
- Badge counts on Queue tab show pending items
- Pull to refresh is expected on all list screens
- iOS design conventions: centered nav title, tab bar with safe area
- Professional, enterprise — no playful illustrations
- All touch targets minimum 44x44px

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Nav bar with title and notification bell with badge
- [ ] Greeting with pending count
- [ ] 4 stats cards (2x2 grid) with colored numbers and icons
- [ ] 3 pending approval cards with ID, title, requester, priority, amount
- [ ] Approve (green) and Reject (red outline) buttons on each card
- [ ] Tab bar with 4 tabs: Home (active), Queue (with badge), Requests, Profile
- [ ] All touch targets at least 44x44px
- [ ] Content area scrollable
