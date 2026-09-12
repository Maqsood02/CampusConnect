package com.cpms.dto;

public class ApplyRequest {
    private String driveId;
    private String studentId;

    public ApplyRequest() {}

    public ApplyRequest(String driveId, String studentId) {
        this.driveId = driveId;
        this.studentId = studentId;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String driveId;
        private String studentId;

        public Builder driveId(String driveId) { this.driveId = driveId; return this; }
        public Builder studentId(String studentId) { this.studentId = studentId; return this; }

        public ApplyRequest build() {
            return new ApplyRequest(driveId, studentId);
        }
    }

    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
}
