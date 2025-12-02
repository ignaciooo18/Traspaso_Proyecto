package com.petsociety.veterinarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VeterinarioDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String especialidad;
    private String telefono;
    private String email;
    private String imagen;
    private Double rating; // Renombrado de ratingEstrellas para coincidir con frontend
    private Integer reseñas; // Renombrado de totalResenas para coincidir con frontend
}
