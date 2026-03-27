import SwiftUI

struct DashboardView: View {
    let requests = MockData.workflowRequests
    let approvals = MockData.approvalItems

    private let primary = Color(hex: "409EFF")
    private let primaryDark = Color(hex: "0060A9")
    private let success = Color(hex: "67C23A")
    private let dangerDark = Color(hex: "BA1A1A")

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Greeting
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Good morning, Wei")
                            .font(.system(size: 24, weight: .heavy))
                            .tracking(-0.6)
                            .foregroundColor(Color(hex: "191C1E"))
                        HStack(spacing: 6) {
                            Text("You have").font(.system(size: 14, weight: .medium)).foregroundColor(Color(hex: "404752").opacity(0.8))
                            Text("3 pending approvals").font(.system(size: 14, weight: .bold)).foregroundColor(primaryDark)
                        }
                    }

                    // Stats Grid
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                        StatCard(label: "Pending", value: "3", color: Color(hex: "8B5000"))
                        StatCard(label: "Active", value: "7", color: primaryDark)
                        StatCard(label: "Approved", value: "28", color: success)
                        StatCard(label: "Avg Time", value: "4.2h", color: Color(hex: "191C1E"))
                    }

                    // Pending Approvals
                    HStack {
                        Text("Pending Approvals").font(.system(size: 18, weight: .bold)).foregroundColor(Color(hex: "191C1E"))
                        Spacer()
                        Button { } label: {
                            HStack(spacing: 2) {
                                Text("See All").font(.system(size: 14, weight: .bold)).foregroundColor(primaryDark)
                                Image(systemName: "chevron.right").font(.system(size: 8)).foregroundColor(primaryDark)
                            }
                        }
                    }

                    ForEach(approvals.prefix(3)) { approval in
                        ApprovalCardView(approval: approval)
                    }
                }
                .padding(16)
            }
            .background(Color(hex: "F7F9FC"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Image(systemName: "line.3.horizontal").foregroundColor(Color(hex: "64748B"))
                }
                ToolbarItem(placement: .principal) {
                    Text("Dashboard").font(.system(size: 20, weight: .bold))
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    ZStack(alignment: .topTrailing) {
                        Image(systemName: "bell.fill").foregroundColor(Color(hex: "64748B"))
                        Circle().fill(dangerDark).frame(width: 8, height: 8).offset(x: 2, y: -2)
                    }
                }
            }
        }
    }
}

private struct StatCard: View {
    let label: String
    let value: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(label.uppercased())
                .font(.system(size: 12, weight: .semibold))
                .tracking(0.6)
                .foregroundColor(Color(hex: "404752"))
            Text(value)
                .font(.system(size: 28, weight: .heavy))
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Color.white)
        .cornerRadius(12)
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color(hex: "C0C7D4").opacity(0.1), lineWidth: 1))
        .shadow(color: .black.opacity(0.02), radius: 12, x: 0, y: 4)
    }
}

private struct ApprovalCardView: View {
    let approval: ApprovalItem
    private let success = Color(hex: "67C23A")
    private let dangerDark = Color(hex: "BA1A1A")
    private let primaryDark = Color(hex: "0060A9")

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("#\(approval.id)").font(.system(size: 11, weight: .bold)).foregroundColor(primaryDark).tracking(0.275)
                    Text(approval.title).font(.system(size: 15, weight: .bold)).foregroundColor(Color(hex: "191C1E"))
                }
                Spacer()
                Text(approval.date).font(.system(size: 12)).foregroundColor(Color(hex: "707784"))
            }

            // Requester + Amount
            HStack {
                HStack(spacing: 8) {
                    Circle().fill(Color(hex: "ECEEF1")).frame(width: 32, height: 32).overlay(
                        Text(String(approval.requester.prefix(1))).font(.system(size: 12, weight: .bold))
                    )
                    VStack(alignment: .leading) {
                        Text(approval.requester).font(.system(size: 13, weight: .bold)).foregroundColor(Color(hex: "191C1E"))
                        Text("\(approval.department) Department").font(.system(size: 12)).foregroundColor(Color(hex: "404752"))
                    }
                }
                Spacer()
                VStack(alignment: .trailing) {
                    Text(approval.amount).font(.system(size: 14, weight: .heavy)).foregroundColor(Color(hex: "191C1E"))
                    Text(approval.priority).font(.system(size: 10, weight: .bold)).foregroundColor(approval.priorityColor)
                }
            }

            // Buttons
            HStack(spacing: 12) {
                Button {} label: {
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark").font(.system(size: 12))
                        Text("Approve").font(.system(size: 14, weight: .bold))
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 46)
                    .background(success)
                    .cornerRadius(8)
                }

                Button {} label: {
                    HStack(spacing: 8) {
                        Image(systemName: "xmark").font(.system(size: 11))
                        Text("Reject").font(.system(size: 14, weight: .bold))
                    }
                    .foregroundColor(dangerDark)
                    .frame(maxWidth: .infinity)
                    .frame(height: 46)
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(dangerDark.opacity(0.2), lineWidth: 1))
                }
            }
        }
        .padding(20)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: Color(hex: "191C1E").opacity(0.04), radius: 24, x: 0, y: 8)
    }
}
