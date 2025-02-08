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
        // hash password
        String hashedPassword = passwordEncoder.encode(password);
        
        // create a new user object
        User user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);

        // save to database
        userRepository.save(user);
        return "User saved";
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
