package com.workflow.notification

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource

@SpringBootTest
@TestPropertySource(
    properties = [
        "spring.kafka.bootstrap-servers=localhost:9095",
        "spring.kafka.consumer.auto-offset-reset=earliest",
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration",
    ],
)
class NotificationWorkerApplicationTests {
    @Test
    fun contextLoads() {
    }
}
