package com.petsociety.veterinarios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "citas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cita {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "veterinario_id", nullable = false)
    private Veterinario veterinario;
    
    @Column(nullable = false)
    private String nombrePaciente;
    
    @Column(nullable = false)
    private String nombreMascota;
    
    @Column(nullable = false)
    private String especie;
    
    @Column(nullable = false)
    private LocalDateTime fechaHora;
    
    @Column(columnDefinition = "TEXT")
    private String razon;
    
    @Column(name = "estado")
    private String estado; // PROGRAMADA, COMPLETADA, CANCELADA
}
