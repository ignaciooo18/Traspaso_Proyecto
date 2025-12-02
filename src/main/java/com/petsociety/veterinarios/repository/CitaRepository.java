package com.petsociety.veterinarios.repository;

import com.petsociety.veterinarios.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    List<Cita> findByVeterinarioId(Long veterinarioId);
    List<Cita> findByEstado(String estado);
    List<Cita> findByNombrePaciente(String nombrePaciente);
}
