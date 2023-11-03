package com.server.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.data.User;
import com.server.backend.service.UserService;




@CrossOrigin
@RestController
public class DataController {

    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
}
