package com.cpms.dto;

import java.util.List;
import java.util.Map;

public class ComprehensiveAnalyticsDTO {

    // 1. Placement Statistics
    private PlacementStats placementStats;

    // 2. Branch-Wise Performance
    private List<BranchPerformanceItem> branchPerformance;

    // 3. Company Recruitment Details
    private List<CompanyRecruitmentItem> companyRecruitmentDetails;

    // 4. Student Application Analysis
    private ApplicationFunnel funnel;
    private Map<String, Integer> applicationDistribution;

    public ComprehensiveAnalyticsDTO() {}

    public ComprehensiveAnalyticsDTO(PlacementStats placementStats,
                                     List<BranchPerformanceItem> branchPerformance,
                                     List<CompanyRecruitmentItem> companyRecruitmentDetails,
                                     ApplicationFunnel funnel,
                                     Map<String, Integer> applicationDistribution) {
        this.placementStats = placementStats;
        this.branchPerformance = branchPerformance;
        this.companyRecruitmentDetails = companyRecruitmentDetails;
        this.funnel = funnel;
        this.applicationDistribution = applicationDistribution;
    }

    public static class PlacementStats {
        private long totalRegisteredStudents;
        private long placedStudents;
        private long totalOffers;
        private double placementPercentage;
        private double highestPackageLpa;
        private double averagePackageLpa;
        private double medianPackageLpa;
        private long superDreamOffers; // >= 20 LPA
        private long dreamOffers;      // 10-20 LPA
        private long coreOffers;       // < 10 LPA
        private long multiOfferStudents;

        public PlacementStats() {}

        public PlacementStats(long totalRegisteredStudents, long placedStudents, long totalOffers,
                              double placementPercentage, double highestPackageLpa, double averagePackageLpa,
                              double medianPackageLpa, long superDreamOffers, long dreamOffers,
                              long coreOffers, long multiOfferStudents) {
            this.totalRegisteredStudents = totalRegisteredStudents;
            this.placedStudents = placedStudents;
            this.totalOffers = totalOffers;
            this.placementPercentage = placementPercentage;
            this.highestPackageLpa = highestPackageLpa;
            this.averagePackageLpa = averagePackageLpa;
            this.medianPackageLpa = medianPackageLpa;
            this.superDreamOffers = superDreamOffers;
            this.dreamOffers = dreamOffers;
            this.coreOffers = coreOffers;
            this.multiOfferStudents = multiOfferStudents;
        }

        public long getTotalRegisteredStudents() { return totalRegisteredStudents; }
        public void setTotalRegisteredStudents(long totalRegisteredStudents) { this.totalRegisteredStudents = totalRegisteredStudents; }
        public long getPlacedStudents() { return placedStudents; }
        public void setPlacedStudents(long placedStudents) { this.placedStudents = placedStudents; }
        public long getTotalOffers() { return totalOffers; }
        public void setTotalOffers(long totalOffers) { this.totalOffers = totalOffers; }
        public double getPlacementPercentage() { return placementPercentage; }
        public void setPlacementPercentage(double placementPercentage) { this.placementPercentage = placementPercentage; }
        public double getHighestPackageLpa() { return highestPackageLpa; }
        public void setHighestPackageLpa(double highestPackageLpa) { this.highestPackageLpa = highestPackageLpa; }
        public double getAveragePackageLpa() { return averagePackageLpa; }
        public void setAveragePackageLpa(double averagePackageLpa) { this.averagePackageLpa = averagePackageLpa; }
        public double getMedianPackageLpa() { return medianPackageLpa; }
        public void setMedianPackageLpa(double medianPackageLpa) { this.medianPackageLpa = medianPackageLpa; }
        public long getSuperDreamOffers() { return superDreamOffers; }
        public void setSuperDreamOffers(long superDreamOffers) { this.superDreamOffers = superDreamOffers; }
        public long getDreamOffers() { return dreamOffers; }
        public void setDreamOffers(long dreamOffers) { this.dreamOffers = dreamOffers; }
        public long getCoreOffers() { return coreOffers; }
        public void setCoreOffers(long coreOffers) { this.coreOffers = coreOffers; }
        public long getMultiOfferStudents() { return multiOfferStudents; }
        public void setMultiOfferStudents(long multiOfferStudents) { this.multiOfferStudents = multiOfferStudents; }
    }

    public static class BranchPerformanceItem {
        private String branch;
        private long totalStudents;
        private long placedStudents;
        private double placementRate;
        private double averagePackageLpa;
        private double highestPackageLpa;
        private String topRecruiter;

        public BranchPerformanceItem() {}

        public BranchPerformanceItem(String branch, long totalStudents, long placedStudents,
                                     double placementRate, double averagePackageLpa,
                                     double highestPackageLpa, String topRecruiter) {
            this.branch = branch;
            this.totalStudents = totalStudents;
            this.placedStudents = placedStudents;
            this.placementRate = placementRate;
            this.averagePackageLpa = averagePackageLpa;
            this.highestPackageLpa = highestPackageLpa;
            this.topRecruiter = topRecruiter;
        }

        public String getBranch() { return branch; }
        public void setBranch(String branch) { this.branch = branch; }
        public long getTotalStudents() { return totalStudents; }
        public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
        public long getPlacedStudents() { return placedStudents; }
        public void setPlacedStudents(long placedStudents) { this.placedStudents = placedStudents; }
        public double getPlacementRate() { return placementRate; }
        public void setPlacementRate(double placementRate) { this.placementRate = placementRate; }
        public double getAveragePackageLpa() { return averagePackageLpa; }
        public void setAveragePackageLpa(double averagePackageLpa) { this.averagePackageLpa = averagePackageLpa; }
        public double getHighestPackageLpa() { return highestPackageLpa; }
        public void setHighestPackageLpa(double highestPackageLpa) { this.highestPackageLpa = highestPackageLpa; }
        public String getTopRecruiter() { return topRecruiter; }
        public void setTopRecruiter(String topRecruiter) { this.topRecruiter = topRecruiter; }
    }

