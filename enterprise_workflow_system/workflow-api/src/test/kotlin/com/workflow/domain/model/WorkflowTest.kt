package com.workflow.domain.model

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class WorkflowTest {
    @Test
    fun `default status should be DRAFT`() {
        val workflow = Workflow(title = "Test")
        assertEquals(WorkflowStatus.DRAFT, workflow.status)
    }

    @Test
    fun `status can be changed to APPROVED`() {
        val workflow = Workflow(title = "Test")
        workflow.status = WorkflowStatus.APPROVED
        assertEquals(WorkflowStatus.APPROVED, workflow.status)
    }

    @Test
    fun `WorkflowStatus enum values`() {
        val values = WorkflowStatus.values()
        assertEquals(4, values.size)
        assertTrue(values.contains(WorkflowStatus.DRAFT))
        assertTrue(values.contains(WorkflowStatus.PENDING))
        assertTrue(values.contains(WorkflowStatus.APPROVED))
        assertTrue(values.contains(WorkflowStatus.REJECTED))
    }
}

class ApprovalStepTest {
    @Test
    fun `default status should be PENDING`() {
        val step = ApprovalStep()
        assertEquals(ApprovalStatus.PENDING, step.status)
    }

    @Test
    fun `decidedAt should be null by default`() {
        val step = ApprovalStep()
        assertNull(step.decidedAt)
    }

    @Test
    fun `ApprovalStatus enum values`() {
        val values = ApprovalStatus.values()
        assertEquals(3, values.size)
    }
}

class UserTest {
    @Test
    fun `default role should be EMPLOYEE`() {
        val user = User(email = "test@test.com", displayName = "Test")
        assertEquals(UserRole.EMPLOYEE, user.role)
    }

    @Test
    fun `UserRole enum values`() {
        val values = UserRole.values()
        assertEquals(3, values.size)
        assertTrue(values.contains(UserRole.ADMIN))
        assertTrue(values.contains(UserRole.MANAGER))
        assertTrue(values.contains(UserRole.EMPLOYEE))
    }
}
