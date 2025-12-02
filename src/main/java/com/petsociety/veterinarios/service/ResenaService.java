package com.petsociety.veterinarios.service;

import com.petsociety.veterinarios.dto.ResenaDTO;
import com.petsociety.veterinarios.model.Resena;
import com.petsociety.veterinarios.model.Veterinario;
import com.petsociety.veterinarios.repository.ResenaRepository;
import com.petsociety.veterinarios.repository.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResenaService {
    
    @Autowired
    private ResenaRepository resenaRepository;
    
    @Autowired
    private VeterinarioRepository veterinarioRepository;
    
    @Autowired
    private VeterinarioService veterinarioService;
    
    public ResenaDTO agregarResena(ResenaDTO dto) {
        if (dto.getCalificacion() < 1 || dto.getCalificacion() > 5) {
            throw new IllegalArgumentException("La calificación debe estar entre 1 y 5");
        }
        
        Veterinario veterinario = veterinarioRepository.findById(dto.getVeterinarioId())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        Resena resena = Resena.builder()
                .veterinario(veterinario)
                .calificacion(dto.getCalificacion())
                .comentario(dto.getComentario())
                .nombreUsuario(dto.getNombreUsuario())
            .nombreDueno(dto.getNombreDueno())
            .nombreAnimal(dto.getNombreAnimal())
            .razaAnimal(dto.getRazaAnimal())
            .imagenUrl(dto.getImagenUrl())
                .fechaCreacion(LocalDateTime.now())
                .build();
        
        Resena guardada = resenaRepository.save(resena);
        
        // Actualizar rating del veterinario
        veterinarioService.actualizarRating(dto.getVeterinarioId());
        
        return convertirADTO(guardada);
    }

    public ResenaDTO actualizarResena(Long id, ResenaDTO dto) {
        Resena existente = resenaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reseña no encontrada"));

        if (dto.getCalificacion() != null) {
            if (dto.getCalificacion() < 1 || dto.getCalificacion() > 5) {
                throw new IllegalArgumentException("La calificación debe estar entre 1 y 5");
            }
            existente.setCalificacion(dto.getCalificacion());
        }
        if (dto.getComentario() != null) existente.setComentario(dto.getComentario());
        if (dto.getNombreUsuario() != null) existente.setNombreUsuario(dto.getNombreUsuario());
        if (dto.getNombreDueno() != null) existente.setNombreDueno(dto.getNombreDueno());
        if (dto.getNombreAnimal() != null) existente.setNombreAnimal(dto.getNombreAnimal());
        if (dto.getRazaAnimal() != null) existente.setRazaAnimal(dto.getRazaAnimal());
        if (dto.getImagenUrl() != null) existente.setImagenUrl(dto.getImagenUrl());

        Resena guardada = resenaRepository.save(existente);

        // Recalcular rating si se modificó calificación
        if (dto.getCalificacion() != null) {
            veterinarioService.actualizarRating(guardada.getVeterinario().getId());
        }
        return convertirADTO(guardada);
    }
    
    public ResenaDTO obtenerResenaPorId(Long id) {
        Resena resena = resenaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reseña no encontrada"));
        return convertirADTO(resena);
    }
    
    public List<ResenaDTO> obtenerTodasLasResenas() {
        return resenaRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<ResenaDTO> obtenerResenasPorVeterinario(Long veterinarioId) {
        return resenaRepository.findByVeterinarioId(veterinarioId).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public void eliminarResena(Long id) {
        Resena resena = resenaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reseña no encontrada"));
        
        Long veterinarioId = resena.getVeterinario().getId();
        resenaRepository.deleteById(id);
        
        // Recalcular rating
        veterinarioService.actualizarRating(veterinarioId);
    }
    
    private ResenaDTO convertirADTO(Resena resena) {
        return ResenaDTO.builder()
                .id(resena.getId())
                .veterinarioId(resena.getVeterinario().getId())
                .nombreVeterinario(resena.getVeterinario().getNombre())
                .calificacion(resena.getCalificacion())
                .comentario(resena.getComentario())
                .nombreUsuario(resena.getNombreUsuario())
                .nombreDueno(resena.getNombreDueno())
                .nombreAnimal(resena.getNombreAnimal())
                .razaAnimal(resena.getRazaAnimal())
                .imagenUrl(resena.getImagenUrl())
                .fechaCreacion(resena.getFechaCreacion())
                .build();
    }
}
