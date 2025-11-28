package com.pasteleria.projectbackend.services;


import com.pasteleria.projectbackend.entities.Carrito;
import com.pasteleria.projectbackend.entities.Usuario;

public interface CarritoServices {

    Carrito obtenerCarrito(Usuario usuario);

    Carrito agregarProducto(Usuario usuario, Long productoId, Integer cantidad);

    Carrito actualizarCantidad(Usuario usuario, Long itemId, Integer cantidad);

    Carrito eliminarItem(Usuario usuario, Long itemId);

    void vaciarCarrito(Carrito carrito);

    Long recalcularTotal(Carrito carrito);
}

