package com.jobtracker.repository;

import com.jobtracker.model.User;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
  // addUser
  User addUser(User user) ;
  // getUser
  // updateUser
  // removeUser
}
