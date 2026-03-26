package com.workflow.mobile.data

data class Workflow(
    val id: String,
    val title: String,
    val description: String,
    val status: String,
    val date: String
)

data class Approval(
    val id: String,
    val title: String,
    val description: String,
    val requester: String,
    val amount: String,
    val date: String
)

object MockData {
    val workflows = listOf(
        Workflow("WF-001", "Purchase Order #4521", "Office supplies for Q3", "Pending", "2026-03-25"),
        Workflow("WF-002", "Travel Request - NYC", "Client meeting travel approval", "Approved", "2026-03-24"),
        Workflow("WF-003", "Budget Reallocation", "Move funds from marketing to engineering", "Pending", "2026-03-23"),
        Workflow("WF-004", "New Hire Onboarding", "Backend engineer position", "Approved", "2026-03-22"),
        Workflow("WF-005", "Vendor Contract Renewal", "Annual SaaS license renewal", "Rejected", "2026-03-21"),
        Workflow("WF-006", "Equipment Request", "Development workstations x3", "Pending", "2026-03-20")
    )

    val approvals = listOf(
        Approval("AP-001", "Purchase Order #4521", "Office supplies for Q3 including monitors and keyboards", "Alice Chen", "$4,200", "2026-03-25"),
        Approval("AP-002", "Budget Reallocation", "Reallocate $50k from marketing to engineering headcount", "Bob Martinez", "$50,000", "2026-03-23"),
        Approval("AP-003", "Equipment Request", "3 development workstations for new hires", "Carol Davis", "$9,600", "2026-03-20"),
        Approval("AP-004", "Conference Sponsorship", "Sponsor KotlinConf 2026 gold tier", "Dave Wilson", "$15,000", "2026-03-19")
    )

    val pendingCount get() = workflows.count { it.status == "Pending" }
    val approvedCount get() = workflows.count { it.status == "Approved" }
    val rejectedCount get() = workflows.count { it.status == "Rejected" }
}
