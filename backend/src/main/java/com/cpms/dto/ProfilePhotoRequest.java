package com.cpms.dto;

public class ProfilePhotoRequest {
    private String email;
    private String avatarUrl;

    public ProfilePhotoRequest() {}

    public ProfilePhotoRequest(String email, String avatarUrl) {
        this.email = email;
        this.avatarUrl = avatarUrl;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
