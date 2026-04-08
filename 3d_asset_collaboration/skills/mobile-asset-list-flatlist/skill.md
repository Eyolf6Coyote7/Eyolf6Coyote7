---
name: mobile-asset-list-flatlist
description: Build a React Native FlatList grid screen with 2-column layout, color-mapped placeholder thumbnails, loading spinner, and tag chips — matching mobile-app/app/(tabs)/assets.tsx.
---

## When to use

Trigger when the user asks to:
- add a list / grid screen to `mobile-app`
- show items with thumbnails + tags in a 2-column grid
- mentions `FlatList`, `numColumns`, `getAssets`, `ActivityIndicator`, `PLACEHOLDER_COLORS`
- replace a placeholder list with a real API-backed grid

## Context

`mobile-app/app/(tabs)/assets.tsx:1-107` is the canonical FlatList grid screen. Defining traits:

1. **`<FlatList>` with `numColumns={2}`** for the 2-column grid. Items are styled with `flex: 1` + `margin: 6` for equal spacing.
2. **Loading state** — `useState<boolean>(true)` flipped in `.finally()`. While loading, render `<ActivityIndicator size="large" />` centered.
3. **Color-mapped placeholders** — `PLACEHOLDER_COLORS` array of 6 hex colors, indexed by `index % 6` so each card gets a deterministic placeholder color. NO image loading — placeholders are pure flex divs.
4. **Card structure**: thumbnail (120px height, color background, format text overlay) + name (1-line ellipsized) + tags row (wrap, gap 4).
5. **Tag pills** — `backgroundColor: "#dfe6e9"` rounded chips with `fontSize: 11`.
6. **`getAssets()` from `../../src/api`** — uses the api/mock-real switch (`api-mock-real-switch` skill). Returns `Asset[]`.
7. **`StyleSheet.create({...})`** at the bottom — DO NOT use inline `style={{}}` objects in render; the project standardizes on `StyleSheet`.

## Operating instructions

1. Create the screen file under `mobile-app/app/(tabs)/<name>.tsx` (or `app/<name>.tsx` for non-tab routes).
2. Use the `useState<T[]>([])` + `useState<boolean>(true)` pattern for data + loading.
3. Fetch in `useEffect(() => { getThings().then(setThings).finally(() => setLoading(false)); }, [])`.
4. Render `<ActivityIndicator size="large" />` while loading.
5. `<FlatList numColumns={2}>` for grid, `numColumns={1}` for single column. Always provide `keyExtractor`.
6. Build a `PLACEHOLDER_COLORS` array of 4-6 hex colors. Use `index % 6` to pick.
7. Card layout: thumbnail (fixed height) + content (padding 8). Use `numberOfLines={1}` on names to prevent overflow.
8. Define `StyleSheet.create({...})` at the bottom — NEVER inline styles.
9. For navigation to detail page, wrap card in `<Pressable onPress={() => router.push(`/things/${item.id}`)}>` from expo-router.
10. Tag chips: small rounded background, padding 6×2, fontSize 11.

## Reusable prompts / code patterns

Full screen pattern:
```tsx
import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getThings } from "../../src/api";
import type { Thing } from "../../src/api";

const PLACEHOLDER_COLORS = ["#6c5ce7", "#00b894", "#e17055", "#0984e3", "#fdcb6e", "#e84393"];

export default function ThingsScreen() {
  const [things, setThings] = useState<Thing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThings().then(setThings).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={things}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <View style={[styles.thumbnail, { backgroundColor: PLACEHOLDER_COLORS[index % 6] }]}>
            <Text style={styles.thumbText}>{item.format.toUpperCase()}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 12 },
  card: {
    flex: 1, margin: 6, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden",
    elevation: 2,
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: { height: 120, justifyContent: "center", alignItems: "center" },
  thumbText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  name: { fontWeight: "600", fontSize: 14, paddingHorizontal: 8, paddingTop: 8 },
});
```

Tag chip row:
```tsx
<View style={styles.tags}>
  {item.tags.map((tag) => (
    <Text key={tag} style={styles.tag}>{tag}</Text>
  ))}
</View>

// styles
tags: { flexDirection: "row", flexWrap: "wrap", padding: 8, gap: 4 },
tag: {
  backgroundColor: "#dfe6e9",
  borderRadius: 8,
  paddingHorizontal: 6,
  paddingVertical: 2,
  fontSize: 11,
  color: "#2d3436",
},
```

## Anti-patterns

- Do NOT use `<ScrollView>` + `<View>` map for grids — use `<FlatList>` for virtualization.
- Do NOT inline styles in render — define in `StyleSheet.create({...})`.
- Do NOT load real images for thumbnails — the project uses color placeholders.
- Do NOT skip `keyExtractor` — React Native warns and degrades performance.
- Do NOT skip `numberOfLines` on text — long names break the grid layout.
- Do NOT use `Image` from `expo-image` for placeholders — a `<View>` is enough.
- Do NOT pull in NativeWind / styled-components — stay with `StyleSheet.create`.

## References

- `mobile-app/app/(tabs)/assets.tsx:1-107` — full canonical screen
- `mobile-app/src/api/index.ts` — api/mock-real switch
- `mobile-app/src/store/assetSlice.ts` — `Asset` type definition
- `mobile-app/app/(tabs)/_layout.tsx` — parent tab layout
