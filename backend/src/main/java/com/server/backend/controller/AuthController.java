package com.server.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.backend.config.AuthResponse;
import com.server.backend.config.LoginRequest;
import com.server.backend.config.SignUpRequest;
import com.server.backend.security.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/signUp")
    public ResponseEntity<AuthResponse> signUp(@RequestBody SignUpRequest request) {
        
        return ResponseEntity.ok(authService.signUp(request));
    }


     @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        
        return ResponseEntity.ok(authService.login(request));
    }
    

    
}
