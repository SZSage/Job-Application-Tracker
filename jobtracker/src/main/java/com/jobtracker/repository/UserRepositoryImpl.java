package com.jobtracker.repository;

import java.util.List;

import com.jobtracker.dao.UserDaoImpl;
import com.jobtracker.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {
  private UserDaoImpl userDaoImpl;

  @Autowired
  public UserRepositoryImpl(UserDaoImpl userDaoImpl) {
    this.userDaoImpl = userDaoImpl;
  }

  public User addUser(User user) {
    User userInfo = userDaoImpl.createUser(user.getEmail(), user.getPassword(), user.getUserId());
    return userInfo;
  }

  public List<User> fetchAllUsers() {
    List<User> userInfo = userDaoImpl.getAllUsers();
    return userInfo;
  }
  // TODO: updateUser
  // TODO: removeUser
}
