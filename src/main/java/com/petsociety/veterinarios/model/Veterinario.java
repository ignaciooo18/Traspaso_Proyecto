package com.petsociety.veterinarios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "veterinarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veterinario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(nullable = false)
    private String especialidad;
    
    private String telefono;
    
    private String email;
    
    @Column(name = "imagen_url")
    private String imagen;
    
    @Column(name = "rating_estrellas")
    private Double ratingEstrellas;
    
    @Column(name = "total_resenas")
    private Integer totalResenas;
    
    @Column(name = "suma_calificaciones")
    private Double sumaCalificaciones;
}
