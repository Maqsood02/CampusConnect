package com.cpms.controller;

import com.cpms.model.Student;
import com.cpms.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Student> getStudentByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(studentService.getStudentByUserId(userId));
    }

    @PutMapping("/profile")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(student));
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<Student> verifyStudent(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "VERIFIED");
        return ResponseEntity.ok(studentService.verifyStudent(id, status));
    }
}
