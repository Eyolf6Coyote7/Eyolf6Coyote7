---
name: multi-skin-routing
description: Add a route to asset-portal under one of the three layout skins (default web / unity standalone / mobile standalone), each with its own visual language and theme.
when_to_use:
  - add a new page to `asset-portal
  - decide which "skin" / layout a new page belongs to
  - mentions `router.tsx`, `createBrowserRouter`, `unity`, `mobile`, `App.tsx`, layout
  - create a Unity-themed admin tool, mobile-themed view, or default web page
tech_stack:
  - react
  - react-router
  - multi-skin
harness: fe-csr
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add a new page to `asset-portal`
- decide which "skin" / layout a new page belongs to
- mentions `router.tsx`, `createBrowserRouter`, `unity`, `mobile`, `App.tsx`, layout
- create a Unity-themed admin tool, mobile-themed view, or default web page

## Context

`asset-portal/src/router.tsx:21-51` defines THREE distinct route groups, each with its own layout shell:

1. **Default web skin** — routes wrapped under `<App />` (standard topbar + sidebar). Routes: `/`, `/assets`, `/assets/:id`, `/upload`, `/iot-dashboard`, `/compare`, `/settings`, `/account`. This is the brand's portfolio web app.
2. **Unity standalone skin** — `/unity/*` routes with NO `App` wrapper. Each Unity page is full-screen with `background: "#111125"` dark theme, JetBrains Mono / Space Grotesk fonts, monospaced UI mimicking the Unity Editor. Routes: `/unity`, `/unity/browser`, `/unity/inspector/:id`, `/unity/viewport`, `/unity/iot-overlay`. See `pages/unity/UnityViewportPage.tsx` for the visual language.
3. **Mobile standalone skin** — `/mobile/*` routes also without `App`, single-column mobile-first layout. Routes: `/mobile/assets`, `/mobile/assets/:id`, `/mobile/notifications`, `/mobile/profile`. See `pages/mobile/MobileAssetListPage.tsx`.

The three skins exist because the project showcases the SAME asset domain rendered three ways for different consumer types (web reviewer / Unity plugin developer / mobile field engineer). Pages MUST live under the correct folder so the skin's visual rules apply.

## Operating instructions

1. Decide skin first: `default web` | `unity` | `mobile`. Ask the user if ambiguous.
2. Create the page file under the correct folder:
   - default web → `asset-portal/src/pages/<Name>Page.tsx`
   - unity → `asset-portal/src/pages/unity/Unity<Name>Page.tsx`
   - mobile → `asset-portal/src/pages/mobile/Mobile<Name>Page.tsx`
3. Open `asset-portal/src/router.tsx` and import the new page at the top alongside the existing imports (group by skin: web first, unity second, mobile third).
4. Add the route to the correct array slot:
   - default web → as a child of `{ path: "/", element: <App />, children: [...] }`
   - unity → as a top-level route: `{ path: "/unity/<slug>", element: <Unity<Name>Page /> }`
   - mobile → as a top-level route: `{ path: "/mobile/<slug>", element: <Mobile<Name>Page /> }`
5. Use the visual language of the chosen skin:
   - **default web**: light backgrounds, Inter font, `#4648D4` accent
   - **unity**: `#111125` / `#1E1E32` dark, JetBrains Mono + Space Grotesk fonts, `#C0C1FF` text, monospace numeric overlays
   - **mobile**: clean single-column, no sidebar, brand `#4648D4` accent
6. NEVER mix skins (e.g., do NOT add a sidebar to a `/mobile/*` route).
7. Add a Storybook story under the same folder.
8. If the new page needs a NEW skin (rare), create a new layout component under `asset-portal/src/layouts/` and document the rule here.

## Reusable prompts / code patterns

Adding a default web route:
```tsx
import NewWebPage from "./pages/NewWebPage";

// inside createBrowserRouter children of "/" with element: <App />
{ path: "new-web-page", element: <NewWebPage /> },
```

Adding a Unity route:
```tsx
import UnityNewPage from "./pages/unity/UnityNewPage";

// top-level (sibling of other unity routes)
{ path: "/unity/new-page", element: <UnityNewPage /> },
```

Unity page shell (use this as starting template for any new unity page):
```tsx
export default function UnityNewPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#111125" }}>
      <div style={{ padding: "0 8px", height: 28, background: "#1E1E32", borderBottom: "1px solid #28283D" }}>
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, fontWeight: 700, color: "#C0C1FF" }}>
          TwinEngine v1.0
        </span>
      </div>
      {/* body */}
    </div>
  );
}
```

## Anti-patterns

- Do NOT add a Unity-themed page under `/pages/` (default folder). Unity pages MUST be under `/pages/unity/`.
- Do NOT wrap a `/unity/*` or `/mobile/*` route in `<App />` — they are intentionally standalone.
- Do NOT use `Inter` font in Unity pages or JetBrains Mono in default-web pages — fonts are part of the skin contract.
- Do NOT create new skin folders without documenting the rule in this skill file.
- Do NOT cross-link skins via `<Link>` to a sibling skin's URL without confirming UX intent — cross-skin links break the visual encapsulation.

## References

- `asset-portal/src/router.tsx:21-51` — full route table with three skin groups
- `asset-portal/src/pages/unity/UnityViewportPage.tsx:25-300` — canonical Unity-skin layout
- `asset-portal/src/pages/mobile/MobileAssetListPage.tsx` — canonical mobile-skin layout
- `asset-portal/src/App.tsx` — default web shell wrapper
