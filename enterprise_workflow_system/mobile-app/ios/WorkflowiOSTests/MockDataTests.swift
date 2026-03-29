import XCTest
@testable import WorkflowiOS

final class MockDataTests: XCTestCase {

    // MARK: - User Data

    func testUserDataIsNotEmpty() {
        XCTAssertFalse(MockData.userName.isEmpty)
        XCTAssertFalse(MockData.userRole.isEmpty)
        XCTAssertFalse(MockData.userEmail.isEmpty)
        XCTAssertFalse(MockData.userDepartment.isEmpty)
    }

    func testUserDataValues() {
        XCTAssertEqual(MockData.userName, "Wei Chen")
        XCTAssertEqual(MockData.userRole, "Senior Developer")
        XCTAssertEqual(MockData.userEmail, "wei.chen@company.com")
        XCTAssertEqual(MockData.userDepartment, "Engineering")
    }

    // MARK: - Workflow Requests

    func testWorkflowRequestsCount() {
        XCTAssertEqual(MockData.workflowRequests.count, 6)
    }

    func testWorkflowRequestsHaveUniqueIDs() {
        let ids = MockData.workflowRequests.map { $0.id }
        XCTAssertEqual(ids.count, Set(ids).count, "Workflow request IDs should be unique")
    }

    func testWorkflowRequestsHaveNonEmptyFields() {
        for request in MockData.workflowRequests {
            XCTAssertFalse(request.id.isEmpty, "Request id should not be empty")
            XCTAssertFalse(request.title.isEmpty, "Request title should not be empty")
            XCTAssertFalse(request.type.isEmpty, "Request type should not be empty")
            XCTAssertFalse(request.date.isEmpty, "Request date should not be empty")
            XCTAssertFalse(request.submitter.isEmpty, "Request submitter should not be empty")
            XCTAssertFalse(request.department.isEmpty, "Request department should not be empty")
        }
    }

    func testWorkflowRequestStatusDistribution() {
        let statuses = MockData.workflowRequests.map { $0.status }
        XCTAssertTrue(statuses.contains(.pending))
        XCTAssertTrue(statuses.contains(.inProgress))
        XCTAssertTrue(statuses.contains(.approved))
        XCTAssertTrue(statuses.contains(.rejected))
    }

    // MARK: - Approval Items

    func testApprovalItemsCount() {
        XCTAssertEqual(MockData.approvalItems.count, 4)
    }

    func testApprovalItemsHaveUniqueIDs() {
        let ids = MockData.approvalItems.map { $0.id }
        XCTAssertEqual(ids.count, Set(ids).count, "Approval item IDs should be unique")
    }

    func testApprovalItemsHaveNonEmptyFields() {
        for item in MockData.approvalItems {
            XCTAssertFalse(item.id.isEmpty, "Approval id should not be empty")
            XCTAssertFalse(item.title.isEmpty, "Approval title should not be empty")
            XCTAssertFalse(item.requester.isEmpty, "Approval requester should not be empty")
            XCTAssertFalse(item.department.isEmpty, "Approval department should not be empty")
            XCTAssertFalse(item.priority.isEmpty, "Approval priority should not be empty")
            XCTAssertFalse(item.date.isEmpty, "Approval date should not be empty")
        }
    }

    func testApprovalItemsPriorityDistribution() {
        let priorities = Set(MockData.approvalItems.map { $0.priority })
        XCTAssertTrue(priorities.contains("High"))
        XCTAssertTrue(priorities.contains("Medium"))
        XCTAssertTrue(priorities.contains("Low"))
        XCTAssertTrue(priorities.contains("Urgent"))
    }

    // MARK: - Notifications

    func testNotificationsCount() {
        XCTAssertEqual(MockData.notifications.count, 7)
    }

    func testNotificationsHaveUniqueIDs() {
        let ids = MockData.notifications.map { $0.id }
        XCTAssertEqual(ids.count, Set(ids).count, "Notification IDs should be unique")
    }

    func testNotificationsHaveNewAndReadItems() {
        let newCount = MockData.notifications.filter { $0.isNew }.count
        let readCount = MockData.notifications.filter { !$0.isNew }.count
        XCTAssertGreaterThan(newCount, 0, "Should have at least one new notification")
        XCTAssertGreaterThan(readCount, 0, "Should have at least one read notification")
    }

    func testNotificationsHaveNonEmptyFields() {
        for notification in MockData.notifications {
            XCTAssertFalse(notification.id.isEmpty)
            XCTAssertFalse(notification.title.isEmpty)
            XCTAssertFalse(notification.body.isEmpty)
            XCTAssertFalse(notification.type.isEmpty)
            XCTAssertFalse(notification.time.isEmpty)
        }
    }
}
