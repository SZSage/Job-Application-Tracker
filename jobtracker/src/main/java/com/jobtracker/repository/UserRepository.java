package com.jobtracker.repository;

import java.util.List;

import com.jobtracker.model.User;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addUser(String email, String hashedPassword) {
        String role = "USER";
        String sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, email, hashedPassword, role);
    }

    public List<User> listAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (resultSet, rowNum) ->
            new User(
                resultSet.getObject("user_id", java.util.UUID.class),
                resultSet.getString("email"),
                resultSet.getTimestamp("created_at").toLocalDateTime(),
                resultSet.getString("role")
            )
        );
    }
}
