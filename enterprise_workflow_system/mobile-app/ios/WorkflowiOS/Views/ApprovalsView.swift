import SwiftUI

struct ApprovalsView: View {
    @State private var approvals = MockData.approvalItems
    @State private var selectedTab = 0
    private let tabs = ["All (8)", "Pending (5)", "Urgent (2)"]
    private let primaryDark = Color(hex: "0060A9")

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Segmented Control
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
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(Color.white)

                Divider()

                // Card List
                ScrollView {
                    LazyVStack(spacing: 12) {
                        ForEach(approvals) { approval in
                            ApprovalListCard(approval: approval)
                        }
                    }
                    .padding(16)
                }
                .background(Color(hex: "F7F9FC"))
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

private struct ApprovalListCard: View {
    let approval: ApprovalItem
    private let primaryDark = Color(hex: "0060A9")

    var body: some View {
        HStack(spacing: 0) {
            if approval.priority == "Urgent" {
                Rectangle().fill(Color(hex: "F56C6C")).frame(width: 4)
            }

            VStack(alignment: .leading, spacing: 8) {
                // ID + Date
                HStack {
                    Text("#\(approval.id)").font(.system(size: 13, weight: .bold)).foregroundColor(primaryDark)
                    Spacer()
                    Text(approval.date).font(.system(size: 12)).foregroundColor(Color(hex: "707784"))
                }

                // Title
                Text(approval.title).font(.system(size: 15, weight: .bold)).foregroundColor(Color(hex: "191C1E"))

                // Submitter
                Text("\(approval.requester) · \(approval.department)").font(.system(size: 13)).foregroundColor(Color(hex: "404752"))

                // Priority + Amount
                HStack {
                    Text(approval.priority)
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(approval.priorityColor)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(approval.priorityBgColor)
                        .cornerRadius(12)
                    Spacer()
                    if approval.amount != "—" {
                        Text(approval.amount).font(.system(size: 14, weight: .bold)).foregroundColor(Color(hex: "191C1E"))
                    }
                }
            }
            .padding(16)
        }
        .background(Color.white)
        .cornerRadius(8)
        .shadow(color: approval.priority == "Urgent" ? Color(hex: "F56C6C").opacity(0.1) : Color.black.opacity(0.05), radius: approval.priority == "Urgent" ? 16 : 12, x: 0, y: 2)
    }
}
