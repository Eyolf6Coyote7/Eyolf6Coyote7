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

enum class WorkflowStatus {
    DRAFT,
    PENDING,
    APPROVED,
    REJECTED,
}

@Entity
@Table(name = "workflows")
data class Workflow(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    @Column(nullable = false)
    var title: String = "",
    @Column(columnDefinition = "TEXT")
    var description: String? = null,
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: WorkflowStatus = WorkflowStatus.DRAFT,
    @Column(nullable = false)
    val requesterId: UUID = UUID.randomUUID(),
    @Column(nullable = false)
    val orgId: UUID = UUID.randomUUID(),
    @Column(nullable = false, updatable = false)
    val createdAt: Instant = Instant.now(),
    @Column(nullable = false)
    var updatedAt: Instant = Instant.now(),
)
