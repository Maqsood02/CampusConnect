package com.cpms.repository;

import com.cpms.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByStudentId(String studentId);
    List<Application> findByDriveId(String driveId);
    List<Application> findByStatus(String status);
    Optional<Application> findByDriveIdAndStudentId(String driveId, String studentId);
    boolean existsByDriveIdAndStudentId(String driveId, String studentId);
}
