---
name: protected-route-auth-page
description: Add a React Router protected route and an auth page that bypasses login in mock/demo mode.
---

## When to use

Trigger when the user asks to:

- add or edit the login / register flow (pages/AuthPage.tsx)
- gate a new route behind authentication (App.tsx ProtectedRoute)
- toggle isLogin vs isRegister on the auth page
- bypass login for the demo build (VITE_MOCK=true)
- mentions of useNavigate, Navigate to /auth, useAuthStore, ProtectedRoute

## Context

Routing uses react-router-dom v7 with BrowserRouter. The root App wraps protected routes with <ProtectedRoute>, which short-circuits to its children when isMock is true, or when isAuthenticated is true, otherwise Navigates to /auth.

AuthPage is a single form component that flips between Login and Register via a local isLogin state. On submit, it awaits useAuthStore.login or register, then navigates to /dashboard. The language toggle is handled by i18n.changeLanguage + localStorage persistence.

Canonical files: web-app/src/App.tsx (lines 1-53), web-app/src/pages/AuthPage.tsx, web-app/src/stores/auth.store.ts.

## Operating instructions

Adding a new protected route: wrap the page element in <ProtectedRoute> inside <Routes> in App.tsx. Keep the isMock bypass. Read useAuthStore(s => s.token) inside the page; do not read localStorage directly.

Adding a new auth field: extend the Zustand action and the ApiClient signature on both clients, then add the controlled input in AuthPage.tsx.

## Reusable prompts / code patterns

### ProtectedRoute wrapper

The canonical wrapper lives in App.tsx lines 12-16. It is a tiny function that reads useAuthStore, short-circuits when isMock is true, and otherwise returns a Navigate element pointing to /auth when not signed in. Copy it verbatim from App.tsx rather than rewriting.

### Submit handler shape

The AuthPage submit handler should call the store action (isLogin branch vs register branch), await it, then navigate to /dashboard. Error handling belongs inside the store action so the page stays declarative.

### Language toggle

Call i18n.changeLanguage(next) then localStorage.setItem('lang', next). See AuthPage.tsx lines 20-24 for the canonical toggleLang.

## Anti-patterns

- Do NOT read the token from localStorage directly - always go through useAuthStore.
- Do NOT call navigate inside the store action - navigation belongs in the component.
- Do NOT forget the isMock bypass - the DEMO build ships without any real identity service.
- Do NOT duplicate ProtectedRoute per feature - the App.tsx one is sufficient.
- Do NOT block render on a Promise - the store action returns a promise for the form to await, but the page itself stays sync.

## References

- realtime_ai_whiteboard/web-app/src/App.tsx:1-53 - BrowserRouter, Routes, ProtectedRoute wrapper.
- realtime_ai_whiteboard/web-app/src/App.tsx:12-16 - ProtectedRoute implementation with isMock bypass.
- realtime_ai_whiteboard/web-app/src/pages/AuthPage.tsx - form and submit handler.
- realtime_ai_whiteboard/web-app/src/stores/auth.store.ts - actions backing the form.
- realtime_ai_whiteboard/web-app/src/pages/pages.test.tsx - routing and auth page tests.
