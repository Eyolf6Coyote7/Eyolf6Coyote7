import SwiftUI

struct ApprovalsView: View {
    @State private var approvals = MockData.approvalItems

    var body: some View {
        NavigationStack {
            List {
                ForEach(approvals) { item in
                    ApprovalRow(item: item)
                        .swipeActions(edge: .trailing) {
                            Button {
                                updateStatus(id: item.id, status: .rejected)
                            } label: {
                                Label("Reject", systemImage: "xmark")
                            }
                            .tint(.red)
                        }
                        .swipeActions(edge: .leading) {
                            Button {
                                updateStatus(id: item.id, status: .approved)
                            } label: {
                                Label("Approve", systemImage: "checkmark")
                            }
                            .tint(.green)
                        }
                }
            }
            .listStyle(.plain)
            .navigationTitle("Approvals")
        }
    }

    private func updateStatus(id: UUID, status: ApprovalStatus) {
        if let index = approvals.firstIndex(where: { $0.id == id }) {
            approvals[index].status = status
        }
    }
}

struct ApprovalRow: View {
    let item: ApprovalItem

    var statusColor: Color {
        switch item.status {
        case .waiting: return .orange
        case .approved: return .green
        case .rejected: return .red
        }
    }

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(item.title)
                    .font(.subheadline.bold())
                Text("From: \(item.requester)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            Spacer()
            Text(item.status.rawValue.capitalized)
                .font(.caption2.bold())
                .foregroundColor(statusColor)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(statusColor.opacity(0.15))
                .cornerRadius(6)
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    ApprovalsView()
}
