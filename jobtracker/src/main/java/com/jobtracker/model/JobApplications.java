package com.jobtracker.model;
import java.util.UUID;

public class JobApplications {
    
    private UUID jobId;
    private String jobTitle;
    private String companyName;
    private Integer salary;
    private String location;
    private Integer statusId;
    private UUID userId;

    // Constructors
    public JobApplications() {}

    public JobApplications(String jobTitle, String companyName, Integer salary, String location, Integer statusId) {
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.salary = salary;
        this.location = location;
        this.statusId = statusId;
    }

    public JobApplications(UUID jobId, String jobTitle, String companyName, Integer salary, String location, Integer statusId, UUID userId) {
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.salary = salary;
        this.location = location;
        this.statusId = statusId;
        this.userId = userId;
    }

    // setters
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    // getters
    public UUID getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public Integer getSalary() {
        return salary;
    }

    public String getLocation() {
        return location;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public UUID getUserId() {
        return userId;
    }

}

