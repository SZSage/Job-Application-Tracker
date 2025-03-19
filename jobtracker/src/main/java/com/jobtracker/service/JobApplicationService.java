package com.jobtracker.service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.jobtracker.model.JobApplications;
import com.jobtracker.repository.JobApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

    public Map<String, String> convertToJson(JobApplications updatedFields) {
        Gson gson = new Gson();
        Map<String, String> response = new HashMap<>();
        String json = gson.toJson(updatedFields);
        response = gson.fromJson(json, new TypeToken<HashMap<String, String>>(){}.getType());
        return response;
    }

    public Map<String, String> filterNullValues(Map<String, String> response) {
        Map<String, String> result = new HashMap<>();
        response.forEach((key, value) -> {
            if (value != null) {
                result.put(key, value);
            }
        });
        return result;
    }

    public void extractAndSaveUpdates(Map<String, String> result) {
        String jobTitle = null;
        String companyName = null;
        String location = null;
        Integer salary = null;
        Integer statusId = null;
        UUID jobId = null;
        if (result.containsKey("jobTitle")) {
            jobTitle = result.get("jobTitle");
            System.out.println("jobTitle: " + jobTitle);
        }
        if (result.containsKey("companyName")) {
            companyName = result.get("companyName");
            System.out.println("companyName: " + companyName);
        }
        if (result.containsKey("location")) {
            location = result.get("location");
            System.out.println("locaction: " + location);
        }
        if (result.containsKey("salary")) {
            salary = Integer.parseInt(result.get("salary"));
            System.out.println("salary: " + salary);
        }
        if (result.containsKey("statusId")) {
            statusId = Integer.parseInt(result.get("statusId"));
            System.out.println("statusId: " + statusId);
        }
        if (result.containsKey("jobId")) {
            jobId = UUID.fromString(result.get("jobId"));
            System.out.println("jobId: " + jobId);
        }

        jobApplicationRepository.updateApplications(jobTitle, companyName, salary, location, statusId, jobId);
    }

    public JobApplications updateJobApplications(UUID jobId, JobApplications updatedFields) {
        Map<String, String> json = convertToJson(updatedFields);
        Map<String, String> result = filterNullValues(json);
        extractAndSaveUpdates(result);
        return null;
    }

    public int deleteApplication(UUID jobId, UUID userId) {
        int result = jobApplicationRepository.removeApplication(jobId, userId);
        return result;
    }

}
