package com.petsociety.ms_autenticacion.repository;

import com.petsociety.ms_autenticacion.model.usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<usuario, Long> {
    usuario findByNombreUsuario(String nombreUsuario);
}
