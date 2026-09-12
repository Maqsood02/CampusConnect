package com.cpms.service;

import com.cpms.model.RecruitmentDrive;
import com.cpms.model.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class EligibilityEngineTest {

    private DriveService driveService;

    @BeforeEach
    void setUp() {
        driveService = new DriveService(null, null);
    }

    @Test
    @DisplayName("Should evaluate student as eligible when all criteria match")
    void testEligibleCandidate() {
        Student student = Student.builder()
                .cgpa(8.5)
                .branch("CSE")
                .activeBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive.EligibilityCriteria criteria = RecruitmentDrive.EligibilityCriteria.builder()
                .minCgpa(7.5)
                .allowedBranches(List.of("CSE", "ECE"))
                .maxBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive drive = RecruitmentDrive.builder().criteria(criteria).build();

        Map<String, Object> result = driveService.evaluateEligibility(student, drive);

        assertTrue((Boolean) result.get("eligible"));
        List<?> reasons = (List<?>) result.get("reasons");
        assertTrue(reasons.isEmpty());
    }

    @Test
    @DisplayName("Should mark student as ineligible when CGPA is below requirement")
    void testIneligibleLowCgpa() {
        Student student = Student.builder()
                .cgpa(6.8)
                .branch("CSE")
                .activeBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive.EligibilityCriteria criteria = RecruitmentDrive.EligibilityCriteria.builder()
                .minCgpa(7.5)
                .allowedBranches(List.of("CSE", "ECE"))
                .maxBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive drive = RecruitmentDrive.builder().criteria(criteria).build();

        Map<String, Object> result = driveService.evaluateEligibility(student, drive);

        assertFalse((Boolean) result.get("eligible"));
        @SuppressWarnings("unchecked")
        List<String> reasons = (List<String>) result.get("reasons");
        assertTrue(reasons.stream().anyMatch(r -> r.contains("CGPA")));
    }

    @Test
    @DisplayName("Should mark student as ineligible when branch is not in allowed list")
    void testIneligibleDisallowedBranch() {
        Student student = Student.builder()
                .cgpa(8.0)
                .branch("ME")
                .activeBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive.EligibilityCriteria criteria = RecruitmentDrive.EligibilityCriteria.builder()
                .minCgpa(7.0)
                .allowedBranches(List.of("CSE", "ECE"))
                .maxBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive drive = RecruitmentDrive.builder().criteria(criteria).build();

        Map<String, Object> result = driveService.evaluateEligibility(student, drive);

        assertFalse((Boolean) result.get("eligible"));
        @SuppressWarnings("unchecked")
        List<String> reasons = (List<String>) result.get("reasons");
        assertTrue(reasons.stream().anyMatch(r -> r.contains("branch") || r.contains("Branch")));
    }

    @Test
    @DisplayName("Should mark student as ineligible when active backlogs exceed maximum allowed")
    void testIneligibleBacklogs() {
        Student student = Student.builder()
                .cgpa(8.5)
                .branch("CSE")
                .activeBacklogs(2)
                .graduationYear(2026)
                .build();

        RecruitmentDrive.EligibilityCriteria criteria = RecruitmentDrive.EligibilityCriteria.builder()
                .minCgpa(7.0)
                .allowedBranches(List.of("CSE"))
                .maxBacklogs(0)
                .graduationYear(2026)
                .build();

        RecruitmentDrive drive = RecruitmentDrive.builder().criteria(criteria).build();

        Map<String, Object> result = driveService.evaluateEligibility(student, drive);

        assertFalse((Boolean) result.get("eligible"));
        @SuppressWarnings("unchecked")
        List<String> reasons = (List<String>) result.get("reasons");
        assertTrue(reasons.stream().anyMatch(r -> r.contains("backlogs")));
    }
}
