package com.cpms.repository;

import com.cpms.model.PlacementOfficer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlacementOfficerRepository extends MongoRepository<PlacementOfficer, String> {
    Optional<PlacementOfficer> findByUserId(String userId);
    Optional<PlacementOfficer> findByEmail(String email);
}
