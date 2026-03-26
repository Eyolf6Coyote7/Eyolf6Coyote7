package com.workflow.domain.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

enum class UserRole {
    ADMIN,
    MANAGER,
    EMPLOYEE,
}

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    @Column(nullable = false, unique = true)
    val email: String = "",
    @Column(nullable = false)
    var displayName: String = "",
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var role: UserRole = UserRole.EMPLOYEE,
    @Column(nullable = false)
    val orgId: UUID = UUID.randomUUID(),
)
