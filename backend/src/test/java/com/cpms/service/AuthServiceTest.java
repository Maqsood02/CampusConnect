package com.cpms.service;

import com.cpms.dto.AuthResponse;
import com.cpms.dto.LoginRequest;
import com.cpms.dto.RegisterRequest;
import com.cpms.model.Role;
import com.cpms.model.Student;
import com.cpms.model.User;
import com.cpms.repository.PlacementOfficerRepository;
import com.cpms.repository.StudentRepository;
import com.cpms.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private PlacementOfficerRepository officerRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private JwtService jwtService;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        authService = new AuthService(userRepository, studentRepository, officerRepository, passwordEncoder, jwtService);
    }

    @Test
    @DisplayName("Should successfully register student and return token")
    void testRegisterStudentSuccess() {
        RegisterRequest request = RegisterRequest.builder()
                .email("alex.student@cpms.edu")
                .password("Password123!")
                .role("Student")
                .fullName("Alex Mercer")
                .rollNumber("2026CSE001")
                .branch("CSE")
                .cgpa(9.1)
                .build();

        when(userRepository.existsByEmail("alex.student@cpms.edu")).thenReturn(false);
        when(passwordEncoder.encode("Password123!")).thenReturn("$2a$10$encodedPasswordHash");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId("mock-user-123");
            return u;
        });
        when(studentRepository.save(any(Student.class))).thenAnswer(inv -> inv.getArgument(0));

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("alex.student@cpms.edu", jwtService.extractEmail(response.getToken()));
        assertNotNull(response.getUser());
        assertEquals("alex.student@cpms.edu", response.getUser().getEmail());
        assertEquals("Student", response.getUser().getRole());
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    @DisplayName("Should fail registration if email is already taken")
    void testRegisterDuplicateEmailThrows() {
        RegisterRequest request = RegisterRequest.builder()
                .email("duplicate@cpms.edu")
                .password("Password123!")
                .role("Student")
                .fullName("Duplicate User")
                .build();

        when(userRepository.existsByEmail("duplicate@cpms.edu")).thenReturn(true);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertTrue(ex.getMessage().contains("already registered"));
    }

    @Test
    @DisplayName("Should successfully login with valid credentials")
    void testLoginSuccess() {
        LoginRequest req = LoginRequest.builder()
                .email("student@cpms.edu")
                .password("Password123!")
                .build();

        User user = User.builder()
                .id("u1")
                .email("student@cpms.edu")
                .passwordHash("$2a$10$encoded")
                .role(Role.ROLE_STUDENT)
                .active(true)
                .build();

        Student student = Student.builder()
                .id("s1")
                .userId("u1")
                .fullName("Alex Mercer")
                .rollNumber("2026CSE001")
                .branch("CSE")
                .cgpa(9.1)
                .build();

        when(userRepository.findByEmail("student@cpms.edu")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Password123!", "$2a$10$encoded")).thenReturn(true);
        when(studentRepository.findByUserId("u1")).thenReturn(Optional.of(student));

        AuthResponse res = authService.login(req);

        assertNotNull(res);
        assertNotNull(res.getToken());
        assertEquals("student@cpms.edu", jwtService.extractEmail(res.getToken()));
        assertNotNull(res.getUser());
        assertEquals("student@cpms.edu", res.getUser().getEmail());
        assertEquals("Alex Mercer", res.getUser().getFullName());
        assertEquals("2026CSE001", res.getUser().getRollNumber());
        assertEquals("Student", res.getUser().getRole());
    }

    @Test
    @DisplayName("Should reject login with invalid password")
    void testLoginInvalidPasswordThrows() {
        LoginRequest req = LoginRequest.builder()
                .email("student@cpms.edu")
                .password("WrongPassword")
                .build();

        User user = User.builder()
                .email("student@cpms.edu")
                .passwordHash("$2a$10$encoded")
                .build();

        when(userRepository.findByEmail("student@cpms.edu")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("WrongPassword", "$2a$10$encoded")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.login(req));
        assertTrue(ex.getMessage().contains("Invalid email or password"));
    }
}
