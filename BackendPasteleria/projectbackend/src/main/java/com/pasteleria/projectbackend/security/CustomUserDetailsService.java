package com.pasteleria.projectbackend.security;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.repositories.UsuarioRepositories;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepositories usuarioRepo;

    public CustomUserDetailsService(UsuarioRepositories usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("[CustomUserDetailsService] Buscando usuario: " + email);

        // Aquí se asume que "username" = nombre del usuario (como en el ejemplo del profe)
        Usuario usuario = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("[CustomUserDetailsService] Usuario NO encontrado: " + email);
                    return new UsernameNotFoundException("Usuario no encontrado: " + email);
                });

        System.out.println("[CustomUserDetailsService] Usuario encontrado: " + usuario.getEmail() + " - Password almacenada: " + usuario.getPassword());

        var authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name())
        );

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),        // 
                usuario.getPassword(),      // password encriptado
                usuario.isEnabled(),        // enabled
                true,                       // accountNonExpired
                true,                       // credentialsNonExpired
                true,                       // accountNonLocked
                authorities
        );
    }
}
