---
name: git
description: >-
  Personal Git workflow for github.self.com repos: commit, push, PR, issue, project.
  Auto-activates when repo remote URL contains github.self.com. Does NOT use Metropia conventions.
  Triggers: "self commit", "self PR", "self issue", "self project", "push to personal".
---

# Self Git Workflow Skill

Personal Git workflow for **github.self.com** repos (user: `coyote7wolf`).

> **Auto-detection**: If remote URL contains `github.self.com` → use this skill, NOT the Metropia `git` skill.

---

## Prerequisites

**1. Git user config** — ensure per-repo user config is set before first commit:

```bash
git config user.name "<your-name>"
git config user.email "<your-email>"
```

> Verify with `git config user.name` before first commit.

**2. Workflow order** — always follow this sequence:

```
Create Issue → Branch from dev → Commit (with #issue) → Push → PR to dev
```

> Never push before the issue exists. Commit message must reference the issue number.
> Feature branches always branch from `dev` and PR back to `dev`.

---

## Branch Strategy

### Long-lived Branches

```
dev       ← main development line (GitHub default branch)
stable    ← stable version / demo ready
```

- `dev`: all feature/fix branches merge here via PR
- `stable`: only updated from `dev` when a version is ready to demo/release
- **No `main` branch** — `dev` is the default

### Feature Branch Naming

Format: `<type>/#<issue-number>-<short-description>`

Examples:
- `feature/#12-ai-whiteboard-canvas`
- `fix/#5-websocket-reconnect`
- `chore/#8-setup-ci`

### Development Flow

```
1. Create Issue
2. Create feature branch from dev
   └─ git checkout -b feature/#<issue>-xxx dev
3. Develop + Commit (with #issue)
4. Push feature branch
5. Create PR → dev
6. Merge PR (squash or merge commit)
7. When milestone ready: PR dev → stable + tag version
```

### Release Flow (dev → stable)

```bash
# Create PR from dev to stable
gh pr create --base stable --title "🚀release: v0.x.0" --body "..."

# After merge, tag on stable
git checkout stable && git pull
git tag -a <project>/v0.x.0 -m "<project>/v0.x.0: <milestone description>"
git push origin <project>/v0.x.0
```

### Tag Versioning

Format: `<project>/v<major>.<minor>.<patch>`

**Project prefixes:**

| Prefix       | Project                    |
| ------------ | -------------------------- |
| `workspace`  | Global / cross-project     |
| `whiteboard` | Realtime AI Whiteboard     |
| `workflow`   | Enterprise Workflow System |
| `3d-asset`   | 3D Asset Collaboration     |

**Version bumping (Conventional Commits + SemVer):**

Version is determined by commit types since last tag — not manually decided.

| Commit Type | Version Bump | Trigger |
| ----------- | ------------ | ------- |
| `fix`       | **patch** `0.0.X` | Bug fix, backward compatible |
| `feat`      | **minor** `0.X.0` | New feature, backward compatible |
| any type + `BREAKING CHANGE` in footer | **major** `X.0.0` | Breaking change, not backward compatible |
| `docs`, `chore`, `style`, `refactor`, `test` | **no release** | No version bump |

> Automated via `release-please` GitHub Action.

**Examples:**

```
workspace/v0.1.0     ← first feat commits (folder structure + docs)
whiteboard/v0.1.0    ← first feat commits (proposal + spec)
whiteboard/v0.1.1    ← fix: correct API schema typo
whiteboard/v0.2.0    ← feat: add canvas realtime sync
whiteboard/v1.0.0    ← feat + BREAKING CHANGE: redesign WebSocket protocol
```

### Branch Protection Rules

| Branch   | Rules                                |
| -------- | ------------------------------------ |
| `dev`    | PR only, no direct push             |
| `stable` | PR only, no direct push, require review |

---

## Commit Message

### Format

```
<emoji><type>#<issue-number>: <short description>
```

If no issue number, use scope instead:

```
<emoji><type>(<scope>): <short description>
```

Body (optional):

```
- <change 1>
- <change 2>

<detailed explanation>
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

1. **Emoji + Type**: always together, type lowercase
2. **Issue number**: `#<number>` if linked to a GitHub issue
3. **Scope**: `(<scope>)` if no issue number — e.g. `(whiteboard)`, `(ci)`, `(docs)`
4. **Description**: English, imperative mood, no period
5. **Body**: bullet points for main changes (optional for small commits)
6. **Keep it concise**

### Examples

With issue number:
```
✨feat#12: add real-time cursor sync
🐛fix#5: resolve websocket disconnect
```

With scope (no issue):
```
🎉init(workspace): initialize fullstack_ai_workspace folder structure
📦chore(ci): add GitHub Actions workflow
```

Detailed:
```
✨feat#12: add real-time cursor sync for whiteboard

- Implement WebSocket broadcast for cursor positions
- Add throttle to reduce message frequency
- Support multi-user color assignment
```

---

## Push

```bash
# First push - set upstream
git push -u origin <branch-name>

# Subsequent pushes
git push
```

---

## Pull Request

### Create PR

```bash
gh pr create --title "<emoji><type>#<issue>: <title>" --body "$(cat <<'EOF'
## Summary

<1-3 bullet points explaining what and why>

## Changes

- <file/module>: <what changed>

## Test Plan

<How to test, or "N/A">
EOF
)"
```

### PR Title Format

```
<emoji><type>#<issue>: <short description>
<emoji><type>(<scope>): <short description>
```

---

## Issue

### Create Issue

```bash
gh issue create --title "<title>" --body "$(cat <<'EOF'
## Description

<What is the issue or feature request>

## Acceptance Criteria

- [ ] <criteria 1>
- [ ] <criteria 2>

## Notes

<Additional context>
EOF
)"
```

### Common Commands

| Action             | Command                                      |
| ------------------ | -------------------------------------------- |
| Create issue       | `gh issue create --title "..." --body "..."`  |
| List issues        | `gh issue list`                               |
| View issue         | `gh issue view <number>`                      |
| Close issue        | `gh issue close <number>`                     |
| Reopen issue       | `gh issue reopen <number>`                    |
| Add labels         | `gh issue edit <number> --add-label "bug"`    |
| Assign             | `gh issue edit <number> --add-assignee @me`   |

---

## Project (GitHub Projects v2)

```bash
# List projects
gh project list

# View project items
gh project item-list <project-number>

# Add issue to project
gh project item-add <project-number> --url <issue-url>
```

---

## Quick Reference

| Action             | Command                                    |
| ------------------ | ------------------------------------------ |
| Commit             | `git commit -m "<emoji><type>#<issue>: desc"` |
| Push (first time)  | `git push -u origin <branch>`              |
| Push (subsequent)  | `git push`                                 |
| Create PR          | `gh pr create --title "..." --body "..."`  |
| View PR            | `gh pr view`                               |
| Create issue       | `gh issue create ...`                      |
| List issues        | `gh issue list`                            |
| List projects      | `gh project list`                          |
