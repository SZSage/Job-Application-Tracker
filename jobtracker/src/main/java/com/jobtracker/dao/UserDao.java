package com.jobtracker.dao;

import java.util.List;
import java.util.UUID;

import com.jobtracker.model.User;

public interface UserDao {
  void saveUser(UUID userId, String email, String hashedPassword, String role);
  List<User> findAllUsers();
  User findByEmail(String email);
  
}
