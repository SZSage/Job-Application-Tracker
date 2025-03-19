package com.jobtracker.dto;
import java.time.LocalDateTime;
import java.util.UUID;

public class UserDTO {
    private UUID userId;
    private String email;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String role;

    public UserDTO() {}

    // constructor
    public UserDTO(UUID userId, String email, LocalDateTime createdAt, String role) {
        this.userId = userId;
        this.email = email;
        this.createdAt = createdAt;
        this.role = role;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getUserEmail() {
        return email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getRole() {
        return role;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setUserEmail(String email) {
        this.email = email;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
