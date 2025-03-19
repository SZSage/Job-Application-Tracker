package com.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;

public class UserLoginDTO {

  @NotBlank
  private String email;

  @NotBlank
  private String password;
}
