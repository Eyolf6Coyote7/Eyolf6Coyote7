---
name: kotlin-kafka-notification-worker
description: Add a new Kafka topic listener to the notification-worker Spring Boot service using @KafkaListener with structured logging and email side-effect.
---

## When to use

Trigger when the user asks to:
- consume a new Kafka topic in the `notification-worker` service
- add a new event-driven worker handler
- mentions `@KafkaListener`, `EmailService`, `groupId`, `workflow.approval-events`, `workflow.notifications`
- send notifications in response to backend events

This skill is intentionally CONVERGED — one skill covers all event-driven worker patterns because new consumers all follow the same recipe.

## Context

`notification-worker` is a standalone Spring Boot Kotlin service that subscribes to Kafka topics published by `workflow-api`. The canonical consumer file is `notification-worker/src/main/kotlin/com/workflow/notification/consumer/ApprovalEventConsumer.kt:1-42`.

Defining traits:
1. **`@Component`-annotated class** with constructor-injected services (`EmailService` here).
2. **One method per `@KafkaListener`** topic. Each method takes `message: String` as the only parameter (raw payload — no JSON deserialization at the consumer layer).
3. **`groupId = "notification-worker"`** consistent across all consumer methods so the service runs as ONE consumer group (avoid splitting groups per topic).
4. **Logging contract** — log on receive, log on success, log on failure with the exception. Use SLF4J via `LoggerFactory.getLogger(javaClass)`.
5. **Try/catch around side effects** — failures log + swallow (do NOT rethrow). The worker keeps consuming the next message even if one notification fails.
6. **Side effects** are dispatched via injected services (`EmailService.sendNotification(to, subject, body)`); the consumer never touches SMTP / HTTP directly.
7. **No JSON parsing in the consumer** — currently the project takes the raw string payload. If structured payloads are needed later, parse inside a service, not the consumer.

## Operating instructions

When adding a new Kafka topic consumer:

1. Decide whether to add a new method to an existing consumer class OR a new class. Rule of thumb: same business domain → same class; different domain → new class.
2. Annotate the method with `@KafkaListener(topics = ["topic.name"], groupId = "notification-worker")`.
3. Take `message: String` as the only parameter — even if the producer sends JSON, accept it as a string and parse inside a service if needed.
4. Wrap the side effect in try/catch. Log success at `info`, log failure at `error` with the exception.
5. Inject any needed service via constructor (no `@Autowired` field injection).
6. If the new topic needs a different consumer group (rare), use `groupId = "notification-worker-<topic-purpose>"` and document why.
7. Add Spring Kafka topic config to `application.yml` only if the topic needs custom serializer / partitions — otherwise the defaults from `@KafkaListener` are enough.
8. Mirror the test file `consumer/ApprovalEventConsumerTest.kt` using `@EmbeddedKafka` for integration tests.

## Reusable prompts / code patterns

New consumer class:
```kotlin
package com.workflow.notification.consumer

import com.workflow.notification.service.EmailService
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component

@Component
class FooEventConsumer(
    private val emailService: EmailService,
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    @KafkaListener(topics = ["workflow.foo-events"], groupId = "notification-worker")
    fun handleFooEvent(message: String) {
        logger.info("Received foo event: $message")
        try {
            emailService.sendNotification(
                to = "stakeholder@example.com",
                subject = "Foo Event Notification",
                body = "A foo event was received.\n\nDetails: $message",
            )
            logger.info("Foo notification sent successfully")
        } catch (e: Exception) {
            logger.error("Failed to send foo notification", e)
        }
    }
}
```

Adding a method to the existing ApprovalEventConsumer:
```kotlin
@KafkaListener(topics = ["workflow.escalation-events"], groupId = "notification-worker")
fun handleEscalationEvent(message: String) {
    logger.info("Received escalation event: $message")
    try {
        emailService.sendNotification(
            to = "manager@example.com",
            subject = "Workflow Escalation",
            body = "A workflow has been escalated.\n\nDetails: $message",
        )
    } catch (e: Exception) {
        logger.error("Failed to send escalation notification", e)
    }
}
```

## Anti-patterns

- Do NOT rethrow exceptions from inside the listener — Spring Kafka will retry the same message and block the partition.
- Do NOT parse JSON inside the consumer — accept `String` and parse in a service.
- Do NOT split group IDs per topic without a strong reason — keep `groupId = "notification-worker"` so partition rebalancing stays sane.
- Do NOT call SMTP / HTTP / external APIs directly in the consumer — go through `EmailService` (or a sibling service).
- Do NOT use `@Autowired` field injection — always constructor injection.
- Do NOT log payloads at `info` if they may contain PII; log a redacted summary instead.

## References

- `notification-worker/src/main/kotlin/com/workflow/notification/consumer/ApprovalEventConsumer.kt:9-42` — both canonical handlers
- `notification-worker/src/main/kotlin/com/workflow/notification/service/EmailService.kt` — injected side-effect service
- `notification-worker/src/main/kotlin/com/workflow/notification/NotificationWorkerApplication.kt` — Spring Boot bootstrap
- `notification-worker/src/main/resources/application.yml` — Kafka broker config
