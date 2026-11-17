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
    private final EmailService emailService;
    private final com.cpms.repository.UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, RecruitmentDriveRepository driveRepository,
                              StudentRepository studentRepository, NotificationRepository notificationRepository,
                              DriveService driveService, EmailService emailService,
                              com.cpms.repository.UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.driveRepository = driveRepository;
        this.studentRepository = studentRepository;
        this.notificationRepository = notificationRepository;
        this.driveService = driveService;
        this.emailService = emailService;
        this.userRepository = userRepository;
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

        String studentEmail = student.getEmail();
        if ((studentEmail == null || studentEmail.isBlank()) && student.getUserId() != null) {
            studentEmail = userRepository.findById(student.getUserId()).map(com.cpms.model.User::getEmail).orElse(null);
        }

        List<Application.StageEvent> history = new ArrayList<>();
        history.add(new Application.StageEvent("APPLIED", Instant.now().toString(), "Application submitted successfully and passed automated criteria check."));

        Application application = Application.builder()
                .driveId(drive.getId())
                .studentId(student.getId())
                .studentName(student.getFullName())
                .studentEmail(studentEmail)
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

        // Dispatch Application Confirmation Email
        if (studentEmail != null && !studentEmail.isBlank()) {
            emailService.sendApplicationSubmittedEmail(
                    studentEmail,
                    student.getFullName(),
                    drive.getJobTitle(),
                    drive.getCompanyName(),
                    drive.getPackageLpa(),
                    drive.getDriveDate()
            );
        }

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

        // Alert student via in-app notification
        notificationRepository.save(Notification.builder()
                .userId(app.getStudentId())
                .title("Application Status: " + status)
                .message(app.getStudentName() + "'s application for " + app.getCompanyName() + " is now " + status)
                .type(status.equals("SELECTED") ? "placement" : "status")
                .createdAt(Instant.now())
                .build());

        // Dispatch Email for each and every status update
        String targetEmail = resolveStudentEmail(app);
        if (targetEmail != null && !targetEmail.isBlank()) {
            if ("SELECTED".equalsIgnoreCase(status)) {
                emailService.sendPlacementOfferEmail(targetEmail, app.getStudentName(), app.getJobTitle(), app.getCompanyName(), app.getPackageLpa());
            } else {
                emailService.sendApplicationStatusUpdateEmail(
                        targetEmail,
                        app.getStudentName(),
                        app.getJobTitle(),
                        app.getCompanyName(),
                        status,
                        feedback
                );
            }
        }

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
                Application saved = applicationRepository.save(app);
                shortlisted.add(saved);

                notificationRepository.save(Notification.builder()
                        .userId(app.getStudentId())
                        .title("Shortlisted: " + app.getCompanyName())
                        .message("Congratulations! You have been shortlisted for " + app.getJobTitle())
                        .type("status")
                        .createdAt(Instant.now())
                        .build());

                // Dispatch Email notification
                String targetEmail = resolveStudentEmail(app);
                if (targetEmail != null && !targetEmail.isBlank()) {
                    emailService.sendApplicationStatusUpdateEmail(
                            targetEmail,
                            app.getStudentName(),
                            app.getJobTitle(),
                            app.getCompanyName(),
                            "SHORTLISTED",
                            "Congratulations! Your application has been shortlisted for the upcoming interview and technical assessment rounds."
                    );
                }
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

        Application saved = applicationRepository.save(app);

        // Dispatch Email for stage progression
        String targetEmail = resolveStudentEmail(app);
        if (targetEmail != null && !targetEmail.isBlank()) {
            if ("SELECTED".equalsIgnoreCase(stage)) {
                emailService.sendPlacementOfferEmail(targetEmail, app.getStudentName(), app.getJobTitle(), app.getCompanyName(), app.getPackageLpa());
            } else {
                emailService.sendApplicationStatusUpdateEmail(
                        targetEmail,
                        app.getStudentName(),
                        app.getJobTitle(),
                        app.getCompanyName(),
                        stage,
                        notes
                );
            }
        }

        return saved;
    }

    private String resolveStudentEmail(Application app) {
        if (app.getStudentEmail() != null && !app.getStudentEmail().isBlank()) {
            return app.getStudentEmail();
        }
        if (app.getStudentId() != null) {
            var studOpt = studentRepository.findById(app.getStudentId());
            if (studOpt.isPresent() && studOpt.get().getEmail() != null) {
                return studOpt.get().getEmail();
            }
            var userOpt = userRepository.findById(app.getStudentId());
            if (userOpt.isPresent() && userOpt.get().getEmail() != null) {
                return userOpt.get().getEmail();
            }
            var studByUser = studentRepository.findByUserId(app.getStudentId());
            if (studByUser.isPresent() && studByUser.get().getEmail() != null) {
                return studByUser.get().getEmail();
            }
        }
        return null;
    }
}
