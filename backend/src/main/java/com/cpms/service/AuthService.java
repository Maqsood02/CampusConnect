package com.cpms.service;

import com.cpms.dto.AuthResponse;
import com.cpms.dto.LoginRequest;
import com.cpms.dto.RegisterRequest;
import com.cpms.model.PlacementOfficer;
import com.cpms.model.Role;
import com.cpms.model.Student;
import com.cpms.model.User;
import com.cpms.repository.PlacementOfficerRepository;
import com.cpms.repository.StudentRepository;
import com.cpms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PlacementOfficerRepository officerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, StudentRepository studentRepository,
                       PlacementOfficerRepository officerRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.officerRepository = officerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password.");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return buildAuthResponse(user, token);
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered.");
        }

        Role role = Role.ROLE_STUDENT;
        if ("Placement Officer".equalsIgnoreCase(request.getRole())) {
            role = Role.ROLE_OFFICER;
        } else if ("Administrator".equalsIgnoreCase(request.getRole())) {
            role = Role.ROLE_ADMIN;
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .active(true)
                .createdAt(Instant.now())
                .build();

        user = userRepository.save(user);

        if (role == Role.ROLE_STUDENT) {
            Student student = Student.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .fullName(request.getFullName())
                    .rollNumber(request.getRollNumber() != null ? request.getRollNumber() : "2026STU" + System.currentTimeMillis() % 10000)
                    .branch(request.getBranch() != null ? request.getBranch() : "CSE")
                    .cgpa(request.getCgpa() != null ? request.getCgpa() : 8.0)
                    .graduationYear(2026)
                    .activeBacklogs(0)
                    .verificationStatus("PENDING")
                    .createdAt(Instant.now())
                    .build();
            studentRepository.save(student);
        } else if (role == Role.ROLE_OFFICER) {
            PlacementOfficer officer = PlacementOfficer.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .fullName(request.getFullName())
                    .department(request.getDepartment() != null ? request.getDepartment() : "Training & Placement Cell")
                    .phone(request.getPhone())
                    .officerCode("TPO-" + (System.currentTimeMillis() % 1000))
                    .createdAt(Instant.now())
                    .build();
            officerRepository.save(officer);
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return buildAuthResponse(user, token);
    }

    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " not found."));

        if (currentPassword != null && !currentPassword.isBlank() && user.getPasswordHash() != null) {
            if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
                throw new RuntimeException("Incorrect current password.");
            }
        }

        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("New password must be at least 6 characters long.");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
    }

    public AuthResponse.UserSummary updateProfilePhoto(String email, String avatarUrl) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " not found."));

        user.setProfileImageUrl(avatarUrl);
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);

        if (user.getRole() == Role.ROLE_STUDENT) {
            studentRepository.findByUserId(user.getId()).ifPresent(s -> {
                s.setAvatarUrl(avatarUrl);
                studentRepository.save(s);
            });
        } else if (user.getRole() == Role.ROLE_OFFICER) {
            officerRepository.findByUserId(user.getId()).ifPresent(o -> {
                o.setAvatarUrl(avatarUrl);
                officerRepository.save(o);
            });
        }
        return buildUserSummary(user);
    }

    public AuthResponse.UserSummary getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return buildUserSummary(user);
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .user(buildUserSummary(user))
                .build();
    }

    private AuthResponse.UserSummary buildUserSummary(User user) {
        AuthResponse.UserSummary.Builder builder = AuthResponse.UserSummary.builder()
                .id(user.getId())
                .email(user.getEmail())
                .avatarUrl(user.getProfileImageUrl());

        if (user.getRole() == Role.ROLE_STUDENT) {
            builder.role("Student");
            studentRepository.findByUserId(user.getId()).ifPresent(s -> {
                builder.fullName(s.getFullName())
                       .branch(s.getBranch())
                       .cgpa(s.getCgpa())
                       .rollNumber(s.getRollNumber());
            });
        } else if (user.getRole() == Role.ROLE_OFFICER) {
            builder.role("Placement Officer");
            officerRepository.findByUserId(user.getId()).ifPresent(o -> {
                builder.fullName(o.getFullName())
                       .department(o.getDepartment());
            });
        } else {
            builder.role("Administrator");
            builder.fullName("System Administrator");
            builder.department("Dean Office & Institutional Affairs");
        }

        return builder.build();
    }
}
