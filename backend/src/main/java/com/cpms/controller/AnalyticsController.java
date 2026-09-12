package com.cpms.controller;

import com.cpms.dto.AnalyticsDTO;
import com.cpms.dto.ComprehensiveAnalyticsDTO;
import com.cpms.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public ResponseEntity<AnalyticsDTO> getSummary() {
        return ResponseEntity.ok(analyticsService.getSummary());
    }

    @GetMapping("/comprehensive")
    public ResponseEntity<ComprehensiveAnalyticsDTO> getComprehensive() {
        return ResponseEntity.ok(analyticsService.getComprehensiveAnalytics());
    }
}
