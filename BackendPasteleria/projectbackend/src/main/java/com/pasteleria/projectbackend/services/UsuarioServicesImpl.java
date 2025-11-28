package com.pasteleria.projectbackend.services;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.repositories.UsuarioRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicesImpl implements UsuarioServices {

    private final UsuarioRepositories usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServicesImpl(UsuarioRepositories usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepo.findByUsername(username);
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepo.findByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return usuarioRepo.existsByUsername(username);
    }

    

    @Override
    public boolean existsByEmail(String email) {
        return usuarioRepo.existsByEmail(email);
    }

    @Override
    public Usuario save(Usuario usuario) {
        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepo.save(usuario);
    }

    @Override
    public List<Usuario> findAll() {
        return (List<Usuario>) usuarioRepo.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepo.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        usuarioRepo.deleteById(id);
    }
    
}
