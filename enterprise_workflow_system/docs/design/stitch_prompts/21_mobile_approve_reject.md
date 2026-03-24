# Screen: Mobile Approve/Reject Confirmation

> Route: `/approvals/:id` | Platform: iOS + Android | Figma Page: Screens — Mobile

## Stitch Prompt

Mobile screen, 390x844px (iPhone 14).

A full-screen mobile confirmation view for approving or rejecting a workflow request. iPhone 14 frame (390x844px). This screen appears after tapping Approve or Reject on a request detail or card.

**Status bar** (47px, dark content).

**Navigation bar** (44px, white bg, bottom border 1px #EBEEF5): Left: "Cancel" text button (17px, #409EFF, 44x44px touch area). Center: "Confirm Approval" in 17px bold #303133 (or "Confirm Rejection" for reject variant). Right: nothing.

**Content** (bg #F5F7FA, padding 16px):

**Action indicator** (centered, 24px top margin): A large circle (64px diameter) with check icon (32px white) on green (#67C23A) background. Below (12px gap): "You are approving this request" in 16px bold #303133, centered. Below (4px gap): "This action cannot be undone" in 14px #909399, centered.

**Request summary card** (below indicator, 24px gap, white, radius 8px, shadow, padding 16px): Compact summary: "#WF-1234" in 14px bold #409EFF. Below (4px): "Equipment Purchase — CNC Machine" in 15px bold #303133. Below (8px): row with "Wei Chen · Engineering" in 13px #909399 and "¥45,000" in 14px bold #303133 on the right. Below (8px): priority badge "High" (bg #FDF6EC, text #E6A23C).

**Comment section** (below summary, 16px gap, white card, radius 8px, shadow, padding 16px): Label "Add a comment" in 14px bold #303133 (for approve: "(optional)" in #909399, for reject: "(required)" in #F56C6C with red asterisk). Below (8px gap): textarea (full width, 120px height, border 1px #DCDFE6, radius 8px, placeholder "Your comment will be visible to the requester..." in #C0C4CC, 14px font). Below textarea: "0/500" character count in 12px #C0C4CC, right-aligned.

**Compliance checkbox** (below comment card, 16px gap, padding 0 16px): Checkbox (24x24px, unchecked border #DCDFE6, checked fill #409EFF, larger than web for touch) + label "I confirm this decision complies with company policy" in 14px #606266. The entire row is a 48px height touch target.

**Confirm button** (below checkbox, 24px gap, padding 0 16px): Full-width button "Approve Request" (48px height, bg #67C23A, white text 16px bold, radius 8px, check icon left of text). Disabled state: opacity 0.5, not tappable until checkbox is checked.

**Reject variant differences**: Large circle is red (#F56C6C) with X icon. Text says "You are rejecting this request". Confirm button says "Reject Request" (bg #F56C6C). Comment is required — button disabled until both comment has text AND checkbox is checked.

## Design Tokens

| Token | Value |
|-------|-------|
| Frame size | 390x844px |
| Action circle size | 64px |
| Action icon size | 32px |
| Approve circle bg | #67C23A |
| Reject circle bg | #F56C6C |
| Summary card radius | 8px |
| Summary card padding | 16px |
| Textarea height | 120px |
| Textarea radius | 8px |
| Checkbox size | 24x24px (touch-friendly) |
| Checkbox touch row height | 48px |
| Confirm button height | 48px |
| Confirm button radius | 8px |
| Approve button bg | #67C23A |
| Reject button bg | #F56C6C |
| Disabled opacity | 0.5 |
| Cancel touch area | 44x44px |

## States to Generate

1. **Approve — Default** — Green indicator, summary, optional comment, checkbox unchecked, button disabled
2. **Approve — Ready** — Checkbox checked, button enabled (full opacity)
3. **Reject — Default** — Red indicator, summary, required comment, checkbox unchecked, button disabled
4. **Reject — Ready** — Comment filled, checkbox checked, button enabled
5. **Processing** — Button shows spinner, "Processing..." text, all inputs disabled
6. **Success** — Full-screen green check animation, "Request Approved" text, auto-navigates back after 2 seconds

## Style Direction

- Full-screen confirmation prevents accidental actions on mobile
- Large action indicator circle makes the intent absolutely clear
- Request summary provides context without having to go back
- Comment textarea is generously sized for mobile thumb typing
- Checkbox is enlarged (24px) for easy touch
- The deliberate confirmation flow: see summary, optionally comment, check compliance, confirm
- Professional and cautious — enterprise decisions need deliberate UX
- Follows iOS full-screen action pattern

## Acceptance Criteria

- [ ] iPhone 14 frame (390x844px)
- [ ] Cancel button in nav bar (44x44px touch area)
- [ ] Large action indicator circle (64px, green or red)
- [ ] Clear text stating the action being taken
- [ ] Request summary card with key details
- [ ] Comment textarea (optional for approve, required for reject)
- [ ] Compliance checkbox (24x24px, 48px touch row)
- [ ] Full-width confirm button (48px height), disabled until checkbox is checked
- [ ] Reject variant requires comment before enabling button
- [ ] All touch targets at least 44x44px
