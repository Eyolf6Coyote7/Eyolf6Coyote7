# Development Guidelines

> All infrastructure runs locally. No cloud services. Docker Compose for orchestration.

---

## Branch Strategy

### Long-lived Branches

| Branch   | Purpose                              | Protection                          |
| -------- | ------------------------------------ | ----------------------------------- |
| `dev`    | Main development line (default)      | PR only, no direct push             |
| `stable` | Stable version / demo ready          | PR only, no direct push, require review |

- No `main` branch — `dev` is the GitHub default
- All feature branches merge to `dev` via PR
- `stable` is only updated from `dev` when a milestone is ready

### Feature Branch Naming

```
<type>/#<issue-number>-<short-description>
```

Examples:
- `feature/#12-ai-whiteboard-canvas`
- `fix/#5-websocket-reconnect`
- `chore/#8-setup-ci`

---

## Development Flow

```
1. Create GitHub Issue
2. Create feature branch from dev
   └─ git checkout -b <type>/#<issue>-<description> dev
3. Develop + Commit (reference #issue in every commit)
4. Push feature branch
5. Create PR → dev (use PR template)
6. Claude auto-reviews PR (self-hosted runner)
7. Merge PR (squash or merge commit)
8. When milestone ready: PR dev → stable + auto-tag via release-please
```

---

## Commit Convention

### Format

```
<emoji><type>#<issue>: <short description>
```

No issue number? Use scope:
```
<emoji><type>(<scope>): <short description>
```

### Types & Emoji

| Type       | Emoji | Use Case                              | Version Bump |
| ---------- | ----- | ------------------------------------- | ------------ |
| `feat`     | ✨    | New feature                           | minor        |
| `fix`      | 🐛    | Bug fix                               | patch        |
| `refactor` | ♻️    | Code refactoring (no behavior change) | none         |
| `docs`     | 📘    | Documentation only                    | none         |
| `test`     | 🧪    | Adding/updating tests                 | none         |
| `chore`    | 📦    | Build, tooling, config changes        | none         |
| `style`    | 🎨    | Formatting, whitespace (no logic)     | none         |
| `init`     | 🎉    | Initial project setup                 | minor        |

### Rules

1. Emoji + Type always together, type lowercase
2. Reference issue number `#<number>` in every commit
3. English, imperative mood, no period
4. Body: bullet points for main changes (optional for small commits)
5. Add `BREAKING CHANGE:` in commit footer for major version bump

### Examples

```
✨feat#12: add real-time cursor sync
🐛fix#5: resolve websocket disconnect
🎉init(workspace): initialize folder structure
📦chore(ci): add GitHub Actions workflow
```

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

### SemVer Rules (Conventional Commits)

| Commit Type              | Version Bump       |
| ------------------------ | ------------------ |
| `fix`                    | patch `0.0.X`      |
| `feat`                   | minor `0.X.0`      |
| any + `BREAKING CHANGE`  | major `X.0.0`      |
| `docs/chore/style/refactor/test` | no release |

> Automated via `release-please` GitHub Action on `stable` branch.

---

## Pull Request

### PR Title

Same format as commit:
```
<emoji><type>#<issue>: <short description>
```

### PR Body

Use the template at `.github/pull_request_template.md`:
- Summary (what & why)
- Changes (files/modules affected)
- Test Plan
- Related Issues

### Auto Review

Every PR triggers Claude Code Review (self-hosted runner):
- Code review with severity levels
- Mermaid architecture diagram of affected components
- Risk assessment

---

## CI/CD

| Workflow | Trigger | What It Does |
|----------|---------|--------------|
| `ci.yml` | PR to dev/stable, push to dev | Lint, commit format check, tests |
| `claude-review.yml` | PR opened/updated | Auto code review + mermaid diagram |
| `release-please.yml` | Push to stable | Auto-tag based on conventional commits |

All workflows run on **self-hosted runner** (local Mac).

---

## Code Standards

- All code and documentation in **English**
- Each project has its own tech stack — see `docs/global_tech_stack.md`
- Shared infrastructure via Docker Compose — see `docs/global_infra.md`
- 8-phase development flow per project:
  1. Project Proposal
  2. Product Spec
  3. System Architecture
  4. Technical Design
  5. UI/UX Design (Figma)
  6. Development Roadmap
  7. Development
  8. Testing
