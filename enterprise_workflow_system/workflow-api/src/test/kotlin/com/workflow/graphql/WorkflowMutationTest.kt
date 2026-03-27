package com.workflow.graphql

import com.workflow.domain.model.ApprovalStatus
import com.workflow.domain.model.ApprovalStep
import com.workflow.domain.model.Workflow
import com.workflow.domain.model.WorkflowStatus
import com.workflow.repository.ApprovalStepRepository
import com.workflow.repository.WorkflowRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.any
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import java.util.Optional
import java.util.UUID

class WorkflowMutationTest {
    private lateinit var workflowRepo: WorkflowRepository
    private lateinit var approvalStepRepo: ApprovalStepRepository
    private lateinit var mutation: WorkflowMutation

    @BeforeEach
    fun setUp() {
        workflowRepo = mock(WorkflowRepository::class.java)
        approvalStepRepo = mock(ApprovalStepRepository::class.java)
        mutation = WorkflowMutation(workflowRepo, approvalStepRepo)
    }

    @Test
    fun `createWorkflow should save workflow with DRAFT status`() {
        val requesterId = UUID.randomUUID()
        val orgId = UUID.randomUUID()

        `when`(workflowRepo.save(any(Workflow::class.java))).thenAnswer { it.arguments[0] }

        val result =
            mutation.createWorkflow(
                title = "New Workflow",
                description = "Test desc",
                requesterId = requesterId.toString(),
                orgId = orgId.toString(),
            )

        assertEquals("New Workflow", result.title)
        assertEquals("Test desc", result.description)
        assertEquals(WorkflowStatus.DRAFT, result.status)
        assertEquals(requesterId, result.requesterId)
        verify(workflowRepo).save(any(Workflow::class.java))
    }

    @Test
    fun `approveStep should set status to APPROVED and add timestamp`() {
        val stepId = UUID.randomUUID()
        val step = ApprovalStep(id = stepId, status = ApprovalStatus.PENDING)
        `when`(approvalStepRepo.findById(stepId)).thenReturn(Optional.of(step))
        `when`(approvalStepRepo.save(any(ApprovalStep::class.java))).thenAnswer { it.arguments[0] }

        val result = mutation.approveStep(stepId.toString(), "Looks good")

        assertEquals(ApprovalStatus.APPROVED, result.status)
        assertEquals("Looks good", result.comment)
        assertNotNull(result.decidedAt)
    }

    @Test
    fun `rejectStep should set status to REJECTED`() {
        val stepId = UUID.randomUUID()
        val step = ApprovalStep(id = stepId, status = ApprovalStatus.PENDING)
        `when`(approvalStepRepo.findById(stepId)).thenReturn(Optional.of(step))
        `when`(approvalStepRepo.save(any(ApprovalStep::class.java))).thenAnswer { it.arguments[0] }

        val result = mutation.rejectStep(stepId.toString(), "Not approved")

        assertEquals(ApprovalStatus.REJECTED, result.status)
        assertEquals("Not approved", result.comment)
    }

    @Test
    fun `approveStep should throw for unknown step`() {
        val stepId = UUID.randomUUID()
        `when`(approvalStepRepo.findById(stepId)).thenReturn(Optional.empty())

        assertThrows<IllegalArgumentException> {
            mutation.approveStep(stepId.toString(), null)
        }
    }

    @Test
    fun `rejectStep should throw for unknown step`() {
        val stepId = UUID.randomUUID()
        `when`(approvalStepRepo.findById(stepId)).thenReturn(Optional.empty())

        assertThrows<IllegalArgumentException> {
            mutation.rejectStep(stepId.toString(), null)
        }
    }
}
