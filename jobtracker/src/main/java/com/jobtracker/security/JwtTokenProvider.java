package com.jobtracker.security;

import java.util.Date;
import java.util.UUID;

import jakarta.annotation.PostConstruct;

import javax.crypto.SecretKey;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.InvalidKeyException;

@Component
public class JwtTokenProvider {
    private SecretKey secretKey;
    private static final Logger logger = LogManager.getLogger(JwtTokenProvider.class);

    @PostConstruct
    public void init() {
        this.secretKey = Jwts.SIG.HS256.key().build();
        logger.info("JWT key initialized {}" + secretKey);
    }

    public String generateJwtToken(Authentication authentication) {
        try {
            String token =
                Jwts.builder()
                    .subject(authentication.getName())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                    .signWith(secretKey)
                    .compact();
            return token;
        } catch (InvalidKeyException e) {
            System.out.println("Inavlid Key for JWT signing: " + e.getMessage());
            throw new SecurityException("Unable to generate token: Invalid signing key", e);
        } catch (JwtException e) {
            System.out.println("Error generation JWT Token" + e.getMessage());
            throw new RuntimeException("Failed to generate authentication token", e);
        }
    }

    public String genJwtToken(UUID userId) {
        try {
            String token = Jwts.builder()
                            .subject(userId.toString())
                            .issuedAt(new Date())
                            .expiration(new Date(System.currentTimeMillis() + 3600000))
                            .signWith(secretKey)
                            .compact();
            return token;
        } catch (InvalidKeyException e) {
            System.out.println("Inavlid Key for JWT signing: " + e.getMessage());
            throw new SecurityException("Unable to generate token: Invalid signing key", e);
        } catch (JwtException e) {
            System.out.println("Error generation JWT Token" + e.getMessage());
            throw new RuntimeException("Failed to generate authentication token", e);
        }
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token has expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
            return false;
    }
}
