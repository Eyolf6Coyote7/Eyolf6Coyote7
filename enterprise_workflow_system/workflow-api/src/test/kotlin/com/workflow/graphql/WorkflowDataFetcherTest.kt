package com.workflow.graphql

import com.workflow.domain.model.ApprovalStatus
import com.workflow.domain.model.ApprovalStep
import com.workflow.domain.model.Workflow
import com.workflow.domain.model.WorkflowStatus
import com.workflow.repository.ApprovalStepRepository
import com.workflow.repository.WorkflowRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`
import java.util.Optional
import java.util.UUID

class WorkflowDataFetcherTest {
    private lateinit var workflowRepo: WorkflowRepository
    private lateinit var approvalStepRepo: ApprovalStepRepository
    private lateinit var fetcher: WorkflowDataFetcher

    @BeforeEach
    fun setUp() {
        workflowRepo = mock(WorkflowRepository::class.java)
        approvalStepRepo = mock(ApprovalStepRepository::class.java)
        fetcher = WorkflowDataFetcher(workflowRepo, approvalStepRepo)
    }

    @Test
    fun `workflows should return all workflows`() {
        val workflows =
            listOf(
                Workflow(id = UUID.randomUUID(), title = "WF1", status = WorkflowStatus.DRAFT),
                Workflow(id = UUID.randomUUID(), title = "WF2", status = WorkflowStatus.PENDING),
            )
        `when`(workflowRepo.findAll()).thenReturn(workflows)

        val result = fetcher.workflows()
        assertEquals(2, result.size)
        assertEquals("WF1", result[0].title)
    }

    @Test
    fun `workflow should return single workflow by id`() {
        val id = UUID.randomUUID()
        val workflow = Workflow(id = id, title = "Test", status = WorkflowStatus.DRAFT)
        `when`(workflowRepo.findById(id)).thenReturn(Optional.of(workflow))

        val result = fetcher.workflow(id.toString())
        assertNotNull(result)
        assertEquals("Test", result?.title)
    }

    @Test
    fun `workflow should return null for unknown id`() {
        val id = UUID.randomUUID()
        `when`(workflowRepo.findById(id)).thenReturn(Optional.empty())

        val result = fetcher.workflow(id.toString())
        assertNull(result)
    }

    @Test
    fun `myApprovals should return pending steps for assignee`() {
        val assigneeId = UUID.randomUUID()
        val steps =
            listOf(
                ApprovalStep(id = UUID.randomUUID(), assigneeId = assigneeId, status = ApprovalStatus.PENDING),
            )
        `when`(approvalStepRepo.findByAssigneeIdAndStatus(assigneeId, ApprovalStatus.PENDING))
            .thenReturn(steps)

        val result = fetcher.myApprovals(assigneeId.toString())
        assertEquals(1, result.size)
        assertEquals(ApprovalStatus.PENDING, result[0].status)
    }
}
