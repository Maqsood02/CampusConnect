package com.cpms.repository;

import com.cpms.model.RecruitmentDrive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentDriveRepository extends MongoRepository<RecruitmentDrive, String> {
    List<RecruitmentDrive> findByStatus(String status);
    List<RecruitmentDrive> findByCompanyName(String companyName);
}
