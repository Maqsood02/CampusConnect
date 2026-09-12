package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "students")
public class Student {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    @Indexed(unique = true)
    private String rollNumber;

    private String fullName;
    private String email;
    private String branch;
    private Double cgpa;
    private Integer graduationYear;
    private String semester;
    private Integer activeBacklogs;
    private String phone;
    private String resumeUrl;
    private String avatarUrl;

    private String verificationStatus = "VERIFIED"; // PENDING, VERIFIED, REJECTED

    private List<SkillItem> skills = new ArrayList<>();
    private List<CertificationItem> certifications = new ArrayList<>();
    private List<ProjectItem> projects = new ArrayList<>();
    private List<InternshipItem> internships = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    public Student() {}

    public Student(String id, String userId, String rollNumber, String fullName, String email, String branch,
                   Double cgpa, Integer graduationYear, String semester, Integer activeBacklogs,
                   String phone, String resumeUrl, String avatarUrl, String verificationStatus,
                   List<SkillItem> skills, List<CertificationItem> certifications,
                   List<ProjectItem> projects, List<InternshipItem> internships, Instant createdAt) {
        this.id = id;
        this.userId = userId;
        this.rollNumber = rollNumber;
        this.fullName = fullName;
        this.email = email;
        this.branch = branch;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.semester = semester;
        this.activeBacklogs = activeBacklogs;
        this.phone = phone;
        this.resumeUrl = resumeUrl;
        this.avatarUrl = avatarUrl;
        this.verificationStatus = verificationStatus != null ? verificationStatus : "VERIFIED";
        this.skills = skills != null ? skills : new ArrayList<>();
        this.certifications = certifications != null ? certifications : new ArrayList<>();
        this.projects = projects != null ? projects : new ArrayList<>();
        this.internships = internships != null ? internships : new ArrayList<>();
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String userId;
        private String rollNumber;
        private String fullName;
        private String email;
        private String branch;
        private Double cgpa;
        private Integer graduationYear;
        private String semester;
        private Integer activeBacklogs;
        private String phone;
        private String resumeUrl;
        private String avatarUrl;
        private String verificationStatus = "VERIFIED";
        private List<SkillItem> skills = new ArrayList<>();
        private List<CertificationItem> certifications = new ArrayList<>();
        private List<ProjectItem> projects = new ArrayList<>();
        private List<InternshipItem> internships = new ArrayList<>();
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder userId(String userId) { this.userId = userId; return this; }
        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }
        public Builder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public Builder graduationYear(Integer graduationYear) { this.graduationYear = graduationYear; return this; }
        public Builder semester(String semester) { this.semester = semester; return this; }
        public Builder activeBacklogs(Integer activeBacklogs) { this.activeBacklogs = activeBacklogs; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder resumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; return this; }
        public Builder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public Builder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder skills(List<SkillItem> skills) { this.skills = skills; return this; }
        public Builder certifications(List<CertificationItem> certifications) { this.certifications = certifications; return this; }
        public Builder projects(List<ProjectItem> projects) { this.projects = projects; return this; }
        public Builder internships(List<InternshipItem> internships) { this.internships = internships; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Student build() {
            return new Student(id, userId, rollNumber, fullName, email, branch, cgpa, graduationYear, semester,
                    activeBacklogs, phone, resumeUrl, avatarUrl, verificationStatus, skills, certifications, projects, internships, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public Integer getActiveBacklogs() { return activeBacklogs; }
    public void setActiveBacklogs(Integer activeBacklogs) { this.activeBacklogs = activeBacklogs; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public List<SkillItem> getSkills() { return skills; }
    public void setSkills(List<SkillItem> skills) { this.skills = skills; }
    public List<CertificationItem> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationItem> certifications) { this.certifications = certifications; }
    public List<ProjectItem> getProjects() { return projects; }
    public void setProjects(List<ProjectItem> projects) { this.projects = projects; }
    public List<InternshipItem> getInternships() { return internships; }
    public void setInternships(List<InternshipItem> internships) { this.internships = internships; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    // Inner Classes
    public static class SkillItem {
        private String name;
        private String level;

        public SkillItem() {}
        public SkillItem(String name, String level) {
            this.name = name;
            this.level = level;
        }
        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String name;
            private String level;
            public Builder name(String name) { this.name = name; return this; }
            public Builder level(String level) { this.level = level; return this; }
            public SkillItem build() { return new SkillItem(name, level); }
        }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
    }

    public static class CertificationItem {
        private String title;
        private String issuer;
        private String date;

        public CertificationItem() {}
        public CertificationItem(String title, String issuer, String date) {
            this.title = title;
            this.issuer = issuer;
            this.date = date;
        }
        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String title;
            private String issuer;
            private String date;
            public Builder title(String title) { this.title = title; return this; }
            public Builder issuer(String issuer) { this.issuer = issuer; return this; }
            public Builder date(String date) { this.date = date; return this; }
            public CertificationItem build() { return new CertificationItem(title, issuer, date); }
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getIssuer() { return issuer; }
        public void setIssuer(String issuer) { this.issuer = issuer; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
    }

    public static class ProjectItem {
        private String title;
        private String tech;
        private String desc;

        public ProjectItem() {}
        public ProjectItem(String title, String tech, String desc) {
            this.title = title;
            this.tech = tech;
            this.desc = desc;
        }
        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String title;
            private String tech;
            private String desc;
            public Builder title(String title) { this.title = title; return this; }
            public Builder tech(String tech) { this.tech = tech; return this; }
            public Builder desc(String desc) { this.desc = desc; return this; }
            public ProjectItem build() { return new ProjectItem(title, tech, desc); }
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getTech() { return tech; }
        public void setTech(String tech) { this.tech = tech; }
        public String getDesc() { return desc; }
        public void setDesc(String desc) { this.desc = desc; }
    }

    public static class InternshipItem {
        private String company;
        private String role;
        private String duration;
        private String desc;

        public InternshipItem() {}
        public InternshipItem(String company, String role, String duration, String desc) {
            this.company = company;
            this.role = role;
            this.duration = duration;
            this.desc = desc;
        }
        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String company;
            private String role;
            private String duration;
            private String desc;
            public Builder company(String company) { this.company = company; return this; }
            public Builder role(String role) { this.role = role; return this; }
            public Builder duration(String duration) { this.duration = duration; return this; }
            public Builder desc(String desc) { this.desc = desc; return this; }
            public InternshipItem build() { return new InternshipItem(company, role, duration, desc); }
        }
        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
        public String getDesc() { return desc; }
        public void setDesc(String desc) { this.desc = desc; }
    }
}
