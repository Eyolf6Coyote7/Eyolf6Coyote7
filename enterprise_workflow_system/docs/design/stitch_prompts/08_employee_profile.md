# Screen: Employee Profile

> Route: `/profile` | Platform: Web | Figma Page: Screens — Profile

## Stitch Prompt

Desktop web page, 1440px width.

A user profile and settings page for an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px) and side nav (220px). "Profile" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header**: "My Profile" in 20px bold #303133.

**Two-column layout** (16px gap below header, left column 60%, right column 40%, 24px gap between):

**Left column**:

Card 1 — "Personal Information" (white, radius 8px, shadow, padding 24px): A horizontal layout at the top: 80x80px circular avatar (gray placeholder with user silhouette) on the left, to the right: name "Wei Chen" in 18px bold #303133, email "wei.chen@company.com" in 14px #909399, department "Engineering" and role "Senior Developer" in 14px #606266. A small "Edit" text button in #409EFF next to the name. Below (24px gap), a form with fields (disabled/read-only by default, editable when Edit is clicked): "Full Name" (text input, full width), "Email" (text input, full width, disabled always — managed by SSO), "Phone" (text input, half width), "Department" (text input, half width, disabled — set by admin), "Employee ID" (text input, half width, disabled), "Join Date" (text input, half width, disabled). Disabled fields have bg #F5F7FA and text #909399. Below: "Save Changes" button (primary blue, hidden by default, appears when editing) and "Cancel" button (outline).

Card 2 — "Two-Factor Authentication" (white, radius 8px, shadow, padding 24px, 16px gap below card 1): Header row: "Two-Factor Authentication" in 16px bold #303133, right side has a toggle switch (Element Plus style, 40px wide, green #67C23A when on, gray #DCDFE6 when off — currently ON). Below, status text: "2FA is enabled. Your account is protected with an authenticator app." in 14px #67C23A (green text with a shield-check icon). Below (16px gap): "Backup Codes" section — text "You have 5 unused backup codes remaining" in 14px #606266, with a "Regenerate Codes" outline button and a "View Codes" text link in #409EFF.

**Right column**:

Card 3 — "Notification Preferences" (white, radius 8px, shadow, padding 24px): Title "Notification Preferences" in 16px bold #303133. Below, a list of notification toggles, each row (48px height, bottom border 1px #EBEEF5): Left: notification type text in 14px #303133. Right: toggle switch. Items:
- "Email — Approval requests" — ON (green)
- "Email — Status updates" — ON
- "Email — Weekly digest" — OFF (gray)
- "Push — New approvals" — ON
- "Push — Request updates" — ON
- "Push — Reminders" — OFF
- "SMS — Urgent escalations" — ON

Below toggles (16px gap): "Quiet Hours" section — "Do not disturb" text in 14px #303133, with two time pickers: "From 22:00" "To 07:00" (each 100px wide, height 36px).

Card 4 — "Active Sessions" (white, radius 8px, shadow, padding 20px, 16px gap below card 3): Title "Active Sessions" in 16px bold #303133. Two session rows: each shows a device icon (laptop or phone), "Chrome on macOS — Current" in 14px #303133 with "Shanghai, CN · Last active now" in 12px #909399, and a "Revoke" text button in #F56C6C for non-current sessions. Second row: phone icon, "WorkflowOS App on iOS", "Shanghai, CN · Last active 1h ago", "Revoke" button.

## Design Tokens

| Token | Value |
|-------|-------|
| Avatar size | 80x80px |
| Name size | 18px bold |
| Toggle switch width | 40px |
| Toggle ON | #67C23A |
| Toggle OFF | #DCDFE6 |
| Disabled field bg | #F5F7FA |
| Disabled field text | #909399 |
| Notification row height | 48px |
| Session row height | 56px |
| Left column width | 60% |
| Right column width | 40% |
| Column gap | 24px |
| Card padding | 24px |
| Card radius | 8px |
| Card shadow | 0 2px 12px rgba(0,0,0,0.1) |
| Revoke button color | #F56C6C |
| 2FA enabled color | #67C23A |
| Time picker width | 100px |

## States to Generate

1. **Default** — Profile view with 2FA enabled, notification toggles mixed on/off
2. **Editing** — Personal info fields editable (white bg, active borders), Save/Cancel buttons visible
3. **2FA Disabled** — Toggle OFF, red warning text "2FA is disabled. Enable it to protect your account." with red shield icon
4. **Save success** — Green toast notification at top-right "Profile updated successfully"

## Style Direction

- Profile page follows the settings-page pattern common in enterprise tools
- Information is grouped by category in separate cards
- Disabled fields are clearly differentiated from editable ones
- 2FA status should be visually prominent — security is important in enterprise
- Notification preferences use toggle switches for quick scanning
- Active sessions provide security transparency
- No decorative elements; functional and clean

## Acceptance Criteria

- [ ] User avatar, name, email, department, role displayed
- [ ] Personal info form with editable and read-only fields
- [ ] 2FA section with toggle switch and status text
- [ ] Backup codes information and regenerate button
- [ ] Notification preferences with 7 toggle switches
- [ ] Quiet hours time pickers
- [ ] Active sessions list with revoke capability
- [ ] Edit/Save/Cancel flow for personal info
- [ ] Two-column layout (60/40 split)
- [ ] Disabled fields visually distinct from editable fields
