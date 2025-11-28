package com.pasteleria.projectbackend.controllers;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.services.UsuarioServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.media.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/documentado/usuarios")
public class UsuarioSwaggerController {

    @Autowired
    private UsuarioServices usuarioServices;

    // 👥 Listar todos los usuarios
    @Operation(summary = "Listar todos los usuarios",
        description = "Recupera todos los usuarios registrados en el sistema de la pastelería.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuarios listados correctamente",
            content = @Content(mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = Usuario.class)),
                examples = @ExampleObject(value = "[{\"id\":1,\"username\":\"Daniel\",\"email\":\"daniel@mail.com\",\"rol\":\"ADMIN\",\"activo\":true}]"))
        ),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioServices.findAll();
        return ResponseEntity.ok(usuarios);
    }

    // 👤 Obtener usuario por ID
    @Operation(summary = "Obtener usuario por ID",
        description = "Busca un usuario específico por su identificador único.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioServices.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // ➕ Crear usuario
    @Operation(summary = "Registrar un nuevo usuario",
        description = "Crea un nuevo usuario en el sistema de la pastelería.")
    @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente")
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Datos del nuevo usuario",
            required = true,
            content = @Content(schema = @Schema(implementation = Usuario.class),
                examples = @ExampleObject(value = "{\"nombre\":\"María\",\"username\":\"María007\",\"email\":\"maria@mail.com\",\"password\":\"1234\",\"rol\":\"CLIENTE\",\"activo\":true}")
            )
        )
        @RequestBody Usuario usuario) {
        Usuario nuevo = usuarioServices.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // 📝 Actualizar usuario
    @Operation(summary = "Actualizar usuario existente",
        description = "Modifica los datos de un usuario ya registrado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(
        @PathVariable Long id,
        @RequestBody Usuario usuarioActualizado) {

        return usuarioServices.findById(id)
                .map(existing -> {
                    // actualizar campos relevantes
                    existing.setNombre(usuarioActualizado.getNombre());
                    existing.setUsername(usuarioActualizado.getUsername());
                    existing.setEmail(usuarioActualizado.getEmail());
                    existing.setPassword(usuarioActualizado.getPassword());
                    existing.setRol(usuarioActualizado.getRol());
                    existing.setEnabled(usuarioActualizado.isEnabled());
                    Usuario saved = usuarioServices.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ❌ Eliminar usuario
    @Operation(summary = "Eliminar usuario por ID",
        description = "Elimina definitivamente un usuario del sistema.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Usuario eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        return usuarioServices.findById(id)
                .map(u -> {
                    usuarioServices.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
