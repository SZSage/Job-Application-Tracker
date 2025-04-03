package com.jobtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
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

/**
 * Spring Security configuration
 * This class defines authentication and authorization rules for HTTP requests.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  /**
   * Creates a password encoder bean for secure password storage
   * @return A password encoder that uses the BCrypt strong hashing function
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Configures security rules for HTTP requests.
   *
   * Note: Currently all requests are permitted (for development) and will be
   *  changed in production.
   *
   * @param http the HttpSecurity object to configure
   * @return The built SecurityFilterChain
   * @throws Exception If any errors occurs during configuration
  */
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

  /**
   * Creates an authentication manager that connects the user details service
   * with the password encoder to authenticate users.
   *
   * @param userDetailsService Service to retrieve user details
   * @param passwordEncoder Encoder to verify passwords
   * @return Configured authentication manager
   */
  @Bean
  public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    DaoAuthenticationProvider daoAuthentication = new DaoAuthenticationProvider();
    daoAuthentication.setUserDetailsService(userDetailsService);
    daoAuthentication.setPasswordEncoder(passwordEncoder);
    return new ProviderManager(daoAuthentication);
  }

  /**
   * This method creates an in-memory user details with a single user.
   * It's indented for development/testing purposes.
   * Will be replaced with a database-backed user details service.
   * @return
   */
  @Bean
  public UserDetailsService UserDetailsService() {
    PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    String rawPassword = "password";
    String encodedPassword = encoder.encode(rawPassword);
    UserDetails userDetails =
        User.builder()
            .username("user")
            .password("{bcrypt}$2a$10$STKHIikfop1mJp6hZxlGIedyArWT31iTphCYclK3VtcvMpIE0NfWC")
            .roles("USER")
            .build();
    return new InMemoryUserDetailsManager(userDetails);
  }

  // TODO: Validate credentials

}
