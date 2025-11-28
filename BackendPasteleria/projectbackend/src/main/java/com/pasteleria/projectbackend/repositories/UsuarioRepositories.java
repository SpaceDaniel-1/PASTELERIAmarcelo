package com.pasteleria.projectbackend.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.pasteleria.projectbackend.entities.Usuario;

public interface UsuarioRepositories extends CrudRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
