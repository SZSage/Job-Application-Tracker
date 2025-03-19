package com.jobtracker.controller;

import java.util.Collections;

import com.jobtracker.security.JwtTokenProvider;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/test")
public class TestJwtController {
  private static final Logger logger = LogManager.getLogger(JwtTokenProvider.class);
  @Autowired private JwtTokenProvider jwtToken;

  @GetMapping("/jwt")
  public String testJwt() {
    Authentication auth = new UsernamePasswordAuthenticationToken(
        "testuser", null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    String result = jwtToken.generateJwtToken(auth);
    if (jwtToken.validateJwtToken(result)) {
      logger.info("Token authenticated!");
    }
    return result;
  }
}
