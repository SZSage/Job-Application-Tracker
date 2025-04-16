package com.jobtracker.unittest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtracker.controller.AuthController;
import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.model.User;
import com.jobtracker.service.UserService;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;
    @Autowired private ObjectMapper objectMapper; // For JSON conversion

    @Test
    @DisplayName("Should register user successfully")
    void testUserRegister() throws Exception {
    UUID userId = UUID.randomUUID();
    LocalDateTime localDateTime = LocalDateTime.now();
    UserRegistrationDTO userRegistrationDTO = new UserRegistrationDTO();
    userRegistrationDTO.setEmail("test@email.com");
    userRegistrationDTO.setPassword("password123");

    User createdUser = new User();
    createdUser.setUserId(userId);
    createdUser.setEmail("test@email.com");
    createdUser.setPassword("password123");
    createdUser.setCreatedAt(localDateTime);
    when(userService.addUser(any(UserRegistrationDTO.class))).thenReturn(createdUser);

    // Mock HTTP request
    mockMvc.perform(
        post("/api/auth/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(userRegistrationDTO)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.userId").value(userId.toString()))
        .andExpect(jsonPath("$.email").exists())
        .andExpect(jsonPath("$.role").value("USER"))
        .andExpect(jsonPath("$.createdAt").value(localDateTime.toString()));
    }

    // TODO: Test User Login
}
