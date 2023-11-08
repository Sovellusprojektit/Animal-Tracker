package com.server.backend.config;

import com.server.backend.data.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    private String fname;
    private String lname;
    private String email;
    private String password;
    private Role role;
}
