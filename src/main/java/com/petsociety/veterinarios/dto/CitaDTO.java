package com.petsociety.veterinarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CitaDTO {
    private Long id;
    private Long veterinarioId;
    private String veterinarioNombre;
    private String nombrePaciente;
    private String nombreMascota;
    private String especie;
    private LocalDateTime fechaHora;
    private String razon;
    private String estado;
}
