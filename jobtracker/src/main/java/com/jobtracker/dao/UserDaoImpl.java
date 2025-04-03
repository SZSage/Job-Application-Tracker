package com.jobtracker.dao;

import java.util.List;
import java.util.UUID;

import javax.sql.DataSource;

import com.jobtracker.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class UserDaoImpl implements UserDao {

  private static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);
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

  public User createUser(String email, String hashedPassword, UUID userId) {
    String role = "USER";
    String sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?) RETURNING user_id, email, created_at, role";

    User result = jdbcTemplate.queryForObject(sql,
      (resultSet, rowNum) -> new User(
        resultSet.getObject("user_id", java.util.UUID.class),
        resultSet.getString("email"),
        resultSet.getString("password"),
        resultSet.getTimestamp("created_at").toLocalDateTime(),
        resultSet.getString("role")),
      email, hashedPassword, role);

    return result;
  }

  public User userLoginCheck(String email) {
    String sql = "SELECT * FROM users WHERE email = ?";
    try {
      return jdbcTemplate.queryForObject(sql,
        (resultSet, rowNum) -> new User(
          resultSet.getObject("user_id", java.util.UUID.class),
          resultSet.getString("email"),
          resultSet.getString("password"),
          resultSet.getTimestamp("created_at").toLocalDateTime(),
          resultSet.getString("role")
        ), email);
    } catch (EmptyResultDataAccessException e) {
      return null;
    }
  }

  public List<User> getAllUsers() {
    String sql = "SELECT * FROM users";
    return jdbcTemplate.query(sql,
    (resultSet, rowMapper) -> new User(
      resultSet.getObject("user_id", java.util.UUID.class),
      resultSet.getString("email"),
      resultSet.getString("password"),
      resultSet.getTimestamp("created_at").toLocalDateTime(),
      resultSet.getString("role")
    ));
  }

  public int deleteUserById(UUID userId) {
    String sql = "DELETE FROM users WHERE user_id = ?";
    return jdbcTemplate.update(sql, userId);
  }
}
