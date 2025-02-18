package com.jobtracker.controller;
import com.jobtracker.service.JobApplicationService;
import com.jobtracker.model.JobApplications;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/jobApplications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping("/api/addApplications")
    public String addApplications(@RequestBody JobApplications jobApplications) {
        return jobApplicationService.addJobApplication(jobApplications);
    }

    @GetMapping("/api/getApplications")
    public Iterable<JobApplications> listApplications() {
        return jobApplicationService.getJobApplications();
    }
}
