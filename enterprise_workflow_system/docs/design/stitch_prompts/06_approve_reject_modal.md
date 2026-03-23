# Screen: Approve/Reject Modal

> Route: (overlay on `/approvals` or `/request/:id`) | Platform: Web | Figma Page: Screens — Approval Modal

## Stitch Prompt

A modal overlay for confirming an approve or reject action on a workflow request. Desktop viewport 1440x900px. The background is the Approval Queue page, dimmed with a semi-transparent black overlay (rgba(0,0,0,0.5)).

**Modal card** (520px wide, auto height, centered on screen, white #FFFFFF background, border-radius 8px, shadow 0 4px 24px rgba(0,0,0,0.15)):

**Modal header** (padding 20px 24px, bottom border 1px #EBEEF5, flex row justify-between): Left: title "Approve Request" in 18px bold #303133 (for approve variant) with a green check-circle icon (20px, #67C23A) to the left of the text. Right: close X button (20px, #909399, hover #303133).

**Modal body** (padding 24px):

**Request summary section**: A light gray (#F5F7FA) rounded box (radius 8px, padding 16px). Inside: request ID "#WF-1234" in 14px bold #409EFF, title "Equipment Purchase — CNC Machine" in 14px bold #303133. Below (8px gap), two-column info: "Requester: Wei Chen" and "Department: Engineering" in 14px #606266 on the left column, "Amount: ¥45,000" and "Priority: High" (with orange badge) on the right column. Each info item is 12px gap vertical spacing.

**Comment section** (below summary, 16px gap): Label "Comment (optional)" in 14px #606266 (for approve) or "Comment (required)" in 14px #606266 with a red asterisk (for reject). Below (8px gap), a textarea (full width, 100px height, border 1px #DCDFE6, radius 4px, placeholder "Add a comment for the requester..." in #C0C4CC, 14px). Character count "0/500" in 12px #C0C4CC on the bottom-right of textarea.

**Signature checkbox** (below textarea, 12px gap): A checkbox (16px, unchecked border #DCDFE6, checked fill #409EFF) with label "I confirm this decision complies with company policy" in 14px #606266.

**Modal footer** (padding 16px 24px, top border 1px #EBEEF5, flex row, justify-end, 12px gap between buttons): "Cancel" button (outline style, height 36px, border 1px #DCDFE6, radius 4px, text "Cancel" in 14px #606266) and "Approve" button (bg #67C23A, text white, height 36px, radius 4px, text "Approve" with check icon, 14px bold). The Approve button is disabled (opacity 0.5) until the checkbox is checked.

**Reject variant**: Same modal but: header title is "Reject Request" with a red X-circle icon (#F56C6C). Comment label says "(required)" with red asterisk. The submit button is "Reject" (bg #F56C6C, text white, X icon). The button is disabled until both the comment has text AND the checkbox is checked.

## Design Tokens

| Token | Value |
|-------|-------|
| Overlay bg | rgba(0,0,0,0.5) |
| Modal width | 520px |
| Modal radius | 8px |
| Modal shadow | 0 4px 24px rgba(0,0,0,0.15) |
| Header padding | 20px 24px |
| Body padding | 24px |
| Footer padding | 16px 24px |
| Summary box bg | #F5F7FA |
| Summary box radius | 8px |
| Textarea height | 100px |
| Approve button bg | #67C23A |
| Reject button bg | #F56C6C |
| Cancel button border | 1px #DCDFE6 |
| Button height | 36px |
| Close icon size | 20px |
| Checkbox size | 16px |
| Char count color | #C0C4CC |
| Disabled opacity | 0.5 |

## States to Generate

1. **Approve — Default** — Modal open with approve styling, checkbox unchecked, button disabled
2. **Approve — Ready** — Checkbox checked, optional comment typed, Approve button enabled
3. **Reject — Default** — Modal with reject styling, comment required, both button disabled
4. **Reject — Ready** — Comment filled, checkbox checked, Reject button enabled
5. **Loading** — Button shows spinner, all inputs disabled, "Processing..." text on button

## Style Direction

- Modal is the final confirmation gate — it must prevent accidental approvals/rejections
- Request summary in the modal gives context so the user doesn't have to remember what they're approving
- Compliance checkbox adds a deliberate friction point for audit trail purposes
- Comment is optional for approval but required for rejection (rejection needs justification)
- Color coding is consistent: green for approve, red for reject
- Clean, professional, no unnecessary elements
- Follows Element Plus dialog/modal patterns

## Acceptance Criteria

- [ ] Semi-transparent overlay dimming the background
- [ ] Modal centered with close X button
- [ ] Request summary box with ID, title, requester, department, amount, priority
- [ ] Comment textarea with character count
- [ ] Compliance checkbox
- [ ] Approve button (green) disabled until checkbox is checked
- [ ] Reject variant with required comment and red button
- [ ] Cancel button closes modal
- [ ] Loading state with spinner on button
- [ ] Modal header icon matches action (green check for approve, red X for reject)
