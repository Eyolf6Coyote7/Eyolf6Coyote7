# Development Guidelines

## Development Phases

Each project follows the same document lifecycle. Phases are sequential for initial development.

### Initial Development (v0 → v1)

| Phase | Document | Purpose |
|-------|----------|---------|
| 1 | `conops.md` | Concept of Operations — product vision, target users, high-level scenarios |
| 2 | `prd.md` | Product Requirements — features, user stories, acceptance criteria |
| 3 | `system_architecture.md` | System design — components, data flow, infrastructure |
| 4 | `technical_design.md` | Implementation detail — APIs, DB schema, algorithms |
| 5 | `ui_ux_design.md` | UI/UX — wireframes, Figma links, design system |
| 6 | `development_roadmap.md` | Timeline — milestones, priorities, dependencies |
| 7 | `testing_strategy.md` | Test plan — unit, integration, E2E, load |

### Feature Iteration (v1+)

For new features after initial release, don't rewrite docs. Follow this flow:

1. Write RFC (`rfcs/RFC-XXX-feature-name.md`)
2. Update `prd.md` (add feature section)
3. Update `system_architecture.md` (if architecture changes)
4. Write ADR (`adrs/ADR-XXX-decision.md`) for major tech decisions
5. Update `technical_design.md` (add feature detail)
6. Update `ui_ux_design.md` (new Figma screens)
7. Update `testing_strategy.md` (add test plan for feature)
8. Develop

### Document Update Frequency

| Document | When to Update |
|----------|---------------|
| `conops.md` | Rarely — only when product direction changes |
| `prd.md` | Per major feature — append section, don't rewrite |
| `system_architecture.md` | Major architecture changes only |
| `technical_design.md` | Per feature — add implementation detail |
| `ui_ux_design.md` | Per feature — link new Figma screens |
| `development_roadmap.md` | Per milestone — update timeline |
| `testing_strategy.md` | Per feature — add test plan |
| `adrs/` | Append only — one file per major decision, never edit old ADRs |
| `rfcs/` | Per major feature — write before development, mark status when done |

### ADR (Architecture Decision Record)

Records **why** a technical decision was made. Written after making a tech choice. Never edited — if a decision is reversed, write a new ADR that supersedes it.

| Property | Description |
|---|---|
| **Answers** | Why did we choose A over B? |
| **When** | After making a technical choice |
| **Size** | Short — one decision per file |
| **Editable** | No — append only. New ADR supersedes old one |

File: `adrs/ADR-XXX-short-name.md`

```markdown
# ADR-001: Why Temporal over Bull for workflow engine

## Status
Accepted

## Context
We need a workflow engine for multi-step approval flows.

## Decision
Use Temporal instead of Bull.

## Reason
- Bull is a job queue, not a workflow engine
- Temporal supports long-running workflows with retry/timeout
- Temporal has built-in state persistence

## Consequences
- Need to run Temporal server (Docker, ~2.5GB RAM)
- Team needs to learn Temporal SDK
```

### RFC (Request for Comments)

A **proposal** written before developing a major feature. Describes the problem, proposed solution, and alternatives considered. Status is updated as it progresses.

| Property | Description |
|---|---|
| **Answers** | How should we implement this feature? |
| **When** | Before starting development of a major feature |
| **Size** | Detailed — full proposal with alternatives |
| **Editable** | Yes — update status (Draft → Approved → Implemented) |

File: `rfcs/RFC-XXX-short-name.md`

```markdown
# RFC-001: Realtime Cursor Sync

## Status
Implemented (whiteboard/v0.3.0)

## Problem
Users can't see other people's cursors on the whiteboard.

## Proposal
WebSocket broadcast cursor position via Redis Pub/Sub,
throttled to 60fps.

## Alternatives Considered
1. Polling — too slow (200ms+ latency)
2. SSE — one-directional, can't send cursor from client

## Decision
Approved. Implemented in PR #15.
```

### ADR vs RFC

| | ADR | RFC |
|---|-----|-----|
| **Purpose** | Record a tech decision | Propose a feature implementation |
| **Timing** | After deciding | Before developing |
| **Scope** | One decision | One feature |
| **Mutability** | Never edit, only supersede | Update status field |

---

## Branch Strategy

### Long-lived Branches

| Branch   | Purpose                        | Default |
| -------- | ------------------------------ | ------- |
| `dev`    | Main development line          | ✅ Yes  |
| `stable` | Stable version / demo ready    | No      |

> No `main` branch. `dev` is the GitHub default branch.

### Feature Branches

