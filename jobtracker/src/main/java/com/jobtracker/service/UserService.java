package com.jobtracker.service;

import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    this.passwordEncoder = new BCryptPasswordEncoder(16);
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


  // validate DTO
  // convert DTO to user entity
  // save entity via repository
  // Generate JWT
}
