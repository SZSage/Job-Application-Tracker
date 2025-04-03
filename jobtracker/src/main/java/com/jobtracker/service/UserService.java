package com.jobtracker.service;

import java.util.List;
import java.util.UUID;

import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private static final Logger logger = LogManager.getLogger(UserService.class);

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  // Inject UserRepository
  @Autowired
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User addUser(UserRegistrationDTO userRegistrationDto) {
    // Create new domain object for DTO
    User newUser = new User();
    newUser.setEmail(userRegistrationDto.getEmail());

    // Hash password then save
    String hashedPassword = passwordEncoder.encode(userRegistrationDto.getPassword());
    newUser.setPassword(hashedPassword);
    return userRepository.addUser(newUser);
  }

  public List<User> getAllUsers() {
    return userRepository.fetchAllUsers();
  }

  public int deleteUser(UUID userId) {
    return userRepository.removeUser(userId);
  }

  public User userLogin(String email, String rawPassword) {
    if (email == null || rawPassword == null) {
      return null;
    }

    User user = userRepository.checkLogin(email);
    if (user == null) {
      return null;
    }

    if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
      return null;
    }
    return user;
  }
}

