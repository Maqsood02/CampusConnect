package com.cpms.dto;

public class InterviewRequest {
    private String applicationId;
    private String driveId;
    private String studentId;
    private String roundName;
    private Integer roundNumber;
    private String scheduledTime;
    private String locationOrLink;
    private String mode;
    private String interviewerName;
    private String remarks;

    public InterviewRequest() {}

    public InterviewRequest(String applicationId, String driveId, String studentId, String roundName,
                            Integer roundNumber, String scheduledTime, String locationOrLink,
                            String mode, String interviewerName, String remarks) {
        this.applicationId = applicationId;
        this.driveId = driveId;
        this.studentId = studentId;
        this.roundName = roundName;
        this.roundNumber = roundNumber;
        this.scheduledTime = scheduledTime;
        this.locationOrLink = locationOrLink;
        this.mode = mode;
        this.interviewerName = interviewerName;
        this.remarks = remarks;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String applicationId;
        private String driveId;
        private String studentId;
        private String roundName;
        private Integer roundNumber;
        private String scheduledTime;
        private String locationOrLink;
        private String mode;
        private String interviewerName;
        private String remarks;

        public Builder applicationId(String applicationId) { this.applicationId = applicationId; return this; }
        public Builder driveId(String driveId) { this.driveId = driveId; return this; }
        public Builder studentId(String studentId) { this.studentId = studentId; return this; }
        public Builder roundName(String roundName) { this.roundName = roundName; return this; }
        public Builder roundNumber(Integer roundNumber) { this.roundNumber = roundNumber; return this; }
        public Builder scheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; return this; }
        public Builder locationOrLink(String locationOrLink) { this.locationOrLink = locationOrLink; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder interviewerName(String interviewerName) { this.interviewerName = interviewerName; return this; }
        public Builder remarks(String remarks) { this.remarks = remarks; return this; }

        public InterviewRequest build() {
            return new InterviewRequest(applicationId, driveId, studentId, roundName, roundNumber, scheduledTime, locationOrLink, mode, interviewerName, remarks);
        }
    }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }
    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
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
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
