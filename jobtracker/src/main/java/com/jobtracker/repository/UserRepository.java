package com.jobtracker.repository;

import org.springframework.stereotype.Repository;
import com.jobtracker.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // #TODO: retrieve user by ID
    // #TODO: retrieve user by email

    public void addUser(String email, String hashedPassword) {
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        jdbcTemplate.update(sql, email, hashedPassword);
    }

    public List<User> listAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new User(
                rs.getObject("user_id", java.util.UUID.class),
                rs.getString("email"),
                rs.getString("password"),
                rs.getTimestamp("created_at").toLocalDateTime()
            )
        );
    }
}
