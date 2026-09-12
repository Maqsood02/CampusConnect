package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "interviews")
public class Interview {

    @Id
    private String id;

    private String applicationId;
    private String driveId;
    private String studentId;

    private String candidateName;
    private String companyName;
    private String jobTitle;

    private String roundName;
    private Integer roundNumber;
    private String scheduledTime;
    private String locationOrLink;

    // VIRTUAL or IN_PERSON
    private String mode = "VIRTUAL";
    private String interviewerName;

    // SCHEDULED, COMPLETED, CANCELLED, RESCHEDULED
    private String status = "SCHEDULED";

    // Evaluation fields
    private Integer rating; // 1 to 5
    // RECOMMENDED, NEXT_ROUND, OFFER_EXTENDED, REJECTED
    private String verdict;
    private String feedbackNotes;

    private String remarks;

    @CreatedDate
    private Instant createdAt;

    public Interview() {}

    public Interview(String id, String applicationId, String driveId, String studentId, String candidateName,
                     String companyName, String jobTitle, String roundName, Integer roundNumber,
                     String scheduledTime, String locationOrLink, String mode, String interviewerName,
                     String status, Integer rating, String verdict, String feedbackNotes, String remarks,
                     Instant createdAt) {
        this.id = id;
        this.applicationId = applicationId;
        this.driveId = driveId;
        this.studentId = studentId;
        this.candidateName = candidateName;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.roundName = roundName;
        this.roundNumber = roundNumber;
        this.scheduledTime = scheduledTime;
        this.locationOrLink = locationOrLink;
        this.mode = mode != null ? mode : "VIRTUAL";
        this.interviewerName = interviewerName;
        this.status = status != null ? status : "SCHEDULED";
        this.rating = rating;
        this.verdict = verdict;
        this.feedbackNotes = feedbackNotes;
        this.remarks = remarks;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String applicationId;
        private String driveId;
        private String studentId;
        private String candidateName;
        private String companyName;
        private String jobTitle;
        private String roundName;
        private Integer roundNumber;
        private String scheduledTime;
        private String locationOrLink;
        private String mode = "VIRTUAL";
        private String interviewerName;
        private String status = "SCHEDULED";
        private Integer rating;
        private String verdict;
        private String feedbackNotes;
        private String remarks;
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder applicationId(String applicationId) { this.applicationId = applicationId; return this; }
        public Builder driveId(String driveId) { this.driveId = driveId; return this; }
        public Builder studentId(String studentId) { this.studentId = studentId; return this; }
        public Builder candidateName(String candidateName) { this.candidateName = candidateName; return this; }
        public Builder companyName(String companyName) { this.companyName = companyName; return this; }
        public Builder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public Builder roundName(String roundName) { this.roundName = roundName; return this; }
        public Builder roundNumber(Integer roundNumber) { this.roundNumber = roundNumber; return this; }
        public Builder scheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; return this; }
        public Builder locationOrLink(String locationOrLink) { this.locationOrLink = locationOrLink; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder interviewerName(String interviewerName) { this.interviewerName = interviewerName; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder rating(Integer rating) { this.rating = rating; return this; }
        public Builder verdict(String verdict) { this.verdict = verdict; return this; }
        public Builder feedbackNotes(String feedbackNotes) { this.feedbackNotes = feedbackNotes; return this; }
        public Builder remarks(String remarks) { this.remarks = remarks; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Interview build() {
            return new Interview(id, applicationId, driveId, studentId, candidateName, companyName, jobTitle,
                    roundName, roundNumber, scheduledTime, locationOrLink, mode, interviewerName, status,
                    rating, verdict, feedbackNotes, remarks, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }
    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getRoundName() { return roundName; }
    public void setRoundName(String roundName) { this.roundName = roundName; }
    public Integer getRoundNumber() { return roundNumber; }
    public void setRoundNumber(Integer roundNumber) { this.roundNumber = roundNumber; }
    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }
    public String getLocationOrLink() { return locationOrLink; }
    public void setLocationOrLink(String locationOrLink) { this.locationOrLink = locationOrLink; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public String getInterviewerName() { return interviewerName; }
    public void setInterviewerName(String interviewerName) { this.interviewerName = interviewerName; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getVerdict() { return verdict; }
    public void setVerdict(String verdict) { this.verdict = verdict; }
    public String getFeedbackNotes() { return feedbackNotes; }
    public void setFeedbackNotes(String feedbackNotes) { this.feedbackNotes = feedbackNotes; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
