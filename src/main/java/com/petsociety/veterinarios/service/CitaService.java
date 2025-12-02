package com.petsociety.veterinarios.service;

import com.petsociety.veterinarios.dto.CitaDTO;
import com.petsociety.veterinarios.model.Cita;
import com.petsociety.veterinarios.model.Veterinario;
import com.petsociety.veterinarios.repository.CitaRepository;
import com.petsociety.veterinarios.repository.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;
    
    @Autowired
    private VeterinarioRepository veterinarioRepository;
    
    public CitaDTO agendar(CitaDTO dto) {
        Veterinario veterinario = veterinarioRepository.findById(dto.getVeterinarioId())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        Cita cita = Cita.builder()
                .veterinario(veterinario)
                .nombrePaciente(dto.getNombrePaciente())
                .nombreMascota(dto.getNombreMascota())
                .especie(dto.getEspecie())
                .fechaHora(dto.getFechaHora())
                .razon(dto.getRazon())
                .estado("PROGRAMADA")
                .build();
        
        Cita guardada = citaRepository.save(cita);
        return convertirADTO(guardada);
    }
    
    public CitaDTO obtenerCitaPorId(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        return convertirADTO(cita);
    }
    
    public List<CitaDTO> obtenerTodasLasCitas() {
        return citaRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<CitaDTO> obtenerCitasPorVeterinario(Long veterinarioId) {
        return citaRepository.findByVeterinarioId(veterinarioId).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<CitaDTO> obtenerCitasPorPaciente(String nombrePaciente) {
        return citaRepository.findByNombrePaciente(nombrePaciente).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<CitaDTO> obtenerCitasPorEstado(String estado) {
        return citaRepository.findByEstado(estado).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public CitaDTO actualizarCita(Long id, CitaDTO dto) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        
        cita.setFechaHora(dto.getFechaHora());
        cita.setRazon(dto.getRazon());
        cita.setEstado(dto.getEstado());
        
        Cita actualizada = citaRepository.save(cita);
        return convertirADTO(actualizada);
    }
    
    public void cancelarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setEstado("CANCELADA");
        citaRepository.save(cita);
    }
    
    public void completarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setEstado("COMPLETADA");
        citaRepository.save(cita);
    }
    
    private CitaDTO convertirADTO(Cita cita) {
        return CitaDTO.builder()
                .id(cita.getId())
                .veterinarioId(cita.getVeterinario().getId())
                .veterinarioNombre(cita.getVeterinario().getNombre())
                .nombrePaciente(cita.getNombrePaciente())
                .nombreMascota(cita.getNombreMascota())
                .especie(cita.getEspecie())
                .fechaHora(cita.getFechaHora())
                .razon(cita.getRazon())
                .estado(cita.getEstado())
                .build();
    }
}
