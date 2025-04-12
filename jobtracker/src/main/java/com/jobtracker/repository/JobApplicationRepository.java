package com.jobtracker.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.jobtracker.model.JobApplications;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JobApplicationRepository {
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
 
    public JobApplicationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
    }

    public void addApplications(String jobTitle, String companyName, Integer salary, String location, Integer statusId, UUID userId) {
        String sql = "INSERT INTO job_applications (job_title, company_name, salary, location, status_id, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, jobTitle, companyName, salary, location, statusId, userId);
    }

    public List<JobApplications> getApplications(UUID userId) {
        String sql = "SELECT * FROM job_applications WHERE user_id = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new JobApplications(
                rs.getObject("job_id", java.util.UUID.class),
                rs.getString("job_title"),
                rs.getString("company_name"),
                rs.getInt("salary"),
                rs.getString("location"),
                rs.getInt("status_id"),
                rs.getObject("user_id", java.util.UUID.class)
            ), userId
        );
    }

    public int updateApplications(String jobTitle, String companyName, Integer salary, String location, Integer statusId, UUID jobId) {
        StringBuilder sql = new StringBuilder("UPDATE job_applications SET ");
        List<Object> params = new ArrayList<>();
        boolean hasUpdated = false;


        if (jobTitle != null) {
            sql.append("job_title = ?, ");
            params.add(jobTitle);
            hasUpdated = true;
        }
        if (companyName != null) {
            sql.append("company_name = ?, ");
            params.add(companyName);
            hasUpdated = true;
        }

        if (salary != null) {
            sql.append("salary = ?, ");
            params.add(salary);
            hasUpdated = true;
        }
        if (location != null) {
            sql.append("location = ?, ");
            params.add(location);
            hasUpdated = true;
        }
        if (statusId != null) {
            sql.append("status_id = ?, ");
            params.add(statusId);
            hasUpdated = true;
        }

        if (!hasUpdated) {
            return 0;
        }
        // Remove trailing comma and space
        sql.setLength(sql.length() - 2);
        
        sql.append(" WHERE job_id = ?");
        params.add(jobId);

        return jdbcTemplate.update(sql.toString(), params.toArray());
    }

    public int removeApplication(UUID jobId, UUID userId) {
        String sql = "DELETE FROM job_applications WHERE job_id = ? AND user_id = ?";
        return jdbcTemplate.update(sql, jobId, userId);
    }

}
