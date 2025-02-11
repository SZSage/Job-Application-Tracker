package com.jobtracker.service;

import com.jobtracker.repository.UserRepository;
import com.jobtracker.model.User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Inject UserRepository
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(16);
    }

    public String addUser(String email, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        userRepository.addUser(email, hashedPassword);
        return "User saved";
    }

    public Iterable<User> getAllUsers() {
        return userRepository.listAllUsers();
    }
}
