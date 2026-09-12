package com.cpms.service;

import com.cpms.dto.DriveRequest;
import com.cpms.model.Notification;
import com.cpms.model.RecruitmentDrive;
import com.cpms.repository.NotificationRepository;
import com.cpms.repository.RecruitmentDriveRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DriveServiceTest {

    @Mock
    private RecruitmentDriveRepository driveRepository;

    @Mock
    private NotificationRepository notificationRepository;

    private DriveService driveService;

    @BeforeEach
    void setUp() {
        driveService = new DriveService(driveRepository, notificationRepository);
    }

    @Test
    @DisplayName("Should successfully create a recruitment drive and send notification")
    void testCreateDriveSuccess() {
        DriveRequest req = DriveRequest.builder()
                .companyName("TechCorp Solutions")
                .jobTitle("AI Research Scientist")
                .packageLpa(22.5)
                .location("Bengaluru")
                .minCgpa(8.0)
                .allowedBranches(List.of("CSE", "ECE"))
                .maxBacklogs(0)
                .graduationYear(2026)
                .build();

        when(driveRepository.save(any(RecruitmentDrive.class))).thenAnswer(inv -> {
            RecruitmentDrive d = inv.getArgument(0);
            d.setId("drive-999");
            return d;
        });

        RecruitmentDrive created = driveService.createDrive(req);

        assertNotNull(created);
        assertEquals("drive-999", created.getId());
        assertEquals("TechCorp Solutions", created.getCompanyName());
        assertEquals("Super Dream", created.getTier()); // >= 20.0 LPA is Super Dream
        assertEquals(8.0, created.getCriteria().getMinCgpa());
        verify(driveRepository, times(1)).save(any(RecruitmentDrive.class));
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    @DisplayName("Should retrieve all drives from repository")
    void testGetAllDrives() {
        RecruitmentDrive d1 = RecruitmentDrive.builder().id("d1").companyName("Amazon").build();
        RecruitmentDrive d2 = RecruitmentDrive.builder().id("d2").companyName("Google").build();

        when(driveRepository.findAll()).thenReturn(List.of(d1, d2));

        List<RecruitmentDrive> list = driveService.getAllDrives();
        assertEquals(2, list.size());
        assertEquals("Amazon", list.get(0).getCompanyName());
    }

    @Test
    @DisplayName("Should fetch drive by ID or throw exception if not found")
    void testGetDriveById() {
        RecruitmentDrive d1 = RecruitmentDrive.builder().id("d1").companyName("Microsoft").build();
        when(driveRepository.findById("d1")).thenReturn(Optional.of(d1));
        when(driveRepository.findById("non-existent")).thenReturn(Optional.empty());

        RecruitmentDrive found = driveService.getDriveById("d1");
        assertNotNull(found);
        assertEquals("Microsoft", found.getCompanyName());

        assertThrows(RuntimeException.class, () -> driveService.getDriveById("non-existent"));
    }
}
