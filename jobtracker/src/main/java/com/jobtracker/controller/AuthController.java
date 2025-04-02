package com.jobtracker.controller;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.model.User;
import com.jobtracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
  private final UserService userService;

  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> addNewUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
    User createdUser = userService.addUser(userRegistrationDTO);

    AuthResponse authResponse = new AuthResponse(
      createdUser.getUserId(),
      createdUser.getEmail(),
      "USER",
      createdUser.getCreatedAt()
    );

    return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
  }

  @PostMapping("/login")
  public void userLogin(@RequestBody LoginRequest loginRequest) {
    // should return JWT token
    // user Info
    // success/failure
  }

  public record LoginRequest(String email, String password) {}

  public record AuthResponse(UUID userId, String email, String role, LocalDateTime createdAt) {}

}
