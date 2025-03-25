package com.jobtracker.dao;

import java.util.UUID;

import javax.sql.DataSource;

import com.jobtracker.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserDaoImpl implements UserDao {

  public JdbcTemplate jdbcTemplate;

  @Autowired
  public UserDaoImpl(DataSource datasource) {
    this.jdbcTemplate = new JdbcTemplate(datasource);
  }

  /* CRUD operations
   *
   * Create: return User
   * Read: return User
   * Update: return bool or User
   * Delete: boolean
   * */

  public User createUser(String email, String hashedPassword) {
    UUID userId = null;
    String role = "USER";
    String sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
    jdbcTemplate.update(sql, email, hashedPassword, role);
    return getUserById(userId);
  }

  public User getUserById(UUID userId) {
    String sql = "SELECT * FROM users WHERE user_id = ?";
    // Returns a new User object with the fetched data
    return jdbcTemplate.queryForObject(sql, (resultSet, rowNum) ->
      new User(
        resultSet.getObject("user_id", java.util.UUID.class),
        resultSet.getString("email"),
        resultSet.getTimestamp("created_at").toLocalDateTime(),
        resultSet.getString("role")
      )
    );
  }

  // #TOOD: getUserByIdWithPassword
  // #TODO: selectAllUsers
  // #TODO: deleteUserById
}
