package com.cpms.dto;

public class AuthResponse {
    private String token;
    private UserSummary user;

    public AuthResponse() {}

    public AuthResponse(String token, UserSummary user) {
        this.token = token;
        this.user = user;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String token;
        private UserSummary user;

        public Builder token(String token) { this.token = token; return this; }
        public Builder user(UserSummary user) { this.user = user; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, user);
        }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public UserSummary getUser() { return user; }
    public void setUser(UserSummary user) { this.user = user; }

    public static class UserSummary {
        private String id;
        private String email;
        private String role;
        private String fullName;
        private String branch;
        private Double cgpa;
        private String rollNumber;
        private String department;
        private String avatarUrl;

        public UserSummary() {}

        public UserSummary(String id, String email, String role, String fullName, String branch, Double cgpa, String rollNumber, String department, String avatarUrl) {
            this.id = id;
            this.email = email;
            this.role = role;
            this.fullName = fullName;
            this.branch = branch;
            this.cgpa = cgpa;
            this.rollNumber = rollNumber;
            this.department = department;
            this.avatarUrl = avatarUrl;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String id;
            private String email;
            private String role;
            private String fullName;
            private String branch;
            private Double cgpa;
            private String rollNumber;
            private String department;
            private String avatarUrl;

            public Builder id(String id) { this.id = id; return this; }
            public Builder email(String email) { this.email = email; return this; }
            public Builder role(String role) { this.role = role; return this; }
            public Builder fullName(String fullName) { this.fullName = fullName; return this; }
            public Builder branch(String branch) { this.branch = branch; return this; }
            public Builder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
            public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
            public Builder department(String department) { this.department = department; return this; }
            public Builder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }

            public UserSummary build() {
                return new UserSummary(id, email, role, fullName, branch, cgpa, rollNumber, department, avatarUrl);
            }
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
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
        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    }
}
