package com.jobtracker.controller;

import java.util.HashMap;
import java.util.Map;

import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.model.User;
import com.jobtracker.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

  private static final Logger logger = LogManager.getLogger(UserController.class);
  private final UserService userService;

  // Inject UserService layer
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> addNewUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
    User createdUser = userService.addUser(userRegistrationDTO);
    // convert domain object for DTO
    Map<String, Object> response = new HashMap<>();
    response.put("userId", createdUser.getUserId());
    response.put("email", createdUser.getEmail());
    response.put("role", "USER");
    response.put("created_at", createdUser.getCreatedAt());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

}
