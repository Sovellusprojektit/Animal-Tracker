package com.server.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.server.backend.service.UserService;




@CrossOrigin
@RestController
public class DataController {

    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public String getAllUsers() {
        return userService.getAllUsers().toString();
    }
    
}
