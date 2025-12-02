package com.petsociety.ms_autenticacion.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @JsonProperty("nombreUsuario")
    @JsonAlias({"nombre", "email", "username"})
    private String nombreUsuario;
    
    @JsonProperty("contraseña")
    @JsonAlias({"password", "contrasena"})
    private String contraseña;
}
