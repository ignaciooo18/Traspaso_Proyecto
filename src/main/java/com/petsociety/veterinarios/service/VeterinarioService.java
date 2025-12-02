package com.petsociety.veterinarios.service;

import com.petsociety.veterinarios.dto.VeterinarioDTO;
import com.petsociety.veterinarios.model.Veterinario;
import com.petsociety.veterinarios.repository.VeterinarioRepository;
import com.petsociety.veterinarios.repository.ResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VeterinarioService {
    
    @Autowired
    private VeterinarioRepository veterinarioRepository;
    
    @Autowired
    private ResenaRepository resenaRepository;
    
    public VeterinarioDTO crearVeterinario(VeterinarioDTO dto) {
        Veterinario veterinario = Veterinario.builder()
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .especialidad(dto.getEspecialidad())
                .telefono(dto.getTelefono())
                .email(dto.getEmail())
                .imagen(dto.getImagen())
                .ratingEstrellas(0.0)
                .totalResenas(0)
                .sumaCalificaciones(0.0)
                .build();
        
        Veterinario guardado = veterinarioRepository.save(veterinario);
        return convertirADTO(guardado);
    }
    
    public VeterinarioDTO obtenerVeterinarioPorId(Long id) {
        Veterinario veterinario = veterinarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        return convertirADTO(veterinario);
    }
    
    public List<VeterinarioDTO> obtenerTodosLosVeterinarios() {
        return veterinarioRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<VeterinarioDTO> obtenerVeterinariosPorEspecialidad(String especialidad) {
        return veterinarioRepository.findByEspecialidad(especialidad).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<VeterinarioDTO> buscarVeterinariosPorNombre(String nombre) {
        return veterinarioRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public VeterinarioDTO actualizarVeterinario(Long id, VeterinarioDTO dto) {
        Veterinario veterinario = veterinarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        if (dto.getNombre() != null) veterinario.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) veterinario.setDescripcion(dto.getDescripcion());
        if (dto.getEspecialidad() != null) veterinario.setEspecialidad(dto.getEspecialidad());
        if (dto.getTelefono() != null) veterinario.setTelefono(dto.getTelefono());
        if (dto.getEmail() != null) veterinario.setEmail(dto.getEmail());
        if (dto.getImagen() != null) veterinario.setImagen(dto.getImagen());
        
        Veterinario actualizado = veterinarioRepository.save(veterinario);
        return convertirADTO(actualizado);
    }
    
    public void eliminarVeterinario(Long id) {
        veterinarioRepository.deleteById(id);
    }
    
    public void actualizarRating(Long veterinarioId) {
        Veterinario veterinario = veterinarioRepository.findById(veterinarioId)
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        var resenas = resenaRepository.findByVeterinarioId(veterinarioId);
        
        if (resenas.isEmpty()) {
            veterinario.setRatingEstrellas(0.0);
            veterinario.setTotalResenas(0);
            veterinario.setSumaCalificaciones(0.0);
        } else {
            double suma = resenas.stream()
                    .mapToInt(r -> r.getCalificacion())
                    .sum();
            double promedio = suma / resenas.size();
            
            veterinario.setTotalResenas(resenas.size());
            veterinario.setSumaCalificaciones(suma);
            veterinario.setRatingEstrellas(Math.round(promedio * 10.0) / 10.0);
        }
        
        veterinarioRepository.save(veterinario);
    }
    
    private VeterinarioDTO convertirADTO(Veterinario veterinario) {
        // Asegurar valores no-null para evitar errores en frontend
        Double rating = veterinario.getRatingEstrellas();
        Integer totalResenas = veterinario.getTotalResenas();
        
        return VeterinarioDTO.builder()
                .id(veterinario.getId())
                .nombre(veterinario.getNombre() != null ? veterinario.getNombre() : "")
                .descripcion(veterinario.getDescripcion() != null ? veterinario.getDescripcion() : "")
                .especialidad(veterinario.getEspecialidad() != null ? veterinario.getEspecialidad() : "")
                .telefono(veterinario.getTelefono())
                .email(veterinario.getEmail())
                .imagen(veterinario.getImagen() != null ? veterinario.getImagen() : "https://via.placeholder.com/300x200?text=Veterinario")
                .rating(rating != null ? rating : 0.0)
                .reseñas(totalResenas != null ? totalResenas : 0)
                .build();
    }
}
