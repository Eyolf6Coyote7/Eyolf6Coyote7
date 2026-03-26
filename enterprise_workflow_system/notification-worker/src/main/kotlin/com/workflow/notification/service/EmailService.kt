package com.workflow.notification.service

import org.slf4j.LoggerFactory
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService(
    private val mailSender: JavaMailSender,
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    fun sendNotification(
        to: String,
        subject: String,
        body: String,
    ) {
        val message =
            SimpleMailMessage().apply {
                setTo(to)
                setSubject(subject)
                setText(body)
                setFrom("noreply@workflow.local")
            }
        mailSender.send(message)
        logger.info("Email sent to $to: $subject")
    }
}
