package com.jobtracker.dto.request;

public class LoginRequestDto {
  private String email;
  private String password;
  private boolean rememberMe;

  public LoginRequestDto() {}

  public LoginRequestDto(String email, String password, boolean rememberMe) {
    this.email = email;
    this.password = password;
    this.rememberMe = rememberMe;
  }

  // Getters
  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public boolean getRememberMe() {
    return rememberMe;
  }

  //Setters
  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setRememberMe(boolean rememberMe) {
    this.rememberMe = rememberMe;
  }
}
