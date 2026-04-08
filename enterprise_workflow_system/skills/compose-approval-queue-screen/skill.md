---
name: compose-approval-queue-screen
description: Build a Jetpack Compose Material3 list screen with TopAppBar, segmented control tabs, NavigationBar with badge, and LazyColumn of priority-tinted approval cards.
---

## When to use

Trigger when the user asks to:
- add a new screen to `mobile-app/android` (Kotlin Jetpack Compose)
- show a list of approvals / requests / tasks with tab filters
- mentions `Scaffold`, `TopAppBar`, `NavigationBar`, `LazyColumn`, `BadgedBox`, `segmented control`, `ApprovalsScreen`
- match the existing brand color `PrimaryDark = #0060A9` and segmented tab pattern

DO NOT use this skill for full-screen forms or detail views — those follow different layout templates.

## Context

`mobile-app/android/app/src/main/kotlin/com/workflow/mobile/ui/screens/ApprovalsScreen.kt:1-128` is the canonical list screen. Defining traits:

1. **`Scaffold`** wrapping the screen with `topBar` (TopAppBar with menu icon + filter icon) and `bottomBar` (NavigationBar with 4 items, current = "Queue", uses `BadgedBox` for the count badge).
2. **Segmented control** at the top of the body — a `Surface(color = Color.White)` containing a `Row` of `Surface(...)` items, each a clickable tab. The selected tab uses `PrimaryDark` background + white text; unselected uses transparent + `TextSecondary`. Tab labels include count: `"All (8)"`, `"Pending (5)"`, `"Urgent (2)"`.
3. **`LazyColumn`** of `Card` items with `RoundedCornerShape(8.dp)` and `cardElevation(if (isUrgent) 4.dp else 2.dp)`. Urgent rows get a 4dp red left stripe via `Box(Modifier.width(4.dp).fillMaxHeight().background(Danger))`.
4. **Card content** layout: ID + date row, title, requester · department, priority pill + amount row.
5. **Theme tokens** imported from `com.workflow.mobile.ui.theme.*`: `PrimaryDark`, `BgPage`, `BgSurface`, `TextPrimary`, `TextSecondary`, `TextMuted`, `ActiveBlue`, `Danger`, `DangerDark`, `Warning`. NEVER inline hex values; always go through these tokens.
6. **Mock data** from `MockData.approvals` (in `data/MockData.kt`) so the screen runs without backend.

## Operating instructions

1. Create `ApprovalsScreen.kt` (or similar) under `app/src/main/kotlin/com/workflow/mobile/ui/screens/`.
2. Use `@OptIn(ExperimentalMaterial3Api::class)` annotation — required for `TopAppBar` / `Scaffold` Material3 APIs.
3. Wrap entire screen in `Scaffold` with `topBar`, `bottomBar`, body as `Column(modifier = Modifier.fillMaxSize().padding(padding).background(BgPage))`.
4. Hold tab state with `var selectedTab by remember { mutableIntStateOf(0) }` and a `tabs = listOf("All (N)", "Pending (N)", "Urgent (N)")` string list.
5. For each item in the list, decide `isUrgent = approval.priority == "Urgent"` and apply 4dp red stripe + elevated shadow.
6. Pull theme colors via `import com.workflow.mobile.ui.theme.*` — never hardcode hex.
7. Wire navigation entry in `MainActivity.kt` or `WorkflowApp.kt` using whatever NavHost pattern the project uses.
8. For dummy data, add a list to `data/MockData.kt` mirroring the existing `approvals` field.

## Reusable prompts / code patterns

Scaffold + topBar + bottomBar shell:
```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ApprovalsScreen(onBack: () -> Unit) {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("All (8)", "Pending (5)", "Urgent (2)")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Approval Queue", fontWeight = FontWeight.SemiBold, fontSize = 16.sp, letterSpacing = (-0.4).sp) },
                navigationIcon = { IconButton(onClick = {}) { Icon(Icons.Default.Menu, contentDescription = "Menu") } },
                actions = { IconButton(onClick = {}) { Icon(Icons.Default.FilterList, contentDescription = "Filter") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White.copy(alpha = 0.8f))
            )
        },
        bottomBar = {
            NavigationBar(containerColor = Color.White.copy(alpha = 0.8f)) {
                NavigationBarItem(selected = true, onClick = {}, icon = {
                    BadgedBox(badge = { Badge(containerColor = DangerDark) { Text("8", color = Color.White, fontSize = 9.sp) } }) {
                        Icon(Icons.Default.Checklist, contentDescription = null)
                    }
                }, label = { Text("Queue", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = ActiveBlue) })
                // other tabs...
            }
        }
    ) { padding -> /* body */ }
}
```

Segmented control tabs:
```kotlin
Row(
    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp).background(BgSurface, RoundedCornerShape(8.dp)).padding(4.dp),
) {
    tabs.forEachIndexed { i, tab ->
        val isSelected = selectedTab == i
        Surface(
            modifier = Modifier.weight(1f).height(32.dp),
            shape = RoundedCornerShape(4.dp),
            color = if (isSelected) PrimaryDark else Color.Transparent,
            onClick = { selectedTab = i }
        ) {
            Box(contentAlignment = Alignment.Center) {
                Text(tab, fontSize = 13.sp, fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Medium, color = if (isSelected) Color.White else TextSecondary)
            }
        }
    }
}
```

Priority-tinted card with urgent stripe:
```kotlin
Card(
    shape = RoundedCornerShape(8.dp),
    colors = CardDefaults.cardColors(containerColor = Color.White),
    elevation = CardDefaults.cardElevation(defaultElevation = if (isUrgent) 4.dp else 2.dp),
    modifier = Modifier.fillMaxWidth()
) {
    Row(modifier = Modifier.fillMaxWidth()) {
        if (isUrgent) {
            Box(modifier = Modifier.width(4.dp).fillMaxHeight().background(Danger))
        }
        Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) { /* content */ }
    }
}
```

## Anti-patterns

- Do NOT inline hex colors in compose code. Always use tokens from `ui.theme.*`.
- Do NOT use `androidx.compose.material` (Material 2) APIs — the project is on Material 3 (`androidx.compose.material3`).
- Do NOT use `LazyColumn` without `contentPadding` — the design specifies 16dp.
- Do NOT skip `@OptIn(ExperimentalMaterial3Api::class)` for Scaffold/TopAppBar — compile will fail.
- Do NOT replace `BadgedBox` + `Badge` with manual overlay — Material 3 has the canonical badge component.

## References

- `mobile-app/android/app/src/main/kotlin/com/workflow/mobile/ui/screens/ApprovalsScreen.kt:21-128` — full canonical screen
- `mobile-app/android/app/src/main/kotlin/com/workflow/mobile/ui/theme/Theme.kt` — color tokens
- `mobile-app/android/app/src/main/kotlin/com/workflow/mobile/data/MockData.kt` — mock data shape
- `mobile-app/android/app/src/main/kotlin/com/workflow/mobile/MainActivity.kt` — nav host wiring
