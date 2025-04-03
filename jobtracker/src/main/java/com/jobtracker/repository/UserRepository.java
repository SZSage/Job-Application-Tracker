package com.jobtracker.repository;

import java.util.List;
import java.util.UUID;

import com.jobtracker.model.User;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
  User addUser(User user);
  List<User> fetchAllUsers();
  int removeUser(UUID userId);
  User checkLogin(String email);
  // getUser
  // updateUser
}
