package com.pasteleria.projectbackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.services.UsuarioServices;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRestControllers {

    private UsuarioServices usuarioServices;

    public UsuarioRestControllers(UsuarioServices usuarioServices) {
        this.usuarioServices = usuarioServices;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable Long id) {
        return usuarioServices.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔥🔥🔥 AQUI AGREGA EL NUEVO ENDPOINT 🔥🔥🔥
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        return usuarioServices.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // 🔥🔥🔥 FIN NUEVO ENDPOINT 🔥🔥🔥

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        if (usuarioServices.existsByUsername(usuario.getUsername())
                || usuarioServices.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario saved = usuarioServices.save(usuario);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        usuarioServices.findAll().forEach(usuarios::add);
        return ResponseEntity.ok(usuarios);
    }
}
