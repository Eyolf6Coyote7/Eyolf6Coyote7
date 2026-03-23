# Screen: Mobile Notifications

> Route: `/notifications` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

The notifications list screen showing asset upload events and IoT alerts with read/unread states. iPhone 14 frame (390x844px). Light theme.

**Status bar** (47px, iOS default).

**Navigation bar** (44px height, white bg, border-bottom 1px #E5E7EB):
- Center: "Notifications" bold 17px #111827.
- Right: "Mark all read" link (14px #6366F1, 44x44px tap target).

**Filter tabs** (below nav bar, 44px height, white bg, border-bottom 1px #E5E7EB, 16px horizontal padding):
- Three tabs in a row: "All" (active, #6366F1 text, bottom border 2px #6366F1), "Assets" (#6B7280), "IoT Alerts" (#6B7280). Each tab 44px min tap height, equal width. 15px font.

**Notification list** (fills space between tabs and tab bar, scrollable, #F9FAFB background):

Each notification is a card (full width, white bg, 16px horizontal padding, 12px vertical padding, border-bottom 1px #E5E7EB):

**Unread notifications** (have #EEF2FF left border 3px + slightly blue-tinted bg #FAFBFF):

1. **Asset notification** (unread):
   - Left: Icon circle (40x40px, #EEF2FF bg, centered upload-cloud icon 20px #6366F1).
   - Content (12px left margin, fills width):
     - "Jake Liu uploaded a new version" bold 15px #111827.
     - "Air Max 2026 — Hero Shot v4" 14px #6366F1 (tappable asset name).
     - "2 minutes ago" 13px #9CA3AF.
   - Right: Blue unread dot (8px, #6366F1), vertically centered.
   - Full card is tappable (min 44px height, actual ~80px).

2. **IoT alert notification** (unread, critical):
   - Left: Icon circle (40x40px, #FEE2E2 bg, centered alert-triangle icon 20px #EF4444).
   - Content:
     - "Critical: Motor C temperature exceeded threshold" bold 15px #111827.
     - "95.2 C (threshold: 80 C) · Factory Floor" 14px #EF4444.
     - "15 minutes ago" 13px #9CA3AF.
   - Right: Blue unread dot + red severity indicator.

3. **IoT warning notification** (unread):
   - Left: Icon circle (40x40px, #FEF3C7 bg, alert-triangle 20px #F59E0B).
   - Content:
     - "Warning: Conveyor belt vibration elevated" bold 15px #111827.
     - "4.2g (threshold: 5g) · Factory Floor" 14px #F59E0B.
     - "45 minutes ago" 13px #9CA3AF.
   - Right: Blue unread dot.

**Read notifications** (normal white bg, no left border, no blue dot):

4. **Asset notification** (read):
   - Left: Icon circle (40x40px, #F3F4F6 bg, upload-cloud 20px #9CA3AF).
   - Content:
     - "Sarah Park shared 'Packaging Concept' with you" 15px #374151 (not bold).
     - "Packaging Concept v1" 14px #6366F1.
     - "3 hours ago" 13px #9CA3AF.

5. **IoT resolved notification** (read):
   - Left: Icon circle (40x40px, #ECFDF5 bg, check-circle 20px #10B981).
   - Content:
     - "Resolved: Motor C temperature returned to normal" 15px #374151.
     - "42 C · Factory Floor" 14px #10B981.
     - "1 hour ago" 13px #9CA3AF.

6-8. Three more read notifications with varying content (new asset uploaded, version update, weekly digest).

**Empty timestamp separators** between groups: "Today" and "Yesterday" labels in 12px #9CA3AF, centered, 32px height, #F9FAFB bg.

**Tab bar** (bottom, 49px + 34px home indicator): 4 tabs — Assets, Search, Notifications (active, #6366F1, bell icon filled), Profile. Badge on Notifications tab shows "3".

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Nav bar height | 44px |
| Filter tab height | 44px |
| Notification min height | 80px |
| Icon circle size | 40x40px |
| Unread left border | 3px #EEF2FF |
| Unread bg | #FAFBFF |
| Unread dot | 8px #6366F1 |
| Asset icon bg | #EEF2FF |
| Critical icon bg | #FEE2E2 |
| Warning icon bg | #FEF3C7 |
| Success icon bg | #ECFDF5 |
| Read icon bg | #F3F4F6 |
| Primary | #6366F1 |
| Critical | #EF4444 |
| Warning | #F59E0B |
| Success | #10B981 |
| Text primary | #111827 |
| Text secondary | #374151 |
| Text muted | #9CA3AF |
| Tab bar height | 49px + 34px |
| Touch target min | 44x44px |

## States to Generate

1. **Default** — Mixed notifications (3 unread, 5 read), "All" tab active
2. **Assets filter** — Only asset-related notifications shown
3. **IoT Alerts filter** — Only IoT alerts shown (critical, warning, resolved)
4. **Empty** — Bell icon (48px, #D1D5DB) + "No notifications yet" 17px #374151 + "You'll be notified when assets are uploaded or IoT alerts trigger" 15px #9CA3AF
5. **All read** — No blue dots, no unread styling, "Mark all read" link disabled/hidden

## Style Direction

- iOS notification list pattern — familiar, scannable, thumb-friendly
- Color-coded icon backgrounds instantly communicate notification type
- Unread state is multi-signal: bold text + blue dot + blue-tinted background + left border
- IoT alert notifications use severity colors (red/yellow) for urgency
- Resolved notifications use green to confirm the issue is handled
- Timestamp separators ("Today", "Yesterday") group notifications chronologically
- Tappable notifications navigate to the relevant asset or IoT dashboard
- Filter tabs let users focus on what matters (Assets vs IoT Alerts)

## Acceptance Criteria

- [ ] iPhone 14 frame: 390x844px
- [ ] Nav bar: "Notifications" title, "Mark all read" link
- [ ] Filter tabs: All, Assets, IoT Alerts
- [ ] Unread notifications: bold text, blue dot, blue tint background, left border
- [ ] Read notifications: normal weight text, white background
- [ ] Asset notifications: upload icon, asset name link, timestamp
- [ ] IoT critical: red icon bg, red severity text, alert details
- [ ] IoT warning: yellow icon bg, yellow severity text
- [ ] IoT resolved: green icon bg, green text
- [ ] Timestamp group separators ("Today", "Yesterday")
- [ ] Tab bar: Notifications tab active with badge
- [ ] All touch targets >= 44x44px
