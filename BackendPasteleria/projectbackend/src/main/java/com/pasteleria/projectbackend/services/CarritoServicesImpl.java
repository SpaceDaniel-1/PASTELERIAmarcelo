package com.pasteleria.projectbackend.services;

import com.pasteleria.projectbackend.entities.*;
import com.pasteleria.projectbackend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CarritoServicesImpl implements CarritoServices {

    @Autowired
    private CarritoRepositories carritoRepositories;

    @Autowired
    private CarritoItemRepositories carritoItemRepositories;

    @Autowired
    private ProductoRepositories productoRepositories;

    // -------------------------------------------------------------
    // 1. Obtener Carrito del usuario
    // -------------------------------------------------------------
    @Override
    @Transactional(readOnly = true)
    public Carrito obtenerCarrito(Usuario usuario) {
        return carritoRepositories.findByUsuario(usuario)
                .orElseGet(() -> {
                    Carrito nuevo = new Carrito();
                    nuevo.setUsuario(usuario);
                    nuevo.setTotal(0L);
                    return carritoRepositories.save(nuevo);
                });
    }

    // -------------------------------------------------------------
    // 2. Agregar producto al carrito
    // -------------------------------------------------------------
    @Override
    @Transactional
    public Carrito agregarProducto(Usuario usuario, Long productoId, Integer cantidad) {

        Carrito carrito = obtenerCarrito(usuario);

        Producto producto = productoRepositories.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Buscar si ya existe el item
        CarritoItem item = carritoItemRepositories.findByCarritoAndProducto(carrito, producto)
                .orElseGet(() -> {
                    CarritoItem nuevoItem = new CarritoItem();
                    nuevoItem.setCarrito(carrito);
                    nuevoItem.setProducto(producto);
                    nuevoItem.setCantidad(0);
                    nuevoItem.setPrecioUnitario(producto.getPrecio());
                    return nuevoItem;
                });

        item.setCantidad(item.getCantidad() + cantidad);
        item.setSubtotal(item.getCantidad() * item.getPrecioUnitario());

        carritoItemRepositories.save(item);

        recalcularTotal(carrito);

        return carritoRepositories.save(carrito);
    }

    // -------------------------------------------------------------
    // 3. Actualizar cantidad de un item
    // -------------------------------------------------------------
    @Override
    @Transactional
    public Carrito actualizarCantidad(Usuario usuario, Long itemId, Integer cantidad) {

        Carrito carrito = obtenerCarrito(usuario);

        CarritoItem item = carritoItemRepositories.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        item.setCantidad(cantidad);
        item.setSubtotal(item.getCantidad() * item.getPrecioUnitario());

        carritoItemRepositories.save(item);

        recalcularTotal(carrito);

        return carritoRepositories.save(carrito);
    }

    // -------------------------------------------------------------
    // 4. Eliminar item del carrito
    // -------------------------------------------------------------
    @Override
    @Transactional
    public Carrito eliminarItem(Usuario usuario, Long itemId) {

        Carrito carrito = obtenerCarrito(usuario);

        CarritoItem item = carritoItemRepositories.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        carritoItemRepositories.delete(item);

        recalcularTotal(carrito);

        return carritoRepositories.save(carrito);
    }

    // -------------------------------------------------------------
    // 5. Vaciar carrito
    // -------------------------------------------------------------
    @Override
    @Transactional
    public void vaciarCarrito(Carrito carrito) {
        carritoItemRepositories.deleteByCarrito(carrito);
        carrito.setTotal(0L);
        carritoRepositories.save(carrito);
    }

    // -------------------------------------------------------------
    // 6. Recalcular total
    // -------------------------------------------------------------
    @Override
    @Transactional
    public Long recalcularTotal(Carrito carrito) {
        Long total = carritoItemRepositories.sumSubtotalByCarrito(carrito).orElse(0L);
        carrito.setTotal(total);
        carritoRepositories.save(carrito);
        return total;
    }
}

   
