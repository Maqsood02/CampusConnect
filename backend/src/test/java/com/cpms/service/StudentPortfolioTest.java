package com.cpms.service;

import com.cpms.model.Student;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentPortfolioTest {

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private NotificationRepository notificationRepository;

    private StudentService studentService;
    private Student sampleStudent;

    @BeforeEach
    void setUp() {
        studentService = new StudentService(studentRepository, notificationRepository);

        sampleStudent = Student.builder()
                .id("stud-001")
                .userId("u1")
                .fullName("Alex Mercer")
                .email("alex@cpms.edu")
                .rollNumber("2026CSE001")
                .skills(new ArrayList<>())
                .certifications(new ArrayList<>())
                .projects(new ArrayList<>())
                .internships(new ArrayList<>())
                .build();

        when(studentRepository.findById("stud-001")).thenReturn(Optional.of(sampleStudent));
        when(studentRepository.save(any(Student.class))).thenAnswer(inv -> inv.getArgument(0));
    }

    @Test
    @DisplayName("Should successfully add and remove skill from student portfolio")
    void testSkillsCrud() {
        Student.SkillItem skill = Student.SkillItem.builder()
                .name("GoLang")
                .level("Advanced")
                .build();

        // 1. Add skill
        Student updated = studentService.addSkill("stud-001", skill);
        assertEquals(1, updated.getSkills().size());
        assertEquals("GoLang", updated.getSkills().get(0).getName());
        assertEquals("Advanced", updated.getSkills().get(0).getLevel());

        // 2. Remove skill
        Student afterRemove = studentService.removeSkill("stud-001", "GoLang");
        assertEquals(0, afterRemove.getSkills().size());
    }

    @Test
    @DisplayName("Should successfully add and remove certification from student portfolio")
    void testCertificationsCrud() {
        Student.CertificationItem cert = Student.CertificationItem.builder()
                .title("Kubernetes CKA")
                .issuer("CNCF")
                .build();

        // 1. Add cert
        Student updated = studentService.addCertification("stud-001", cert);
        assertEquals(1, updated.getCertifications().size());
        assertEquals("Kubernetes CKA", updated.getCertifications().get(0).getTitle());
        assertEquals("CNCF", updated.getCertifications().get(0).getIssuer());

        // 2. Remove cert
        Student afterRemove = studentService.removeCertification("stud-001", "Kubernetes CKA");
        assertEquals(0, afterRemove.getCertifications().size());
    }

    @Test
    @DisplayName("Should successfully add and remove project from student portfolio")
    void testProjectsCrud() {
        Student.ProjectItem proj = Student.ProjectItem.builder()
                .title("Distributed Key-Value DB")
                .tech("Rust, Raft Consensus")
                .desc("High-availability distributed key-value storage engine.")
                .build();

        // 1. Add project
        Student updated = studentService.addProject("stud-001", proj);
        assertEquals(1, updated.getProjects().size());
        assertEquals("Distributed Key-Value DB", updated.getProjects().get(0).getTitle());
        assertEquals("Rust, Raft Consensus", updated.getProjects().get(0).getTech());

        // 2. Remove project
        Student afterRemove = studentService.removeProject("stud-001", "Distributed Key-Value DB");
        assertEquals(0, afterRemove.getProjects().size());
    }

    @Test
    @DisplayName("Should successfully add and remove internship from student portfolio")
    void testInternshipsCrud() {
        Student.InternshipItem internship = Student.InternshipItem.builder()
                .company("Google")
                .role("SWE Intern")
                .duration("6 Months")
                .desc("Worked on backend high-throughput microservices")
                .build();

        // 1. Add internship
        Student updated = studentService.addInternship("stud-001", internship);
        assertEquals(1, updated.getInternships().size());
        assertEquals("Google", updated.getInternships().get(0).getCompany());
        assertEquals("SWE Intern", updated.getInternships().get(0).getRole());
        assertEquals("6 Months", updated.getInternships().get(0).getDuration());

        // 2. Remove internship
        Student afterRemove = studentService.removeInternship("stud-001", "Google");
        assertEquals(0, afterRemove.getInternships().size());
    }
}
