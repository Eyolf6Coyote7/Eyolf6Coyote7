# Screen: Upload

> Route: `/upload` | Platform: Web | Figma Page: Screens — Upload

## Stitch Prompt

Desktop web page, 1440px width.

The asset upload page with drag-and-drop zone, progress tracking, and metadata form. Light theme, desktop 1440x900.

**Top bar** (56px height, white background, border-bottom 1px #E5E7EB):
- Left: Back arrow + "Back to Library" (14px, #6B7280).
- Center: "Upload Asset" in bold 18px #111827.
- Right: Empty.

**Main content** — Centered container (800px max-width, 32px padding), white background, vertically scrollable.

**Step indicator** (top, full width): Three steps in a horizontal row connected by lines. Step 1: "Upload File" (indigo filled circle with "1" in white, bold 14px #6366F1 text below). Step 2: "Add Metadata" (gray #D1D5DB outline circle with "2", gray text). Step 3: "Review & Submit" (same gray). Connecting lines: completed = #6366F1, pending = #D1D5DB. Line is 2px, between circle centers.

**Step 1 — Upload zone** (below steps, 32px top margin):
- Drag-and-drop area: 100% width, 280px height, dashed border 2px #D1D5DB, border-radius 12px, #F9FAFB background. Center content (vertically + horizontally):
  - Cloud upload icon (48px, #9CA3AF).
  - "Drag and drop your 3D file here" in bold 16px #374151.
  - "or" in 14px #9CA3AF.
  - "Browse Files" button — indigo (#6366F1) text, white bg, border 1px #6366F1, radius 8px, 40px height, 14px bold.
  - "Supported formats: GLB, FBX, OBJ, USD — Max 500 MB" in 12px #9CA3AF.
- **Drag-over state**: Border changes to 2px solid #6366F1, background #EEF2FF, icon turns indigo.

**Upload progress** (appears after file dropped, replaces dropzone):
- File info row: 3D cube icon (24px, #6366F1) + filename "air-max-2026-hero.glb" bold 14px #111827 + "52 MB" in 14px #9CA3AF + X cancel button (right-aligned, #EF4444).
- Progress bar: 100% width, 8px height, #E5E7EB background track, #6366F1 fill (animated, currently at 68%), border-radius 4px.
- Below bar: "68% · 34 MB / 52 MB · ~12s remaining" in 12px #9CA3AF (left). "gRPC chunked upload" badge in 10px #9CA3AF, border 1px #E5E7EB, radius 4px (right).

**Step 2 — Metadata form** (below upload, 32px top margin, becomes active after upload completes):
- Two-column grid (16px gap):
  - Left: "Asset Name" label (bold 12px #6B7280) + text input (full width, 44px, radius 8px, pre-filled "air-max-2026-hero").
  - Right: "Brand" label + dropdown select (full width, 44px, radius 8px, "Nike" selected, chevron down).
- Full-width row: "Description" label + textarea (100% width, 100px height, radius 8px, placeholder "Describe this asset...").
- **Tags section**: Label "Tags" (bold 12px #6B7280). Row of existing tag pills + input. Below: "AI Suggestions" section — 3 suggested tags with dashed (#6366F1) border and sparkle icon: "shoe" "sneaker" "hero-shot". Each suggestion is a pill (radius 16px, dashed border 1px #6366F1, #6366F1 text, 14px) with a "+" icon to accept. Accepted tags become solid pills (filled #6366F1 bg, white text).

**Step 3 — Review & Submit** (below metadata):
- Summary card: light gray (#F9FAFB) background, radius 12px, padding 16px. Shows: filename, format, size, brand, tags, description in a compact key-value layout.
- "Upload Asset" button: full width, 48px height, indigo (#6366F1) bg, white text, bold 16px, radius 8px.

## Design Tokens

| Token | Value |
|-------|-------|
| Container max-width | 800px |
| Dropzone height | 280px |
| Dropzone border | 2px dashed #D1D5DB |
| Dropzone radius | 12px |
| Dropzone bg | #F9FAFB |
| Dropzone active border | 2px solid #6366F1 |
| Dropzone active bg | #EEF2FF |
| Progress bar height | 8px |
| Progress bar track | #E5E7EB |
| Progress bar fill | #6366F1 |
| Progress bar radius | 4px |
| Input height | 44px |
| Input radius | 8px |
| AI tag border | 1px dashed #6366F1 |
| Tag radius | 16px |
| Primary | #6366F1 |
| Text primary | #111827 |
| Text secondary | #6B7280 |
| Text muted | #9CA3AF |
| Danger | #EF4444 |

## States to Generate

1. **Default — Step 1** — Empty dropzone, waiting for file
2. **Drag-over** — File being dragged over zone, indigo highlight border and background
3. **Uploading** — Progress bar at 68%, file info visible, cancel button
4. **Upload complete + Step 2** — Green checkmark on file, metadata form active, AI tag suggestions visible
5. **Error — Upload failed** — Red progress bar, "Upload failed — network error" message, "Retry" button
6. **Review — Step 3** — Summary card visible, submit button enabled

## Style Direction

- Step-by-step wizard feels guided and approachable
- Drag-and-drop is the primary interaction — the zone is large and prominent
- gRPC chunked upload with progress gives confidence for large 3D files
- AI tag suggestions reduce manual work — the sparkle icon signals AI assistance
- Metadata form is simple — only essential fields, not a wall of inputs
- Professional upload experience suited for production asset pipelines

## Acceptance Criteria

- [ ] Three-step wizard indicator: Upload File, Add Metadata, Review & Submit
- [ ] Drag-and-drop zone: 280px height, dashed border, cloud icon, browse button
- [ ] Supported formats listed: GLB, FBX, OBJ, USD
- [ ] Upload progress: filename, size, progress bar with percentage, cancel button
- [ ] Metadata form: name, brand dropdown, description textarea, tags
- [ ] AI tag suggestions with dashed border + sparkle icon
- [ ] Review summary card before final submit
- [ ] Primary submit button (indigo)
