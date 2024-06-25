package ru.kata.spring.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/admin")
    public String pageAdmin() {
        return "admin";
    }

    @GetMapping("/user")
    public String pageUser() {
        return "user";
    }
}
