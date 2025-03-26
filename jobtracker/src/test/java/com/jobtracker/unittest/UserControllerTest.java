package com.jobtracker.unittest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtracker.controller.UserController;
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

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private UserService userService;

  @Autowired private ObjectMapper objectMapper; // For JSON conversion

  @Test
  @DisplayName("Should register user successfully")
  void testAddUser() throws Exception {

    // Create registration DTO
    UserRegistrationDTO userRegistrationDto = new UserRegistrationDTO();
    userRegistrationDto.setEmail("testAddUser@email.com");
    userRegistrationDto.setPassword("password123");
    // Create expected return User
    User createdUser = new User("testAddUser@email.com", "password234", "USER");
    createdUser.setUserId(UUID.randomUUID());
    createdUser.setEmail("testAddUser@email.com");
    createdUser.setRole("USER");
    when(userService.addUser(any(UserRegistrationDTO.class))).thenReturn(createdUser);

    // HTTP request building
    mockMvc
        .perform(
            post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON) // Sets content type header
                .content(objectMapper.writeValueAsString(userRegistrationDto))) // Sets request body
        .andExpect(status().isCreated()).andDo(print())
        .andExpect(jsonPath("$.email").value("testAddUser@email.com"))
        .andExpect(jsonPath("$.userId").isNotEmpty());
  }

}
