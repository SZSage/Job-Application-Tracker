package com.jobtracker.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import com.jobtracker.dto.UserDTO;
import com.jobtracker.model.User;
import com.jobtracker.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

  private static final Logger logger = LogManager.getLogger(UserController.class);
  private final UserService userService;

  // Inject UserService layer
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/getUsers")
  public ResponseEntity<?> listAllUsers() {
    // Get Domain object from serivce that will be converted to a list of UserDTOs
    Stream<User> userStream = userService.getAllUsers().stream();
    List<UserDTO> userDtoList = userStream.map(user -> UserDTO.fromUser(user)).toList();
    return ResponseEntity.ok(userDtoList);

  }

  @DeleteMapping("/removeUser/{userId}")
  public ResponseEntity<?> removeUser(@PathVariable UUID userId) {
    int result = userService.deleteUser(userId);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

  // TODO: Update User


}
