package com.cpms.controller;

import com.cpms.dto.DriveRequest;
import com.cpms.model.RecruitmentDrive;
import com.cpms.service.DriveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
@CrossOrigin(origins = "*")
public class DriveController {

    private final DriveService driveService;

    public DriveController(DriveService driveService) {
        this.driveService = driveService;
    }

    @GetMapping
    public ResponseEntity<List<RecruitmentDrive>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecruitmentDrive> getDriveById(@PathVariable String id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @PostMapping
    public ResponseEntity<RecruitmentDrive> createDrive(@RequestBody DriveRequest request) {
        RecruitmentDrive drive = driveService.createDrive(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(drive);
    }
}
