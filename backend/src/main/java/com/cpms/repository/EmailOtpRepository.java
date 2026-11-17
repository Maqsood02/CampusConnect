package com.cpms.repository;

import com.cpms.model.EmailOtp;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmailOtpRepository extends MongoRepository<EmailOtp, String> {
    Optional<EmailOtp> findTopByEmailAndPurposeOrderByCreatedAtDesc(String email, String purpose);
    Optional<EmailOtp> findTopByEmailOrderByCreatedAtDesc(String email);
    List<EmailOtp> findByEmail(String email);
    void deleteByEmail(String email);
}
