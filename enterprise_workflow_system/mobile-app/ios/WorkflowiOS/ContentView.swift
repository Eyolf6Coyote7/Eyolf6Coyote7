import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "square.grid.2x2")
                }

            ApprovalsView()
                .tabItem {
                    Label("Approvals", systemImage: "checkmark.circle")
                }

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.circle")
                }
        }
        .accentColor(.blue)
    }
}

#Preview {
    ContentView()
}
