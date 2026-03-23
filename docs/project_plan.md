# Project Plan

## Execution Strategy

- **Phase A (Planning):** All 3 projects in parallel, by phase — ensures tech diversity and shared infra alignment
- **Phase B (Development):** One project at a time, in series — focused implementation and testing

## Phase A — Planning (21 Documents)

### Round 1: ConOps + ADRs

| # | Task | Status |
|---|------|--------|
| 1.1 | Realtime AI Whiteboard — ConOps + ADRs | Not started |
| 1.2 | Enterprise Workflow System — ConOps + ADRs | Not started |
| 1.3 | 3D Asset Collaboration — ConOps + ADRs | Not started |

### Round 2: PRD

| # | Task | Status |
|---|------|--------|
| 2.1 | Realtime AI Whiteboard — PRD | Not started |
| 2.2 | Enterprise Workflow System — PRD | Not started |
| 2.3 | 3D Asset Collaboration — PRD | Not started |

### Round 3: UI/UX Design (Figma Spec)

| # | Task | Status |
|---|------|--------|
| 3.1 | Realtime AI Whiteboard — UI/UX Design | Not started |
| 3.2 | Enterprise Workflow System — UI/UX Design | Not started |
| 3.3 | 3D Asset Collaboration — UI/UX Design | Not started |

### Round 4: System Architecture + ADRs

| # | Task | Status |
|---|------|--------|
| 4.1 | Realtime AI Whiteboard — System Architecture + ADRs | Not started |
| 4.2 | Enterprise Workflow System — System Architecture + ADRs | Not started |
| 4.3 | 3D Asset Collaboration — System Architecture + ADRs | Not started |

### Round 5: Technical Design + ADRs

| # | Task | Status |
|---|------|--------|
| 5.1 | Realtime AI Whiteboard — Technical Design + ADRs | Not started |
| 5.2 | Enterprise Workflow System — Technical Design + ADRs | Not started |
| 5.3 | 3D Asset Collaboration — Technical Design + ADRs | Not started |

### Round 6: Development Roadmap

| # | Task | Status |
|---|------|--------|
| 6.1 | Realtime AI Whiteboard — Development Roadmap | Not started |
| 6.2 | Enterprise Workflow System — Development Roadmap | Not started |
| 6.3 | 3D Asset Collaboration — Development Roadmap | Not started |

### Round 7: Testing Strategy

| # | Task | Status |
|---|------|--------|
| 7.1 | Realtime AI Whiteboard — Testing Strategy | Not started |
| 7.2 | Enterprise Workflow System — Testing Strategy | Not started |
| 7.3 | 3D Asset Collaboration — Testing Strategy | Not started |

## Phase B — Development (Serial)

| # | Task | Status |
|---|------|--------|
| B.1 | Realtime AI Whiteboard — Docker setup + full implementation | Not started |
| B.2 | Enterprise Workflow System — Docker setup + full implementation | Not started |
| B.3 | 3D Asset Collaboration — Docker setup + full implementation | Not started |

## Workflow

Every task follows the same git workflow:

```
Issue → Branch → Write doc → PR → Claude Review → Gemini Review → Fix comments → Human Merge
```

## AI Co-work

This project is built with **Claude Code** as an AI pair programmer:
- Claude writes docs, code, and PR descriptions
- Claude reviews every PR (architecture + security checklist)
- Gemini Code Review provides a second automated review
- Human makes all merge decisions
- All commits are co-authored: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
