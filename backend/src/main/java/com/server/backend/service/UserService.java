package com.server.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.server.backend.data.User;
import com.server.backend.repository.UserRepo;


@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


}
