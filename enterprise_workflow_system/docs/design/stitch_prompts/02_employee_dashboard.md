# Screen: Employee Dashboard

> Route: `/` | Platform: Web | Figma Page: Screens — Dashboard

## Stitch Prompt

Desktop web page, 1440px width.

An enterprise employee dashboard for a workflow approval system. Desktop viewport 1440x900px.

**Top bar** (64px height, white #FFFFFF background, bottom border 1px #EBEEF5, full width): Left side has the logo — a 32x32px blue (#409EFF) icon and "WorkflowOS" text in 16px bold #303133, 16px from the left edge. Center has a search bar (360px wide, 36px height, border 1px #DCDFE6, border-radius 4px, placeholder "Search requests..." with a magnifying glass icon #C0C4CC on the left). Right side has: a bell icon (24px, #606266) with a red notification badge showing "3" (red circle #F56C6C, white text, 18px diameter, positioned at top-right of bell), 16px gap, a vertical divider (1px, 20px tall, #EBEEF5), 16px gap, a 32x32px circular user avatar (gray placeholder), and the name "Wei Chen" in 14px #303133, with a small down-chevron icon.

**Side navigation** (220px wide, full height minus top bar, white #FFFFFF background, right border 1px #EBEEF5): The nav has 16px top padding. Items are vertically stacked, each 48px height, 20px left padding, 14px text. Items in order: "Dashboard" (icon: grid/dashboard, color #409EFF, background #ECF5FF — this is the active item), "New Request" (icon: plus-circle, color #606266), "Approval Queue" (icon: check-circle, color #606266, with a blue badge "5" to the right), "My History" (icon: clock, color #606266), "Profile" (icon: user, color #606266). Each item has a 4px left border that is transparent by default and #409EFF for the active item. Hover state: background #F5F7FA.

**Main content area** (fills remaining space, background #F5F7FA, padding 24px):

**Row 1 — Stats cards** (4 cards in a horizontal row, equal width, 16px gap between them): Each card is white #FFFFFF, border-radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 20px. Cards from left to right:
1. "Pending Approvals" — large number "5" in 32px bold #409EFF, subtitle in 14px #909399, small clock icon top-right in #E6A23C (warning yellow).
2. "My Active Requests" — large number "12" in 32px bold #303133, subtitle in 14px #909399, document icon top-right in #409EFF.
3. "Approved This Month" — large number "28" in 32px bold #67C23A (green), subtitle in 14px #909399, check icon top-right in #67C23A.
4. "Avg. Response Time" — "4.2h" in 32px bold #303133, subtitle in 14px #909399, timer icon top-right in #909399.

**Row 2 — My Recent Requests** (below stats, 16px top gap): A white card (full width, border-radius 8px, shadow, padding 20px). Header row has "My Recent Requests" in 16px bold #303133 on the left, and a text link "View All →" in 14px #409EFF on the right. Below (16px gap), a table with columns: Request ID, Type, Title, Status, Submitted, Assignee. The table has a header row (background #F5F7FA, 14px bold #909399 text). Five data rows, each 48px height, 14px #606266 text, bottom border 1px #EBEEF5. Status column shows colored badges (pill shape, border-radius 10px, 12px text): "Pending" (bg #FDF6EC, text #E6A23C), "Approved" (bg #F0F9EB, text #67C23A), "In Progress" (bg #ECF5FF, text #409EFF), "Rejected" (bg #FEF0F0, text #F56C6C). Request IDs are like "#WF-1234" in 14px #409EFF (clickable link style).

**Row 3 — Quick Actions** (below table, 16px top gap): A row of 3 shortcut buttons (outline style, height 36px, border 1px #DCDFE6, border-radius 4px, 14px text #606266): "Submit Leave Request", "Submit Purchase Order", "View Org Chart". Each has a small icon to the left.

## Design Tokens

| Token | Value |
|-------|-------|
| Top bar height | 64px |
| Side nav width | 220px |
| Page bg | #F5F7FA |
| Card bg | #FFFFFF |
| Card radius | 8px |
| Card shadow | 0 2px 12px rgba(0,0,0,0.1) |
| Card padding | 20px |
| Primary | #409EFF |
| Success | #67C23A |
| Warning | #E6A23C |
| Danger | #F56C6C |
| Text primary | #303133 |
| Text regular | #606266 |
| Text secondary | #909399 |
| Text placeholder | #C0C4CC |
| Border | #DCDFE6 |
| Divider | #EBEEF5 |
| Active nav bg | #ECF5FF |
| Badge radius | 10px |
| Stat number size | 32px bold |
| Table row height | 48px |
| Nav item height | 48px |
| Content padding | 24px |

## States to Generate

1. **Default** — Dashboard with data populated in all cards and table rows
2. **Empty** — New user, zero requests: stats all show "0", table area shows illustration with "No requests yet. Submit your first request!" and a blue CTA button "New Request"
3. **Loading** — Skeleton loaders: 4 pulsing gray rectangles for stat cards, 5 pulsing rows in the table area
4. **Error** — Red banner at top of content area: "Failed to load dashboard data. Retry" with retry button

## Style Direction

- Element Plus component library aesthetic — clean flat cards, subtle shadows, blue accent
- Information density is important: managers need to see status at a glance
- Status badges are color-coded and include text (accessibility: not color-only)
- The side nav is always visible on desktop, providing persistent navigation
- Numbers on stat cards should be large and bold to be scannable from a distance
- Professional, no decorative elements — every pixel serves a function

## Acceptance Criteria

- [ ] Top bar with logo, search, notification bell with badge count, user avatar
- [ ] Side nav with 5 items, active state highlighted, approval count badge
- [ ] 4 stats cards in a row with large numbers and colored icons
- [ ] Recent requests table with 5 rows, status badges, clickable request IDs
- [ ] Quick action buttons row
- [ ] 220px side nav width
- [ ] Status badges use both color and text
- [ ] Notification badge shows count on bell icon
