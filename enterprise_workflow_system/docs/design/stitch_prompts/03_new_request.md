# Screen: New Request

> Route: `/request/new` | Platform: Web | Figma Page: Screens — New Request

## Stitch Prompt

Desktop web page, 1440px width.

A multi-step form for submitting a new workflow request in an enterprise system. Desktop viewport 1440x900px. Standard layout with top bar (64px) and side nav (220px) as in the employee dashboard. "New Request" nav item is active (blue highlight, blue left border).

**Main content area** (background #F5F7FA, padding 24px):

**Step indicator** (top of content area, full width): A horizontal stepper showing 3 steps connected by lines. Each step is a 32px circle with a number inside, connected by 2px horizontal lines. Step 1 "Select Template" — circle filled #409EFF, white number, text below in 14px bold #409EFF. Step 2 "Fill Details" — circle border 1px #DCDFE6, gray #909399 number, text below in 14px #909399. Step 3 "Review & Submit" — same gray style as step 2. The connecting line between step 1 and 2 is half blue (left) half gray (right), indicating step 1 is complete/active.

**Step 1 — Template Selector** (white card, full width, border-radius 8px, shadow, padding 24px): Title "Choose a Request Template" in 18px bold #303133. Below (16px gap), a search input (width 320px, height 36px, border 1px #DCDFE6, radius 4px, placeholder "Search templates..." with magnifying glass icon). Below (16px gap), a grid of template cards (3 columns, 16px gap): Each template card is 1/3 width, white bg with 1px border #EBEEF5, border-radius 8px, padding 16px, hover: border color #409EFF + shadow increase. Card contents: top has a 40x40px colored icon (each template a different color — blue for "Leave Request", green for "Purchase Order", orange for "Travel Approval", purple for "Equipment Request", teal for "Expense Report", gray for "General Request"). Below the icon, template name in 14px bold #303133. Below, description in 12px #909399 (1-2 lines). Bottom-right has a right-arrow icon in #C0C4CC. Show 6 template cards.

**Step 2 — Dynamic Form** (appears when template is selected, replaces step 1 content): White card with heading showing the selected template name, e.g., "Purchase Order Request" with a small colored icon. Below, the dynamic form fields generated from the template config. Fields include: "Request Title" (text input, full width, required asterisk in red), "Department" (dropdown/select, half width), "Priority" (radio group: Low/Medium/High/Urgent with color dots — green/blue/orange/red), "Amount" (number input with "¥" prefix, half width), "Description" (textarea, full width, 120px height), "Justification" (textarea, full width), "Attachments" (file upload zone — dashed border 2px #DCDFE6, border-radius 8px, 120px height, centered upload icon in #C0C4CC, text "Drag files here or click to upload" in 14px #909399, below "Max 10MB per file. PDF, DOCX, XLSX, JPG" in 12px #C0C4CC). Show one uploaded file chip below: file icon + "quote_2024.pdf (2.3MB)" with an X remove button. Bottom of card: "Back" button (outline style, left) and "Next: Review" button (primary blue, right).

**Step 3 — Review & Submit** (appears after step 2): White card with "Review Your Request" heading. Below, a summary showing all filled fields in a description list format (label in 14px bold #909399 on left, value in 14px #303133 on right, separated by 12px rows with bottom borders). Attached files listed with file icons. Bottom: "Back" button (outline, left), "Submit Request" button (primary blue #409EFF, right) with a paper-plane icon.

## Design Tokens

| Token | Value |
|-------|-------|
| Stepper circle size | 32px |
| Stepper line width | 2px |
| Stepper active color | #409EFF |
| Stepper inactive color | #DCDFE6 |
| Template card border | 1px #EBEEF5 |
| Template card hover border | #409EFF |
| Template card radius | 8px |
| Template icon size | 40x40px |
| Input height | 36px |
| Textarea height | 120px |
| Upload zone height | 120px |
| Upload zone border | 2px dashed #DCDFE6 |
| Required asterisk | #F56C6C |
| File chip bg | #F5F7FA |
| Card padding | 24px |
| Grid columns | 3 |
| Grid gap | 16px |

## States to Generate

1. **Step 1 — Template selection** — Grid of 6 template cards, one hovered
2. **Step 2 — Form filling** — Dynamic form with some fields filled, file uploaded
3. **Step 3 — Review** — Summary of all fields before submission
4. **Validation error** — Step 2 with red borders on required empty fields, red error text below each
5. **Uploading** — File upload zone showing progress bar (60% complete) with file name

## Style Direction

- Multi-step wizard pattern common in enterprise tools
- Step indicator gives clear progress context
- Template cards should feel clickable and distinct — each has its own color identity
- Form follows Element Plus conventions: labels above inputs, asterisks for required fields
- File upload uses drag-and-drop zone pattern
- Review step is read-only summary — builds confidence before submission
- No decorative elements; clean and functional

## Acceptance Criteria

- [ ] 3-step horizontal stepper with active/completed/upcoming states
- [ ] Step 1: searchable grid of 6 template cards with icons, names, descriptions
- [ ] Step 2: dynamic form with text, dropdown, radio, number, textarea, file upload
- [ ] Step 3: read-only summary of all fields
- [ ] File upload zone with drag-and-drop styling and uploaded file chip
- [ ] Required field indicators (red asterisks)
- [ ] Back/Next navigation buttons at bottom of each step
- [ ] Template card hover state with blue border
- [ ] Form validation error state with red text
