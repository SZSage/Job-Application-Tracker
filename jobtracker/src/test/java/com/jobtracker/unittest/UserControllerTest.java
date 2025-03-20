package com.jobtracker.jobtracker;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtracker.controller.UserController;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @Autowired
  private ObjectMapper objectMapper; // For JSON conversion

  @Test
  @DisplayName("Should register user successfully")
  void testAddUser() throws Exception {
    User testUser = new User("testAddUser@email.com", "password234", "USER");
    when(userService.addUser("testAddUser@email.com", "password234")).thenReturn("User saved");

    // HTTP request building
    mockMvc.perform(post("/api/auth/register")
      .contentType(MediaType.APPLICATION_JSON) // Sets content type header
      .content(objectMapper.writeValueAsString(testUser))) // Sets request body
      .andExpect(status().isOk());
  }

  @Test
  void shouldGetAllUsers() throws Exception {
    Iterable<User> users = Arrays.asList(new User("test@email.com", "password123", "USER"));
    System.out.println("Users:" + users);
    when(userService.getAllUsers()).thenReturn(users);

    mockMvc.perform(get("/api/auth/all")).andDo(MockMvcResultHandlers.print())
           .andExpect(status().isOk());
  }
}
