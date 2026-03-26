package com.workflow.domain.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

enum class ApprovalStatus {
    PENDING,
    APPROVED,
    REJECTED,
}

@Entity
@Table(name = "approval_steps")
data class ApprovalStep(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    @Column(nullable = false)
    val workflowId: UUID = UUID.randomUUID(),
    @Column(nullable = false)
    val stepOrder: Int = 0,
    @Column(nullable = false)
    val assigneeId: UUID = UUID.randomUUID(),
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: ApprovalStatus = ApprovalStatus.PENDING,
    @Column(columnDefinition = "TEXT")
    var comment: String? = null,
    var decidedAt: Instant? = null,
)
