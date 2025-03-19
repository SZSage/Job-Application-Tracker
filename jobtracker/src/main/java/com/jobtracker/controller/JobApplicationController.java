package com.jobtracker.controller;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.model.JobApplications;
import com.jobtracker.service.JobApplicationService;

@RestController
@RequestMapping("/jobApplications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping("/api/addApplication")
    public String addApplications(@RequestBody JobApplications jobApplications) {
        return jobApplicationService.addJobApplication(jobApplications);
    }

    @GetMapping("/api/getApplications")
    public Iterable<JobApplications> listApplications() {
        return jobApplicationService.getJobApplications();
    }

    @PatchMapping("/api/modifyApplication/{jobId}")
    public ResponseEntity<?> modifyApplication(@PathVariable UUID jobId ,@RequestBody JobApplications jobApplications) {
        JobApplications updated = jobApplicationService.updateJobApplications(jobId, jobApplications);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/deleteApplication/{jobId}/{userId}")
    public int deleteAppication(@PathVariable UUID jobId, @PathVariable UUID userId) {
        return jobApplicationService.deleteApplication(jobId, userId);
    }

}
