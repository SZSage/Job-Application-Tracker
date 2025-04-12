package com.jobtracker.dto.response;

import com.jobtracker.model.User;

public class AuthenticationResponse {
    private User user;
    private String token;


    public AuthenticationResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
