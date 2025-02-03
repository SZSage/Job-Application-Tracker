package com.jobtracker.user;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name="name", required=true, defaultValue="World") String name) {
        String names = String.format(template, name);
    return names;
    }
}
