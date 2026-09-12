package com.cpms.dto;

import java.util.Map;

public class AnalyticsDTO {
    private long totalStudents;
    private long placedStudents;
    private String placementRate;
    private long activeDrives;
    private String highestCtc;
    private String averageCtc;
    private long partnerCompanies;
    private long interviewsScheduled;
    private Map<String, Double> branchPlacementPercentages;

    public AnalyticsDTO() {}

    public AnalyticsDTO(long totalStudents, long placedStudents, String placementRate, long activeDrives,
                        String highestCtc, String averageCtc, long partnerCompanies, long interviewsScheduled,
                        Map<String, Double> branchPlacementPercentages) {
        this.totalStudents = totalStudents;
        this.placedStudents = placedStudents;
        this.placementRate = placementRate;
        this.activeDrives = activeDrives;
        this.highestCtc = highestCtc;
        this.averageCtc = averageCtc;
        this.partnerCompanies = partnerCompanies;
        this.interviewsScheduled = interviewsScheduled;
        this.branchPlacementPercentages = branchPlacementPercentages;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private long totalStudents;
        private long placedStudents;
        private String placementRate;
        private long activeDrives;
        private String highestCtc;
        private String averageCtc;
        private long partnerCompanies;
        private long interviewsScheduled;
        private Map<String, Double> branchPlacementPercentages;

        public Builder totalStudents(long totalStudents) { this.totalStudents = totalStudents; return this; }
        public Builder placedStudents(long placedStudents) { this.placedStudents = placedStudents; return this; }
        public Builder placementRate(String placementRate) { this.placementRate = placementRate; return this; }
        public Builder activeDrives(long activeDrives) { this.activeDrives = activeDrives; return this; }
        public Builder highestCtc(String highestCtc) { this.highestCtc = highestCtc; return this; }
        public Builder averageCtc(String averageCtc) { this.averageCtc = averageCtc; return this; }
        public Builder partnerCompanies(long partnerCompanies) { this.partnerCompanies = partnerCompanies; return this; }
        public Builder interviewsScheduled(long interviewsScheduled) { this.interviewsScheduled = interviewsScheduled; return this; }
        public Builder branchPlacementPercentages(Map<String, Double> branchPlacementPercentages) { this.branchPlacementPercentages = branchPlacementPercentages; return this; }

        public AnalyticsDTO build() {
            return new AnalyticsDTO(totalStudents, placedStudents, placementRate, activeDrives, highestCtc, averageCtc, partnerCompanies, interviewsScheduled, branchPlacementPercentages);
        }
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
    public long getPlacedStudents() { return placedStudents; }
    public void setPlacedStudents(long placedStudents) { this.placedStudents = placedStudents; }
    public String getPlacementRate() { return placementRate; }
    public void setPlacementRate(String placementRate) { this.placementRate = placementRate; }
    public long getActiveDrives() { return activeDrives; }
    public void setActiveDrives(long activeDrives) { this.activeDrives = activeDrives; }
    public String getHighestCtc() { return highestCtc; }
    public void setHighestCtc(String highestCtc) { this.highestCtc = highestCtc; }
    public String getAverageCtc() { return averageCtc; }
    public void setAverageCtc(String averageCtc) { this.averageCtc = averageCtc; }
    public long getPartnerCompanies() { return partnerCompanies; }
    public void setPartnerCompanies(long partnerCompanies) { this.partnerCompanies = partnerCompanies; }
    public long getInterviewsScheduled() { return interviewsScheduled; }
    public void setInterviewsScheduled(long interviewsScheduled) { this.interviewsScheduled = interviewsScheduled; }
    public Map<String, Double> getBranchPlacementPercentages() { return branchPlacementPercentages; }
    public void setBranchPlacementPercentages(Map<String, Double> branchPlacementPercentages) { this.branchPlacementPercentages = branchPlacementPercentages; }
}
