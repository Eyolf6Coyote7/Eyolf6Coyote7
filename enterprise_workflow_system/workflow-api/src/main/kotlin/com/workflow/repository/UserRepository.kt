package com.workflow.repository

import com.workflow.domain.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface UserRepository : JpaRepository<User, UUID> {
    fun findByEmail(email: String): User?

    fun findByOrgId(orgId: UUID): List<User>
}
