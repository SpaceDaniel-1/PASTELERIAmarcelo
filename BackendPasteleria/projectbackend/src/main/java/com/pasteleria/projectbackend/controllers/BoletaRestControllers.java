package com.pasteleria.projectbackend.controllers;

import com.pasteleria.projectbackend.entities.Boleta;
import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.services.BoletaServices;
import com.pasteleria.projectbackend.services.UsuarioServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/boletas")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Boletas", description = "Endpoints para generación y consulta de boletas")
public class BoletaRestControllers {

    private final BoletaServices boletaService;
    private final UsuarioServices usuarioService;

    public BoletaRestControllers(BoletaServices boletaService, UsuarioServices usuarioService) {
        this.boletaService = boletaService;
        this.usuarioService = usuarioService;
    }

    // ---------------------------------------------------------
    // GENERAR BOLETA
    // ---------------------------------------------------------
    @Operation(
        summary = "Genera una boleta desde el carrito del usuario",
        description = "Usa el carrito actual del usuario y crea una boleta con sus productos"
    )
    @PostMapping("/{idUsuario}/generar")
    public ResponseEntity<Boleta> generar(@PathVariable Long idUsuario) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(boletaService.generarBoleta(u));
    }

    // ---------------------------------------------------------
    // HISTORIAL
    // ---------------------------------------------------------
    @Operation(
        summary = "Obtiene historial de boletas del usuario",
        description = "Retorna todas las boletas compradas por un usuario"
    )
    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<Boleta>> historial(@PathVariable Long idUsuario) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(boletaService.historialUsuario(u));
    }

    @Operation(
    summary = "Listado completo de boletas",
    description = "Retorna todas las boletas registradas en el sistema (uso administrativo)"
)
    @GetMapping
    public ResponseEntity<List<Boleta>> listarTodas() {
        return ResponseEntity.ok(boletaService.listarTodas());
    }

}
