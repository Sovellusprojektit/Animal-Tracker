package com.server.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.backend.data.User;




public interface UserRepo extends JpaRepository<User, Integer> {
    
}
