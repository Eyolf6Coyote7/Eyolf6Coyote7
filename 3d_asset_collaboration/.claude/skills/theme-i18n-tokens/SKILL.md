---
name: theme-i18n-tokens
description: Wire CSS variable theme tokens + useTheme hook + react-i18next bootstrap for asset-portal, supporting dark/light mode + en/zh-TW locale.
when_to_use:
  - add dark / light mode toggle to `asset-portal
  - add a new locale (e.g. ja-JP) or new translation keys
  - mentions `useTheme`, `data-theme`, `var(--bg-surface)`, `theme.css`, `i18next
  - bootstrap a new sub-app with the same theming + i18n stack
tech_stack:
  - react
  - css-variables
  - react-i18next
  - dark-light-theme
harness: fe-csr
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add dark / light mode toggle to `asset-portal`
- add a new locale (e.g. ja-JP) or new translation keys
- mentions `useTheme`, `data-theme`, `var(--bg-surface)`, `theme.css`, `i18next`
- bootstrap a new sub-app with the same theming + i18n stack

## Context

`asset-portal` uses a minimal CSS-variable theme system + react-i18next, NOT a CSS-in-JS library:

1. **Theme tokens** live in `asset-portal/src/theme.css` as `:root[data-theme="dark"] { --bg-surface: #...; --text-primary: #...; }` blocks. Components consume via inline `var(--bg-surface)` style.
2. **Theme switch** managed by `asset-portal/src/hooks/useTheme.ts:1-18` — reads `localStorage.getItem("theme")` (default `"dark"`), writes `document.documentElement.setAttribute("data-theme", theme)` in a `useEffect`, persists to localStorage.
3. **Theme toggle component** at `asset-portal/src/components/ThemeToggle.tsx` calls `useTheme().toggle()`.
4. **i18n** initialized in `asset-portal/src/i18n/index.ts:1-16` with `i18n.use(initReactI18next).init({ resources: { en, "zh-TW" }, lng: localStorage.getItem("lang") || "en", fallbackLng: "en" })`.
5. **Locale switch** via `LanguageToggle` component (`asset-portal/src/components/LanguageToggle.tsx`) which calls `i18n.changeLanguage(newLang)` + `localStorage.setItem("lang", newLang)`.
6. Components consume i18n via `import { useTranslation } from "react-i18next"; const { t } = useTranslation();` then `t("namespace.key")`.

The theme + i18n stack is intentionally lightweight — no MUI, no Tailwind, no styled-components. The whole system is < 50 lines + a CSS file.

## Operating instructions

When adding a new theme token:

1. Open `asset-portal/src/theme.css`. Add the variable to BOTH `:root[data-theme="dark"]` AND `:root[data-theme="light"]` blocks. Missing one breaks the other theme silently.
2. Use the variable in components via inline `style={{ background: "var(--bg-new)" }}`.
3. Document the token here if it becomes a project-wide one.

When adding a new translation key:

1. Open `asset-portal/src/i18n/en.json` AND `asset-portal/src/i18n/zh-TW.json`. Add the key to BOTH files in the same commit. Missing one falls back to English silently which is wrong for QA.
2. Use a top-level namespace per page: `dashboard.title`, `upload.dropzone`, `nav.assets`, etc.
3. In components: `const { t } = useTranslation(); t("dashboard.title")`. NEVER inline literal strings.

When adding a new locale:

1. Create `asset-portal/src/i18n/<lang>.json` mirroring `en.json` exactly.
2. Import in `i18n/index.ts` and add to `resources: { en, "zh-TW", <lang> }`.
3. Add the locale to `LanguageToggle` component's button list.
4. Test fallback behavior — missing keys should fall back to `en`.

## Reusable prompts / code patterns

`useTheme` hook (do not modify, copy verbatim if cloning to a new sub-app):
```tsx
import { useState, useEffect } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
```

i18n bootstrap (do not modify, copy verbatim):
```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import zhTW from "./zh-TW.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "zh-TW": { translation: zhTW },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
```

Component usage:
```tsx
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

export function MyComponent() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();

  return (
    <div style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
      <h1>{t("page.title")}</h1>
      <button onClick={toggle}>{theme === "dark" ? "🌙" : "☀️"}</button>
    </div>
  );
}
```

Theme token CSS pattern:
```css
:root[data-theme="dark"] {
  --bg-surface: #1a1d27;
  --text-primary: #ffffff;
  --accent-surface: rgba(70, 72, 212, 0.2);
  --border: #2d3142;
}

:root[data-theme="light"] {
  --bg-surface: #ffffff;
  --text-primary: #151c27;
  --accent-surface: rgba(70, 72, 212, 0.08);
  --border: #e5e7eb;
}
```

## Anti-patterns

- Do NOT add a token to ONE theme block only — always add to both.
- Do NOT hardcode hex values for surfaces / text / borders — use `var(--*)`.
- Do NOT add a new translation key to ONE locale file only.
- Do NOT install Tailwind / styled-components / MUI — the project is intentionally lightweight.
- Do NOT toggle theme via class names — use `data-theme` attribute on `<html>`.
- Do NOT skip `localStorage` persistence — without it, theme + locale reset on every reload.

## References

- `asset-portal/src/hooks/useTheme.ts:1-18` — full hook
- `asset-portal/src/i18n/index.ts:1-16` — i18n bootstrap
- `asset-portal/src/components/ThemeToggle.tsx` — theme toggle UI
- `asset-portal/src/components/LanguageToggle.tsx` — locale switcher UI
- `asset-portal/src/theme.css` — CSS variable token definitions
