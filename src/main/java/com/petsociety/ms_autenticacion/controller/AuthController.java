package com.petsociety.ms_autenticacion.controller;

import com.petsociety.ms_autenticacion.dto.*;
import com.petsociety.ms_autenticacion.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.registrar(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // Temporary debug endpoint to log raw request body for troubleshooting 400 errors
    @PostMapping("/debug")
    public String debug(@RequestBody String body) {
        System.out.println("[DEBUG /auth/debug] Raw request body: " + body);
        return body;
    }
}
