package com.jobtracker.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class User {
  // Id and GeneratedValue sets up the primary key
  private UUID userId;
  private String email;
  private String password;
  private LocalDateTime createdAt = LocalDateTime.now();
  private String role;

  public User() {}

  public User(String email) {
    this.email = email;
  }

  // Constructor for inserting new user
  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public User(String email, String password, String role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Constructor for fetching user info
  public User(UUID userId, String email, String password, LocalDateTime createdAt, String role) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.role = "USER";
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
