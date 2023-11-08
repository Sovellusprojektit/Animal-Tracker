package com.server.backend.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.backend.config.AuthResponse;
import com.server.backend.config.LoginRequest;
import com.server.backend.config.SignUpRequest;
import com.server.backend.repository.UserRepo;
import com.server.backend.data.User;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse signUp(SignUpRequest request) {
        var user = User.builder()
                .fname(request.getFname())
                .lname(request.getLname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepo.save(user);
        var token = tokenService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
}

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
            request.getEmail(), request.getPassword())
            );
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        var token = tokenService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

}
