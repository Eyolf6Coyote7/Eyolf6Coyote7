package com.workflow.graphql

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument
import com.workflow.domain.model.ApprovalStatus
import com.workflow.domain.model.ApprovalStep
import com.workflow.domain.model.Workflow
import com.workflow.repository.ApprovalStepRepository
import com.workflow.repository.WorkflowRepository
import java.util.UUID

@DgsComponent
class WorkflowDataFetcher(
    private val workflowRepository: WorkflowRepository,
    private val approvalStepRepository: ApprovalStepRepository,
) {
    @DgsQuery
    fun workflows(): List<Workflow> = workflowRepository.findAll()

    @DgsQuery
    fun workflow(
        @InputArgument id: String,
    ): Workflow? = workflowRepository.findById(UUID.fromString(id)).orElse(null)

    @DgsQuery
    fun myApprovals(
        @InputArgument assigneeId: String,
    ): List<ApprovalStep> =
        approvalStepRepository.findByAssigneeIdAndStatus(
            UUID.fromString(assigneeId),
            ApprovalStatus.PENDING,
        )
}
