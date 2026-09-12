package com.cpms.service;

import com.cpms.model.Notification;
import com.cpms.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Notification sendNotification(String title, String message, String type) {
        Notification notif = Notification.builder()
                .title(title)
                .message(message)
                .type(type)
                .read(false)
                .createdAt(Instant.now())
                .build();
        return notificationRepository.save(notif);
    }

    public void markAllRead() {
        List<Notification> list = notificationRepository.findAll();
        list.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(list);
    }
}
