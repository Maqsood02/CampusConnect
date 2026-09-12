package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "recruitment_drives")
public class RecruitmentDrive {

    @Id
    private String id;

    private String companyId;
    private String companyName;
    private String jobTitle;
    private Double packageLpa;
    private String location;
    private String driveDate;
    private String deadline;
    private String status; // OPEN, CLOSED, ARCHIVED
    private String tier;   // Super Dream, Dream, Core
    private String description;

    private EligibilityCriteria criteria = new EligibilityCriteria();

    @CreatedDate
    private Instant createdAt;

    public RecruitmentDrive() {}

    public RecruitmentDrive(String id, String companyId, String companyName, String jobTitle, Double packageLpa,
                            String location, String driveDate, String deadline, String status, String tier,
                            String description, EligibilityCriteria criteria, Instant createdAt) {
        this.id = id;
        this.companyId = companyId;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.packageLpa = packageLpa;
        this.location = location;
        this.driveDate = driveDate;
        this.deadline = deadline;
        this.status = status;
        this.tier = tier;
        this.description = description;
        this.criteria = criteria != null ? criteria : new EligibilityCriteria();
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String companyId;
        private String companyName;
        private String jobTitle;
        private Double packageLpa;
        private String location;
        private String driveDate;
        private String deadline;
        private String status;
        private String tier;
        private String description;
        private EligibilityCriteria criteria = new EligibilityCriteria();
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder companyId(String companyId) { this.companyId = companyId; return this; }
        public Builder companyName(String companyName) { this.companyName = companyName; return this; }
        public Builder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public Builder packageLpa(Double packageLpa) { this.packageLpa = packageLpa; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder driveDate(String driveDate) { this.driveDate = driveDate; return this; }
        public Builder deadline(String deadline) { this.deadline = deadline; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder tier(String tier) { this.tier = tier; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder criteria(EligibilityCriteria criteria) { this.criteria = criteria; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public RecruitmentDrive build() {
            return new RecruitmentDrive(id, companyId, companyName, jobTitle, packageLpa, location, driveDate, deadline, status, tier, description, criteria, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCompanyId() { return companyId; }
    public void setCompanyId(String companyId) { this.companyId = companyId; }
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
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public EligibilityCriteria getCriteria() { return criteria; }
    public void setCriteria(EligibilityCriteria criteria) { this.criteria = criteria; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static class EligibilityCriteria {
        private Double minCgpa;
        private List<String> allowedBranches = new ArrayList<>();
        private Integer maxBacklogs;
        private Integer graduationYear;
        private List<String> requiredSkills = new ArrayList<>();

        public EligibilityCriteria() {}
        public EligibilityCriteria(Double minCgpa, List<String> allowedBranches, Integer maxBacklogs, Integer graduationYear, List<String> requiredSkills) {
            this.minCgpa = minCgpa;
            this.allowedBranches = allowedBranches != null ? allowedBranches : new ArrayList<>();
            this.maxBacklogs = maxBacklogs;
            this.graduationYear = graduationYear;
            this.requiredSkills = requiredSkills != null ? requiredSkills : new ArrayList<>();
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Double minCgpa;
            private List<String> allowedBranches = new ArrayList<>();
            private Integer maxBacklogs;
            private Integer graduationYear;
            private List<String> requiredSkills = new ArrayList<>();

            public Builder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
            public Builder allowedBranches(List<String> allowedBranches) { this.allowedBranches = allowedBranches; return this; }
            public Builder maxBacklogs(Integer maxBacklogs) { this.maxBacklogs = maxBacklogs; return this; }
            public Builder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
            public Builder requiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
            public EligibilityCriteria build() { return new EligibilityCriteria(minCgpa, allowedBranches, maxBacklogs, graduationYear, requiredSkills); }
        }

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
}
