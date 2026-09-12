package com.cpms.controller;

import com.cpms.model.PlacementRecord;
import com.cpms.service.PlacementRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placement-records")
@CrossOrigin(origins = "*")
public class PlacementRecordController {

    private final PlacementRecordService placementRecordService;

    public PlacementRecordController(PlacementRecordService placementRecordService) {
        this.placementRecordService = placementRecordService;
    }

    @GetMapping
    public ResponseEntity<List<PlacementRecord>> getRecords(
            @RequestParam(required = false) String studentId,
            @RequestParam(required = false) String companyId,
            @RequestParam(required = false) String branch) {

        if (studentId != null) {
            return ResponseEntity.ok(placementRecordService.getRecordsByStudent(studentId));
        }
        if (companyId != null) {
            return ResponseEntity.ok(placementRecordService.getRecordsByCompany(companyId));
        }
        if (branch != null) {
            return ResponseEntity.ok(placementRecordService.getRecordsByBranch(branch));
        }
        return ResponseEntity.ok(placementRecordService.getAllRecords());
    }

    @PostMapping
    public ResponseEntity<PlacementRecord> createRecord(@RequestBody PlacementRecord record) {
        return ResponseEntity.status(HttpStatus.CREATED).body(placementRecordService.createRecord(record));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PlacementRecord> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "OFFERED");
        String remarks = body.getOrDefault("remarks", "");
        return ResponseEntity.ok(placementRecordService.updateStatus(id, status, remarks));
    }

    @PutMapping("/{id}/offer-letter")
    public ResponseEntity<PlacementRecord> updateOfferLetter(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String offerLetterUrl = body.get("offerLetterUrl");
        String verificationStatus = body.getOrDefault("verificationStatus", "VERIFIED");
        String verifiedBy = body.getOrDefault("verifiedBy", "Placement Office");
        return ResponseEntity.ok(placementRecordService.updateOfferLetter(id, offerLetterUrl, verificationStatus, verifiedBy));
    }

    @GetMapping("/company/{companyId}/history")
    public ResponseEntity<Map<String, Object>> getCompanyHistory(@PathVariable String companyId) {
        return ResponseEntity.ok(placementRecordService.getCompanyRecruitmentHistory(companyId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String id) {
        placementRecordService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}
