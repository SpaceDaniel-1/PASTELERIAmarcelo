package com.pasteleria.projectbackend.repositories;

import com.pasteleria.projectbackend.entities.Carrito;
import com.pasteleria.projectbackend.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
public interface CarritoRepositories extends CrudRepository<Carrito, Long> {

    Optional<Carrito> findByUsuario(Usuario usuario);
}
