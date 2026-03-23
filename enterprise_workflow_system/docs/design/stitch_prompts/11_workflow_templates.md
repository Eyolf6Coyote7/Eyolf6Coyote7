# Screen: Workflow Templates

> Route: `/admin/templates` | Platform: Web | Figma Page: Screens — Admin Templates

## Stitch Prompt

An admin page listing all workflow templates in an enterprise approval system. Desktop viewport 1440x900px. Standard layout with top bar (64px, Admin badge) and admin side nav (220px). "Workflow Templates" nav item is active.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "Workflow Templates" in 20px bold #303133, subtitle "Define and manage approval workflows" in 14px #909399. Right: "Create Template" button (primary, bg #409EFF, white text, 36px height, radius 4px, plus icon + text).

**Template grid** (below header, 16px gap, 3 columns, 16px gap between cards):

Each template card (white, radius 8px, shadow 0 2px 12px rgba(0,0,0,0.1), padding 0 — image/header area + content area):

Card header area (160px height, bg gradient — each card a different subtle color): Top-right corner has a status badge: "Published" (bg #F0F9EB, text #67C23A, 12px, radius 10px) or "Draft" (bg #F5F7FA, text #909399). Centered in the header: a large icon (48px) representing the template type — document icon for Leave, shopping cart for Purchase, plane for Travel, etc. in white with slight shadow.

Card body (padding 16px): Template name in 16px bold #303133 (e.g., "Leave Request", "Purchase Order", "Travel Approval", "Equipment Request", "Expense Report", "General Request"). Below (4px gap), description in 13px #909399, 2 lines max, truncated with ellipsis. Below (12px gap), a row of metadata: "5 steps" with a steps icon in 12px #909399, "·", "Avg 4.2h" with clock icon, "·", "Used 89 times" with chart icon. Below (12px gap), a horizontal divider 1px #EBEEF5. Below (12px gap), a footer row with: "Last edited: Dec 15, 2024" in 12px #C0C4CC on the left, and two icon buttons on the right: edit (pencil, 28x28px, hover bg #F5F7FA) and duplicate (copy icon, 28x28px) and delete (trash, 28x28px, hover text #F56C6C).

Show 6 template cards total. The first 4 are "Published" (green badge), the 5th is "Draft" (gray badge, card has a subtle dashed top border instead of gradient header), the 6th is a "Create New" placeholder card (dashed border 2px #DCDFE6, centered plus icon 48px #C0C4CC, text "Create New Template" in 14px #909399, hover: border color #409EFF, text #409EFF).

## Design Tokens

| Token | Value |
|-------|-------|
| Card header height | 160px |
| Card header gradients | Leave: #409EFF→#66B1FF, Purchase: #67C23A→#85CE61, Travel: #E6A23C→#EBB563, Equipment: #F56C6C→#F78989, Expense: #909399→#A6A9AD, General: #606266→#787B80 |
| Template icon size | 48px |
| Card body padding | 16px |
| Status Published | bg #F0F9EB, text #67C23A |
| Status Draft | bg #F5F7FA, text #909399 |
| Metadata text | 12px #909399 |
| Action icon size | 28x28px |
| Action icon hover bg | #F5F7FA |
| Delete icon hover | #F56C6C |
| Create card border | 2px dashed #DCDFE6 |
| Grid columns | 3 |
| Grid gap | 16px |

## States to Generate

1. **Default** — 6 cards: 4 published, 1 draft, 1 create-new placeholder
2. **Hover on template card** — Card shadow increases, subtle lift effect
3. **Empty** — No templates: centered illustration, "No workflow templates yet. Create your first template to get started." with blue CTA
4. **Loading** — 6 skeleton cards with pulsing gradient headers and content blocks
5. **Delete confirmation** — Small popover on the trash icon: "Delete this template? This cannot be undone." with "Cancel" and "Delete" (red) buttons

## Style Direction

- Card grid provides visual overview of all available templates
- Color-coded headers make templates instantly distinguishable
- Metadata row (steps, avg time, usage) helps admins evaluate template effectiveness
- Published vs Draft status is clearly indicated
- The "Create New" placeholder card invites action without a separate button
- Professional and organized — templates are the backbone of the workflow system
- Edit, duplicate, delete actions are compact icons to keep cards clean

## Acceptance Criteria

- [ ] Page title with Create Template button
- [ ] 3-column grid of template cards
- [ ] Each card has colored header with icon, name, description, metadata, actions
- [ ] Published/Draft status badges
- [ ] Metadata row: step count, avg turnaround, usage count
- [ ] Edit, duplicate, delete action icons on each card
- [ ] "Create New" placeholder card with dashed border
- [ ] Card hover state with elevation increase
- [ ] Delete confirmation popover
- [ ] Draft card visually distinguished from published cards
