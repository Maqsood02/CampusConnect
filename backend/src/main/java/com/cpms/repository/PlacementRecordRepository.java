package com.cpms.repository;

import com.cpms.model.PlacementRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementRecordRepository extends MongoRepository<PlacementRecord, String> {
    List<PlacementRecord> findByStudentId(String studentId);
    List<PlacementRecord> findByCompanyId(String companyId);
    List<PlacementRecord> findByCompanyNameIgnoreCase(String companyName);
    List<PlacementRecord> findByBranch(String branch);
    List<PlacementRecord> findByStatus(String status);
    List<PlacementRecord> findByTier(String tier);
    List<PlacementRecord> findByDriveId(String driveId);
    boolean existsByStudentIdAndDriveId(String studentId, String driveId);
}
