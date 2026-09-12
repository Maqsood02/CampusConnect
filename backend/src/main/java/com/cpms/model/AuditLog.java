package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "audit_logs")
public class AuditLog {

    @Id
    private String id;

    private String userId;
    private String userEmail;
    private String action;
    private String ipAddress;
    private String details;

    @CreatedDate
    private Instant timestamp;

    public AuditLog() {}

    public AuditLog(String id, String userId, String userEmail, String action, String ipAddress, String details, Instant timestamp) {
        this.id = id;
        this.userId = userId;
        this.userEmail = userEmail;
        this.action = action;
        this.ipAddress = ipAddress;
        this.details = details;
        this.timestamp = timestamp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String userId;
        private String userEmail;
        private String action;
        private String ipAddress;
        private String details;
        private Instant timestamp;

        public Builder id(String id) { this.id = id; return this; }
        public Builder userId(String userId) { this.userId = userId; return this; }
        public Builder userEmail(String userEmail) { this.userEmail = userEmail; return this; }
        public Builder action(String action) { this.action = action; return this; }
        public Builder ipAddress(String ipAddress) { this.ipAddress = ipAddress; return this; }
        public Builder details(String details) { this.details = details; return this; }
        public Builder timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }

        public AuditLog build() {
            return new AuditLog(id, userId, userEmail, action, ipAddress, details, timestamp);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
