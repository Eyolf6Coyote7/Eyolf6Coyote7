---
name: expo-router-mobile-tabs
description: Add a new tab screen to the Expo Router file-system tab navigator in mobile-app, with consistent header colors and emoji-based tabBarIcon.
---

## When to use

Trigger when the user asks to:
- add a new bottom tab to `mobile-app`
- create a new file-system route under `mobile-app/app/(tabs)/`
- mentions `Tabs.Screen`, `expo-router`, `_layout.tsx`, `tabBarIcon`, `screenOptions`
- add a screen accessible from the bottom navigation

## Context

`mobile-app/app/(tabs)/_layout.tsx:1-44` is the canonical Expo Router tab layout. Defining traits:

1. **File-system routing** — each `*.tsx` file under `app/(tabs)/` automatically becomes a tab screen. The `(tabs)` parens make it a route group, NOT part of the URL.
2. **`<Tabs>` from expo-router** wraps everything with shared `screenOptions` (active tint `#6c5ce7`, inactive `#636e72`, dark `#1a1a2e` header, light `#fafafa` tab bar).
3. **`<Tabs.Screen name="<file-stem>" options={...} />`** registers each screen explicitly with title + tab icon. The `name` MUST match the file name without extension.
4. **Emoji icons** — `tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📦</Text>`. Pass the `color` from the renderer for active/inactive coloring. The project intentionally uses emoji instead of `@expo/vector-icons` to keep deps minimal.
5. **Three current tabs**: `assets` (📦), `notifications` (🔔), `profile` (👤).

## Operating instructions

When adding a new tab `inbox`:

1. Create `mobile-app/app/(tabs)/inbox.tsx` exporting a default React component. The file name becomes the route slug.
2. Open `mobile-app/app/(tabs)/_layout.tsx` and add a new `<Tabs.Screen>` entry between the existing ones (order = tab order on screen).
3. Use `name="inbox"` matching the file stem.
4. Provide `title` (visible in header) and `tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📥</Text>` (emoji).
5. The tab automatically appears at the bottom — no additional config needed.
6. For deep-link routes (e.g. `/inbox/:id`), create a folder `app/(tabs)/inbox/[id].tsx` instead of a flat file. The tab still uses `name="inbox"`.
7. Color tokens are CURRENTLY hardcoded in `screenOptions`. If asked to theme this layout, extract them to a constants file rather than threading a context — Expo Router does not play well with React Context at the layout level.

## Reusable prompts / code patterns

Add a new Tabs.Screen entry:
```tsx
<Tabs.Screen
  name="inbox"
  options={{
    title: "Inbox",
    tabBarIcon: ({ color }) => (
      <Text style={{ color, fontSize: 20 }}>{"\u{1F4E5}"}</Text>
    ),
  }}
/>
```

Full layout file (copy verbatim, append new tabs):
```tsx
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6c5ce7",
        tabBarInactiveTintColor: "#636e72",
        headerStyle: { backgroundColor: "#1a1a2e" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#fafafa" },
      }}
    >
      <Tabs.Screen
        name="assets"
        options={{
          title: "Assets",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📦</Text>,
        }}
      />
      {/* add more tabs here */}
    </Tabs>
  );
}
```

New tab screen file (skeleton):
```tsx
import { View, Text, StyleSheet } from "react-native";

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700" },
});
```

## Anti-patterns

- Do NOT add `import` of React Navigation — Expo Router wraps it.
- Do NOT put a screen file inside `(tabs)/` if it should NOT be a tab — use a sibling group like `(modals)/` instead.
- Do NOT use `@expo/vector-icons` for tab bar icons — the project standardizes on emoji.
- Do NOT mismatch `name=""` and the file name — the tab will silently fail to mount.
- Do NOT thread React Context through `_layout.tsx` for theming — Expo Router's layout caching breaks context updates.

## References

- `mobile-app/app/(tabs)/_layout.tsx:1-44` — full layout
- `mobile-app/app/(tabs)/assets.tsx` — canonical tab screen
- `mobile-app/app/_layout.tsx` — root layout (parent of tabs)
- `mobile-app/app/index.tsx` — initial redirect
