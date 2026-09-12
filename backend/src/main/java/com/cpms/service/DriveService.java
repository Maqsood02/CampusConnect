package com.cpms.service;

import com.cpms.dto.DriveRequest;
import com.cpms.model.Notification;
import com.cpms.model.RecruitmentDrive;
import com.cpms.model.Student;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.RecruitmentDriveRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DriveService {

    private final RecruitmentDriveRepository driveRepository;
    private final NotificationRepository notificationRepository;

    public DriveService(RecruitmentDriveRepository driveRepository, NotificationRepository notificationRepository) {
        this.driveRepository = driveRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<RecruitmentDrive> getAllDrives() {
        return driveRepository.findAll();
    }

    public RecruitmentDrive getDriveById(String id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found with ID: " + id));
    }

    public RecruitmentDrive createDrive(DriveRequest req) {
        String tier = "Core";
        if (req.getPackageLpa() != null) {
            if (req.getPackageLpa() >= 20.0) tier = "Super Dream";
            else if (req.getPackageLpa() >= 10.0) tier = "Dream";
        }

        RecruitmentDrive.EligibilityCriteria criteria = RecruitmentDrive.EligibilityCriteria.builder()
                .minCgpa(req.getMinCgpa() != null ? req.getMinCgpa() : 7.0)
                .allowedBranches(req.getAllowedBranches() != null ? req.getAllowedBranches() : List.of("CSE", "IT", "ECE"))
                .maxBacklogs(req.getMaxBacklogs() != null ? req.getMaxBacklogs() : 0)
                .graduationYear(req.getGraduationYear() != null ? req.getGraduationYear() : 2026)
                .requiredSkills(req.getRequiredSkills() != null ? req.getRequiredSkills() : List.of("Problem Solving"))
                .build();

        RecruitmentDrive drive = RecruitmentDrive.builder()
                .companyName(req.getCompanyName())
                .jobTitle(req.getJobTitle())
                .packageLpa(req.getPackageLpa() != null ? req.getPackageLpa() : 12.0)
                .location(req.getLocation() != null ? req.getLocation() : "Bengaluru")
                .driveDate(req.getDriveDate())
                .deadline(req.getDeadline())
                .status("OPEN")
                .tier(tier)
                .description(req.getDescription())
                .criteria(criteria)
                .createdAt(Instant.now())
                .build();

        drive = driveRepository.save(drive);

        // Broadcast notification
        notificationRepository.save(Notification.builder()
                .title("New Drive: " + drive.getCompanyName())
                .message(drive.getJobTitle() + " (" + drive.getPackageLpa() + " LPA) posted by Placement Cell.")
                .type("drive")
                .createdAt(Instant.now())
                .build());

        return drive;
    }

    public Map<String, Object> evaluateEligibility(Student student, RecruitmentDrive drive) {
        Map<String, Object> result = new HashMap<>();
        List<String> reasons = new ArrayList<>();

        if (student == null || drive == null || drive.getCriteria() == null) {
            result.put("eligible", true);
            result.put("reasons", reasons);
            return result;
        }

        RecruitmentDrive.EligibilityCriteria crit = drive.getCriteria();

        if (crit.getMinCgpa() != null && student.getCgpa() != null && student.getCgpa() < crit.getMinCgpa()) {
            reasons.add(String.format("Minimum CGPA required is %.2f (Your CGPA: %.2f)", crit.getMinCgpa(), student.getCgpa()));
        }

        if (crit.getAllowedBranches() != null && !crit.getAllowedBranches().isEmpty() &&
                student.getBranch() != null && !crit.getAllowedBranches().contains(student.getBranch())) {
            reasons.add("Allowed branches: " + String.join(", ", crit.getAllowedBranches()) + " (Your branch: " + student.getBranch() + ")");
        }

        if (crit.getMaxBacklogs() != null && student.getActiveBacklogs() != null &&
                student.getActiveBacklogs() > crit.getMaxBacklogs()) {
            reasons.add("Maximum backlogs allowed is " + crit.getMaxBacklogs() + " (You have: " + student.getActiveBacklogs() + ")");
        }

        if (crit.getGraduationYear() != null && student.getGraduationYear() != null &&
                !student.getGraduationYear().equals(crit.getGraduationYear())) {
            reasons.add("Eligible batch: " + crit.getGraduationYear() + " (Your batch: " + student.getGraduationYear() + ")");
        }

        result.put("eligible", reasons.isEmpty());
        result.put("reasons", reasons);
        return result;
    }
}
