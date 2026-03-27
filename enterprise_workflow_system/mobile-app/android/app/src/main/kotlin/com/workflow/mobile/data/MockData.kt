package com.workflow.mobile.data

data class Workflow(
    val id: String,
    val title: String,
    val type: String,
    val status: String,
    val date: String,
    val amount: String = "",
    val submitter: String = "Wei Chen",
    val department: String = "Engineering"
)

data class Approval(
    val id: String,
    val title: String,
    val description: String,
    val requester: String,
    val department: String,
    val amount: String,
    val priority: String,
    val date: String
)

data class Notification(
    val id: String,
    val title: String,
    val body: String,
    val type: String, // approved, approval_required, escalation, reminder, completed, comment, rejected
    val time: String,
    val isNew: Boolean
)

data class StatCard(
    val label: String,
    val value: String,
    val color: Long
)

object MockData {
    val userName = "Wei Chen"
    val userRole = "Senior Developer"
    val userEmail = "wei.chen@company.com"
    val userDepartment = "Engineering"

    val stats = listOf(
        StatCard("Pending", "3", 0xFF8B5000),
        StatCard("Active", "7", 0xFF0060A9),
        StatCard("Approved", "28", 0xFF67C23A),
        StatCard("Avg Time", "4.2h", 0xFF191C1E),
    )

    val workflows = listOf(
        Workflow("WF-1289", "Leave Request — Annual Leave Dec 20-31", "Leave", "In Progress", "Today at 09:15", "", "Wei Chen", "Engineering"),
        Workflow("PO-8821", "Purchase Order — Office Chairs x20", "Purchase", "Pending", "Today at 08:30", "¥12,000", "Wei Chen", "Operations"),
        Workflow("TR-4402", "Travel Approval — Beijing Trip", "Travel", "Approved", "Yesterday at 14:00", "¥12,500", "Sarah Tan", "Sales"),
        Workflow("ER-9912", "Expense Report — Q3 Dinner", "Expense", "Rejected", "Yesterday at 10:45", "", "John Doe", "HR"),
        Workflow("WF-1240", "Equipment Upgrade — Macbook Pro", "Equipment", "In Progress", "3 days ago", "¥18,000", "Wei Chen", "Engineering"),
        Workflow("WF-1232", "Policy Exception — Remote Access", "General", "Cancelled", "4 days ago", "", "Wei Chen", "Engineering"),
        Workflow("WF-1215", "Software License — Adobe CC", "Purchase", "Approved", "5 days ago", "¥5,400", "Wei Chen", "Engineering"),
    )

    val approvals = listOf(
        Approval("WF-1234", "Equipment Purchase — CNC Machine", "Industrial-grade CNC machine for precision prototyping", "Wei Chen", "Engineering", "¥45,000", "High", "2h ago"),
        Approval("WF-1235", "Travel Approval — Beijing Trip", "Q3 business development trip", "Sarah Tan", "Sales", "¥12,500", "Medium", "5h ago"),
        Approval("WF-1236", "Leave Request — Annual Leave", "Dec 20-31 annual leave", "John Doe", "HR", "—", "Low", "Yesterday"),
        Approval("WF-1238", "Office Renovation Budget", "Floor 3 renovation proposal", "Admin", "Operations", "¥150,000", "Urgent", "15m ago"),
    )

    val notifications = listOf(
        Notification("N1", "Request Approved", "Your leave request #WF-1289 has been approved by Li Wei", "approved", "5 min ago", true),
        Notification("N2", "Approval Required", "Equipment Purchase #WF-1234 needs your approval. Amount: ¥45,000", "approval_required", "23 min ago", true),
        Notification("N3", "Escalation Notice", "Travel Approval #WF-1235 has been escalated due to overdue deadline", "escalation", "1h ago", true),
        Notification("N4", "Reminder", "Purchase Order #WF-1267 is awaiting your response for 24h", "reminder", "Yesterday", false),
        Notification("N5", "Request Completed", "Equipment Purchase #WF-1200 workflow completed", "completed", "Yesterday", false),
        Notification("N6", "New Comment", "Li Wei commented on #WF-1234: 'Please provide the updated quote'", "comment", "2 days ago", false),
        Notification("N7", "Request Rejected", "Expense Report #WF-1210 rejected by Zhang Min", "rejected", "3 days ago", false),
    )

    val pendingCount get() = approvals.size
    val approvedCount get() = workflows.count { it.status == "Approved" }
    val rejectedCount get() = workflows.count { it.status == "Rejected" }
}
