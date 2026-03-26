package com.workflow.graphql

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.InputArgument
import com.workflow.domain.model.ApprovalStatus
import com.workflow.domain.model.ApprovalStep
import com.workflow.domain.model.Workflow
import com.workflow.domain.model.WorkflowStatus
import com.workflow.repository.ApprovalStepRepository
import com.workflow.repository.WorkflowRepository
import java.time.Instant
import java.util.UUID

@DgsComponent
class WorkflowMutation(
    private val workflowRepository: WorkflowRepository,
    private val approvalStepRepository: ApprovalStepRepository,
) {
    @DgsMutation
    fun createWorkflow(
        @InputArgument title: String,
        @InputArgument description: String?,
        @InputArgument requesterId: String,
        @InputArgument orgId: String,
    ): Workflow {
        val workflow =
            Workflow(
                title = title,
                description = description,
                status = WorkflowStatus.DRAFT,
                requesterId = UUID.fromString(requesterId),
                orgId = UUID.fromString(orgId),
            )
        return workflowRepository.save(workflow)
    }

    @DgsMutation
    fun approveStep(
        @InputArgument stepId: String,
        @InputArgument comment: String?,
    ): ApprovalStep {
        val step =
            approvalStepRepository.findById(UUID.fromString(stepId))
                .orElseThrow { IllegalArgumentException("Step not found: $stepId") }
        step.status = ApprovalStatus.APPROVED
        step.comment = comment
        step.decidedAt = Instant.now()
        return approvalStepRepository.save(step)
    }

    @DgsMutation
    fun rejectStep(
        @InputArgument stepId: String,
        @InputArgument comment: String?,
    ): ApprovalStep {
        val step =
            approvalStepRepository.findById(UUID.fromString(stepId))
                .orElseThrow { IllegalArgumentException("Step not found: $stepId") }
        step.status = ApprovalStatus.REJECTED
        step.comment = comment
        step.decidedAt = Instant.now()
        return approvalStepRepository.save(step)
    }
}
