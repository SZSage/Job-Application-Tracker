package com.jobtracker.controller;

import com.jobtracker.dto.UserLoginDTO;
import com.jobtracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/auths")
public class AuthController {
  private final UserService userService;

  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
  }

  /*
  @PostMapping("/registers")
  public ResponseEntity<?> postUserRegister(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO, Model model) {
    try {
      String result = userService.addUser(
                        userRegistrationDTO.getEmail(),
                        userRegistrationDTO.getPassword());
      return ResponseEntity.ok(result);
    } catch (Exception e) {
      model.addAttribute("Error", e.getMessage());
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  */
  @PostMapping("/login")
  public String showLoginPage(Model model) {
    model.addAttribute("userLogin", new UserLoginDTO());
    return "login";
  }
}
