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
public class ResenaDTO {
    private Long id;
    private Long veterinarioId;
    private String nombreVeterinario; // Nombre del veterinario para mostrar en UI
    private Integer calificacion;
    private String comentario;
    private String nombreUsuario;
    private String nombreDueno;
    private String nombreAnimal;
    private String razaAnimal;
    private String imagenUrl;
    private LocalDateTime fechaCreacion;
}
