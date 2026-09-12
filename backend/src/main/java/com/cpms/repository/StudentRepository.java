package com.cpms.repository;

import com.cpms.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByUserId(String userId);
    Optional<Student> findByRollNumber(String rollNumber);
    Optional<Student> findByEmail(String email);
    List<Student> findByVerificationStatus(String verificationStatus);
    List<Student> findByBranch(String branch);
}
