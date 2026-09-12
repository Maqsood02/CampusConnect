package com.cpms.controller;

import com.cpms.dto.InterviewRequest;
import com.cpms.model.Interview;
import com.cpms.service.InterviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "*")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getInterviews(@RequestParam(required = false) String studentId) {
        if (studentId != null) {
            return ResponseEntity.ok(interviewService.getInterviewsByStudent(studentId));
        }
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    @PostMapping
    public ResponseEntity<Interview> scheduleInterview(@RequestBody InterviewRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(interviewService.scheduleInterview(request));
    }

    @PutMapping("/{id}/evaluate")
    public ResponseEntity<Interview> evaluateInterview(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {
        Integer rating = body.get("rating") != null ? Integer.valueOf(body.get("rating").toString()) : null;
        String verdict = body.getOrDefault("verdict", "RECOMMENDED").toString();
        String feedbackNotes = body.getOrDefault("feedbackNotes", "").toString();
        return ResponseEntity.ok(interviewService.evaluateInterview(id, rating, verdict, feedbackNotes));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Interview> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "SCHEDULED");
        String remarks = body.getOrDefault("remarks", "");
        return ResponseEntity.ok(interviewService.updateStatus(id, status, remarks));
    }
}
