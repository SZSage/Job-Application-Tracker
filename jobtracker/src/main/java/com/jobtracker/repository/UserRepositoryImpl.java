package com.jobtracker.repository;

import com.jobtracker.dao.UserDaoImpl;
import com.jobtracker.model.User;

public class UserRepositoryImpl implements UserRepository {
  private UserDaoImpl userDaoImpl;

  public User addUser(User user) {
    User userInfo = userDaoImpl.createUser(user.getEmail(), user.getPassword());
    return userInfo;
  }

  // TODO: getUser
  // TODO: updateUser
  // TODO: removeUser
}
