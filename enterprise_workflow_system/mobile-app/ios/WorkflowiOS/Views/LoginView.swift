import SwiftUI

struct LoginView: View {
    @Binding var isAuthenticated: Bool
    @State private var email = ""
    @State private var password = ""
    @State private var isLoading = false

    private let primary = Color(hex: "409EFF")
    private let primaryDark = Color(hex: "0060A9")

    var body: some View {
        VStack(spacing: 0) {
            Spacer().frame(height: 96)

            // Brand Icon
            RoundedRectangle(cornerRadius: 12)
                .fill(primary)
                .frame(width: 56, height: 56)
                .overlay(
                    Image(systemName: "lock.shield.fill")
                        .foregroundColor(.white)
                        .font(.system(size: 27))
                )
                .shadow(color: primary.opacity(0.2), radius: 15, x: 0, y: 10)

            Spacer().frame(height: 16)

            Text("WorkflowOS")
                .font(.system(size: 20, weight: .heavy))
                .tracking(-0.5)
                .foregroundColor(Color(hex: "303133"))

            Spacer().frame(height: 4)

            Text("Sign in to continue")
                .font(.system(size: 14))
                .foregroundColor(Color(hex: "404752"))

            Spacer().frame(height: 40)

            // Email
            HStack(spacing: 12) {
                Image(systemName: "envelope.fill")
                    .foregroundColor(Color(hex: "707784"))
                    .font(.system(size: 14))
                TextField("Email address", text: $email)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
            }
            .padding(.horizontal, 16)
            .frame(height: 48)
            .background(Color(hex: "F4F3F5"))
            .cornerRadius(8)
            .padding(.horizontal, 24)

            Spacer().frame(height: 16)

            // Password
            HStack(spacing: 12) {
                Image(systemName: "lock.fill")
                    .foregroundColor(Color(hex: "707784"))
                    .font(.system(size: 14))
                SecureField("Password", text: $password)
                    .textContentType(.password)
                Spacer()
                Image(systemName: "eye.fill")
                    .foregroundColor(Color(hex: "707784"))
                    .font(.system(size: 14))
            }
            .padding(.horizontal, 16)
            .frame(height: 48)
            .background(Color(hex: "F4F3F5"))
            .cornerRadius(8)
            .padding(.horizontal, 24)

            // Forgot Password
            Button("Forgot password?") {}
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(primaryDark)
                .padding(.top, 12)

            Spacer().frame(height: 16)

            // SSO Button
            Button {
                isLoading = true
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    isAuthenticated = true
                }
            } label: {
                HStack(spacing: 8) {
                    if isLoading {
                        ProgressView().tint(.white)
                    } else {
                        Image(systemName: "key.fill").font(.system(size: 14))
                        Text("Sign in with SSO").font(.system(size: 16, weight: .bold))
                    }
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(LinearGradient(colors: [primaryDark, primary], startPoint: .leading, endPoint: .trailing))
                .cornerRadius(8)
            }
            .padding(.horizontal, 24)

            Spacer().frame(height: 32)

            // Divider
            HStack {
                Rectangle().fill(Color(hex: "C0C7D4").opacity(0.3)).frame(height: 1)
                Text("OR").font(.system(size: 12, weight: .medium)).foregroundColor(Color(hex: "707784")).tracking(1.2)
                Rectangle().fill(Color(hex: "C0C7D4").opacity(0.3)).frame(height: 1)
            }
            .padding(.horizontal, 24)

            Spacer().frame(height: 32)

            // Social Buttons
            socialButton("Continue with Microsoft")
            Spacer().frame(height: 12)
            socialButton("Continue with Google")

            Spacer()

            // Footer
            VStack(spacing: 8) {
                Text("© 2025 WorkflowOS. All rights reserved.")
                    .font(.system(size: 12))
                    .foregroundColor(Color(hex: "64748B"))
                HStack(spacing: 16) {
                    Text("Privacy Policy").font(.system(size: 10)).foregroundColor(Color(hex: "94A3B8"))
                    Text("Terms of Service").font(.system(size: 10)).foregroundColor(Color(hex: "94A3B8"))
                    Text("Help Center").font(.system(size: 10)).foregroundColor(Color(hex: "94A3B8"))
                }
            }
            .padding(.bottom, 32)
        }
    }

    private func socialButton(_ title: String) -> some View {
        Button {} label: {
            Text(title)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(Color(hex: "1A1C1D"))
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(Color.white)
                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color(hex: "C0C7D4").opacity(0.4), lineWidth: 1))
                .cornerRadius(8)
        }
        .padding(.horizontal, 24)
    }
}
