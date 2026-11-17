package com.cpms.dto;

public class SendOtpRequest {
    private String email;
    private String purpose; // REGISTRATION, PASSWORD_RESET, VERIFICATION

    public SendOtpRequest() {}

    public SendOtpRequest(String email, String purpose) {
        this.email = email;
        this.purpose = purpose;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
}
