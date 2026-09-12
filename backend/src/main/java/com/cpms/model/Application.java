package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "applications")
@CompoundIndex(def = "{'driveId': 1, 'studentId': 1}", unique = true)
public class Application {

    @Id
    private String id;

    private String driveId;
    private String studentId;
    private String studentName;
    private String rollNumber;
    private String branch;
    private Double cgpa;

    private String jobTitle;
    private String companyName;
    private Double packageLpa;

    private String applicationDate;

    // APPLIED, SHORTLISTED, TECHNICAL_ROUND, HR_ROUND, SELECTED, OFFER_ACCEPTED, REJECTED
    private String status = "APPLIED";
    private String stage = "APPLIED";

    private String feedback;

    private List<StageEvent> stageHistory = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    public Application() {}

    public Application(String id, String driveId, String studentId, String studentName, String rollNumber,
                       String branch, Double cgpa, String jobTitle, String companyName, Double packageLpa,
                       String applicationDate, String status, String stage, String feedback,
                       List<StageEvent> stageHistory, Instant createdAt) {
        this.id = id;
        this.driveId = driveId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.rollNumber = rollNumber;
        this.branch = branch;
        this.cgpa = cgpa;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.packageLpa = packageLpa;
        this.applicationDate = applicationDate;
        this.status = status != null ? status : "APPLIED";
        this.stage = stage != null ? stage : this.status;
        this.feedback = feedback;
        this.stageHistory = stageHistory != null ? stageHistory : new ArrayList<>();
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String driveId;
        private String studentId;
        private String studentName;
        private String rollNumber;
        private String branch;
        private Double cgpa;
        private String jobTitle;
        private String companyName;
        private Double packageLpa;
        private String applicationDate;
        private String status = "APPLIED";
        private String stage = "APPLIED";
        private String feedback;
        private List<StageEvent> stageHistory = new ArrayList<>();
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder driveId(String driveId) { this.driveId = driveId; return this; }
        public Builder studentId(String studentId) { this.studentId = studentId; return this; }
        public Builder studentName(String studentName) { this.studentName = studentName; return this; }
        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }
        public Builder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public Builder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public Builder companyName(String companyName) { this.companyName = companyName; return this; }
        public Builder packageLpa(Double packageLpa) { this.packageLpa = packageLpa; return this; }
        public Builder applicationDate(String applicationDate) { this.applicationDate = applicationDate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder stage(String stage) { this.stage = stage; return this; }
        public Builder feedback(String feedback) { this.feedback = feedback; return this; }
        public Builder stageHistory(List<StageEvent> stageHistory) { this.stageHistory = stageHistory; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Application build() {
            return new Application(id, driveId, studentId, studentName, rollNumber, branch, cgpa, jobTitle,
                    companyName, packageLpa, applicationDate, status, stage, feedback, stageHistory, createdAt);
        }
    }

    public static class StageEvent {
        private String stage;
        private String timestamp;
        private String notes;

        public StageEvent() {}
        public StageEvent(String stage, String timestamp, String notes) {
            this.stage = stage;
            this.timestamp = timestamp;
            this.notes = notes;
        }

        public String getStage() { return stage; }
        public void setStage(String stage) { this.stage = stage; }
        public String getTimestamp() { return timestamp; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }
    public String getApplicationDate() { return applicationDate; }
    public void setApplicationDate(String applicationDate) { this.applicationDate = applicationDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public List<StageEvent> getStageHistory() { return stageHistory; }
    public void setStageHistory(List<StageEvent> stageHistory) { this.stageHistory = stageHistory; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
