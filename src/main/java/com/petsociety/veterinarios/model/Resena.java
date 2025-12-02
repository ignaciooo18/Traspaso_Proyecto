package com.petsociety.veterinarios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "resenas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resena {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "veterinario_id", nullable = false)
    private Veterinario veterinario;
    
    @Column(nullable = false)
    private Integer calificacion; // 1-5
    
    @Column(columnDefinition = "TEXT")
    private String comentario;
    
    @Column(nullable = false)
    private String nombreUsuario;

    // Nuevo: nombre del dueño del animal
    @Column(name = "nombre_dueno")
    private String nombreDueno;

    // Nuevo: nombre del animal
    @Column(name = "nombre_animal")
    private String nombreAnimal;

    // Nuevo: raza del animal
    @Column(name = "raza_animal")
    private String razaAnimal;

    // Nuevo: URL de imagen asociada a la reseña (foto del dueño/mascota)
    @Column(name = "imagen_url")
    private String imagenUrl;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
}
