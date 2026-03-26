package com.workflow.repository

import com.workflow.domain.model.ApprovalStep
import com.workflow.domain.model.Workflow
import com.workflow.domain.model.WorkflowStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface WorkflowRepository : JpaRepository<Workflow, UUID> {
    fun findByRequesterId(requesterId: UUID): List<Workflow>

    fun findByOrgId(orgId: UUID): List<Workflow>

    fun findByStatus(status: WorkflowStatus): List<Workflow>
}

@Repository
interface ApprovalStepRepository : JpaRepository<ApprovalStep, UUID> {
    fun findByWorkflowIdOrderByStepOrder(workflowId: UUID): List<ApprovalStep>

    fun findByAssigneeIdAndStatus(
        assigneeId: UUID,
        status: com.workflow.domain.model.ApprovalStatus,
    ): List<ApprovalStep>
}
