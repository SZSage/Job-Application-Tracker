package com.jobtracker.jobtracker;

import com.jobtracker.controller.UserController;
import com.jobtracker.service.UserService;
import com.jobtracker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.Test;
import java.util.*;
import static org.mockito.Mockito.when;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void addUser() throws Exception {
        User user = new User();
        System.out.println("addUser(): " + user);
        when(userService.addUser("testAddUser@email.com", "password234")).thenReturn("User saved");
    }

    // create mock data object
    @Test
    void shouldGetAllUsers() throws Exception {
        Iterable<User> users = Arrays.asList(new User("test@email.com", "password123"));
        System.out.println("Users:" + users);
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/users/all")).andDo(result -> System.out.println("Actual response: " + result.getResponse().getContentAsString()));
    }
}
