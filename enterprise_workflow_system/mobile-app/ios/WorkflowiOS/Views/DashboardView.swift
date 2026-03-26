import SwiftUI

struct DashboardView: View {
    let requests = MockData.workflowRequests

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Stats cards
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        StatCard(title: "Pending", value: "\(requests.filter { $0.status == .pending }.count)", color: .orange)
                        StatCard(title: "Approved", value: "\(requests.filter { $0.status == .approved }.count)", color: .green)
                        StatCard(title: "Rejected", value: "\(requests.filter { $0.status == .rejected }.count)", color: .red)
                        StatCard(title: "Total", value: "\(requests.count)", color: .blue)
                    }
                    .padding(.horizontal)

                    // Request list
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Recent Requests")
                            .font(.headline)
                            .padding(.horizontal)

                        ForEach(requests) { request in
                            RequestRow(request: request)
                        }
                    }
                }
                .padding(.vertical)
            }
            .navigationTitle("Dashboard")
        }
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Text(value)
                .font(.title.bold())
                .foregroundColor(color)
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(color.opacity(0.1))
        .cornerRadius(12)
    }
}

struct RequestRow: View {
    let request: WorkflowRequest

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(request.title)
                    .font(.subheadline.bold())
                Text(request.requester)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            Spacer()
            StatusBadge(status: request.status)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(10)
        .shadow(color: .black.opacity(0.05), radius: 4, y: 2)
        .padding(.horizontal)
    }
}

struct StatusBadge: View {
    let status: WorkflowStatus

    var color: Color {
        switch status {
        case .pending: return .orange
        case .approved: return .green
        case .rejected: return .red
        }
    }

    var body: some View {
        Text(status.rawValue.capitalized)
            .font(.caption2.bold())
            .foregroundColor(color)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(color.opacity(0.15))
            .cornerRadius(6)
    }
}

#Preview {
    DashboardView()
}
