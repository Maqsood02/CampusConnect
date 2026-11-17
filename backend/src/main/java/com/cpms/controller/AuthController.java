package com.cpms.controller;

import com.cpms.dto.AuthResponse;
import com.cpms.dto.ChangePasswordRequest;
import com.cpms.dto.LoginRequest;
import com.cpms.dto.ProfilePhotoRequest;
import com.cpms.dto.RegisterRequest;
import com.cpms.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final com.cpms.service.OtpService otpService;

    public AuthController(AuthService authService, com.cpms.service.OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody com.cpms.dto.SendOtpRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email address is required."));
            }
            otpService.generateAndSendOtp(request.getEmail(), request.getPurpose());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Verification code dispatched successfully to " + request.getEmail().trim()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody com.cpms.dto.VerifyOtpRequest request) {
        try {
            boolean valid = otpService.verifyOtp(request.getEmail(), request.getOtp(), request.getPurpose());
            if (valid) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "verified", true,
                        "message", "Email verified successfully."
                ));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "success", false,
                        "verified", false,
                        "message", "Invalid or expired 6-digit OTP code."
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password-otp")
    public ResponseEntity<?> resetPasswordWithOtp(@RequestBody com.cpms.dto.ResetPasswordWithOtpRequest request) {
        try {
            authService.resetPasswordWithOtp(request.getEmail(), request.getOtp(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("success", true, "message", "Password reset successfully. You can now log in."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            @RequestParam(required = false) String email,
            java.security.Principal principal) {
        try {
            String targetEmail = (principal != null && principal.getName() != null) ? principal.getName() : email;
            if (targetEmail == null || targetEmail.isBlank()) {
                targetEmail = "student@cpms.edu";
            }
            return ResponseEntity.ok(authService.getCurrentUser(targetEmail));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            authService.changePassword(request.getEmail(), request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("success", true, "message", "Password updated successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/profile-photo")
    public ResponseEntity<?> updateProfilePhoto(@RequestBody ProfilePhotoRequest request) {
        try {
            AuthResponse.UserSummary updatedUser = authService.updateProfilePhoto(request.getEmail(), request.getAvatarUrl());
            return ResponseEntity.ok(Map.of("success", true, "user", updatedUser, "message", "Profile photo updated successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
