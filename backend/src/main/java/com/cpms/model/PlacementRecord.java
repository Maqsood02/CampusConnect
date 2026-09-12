package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "placement_records")
public class PlacementRecord {

    @Id
    private String id;

    private String studentId;
    private String studentName;
    private String rollNumber;
    private String branch;
    private Double cgpa;
    private String email;
    private String phone;

    private String companyId;
    private String companyName;
    private String driveId;
    private String jobTitle;
    private Double packageLpa;
    private Double baseSalary;
    private Double joiningBonus;
    private String tier; // Super Dream, Dream, Core
    private String workLocation;

    private String offerDate;
    private String joiningDate;
    private String offerLetterUrl;

    // OFFERED, ACCEPTED, DECLINED, JOINED, REVOKED
    private String status = "OFFERED";

    // PENDING, VERIFIED, FLAGGED
    private String verificationStatus = "PENDING";
    private String verifiedBy;
    private String remarks;

    @CreatedDate
    private Instant createdAt;

    public PlacementRecord() {}

    public PlacementRecord(String id, String studentId, String studentName, String rollNumber, String branch,
                           Double cgpa, String email, String phone, String companyId, String companyName,
                           String driveId, String jobTitle, Double packageLpa, Double baseSalary,
                           Double joiningBonus, String tier, String workLocation, String offerDate,
                           String joiningDate, String offerLetterUrl, String status, String verificationStatus,
                           String verifiedBy, String remarks, Instant createdAt) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.rollNumber = rollNumber;
        this.branch = branch;
        this.cgpa = cgpa;
        this.email = email;
        this.phone = phone;
        this.companyId = companyId;
        this.companyName = companyName;
        this.driveId = driveId;
        this.jobTitle = jobTitle;
        this.packageLpa = packageLpa;
        this.baseSalary = baseSalary;
        this.joiningBonus = joiningBonus;
        this.tier = tier;
        this.workLocation = workLocation;
        this.offerDate = offerDate;
        this.joiningDate = joiningDate;
        this.offerLetterUrl = offerLetterUrl;
        this.status = status != null ? status : "OFFERED";
        this.verificationStatus = verificationStatus != null ? verificationStatus : "PENDING";
        this.verifiedBy = verifiedBy;
        this.remarks = remarks;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String studentId;
        private String studentName;
        private String rollNumber;
        private String branch;
        private Double cgpa;
        private String email;
        private String phone;
        private String companyId;
        private String companyName;
        private String driveId;
        private String jobTitle;
        private Double packageLpa;
        private Double baseSalary;
        private Double joiningBonus;
        private String tier;
        private String workLocation;
        private String offerDate;
        private String joiningDate;
        private String offerLetterUrl;
        private String status = "OFFERED";
        private String verificationStatus = "PENDING";
        private String verifiedBy;
        private String remarks;
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder studentId(String studentId) { this.studentId = studentId; return this; }
        public Builder studentName(String studentName) { this.studentName = studentName; return this; }
        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }
        public Builder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder companyId(String companyId) { this.companyId = companyId; return this; }
        public Builder companyName(String companyName) { this.companyName = companyName; return this; }
        public Builder driveId(String driveId) { this.driveId = driveId; return this; }
        public Builder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public Builder packageLpa(Double packageLpa) { this.packageLpa = packageLpa; return this; }
        public Builder baseSalary(Double baseSalary) { this.baseSalary = baseSalary; return this; }
        public Builder joiningBonus(Double joiningBonus) { this.joiningBonus = joiningBonus; return this; }
        public Builder tier(String tier) { this.tier = tier; return this; }
        public Builder workLocation(String workLocation) { this.workLocation = workLocation; return this; }
        public Builder offerDate(String offerDate) { this.offerDate = offerDate; return this; }
        public Builder joiningDate(String joiningDate) { this.joiningDate = joiningDate; return this; }
        public Builder offerLetterUrl(String offerLetterUrl) { this.offerLetterUrl = offerLetterUrl; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder verifiedBy(String verifiedBy) { this.verifiedBy = verifiedBy; return this; }
        public Builder remarks(String remarks) { this.remarks = remarks; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public PlacementRecord build() {
            return new PlacementRecord(id, studentId, studentName, rollNumber, branch, cgpa, email, phone,
                    companyId, companyName, driveId, jobTitle, packageLpa, baseSalary, joiningBonus,
                    tier, workLocation, offerDate, joiningDate, offerLetterUrl, status, verificationStatus,
                    verifiedBy, remarks, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
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
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCompanyId() { return companyId; }
    public void setCompanyId(String companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }
    public Double getBaseSalary() { return baseSalary; }
    public void setBaseSalary(Double baseSalary) { this.baseSalary = baseSalary; }
    public Double getJoiningBonus() { return joiningBonus; }
    public void setJoiningBonus(Double joiningBonus) { this.joiningBonus = joiningBonus; }
    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }
    public String getWorkLocation() { return workLocation; }
    public void setWorkLocation(String workLocation) { this.workLocation = workLocation; }
    public String getOfferDate() { return offerDate; }
    public void setOfferDate(String offerDate) { this.offerDate = offerDate; }
    public String getJoiningDate() { return joiningDate; }
    public void setJoiningDate(String joiningDate) { this.joiningDate = joiningDate; }
    public String getOfferLetterUrl() { return offerLetterUrl; }
    public void setOfferLetterUrl(String offerLetterUrl) { this.offerLetterUrl = offerLetterUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public String getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(String verifiedBy) { this.verifiedBy = verifiedBy; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
