---
name: web-vitals-storybook-harness
description: Wire vitest unit tests + Storybook component stories + web-vitals RUM + Lighthouse CI for asset-portal, matching the project's quality harness.
---

## When to use

Trigger when the user asks to:
- add a test / story / lighthouse check to `asset-portal`
- set up the same QA harness in a new sub-app
- mentions `vitest`, `storybook`, `web-vitals`, `lighthouse`, `initWebVitals`, `*.stories.tsx`, `*.test.ts`
- improve test coverage or performance budgets

## Context

`asset-portal` ships a multi-layer quality harness; each layer is independent and can be invoked separately:

1. **vitest unit tests** — `*.test.ts(x)` colocated next to source files. Run via `pnpm test` or `pnpm test:unit`. Use `vi.fn()`, `vi.useFakeTimers()`, `import.meta.env` mocking.
2. **Storybook stories** — `*.stories.tsx` colocated. Each major component AND each major page has a story (e.g. `IoTDashboardPage.stories.tsx`, `ThreeViewer.stories.tsx`). Stories serve as visual regression baselines.
3. **web-vitals RUM** — `asset-portal/src/vitals.ts` + `asset-portal/src/main.tsx:9` calls `initWebVitals()` at app startup. Reports CLS / LCP / INP / FID / TTFB to console (or external endpoint when wired).
4. **Lighthouse CI** — workflow under `.github/workflows/` (or local `lhci` script in package.json). Runs against the dev build with budget assertions on perf / a11y / best-practices.
5. **Decorators** — `asset-portal/src/stories/decorators.tsx` provides shared Storybook decorators (theme provider wrapper, router wrapper) that every story imports.

The pattern: every NEW page or component MUST ship a story AND a test in the same PR. Tests cover logic; stories cover visual + interaction.

## Operating instructions

When adding a new component or page:

1. Create the source file (`Foo.tsx` or `FooPage.tsx`).
2. Create `Foo.test.tsx` next to it. Cover any non-trivial logic (callbacks, state machines, conditional rendering). Use `@testing-library/react` for DOM assertions.
3. Create `Foo.stories.tsx` next to it. Use the project's existing story shape (see `LanguageToggle.stories.tsx` or `IoTDashboardPage.stories.tsx`). Wrap with shared decorators from `stories/decorators.tsx`.
4. Run `pnpm test` to verify the test passes.
5. Run `pnpm storybook` locally to verify the story renders.
6. If the new code affects perf-critical paths (above-the-fold render, large bundle additions), run `pnpm lhci` to confirm budgets still hold.
7. NEVER ship a new page without both a story AND a test in the same PR.

When wiring web-vitals into a NEW sub-app:

1. Install `web-vitals` package.
2. Create `src/vitals.ts` exporting `initWebVitals()` that calls `onCLS`, `onLCP`, `onINP`, `onFID`, `onTTFB` and posts to console (or to `/metrics` if a backend is wired).
3. Call `initWebVitals()` ONCE from `src/main.tsx` BEFORE `createRoot(...)`.
4. Add the workflow yml file mirroring asset-portal's lighthouse workflow.

## Reusable prompts / code patterns

vitest test skeleton:
```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Foo from "./Foo";

describe("Foo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders the title", () => {
    render(<Foo title="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Foo onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

Storybook story skeleton:
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import Foo from "./Foo";
import { withRouter, withTheme } from "../stories/decorators";

const meta = {
  title: "Components/Foo",
  component: Foo,
  decorators: [withTheme, withRouter],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Foo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Hello" },
};

export const Loading: Story = {
  args: { title: "Loading...", loading: true },
};
```

web-vitals init pattern:
```ts
import { onCLS, onLCP, onINP, onFID, onTTFB } from "web-vitals";

export function initWebVitals() {
  const report = (metric: { name: string; value: number; id: string }) => {
    console.log(`[web-vitals] ${metric.name} = ${metric.value.toFixed(2)} (id: ${metric.id})`);
    // navigator.sendBeacon('/metrics', JSON.stringify(metric));
  };
  onCLS(report);
  onLCP(report);
  onINP(report);
  onFID(report);
  onTTFB(report);
}
```

## Anti-patterns

- Do NOT ship a component without a story — Storybook is the visual regression baseline.
- Do NOT skip the test file — even simple components benefit from a render-without-crash test.
- Do NOT call `initWebVitals` after `createRoot` — call it BEFORE so initial paint metrics are captured.
- Do NOT use `jest` syntax — this project is on `vitest`. Use `vi.fn()` not `jest.fn()`.
- Do NOT inline decorators in each story — import from `stories/decorators.tsx`.
- Do NOT relax Lighthouse budgets to make a failing run pass — fix the regression instead.

## References

- `asset-portal/src/vitals.ts` — `initWebVitals` definition
- `asset-portal/src/main.tsx:9-11` — `initWebVitals()` invocation
- `asset-portal/src/stories/decorators.tsx` — shared Storybook decorators
- `asset-portal/src/components/ThreeViewer.stories.tsx` — canonical story example
- `asset-portal/src/api/mock-client.test.ts` — canonical test example
