package com.workflow.notification.consumer

import com.workflow.notification.service.EmailService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.argThat
import org.mockito.kotlin.doThrow
import org.mockito.kotlin.eq
import org.mockito.kotlin.mock
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever

class ApprovalEventConsumerTest {
    private lateinit var emailService: EmailService
    private lateinit var consumer: ApprovalEventConsumer

    @BeforeEach
    fun setUp() {
        emailService = mock()
        consumer = ApprovalEventConsumer(emailService)
    }

    @Test
    fun `handleApprovalEvent should send email to manager`() {
        consumer.handleApprovalEvent("Workflow WF-001 submitted")

        verify(emailService).sendNotification(
            eq("manager@example.com"),
            eq("Workflow Approval Required"),
            argThat { contains("WF-001") },
        )
    }

    @Test
    fun `handleApprovalEvent should not throw when email fails`() {
        doThrow(RuntimeException("SMTP error"))
            .whenever(emailService)
            .sendNotification(any(), any(), any())

        // Should not throw
        consumer.handleApprovalEvent("test message")
    }

    @Test
    fun `handleNotification should send email to user`() {
        consumer.handleNotification("Your request was approved")

        verify(emailService).sendNotification(
            eq("user@example.com"),
            eq("Workflow Status Update"),
            eq("Your request was approved"),
        )
    }

    @Test
    fun `handleNotification should not throw when email fails`() {
        doThrow(RuntimeException("SMTP error"))
            .whenever(emailService)
            .sendNotification(any(), any(), any())

        consumer.handleNotification("test message")
    }
}