Format: `<type>/#<issue-number>-<short-description>`

```
feature/#12-ai-whiteboard-canvas
fix/#5-websocket-reconnect
chore/#8-setup-ci
```

### Development Flow

```
1. Create Issue on GitHub
2. Create feature branch from dev
   └─ git checkout -b feature/#<issue>-xxx dev
3. Develop + Commit (with #issue in message)
4. Push feature branch
5. Create PR → dev
6. Merge PR (squash or merge commit)
7. When milestone ready: PR dev → stable + tag
```

> ⚠️ Never push before the issue exists.

### Release Flow (dev → stable)

```bash
gh pr create --base stable --title "🚀release: v0.x.0" --body "..."
# After merge, tag on stable
git checkout stable && git pull
git tag -a <project>/v0.x.0 -m "<project>/v0.x.0: <description>"
git push origin <project>/v0.x.0
```

---

## Commit Convention

### Format

```
<emoji><type>#<issue-number>: <short description>
```

If no issue number, use scope:

```
<emoji><type>(<scope>): <short description>
```

### Types & Emoji

| Type       | Emoji | Use Case                              |
| ---------- | ----- | ------------------------------------- |
| `feat`     | ✨    | New feature                           |
| `fix`      | 🐛    | Bug fix                               |
| `refactor` | ♻️    | Code refactoring (no behavior change) |
| `docs`     | 📘    | Documentation only                    |
| `test`     | 🧪    | Adding/updating tests                 |
| `chore`    | 📦    | Build, tooling, config changes        |
| `style`    | 🎨    | Formatting, whitespace (no logic)     |
| `init`     | 🎉    | Initial project setup                 |

### Rules

1. Emoji + Type always together, type lowercase
2. `#<number>` if linked to a GitHub issue
3. `(<scope>)` if no issue — e.g. `(whiteboard)`, `(ci)`
4. English, imperative mood, no period
5. Body: bullet points (optional for small commits)

---

## Tag Versioning

### Format

| Branch | Tag Format | Example |
|--------|-----------|---------|
| `dev` | `<project>/v<major>.<minor>.<patch>-rc.<n>` | `workspace/v0.2.0-rc.1` |
| `stable` | `<project>/v<major>.<minor>.<patch>` | `workspace/v0.2.0` |

**RC = Release Candidate** — a version that is feature-complete but not yet verified as stable. It's the "this should be ready, but let's test first" version. When an RC is promoted to `stable` without changes, the `-rc.N` suffix is dropped.

```
dev:    workspace/v0.2.0-rc.1  →  workspace/v0.2.0-rc.2  (fixes)
stable: workspace/v0.2.0       (promoted from rc.2, same code)
```

### Project Prefixes

| Prefix       | Project                    |
| ------------ | -------------------------- |
| `workspace`  | Global / cross-project     |
| `whiteboard` | Realtime AI Whiteboard     |
| `workflow`   | Enterprise Workflow System |
| `3d-asset`   | 3D Asset Collaboration     |

### Version Bumping (Conventional Commits + SemVer)

| Commit Type | Version Bump | Trigger |
| ----------- | ------------ | ------- |
| `fix`       | **patch** `0.0.X` | Bug fix, backward compatible |
| `feat`      | **minor** `0.X.0` | New feature, backward compatible |
| any + `BREAKING CHANGE` footer | **major** `X.0.0` | Not backward compatible |
| `docs`, `chore`, `style`, `refactor`, `test` | **no release** | No version bump |

> Automated via `release-please` GitHub Action. Triggers on push to both `dev` (RC tags) and `stable` (release tags).

---

## Branch Protection

> ⚠️ Deferred until repo is set to public (GitHub Free limitation).

Target rules:

| Branch   | Rules                                        |
| -------- | -------------------------------------------- |
| `dev`    | PR only, no direct push                      |
| `stable` | PR only, no direct push, require review      |

---

## CI/CD

- **CI**: GitHub Actions on self-hosted runner (macOS ARM64)
  - Runs on PR to `dev` and `stable`
  - Commit message lint (planned)
  - Per-project test jobs (planned)
- **CD**: None — all local development, no cloud deployment
- **Auto Review**: Claude Code reviews PRs with architecture mermaid diagrams
- **Auto Tag**: `release-please` creates tags on `stable` merges

---

## Git Identity

Per-repo config (not global):

```bash
git config user.name "wolf04"
git config user.email "mickey985ha@gmail.com"
```

## GitHub CLI

Switch to personal account before operations:

```bash
gh auth switch --user coyote7wolf
```
