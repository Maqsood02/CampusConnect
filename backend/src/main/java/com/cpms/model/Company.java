package com.cpms.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "companies")
public class Company {

    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    private String industry;
    private String website;
    private String logoUrl;
    private String tier; // Super Dream, Dream, Core
    private String contactEmail;
    private String phone;

    @CreatedDate
    private Instant createdAt;

    public Company() {}

    public Company(String id, String name, String industry, String website, String logoUrl, String tier, String contactEmail, String phone, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.website = website;
        this.logoUrl = logoUrl;
        this.tier = tier;
        this.contactEmail = contactEmail;
        this.phone = phone;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String name;
        private String industry;
        private String website;
        private String logoUrl;
        private String tier;
        private String contactEmail;
        private String phone;
        private Instant createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder industry(String industry) { this.industry = industry; return this; }
        public Builder website(String website) { this.website = website; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public Builder tier(String tier) { this.tier = tier; return this; }
        public Builder contactEmail(String contactEmail) { this.contactEmail = contactEmail; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Company build() {
            return new Company(id, name, industry, website, logoUrl, tier, contactEmail, phone, createdAt);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
