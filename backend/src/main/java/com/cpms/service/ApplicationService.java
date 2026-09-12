package com.cpms.service;

import com.cpms.model.Application;
import com.cpms.model.Notification;
import com.cpms.model.RecruitmentDrive;
import com.cpms.model.Student;
import com.cpms.repository.ApplicationRepository;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.RecruitmentDriveRepository;
import com.cpms.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final RecruitmentDriveRepository driveRepository;
    private final StudentRepository studentRepository;
    private final NotificationRepository notificationRepository;
    private final DriveService driveService;

    public ApplicationService(ApplicationRepository applicationRepository, RecruitmentDriveRepository driveRepository,
                              StudentRepository studentRepository, NotificationRepository notificationRepository,
                              DriveService driveService) {
        this.applicationRepository = applicationRepository;
        this.driveRepository = driveRepository;
        this.studentRepository = studentRepository;
        this.notificationRepository = notificationRepository;
        this.driveService = driveService;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByStudent(String studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<Application> getApplicationsByDrive(String driveId) {
        return applicationRepository.findByDriveId(driveId);
    }

    public Application apply(String studentUserId, String driveId) {
        Student student = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new RuntimeException("Student profile not found."));

        RecruitmentDrive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found."));

        if (applicationRepository.existsByDriveIdAndStudentId(driveId, student.getId())) {
            throw new RuntimeException("You have already applied to this drive.");
        }

        // Evaluate eligibility
        var eval = driveService.evaluateEligibility(student, drive);
        if (!(Boolean) eval.get("eligible")) {
            throw new RuntimeException("Ineligible: " + String.join(", ", (List<String>) eval.get("reasons")));
        }

        List<Application.StageEvent> history = new ArrayList<>();
        history.add(new Application.StageEvent("APPLIED", Instant.now().toString(), "Application submitted successfully and passed automated criteria check."));

        Application application = Application.builder()
                .driveId(drive.getId())
                .studentId(student.getId())
                .studentName(student.getFullName())
                .rollNumber(student.getRollNumber())
                .branch(student.getBranch())
                .cgpa(student.getCgpa())
                .jobTitle(drive.getJobTitle())
                .companyName(drive.getCompanyName())
                .packageLpa(drive.getPackageLpa())
                .applicationDate(LocalDate.now().toString())
                .status("APPLIED")
                .stage("APPLIED")
                .feedback("Application submitted and verified against eligibility criteria.")
                .stageHistory(history)
                .createdAt(Instant.now())
                .build();

        application = applicationRepository.save(application);

        notificationRepository.save(Notification.builder()
                .userId(student.getUserId())
                .title("Application Submitted")
                .message("Applied for " + drive.getJobTitle() + " at " + drive.getCompanyName())
                .type("application")
                .createdAt(Instant.now())
                .build());

        return application;
    }

    public Application updateStatus(String applicationId, String status, String feedback) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found: " + applicationId));

        app.setStatus(status);
        app.setStage(status);
        if (feedback != null && !feedback.isBlank()) {
            app.setFeedback(feedback);
        }
        if (app.getStageHistory() == null) {
            app.setStageHistory(new ArrayList<>());
        }
        app.getStageHistory().add(new Application.StageEvent(
                status,
                Instant.now().toString(),
                feedback != null && !feedback.isBlank() ? feedback : "Stage updated to " + status
        ));

        app = applicationRepository.save(app);

        // Alert student
        notificationRepository.save(Notification.builder()
                .userId(app.getStudentId())
                .title("Application Status: " + status)
                .message(app.getStudentName() + "'s application for " + app.getCompanyName() + " is now " + status)
                .type(status.equals("SELECTED") ? "placement" : "status")
                .createdAt(Instant.now())
                .build());

        return app;
    }

    public List<Application> bulkShortlist(String driveId, List<String> studentIds) {
        List<Application> driveApps = applicationRepository.findByDriveId(driveId);
        List<Application> shortlisted = new ArrayList<>();

        for (Application app : driveApps) {
            if (studentIds == null || studentIds.isEmpty() || studentIds.contains(app.getStudentId()) || studentIds.contains(app.getId())) {
                app.setStatus("SHORTLISTED");
                app.setStage("SHORTLISTED");
                app.setFeedback("Shortlisted for next interview rounds by Placement Officer.");
                if (app.getStageHistory() == null) {
                    app.setStageHistory(new ArrayList<>());
                }
                app.getStageHistory().add(new Application.StageEvent(
                        "SHORTLISTED",
                        Instant.now().toString(),
                        "Candidate shortlisted in batch review."
                ));
                shortlisted.add(applicationRepository.save(app));

                notificationRepository.save(Notification.builder()
                        .userId(app.getStudentId())
                        .title("Shortlisted: " + app.getCompanyName())
                        .message("Congratulations! You have been shortlisted for " + app.getJobTitle())
                        .type("status")
                        .createdAt(Instant.now())
                        .build());
            }
        }

        return shortlisted;
    }

    public Application advanceStage(String applicationId, String stage, String notes) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found: " + applicationId));

        app.setStage(stage);
        if ("SELECTED".equalsIgnoreCase(stage)) {
            app.setStatus("SELECTED");
        } else if ("REJECTED".equalsIgnoreCase(stage)) {
            app.setStatus("REJECTED");
        } else {
            app.setStatus("SHORTLISTED");
        }

        if (notes != null && !notes.isBlank()) {
            app.setFeedback(notes);
        }
        if (app.getStageHistory() == null) {
            app.setStageHistory(new ArrayList<>());
        }
        app.getStageHistory().add(new Application.StageEvent(stage, Instant.now().toString(), notes));

        return applicationRepository.save(app);
    }
}
