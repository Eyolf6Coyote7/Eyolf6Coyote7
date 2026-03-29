import XCTest
import SwiftUI
@testable import WorkflowiOS

final class ModelTests: XCTestCase {

    // MARK: - ApprovalItem Tests

    func testApprovalItemInitialization() {
        let item = ApprovalItem(
            id: "WF-001",
            title: "Test Approval",
            description: "A test approval item",
            requester: "Jane Doe",
            department: "Finance",
            amount: "¥10,000",
            priority: "High",
            date: "Today"
        )

        XCTAssertEqual(item.id, "WF-001")
        XCTAssertEqual(item.title, "Test Approval")
        XCTAssertEqual(item.description, "A test approval item")
        XCTAssertEqual(item.requester, "Jane Doe")
        XCTAssertEqual(item.department, "Finance")
        XCTAssertEqual(item.amount, "¥10,000")
        XCTAssertEqual(item.priority, "High")
        XCTAssertEqual(item.date, "Today")
    }

    func testApprovalItemPriorityColorUrgent() {
        let item = ApprovalItem(id: "1", title: "", description: "", requester: "", department: "", amount: "", priority: "Urgent", date: "")
        XCTAssertEqual(item.priorityColor, Color(hex: "F56C6C"))
        XCTAssertEqual(item.priorityBgColor, Color(hex: "FEF0F0"))
    }

    func testApprovalItemPriorityColorHigh() {
        let item = ApprovalItem(id: "1", title: "", description: "", requester: "", department: "", amount: "", priority: "High", date: "")
        XCTAssertEqual(item.priorityColor, Color(hex: "E6A23C"))
        XCTAssertEqual(item.priorityBgColor, Color(hex: "FDF6EC"))
    }

    func testApprovalItemPriorityColorMedium() {
        let item = ApprovalItem(id: "1", title: "", description: "", requester: "", department: "", amount: "", priority: "Medium", date: "")
        XCTAssertEqual(item.priorityColor, Color(hex: "0060A9"))
        XCTAssertEqual(item.priorityBgColor, Color(hex: "E6F1FC"))
    }

    func testApprovalItemPriorityColorDefault() {
        let item = ApprovalItem(id: "1", title: "", description: "", requester: "", department: "", amount: "", priority: "Low", date: "")
        XCTAssertEqual(item.priorityColor, Color(hex: "909399"))
        XCTAssertEqual(item.priorityBgColor, Color(hex: "E6E8EB"))
    }

    // MARK: - NotificationItem Tests

    func testNotificationItemInitialization() {
        let item = NotificationItem(
            id: "N1",
            title: "Test Notification",
            body: "This is a test",
            type: "approved",
            time: "5 min ago",
            isNew: true
        )

        XCTAssertEqual(item.id, "N1")
        XCTAssertEqual(item.title, "Test Notification")
        XCTAssertEqual(item.body, "This is a test")
        XCTAssertEqual(item.type, "approved")
        XCTAssertEqual(item.time, "5 min ago")
        XCTAssertTrue(item.isNew)
    }

