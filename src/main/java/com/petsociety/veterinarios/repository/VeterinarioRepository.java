package com.petsociety.veterinarios.repository;

import com.petsociety.veterinarios.model.Veterinario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {
    List<Veterinario> findByEspecialidad(String especialidad);
    List<Veterinario> findByNombreContainingIgnoreCase(String nombre);
}
