package com.cpms.service;

import com.cpms.dto.InterviewRequest;
import com.cpms.model.Application;
import com.cpms.model.Interview;
import com.cpms.model.Notification;
import com.cpms.repository.ApplicationRepository;
import com.cpms.repository.InterviewRepository;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.RecruitmentDriveRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final RecruitmentDriveRepository driveRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;
    private final com.cpms.repository.StudentRepository studentRepository;
    private final com.cpms.repository.UserRepository userRepository;

    public InterviewService(InterviewRepository interviewRepository,
                            ApplicationRepository applicationRepository,
                            RecruitmentDriveRepository driveRepository,
                            NotificationRepository notificationRepository,
                            EmailService emailService,
                            com.cpms.repository.StudentRepository studentRepository,
                            com.cpms.repository.UserRepository userRepository) {
        this.interviewRepository = interviewRepository;
        this.applicationRepository = applicationRepository;
        this.driveRepository = driveRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public List<Interview> getInterviewsByStudent(String studentId) {
        return interviewRepository.findByStudentId(studentId);
    }

    public Interview scheduleInterview(InterviewRequest req) {
        Application app = null;
        if (req.getApplicationId() != null) {
            app = applicationRepository.findById(req.getApplicationId()).orElse(null);
        }

        String company = app != null ? app.getCompanyName() : "Partner Recruiter";
        String candidate = app != null ? app.getStudentName() : "Student Candidate";
        String title = app != null ? app.getJobTitle() : "Software Engineer";

        Interview interview = Interview.builder()
                .applicationId(req.getApplicationId())
                .driveId(req.getDriveId())
                .studentId(req.getStudentId())
                .candidateName(candidate)
                .companyName(company)
                .jobTitle(title)
                .roundName(req.getRoundName() != null ? req.getRoundName() : "Technical Interview Round 1")
                .roundNumber(req.getRoundNumber() != null ? req.getRoundNumber() : 1)
                .scheduledTime(req.getScheduledTime())
                .locationOrLink(req.getLocationOrLink() != null ? req.getLocationOrLink() : "https://meet.google.com/cpms-interview")
                .mode(req.getMode() != null ? req.getMode() : "VIRTUAL")
                .interviewerName(req.getInterviewerName() != null ? req.getInterviewerName() : "Senior Evaluation Panel")
                .status("SCHEDULED")
                .remarks(req.getRemarks())
                .createdAt(Instant.now())
                .build();

        interview = interviewRepository.save(interview);

        // Update application stage
        if (app != null) {
            app.setStatus("SHORTLISTED");
            app.setStage("TECHNICAL_ROUND");
            app.setFeedback("Interview scheduled: " + interview.getRoundName());
            if (app.getStageHistory() != null) {
                app.getStageHistory().add(new Application.StageEvent(
                        "TECHNICAL_ROUND",
                        Instant.now().toString(),
                        "Interview round scheduled with " + interview.getInterviewerName()
                ));
            }
            applicationRepository.save(app);
        }

        // Notification
        notificationRepository.save(Notification.builder()
                .userId(interview.getStudentId())
                .title("Interview Scheduled: " + interview.getCompanyName())
                .message(interview.getRoundName() + " (" + interview.getMode() + ") scheduled on " + interview.getScheduledTime())
                .type("interview")
                .createdAt(Instant.now())
                .build());

        // Dispatch email notification to student
        String studentEmail = resolveStudentEmail(app, interview.getStudentId());
        if (studentEmail != null && !studentEmail.isBlank()) {
            emailService.sendInterviewScheduledEmail(
                    studentEmail,
                    candidate,
                    title,
                    company,
                    interview.getRoundName(),
                    interview.getScheduledTime(),
                    interview.getLocationOrLink(),
                    interview.getLocationOrLink()
            );
        }

        return interview;
    }

    public Interview evaluateInterview(String interviewId, Integer rating, String verdict, String feedbackNotes) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found: " + interviewId));

        interview.setRating(rating);
        interview.setVerdict(verdict);
        interview.setFeedbackNotes(feedbackNotes);
        interview.setStatus("COMPLETED");

        interview = interviewRepository.save(interview);
        Application app = null;

        // If interview is linked to an application, update application stage based on verdict
        if (interview.getApplicationId() != null) {
            app = applicationRepository.findById(interview.getApplicationId()).orElse(null);
            if (app != null) {
                if ("OFFERED".equalsIgnoreCase(verdict) || "SELECTED".equalsIgnoreCase(verdict)) {
                    app.setStatus("SELECTED");
                    app.setStage("SELECTED");
                    app.setFeedback("Cleared all rounds! Selected for offer at " + app.getCompanyName());
                } else if ("REJECTED".equalsIgnoreCase(verdict)) {
                    app.setStatus("REJECTED");
                    app.setFeedback("Application not shortlisted following " + interview.getRoundName());
                } else {
                    app.setStage("HR_ROUND");
                    app.setFeedback("Recommended for next round following " + interview.getRoundName());
                }

                if (app.getStageHistory() != null) {
                    app.getStageHistory().add(new Application.StageEvent(
                            app.getStage(),
                            Instant.now().toString(),
                            "Evaluation submitted: Verdict " + verdict + (feedbackNotes != null ? " - " + feedbackNotes : "")
                    ));
                }
                applicationRepository.save(app);
            }
        }

        // Send student notification of evaluation verdict
        notificationRepository.save(Notification.builder()
                .userId(interview.getStudentId())
                .title("Interview Evaluated: " + interview.getCompanyName())
                .message(interview.getRoundName() + " verdict: " + verdict + (rating != null ? " (" + rating + "/5 stars)" : ""))
                .type("interview")
                .createdAt(Instant.now())
                .build());

        // Dispatch status update email based on evaluation outcome
        String studentEmail = resolveStudentEmail(app, interview.getStudentId());
        if (studentEmail != null && !studentEmail.isBlank()) {
            if ("OFFERED".equalsIgnoreCase(verdict) || "SELECTED".equalsIgnoreCase(verdict)) {
                Double pkg = app != null ? app.getPackageLpa() : null;
                emailService.sendPlacementOfferEmail(studentEmail, interview.getCandidateName(), interview.getJobTitle(), interview.getCompanyName(), pkg);
            } else if ("REJECTED".equalsIgnoreCase(verdict)) {
                emailService.sendApplicationStatusUpdateEmail(studentEmail, interview.getCandidateName(), interview.getJobTitle(), interview.getCompanyName(), "REJECTED", feedbackNotes);
            } else {
                emailService.sendApplicationStatusUpdateEmail(studentEmail, interview.getCandidateName(), interview.getJobTitle(), interview.getCompanyName(), "ROUND CLEARED: " + verdict, feedbackNotes);
            }
        }

        return interview;
    }

    private String resolveStudentEmail(Application app, String studentId) {
        if (app != null && app.getStudentEmail() != null && !app.getStudentEmail().isBlank()) {
            return app.getStudentEmail();
        }
        if (studentId != null) {
            var stud = studentRepository.findById(studentId);
            if (stud.isPresent() && stud.get().getEmail() != null) {
                return stud.get().getEmail();
            }
            var user = userRepository.findById(studentId);
            if (user.isPresent() && user.get().getEmail() != null) {
                return user.get().getEmail();
            }
            var studByUser = studentRepository.findByUserId(studentId);
            if (studByUser.isPresent() && studByUser.get().getEmail() != null) {
                return studByUser.get().getEmail();
            }
        }
        return null;
    }

    public Interview updateStatus(String interviewId, String status, String remarks) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found: " + interviewId));

        interview.setStatus(status);
        if (remarks != null && !remarks.isBlank()) {
            interview.setRemarks(remarks);
        }

        return interviewRepository.save(interview);
    }
}
