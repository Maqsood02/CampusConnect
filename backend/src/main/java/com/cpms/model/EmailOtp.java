package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "email_otps")
public class EmailOtp {

    @Id
    private String id;

    @Indexed
    private String email;

    private String otp;

    private String purpose; // REGISTRATION, PASSWORD_RESET, VERIFICATION

    private Instant expiresAt;

    private boolean verified = false;

    @CreatedDate
    private Instant createdAt;

    public EmailOtp() {}

    public EmailOtp(String id, String email, String otp, String purpose, Instant expiresAt, boolean verified, Instant createdAt) {
        this.id = id;
        this.email = email;
        this.otp = otp;
        this.purpose = purpose;
        this.expiresAt = expiresAt;
        this.verified = verified;
        this.createdAt = createdAt;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String id;
        private String email;
        private String otp;
        private String purpose;
        private Instant expiresAt;
        private boolean verified = false;
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder otp(String otp) { this.otp = otp; return this; }
        public Builder purpose(String purpose) { this.purpose = purpose; return this; }
        public Builder expiresAt(Instant expiresAt) { this.expiresAt = expiresAt; return this; }
        public Builder verified(boolean verified) { this.verified = verified; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public EmailOtp build() {
            return new EmailOtp(id, email, otp, purpose, expiresAt, verified, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
