package com.jobtracker.model;
import java.util.UUID;
import java.time.LocalDateTime;

public class User {
    // Id and GeneratedValue sets up the primary key
    private UUID userId;
    private String email;
    private String password;
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    // Constructor for inserting new user
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Constructor for fetching user info
    public User(UUID userId, String email, LocalDateTime createdAt) {
        this.userId = userId;
        this.email = email;
        this.createdAt = createdAt;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
