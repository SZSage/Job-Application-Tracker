package com.jobtracker.unittest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobtracker.controller.UserController;
import com.jobtracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private UserService userService;

  @Autowired private ObjectMapper objectMapper; // For JSON conversion

}
