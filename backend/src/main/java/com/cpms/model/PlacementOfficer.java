package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "placement_officers")
public class PlacementOfficer {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private String fullName;
    private String email;
    private String department;
    private String phone;
    private String officerCode;
    private String avatarUrl;

    @CreatedDate
    private Instant createdAt;

    public PlacementOfficer() {}

    public PlacementOfficer(String id, String userId, String fullName, String email, String department, String phone, String officerCode, String avatarUrl, Instant createdAt) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.phone = phone;
        this.officerCode = officerCode;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String userId;
        private String fullName;
        private String email;
        private String department;
        private String phone;
        private String officerCode;
        private String avatarUrl;
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder userId(String userId) { this.userId = userId; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder officerCode(String officerCode) { this.officerCode = officerCode; return this; }
        public Builder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public PlacementOfficer build() {
            return new PlacementOfficer(id, userId, fullName, email, department, phone, officerCode, avatarUrl, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getOfficerCode() { return officerCode; }
    public void setOfficerCode(String officerCode) { this.officerCode = officerCode; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
