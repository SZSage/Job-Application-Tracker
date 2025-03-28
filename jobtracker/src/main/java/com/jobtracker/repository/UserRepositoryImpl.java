package com.jobtracker.repository;

import java.util.List;

import com.jobtracker.dao.UserDao;
import com.jobtracker.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {
  private UserDao userDao;

  @Autowired
  public UserRepositoryImpl(UserDao userDao) {
    this.userDao = userDao;
  }

  public User addUser(User user) {
    User userInfo = userDao.createUser(user.getEmail(), user.getPassword(), user.getUserId());
    return userInfo;
  }

  public List<User> fetchAllUsers() {
    List<User> userInfo = userDao.getAllUsers();
    return userInfo;
  }

  // TODO: updateUser
}
