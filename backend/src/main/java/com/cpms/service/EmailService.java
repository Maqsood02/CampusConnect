package com.cpms.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final ExecutorService executor = Executors.newCachedThreadPool();

    @Value("${spring.mail.username:cpms.system@gmail.com}")
    private String senderEmail;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String renderEmailHtml(String title, String preheader, String bodyContent, String ctaText, String ctaUrl) {
        String ctaHtml = "";
        if (ctaText != null && ctaUrl != null && !ctaText.isBlank() && !ctaUrl.isBlank()) {
            ctaHtml = "<div style=\"margin: 32px 0 24px 0; text-align: center;\">" +
                    "<a href=\"" + ctaUrl + "\" style=\"background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); letter-spacing: 0.3px;\">" +
                    ctaText + " &rarr;</a></div>";
        }

        int currentYear = Year.now().getValue();

        String template = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>{{TITLE}}</title>
                <style>
                    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; }
                    .email-wrapper { width: 100%; background-color: #f1f5f9; padding: 40px 15px; box-sizing: border-box; }
                    .email-card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; }
                    .header-bar { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 32px 36px; text-align: left; }
                    .brand-badge { display: inline-flex; align-items: center; background: rgba(99, 102, 241, 0.25); border: 1px solid rgba(165, 180, 252, 0.3); border-radius: 20px; padding: 4px 14px; color: #a5b4fc; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
                    .header-title { color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; }
                    .email-body { padding: 36px 36px 28px 36px; color: #334155; font-size: 15px; }
                    .info-panel { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
                    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
                    .footer { background: #f8fafc; padding: 24px 36px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
                    .badge-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
                    .badge-success { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
                    .badge-indigo { background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe; }
                    .badge-amber { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
                </style>
            </head>
            <body>
                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                    {{PREHEADER}}
                </div>
                <div class="email-wrapper">
                    <div class="email-card">
                        <div class="header-bar">
                            <div class="brand-badge">🎓 CampusConnect &bull; CPMS Institutional Portal</div>
                            <h1 class="header-title">{{TITLE}}</h1>
                        </div>
                        <div class="email-body">
                            {{BODY}}
                            {{CTA_HTML}}
                        </div>
                        <div class="footer">
                            <p style="margin: 0 0 6px 0; font-weight: 700; color: #4338ca;">🎓 CampusConnect &bull; Training &amp; Placement Cell</p>
                            <p style="margin: 0;">This is an automated notification sent via CampusConnect verified mailer. &copy; {{YEAR}} All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """;

        return template
                .replace("{{TITLE}}", title != null ? title : "")
                .replace("{{PREHEADER}}", preheader != null ? preheader : "")
                .replace("{{BODY}}", bodyContent != null ? bodyContent : "")
                .replace("{{CTA_HTML}}", ctaHtml)
                .replace("{{YEAR}}", String.valueOf(currentYear));
    }

    public CompletableFuture<Boolean> sendEmailAsync(String toAddress, String subject, String htmlContent) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                if (mailSender == null) {
                    log.info("[Mailer Notice] No JavaMailSender configured. Simulated dispatch to {}: '{}'", toAddress, subject);
                    return true;
                }
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setFrom(new jakarta.mail.internet.InternetAddress(senderEmail, "CampusConnect Placement Portal"));
                helper.setTo(toAddress);
                helper.setSubject(subject);
                helper.setText(htmlContent, true);
                mailSender.send(message);
                log.info("[Mailer Success] Email dispatched successfully to {}: '{}'", toAddress, subject);
                return true;
            } catch (Exception e) {
                log.error("[Mailer Error] Failed to send email to " + toAddress + ": " + e.getMessage(), e);
                return false;
            }
        }, executor);
    }

    public void sendOtpEmail(String recipientEmail, String otp, String purpose) {
        String actionText = "REGISTRATION".equalsIgnoreCase(purpose) ? "Account Registration" :
                ("PASSWORD_RESET".equalsIgnoreCase(purpose) ? "Password Recovery" : "Security Verification");
        String subject = "🔐 CampusConnect Verification Code: " + otp;
        String title = "Verify Your CampusConnect Account";
        String preheader = "Your 6-digit verification code is " + otp + ". Valid for 10 minutes.";
        String body = """
            <p>Hello,</p>
            <p>You have requested an authentication verification code for <strong>{{ACTION}}</strong> on CampusConnect.</p>
            <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border: 1px solid #4338ca; border-radius: 16px; padding: 28px 20px; text-align: center; margin: 28px 0; box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.3);">
                <div style="color: #a5b4fc; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">One-Time Verification OTP</div>
                <div style="color: #ffffff; font-size: 38px; font-weight: 900; letter-spacing: 8px; font-family: monospace; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">{{OTP}}</div>
                <div style="color: #cbd5e1; font-size: 12px; margin-top: 10px;">⏰ Valid for <strong>10 minutes</strong> &bull; Do not share this OTP with anyone.</div>
            </div>
            <div class="info-panel">
                <div class="info-row"><span>Account Email:</span><strong>{{EMAIL}}</strong></div>
                <div class="info-row"><span>Purpose:</span><span class="badge-status badge-indigo">{{ACTION}}</span></div>
                <div class="info-row"><span>Security Verification:</span><span class="badge-status badge-success">TLS 1.3 Verified</span></div>
            </div>
            <p style="font-size: 13px; color: #64748b;">If you did not request this verification code, please ignore this email or reach out to the campus placement team.</p>
        """
            .replace("{{ACTION}}", actionText)
            .replace("{{OTP}}", otp)
            .replace("{{EMAIL}}", recipientEmail);

        String html = renderEmailHtml(title, preheader, body, null, null);
        sendEmailAsync(recipientEmail, subject, html);
    }

    public void sendDriveEligibilityNotificationEmail(String recipientEmail, String studentName, String jobTitle,
                                                     String companyName, Double packageLpa, String driveDate,
                                                     String deadline, Double minCgpa, List<String> allowedBranches) {
        String branchesStr = (allowedBranches != null && !allowedBranches.isEmpty()) ? String.join(", ", allowedBranches) : "All Branches";
        String subject = "🎯 You're Eligible! Drive: " + companyName + " - " + jobTitle + " (₹" + packageLpa + " LPA)";
        String title = "🎯 Eligibility Matched: " + companyName;
        String preheader = "Great news, " + studentName + "! You qualify for " + jobTitle + " at " + companyName + ".";

        String body = """
            <p>Dear <strong>%s</strong>,</p>
            <p>We are pleased to inform you that your academic profile meets the eligibility criteria for the newly announced campus recruitment drive by <strong style="color: #4f46e5;">%s</strong>.</p>
            <div class="info-panel">
                <div class="info-row"><span>Company:</span><strong>%s</strong></div>
                <div class="info-row"><span>Role / Position:</span><strong>%s</strong></div>
                <div class="info-row"><span>Compensation (CTC):</span><strong style="color: #059669; font-size: 16px;">₹ %.1f LPA</strong></div>
                <div class="info-row"><span>Drive Date:</span><strong>%s</strong></div>
                <div class="info-row"><span>Application Deadline:</span><strong style="color: #d97706;">%s</strong></div>
                <div class="info-row"><span>Required Criteria:</span><strong>CGPA &ge; %.2f (%s)</strong></div>
                <div class="info-row"><span>Your Match Status:</span><span class="badge-status badge-success">ELIGIBILITY MET ✓</span></div>
            </div>
            <p>Please review the job requirements, syllabus, and ensure you submit your application before the deadline.</p>
        """.formatted(studentName, companyName, companyName, jobTitle, packageLpa != null ? packageLpa : 0.0,
                driveDate != null ? driveDate : "To be announced",
                deadline != null ? deadline : "Closing soon",
                minCgpa != null ? minCgpa : 0.0, branchesStr);

        String html = renderEmailHtml(title, preheader, body, "View Drive & Apply on CampusConnect", frontendUrl);
        sendEmailAsync(recipientEmail, subject, html);
    }

    public void sendWelcomeEmail(String userEmail, String fullName, String role) {
        String subject = "Welcome to CampusConnect - Account Activated (" + role + ")";
        String title = "Welcome, " + fullName + "!";
        String preheader = "Your CampusConnect account as " + role + " has been verified & created successfully.";
        String body = """
            <p>Hello <strong>%s</strong>,</p>
            <p>Welcome to <strong>CampusConnect - Smart College Placement Management System</strong>. Your institutional account is active with role: <strong style="color: #4f46e5;">%s</strong>.</p>
            <div class="info-panel">
                <div class="info-row"><span>Account Email:</span><strong>%s</strong></div>
                <div class="info-row"><span>Assigned Role:</span><strong>%s</strong></div>
                <div class="info-row"><span>Email Verification:</span><span class="badge-status badge-success">VERIFIED ✓</span></div>
                <div class="info-row"><span>Status:</span><span class="badge-status badge-success">Active</span></div>
            </div>
            <p>You can now sign in to your dashboard to complete your portfolio, explore eligible recruitment drives, and track your placements.</p>
        """.formatted(fullName, role, userEmail, role);

        String html = renderEmailHtml(title, preheader, body, "Sign In to CampusConnect Portal", frontendUrl);
        sendEmailAsync(userEmail, subject, html);
    }

    public void sendApplicationSubmittedEmail(String studentEmail, String studentName, String jobTitle, String companyName, Double packageLpa, String driveDate) {
        String subject = "Application Confirmed: " + jobTitle + " at " + companyName;
        String title = "Application Submitted Successfully";
        String preheader = "Your application for " + jobTitle + " at " + companyName + " is recorded.";
        String body = """
            <p>Dear <strong>%s</strong>,</p>
            <p>Your application for the upcoming campus recruitment drive has been successfully submitted and logged into the CampusConnect registry.</p>
            <div class="info-panel">
                <div class="info-row"><span>Company:</span><strong>%s</strong></div>
                <div class="info-row"><span>Role / Position:</span><strong>%s</strong></div>
                <div class="info-row"><span>Compensation (CTC):</span><strong>₹ %.1f LPA</strong></div>
                <div class="info-row"><span>Drive Date:</span><strong>%s</strong></div>
                <div class="info-row"><span>Current Stage:</span><span class="badge-status badge-indigo">APPLIED (Screening)</span></div>
            </div>
            <p>Our placement officers and the recruiter will review your academic credentials and portfolio.</p>
        """.formatted(studentName, companyName, jobTitle, packageLpa != null ? packageLpa : 0.0, driveDate != null ? driveDate : "To be announced");

        String html = renderEmailHtml(title, preheader, body, "Track Application Status", frontendUrl);
        sendEmailAsync(studentEmail, subject, html);
    }

    public void sendApplicationStatusUpdateEmail(String studentEmail, String studentName, String jobTitle, String companyName, String newStatus, String notes) {
        String upperStatus = (newStatus != null) ? newStatus.toUpperCase() : "UPDATED";
        String subject;
        String title;
        String badgeClass;

        if ("SELECTED".equals(upperStatus) || "PLACED".equals(upperStatus) || "OFFER_ACCEPTED".equals(upperStatus)) {
            subject = "🎉 CONGRATULATIONS! Offer Extended for " + jobTitle + " (" + companyName + ")";
            title = "🎉 Selected for Placement Offer!";
            badgeClass = "badge-success";
        } else if ("SHORTLISTED".equals(upperStatus)) {
            subject = "🎯 Shortlisted: " + jobTitle + " at " + companyName;
            title = "Application Shortlisted for Next Rounds";
            badgeClass = "badge-indigo";
        } else if ("REJECTED".equals(upperStatus)) {
            subject = "Application Update: " + jobTitle + " (" + companyName + ")";
            title = "Application Update: Not Shortlisted";
            badgeClass = "badge-amber";
        } else if (upperStatus.contains("INTERVIEW") || upperStatus.contains("ROUND")) {
            subject = "📅 Round Update: " + newStatus + " - " + jobTitle + " (" + companyName + ")";
            title = "Interview Round Status: " + newStatus;
            badgeClass = "badge-indigo";
        } else {
            subject = "Application Update: " + newStatus + " - " + jobTitle + " (" + companyName + ")";
            title = "Application Status: " + newStatus;
            badgeClass = "badge-indigo";
        }

        String preheader = "Update on your application for " + jobTitle + " at " + companyName + ": " + newStatus + ".";
        String noteHtml = (notes != null && !notes.isBlank()) ? "<div class=\"info-row\" style=\"display: block;\"><span style=\"color: #64748b; font-size: 13px;\">Placement Cell Notes:</span><p style=\"margin: 4px 0 0 0; font-style: italic; color: #1e293b;\">" + notes + "</p></div>" : "";

        String body = """
            <p>Dear <strong>%s</strong>,</p>
            <p>The recruitment team and Training &amp; Placement Cell have updated the evaluation status of your application for <strong>%s</strong> at <strong>%s</strong>.</p>
            <div class="info-panel">
                <div class="info-row"><span>Company:</span><strong>%s</strong></div>
                <div class="info-row"><span>Position:</span><strong>%s</strong></div>
                <div class="info-row"><span>New Evaluation Status:</span><span class="badge-status %s">%s</span></div>
                %s
            </div>
            <p>Log in to your CampusConnect candidate desk to review additional details, scheduled slots, and upcoming rounds.</p>
        """.formatted(studentName, jobTitle, companyName, companyName, jobTitle, badgeClass, newStatus, noteHtml);

        String html = renderEmailHtml(title, preheader, body, "View Application Desk", frontendUrl);
        sendEmailAsync(studentEmail, subject, html);
    }

    public void sendInterviewScheduledEmail(String studentEmail, String studentName, String jobTitle, String companyName, String roundName, String scheduledTime, String meetingLink, String location) {
        String subject = "Interview Scheduled: " + roundName + " - " + companyName;
        String title = "Interview Round Scheduled";
        String preheader = "You are invited for " + roundName + " with " + companyName + " on " + scheduledTime + ".";
        String link = (meetingLink != null && !meetingLink.isBlank()) ? meetingLink : "https://meet.google.com/cpms-interview";

        String body = """
            <p>Dear <strong>%s</strong>,</p>
            <p>Congratulations! You have been shortlisted for an interview round with <strong>%s</strong> for the <strong>%s</strong> position.</p>
            <div class="info-panel">
                <div class="info-row"><span>Company:</span><strong>%s</strong></div>
                <div class="info-row"><span>Round:</span><strong>%s</strong></div>
                <div class="info-row"><span>Date &amp; Time:</span><strong style="color: #4f46e5;">%s</strong></div>
                <div class="info-row"><span>Venue / Mode:</span><strong>%s</strong></div>
                <div class="info-row"><span>Meeting URL:</span><a href="%s" style="color: #4f46e5; text-decoration: underline;">Join Interview Room</a></div>
            </div>
            <p><strong>Interview Preparation Guidelines:</strong></p>
            <ul>
                <li>Join the meeting room at least 5 minutes prior to the scheduled slot.</li>
                <li>Ensure a stable internet connection and functional camera.</li>
                <li>Have a copy of your verified PDF resume ready.</li>
            </ul>
        """.formatted(studentName, companyName, jobTitle, companyName, roundName, scheduledTime, location != null ? location : "Virtual Google Meet", link);

        String html = renderEmailHtml(title, preheader, body, "Launch Virtual Interview Room", link);
        sendEmailAsync(studentEmail, subject, html);
    }

    public void sendPlacementOfferEmail(String studentEmail, String studentName, String jobTitle, String companyName, Double packageLpa) {
        String subject = "🎉 CONGRATULATIONS! Placement Offer from " + companyName;
        String title = "🎉 Congratulations on Your Placement Offer!";
        String preheader = "You have been selected by " + companyName + " with an offer of " + packageLpa + " LPA!";

        String body = """
            <p>Dear <strong>%s</strong>,</p>
            <p style="font-size: 16px; color: #059669; font-weight: 700;">Heartiest congratulations from the Training &amp; Placement Cell!</p>
            <p>We are delighted to inform you that you have been officially selected by <strong>%s</strong> for the role of <strong>%s</strong>.</p>
            <div class="info-panel" style="background: #ecfdf5; border-color: #a7f3d0;">
                <div class="info-row"><span>Company:</span><strong style="color: #065f46;">%s</strong></div>
                <div class="info-row"><span>Designation:</span><strong style="color: #065f46;">%s</strong></div>
                <div class="info-row"><span>Offered CTC:</span><strong style="color: #059669; font-size: 16px;">₹ %.1f LPA</strong></div>
                <div class="info-row"><span>Placement Status:</span><span class="badge-status badge-success">SELECTED &bull; PLACED</span></div>
            </div>
            <p>Your official placement record has been added to the institutional roster. Please contact the Training &amp; Placement cell for documentation.</p>
        """.formatted(studentName, companyName, jobTitle, companyName, jobTitle, packageLpa != null ? packageLpa : 0.0);

        String html = renderEmailHtml(title, preheader, body, "View Placement Milestone", frontendUrl);
        sendEmailAsync(studentEmail, subject, html);
    }

    public void sendDriveAnnouncementEmail(List<String> recipientEmails, String jobTitle, String companyName, Double packageLpa, String driveDate, Double minCgpa, String allowedBranches, String deadline) {
        if (recipientEmails == null || recipientEmails.isEmpty()) return;

        String subject = "🚀 New Drive Alert: " + companyName + " - " + jobTitle + " (₹" + packageLpa + " LPA)";
        String title = "New Recruitment Drive: " + companyName;
        String preheader = companyName + " is hiring " + jobTitle + ".";

        String body = """
            <p>Dear Candidate,</p>
            <p>A new recruitment drive has been announced on the CPMS portal for eligible students.</p>
            <div class="info-panel">
                <div class="info-row"><span>Company:</span><strong>%s</strong></div>
                <div class="info-row"><span>Job Title:</span><strong>%s</strong></div>
                <div class="info-row"><span>Package (CTC):</span><strong style="color: #4f46e5;">₹ %.1f LPA</strong></div>
                <div class="info-row"><span>Drive Date:</span><strong>%s</strong></div>
                <div class="info-row"><span>Application Deadline:</span><strong style="color: #d97706;">%s</strong></div>
                <div class="info-row"><span>Eligibility:</span><strong>CGPA &ge; %.1f (%s)</strong></div>
            </div>
            <p>Eligible candidates are advised to verify their profile and apply before the deadline.</p>
        """.formatted(companyName, jobTitle, packageLpa != null ? packageLpa : 0.0, driveDate != null ? driveDate : "TBA", deadline != null ? deadline : "Closing Soon", minCgpa != null ? minCgpa : 0.0, allowedBranches != null ? allowedBranches : "All Branches");

        String html = renderEmailHtml(title, preheader, body, "Apply on Job Board", frontendUrl);
        for (String email : recipientEmails) {
            sendEmailAsync(email, subject, html);
        }
    }

    public void sendOfficerCredentialsEmail(String recipientEmail, String officerName, String tempPassword, String department, String officerCode) {
        String subject = "👔 Welcome to CampusConnect: Placement Officer Account Provisioned";
        String title = "Placement Officer Account Provisioned";
        String preheader = "Welcome " + officerName + ", your TPO portal credentials are ready.";

        String body = """
            <p>Dear <strong>{{NAME}}</strong>,</p>
            <p>An official <strong>Placement Officer (TPO)</strong> account has been provisioned for you by the Institutional Administrator on CampusConnect.</p>
            <div class="info-panel">
                <div class="info-row"><span>Officer Name:</span><strong>{{NAME}}</strong></div>
                <div class="info-row"><span>Department:</span><strong>{{DEPT}}</strong></div>
                <div class="info-row"><span>Officer Code:</span><strong>{{CODE}}</strong></div>
                <div class="info-row"><span>Login Email:</span><strong style="color: #4f46e5;">{{EMAIL}}</strong></div>
                <div class="info-row"><span>Assigned Password:</span><strong style="color: #059669; font-family: monospace; font-size: 16px;">{{PWD}}</strong></div>
                <div class="info-row"><span>Access Level:</span><span class="badge-status badge-indigo">Level 2 &bull; TPO Operations</span></div>
            </div>
            <p style="font-size: 13px; color: #64748b;">Please log in at the portal and update your password under account settings for institutional security compliance.</p>
        """
            .replace("{{NAME}}", officerName)
            .replace("{{DEPT}}", department != null ? department : "Training & Placement Cell")
            .replace("{{CODE}}", officerCode != null ? officerCode : "TPO-HQ-01")
            .replace("{{EMAIL}}", recipientEmail)
            .replace("{{PWD}}", tempPassword);

        String html = renderEmailHtml(title, preheader, body, "Access Officer Portal", frontendUrl);
        sendEmailAsync(recipientEmail, subject, html);
    }

    public void sendTestEmail(String recipientEmail, String subject, String customMessage) {
        String subj = (subject != null && !subject.isBlank()) ? subject : "CPMS Mailing System - Live Test Verification";
        String title = "Mailing System Live Verification";
        String preheader = "Your CPMS email integration is functioning with 100% success.";

        String body = """
            <p>Hello,</p>
            <p>This is a live test notification dispatched from the <strong>College Placement Management System (CPMS)</strong>.</p>
            <div class="info-panel">
                <div class="info-row"><span>Sender Email:</span><strong>%s</strong></div>
                <div class="info-row"><span>Recipient:</span><strong>%s</strong></div>
                <div class="info-row"><span>Mailer Status:</span><span class="badge-status badge-success">ONLINE &bull; VERIFIED</span></div>
            </div>
            <p>%s</p>
        """.formatted(senderEmail, recipientEmail, customMessage != null ? customMessage : "All automated recruitment notifications, status alerts, and interview invites will be delivered cleanly.");

        String html = renderEmailHtml(title, preheader, body, "Open CPMS Dashboard", frontendUrl);
        sendEmailAsync(recipientEmail, subj, html);
    }
}
