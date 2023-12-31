package com.server.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.config.UpdatePasswordRequest;
import com.server.backend.config.UserUpdateRequest;
import com.server.backend.data.User;
import com.server.backend.data.UserDto;
import com.server.backend.repository.UserRepo;
import com.server.backend.service.UserService;

@CrossOrigin
@RestController
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUserInfo")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        String userEmail = authentication.getName();
        Optional<User> optionalUser = userService.getUserByEmail(userEmail);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserDto userDto = convertToDto(user);
            return ResponseEntity.ok(userDto);
        }

        return ResponseEntity.notFound().build();
    }
    
    private UserDto convertToDto(User user) {
        return new UserDto(user.getUid(), user.getFname(), user.getLname(), user.getEmail(), user.getRole());
    }



    @PostMapping("/addUser")
    public User addUser(@RequestParam String fname, @RequestParam String lname, @RequestParam String email,
            @RequestParam String password) {
        User user = new User();
        user.setFname(fname);
        user.setLname(lname);
        user.setEmail(email);
        user.setPassword(password);

        return userRepo.save(user);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        Optional<User> user = userRepo.findById(id);

        if (user.isPresent()) {
            userRepo.deleteById(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/user/password")
    public ResponseEntity<String> updatePassword(Authentication authentication, @RequestBody UpdatePasswordRequest request) {
        String userEmail = authentication.getName();
        boolean passwordUpdated = userService.updatePassword(userEmail, request);

        if (passwordUpdated) {
            return ResponseEntity.ok().body("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(Authentication authentication, @RequestBody UserUpdateRequest userUpdate) {
    try {
        String userEmail = authentication.getName();
        boolean isUpdated = userService.updateUser(userEmail, userUpdate);

        if (isUpdated) {
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>("Error updating user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
