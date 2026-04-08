---
name: expo-router-board-screen
description: Build a React Native Expo Router screen for the whiteboard using the themed StyleSheet design tokens and Ionicons.
---

## When to use

Trigger when the user asks to:

- add or edit a React Native screen in the whiteboard mobile-app
- add a new route under mobile-app/app/ (Expo Router file-based routing)
- use the shared theme tokens (colors, radii, shadows) in src/theme.ts
- add Ionicons or a floating toolbar cluster to a screen
- wire axios into a screen via src/api

## Context

The mobile-app is Expo SDK 52 + Expo Router v4 + React Native 0.76. Screens live in mobile-app/app/ and the route structure is file-based: app/index.tsx, app/auth.tsx, app/splash.tsx, app/(tabs)/*, app/board/[id].tsx, app/board/settings.tsx.

Visual design is driven by mobile-app/src/theme.ts which exports colors, radii (with a pill shorthand), and shadows (card preset). Icons come from @expo/vector-icons Ionicons. The board canvas screen uses absolute-positioned sticky notes + a floating toolbar cluster anchored at bottom: 32 with a circular AI sparkle button above it.

API calls go through src/api (index.ts picks mock-client or real-client); axios base URL reads EXPO_PUBLIC_API_URL with a http://localhost:4001/api fallback.

Canonical files: mobile-app/app/board/[id].tsx (lines 1-345), mobile-app/app/_layout.tsx, mobile-app/src/theme.ts, mobile-app/src/api/real-client.ts.

## Operating instructions

When adding a new board-feature screen (example: a comments drawer):

1. Create the file at the correct Expo Router path: app/board/comments.tsx for /board/comments, or app/board/[id]/comments.tsx if the route depends on the board id.
2. Use useLocalSearchParams for dynamic segments and useRouter for navigation (both from expo-router).
3. Import tokens from ../../src/theme: colors, radii, shadows.
4. Build styles at the bottom via StyleSheet.create. Match existing idioms: pill borders via radii.pill, card shadows via shadows.card, rgba translucent surfaces for floating elements.
5. Use Ionicons from @expo/vector-icons for all iconography, sizes 12-22.
6. API calls go through ../../src/api so the mock client still works.
7. Add a test at mobile-app/src/__tests__/board-comments.test.tsx that renders the screen with a router stub.

## Reusable prompts / code patterns

### Screen skeleton (paraphrased from app/board/[id].tsx)

Top imports: View, Text, TouchableOpacity, StyleSheet from react-native; useLocalSearchParams and useRouter from expo-router; Ionicons from @expo/vector-icons; colors, radii, shadows from ../../src/theme.

Component: default export function, read params from useLocalSearchParams, router from useRouter, return a container View with a header View containing a back TouchableOpacity with chevron-back Ionicon and a title Text.

See app/board/[id].tsx lines 1-144 for the full canvas variant and lines 145-344 for the StyleSheet.

### Floating toolbar cluster idiom

Position absolute, bottom 32, left and right 5 percent. A circular AI sparkle button (46x46, radii.pill, colors.white, shadowOpacity 0.08) sits ABOVE the main toolbar (rounded pill, rgba white 0.9, card shadow). Two rows of 4 buttons each with 24px gap. Active button uses background `#0050D4` with matching shadow. See app/board/[id].tsx lines 292-344 for the full StyleSheet.

### Axios base URL pattern

Read EXPO_PUBLIC_API_URL with a fallback to http://localhost:4001/api. Construct axios.create with that base URL and a 10000ms timeout. See src/api/real-client.ts lines 1-9.

## Anti-patterns

- Do NOT hard-code colours - import from src/theme so light/dark variants stay consistent.
- Do NOT use react-navigation directly; this app is on Expo Router which already wraps it.
- Do NOT inline absolute positioning numbers different from the canon - the floating toolbar relies on bottom 32 and 5 percent inset.
- Do NOT call the BFF base URL directly with fetch - go through src/api so EXPO_PUBLIC_API_URL is honoured.
- Do NOT use react-native-svg for icons when a matching Ionicons glyph exists.
- Do NOT introduce a Yjs binding into the mobile app - mobile is read-only/demo today, collab lives on web only.

## References

- realtime_ai_whiteboard/mobile-app/app/board/[id].tsx:1-345 - canonical canvas screen.
- realtime_ai_whiteboard/mobile-app/app/board/[id].tsx:5-19 - tool icon arrays.
- realtime_ai_whiteboard/mobile-app/app/board/[id].tsx:145-344 - StyleSheet with all design tokens applied.
- realtime_ai_whiteboard/mobile-app/app/_layout.tsx - root layout / navigator.
- realtime_ai_whiteboard/mobile-app/src/theme.ts - colors, radii, shadows tokens.
- realtime_ai_whiteboard/mobile-app/src/api/real-client.ts:1-25 - axios base URL pattern.
- realtime_ai_whiteboard/mobile-app/src/api/index.ts - mock vs real selector.
- realtime_ai_whiteboard/mobile-app/src/__tests__/ - jest-expo test patterns.