    public static class CompanyRecruitmentItem {
        private String companyName;
        private String tier;
        private long drivesConducted;
        private long totalOffers;
        private double highestPackageLpa;
        private double averagePackageLpa;
        private String topBranchRecruited;

        public CompanyRecruitmentItem() {}

        public CompanyRecruitmentItem(String companyName, String tier, long drivesConducted,
                                      long totalOffers, double highestPackageLpa,
                                      double averagePackageLpa, String topBranchRecruited) {
            this.companyName = companyName;
            this.tier = tier;
            this.drivesConducted = drivesConducted;
            this.totalOffers = totalOffers;
            this.highestPackageLpa = highestPackageLpa;
            this.averagePackageLpa = averagePackageLpa;
            this.topBranchRecruited = topBranchRecruited;
        }

        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getTier() { return tier; }
        public void setTier(String tier) { this.tier = tier; }
        public long getDrivesConducted() { return drivesConducted; }
        public void setDrivesConducted(long drivesConducted) { this.drivesConducted = drivesConducted; }
        public long getTotalOffers() { return totalOffers; }
        public void setTotalOffers(long totalOffers) { this.totalOffers = totalOffers; }
        public double getHighestPackageLpa() { return highestPackageLpa; }
        public void setHighestPackageLpa(double highestPackageLpa) { this.highestPackageLpa = highestPackageLpa; }
        public double getAveragePackageLpa() { return averagePackageLpa; }
        public void setAveragePackageLpa(double averagePackageLpa) { this.averagePackageLpa = averagePackageLpa; }
        public String getTopBranchRecruited() { return topBranchRecruited; }
        public void setTopBranchRecruited(String topBranchRecruited) { this.topBranchRecruited = topBranchRecruited; }
    }

    public static class ApplicationFunnel {
        private long appliedCount;
        private long shortlistedCount;
        private long interviewedCount;
        private long offeredCount;
        private long acceptedCount;

        private double shortlistConversion;
        private double interviewConversion;
        private double offerConversion;
        private double acceptanceConversion;

        public ApplicationFunnel() {}

        public ApplicationFunnel(long appliedCount, long shortlistedCount, long interviewedCount,
                                 long offeredCount, long acceptedCount, double shortlistConversion,
                                 double interviewConversion, double offerConversion, double acceptanceConversion) {
            this.appliedCount = appliedCount;
            this.shortlistedCount = shortlistedCount;
            this.interviewedCount = interviewedCount;
            this.offeredCount = offeredCount;
            this.acceptedCount = acceptedCount;
            this.shortlistConversion = shortlistConversion;
            this.interviewConversion = interviewConversion;
            this.offerConversion = offerConversion;
            this.acceptanceConversion = acceptanceConversion;
        }

        public long getAppliedCount() { return appliedCount; }
        public void setAppliedCount(long appliedCount) { this.appliedCount = appliedCount; }
        public long getShortlistedCount() { return shortlistedCount; }
        public void setShortlistedCount(long shortlistedCount) { this.shortlistedCount = shortlistedCount; }
        public long getInterviewedCount() { return interviewedCount; }
        public void setInterviewedCount(long interviewedCount) { this.interviewedCount = interviewedCount; }
        public long getOfferedCount() { return offeredCount; }
        public void setOfferedCount(long offeredCount) { this.offeredCount = offeredCount; }
        public long getAcceptedCount() { return acceptedCount; }
        public void setAcceptedCount(long acceptedCount) { this.acceptedCount = acceptedCount; }
        public double getShortlistConversion() { return shortlistConversion; }
        public void setShortlistConversion(double shortlistConversion) { this.shortlistConversion = shortlistConversion; }
        public double getInterviewConversion() { return interviewConversion; }
        public void setInterviewConversion(double interviewConversion) { this.interviewConversion = interviewConversion; }
        public double getOfferConversion() { return offerConversion; }
        public void setOfferConversion(double offerConversion) { this.offerConversion = offerConversion; }
        public double getAcceptanceConversion() { return acceptanceConversion; }
        public void setAcceptanceConversion(double acceptanceConversion) { this.acceptanceConversion = acceptanceConversion; }
    }

    public PlacementStats getPlacementStats() { return placementStats; }
    public void setPlacementStats(PlacementStats placementStats) { this.placementStats = placementStats; }
    public List<BranchPerformanceItem> getBranchPerformance() { return branchPerformance; }
    public void setBranchPerformance(List<BranchPerformanceItem> branchPerformance) { this.branchPerformance = branchPerformance; }
    public List<CompanyRecruitmentItem> getCompanyRecruitmentDetails() { return companyRecruitmentDetails; }
    public void setCompanyRecruitmentDetails(List<CompanyRecruitmentItem> companyRecruitmentDetails) { this.companyRecruitmentDetails = companyRecruitmentDetails; }
    public ApplicationFunnel getFunnel() { return funnel; }
    public void setFunnel(ApplicationFunnel funnel) { this.funnel = funnel; }
    public Map<String, Integer> getApplicationDistribution() { return applicationDistribution; }
    public void setApplicationDistribution(Map<String, Integer> applicationDistribution) { this.applicationDistribution = applicationDistribution; }
}
