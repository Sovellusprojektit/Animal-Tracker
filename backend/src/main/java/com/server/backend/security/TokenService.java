package com.server.backend.security;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class TokenService {
    
    private final String secretKey;

     public TokenService(@Value("${SECRET_KEY}") String secretKey) {
        this.secretKey = secretKey;
    }

   

    public String getEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken (UserDetails userDetails) {
        return generateToken(Map.of(), userDetails);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 8))
                .signWith(getSignKey())
                .compact();
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = getEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date(System.currentTimeMillis()));
    }

    private Date getExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //Get all claims from token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Get specific claim from token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }

    
    
   private Key getSignKey() {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new RuntimeException("Secret key not found in environment variable");
        }

        byte[] decodedKey = Base64.getDecoder().decode(secretKey);

        return new SecretKeySpec(decodedKey, "HmacSHA256");
    }

    
}
