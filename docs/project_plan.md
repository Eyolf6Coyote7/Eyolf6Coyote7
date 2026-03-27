# Project Plan

## Table of Contents

- [Execution Strategy](#execution-strategy)
- [Phase A — Planning (21 Documents, Parallel)](#phase-a-planning-21-documents-parallel)
  - [Round 1: ConOps + ADRs](#round-1-conops-adrs)
  - [Round 2: PRD](#round-2-prd)
  - [Round 3: UI/UX Design (Figma Spec)](#round-3-uiux-design-figma-spec)
  - [Round 4: System Architecture + ADRs](#round-4-system-architecture-adrs)
  - [Round 5: Technical Design + ADRs](#round-5-technical-design-adrs)
  - [Round 6: Development Roadmap](#round-6-development-roadmap)
  - [Round 7: Testing Strategy](#round-7-testing-strategy)
- [Phase B — Development (Serial)](#phase-b-development-serial)
  - [API Layer Pattern (Real vs Mock)](#api-layer-pattern-real-vs-mock)
  - [Development Progress](#development-progress)
- [Phase C — Showcase](#phase-c-showcase)
  - [What Interviewers See](#what-interviewers-see)
- [Workflow](#workflow)
- [AI Co-work](#ai-co-work)

---

## Execution Strategy

- **Phase A (Planning):** All 3 projects in parallel, by phase — ensures tech diversity and shared infra alignment
- **Phase B (Development):** One project at a time, in series — focused implementation and testing
- **Phase C (Showcase):** Deploy static demos, update portfolio, prepare for interviews

## Phase A — Planning (21 Documents, Parallel)

### Round 1: ConOps + ADRs

| # | Task | Status |
|---|------|--------|
| 1.1 | Realtime AI Whiteboard — ConOps + ADRs | Done |
| 1.2 | Enterprise Workflow System — ConOps + ADRs | Done |
| 1.3 | 3D Asset Collaboration — ConOps + ADRs | Done |

### Round 2: PRD

| # | Task | Status |
|---|------|--------|
| 2.1 | Realtime AI Whiteboard — PRD | Done |
| 2.2 | Enterprise Workflow System — PRD | Done |
| 2.3 | 3D Asset Collaboration — PRD | Done |

### Round 3: UI/UX Design (Figma Spec)

| # | Task | Status |
|---|------|--------|
| 3.1 | Realtime AI Whiteboard — UI/UX Design | Done |
| 3.2 | Enterprise Workflow System — UI/UX Design | Done |
| 3.3 | 3D Asset Collaboration — UI/UX Design | Done |

### Round 4: System Architecture + ADRs

| # | Task | Status |
|---|------|--------|
| 4.1 | Realtime AI Whiteboard — System Architecture + ADRs | Done |
| 4.2 | Enterprise Workflow System — System Architecture + ADRs | Done |
| 4.3 | 3D Asset Collaboration — System Architecture + ADRs | Done |

### Round 5: Technical Design + ADRs

| # | Task | Status |
|---|------|--------|
| 5.1 | Realtime AI Whiteboard — Technical Design + ADRs | Done |
| 5.2 | Enterprise Workflow System — Technical Design + ADRs | Done |
| 5.3 | 3D Asset Collaboration — Technical Design + ADRs | Done |

### Round 6: Development Roadmap

| # | Task | Status |
|---|------|--------|
| 6.1 | Realtime AI Whiteboard — Development Roadmap | Done |
| 6.2 | Enterprise Workflow System — Development Roadmap | Done |
| 6.3 | 3D Asset Collaboration — Development Roadmap | Done |

### Round 7: Testing Strategy

| # | Task | Status |
|---|------|--------|
| 7.1 | Realtime AI Whiteboard — Testing Strategy | Done |
| 7.2 | Enterprise Workflow System — Testing Strategy | Done |
| 7.3 | 3D Asset Collaboration — Testing Strategy | Done |

## Phase B — Development (Serial)

Each project follows the same development sequence:

| Step | Task |
|------|------|
| B.1 | Docker Compose + infra setup |
| B.2 | Backend API (with real + mock client API Layer) |
| B.3 | Frontend Web (with environment-based API switching) |
| B.4 | Mobile app |
| B.5 | AI features (Whiteboard: LangGraph, 3D Asset: ONNX) |
| B.6 | Build static demo (mock mode) → deploy to GitHub Pages |
| B.7 | Record demo video |

### API Layer Pattern (Real vs Mock)

Every frontend has two API clients, switched by environment variable:

```
src/api/
├─ client.interface.ts    ← abstract API interface
├─ real-client.ts         ← fetch from local backend (pnpm dev)
├─ mock-client.ts         ← return mock JSON (pnpm dev:mock)
└─ index.ts               ← auto-select based on VITE_API_URL env
```

```bash
pnpm dev          # .env.local   → VITE_API_URL=http://localhost:4001 (real backend)
pnpm dev:mock     # .env.mock    → uses mock data (no backend needed)
pnpm build:demo   # build static demo for GitHub Pages deployment
```

### Development Progress

| # | Project | Status |
|---|---------|--------|
| B.1 | Realtime AI Whiteboard — full implementation | Done |
| B.2 | Enterprise Workflow System — full implementation | Done |
| B.3 | 3D Asset Collaboration — full implementation | Done |

## Phase C — Showcase

| # | Task | Status |
|---|------|--------|
| C.1 | Deploy 3 static demos to GitHub Pages | Done |
| C.2 | Update GitHub Profile README with portfolio links | Done |
| C.3 | Record demo videos (local full-feature version) | Done |
| C.4 | Prepare interview talking points per project | Done |

### What Interviewers See

```
Resume
  ├─ Portfolio: github.com/Eyolf6Coyote7
  └─ Live Demo: eyolf6coyote7.github.io/Eyolf6Coyote7

HR clicks demo link → sees working app (mock data, static)
Interview → candidate runs local version (real backend, AI, Kafka, realtime)
Interviewer reads repo → professional docs, architecture diagrams, ADRs, PR history
```

## Workflow

Every task follows the same git workflow:

```
Issue → Branch → Write doc/code → PR → Claude Review → Gemini Review → Fix comments → Human Merge
```

## AI Co-work

This project is built with **Claude Code** as an AI pair programmer:
- Claude writes docs, code, and PR descriptions
- Claude reviews every PR (architecture + security checklist)
- Gemini Code Review provides a second automated review
- Human makes all merge decisions
- All commits are co-authored: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
