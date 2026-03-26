package com.workflow.notification.consumer

import com.workflow.notification.service.EmailService
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component

@Component
class ApprovalEventConsumer(
    private val emailService: EmailService,
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    @KafkaListener(topics = ["workflow.approval-events"], groupId = "notification-worker")
    fun handleApprovalEvent(message: String) {
        logger.info("Received approval event: $message")
        try {
            emailService.sendNotification(
                to = "manager@example.com",
                subject = "Workflow Approval Required",
                body = "A new workflow requires your approval.\n\nDetails: $message",
            )
            logger.info("Notification sent successfully")
        } catch (e: Exception) {
            logger.error("Failed to send notification", e)
        }
    }

    @KafkaListener(topics = ["workflow.notifications"], groupId = "notification-worker")
    fun handleNotification(message: String) {
        logger.info("Received notification event: $message")
        try {
            emailService.sendNotification(
                to = "user@example.com",
                subject = "Workflow Status Update",
                body = message,
            )
        } catch (e: Exception) {
            logger.error("Failed to send notification", e)
        }
    }
}
