---
name: upload-wizard-stepper
description: Build a 3-step React file upload wizard (drop zone → metadata form → review/submit) with progress simulation, AI tag suggestions, and CSS variable theming.
---

## When to use

Trigger when the user asks to:
- add a file upload page to `asset-portal`
- build a multi-step form with drop-zone, form, and review screens for the asset domain
- mentions `UploadPage`, `simulateProgress`, `aiTags`, `dragging`, `dropzone`, `setFile`
- add a wizard for any "create" action that takes a file plus metadata

## Context

`asset-portal/src/pages/UploadPage.tsx:1-642` is the canonical upload wizard. Distinguishing traits vs the enterprise `vue-multi-step-form-wizard`:

1. **React + inline styles + CSS variables** — uses `var(--bg-surface)`, `var(--text-primary)`, etc. from `theme.css`. No Element Plus / no Vue.
2. **Drop zone** with `onDragOver` + `onDragLeave` + `onDrop` handlers. Accepts `.glb,.fbx,.obj,.gltf` via hidden `<input type="file">` triggered by zone click.
3. **Progress simulation** — `simulateProgress()` uses `setInterval` ramping `progress` from 0 to 68% in 4-unit increments at 100ms (the 68% cap is intentional — demo never "completes").
4. **AI tag suggestions** — `aiTags` array of suggested tags rendered as dashed-border buttons. Click adds to `form.tags`. Existing tags rendered as solid pills with X to remove.
5. **Step state** managed locally with `const [step, setStep] = useState(0)` (0 = upload, 1 = metadata, 2 = review). Step indicator at top is clickable.
6. **i18n via react-i18next** — `const { t } = useTranslation()` then `steps = stepKeys.map((k) => t(k))`.
7. **DemoTooltip wrapping** — the final submit button is wrapped in `<DemoTooltip message={t("demo.uploadRequired")}>` so it shows "demo only" on click.

## Operating instructions

1. Copy the `<UploadPage>` skeleton from `pages/UploadPage.tsx` as the starting template.
2. Define `step` state, `dragging` state, `file` state, `progress` state, and a `form` state object holding name / brand / description / tags.
3. Use the THREE-step pattern: `step === 0` shows drop zone, `step === 1` shows metadata form, `step === 2` shows review.
4. The drop zone's onClick triggers a hidden `<input id="file-input" type="file">` via `document.getElementById("file-input")?.click()`.
5. ALWAYS read theme values via `var(--bg-surface)`, `var(--text-primary)`, etc. NEVER hardcode hex values for the form chrome — only the brand `#4648D4` accent is allowed inline.
6. Use `simulateProgress()` to demo upload feedback. Cap at 68% so it visually halts (the demo intentionally doesn't "complete").
7. AI tag suggestions are an array of strings rendered as dashed-border buttons. Wrap the final submit in `DemoTooltip` with a `t("demo.xxxRequired")` key.
8. Add a story under `pages/UploadPage.stories.tsx`.
9. NEVER actually upload to a server — this is a demo wizard.

## Reusable prompts / code patterns

Drop zone with file picker fallback:
```tsx
const [dragging, setDragging] = useState(false);
const [file, setFile] = useState<File | null>(null);

const handleDrop = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  setDragging(false);
  const f = e.dataTransfer.files[0];
  if (f) {
    setFile(f);
    simulateProgress();
  }
}, []);

<div
  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
  onDragLeave={() => setDragging(false)}
  onDrop={handleDrop}
  onClick={() => document.getElementById("file-input")?.click()}
  style={{
    height: 280,
    background: dragging ? "var(--accent-surface)" : "var(--bg-elevated)",
    border: "2px dashed var(--border)",
    borderRadius: 8,
    cursor: "pointer", transition: "background 0.2s",
  }}
>
  <input id="file-input" type="file" accept=".glb,.fbx,.obj,.gltf" style={{ display: "none" }} onChange={handleFileInput} />
  {/* ... */}
</div>
```

Progress simulation (capped at 68%):
```tsx
const simulateProgress = () => {
  setProgress(0);
  const iv = setInterval(() => {
    setProgress((p) => {
      if (p >= 68) {
        clearInterval(iv);
        return 68;
      }
      return p + 4;
    });
  }, 100);
};
```

AI tag suggestion buttons:
```tsx
const aiTags = ["shoe", "sneaker", "hero-shot"];

{aiTags.map((tag) => (
  <button
    key={tag}
    onClick={() => setForm({ ...form, tags: [...form.tags, tag] })}
    style={{
      padding: "5px 12px",
      background: "var(--accent-surface)",
      border: "1px dashed rgba(70,72,212,0.4)",
      borderRadius: 12, cursor: "pointer",
    }}
  >
    {tag}
  </button>
))}
```

Step indicator (clickable circles):
```tsx
{steps.map((label, i) => (
  <div key={i} onClick={() => setStep(i)} style={{ cursor: "pointer" }}>
    <div style={{
      width: 40, height: 40, borderRadius: 12,
      background: i <= step ? "#4648D4" : "var(--accent-surface)",
      boxShadow: i === step ? "0px 0px 0px 4px rgba(70,72,212,0.1)" : "none",
    }}>
      {i + 1}
    </div>
    <span>{label}</span>
  </div>
))}
```

## Anti-patterns

- Do NOT actually POST the file — wrap submit in `DemoTooltip` and stay in demo mode.
- Do NOT replace `var(--*)` tokens with hardcoded colors — they break dark/light theme switching (`useTheme` hook depends on them).
- Do NOT let `simulateProgress` reach 100% — keep the demo cap at 68%.
- Do NOT use a heavyweight form library (react-hook-form / formik) — local `useState` is sufficient for 4-5 fields.
- Do NOT skip `e.preventDefault()` in the drop handlers — without it the browser opens the file.
- Do NOT make tags an autocomplete component; keep them as dashed-border button suggestions.

## References

- `asset-portal/src/pages/UploadPage.tsx:1-51` — state + handlers
- `asset-portal/src/pages/UploadPage.tsx:139-306` — drop zone + progress UI
- `asset-portal/src/pages/UploadPage.tsx:308-531` — metadata form + AI tags
- `asset-portal/src/pages/UploadPage.tsx:533-637` — review + DemoTooltip submit
- `asset-portal/src/theme.css` — CSS variable definitions
