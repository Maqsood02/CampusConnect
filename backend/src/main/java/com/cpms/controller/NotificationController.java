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

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
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
}
