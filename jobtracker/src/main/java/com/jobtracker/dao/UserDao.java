package com.jobtracker.dao;

import java.util.List;
import java.util.UUID;

import com.jobtracker.model.User;

// Contains database operations
public interface UserDao {
  User createUser(String email, String hashedPassword, UUID userId);
  List<User> getAllUsers();
}
