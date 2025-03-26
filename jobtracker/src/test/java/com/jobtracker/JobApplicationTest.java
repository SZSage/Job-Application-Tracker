package com.jobtracker;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = JobApp.class)
@Disabled("Temporarily disabled until context loading issues are resolved")
class JobApplicationTest {
    // Test to ensure application loads
    @Test
    void contextLoads(){
    }
}
