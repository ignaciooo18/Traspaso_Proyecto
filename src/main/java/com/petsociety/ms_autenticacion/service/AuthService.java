package com.petsociety.ms_autenticacion.service;

import com.petsociety.ms_autenticacion.dto.*;
import com.petsociety.ms_autenticacion.model.usuario;
import com.petsociety.ms_autenticacion.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthResponse registrar(RegisterRequest request) {
        usuario usuario = new usuario();

        usuario.setNombreUsuario(request.getNombreUsuario());
        usuario.setPasswordHash(encoder.encode(request.getContraseña()));

        usuarioRepository.save(usuario);

        String token = jwtService.generarToken(usuario.getNombreUsuario());

        return new AuthResponse(token, usuario.getNombreUsuario());
    }

    public AuthResponse login(LoginRequest request) {
        usuario usuario = usuarioRepository.findByNombreUsuario(request.getNombreUsuario());

        if (usuario == null)
            throw new RuntimeException("Usuario no encontrado");

        if (!encoder.matches(request.getContraseña(), usuario.getPasswordHash()))
            throw new RuntimeException("Contraseña incorrecta");

        String token = jwtService.generarToken(usuario.getNombreUsuario());

        return new AuthResponse(token, usuario.getNombreUsuario());
    }
}
