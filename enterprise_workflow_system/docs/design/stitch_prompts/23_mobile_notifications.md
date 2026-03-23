# Screen: Mobile Notifications

> Route: `/notifications` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile notifications list screen for an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Left: back arrow (44x44px touch area). Center: "Notifications" in 17px bold #303133. Right: "Mark All Read" text button (14px, #409EFF, 44px touch area height).

**Content** (bg #F5F7FA, full height):

**Notification list** — full-screen list with no padding on sides (notifications are full-width for edge-to-edge feel).

**Unread section header**: "New" in 13px bold #909399, padding 12px 16px 8px.

Notification rows — each row is full width, 80px min height, white bg, padding 16px, bottom border 1px #EBEEF5:

**Unread notification** (has a blue dot indicator): Row layout: Left: blue dot (8px, #409EFF, 4px from left edge, vertically centered). Then 12px gap. Icon area: a 40x40px circle with colored background and white icon. Content area (flex-grow, padding-right 16px): Title in 15px bold #303133 (e.g., "Request Approved"). Body in 14px #606266 (e.g., "Your leave request #WF-1289 has been approved by Li Wei"). Time in 12px #C0C4CC (e.g., "5 min ago"). Right: chevron icon (16px, #C0C4CC).

Notification 1 (unread): Green circle icon (check), title "Request Approved", body about leave request approved, "5 min ago".

Notification 2 (unread): Blue circle icon (user), title "Approval Required", body "Equipment Purchase #WF-1234 needs your approval. Amount: ¥45,000", "23 min ago".

Notification 3 (unread): Orange circle icon (warning), title "Escalation Notice", body "Travel Approval #WF-1235 has been escalated due to overdue deadline", "1h ago".

**Read section header**: "Earlier" in 13px bold #909399, padding 12px 16px 8px.

Read notification rows — same layout but: no blue dot, title is 15px regular (not bold) #606266, body is 14px #909399, overall slightly faded appearance.

Notification 4 (read): Gray circle icon (bell), title "Reminder", body "Purchase Order #WF-1267 is awaiting your response for 24h", "Yesterday".

Notification 5 (read): Green circle icon, "Request Completed", "Equipment Purchase #WF-1200 workflow completed", "Yesterday".

Notification 6 (read): Blue circle icon, "New Comment", "Li Wei commented on #WF-1234: 'Please provide the updated quote'", "2 days ago".

Notification 7 (read): Red circle icon (X), "Request Rejected", "Expense Report #WF-1210 rejected by Zhang Min", "3 days ago".

Show 7 notifications total (3 unread, 4 read).

**Empty state**: If no notifications, centered illustration with bell icon, "No notifications yet. You'll be notified when there's activity on your requests." in 14px #909399.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Notification row min height | 80px |
| Notification padding | 16px |
| Unread dot size | 8px |
| Unread dot color | #409EFF |
| Icon circle size | 40x40px |
| Icon circle colors | Green: #67C23A, Blue: #409EFF, Orange: #E6A23C, Red: #F56C6C, Gray: #909399 |
| Unread title | 15px bold #303133 |
| Read title | 15px regular #606266 |
| Unread body | 14px #606266 |
| Read body | 14px #909399 |
| Time text | 12px #C0C4CC |
| Section header | 13px bold #909399 |
| Chevron icon | 16px #C0C4CC |
| Row border | 1px #EBEEF5 |

## States to Generate

1. **Default** — 3 unread + 4 read notifications grouped by New/Earlier
2. **All read** — No "New" section, all notifications in "Earlier" with no blue dots
3. **Empty** — No notifications with centered illustration and text
4. **Swipe to delete** — One notification swiped left revealing red "Delete" action area
5. **Loading** — Skeleton notification rows pulsing

## Style Direction

- Notification list follows iOS notification center patterns
- Unread/read distinction is clear: blue dot, bold title, darker text for unread
- Colored icon circles provide instant categorization by notification type
- Tapping a notification navigates to the relevant request
- "Mark All Read" is a common utility for notification management
- Grouped by New/Earlier for temporal context
- Full-width rows for edge-to-edge feel on mobile
- Professional, enterprise — notification types are work-related

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Nav bar with back arrow and "Mark All Read" button
- [ ] Notifications grouped: "New" (unread) and "Earlier" (read)
- [ ] Unread notifications have blue dot indicator
- [ ] Each notification has colored icon circle, title, body, time, chevron
- [ ] Unread items visually bolder than read items
- [ ] 7 notifications showing various types (approved, required, escalation, reminder, comment, rejected)
- [ ] Chevron icon on each row (tappable)
- [ ] All touch targets at least 44x44px
- [ ] Empty state with illustration and message
