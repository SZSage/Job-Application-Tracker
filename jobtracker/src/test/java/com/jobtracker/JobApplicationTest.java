package com.jobtracker;

import static org.assertj.core.api.Assertions.assertThat;

import com.jobtracker.controller.UserController;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JobApplicationTest {
    // Test to ensure application loads
    @Autowired
    private UserController controller;

    @Test
    void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
}
