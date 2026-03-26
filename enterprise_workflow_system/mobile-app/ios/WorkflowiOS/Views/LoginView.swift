import SwiftUI

struct LoginView: View {
    @Binding var isAuthenticated: Bool
    @State private var email = ""
    @State private var password = ""
    @State private var showError = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 8) {
                    Image(systemName: "briefcase.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.blue)
                    Text("Enterprise Workflow")
                        .font(.title.bold())
                    Text("Sign in to continue")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                VStack(spacing: 16) {
                    TextField("Email", text: $email)
                        .textContentType(.emailAddress)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(10)

                    SecureField("Password", text: $password)
                        .textContentType(.password)
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(10)
                }
                .padding(.horizontal)

                Button {
                    if !email.isEmpty && !password.isEmpty {
                        isAuthenticated = true
                    } else {
                        showError = true
                    }
                } label: {
                    Text("Sign In")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(10)
                }
                .padding(.horizontal)

                Spacer()
                Spacer()
            }
            .alert("Error", isPresented: $showError) {
                Button("OK", role: .cancel) {}
            } message: {
                Text("Please enter both email and password.")
            }
        }
    }
}

#Preview {
    LoginView(isAuthenticated: .constant(false))
}
