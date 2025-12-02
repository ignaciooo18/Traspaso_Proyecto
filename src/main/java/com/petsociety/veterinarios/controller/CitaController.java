package com.petsociety.veterinarios.controller;

import com.petsociety.veterinarios.dto.CitaDTO;
import com.petsociety.veterinarios.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = {"http://amzn-jonunezh-petsociety.s3-website-us-east-1.amazonaws.com", "http://localhost:3000"})
public class CitaController {
    
    @Autowired
    private CitaService citaService;
    
    @PostMapping
    public ResponseEntity<CitaDTO> agendar(@RequestBody CitaDTO dto) {
        try {
            CitaDTO cita = citaService.agendar(dto);
            return new ResponseEntity<>(cita, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<CitaDTO>> obtenerTodasLasCitas() {
        try {
            List<CitaDTO> citas = citaService.obtenerTodasLasCitas();
            return new ResponseEntity<>(citas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CitaDTO> obtenerCitaPorId(@PathVariable Long id) {
        try {
            CitaDTO cita = citaService.obtenerCitaPorId(id);
            return new ResponseEntity<>(cita, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/veterinario/{veterinarioId}")
    public ResponseEntity<List<CitaDTO>> obtenerCitasPorVeterinario(@PathVariable Long veterinarioId) {
        try {
            List<CitaDTO> citas = citaService.obtenerCitasPorVeterinario(veterinarioId);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/paciente/{nombrePaciente}")
    public ResponseEntity<List<CitaDTO>> obtenerCitasPorPaciente(@PathVariable String nombrePaciente) {
        try {
            List<CitaDTO> citas = citaService.obtenerCitasPorPaciente(nombrePaciente);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<CitaDTO>> obtenerCitasPorEstado(@PathVariable String estado) {
        try {
            List<CitaDTO> citas = citaService.obtenerCitasPorEstado(estado);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CitaDTO> actualizarCita(@PathVariable Long id, @RequestBody CitaDTO dto) {
        try {
            CitaDTO cita = citaService.actualizarCita(id, dto);
            return new ResponseEntity<>(cita, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarCita(@PathVariable Long id) {
        try {
            citaService.cancelarCita(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}/completar")
    public ResponseEntity<Void> completarCita(@PathVariable Long id) {
        try {
            citaService.completarCita(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
