package com.workflow.notification.service

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.argThat
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender

class EmailServiceTest {
    private lateinit var mailSender: JavaMailSender
    private lateinit var emailService: EmailService

    @BeforeEach
    fun setUp() {
        mailSender = mock(JavaMailSender::class.java)
        emailService = EmailService(mailSender)
    }

    @Test
    fun `sendNotification should send email with correct fields`() {
        emailService.sendNotification(
            to = "test@example.com",
            subject = "Test Subject",
            body = "Test body content",
        )

        verify(mailSender).send(
            argThat<SimpleMailMessage> { msg ->
                msg.to?.contains("test@example.com") == true &&
                    msg.subject == "Test Subject" &&
                    msg.text == "Test body content" &&
                    msg.from == "noreply@workflow.local"
            },
        )
    }

    @Test
    fun `sendNotification should use correct from address`() {
        emailService.sendNotification(
            to = "user@test.com",
            subject = "Sub",
            body = "Body",
        )

        verify(mailSender).send(
            argThat<SimpleMailMessage> { msg ->
                msg.from == "noreply@workflow.local"
            },
        )
    }
}
