package com.jobtracker.repository;

import com.jobtracker.model.JobApplications;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.UUID;
import java.util.List;

@Repository
public class JobApplicationRepository {
    private final JdbcTemplate jdbcTemplate;
 
    public JobApplicationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addApplications(String jobTitle, String companyName, Integer salary, String location, Integer statusId, UUID userId) {
        String sql = "INSERT INTO job_applications (job_title, company_name, salary, location, status_id, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, jobTitle, companyName, salary, location, statusId, userId);
    }

    public List<JobApplications> getApplications() {
        String sql = "SELECT * FROM job_applications";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new JobApplications(
                rs.getObject("job_id", java.util.UUID.class),
                rs.getString("job_title"),
                rs.getString("company_name"),
                rs.getInt("salary"),
                rs.getString("location"),
                rs.getInt("status_id"),
                rs.getObject("user_id", java.util.UUID.class)
            )
        );
    }

    // TODO: Edit job application fields

    // TODO: Delete job application


}
