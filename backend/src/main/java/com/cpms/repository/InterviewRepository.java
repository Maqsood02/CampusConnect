package com.cpms.repository;

import com.cpms.model.Interview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends MongoRepository<Interview, String> {
    List<Interview> findByStudentId(String studentId);
    List<Interview> findByDriveId(String driveId);
    List<Interview> findByStatus(String status);
}
