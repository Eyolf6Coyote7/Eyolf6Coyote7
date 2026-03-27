# Development Guidelines

---

## Branch Strategy

| Branch | Purpose | Default |
|--------|---------|---------|
| `dev` | Main development line | Yes |
| `stable` | Demo ready / release | No |

Feature branches: `<type>/#<issue-number>-<short-description>`

```
feat/#12-ai-whiteboard-canvas
fix/#5-websocket-reconnect
chore/#8-setup-ci
```

### Development Flow

```
1. Create Issue on GitHub
2. Create branch from dev → git checkout -b feat/#<issue>-xxx dev
3. Develop + Commit (with #issue in message)
4. Push → Create PR → dev
5. Claude + Gemini review → fix comments
6. Merge PR (human only)
7. When milestone ready: PR dev → stable + tag
```

### Release Flow

```bash
gh pr create --base stable --title "release: v0.x.0" --body "..."
# After merge, tag on stable
git checkout stable && git pull
git tag -a <project>/v0.x.0 -m "<project>/v0.x.0: <description>"
git push origin <project>/v0.x.0
```

---

## Commit Convention

```
<type>(scope): <short description> (#<issue-number>)
```

Examples:
```
feat(whiteboard): add full i18n support to all pages (#189)
fix(3d-asset): replace all real brand names with fictional ones (#189)
chore: release dev (#185)
```

| Type | Use Case |
|------|----------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code refactoring |
| `docs` | Documentation |
| `test` | Tests |
| `chore` | Build, tooling, config |

Rules: English, imperative mood, no period, `(scope)` for project, `(#number)` links to issue.

---

## Tag Versioning

| Branch | Format | Example |
|--------|--------|---------|
| `dev` | `<project>/v<X.Y.Z>-rc.<n>` | `whiteboard/v1.10.1-rc.1` |
| `stable` | `<project>/v<X.Y.Z>` | `whiteboard/v1.10.1` |

| Prefix | Project |
|--------|---------|
| `workspace` | Global / cross-project |
| `whiteboard` | Realtime AI Whiteboard |
| `workflow` | Enterprise Workflow System |
| `3d-asset` | 3D Asset Collaboration |

Version bumps via Conventional Commits:

| Commit Type | Bump |
|-------------|------|
| `fix` | patch `0.0.X` |
| `feat` | minor `0.X.0` |
| `BREAKING CHANGE` | major `X.0.0` |

Automated via `release-please` GitHub Action.

---

## API Layer Pattern (Real vs Mock)

Every frontend supports switching between real backend and mock data:

```
src/api/
├─ client.interface.ts    ← abstract API interface
├─ real-client.ts         ← fetches from real backend
├─ mock-client.ts         ← returns mock JSON
└─ index.ts               ← selects client based on env
```

```typescript
// src/api/index.ts
const apiUrl = import.meta.env.VITE_API_URL
export const api: ApiClient = apiUrl
  ? new RealClient(apiUrl)
  : new MockClient()
```

```json
{
  "dev": "vite --mode local",
  "dev:mock": "vite --mode mock",
  "build:demo": "vite build --mode mock"
}
```

---

## Coding Standards

| Rule | Standard |
|------|----------|
| Language | English for all code, comments, commits, docs |
| File naming | `kebab-case` for files, `PascalCase` for classes/components |
| Max file length | 300 lines |
| Max function length | 40 lines |
| PR size | < 400 lines changed |

### Per-project Linting

| Project | Language | Linter | Formatter |
|---------|---------|--------|-----------|
| Whiteboard | TypeScript | ESLint | Prettier |
| Workflow | Kotlin | ktlint | ktfmt |
| Workflow (PHP) | PHP | PHP CS Fixer | PHP CS Fixer |
| 3D Asset | C# | .NET Analyzers | dotnet format |
| 3D Asset (Python) | Python | ruff | ruff |

### Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| Variables / functions | camelCase | `getUserById` |
| Classes / interfaces | PascalCase | `WorkflowService` |
| Constants | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |
| Database tables | snake_case | `approval_step` |
| API endpoints | kebab-case | `/api/v1/approval-steps` |
| Kafka topics | dot-separated | `workflow.approval-events` |
| Feature flags | dot-separated | `workflow.new-approval-ui` |

---

## Security Scanning

| Layer | Tool | What It Finds | When |
|-------|------|--------------|------|
| SAST | Semgrep | Code vulnerabilities (CWE/OWASP) | Every PR (CI) |
| SCA | Trivy | Dependency CVEs | Every PR (CI) |
| Secret Scan | gitleaks | Hardcoded keys, passwords | Every PR (CI) + pre-commit |
| Container Scan | Trivy | Docker image CVEs | On image build |
| Code Review | Claude Code | OWASP checklist, architecture risks | Every PR |

### CVSS Fix Priority

| Score | Severity | Deadline |
|-------|----------|----------|
| 9.0+ | Critical | < 24 hours |
| 7.0-8.9 | High | < 48 hours |
| 4.0-6.9 | Medium | < 1 week |
| < 4.0 | Low | Next sprint |

---

## CI/CD

```
PR opened → GitHub Actions:
├─ Semgrep (SAST)
├─ Trivy (SCA)
├─ gitleaks (secrets)
├─ Per-project lint + build
└─ Claude Code Review (architecture + security)
```

- Auto tag: `release-please` on stable merges
- No cloud deployment — all local development

---

## Definition of Done

- [ ] Code reviewed (Claude + human)
- [ ] Tests pass (unit + relevant integration)
- [ ] Lint + security scan clean
- [ ] Demo mode works (mock client updated)
- [ ] No hardcoded secrets

---
