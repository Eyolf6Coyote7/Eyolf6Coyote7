import Foundation

struct MockData {
    static let userName = "Wei Chen"
    static let userRole = "Senior Developer"
    static let userEmail = "wei.chen@company.com"
    static let userDepartment = "Engineering"

    static let workflowRequests: [WorkflowRequest] = [
        .init(id: "WF-1289", title: "Leave Request — Annual Leave Dec 20-31", type: "Leave", status: .inProgress, date: "Today at 09:15", amount: "", submitter: "Wei Chen", department: "Engineering"),
        .init(id: "PO-8821", title: "Purchase Order — Office Chairs x20", type: "Purchase", status: .pending, date: "Today at 08:30", amount: "¥12,000", submitter: "Wei Chen", department: "Operations"),
        .init(id: "TR-4402", title: "Travel Approval — Beijing Trip", type: "Travel", status: .approved, date: "Yesterday at 14:00", amount: "¥12,500", submitter: "Sarah Tan", department: "Sales"),
        .init(id: "ER-9912", title: "Expense Report — Q3 Dinner", type: "Expense", status: .rejected, date: "Yesterday at 10:45", amount: "", submitter: "John Doe", department: "HR"),
        .init(id: "WF-1240", title: "Equipment Upgrade — Macbook Pro", type: "Equipment", status: .inProgress, date: "3 days ago", amount: "¥18,000", submitter: "Wei Chen", department: "Engineering"),
        .init(id: "WF-1215", title: "Software License — Adobe CC", type: "Purchase", status: .approved, date: "5 days ago", amount: "¥5,400", submitter: "Wei Chen", department: "Engineering"),
    ]

    static let approvalItems: [ApprovalItem] = [
        .init(id: "WF-1234", title: "Equipment Purchase — CNC Machine", description: "Industrial-grade CNC machine", requester: "Wei Chen", department: "Engineering", amount: "¥45,000", priority: "High", date: "2h ago"),
        .init(id: "WF-1235", title: "Travel Approval — Beijing Trip", description: "Q3 business development", requester: "Sarah Tan", department: "Sales", amount: "¥12,500", priority: "Medium", date: "5h ago"),
        .init(id: "WF-1236", title: "Leave Request — Annual Leave", description: "Dec 20-31", requester: "John Doe", department: "HR", amount: "—", priority: "Low", date: "Yesterday"),
        .init(id: "WF-1238", title: "Office Renovation Budget", description: "Floor 3 renovation", requester: "Admin", department: "Operations", amount: "¥150,000", priority: "Urgent", date: "15m ago"),
    ]

    static let notifications: [NotificationItem] = [
        .init(id: "N1", title: "Request Approved", body: "Your leave request #WF-1289 has been approved by Li Wei", type: "approved", time: "5 min ago", isNew: true),
        .init(id: "N2", title: "Approval Required", body: "Equipment Purchase #WF-1234 needs your approval. Amount: ¥45,000", type: "approval_required", time: "23 min ago", isNew: true),
        .init(id: "N3", title: "Escalation Notice", body: "Travel Approval #WF-1235 has been escalated due to overdue deadline", type: "escalation", time: "1h ago", isNew: true),
        .init(id: "N4", title: "Reminder", body: "Purchase Order #WF-1267 is awaiting your response for 24h", type: "reminder", time: "Yesterday", isNew: false),
        .init(id: "N5", title: "Request Completed", body: "Equipment Purchase #WF-1200 workflow completed", type: "completed", time: "Yesterday", isNew: false),
        .init(id: "N6", title: "New Comment", body: "Li Wei commented on #WF-1234: 'Please provide the updated quote'", type: "comment", time: "2 days ago", isNew: false),
        .init(id: "N7", title: "Request Rejected", body: "Expense Report #WF-1210 rejected by Zhang Min", type: "rejected", time: "3 days ago", isNew: false),
    ]
}
