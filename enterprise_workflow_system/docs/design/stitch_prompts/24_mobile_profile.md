# Screen: Mobile Profile

> Route: `/profile` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

A mobile profile and settings screen following iOS Settings grouped-list pattern for an enterprise workflow app. iPhone 14 frame (390x844px).

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Center: "Profile" in 17px bold #303133.

**Scrollable content** (bg #F5F7FA):

**Profile header** (white bg, padding 20px 16px, centered): 72x72px circular avatar (gray placeholder with user silhouette, or photo). Below (8px gap): "Wei Chen" in 18px bold #303133. Below (2px gap): "Senior Developer · Engineering" in 14px #909399. Below (4px gap): "wei.chen@company.com" in 13px #C0C4CC.

**Group 1 — Account** (iOS grouped-list section, 24px top margin): Section header "ACCOUNT" in 12px bold #909399, uppercase, padding 8px 16px. White rounded card (radius 10px, margin 0 16px): list of rows, each 48px height, padding 0 16px, bottom border 1px #EBEEF5 (last row no border):

Row 1: "Personal Information" in 15px #303133 on left, right-chevron icon (#C0C4CC) on right. Left icon: user circle (20px, #409EFF).
Row 2: "Change Password" with lock icon (20px, #409EFF), chevron right.
Row 3: "Employee ID: EMP-001" in 15px #303133, no chevron (non-navigable), value in #909399.

**Group 2 — Security** (24px top margin): Header "SECURITY". White card:

Row 1: "Two-Factor Authentication" with shield icon (20px, #67C23A) on left, toggle switch (44x24px, ON green #67C23A) on right instead of chevron.
Row 2: "Backup Codes" with key icon (20px, #409EFF), chevron right. Subtitle "5 codes remaining" in 12px #909399 below the title.
Row 3: "Active Sessions" with device icon (20px, #409EFF), chevron right. Badge "2" (bg #ECF5FF, text #409EFF, 18px circle) on right before chevron.

**Group 3 — Notifications** (24px top margin): Header "NOTIFICATIONS". White card:

Row 1: "Push Notifications" with bell icon (20px, #409EFF), toggle ON.
Row 2: "Email Notifications" with mail icon (20px, #409EFF), toggle ON.
Row 3: "SMS Alerts" with phone icon (20px, #909399), toggle OFF (gray).
Row 4: "Quiet Hours" with moon icon (20px, #409EFF), chevron right. Subtitle "22:00 — 07:00" in 12px #909399.

**Group 4 — About** (24px top margin): Header "ABOUT". White card:

Row 1: "App Version" in 15px #303133, "1.0.0 (Build 42)" in 15px #909399 on right, no chevron.
Row 2: "Terms of Service" with document icon, chevron right.
Row 3: "Privacy Policy" with shield icon, chevron right.
Row 4: "Help & Support" with question-mark icon, chevron right.

**Logout button** (24px top margin, centered, padding 0 16px): Full-width white card, radius 10px, single row: "Log Out" in 15px #F56C6C, centered text, 48px height. No icon.

**Bottom spacing**: 32px below logout for comfortable scroll end.

**Tab bar** (bottom, 83px): "Profile" tab active (#409EFF).

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Avatar size | 72x72px |
| Name size | 18px bold #303133 |
| Role text | 14px #909399 |
| Section header | 12px bold #909399, uppercase |
| Row height | 48px |
| Row text | 15px #303133 |
| Row subtitle | 12px #909399 |
| Row icon size | 20px |
| Row icon colors | #409EFF (default), #67C23A (security on), #909399 (disabled) |
| Chevron | 16px #C0C4CC |
| Toggle width | 44px |
| Toggle height | 24px |
| Toggle ON | #67C23A |
| Toggle OFF | #DCDFE6 |
| Group card radius | 10px |
| Group card margin | 0 16px |
| Section gap | 24px |
| Logout text | 15px #F56C6C |
| Badge circle | 18px, bg #ECF5FF, text #409EFF |

## States to Generate

1. **Default** — Full profile with all groups, 2FA on, mixed notification toggles
2. **2FA disabled** — Security toggle OFF, "Two-Factor Authentication" row has red warning text "Not enabled" in 12px #F56C6C as subtitle
3. **Logout confirmation** — iOS-style action sheet from bottom: "Are you sure you want to log out?" title, "Log Out" red destructive button, "Cancel" button, dimmed background
4. **Loading** — Skeleton avatar circle and pulsing row placeholders

## Style Direction

- iOS Settings grouped-list pattern — the standard for mobile settings screens
- White rounded card groups on gray background create clear visual sections
- Each row has a left icon, label, and right accessory (chevron, toggle, value, or badge)
- Toggle switches for binary on/off settings, chevrons for navigable rows
- Section headers are uppercase, small, gray — iOS convention
- Logout is visually distinct: red text, separate card, centered
- Professional and familiar — users intuitively know how to navigate this pattern
- Touch targets are all 48px height (exceeds 44px minimum)

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Profile header with avatar, name, role, email
- [ ] 4 grouped sections: Account, Security, Notifications, About
- [ ] iOS-style grouped-list cards with rounded corners
- [ ] Rows with left icons, labels, and right accessories (chevrons, toggles, values)
- [ ] 2FA toggle switch in Security section
- [ ] Notification toggles (Push, Email, SMS)
- [ ] Quiet Hours row with time subtitle
- [ ] App version displayed in About section
- [ ] Logout button in separate red-text card
- [ ] Section headers uppercase gray
- [ ] Tab bar with Profile active
- [ ] All touch targets at least 44x44px (48px row height)
