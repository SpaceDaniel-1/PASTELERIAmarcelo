package com.pasteleria.projectbackend.auth;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.repositories.UsuarioRepositories;
import com.pasteleria.projectbackend.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioRepositories usuarioRepo;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UsuarioRepositories usuarioRepo,
            JwtUtils jwtUtils,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepo = usuarioRepo;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginSimple(@RequestBody AuthRequest request) {

        // 1) Buscar usuario por email
        Usuario usuario = usuarioRepo.findByEmail(request.email())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Usuario o contraseña incorrectos (email)");
        }

        // 2) Verificar contraseña
        boolean ok;
        String passwordIngresada = request.password();
        String passwordGuardada = usuario.getPassword();

        if (passwordGuardada != null && passwordGuardada.startsWith("$2a$")) {
            ok = passwordEncoder.matches(passwordIngresada, passwordGuardada);
        } else {
            ok = passwordIngresada.equals(passwordGuardada);
        }

        if (!ok) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Usuario o contraseña incorrectos (password)");
        }

        // 3) Generar token
        String token = jwtUtils.generateToken(usuario.getEmail());

        // 4) Armar respuesta
        AuthResponse resp = new AuthResponse(
                token,
                usuario.getEmail(),
                usuario.getRol().name(),
                usuario.getNombre()
        );

        return ResponseEntity.ok(resp);
    }
}


    /*

    Borrar(?)

    record AuthRequest(String username, String password) {
    }
    record AuthResponse(String token) {
    } 

    */