package com.cpms.controller;

import com.cpms.model.Notification;
import com.cpms.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;
    private final com.cpms.service.EmailService emailService;

    public NotificationController(NotificationService notificationService, com.cpms.service.EmailService emailService) {
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam(required = false) String userId) {
        if (userId != null) {
            return ResponseEntity.ok(notificationService.getUserNotifications(userId));
        }
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @PostMapping("/read-all")
    public ResponseEntity<Map<String, String>> markAllRead() {
        notificationService.markAllRead();
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }

    @PostMapping("/test-email")
    public ResponseEntity<Map<String, Object>> sendTestEmail(@RequestBody Map<String, String> body) {
        String to = body.getOrDefault("to", "cpms.ac.in@gmail.com");
        String subject = body.getOrDefault("subject", "CampusConnect Live Mailer Verification");
        String message = body.getOrDefault("message", "Live test email from CampusConnect Placement System.");

        emailService.sendTestEmail(to, subject, message);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "recipient", to,
                "message", "Test email queued for delivery via Gmail SMTP to " + to
        ));
    }
}
