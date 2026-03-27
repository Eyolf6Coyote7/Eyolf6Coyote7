package com.workflow.notification.consumer

import com.workflow.notification.service.EmailService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.anyString
import org.mockito.Mockito.argThat
import org.mockito.Mockito.doThrow
import org.mockito.Mockito.eq
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify

class ApprovalEventConsumerTest {
    private lateinit var emailService: EmailService
    private lateinit var consumer: ApprovalEventConsumer

    @BeforeEach
    fun setUp() {
        emailService = mock(EmailService::class.java)
        consumer = ApprovalEventConsumer(emailService)
    }

    @Test
    fun `handleApprovalEvent should send email to manager`() {
        consumer.handleApprovalEvent("Workflow WF-001 submitted")

        verify(emailService).sendNotification(
            eq("manager@example.com"),
            eq("Workflow Approval Required"),
            contains("WF-001"),
        )
    }

    @Test
    fun `handleApprovalEvent should not throw when email fails`() {
        doThrow(RuntimeException("SMTP error"))
            .`when`(emailService)
            .sendNotification(anyString(), anyString(), anyString())

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
            .`when`(emailService)
            .sendNotification(anyString(), anyString(), anyString())

        consumer.handleNotification("test message")
    }

    private fun contains(substring: String): String {
        return argThat<String> { it?.contains(substring) == true } ?: ""
    }
}
