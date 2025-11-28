package com.pasteleria.projectbackend.controllers;

import com.pasteleria.projectbackend.entities.Carrito;
import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.services.CarritoServices;
import com.pasteleria.projectbackend.services.UsuarioServices;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:5173")
public class CarritoRestControllers {
    private final CarritoServices carritoService;
    private final UsuarioServices usuarioService;

    public CarritoRestControllers(CarritoServices carritoService, UsuarioServices usuarioService) {
        this.carritoService = carritoService;
        this.usuarioService = usuarioService;
    }

    // Obtener carrito
    @GetMapping("/{idUsuario}")
    public ResponseEntity<Carrito> obtener(@PathVariable Long idUsuario) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(carritoService.obtenerCarrito(u));
    }

    // Agregar producto al carrito
    @PostMapping("/{idUsuario}/agregar")
    public ResponseEntity<Carrito> agregar(
            @PathVariable Long idUsuario,
            @RequestParam Long productoId,
            @RequestParam Integer cantidad) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Carrito carrito = carritoService.agregarProducto(u, productoId, cantidad);
        return ResponseEntity.ok(carrito);
    }

    // Actualizar cantidad de un item
    @PutMapping("/{idUsuario}/item/{itemId}")
    public ResponseEntity<Carrito> actualizar(
            @PathVariable Long idUsuario,
            @PathVariable Long itemId,
            @RequestParam Integer cantidad) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(
                carritoService.actualizarCantidad(u, itemId, cantidad)
        );
    }

    // Eliminar item del carrito
    @DeleteMapping("/{idUsuario}/item/{itemId}")
    public ResponseEntity<Carrito> eliminar(
            @PathVariable Long idUsuario,
            @PathVariable Long itemId) {

        Usuario u = usuarioService.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(
                carritoService.eliminarItem(u, itemId)
        );
    }
    @DeleteMapping("/{userId}/vaciar")
public ResponseEntity<?> vaciarCarrito(@PathVariable Long userId) {

    // 1. Buscar el usuario
    Usuario usuario = usuarioService.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    // 2. Obtener su carrito
    Carrito carrito = carritoService.obtenerCarrito(usuario);

    // 3. Vaciar carrito
    carritoService.vaciarCarrito(carrito);

    // 4. Devolver carrito vacío
    return ResponseEntity.ok(carrito);
}


}
