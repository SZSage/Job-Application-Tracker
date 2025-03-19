package com.jobtracker.controller;
import com.jobtracker.model.User;
import com.jobtracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/users")
public class UserController {

    private final UserService userService;

    // Inject UserService layer using @Autowired
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUsers")
    public String addNewUser(@RequestBody User user) {
        return userService.addUser(user.getEmail(), user.getPassword());
    }

    /*
    @PostMapping("api/{userId}")
    public <UserDTO> addNewUsers(@RequestBody UUID userId) {
        UserDTO userDTO = ;
    }
    */

    @GetMapping("/all")
    public Iterable<User> showAllUsers() {
        return userService.getAllUsers();
    }
}
