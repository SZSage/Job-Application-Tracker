package com.jobtracker.repository;

import java.util.List;

import com.jobtracker.model.User;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
  // addUser
  User addUser(User user);
  List<User> fetchAllUsers();
  // getUser
  // updateUser
  // removeUser
}
