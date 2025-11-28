package com.pasteleria.projectbackend.auth;

public record AuthResponse(
        
        
        String token,
        String email,
        String rol,
        String nombre
) {}
