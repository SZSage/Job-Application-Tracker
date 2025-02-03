package com.jobtracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @RequestMapping("/hello")
    public String greetings() {
        return "Hello, world!";
    }

    @GetMapping("/")
    public String hello() {
        return "Greetings from Mars!";
    }
}
