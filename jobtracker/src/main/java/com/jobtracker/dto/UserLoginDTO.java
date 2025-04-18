package com.jobtracker.dto;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserLoginDTO {

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, max = 20, message = "Password must be between 6 to 20 characters")
  private String password;

  private UUID userId;

  public UUID getUserId() {
    return userId;
  }

  public String getEmail() {
      return email;
  }

  public String getPassword() {
      return password;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public void setPassword(String password) {
      this.password = password;
  }

  public void setEmail(String email) {
      this.email = email;
  }
}
