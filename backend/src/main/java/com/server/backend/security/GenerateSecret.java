package com.server.backend.security;

import java.security.SecureRandom;

public class GenerateSecret {
    
public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[64];
        random.nextBytes(keyBytes);

        StringBuilder keyBuilder = new StringBuilder();
        for (byte b : keyBytes) {
            keyBuilder.append(String.format("%02x", b));
        }

        String secretKey = keyBuilder.toString();
        System.out.println("Generated Secret Key: " + secretKey);
    }

}