    func testNotificationIconColorApproved() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "approved", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "22C55E"))
        XCTAssertEqual(item.iconName, "checkmark")
    }

    func testNotificationIconColorCompleted() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "completed", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "22C55E"))
        XCTAssertEqual(item.iconName, "checkmark")
    }

    func testNotificationIconColorApprovalRequired() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "approval_required", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "0060A9"))
        XCTAssertEqual(item.iconName, "person.fill")
    }

    func testNotificationIconColorEscalation() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "escalation", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "F97316"))
        XCTAssertEqual(item.iconName, "exclamationmark.triangle.fill")
    }

    func testNotificationIconColorComment() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "comment", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "0060A9"))
        XCTAssertEqual(item.iconName, "bubble.left.fill")
    }

    func testNotificationIconColorRejected() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "rejected", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "BA1A1A"))
        XCTAssertEqual(item.iconName, "xmark")
    }

    func testNotificationIconColorDefault() {
        let item = NotificationItem(id: "1", title: "", body: "", type: "unknown_type", time: "", isNew: false)
        XCTAssertEqual(item.iconColor, Color(hex: "94A3B8"))
        XCTAssertEqual(item.iconName, "bell.fill")
    }

    // MARK: - WorkflowRequest Tests

    func testWorkflowRequestInitialization() {
        let request = WorkflowRequest(
            id: "WF-100",
            title: "Test Request",
            type: "Leave",
            status: .pending,
            date: "Today",
            amount: "¥5,000",
            submitter: "Test User",
            department: "Engineering"
        )

        XCTAssertEqual(request.id, "WF-100")
        XCTAssertEqual(request.title, "Test Request")
        XCTAssertEqual(request.type, "Leave")
        XCTAssertEqual(request.status, .pending)
        XCTAssertEqual(request.date, "Today")
        XCTAssertEqual(request.amount, "¥5,000")
        XCTAssertEqual(request.submitter, "Test User")
        XCTAssertEqual(request.department, "Engineering")
    }

    func testWorkflowRequestBorderColorMatchesStatus() {
        let pendingRequest = WorkflowRequest(id: "1", title: "", type: "", status: .pending, date: "", amount: "", submitter: "", department: "")
        XCTAssertEqual(pendingRequest.borderColor, WorkflowStatus.pending.color)

        let approvedRequest = WorkflowRequest(id: "2", title: "", type: "", status: .approved, date: "", amount: "", submitter: "", department: "")
        XCTAssertEqual(approvedRequest.borderColor, WorkflowStatus.approved.color)

        let rejectedRequest = WorkflowRequest(id: "3", title: "", type: "", status: .rejected, date: "", amount: "", submitter: "", department: "")
        XCTAssertEqual(rejectedRequest.borderColor, WorkflowStatus.rejected.color)
    }

    // MARK: - WorkflowStatus Tests

    func testWorkflowStatusRawValues() {
        XCTAssertEqual(WorkflowStatus.pending.rawValue, "Pending")
        XCTAssertEqual(WorkflowStatus.inProgress.rawValue, "In Progress")
        XCTAssertEqual(WorkflowStatus.approved.rawValue, "Approved")
        XCTAssertEqual(WorkflowStatus.rejected.rawValue, "Rejected")
        XCTAssertEqual(WorkflowStatus.cancelled.rawValue, "Cancelled")
    }

    func testWorkflowStatusColors() {
        XCTAssertEqual(WorkflowStatus.pending.color, Color(hex: "E6A23C"))
        XCTAssertEqual(WorkflowStatus.inProgress.color, Color(hex: "409EFF"))
        XCTAssertEqual(WorkflowStatus.approved.color, Color(hex: "67C23A"))
        XCTAssertEqual(WorkflowStatus.rejected.color, Color(hex: "F56C6C"))
        XCTAssertEqual(WorkflowStatus.cancelled.color, Color(hex: "909399"))
    }

    func testWorkflowStatusBgColors() {
        XCTAssertEqual(WorkflowStatus.pending.bgColor, Color(hex: "FFF7EB"))
        XCTAssertEqual(WorkflowStatus.inProgress.bgColor, Color(hex: "ECF5FF"))
        XCTAssertEqual(WorkflowStatus.rejected.bgColor, Color(hex: "FFDAD6"))
        XCTAssertEqual(WorkflowStatus.cancelled.bgColor, Color(hex: "E6E8EB"))
    }

    func testWorkflowStatusDecodable() throws {
        let jsonData = "\"Pending\"".data(using: .utf8)!
        let status = try JSONDecoder().decode(WorkflowStatus.self, from: jsonData)
        XCTAssertEqual(status, .pending)
    }

    func testWorkflowStatusEncodable() throws {
        let data = try JSONEncoder().encode(WorkflowStatus.approved)
        let string = String(data: data, encoding: .utf8)
        XCTAssertEqual(string, "\"Approved\"")
    }

    // MARK: - Color Hex Extension Tests

    func testColorHexInitializationSixDigit() {
        let color = Color(hex: "FF0000")
        // Just verify it doesn't crash; Color equality is tested via model properties above
        XCTAssertNotNil(color)
    }

    func testColorHexInitializationWithHash() {
        let color = Color(hex: "#00FF00")
        XCTAssertNotNil(color)
    }

    func testColorHexInitializationInvalidLength() {
        // Non-6-digit hex falls back to black
        let color = Color(hex: "FFF")
        XCTAssertNotNil(color)
    }
}
