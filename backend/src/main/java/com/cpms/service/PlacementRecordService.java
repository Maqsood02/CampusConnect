package com.cpms.service;

import com.cpms.model.Notification;
import com.cpms.model.PlacementRecord;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.PlacementRecordRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class PlacementRecordService {

    private final PlacementRecordRepository placementRecordRepository;
    private final NotificationRepository notificationRepository;

    public PlacementRecordService(PlacementRecordRepository placementRecordRepository,
                                  NotificationRepository notificationRepository) {
        this.placementRecordRepository = placementRecordRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<PlacementRecord> getAllRecords() {
        return placementRecordRepository.findAll();
    }

    public List<PlacementRecord> getRecordsByStudent(String studentId) {
        return placementRecordRepository.findByStudentId(studentId);
    }

    public List<PlacementRecord> getRecordsByCompany(String companyId) {
        return placementRecordRepository.findByCompanyId(companyId);
    }

    public List<PlacementRecord> getRecordsByBranch(String branch) {
        return placementRecordRepository.findByBranch(branch);
    }

    public PlacementRecord createRecord(PlacementRecord record) {
        if (record.getCreatedAt() == null) {
            record.setCreatedAt(Instant.now());
        }
        if (record.getStatus() == null) {
            record.setStatus("OFFERED");
        }
        if (record.getVerificationStatus() == null) {
            record.setVerificationStatus("PENDING");
        }

        PlacementRecord saved = placementRecordRepository.save(record);

        // Notify student of official placement record/offer
        if (saved.getStudentId() != null) {
            notificationRepository.save(Notification.builder()
                    .userId(saved.getStudentId())
                    .title("Placement Offer Recorded: " + saved.getCompanyName())
                    .message("Official offer of ₹ " + saved.getPackageLpa() + " LPA for " + saved.getJobTitle() + " added to placement records.")
                    .type("placement")
                    .createdAt(Instant.now())
                    .build());
        }

        return saved;
    }

    public PlacementRecord updateStatus(String id, String status, String remarks) {
        PlacementRecord record = placementRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement record not found: " + id));

        record.setStatus(status);
        if (remarks != null && !remarks.isBlank()) {
            record.setRemarks(remarks);
        }

        PlacementRecord updated = placementRecordRepository.save(record);

        if (record.getStudentId() != null) {
            notificationRepository.save(Notification.builder()
                    .userId(record.getStudentId())
                    .title("Offer Status Updated")
                    .message("Your placement offer from " + record.getCompanyName() + " is now " + status)
                    .type("status")
                    .createdAt(Instant.now())
                    .build());
        }

        return updated;
    }

    public PlacementRecord updateOfferLetter(String id, String offerLetterUrl, String verificationStatus, String verifiedBy) {
        PlacementRecord record = placementRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement record not found: " + id));

        if (offerLetterUrl != null && !offerLetterUrl.isBlank()) {
            record.setOfferLetterUrl(offerLetterUrl);
        }
        if (verificationStatus != null && !verificationStatus.isBlank()) {
            record.setVerificationStatus(verificationStatus);
        }
        if (verifiedBy != null && !verifiedBy.isBlank()) {
            record.setVerifiedBy(verifiedBy);
        }

        return placementRecordRepository.save(record);
    }

    public Map<String, Object> getCompanyRecruitmentHistory(String companyIdentifier) {
        List<PlacementRecord> companyRecords = placementRecordRepository.findByCompanyId(companyIdentifier);
        if (companyRecords.isEmpty()) {
            companyRecords = placementRecordRepository.findByCompanyNameIgnoreCase(companyIdentifier);
        }

        double maxCtc = companyRecords.stream().mapToDouble(r -> r.getPackageLpa() != null ? r.getPackageLpa() : 0.0).max().orElse(0.0);
        double avgCtc = companyRecords.stream().mapToDouble(r -> r.getPackageLpa() != null ? r.getPackageLpa() : 0.0).average().orElse(0.0);
        long totalHired = companyRecords.stream().filter(r -> "ACCEPTED".equals(r.getStatus()) || "JOINED".equals(r.getStatus()) || "OFFERED".equals(r.getStatus())).count();

        Map<String, Object> history = new HashMap<>();
        history.put("companyIdentifier", companyIdentifier);
        history.put("totalOffers", companyRecords.size());
        history.put("totalHired", totalHired);
        history.put("highestPackageLpa", maxCtc);
        history.put("averagePackageLpa", avgCtc);
        history.put("records", companyRecords);

        return history;
    }

    public void deleteRecord(String id) {
        placementRecordRepository.deleteById(id);
    }
}
