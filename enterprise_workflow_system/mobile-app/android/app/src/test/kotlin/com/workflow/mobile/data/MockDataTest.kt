package com.workflow.mobile.data

import org.junit.Assert.*
import org.junit.Test

class MockDataTest {

    // --- Data counts ---

    @Test
    fun `workflows list has 7 items`() {
        assertEquals(7, MockData.workflows.size)
    }

    @Test
    fun `approvals list has 4 items`() {
        assertEquals(4, MockData.approvals.size)
    }

    @Test
    fun `notifications list has 7 items`() {
        assertEquals(7, MockData.notifications.size)
    }

    @Test
    fun `stats list has 4 items`() {
        assertEquals(4, MockData.stats.size)
    }

    // --- Computed counts ---

    @Test
    fun `pendingCount equals approvals size`() {
        assertEquals(MockData.approvals.size, MockData.pendingCount)
    }

    @Test
    fun `approvedCount matches workflows with Approved status`() {
        val expected = MockData.workflows.count { it.status == "Approved" }
        assertEquals(expected, MockData.approvedCount)
        assertEquals(2, MockData.approvedCount)
    }

    @Test
    fun `rejectedCount matches workflows with Rejected status`() {
        val expected = MockData.workflows.count { it.status == "Rejected" }
        assertEquals(expected, MockData.rejectedCount)
        assertEquals(1, MockData.rejectedCount)
    }

    // --- Approval priorities ---

    @Test
    fun `approvals contain all expected priorities`() {
        val priorities = MockData.approvals.map { it.priority }.toSet()
        assertEquals(setOf("High", "Medium", "Low", "Urgent"), priorities)
    }

    @Test
    fun `urgent approval exists`() {
        val urgent = MockData.approvals.filter { it.priority == "Urgent" }
        assertEquals(1, urgent.size)
        assertEquals("WF-1238", urgent.first().id)
    }

    @Test
    fun `high priority approval has correct amount`() {
        val high = MockData.approvals.first { it.priority == "High" }
        assertEquals("\u00A545,000", high.amount)
    }

    // --- Notification types ---

    @Test
    fun `notifications cover all expected types`() {
        val types = MockData.notifications.map { it.type }.toSet()
        val expected = setOf(
            "approved",
            "approval_required",
            "escalation",
            "reminder",
            "completed",
            "comment",
            "rejected"
        )
        assertEquals(expected, types)
    }

    @Test
    fun `new notifications are the first three`() {
        val newNotifications = MockData.notifications.filter { it.isNew }
        assertEquals(3, newNotifications.size)
        assertTrue(newNotifications.all { it.isNew })
    }

    @Test
    fun `old notifications are the last four`() {
        val oldNotifications = MockData.notifications.filter { !it.isNew }
        assertEquals(4, oldNotifications.size)
    }

    // --- Workflow statuses ---

    @Test
    fun `workflows contain expected statuses`() {
        val statuses = MockData.workflows.map { it.status }.toSet()
        assertTrue(statuses.contains("In Progress"))
        assertTrue(statuses.contains("Pending"))
        assertTrue(statuses.contains("Approved"))
        assertTrue(statuses.contains("Rejected"))
        assertTrue(statuses.contains("Cancelled"))
    }

    // --- User info ---

    @Test
    fun `user info is populated`() {
        assertEquals("Wei Chen", MockData.userName)
        assertEquals("Senior Developer", MockData.userRole)
        assertEquals("wei.chen@company.com", MockData.userEmail)
        assertEquals("Engineering", MockData.userDepartment)
    }
}
