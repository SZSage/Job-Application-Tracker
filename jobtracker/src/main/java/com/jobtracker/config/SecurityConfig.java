package com.jobtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .formLogin(form -> form.loginPage("/login").permitAll())
        .authorizeHttpRequests(authorize -> authorize
                              .requestMatchers("/api/auth/**").permitAll()
                              .requestMatchers("/api/test/**").permitAll()
                              .requestMatchers("/register").permitAll()
                              .anyRequest().permitAll()
                              );

    return http.build();
  }

  @Bean
  public UserDetailsService UserDetailsService() {
    PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    String rawPassword = "password";
    String encodedPassword = encoder.encode(rawPassword);
    System.out.println("Raw password: " + rawPassword);
    System.out.println("Encoded password: " + encodedPassword);
    UserDetails userDetails =
        User.builder()
            .username("user")
            .password("{bcrypt}$2a$10$STKHIikfop1mJp6hZxlGIedyArWT31iTphCYclK3VtcvMpIE0NfWC")
            .roles("USER")
            .build();
    return new InMemoryUserDetailsManager(userDetails);
  }
}
