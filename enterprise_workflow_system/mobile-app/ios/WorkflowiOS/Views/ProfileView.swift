import SwiftUI

struct ProfileView: View {
    var body: some View {
        NavigationStack {
            List {
                Section {
                    HStack(spacing: 16) {
                        Image(systemName: "person.circle.fill")
                            .font(.system(size: 56))
                            .foregroundColor(.blue)
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Jane Doe")
                                .font(.title3.bold())
                            Text("jane.doe@enterprise.com")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding(.vertical, 8)
                }

                Section("Role") {
                    Label("Department Manager", systemImage: "building.2")
                    Label("Engineering", systemImage: "gearshape.2")
                }

                Section("Activity") {
                    Label("12 Requests Submitted", systemImage: "doc.text")
                    Label("8 Approvals Made", systemImage: "checkmark.seal")
                }

                Section {
                    Button(role: .destructive) {
                        // Sign out action
                    } label: {
                        Label("Sign Out", systemImage: "rectangle.portrait.and.arrow.right")
                    }
                }
            }
            .navigationTitle("Profile")
        }
    }
}

#Preview {
    ProfileView()
}
