package com.cpms.dto;

import java.util.List;

public class DriveRequest {
    private String companyName;
    private String jobTitle;
    private Double packageLpa;
    private String location;
    private String driveDate;
    private String deadline;
    private String description;
    private Double minCgpa;
    private List<String> allowedBranches;
    private Integer maxBacklogs;
    private Integer graduationYear;
    private List<String> requiredSkills;

    public DriveRequest() {}

    public DriveRequest(String companyName, String jobTitle, Double packageLpa, String location, String driveDate,
                        String deadline, String description, Double minCgpa, List<String> allowedBranches,
                        Integer maxBacklogs, Integer graduationYear, List<String> requiredSkills) {
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.packageLpa = packageLpa;
        this.location = location;
        this.driveDate = driveDate;
        this.deadline = deadline;
        this.description = description;
        this.minCgpa = minCgpa;
        this.allowedBranches = allowedBranches;
        this.maxBacklogs = maxBacklogs;
        this.graduationYear = graduationYear;
        this.requiredSkills = requiredSkills;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String companyName;
        private String jobTitle;
        private Double packageLpa;
        private String location;
        private String driveDate;
        private String deadline;
        private String description;
        private Double minCgpa;
        private List<String> allowedBranches;
        private Integer maxBacklogs;
        private Integer graduationYear;
        private List<String> requiredSkills;

        public Builder companyName(String companyName) { this.companyName = companyName; return this; }
        public Builder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public Builder packageLpa(Double packageLpa) { this.packageLpa = packageLpa; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder driveDate(String driveDate) { this.driveDate = driveDate; return this; }
        public Builder deadline(String deadline) { this.deadline = deadline; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
        public Builder allowedBranches(List<String> allowedBranches) { this.allowedBranches = allowedBranches; return this; }
        public Builder maxBacklogs(Integer maxBacklogs) { this.maxBacklogs = maxBacklogs; return this; }
        public Builder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public Builder requiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }

        public DriveRequest build() {
            return new DriveRequest(companyName, jobTitle, packageLpa, location, driveDate, deadline, description,
                    minCgpa, allowedBranches, maxBacklogs, graduationYear, requiredSkills);
        }
    }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDriveDate() { return driveDate; }
    public void setDriveDate(String driveDate) { this.driveDate = driveDate; }
    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
    public List<String> getAllowedBranches() { return allowedBranches; }
    public void setAllowedBranches(List<String> allowedBranches) { this.allowedBranches = allowedBranches; }
    public Integer getMaxBacklogs() { return maxBacklogs; }
    public void setMaxBacklogs(Integer maxBacklogs) { this.maxBacklogs = maxBacklogs; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}
