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

    public AuthController(AuthService authService) {
        this.authService = authService;
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
    public ResponseEntity<?> getCurrentUser(@RequestParam(required = false, defaultValue = "student@cpms.edu") String email) {
        try {
            return ResponseEntity.ok(authService.getCurrentUser(email));
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
