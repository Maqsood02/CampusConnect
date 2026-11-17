package com.cpms.service;

import com.cpms.model.EmailOtp;
import com.cpms.repository.EmailOtpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);
    private static final Duration OTP_EXPIRATION = Duration.ofMinutes(10);
    private static final SecureRandom random = new SecureRandom();

    private final EmailOtpRepository otpRepository;
    private final EmailService emailService;

    // In-memory cache for ultra-fast validation alongside MongoDB persistence
    private final Map<String, EmailOtp> otpCache = new ConcurrentHashMap<>();

    public OtpService(EmailOtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public String generateAndSendOtp(String email, String purpose) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email address is required to dispatch verification OTP.");
        }

        String cleanEmail = email.trim().toLowerCase();
        String safePurpose = (purpose != null && !purpose.isBlank()) ? purpose.toUpperCase() : "REGISTRATION";

        // Generate cryptographically secure 6-digit numeric code
        String otp = String.format("%06d", random.nextInt(1_000_000));
        Instant now = Instant.now();
        Instant expiresAt = now.plus(OTP_EXPIRATION);

        EmailOtp emailOtp = EmailOtp.builder()
                .email(cleanEmail)
                .otp(otp)
                .purpose(safePurpose)
                .expiresAt(expiresAt)
                .verified(false)
                .createdAt(now)
                .build();

        try {
            emailOtp = otpRepository.save(emailOtp);
        } catch (Exception e) {
            log.warn("Could not persist OTP to MongoDB, using memory cache: {}", e.getMessage());
        }

        // Cache in memory keyed by email:purpose
        otpCache.put(cleanEmail + ":" + safePurpose, emailOtp);
        otpCache.put(cleanEmail, emailOtp);

        log.info("[OTP Generated] Dispatched 6-digit OTP for {} (Purpose: {})", cleanEmail, safePurpose);

        // Dispatch via Gmail SMTP
        emailService.sendOtpEmail(cleanEmail, otp, safePurpose);

        return otp;
    }

    public boolean verifyOtp(String email, String otp, String purpose) {
        if (email == null || otp == null || otp.isBlank()) {
            return false;
        }

        String cleanEmail = email.trim().toLowerCase();
        String cleanOtp = otp.trim();
        String safePurpose = (purpose != null && !purpose.isBlank()) ? purpose.toUpperCase() : "REGISTRATION";
        Instant now = Instant.now();

        // 1. Check in-memory cache first
        EmailOtp cached = otpCache.get(cleanEmail + ":" + safePurpose);
        if (cached == null) {
            cached = otpCache.get(cleanEmail);
        }

        if (cached != null && cleanOtp.equals(cached.getOtp())) {
            if (now.isBefore(cached.getExpiresAt())) {
                cached.setVerified(true);
                try {
                    otpRepository.save(cached);
                } catch (Exception ignored) {}
                log.info("[OTP Verified] Successfully validated OTP for {}", cleanEmail);
                return true;
            } else {
                log.warn("[OTP Expired] OTP for {} has expired at {}", cleanEmail, cached.getExpiresAt());
                return false;
            }
        }

        // 2. Fallback to MongoDB lookup
        Optional<EmailOtp> dbOtp = otpRepository.findTopByEmailAndPurposeOrderByCreatedAtDesc(cleanEmail, safePurpose);
        if (dbOtp.isEmpty()) {
            dbOtp = otpRepository.findTopByEmailOrderByCreatedAtDesc(cleanEmail);
        }

        if (dbOtp.isPresent()) {
            EmailOtp record = dbOtp.get();
            if (cleanOtp.equals(record.getOtp()) && now.isBefore(record.getExpiresAt())) {
                record.setVerified(true);
                otpRepository.save(record);
                otpCache.put(cleanEmail + ":" + safePurpose, record);
                log.info("[OTP Verified from DB] Successfully validated OTP for {}", cleanEmail);
                return true;
            }
        }

        log.warn("[OTP Validation Failed] Invalid or expired OTP for {}", cleanEmail);
        return false;
    }

    public boolean isEmailVerified(String email) {
        if (email == null || email.isBlank()) return false;
        String cleanEmail = email.trim().toLowerCase();

        EmailOtp cached = otpCache.get(cleanEmail);
        if (cached != null && cached.isVerified()) {
            return true;
        }

        Optional<EmailOtp> dbOtp = otpRepository.findTopByEmailOrderByCreatedAtDesc(cleanEmail);
        return dbOtp.isPresent() && dbOtp.get().isVerified();
    }
}
