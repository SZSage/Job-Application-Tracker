package com.jobtracker.dto.request;
import java.util.List;
import java.util.UUID;

public class DeleteJobRequest {
    private List<UUID> jobIds;
    private UUID userId;

    public DeleteJobRequest() {}

    public DeleteJobRequest(UUID userId, List<UUID> jobIds) {
        this.userId = userId;
        this.jobIds = jobIds;
    }

    public UUID getUserId() {
        return userId;
    }

    public List<UUID> getJobsIds() {
        return jobIds;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setJobIds(List<UUID> jobIds) {
        this.jobIds = jobIds;
    }

}

