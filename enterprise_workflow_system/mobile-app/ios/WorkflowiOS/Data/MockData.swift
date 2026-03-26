import Foundation

struct MockData {
    static let workflowRequests: [WorkflowRequest] = [
        WorkflowRequest(id: UUID(), title: "Budget Approval Q3", status: .pending, requester: "Alice Chen", date: Date()),
        WorkflowRequest(id: UUID(), title: "New Hire Onboarding", status: .approved, requester: "Bob Smith", date: Date().addingTimeInterval(-86400)),
        WorkflowRequest(id: UUID(), title: "Server Migration Plan", status: .pending, requester: "Carol White", date: Date().addingTimeInterval(-172800)),
        WorkflowRequest(id: UUID(), title: "Vendor Contract Renewal", status: .rejected, requester: "Dave Johnson", date: Date().addingTimeInterval(-259200)),
        WorkflowRequest(id: UUID(), title: "Office Expansion Proposal", status: .approved, requester: "Eve Martinez", date: Date().addingTimeInterval(-345600)),
        WorkflowRequest(id: UUID(), title: "Software License Request", status: .pending, requester: "Frank Lee", date: Date().addingTimeInterval(-432000)),
    ]

    static let approvalItems: [ApprovalItem] = [
        ApprovalItem(id: UUID(), title: "Travel Reimbursement", requester: "Alice Chen", status: .waiting),
        ApprovalItem(id: UUID(), title: "Equipment Purchase", requester: "Bob Smith", status: .waiting),
        ApprovalItem(id: UUID(), title: "PTO Request - 5 days", requester: "Carol White", status: .waiting),
        ApprovalItem(id: UUID(), title: "Conference Attendance", requester: "Dave Johnson", status: .approved),
        ApprovalItem(id: UUID(), title: "Remote Work Extension", requester: "Eve Martinez", status: .rejected),
    ]
}
