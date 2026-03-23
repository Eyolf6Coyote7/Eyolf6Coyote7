# Screen: Template Editor

> Route: `/admin/templates/:id` | Platform: Web | Figma Page: Screens — Template Editor

## Stitch Prompt

A drag-and-drop workflow template editor for admins in an enterprise approval system. Desktop viewport 1440x900px. Standard top bar (64px, Admin badge). No side nav on this screen — full-width editor layout (the side nav is replaced by the editor panels).

**Editor top bar** (below main top bar, 48px height, white bg, bottom border 1px #EBEEF5, flex row): Left: back arrow icon (20px, #606266) + "Edit: Purchase Order Template" in 16px bold #303133 + status badge "Draft" (gray) or "Published" (green). Center: nothing. Right: "Save Draft" button (outline, 36px height, #606266 border) + "Publish" button (primary, bg #409EFF, 36px height) + "Preview" button (outline, #409EFF border and text).

**Three-panel layout** (fills remaining height):

**Left panel — Step Library** (240px wide, white bg, right border 1px #EBEEF5, padding 16px): Title "Steps" in 14px bold #303133 at top. Below, a list of draggable step types. Each step is a card (full width, 52px height, bg #F5F7FA, radius 4px, 8px gap between items, cursor: grab). Step types: "Approval Step" (blue circle icon #409EFF + text), "Review Step" (green circle #67C23A), "Notification Step" (yellow bell #E6A23C), "Condition Branch" (purple diamond #7C3AED), "Parallel Split" (orange split-arrows #E6A23C), "Auto-Action" (gray gear #909399). Each has a drag handle (6 dots) on the left. Below the step list (24px gap), "Form Fields" section title. Draggable field types: "Text Input", "Number", "Date Picker", "Dropdown", "File Upload", "Textarea". Same card style but smaller (44px height), with field-type icons.

**Center panel — Canvas** (flex-grow, bg #FAFAFA with subtle dot grid): The workflow canvas shows a vertical flow chart of steps connected by arrows.

Start node: rounded pill (120px wide, 36px height, bg #409EFF, white text "Start", centered horizontally at top).

Arrow down (40px, #DCDFE6, 2px wide with arrowhead).

Step 1: "Manager Approval" card (280px wide, auto height, white bg, radius 8px, shadow, border-left 4px #409EFF, padding 16px). Inside: step icon (blue circle, 24px) + "Manager Approval" in 14px bold #303133. Below: "Assignee: Department Manager" in 12px #909399. Below: "Deadline: 24 hours" in 12px #909399 with clock icon. Below: "Escalation: Auto-escalate to Director" in 12px #E6A23C with warning icon. The card has a blue selected border (2px solid #409EFF) because it is currently selected. Small drag handle at top center.

Arrow down.

Step 2: Parallel split node — a diamond shape (48px, bg #E6A23C, white split icon). Two arrows branch left and right.

Left branch: Step 2a "Finance Review" card (same style as step 1, 240px wide, border-left #67C23A).
Right branch: Step 2b "Legal Review" card (240px wide, border-left #7C3AED).

Both branches connect via arrows back to a merge diamond (48px, bg #E6A23C).

Arrow down to Step 3: "Director Approval" card (280px wide, border-left #409EFF).

Arrow down to End node: rounded pill (120px wide, 36px height, bg #67C23A, white text "Complete").

Drop zone indicators: dashed rectangles (140px tall, border 2px dashed #C0C4CC, text "Drop step here" in 14px #C0C4CC) appear between existing steps when dragging.

**Right panel — Properties** (320px wide, white bg, left border 1px #EBEEF5, padding 20px, scrollable): Title "Step Properties" in 16px bold #303133. Subtitle "Manager Approval" with blue dot in 14px #409EFF. Below (16px gap), form fields for the selected step:

- "Step Name" text input (full width, value "Manager Approval")
- "Step Type" dropdown (value "Approval", disabled)
- "Assignee Rule" dropdown (value "Department Manager", options: Specific User, Department Manager, Role-based, Requester's Manager)
- "Deadline" number input (value "24") + unit dropdown (value "hours")
- "Escalation" section: toggle ON, "Escalate to" dropdown (value "Director"), "After" input "48" + "hours"
- "Required Approvals" number input (value "1", min 1)
- "Allow Delegation" toggle (OFF)
- "Notification" section: checkboxes "Email assignee" (checked), "Push notification" (checked), "Notify requester on completion" (checked)

Bottom of right panel: "Delete Step" text button in #F56C6C.

## Design Tokens

| Token | Value |
|-------|-------|
| Left panel width | 240px |
| Right panel width | 320px |
| Canvas bg | #FAFAFA |
| Canvas dot grid | #E5E7EB, 20px spacing |
| Step card width | 240-280px |
| Step card radius | 8px |
| Step card selected border | 2px solid #409EFF |
| Step left border | 4px colored |
| Start node | bg #409EFF, 120x36px, radius 18px |
| End node | bg #67C23A, 120x36px, radius 18px |
| Diamond node | 48px, bg #E6A23C |
| Arrow color | #DCDFE6 |
| Arrow width | 2px |
| Drop zone border | 2px dashed #C0C4CC |
| Draggable step height | 52px |
| Draggable field height | 44px |
| Step library item bg | #F5F7FA |
| Editor top bar height | 48px |

## States to Generate

1. **Default** — Template with 3 steps + parallel branch, step 1 selected, properties panel showing
2. **Dragging a step** — A step from the left panel being dragged onto the canvas, drop zones visible between existing steps
3. **Empty template** — New template: canvas shows only Start and End nodes with a single drop zone between them, properties panel shows template-level settings (name, description)
4. **Validation error** — A step has a red border with error icon: "Assignee rule is required" in red text. Publish button disabled with tooltip "Fix errors before publishing"

## Style Direction

- Visual flow chart editor inspired by workflow/BPMN tools
- Drag-and-drop is the primary interaction — steps from library to canvas
- Three-panel layout: library (left), canvas (center), properties (right)
- The canvas uses a flowchart paradigm: top-to-bottom, connected by arrows
- Parallel branches visually split and merge with diamond nodes
- Selected step is clearly indicated with blue border and matching properties panel
- Properties panel provides all configuration for the selected step
- Professional, tool-like interface — no decorative elements

## Acceptance Criteria

- [ ] Editor top bar with template name, status badge, Save/Publish/Preview buttons
- [ ] Left panel with draggable step types and form field types
- [ ] Canvas with vertical flowchart: Start → Steps → Parallel branch → End
- [ ] Step cards show name, assignee, deadline, escalation info
- [ ] Selected step has blue border highlight
- [ ] Parallel branch with diamond split/merge nodes
- [ ] Right panel with step properties form (name, assignee rule, deadline, escalation, notifications)
- [ ] Drop zone indicators between steps when dragging
- [ ] Delete Step button in properties panel
- [ ] Dot grid background on canvas
