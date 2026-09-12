package com.cpms.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;

class EmailServiceTest {

    private EmailService emailService;

    @BeforeEach
    void setUp() {
        // Without JavaMailSender to test simulated/offline fallback
        emailService = new EmailService(null);
    }

    @Test
    @DisplayName("Should render premium HTML email with branding, body, and CTA button")
    void testRenderEmailHtml() {
        String html = emailService.renderEmailHtml(
                "Interview Round Scheduled",
                "You have been invited for Google Interview",
                "<p>Congratulations on clearing Round 1.</p>",
                "Join Virtual Room",
                "https://meet.google.com/cpms-interview"
        );

        assertNotNull(html);
        assertTrue(html.contains("CPMS Institutional Portal"));
        assertTrue(html.contains("Interview Round Scheduled"));
        assertTrue(html.contains("Join Virtual Room"));
        assertTrue(html.contains("https://meet.google.com/cpms-interview"));
        assertTrue(html.contains("Training &amp; Placement Cell"));
    }

    @Test
    @DisplayName("Should successfully dispatch simulated email asynchronously")
    void testSendEmailAsyncSimulated() throws Exception {
        CompletableFuture<Boolean> future = emailService.sendEmailAsync(
                "student@cpms.edu",
                "Application Update",
                "<h1>Congratulations</h1>"
        );

        Boolean result = future.get();
        assertTrue(result);
    }

    @Test
    @DisplayName("Should trigger welcome email without throwing exceptions")
    void testSendWelcomeEmail() {
        assertDoesNotThrow(() -> emailService.sendWelcomeEmail("student@cpms.edu", "Alex Mercer", "Student"));
    }

    @Test
    @DisplayName("Should trigger interview scheduled email without throwing exceptions")
    void testSendInterviewScheduledEmail() {
        assertDoesNotThrow(() -> emailService.sendInterviewScheduledEmail(
                "student@cpms.edu",
                "Alex Mercer",
                "Software Engineer",
                "Google",
                "Technical Round 1",
                "2026-09-15 10:00 AM",
                "https://meet.google.com/abc-xyz",
                "Google Meet"
        ));
    }

    @Test
    @DisplayName("Should trigger placement offer email without throwing exceptions")
    void testSendPlacementOfferEmail() {
        assertDoesNotThrow(() -> emailService.sendPlacementOfferEmail(
                "student@cpms.edu",
                "Alex Mercer",
                "Full Stack Developer",
                "Microsoft",
                24.0
        ));
    }
}
