package com.petsociety.ms_autenticacion.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String nombreUsuario;
    private String contraseña;
}
