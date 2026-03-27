import SwiftUI

struct ProfileView: View {
    @State private var twoFactorEnabled = true
    @State private var pushEnabled = true
    @State private var smsEnabled = false

    private let primaryDark = Color(hex: "0060A9")
    private let success = Color(hex: "67C23A")
    private let activeBlue = Color(hex: "2563EB")

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Profile Header
                    VStack(spacing: 16) {
                        Circle()
                            .fill(Color(hex: "E6E8EF"))
                            .frame(width: 72, height: 72)
                            .overlay(Image(systemName: "person.fill").font(.system(size: 32)).foregroundColor(Color(hex: "707784")))
                            .shadow(color: .black.opacity(0.05), radius: 2)

                        VStack(spacing: 3) {
                            Text(MockData.userName).font(.system(size: 20, weight: .bold)).tracking(-0.5)
                            Text("\(MockData.userRole) · \(MockData.userDepartment)").font(.system(size: 14, weight: .medium)).foregroundColor(Color(hex: "404752"))
                            Text(MockData.userEmail).font(.system(size: 13)).foregroundColor(Color(hex: "C0C7D4"))
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 32)
                    .background(Color.white)

                    // Account
                    SectionGroup(title: "Account") {
                        SettingsRow(icon: "person.fill", label: "Personal Information")
                        Divider().padding(.leading, 52)
                        SettingsRow(icon: "lock.fill", label: "Change Password")
                        Divider().padding(.leading, 52)
                        HStack { Text("Employee ID: EMP-001").font(.system(size: 15, weight: .medium)) }.padding(.horizontal, 16).padding(.vertical, 12)
                    }

                    // Security
                    SectionGroup(title: "Security") {
                        Toggle2FA(enabled: $twoFactorEnabled)
                        Divider().padding(.leading, 52)
                        SettingsRow(icon: "key.fill", label: "Backup Codes", subtitle: "5 codes remaining")
                        Divider().padding(.leading, 52)
                        HStack {
                            HStack(spacing: 12) {
                                Image(systemName: "desktopcomputer").foregroundColor(primaryDark).font(.system(size: 16))
                                Text("Active Sessions").font(.system(size: 15, weight: .medium))
                            }
                            Spacer()
                            Text("2").font(.system(size: 10, weight: .bold)).foregroundColor(.white)
                                .padding(.horizontal, 8).padding(.vertical, 2)
                                .background(primaryDark).cornerRadius(999)
                            Image(systemName: "chevron.right").font(.system(size: 10)).foregroundColor(Color(hex: "C0C7D4"))
                        }.padding(.horizontal, 16).padding(.vertical, 12)
                    }

                    // Notifications
                    SectionGroup(title: "Notifications") {
                        ToggleRow(icon: "bell.fill", label: "Push Notifications", isOn: $pushEnabled)
                        Divider().padding(.leading, 52)
                        ToggleRow(icon: "message.fill", label: "SMS Alerts", isOn: $smsEnabled)
                        Divider().padding(.leading, 52)
                        SettingsRow(icon: "moon.fill", label: "Quiet Hours", subtitle: "22:00 — 07:00")
                    }

                    // About
                    SectionGroup(title: "About") {
                        HStack {
                            Text("App Version").font(.system(size: 15, weight: .medium))
                            Spacer()
                            Text("1.0.0 (Build 42)").font(.system(size: 14)).foregroundColor(Color(hex: "C0C7D4"))
                        }.padding(.horizontal, 16).padding(.vertical, 12)
                        Divider().padding(.leading, 16)
                        SettingsRow(icon: "doc.text.fill", label: "Terms of Service")
                        Divider().padding(.leading, 52)
                        SettingsRow(icon: "shield.fill", label: "Privacy Policy")
                        Divider().padding(.leading, 52)
                        SettingsRow(icon: "questionmark.circle.fill", label: "Help & Support")
                    }

                    // Logout
                    Button {} label: {
                        Text("Log Out")
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(Color(hex: "F56C6C"))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.white)
                            .cornerRadius(12)
                            .shadow(color: .black.opacity(0.05), radius: 2)
                    }
                    .padding(.horizontal, 16)
                    .padding(.bottom, 32)
                }
            }
            .background(Color(hex: "F7F9FC"))
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

private struct SectionGroup<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title.uppercased())
                .font(.system(size: 12, weight: .bold))
                .tracking(0.6)
                .foregroundColor(Color(hex: "404752").opacity(0.6))
                .padding(.leading, 32)

            VStack(spacing: 0) { content }
                .background(Color.white)
                .cornerRadius(12)
                .shadow(color: .black.opacity(0.05), radius: 2)
                .padding(.horizontal, 16)
        }
    }
}

private struct SettingsRow: View {
    let icon: String
    let label: String
    var subtitle: String? = nil

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon).foregroundColor(Color(hex: "0060A9")).font(.system(size: 16))
            VStack(alignment: .leading) {
                Text(label).font(.system(size: 15, weight: .medium))
                if let sub = subtitle { Text(sub).font(.system(size: 12)).foregroundColor(Color(hex: "C0C7D4")) }
            }
            Spacer()
            Image(systemName: "chevron.right").font(.system(size: 10)).foregroundColor(Color(hex: "C0C7D4"))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
}

private struct Toggle2FA: View {
    @Binding var enabled: Bool
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "shield.fill").foregroundColor(Color(hex: "67C23A")).font(.system(size: 16))
            Text("Two-Factor Authentication").font(.system(size: 15, weight: .medium))
            Spacer()
            Toggle("", isOn: $enabled).labelsHidden().tint(Color(hex: "67C23A"))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
    }
}

private struct ToggleRow: View {
    let icon: String
    let label: String
    @Binding var isOn: Bool
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon).foregroundColor(Color(hex: "0060A9")).font(.system(size: 16))
            Text(label).font(.system(size: 15, weight: .medium))
            Spacer()
            Toggle("", isOn: $isOn).labelsHidden().tint(Color(hex: "0060A9"))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
}
