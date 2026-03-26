import SwiftUI

@main
struct WorkflowiOSApp: App {
    @State private var isAuthenticated = false

    var body: some Scene {
        WindowGroup {
            if isAuthenticated {
                ContentView()
            } else {
                LoginView(isAuthenticated: $isAuthenticated)
            }
        }
    }
}
