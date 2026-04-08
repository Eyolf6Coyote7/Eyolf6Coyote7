---
name: swiftui-approval-queue-screen
description: Build a SwiftUI list screen with NavigationStack toolbar, segmented control tabs, ScrollView LazyVStack of priority-tinted cards — the iOS counterpart of compose-approval-queue-screen.
when_to_use:
  - add a new view to `mobile-app/ios/WorkflowiOS` (SwiftUI)
  - show a list of approvals / requests / tasks with tab filters on iOS
  - mentions `NavigationStack`, `LazyVStack`, `ApprovalsView`, `Color(hex:)`, `selectedTab
  - match the Android Compose ApprovalsScreen pattern but in SwiftUI
tech_stack:
  - swiftui
  - navigation-stack
  - ios
harness: fe-csr
project: enterprise_workflow_system
---

## When to use

Trigger when the user asks to:
- add a new view to `mobile-app/ios/WorkflowiOS` (SwiftUI)
- show a list of approvals / requests / tasks with tab filters on iOS
- mentions `NavigationStack`, `LazyVStack`, `ApprovalsView`, `Color(hex:)`, `selectedTab`
- match the Android Compose ApprovalsScreen pattern but in SwiftUI

DO NOT use this skill for forms or detail views — those follow different SwiftUI templates.

## Context

`mobile-app/ios/WorkflowiOS/Views/ApprovalsView.swift:1-110` is the canonical iOS list screen. It is intentionally a 1:1 visual mirror of the Android Compose `ApprovalsScreen`. Defining traits:

1. **`NavigationStack` + `.toolbar { ... }`** with `.navigationBarLeading` (menu icon), `.principal` (title with `tracking(-0.4)` letter spacing), `.navigationBarTrailing` (filter icon).
2. **Custom segmented control** built from a `HStack(spacing: 0)` of `Button { ... } label: { Text(tabs[i]) }` items, each `.frame(maxWidth: .infinity, height: 32)` with `selectedTab == i ? primaryDark : Color.clear` background and `cornerRadius(4)`. Wrap the row with `.background(Color(hex: "F2F4F7"))` + `cornerRadius(8)`.
3. **`ScrollView { LazyVStack(spacing: 12) { ForEach(approvals) { ApprovalListCard(approval: $0) } } }`** for the card list.
4. **`ApprovalListCard`** is a private struct with the same data shape as Android: `id`, `date`, `title`, `requester`, `department`, `priority`, `amount`. Urgent rows get `Rectangle().fill(Color(hex: "F56C6C")).frame(width: 4)` left stripe.
5. **Brand colors** via `Color(hex:)` extension: `0060A9` primary dark, `F56C6C` danger, `707784` muted, `191C1E` text primary, `404752` text secondary, `F7F9FC` bg.
6. **Mock data** from `MockData.approvalItems` defined in `Data/MockData.swift`.

## Operating instructions

1. Create the view file under `mobile-app/ios/WorkflowiOS/Views/`.
2. Wrap the body in `NavigationStack { VStack(spacing: 0) { ... } .toolbar { ... } }`.
3. Define `@State private var selectedTab = 0` and `private let tabs = ["All (N)", "Pending (N)", "Urgent (N)"]`.
4. For the segmented control, use `HStack(spacing: 0) { ForEach(0..<tabs.count, id: \.self) { i in Button { selectedTab = i } label: {...} } }`. NOT SwiftUI's `Picker(.segmented)` — the project uses a custom one for visual fidelity with Android.
5. For each card use a private `ApprovalListCard` struct that takes the model item — keep cards extracted (don't inline a 100-line view in the parent).
6. Always use the `Color(hex:)` extension. NEVER use `Color.red`, `Color(.systemBlue)` etc.
7. Apply `letterSpacing` via `.tracking(-0.4)` on the title — matches the Android Compose design token.
8. Mirror data shape from `Models/ApprovalItem.swift` so Android and iOS use parallel structures.

## Reusable prompts / code patterns

NavigationStack toolbar shell:
```swift
struct ApprovalsView: View {
    @State private var approvals = MockData.approvalItems
    @State private var selectedTab = 0
    private let tabs = ["All (8)", "Pending (5)", "Urgent (2)"]
    private let primaryDark = Color(hex: "0060A9")

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // segmented control
                // scroll view + LazyVStack
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Image(systemName: "line.3.horizontal").foregroundColor(Color(hex: "0F172A"))
                }
                ToolbarItem(placement: .principal) {
                    Text("Approval Queue").font(.system(size: 16, weight: .semibold)).tracking(-0.4)
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Image(systemName: "line.3.horizontal.decrease").foregroundColor(Color(hex: "0F172A"))
                }
            }
        }
    }
}
```

Custom segmented control:
```swift
HStack(spacing: 0) {
    ForEach(0..<tabs.count, id: \.self) { i in
        Button {
            selectedTab = i
        } label: {
            Text(tabs[i])
                .font(.system(size: 13, weight: selectedTab == i ? .semibold : .medium))
                .foregroundColor(selectedTab == i ? .white : Color(hex: "404752"))
                .frame(maxWidth: .infinity)
                .frame(height: 32)
                .background(selectedTab == i ? primaryDark : Color.clear)
                .cornerRadius(4)
        }
    }
}
.padding(4)
.background(Color(hex: "F2F4F7"))
.cornerRadius(8)
```

Urgent stripe inside card:
```swift
HStack(spacing: 0) {
    if approval.priority == "Urgent" {
        Rectangle().fill(Color(hex: "F56C6C")).frame(width: 4)
    }
    VStack(alignment: .leading, spacing: 8) { /* content */ }
        .padding(16)
}
.background(Color.white)
.cornerRadius(8)
```

## Anti-patterns

- Do NOT use SwiftUI's built-in `Picker(.segmented)` — it doesn't match the Android visual.
- Do NOT use `Color.red`, `Color.blue` — go through `Color(hex:)`.
- Do NOT inline cards in the parent view; extract a `private struct CardName: View`.
- Do NOT skip `.tracking(-0.4)` on the title — without it, iOS title looks looser than Android.
- Do NOT use `NavigationView` (deprecated) — use `NavigationStack`.

## References

- `mobile-app/ios/WorkflowiOS/Views/ApprovalsView.swift:3-62` — full ApprovalsView
- `mobile-app/ios/WorkflowiOS/Views/ApprovalsView.swift:64-109` — `ApprovalListCard` private struct
- `mobile-app/ios/WorkflowiOS/Models/ApprovalItem.swift` — model shape
- `mobile-app/ios/WorkflowiOS/Data/MockData.swift` — mock data source
