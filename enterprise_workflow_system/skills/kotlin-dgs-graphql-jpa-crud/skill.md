---
name: kotlin-dgs-graphql-jpa-crud
description: Add a new GraphQL type or operation to a Spring Boot + Kotlin + Netflix DGS + JPA repository service. Covers DataFetcher / Mutation / Repository / JPA Entity wiring.
---

## When to use

Trigger when the user asks to:
- add a new GraphQL query / mutation to `workflow-api`
- add a new entity / table to the workflow-api Spring Boot service
- mentions `@DgsComponent`, `@DgsQuery`, `@DgsMutation`, `@InputArgument`, `JpaRepository`, `@Entity`
- expand the workflow / approval / step domain model

This skill is intentionally CONVERGED — one skill covers Query, Mutation, Repository AND Entity work because the patterns repeat. Per the slide thesis: backend collapses into a small number of high-coverage skills.

## Context

`workflow-api` is Spring Boot 3 + Kotlin + Netflix DGS GraphQL + JPA (Postgres). The full server's GraphQL surface is two files plus two repository interfaces:

- `workflow-api/src/main/kotlin/com/workflow/graphql/WorkflowDataFetcher.kt:13-34` — `@DgsQuery` methods (`workflows`, `workflow(id)`, `myApprovals(assigneeId)`)
- `workflow-api/src/main/kotlin/com/workflow/graphql/WorkflowMutation.kt:15-65` — `@DgsMutation` methods (`createWorkflow`, `approveStep`, `rejectStep`)
- `workflow-api/src/main/kotlin/com/workflow/repository/WorkflowRepository.kt:10-27` — `JpaRepository<T, UUID>` interfaces with spring-data method-name queries (`findByRequesterId`, `findByOrgId`, `findByStatus`, `findByAssigneeIdAndStatus`)
- `workflow-api/src/main/kotlin/com/workflow/domain/model/Workflow.kt:21-42` — `@Entity data class Workflow(@Id @GeneratedValue(strategy = GenerationType.UUID) val id: UUID? = null, ...)`

Conventions:
1. All IDs are `UUID` with `@GeneratedValue(strategy = GenerationType.UUID)`. GraphQL accepts them as `String` (`@InputArgument id: String`) and converts via `UUID.fromString(id)` inside the resolver.
2. Mutations look up the entity via `repository.findById(UUID.fromString(id)).orElseThrow { IllegalArgumentException("...") }`, mutate fields, then `repository.save(it)`.
3. Repositories use **spring-data method naming** (no `@Query` annotations) — `findByXxxAndYyy`, `findByXxxOrderByZzz`. Compose method names rather than writing JPQL.
4. Enum fields use `@Enumerated(EnumType.STRING)` so the DB stores readable values.
5. Timestamps use `java.time.Instant` not `LocalDateTime`.
6. There is no service layer between the data fetcher and the repository — DGS components inject repositories directly. This is the project's intentional simplicity rule.

## Operating instructions

When adding a new entity `Foo` with `list` query, `findById` query, and `create` mutation:

1. Create `domain/model/Foo.kt` as a `@Entity @Table(name = "foos") data class Foo(...)`. Use the field annotations from `Workflow.kt`. Always:
   - `@Id @GeneratedValue(strategy = GenerationType.UUID) val id: UUID? = null`
   - `@Column(nullable = false, updatable = false) val createdAt: Instant = Instant.now()`
   - `@Column(nullable = false) var updatedAt: Instant = Instant.now()`
2. Create `repository/FooRepository.kt`:
   ```kotlin
   @Repository
   interface FooRepository : JpaRepository<Foo, UUID> {
       fun findByOrgId(orgId: UUID): List<Foo>
   }
   ```
