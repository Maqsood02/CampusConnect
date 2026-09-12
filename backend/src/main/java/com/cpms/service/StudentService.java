package com.cpms.service;

import com.cpms.model.Notification;
import com.cpms.model.Student;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final NotificationRepository notificationRepository;

    public StudentService(StudentRepository studentRepository, NotificationRepository notificationRepository) {
        this.studentRepository = studentRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentByUserId(String userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found for user: " + userId));
    }

    public Student updateStudent(Student updated) {
        return studentRepository.save(updated);
    }

    public Student verifyStudent(String studentId, String status) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));

        student.setVerificationStatus(status);
        student = studentRepository.save(student);

        notificationRepository.save(Notification.builder()
                .userId(student.getUserId())
                .title("Profile Verification: " + status)
                .message("Your student academic profile status is now " + status)
                .type("verification")
                .createdAt(Instant.now())
                .build());

        return student;
    }

    public Student addSkill(String studentId, Student.SkillItem skill) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getSkills().removeIf(s -> s.getName().equalsIgnoreCase(skill.getName()));
        student.getSkills().add(skill);
        return studentRepository.save(student);
    }

    public Student removeSkill(String studentId, String skillName) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getSkills().removeIf(s -> s.getName().equalsIgnoreCase(skillName));
        return studentRepository.save(student);
    }

    public Student addCertification(String studentId, Student.CertificationItem cert) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getCertifications().removeIf(c -> c.getTitle().equalsIgnoreCase(cert.getTitle()));
        student.getCertifications().add(cert);
        return studentRepository.save(student);
    }

    public Student removeCertification(String studentId, String certTitle) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getCertifications().removeIf(c -> c.getTitle().equalsIgnoreCase(certTitle));
        return studentRepository.save(student);
    }

    public Student addProject(String studentId, Student.ProjectItem project) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getProjects().removeIf(p -> p.getTitle().equalsIgnoreCase(project.getTitle()));
        student.getProjects().add(project);
        return studentRepository.save(student);
    }

    public Student removeProject(String studentId, String projectTitle) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getProjects().removeIf(p -> p.getTitle().equalsIgnoreCase(projectTitle));
        return studentRepository.save(student);
    }

    public Student addInternship(String studentId, Student.InternshipItem internship) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getInternships().removeIf(i -> i.getCompany().equalsIgnoreCase(internship.getCompany()));
        student.getInternships().add(internship);
        return studentRepository.save(student);
    }

    public Student removeInternship(String studentId, String company) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
        student.getInternships().removeIf(i -> i.getCompany().equalsIgnoreCase(company));
        return studentRepository.save(student);
    }
}
