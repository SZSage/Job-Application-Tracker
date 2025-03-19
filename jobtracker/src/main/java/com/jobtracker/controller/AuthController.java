package com.jobtracker.controller;

import jakarta.validation.Valid;

import com.jobtracker.dto.UserLoginDTO;
import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/api/auth")
public class AuthController {
  private final UserService userService;

  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
  }

  // #NOTE: This implementation will be used for connecting to frontend
  @PostMapping("/registers")
  public ResponseEntity<?> userRegister(@Valid @ModelAttribute("userRegistration") UserRegistrationDTO userRegisterDTO) {
    try {
      String result = userService.addUser(
        userRegisterDTO.getEmail(),
        userRegisterDTO.getPassword());
      return ResponseEntity.ok(result);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  // #TODO: Login

  // #NOTE: This current implementation returns the register.html page for testing
  @GetMapping("/register")
  public String showRegisterPage(Model model) {
    model.addAttribute("userRegistration", new UserRegistrationDTO());
    return "register";
  }

  @PostMapping("/register")
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

  @GetMapping("/login")
  public String showLoginPage(Model model) {
    model.addAttribute("userLogin", new UserLoginDTO());
    return "login";
  }
}
