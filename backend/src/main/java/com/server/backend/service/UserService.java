package com.server.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.server.backend.config.UpdatePasswordRequest;
import com.server.backend.config.UserUpdate;
import com.server.backend.data.User;
import com.server.backend.repository.UserRepo;


@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public boolean updatePassword(String userEmail, UpdatePasswordRequest request) {
    Optional<User> optionalUser = userRepo.findByEmail(userEmail);

    if (optionalUser.isPresent()) {
        User user = optionalUser.get();

        String oldPassword = request.getOldPassword();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);
        return true;
    } else {
        return false;
    }
}

public boolean updateUser(String userEmail, UserUpdate userUpdate) {

        Optional<User> optionalUser = userRepo.findByEmail(userEmail);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFname(userUpdate.getFname());
            user.setLname(userUpdate.getLname());
            user.setEmail(userEmail);
            userRepo.save(user);
            return true;
        } else {

            System.out.println("User not found with email: " + userEmail);
            return false;
        }
    }

}
