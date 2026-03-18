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

```
1. Write RFC (rfcs/RFC-XXX-feature-name.md)
2. Update PRD (add feature section)
3. Update system_architecture.md (if architecture changes)
4. Write ADR (adrs/ADR-XXX-decision.md) for major tech decisions
5. Update technical_design.md (add feature detail)
6. Update ui_ux_design.md (new Figma screens)
7. Develop
8. Update testing_strategy.md (add test plan for feature)
```

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

```
<project>/v<major>.<minor>.<patch>
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

> Automated via `release-please` GitHub Action on `stable` branch.

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
