package com.petsociety.veterinarios.controller;

import com.petsociety.veterinarios.dto.ResenaDTO;
import com.petsociety.veterinarios.service.ResenaService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resenas")
@CrossOrigin(origins = {"http://amzn-jonunezh-petsociety.s3-website-us-east-1.amazonaws.com", "http://localhost:3000"})
public class ResenaController {
    
    @Autowired
    private ResenaService resenaService;
    
    @PostMapping
    public ResponseEntity<ResenaDTO> agregarResena(@RequestBody ResenaDTO dto) {
        try {
            ResenaDTO resena = resenaService.agregarResena(dto);
            return new ResponseEntity<>(resena, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ResenaDTO>> obtenerTodasLasResenas() {
        try {
            List<ResenaDTO> resenas = resenaService.obtenerTodasLasResenas();
            return new ResponseEntity<>(resenas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResenaDTO> obtenerResenaPorId(@PathVariable Long id) {
        try {
            ResenaDTO resena = resenaService.obtenerResenaPorId(id);
            return new ResponseEntity<>(resena, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/veterinario/{veterinarioId}")
    public ResponseEntity<List<ResenaDTO>> obtenerResenasPorVeterinario(@PathVariable Long veterinarioId) {
        try {
            List<ResenaDTO> resenas = resenaService.obtenerResenasPorVeterinario(veterinarioId);
            return new ResponseEntity<>(resenas, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarResena(@PathVariable Long id) {
        try {
            resenaService.eliminarResena(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResenaDTO> actualizarResena(@PathVariable Long id, @RequestBody ResenaDTO dto) {
        try {
            ResenaDTO actualizada = resenaService.actualizarResena(id, dto);
            return new ResponseEntity<>(actualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{id}/imagen")
    public ResponseEntity<ResenaDTO> subirImagenResena(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            // Guardado simple en carpeta local (./uploads/resenas) - en producción usar S3
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads", "resenas");
            java.nio.file.Files.createDirectories(uploadDir);
            String filename = id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path target = uploadDir.resolve(filename);
            file.transferTo(target.toFile());
            String url = "/uploads/resenas/" + filename; // Servir estático si se configura

            ResenaDTO parcial = new ResenaDTO();
            parcial.setImagenUrl(url);
            ResenaDTO actualizada = resenaService.actualizarResena(id, parcial);
            return new ResponseEntity<>(actualizada, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
