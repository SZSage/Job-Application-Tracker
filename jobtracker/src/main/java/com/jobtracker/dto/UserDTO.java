package com.jobtracker.dto;
import java.util.UUID;
import java.time.LocalDateTime;

public class UserDTO {
    private UUID userId;
    private String email;
    private LocalDateTime createdAt = LocalDateTime.now();

    public UserDTO() {}

    // constructor
    public UserDTO(UUID userId, String email, LocalDateTime createdAt) {
        this.userId = userId;
        this.email = email;
        this.createdAt = createdAt;
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

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setUserEmail(String email) {
        this.email = email;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
