package com.cpms.controller;

import com.cpms.dto.ApplyRequest;
import com.cpms.model.Application;
import com.cpms.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplications(
            @RequestParam(required = false) String studentId,
            @RequestParam(required = false) String driveId) {

        if (studentId != null) {
            return ResponseEntity.ok(applicationService.getApplicationsByStudent(studentId));
        }
        if (driveId != null) {
            return ResponseEntity.ok(applicationService.getApplicationsByDrive(driveId));
        }
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody ApplyRequest request) {
        try {
            Application app = applicationService.apply(request.getStudentId(), request.getDriveId());
            return ResponseEntity.status(HttpStatus.CREATED).body(app);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        String status = body.getOrDefault("status", "APPLIED");
        String feedback = body.getOrDefault("feedback", "");
        return ResponseEntity.ok(applicationService.updateStatus(id, status, feedback));
    }

    @PutMapping("/{id}/stage")
    public ResponseEntity<Application> advanceStage(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String stage = body.getOrDefault("stage", "SHORTLISTED");
        String notes = body.getOrDefault("notes", "");
        return ResponseEntity.ok(applicationService.advanceStage(id, stage, notes));
    }

    @PostMapping("/bulk-shortlist")
    public ResponseEntity<List<Application>> bulkShortlist(
            @RequestBody Map<String, Object> body) {
        String driveId = (String) body.get("driveId");
        @SuppressWarnings("unchecked")
        List<String> studentIds = (List<String>) body.get("studentIds");
        return ResponseEntity.ok(applicationService.bulkShortlist(driveId, studentIds));
    }
}
