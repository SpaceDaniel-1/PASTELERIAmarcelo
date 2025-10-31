package com.pasteleria.projectbackend.controllers;

import com.pasteleria.projectbackend.entities.Producto;
import com.pasteleria.projectbackend.services.ProductoServices;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.media.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*import java.util.Optional;*/

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/documentado/productos")
public class ProductoSwaggerController {

    @Autowired
    private ProductoServices productoServices;

    // 🧁 Listar todos los productos
    @Operation(summary = "Listar todos los productos",
        description = "Recupera la lista completa de productos registrados en la pastelería.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de productos obtenida exitosamente",
            content = @Content(mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = Producto.class)),
                examples = @ExampleObject(value = "[{\"id\":1,\"nombre\":\"Torta Chocolate\",\"descripcion\":\"Torta húmeda con ganache\",\"precio\":5000,\"stock\":10,\"categoria\":\"Tortas\",\"imagen\":\"torta.jpg\",\"activo\":true}]"))
        ),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoServices.listarTodas();
        return ResponseEntity.ok(productos);
    }

    // 🎂 Obtener producto por ID
    @Operation(summary = "Obtener producto por ID",
        description = "Busca y devuelve un producto específico mediante su identificador único.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {
        try {
            Producto producto = productoServices.obtenerId(id);
            return ResponseEntity.ok(producto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Producto con ID " + id + " no encontrado");
        }
    }

    // 🍪 Crear producto
    @Operation(summary = "Crear un nuevo producto",
        description = "Crea un nuevo producto y lo guarda en la base de datos.")
    @ApiResponse(responseCode = "201", description = "Producto creado exitosamente")
    @PostMapping
    public ResponseEntity<Producto> crearProducto(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Datos del nuevo producto",
            required = true,
            content = @Content(schema = @Schema(implementation = Producto.class),
                examples = @ExampleObject(value = "{\"nombre\":\"Torta de Frutilla\",\"descripcion\":\"Torta con crema y frutillas frescas\",\"precio\":6500,\"stock\":8,\"categoria\":\"Tortas\",\"imagen\":\"frutilla.jpg\",\"activo\":true}")
            )
        )
        @RequestBody Producto producto) {
        Producto nuevo = productoServices.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // 🧇 Actualizar producto existente
    @Operation(summary = "Actualizar un producto existente",
        description = "Permite modificar los datos de un producto registrado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto actualizado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(
        @PathVariable Long id,
        @RequestBody Producto productoActualizado) {

        try {
            Producto actualizado = productoServices.actualizar(id, productoActualizado);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se pudo actualizar: producto no encontrado");
        }
    }

    // 🍩 Eliminar producto
    @Operation(summary = "Eliminar un producto por ID",
        description = "Elimina un producto del sistema utilizando su ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Producto eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // 🥮 Desactivar producto (PATCH)
    @Operation(summary = "Desactivar un producto",
        description = "Cambia el estado de un producto para que no aparezca en la lista activa.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto desactivado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivarProducto(@PathVariable Long id) {
        try {
            Producto desactivado = productoServices.desactivar(id);
            return ResponseEntity.ok(desactivado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se pudo desactivar el producto con ID " + id);
        }
    }
}
