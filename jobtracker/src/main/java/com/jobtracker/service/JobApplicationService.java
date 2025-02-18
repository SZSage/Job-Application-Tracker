package com.jobtracker.service;

import com.jobtracker.model.JobApplications;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public String addJobApplication(JobApplications jobApplications) {
        jobApplicationRepository.addApplications(
            jobApplications.getJobTitle(),
            jobApplications.getCompanyName(),
            jobApplications.getSalary(),
            jobApplications.getLocation(),
            jobApplications.getStatusId(),
            jobApplications.getUserId()
        );
        return "Job application added!";
    }

    public Iterable<JobApplications> getJobApplications() {
        return jobApplicationRepository.getApplications();
    }
}
