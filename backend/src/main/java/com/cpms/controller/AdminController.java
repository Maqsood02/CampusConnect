package com.cpms.controller;

import com.cpms.dto.CreateOfficerRequest;
import com.cpms.model.AuditLog;
import com.cpms.model.PlacementOfficer;
import com.cpms.model.Role;
import com.cpms.model.User;
import com.cpms.repository.AuditLogRepository;
import com.cpms.repository.PlacementOfficerRepository;
import com.cpms.repository.UserRepository;
import com.cpms.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;
    private final PlacementOfficerRepository officerRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AdminController(UserRepository userRepository, 
                           AuditLogRepository auditLogRepository,
                           PlacementOfficerRepository officerRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService) {
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.officerRepository = officerRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/officers")
    public ResponseEntity<List<PlacementOfficer>> getAllOfficers() {
        return ResponseEntity.ok(officerRepository.findAll());
    }

    @PostMapping("/officers")
    public ResponseEntity<?> createOfficer(@RequestBody CreateOfficerRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Officer official email is required."));
            }
            if (request.getFullName() == null || request.getFullName().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Officer full name is required."));
            }
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("message", "Temporary password must be at least 6 characters."));
            }

            String cleanEmail = request.getEmail().trim().toLowerCase();

            if (userRepository.existsByEmail(cleanEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("message", "An account with email '" + cleanEmail + "' is already registered."));
            }

            // 1. Create and persist User record
            User user = User.builder()
                    .email(cleanEmail)
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .role(Role.ROLE_OFFICER)
                    .active(true)
                    .emailVerified(true)
                    .createdAt(Instant.now())
                    .build();
            user = userRepository.save(user);

            // 2. Create and persist PlacementOfficer record
            String officerCode = (request.getOfficerCode() != null && !request.getOfficerCode().isBlank())
                    ? request.getOfficerCode().trim()
                    : "TPO-" + (System.currentTimeMillis() % 10000);

            PlacementOfficer officer = PlacementOfficer.builder()
                    .userId(user.getId())
                    .email(cleanEmail)
                    .fullName(request.getFullName().trim())
                    .department(request.getDepartment() != null ? request.getDepartment().trim() : "Training & Placement Cell")
                    .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                    .officerCode(officerCode)
                    .createdAt(Instant.now())
                    .build();
            officer = officerRepository.save(officer);

            // 3. Log Audit Trail
            auditLogRepository.save(AuditLog.builder()
                    .userId(user.getId())
                    .userEmail(cleanEmail)
                    .action("OFFICER_ACCOUNT_PROVISIONED")
                    .ipAddress("127.0.0.1")
                    .details("Placement Officer account provisioned by Administrator. Officer code: " + officerCode)
                    .timestamp(Instant.now())
                    .build());

            // 4. Dispatch official onboarding email with credentials via Gmail SMTP
            try {
                emailService.sendOfficerCredentialsEmail(
                        cleanEmail, 
                        request.getFullName().trim(), 
                        request.getPassword(), 
                        officer.getDepartment(), 
                        officerCode
                );
            } catch (Exception ex) {
                // Non-fatal if SMTP fails, officer account is already created
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Placement Officer account successfully provisioned for " + cleanEmail,
                    "officer", officer
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to provision officer: " + e.getMessage()));
        }
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findAllByOrderByTimestampDesc());
    }
}