3. Add a query method to `graphql/FooDataFetcher.kt`:
   ```kotlin
   @DgsComponent
   class FooDataFetcher(private val repo: FooRepository) {
       @DgsQuery fun foos(): List<Foo> = repo.findAll()
       @DgsQuery fun foo(@InputArgument id: String): Foo? = repo.findById(UUID.fromString(id)).orElse(null)
   }
   ```
4. Add a mutation in `graphql/FooMutation.kt` mirroring `WorkflowMutation.createWorkflow` (line 20-36).
5. Add the GraphQL schema (`.graphqls` file under `src/main/resources/schema/`) declaring `type Foo`, `extend type Query { foos: [Foo!]! ... }`, `extend type Mutation { createFoo(...): Foo! }`.
6. Add a Flyway migration under `src/main/resources/db/migration/` with `V<n>__create_foos.sql` matching the entity columns.
7. NO service-layer file. NO DTO mapper. The entity IS the GraphQL type.

## Reusable prompts / code patterns

Entity skeleton:
```kotlin
package com.workflow.domain.model

import jakarta.persistence.*
import java.time.Instant
import java.util.UUID

enum class FooStatus { DRAFT, ACTIVE, ARCHIVED }

@Entity
@Table(name = "foos")
data class Foo(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    @Column(nullable = false)
    var name: String = "",
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: FooStatus = FooStatus.DRAFT,
    @Column(nullable = false)
    val orgId: UUID = UUID.randomUUID(),
    @Column(nullable = false, updatable = false)
    val createdAt: Instant = Instant.now(),
    @Column(nullable = false)
    var updatedAt: Instant = Instant.now(),
)
```

Repository (spring-data method names only):
```kotlin
@Repository
interface FooRepository : JpaRepository<Foo, UUID> {
    fun findByOrgId(orgId: UUID): List<Foo>
    fun findByStatus(status: FooStatus): List<Foo>
}
```

DataFetcher + Mutation:
```kotlin
@DgsComponent
class FooDataFetcher(private val repo: FooRepository) {
    @DgsQuery fun foos(): List<Foo> = repo.findAll()
    @DgsQuery fun foo(@InputArgument id: String): Foo? = repo.findById(UUID.fromString(id)).orElse(null)
}

@DgsComponent
class FooMutation(private val repo: FooRepository) {
    @DgsMutation
    fun createFoo(@InputArgument name: String, @InputArgument orgId: String): Foo {
        return repo.save(Foo(name = name, orgId = UUID.fromString(orgId)))
    }

    @DgsMutation
    fun archiveFoo(@InputArgument id: String): Foo {
        val foo = repo.findById(UUID.fromString(id)).orElseThrow { IllegalArgumentException("Foo not found: $id") }
        foo.status = FooStatus.ARCHIVED
        foo.updatedAt = Instant.now()
        return repo.save(foo)
    }
}
```

## Anti-patterns

- Do NOT add a service layer. DGS components inject the repository directly.
- Do NOT use `LocalDateTime`. Always `Instant` for timestamps.
- Do NOT use `@Query` JPQL — compose spring-data method names instead.
- Do NOT return `Optional<T>` from a `@DgsQuery` — return `T?` and handle null with `.orElse(null)`.
- Do NOT introduce DTOs for mutation inputs — use `@InputArgument` parameters per field.
- Do NOT use `@Enumerated(EnumType.ORDINAL)` — always `STRING` so the DB stays human-readable.
- Do NOT use auto-increment Long IDs — always UUID with `GenerationType.UUID`.

## References

- `workflow-api/src/main/kotlin/com/workflow/graphql/WorkflowDataFetcher.kt:13-34`
- `workflow-api/src/main/kotlin/com/workflow/graphql/WorkflowMutation.kt:15-65`
- `workflow-api/src/main/kotlin/com/workflow/repository/WorkflowRepository.kt:10-27`
- `workflow-api/src/main/kotlin/com/workflow/domain/model/Workflow.kt:21-42`
- `workflow-api/src/main/kotlin/com/workflow/config/GraphQLConfig.kt` — DGS config
