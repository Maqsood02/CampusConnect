package com.cpms.dto;

public class CreateOfficerRequest {
    private String fullName;
    private String email;
    private String password;
    private String department;
    private String phone;
    private String officerCode;

    public CreateOfficerRequest() {}

    public CreateOfficerRequest(String fullName, String email, String password, String department, String phone, String officerCode) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.department = department;
        this.phone = phone;
        this.officerCode = officerCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOfficerCode() {
        return officerCode;
    }

    public void setOfficerCode(String officerCode) {
        this.officerCode = officerCode;
    }
}
