package com.pasteleria.projectbackend.services;

import com.pasteleria.projectbackend.entities.Usuario;
import java.util.List;
import java.util.Optional;

public interface UsuarioServices {

    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    Usuario save(Usuario usuario);

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    void deleteById(Long id);


   
}
