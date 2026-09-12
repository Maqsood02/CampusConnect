package com.cpms.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String role; // Student, Placement Officer, Administrator
    private String fullName;
    private String branch;
    private Double cgpa;
    private String rollNumber;
    private String department;
    private String phone;

    public RegisterRequest() {}

    public RegisterRequest(String email, String password, String role, String fullName, String branch,
                           Double cgpa, String rollNumber, String department, String phone) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.fullName = fullName;
        this.branch = branch;
        this.cgpa = cgpa;
        this.rollNumber = rollNumber;
        this.department = department;
        this.phone = phone;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String email;
        private String password;
        private String role;
        private String fullName;
        private String branch;
        private Double cgpa;
        private String rollNumber;
        private String department;
        private String phone;

        public Builder email(String email) { this.email = email; return this; }
        public Builder password(String password) { this.password = password; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }
        public Builder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }

        public RegisterRequest build() {
            return new RegisterRequest(email, password, role, fullName, branch, cgpa, rollNumber, department, phone);
        }
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
