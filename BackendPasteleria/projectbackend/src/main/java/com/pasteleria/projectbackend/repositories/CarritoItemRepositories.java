package com.pasteleria.projectbackend.repositories;

import com.pasteleria.projectbackend.entities.Carrito;
import com.pasteleria.projectbackend.entities.CarritoItem;
import com.pasteleria.projectbackend.entities.Producto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoItemRepositories extends JpaRepository<CarritoItem, Long> {

    // 1. Buscar un item específico por carrito y producto
    Optional<CarritoItem> findByCarritoAndProducto(Carrito carrito, Producto producto);

    // 2. Obtener todos los items de un carrito
    List<CarritoItem> findByCarrito(Carrito carrito);

    // 3. Eliminar todos los items de un carrito
    void deleteByCarrito(Carrito carrito);

    // 4. Sumar subtotales del carrito
    @Query("SELECT SUM(ci.subtotal) FROM CarritoItem ci WHERE ci.carrito = :carrito")
    Optional<Long> sumSubtotalByCarrito(@Param("carrito") Carrito carrito);
}
