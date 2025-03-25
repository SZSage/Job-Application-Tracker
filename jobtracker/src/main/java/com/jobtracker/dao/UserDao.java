package com.jobtracker.dao;

import java.util.UUID;

import com.jobtracker.model.User;

// Contains database operations
public interface UserDao {
  User getUserById(UUID userId);
  User createUser(String email, String hashedPassword);
}
