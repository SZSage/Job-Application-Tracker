package com.jobtracker.service;

import java.util.List;
import java.util.UUID;

import com.jobtracker.dto.UserRegistrationDTO;
import com.jobtracker.dto.response.AuthenticationResponse;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.security.JwtTokenProvider;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final Logger logger = LogManager.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public User addUser(UserRegistrationDTO userRegistrationDto) {
        // Create new domain object for DTO
        User newUser = new User();
        newUser.setEmail(userRegistrationDto.getEmail());

        // Hash password then save
        String hashedPassword = passwordEncoder.encode(userRegistrationDto.getPassword());
        newUser.setPassword(hashedPassword);
        return userRepository.addUser(newUser);
    }

    public List<User> getAllUsers() {
        return userRepository.fetchAllUsers();
    }

    public int deleteUser(UUID userId) {
        return userRepository.removeUser(userId);
    }

    public AuthenticationResponse userLogin(String email, String rawPassword) {

        User user = userRepository.checkLogin(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return null;
        }

        String token = tokenGenerator(userRepository.getUserId(email));
        System.out.println("RESULT: " + token);
        return new AuthenticationResponse(user, token);
    }

    // TODO: 

    public String tokenGenerator(UUID userId) {
        String token = jwtTokenProvider.genJwtToken(userId);
        return token;
    }
}

