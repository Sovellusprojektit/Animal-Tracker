package com.server.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.backend.data.User;




public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    
}
