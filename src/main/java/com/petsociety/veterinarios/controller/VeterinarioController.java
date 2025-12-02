package com.petsociety.veterinarios.controller;

import com.petsociety.veterinarios.dto.VeterinarioDTO;
import com.petsociety.veterinarios.service.VeterinarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/veterinarios")
@CrossOrigin(origins = {"http://amzn-jonunezh-petsociety.s3-website-us-east-1.amazonaws.com", "http://localhost:3000"})
public class VeterinarioController {
    
    @Autowired
    private VeterinarioService veterinarioService;
    
    @PostMapping
    public ResponseEntity<VeterinarioDTO> crearVeterinario(@RequestBody VeterinarioDTO dto) {
        try {
            VeterinarioDTO veterinario = veterinarioService.crearVeterinario(dto);
            return new ResponseEntity<>(veterinario, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<VeterinarioDTO>> obtenerTodosLosVeterinarios() {
        try {
            List<VeterinarioDTO> veterinarios = veterinarioService.obtenerTodosLosVeterinarios();
            return new ResponseEntity<>(veterinarios, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VeterinarioDTO> obtenerVeterinarioPorId(@PathVariable Long id) {
        try {
            VeterinarioDTO veterinario = veterinarioService.obtenerVeterinarioPorId(id);
            return new ResponseEntity<>(veterinario, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/especialidad/{especialidad}")
    public ResponseEntity<List<VeterinarioDTO>> obtenerVeterinariosPorEspecialidad(@PathVariable String especialidad) {
        try {
            List<VeterinarioDTO> veterinarios = veterinarioService.obtenerVeterinariosPorEspecialidad(especialidad);
            return new ResponseEntity<>(veterinarios, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<List<VeterinarioDTO>> buscarVeterinariosPorNombre(@PathVariable String nombre) {
        try {
            List<VeterinarioDTO> veterinarios = veterinarioService.buscarVeterinariosPorNombre(nombre);
            return new ResponseEntity<>(veterinarios, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<VeterinarioDTO> actualizarVeterinario(@PathVariable Long id, @RequestBody VeterinarioDTO dto) {
        try {
            VeterinarioDTO veterinario = veterinarioService.actualizarVeterinario(id, dto);
            return new ResponseEntity<>(veterinario, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVeterinario(@PathVariable Long id) {
        try {
            veterinarioService.eliminarVeterinario(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
