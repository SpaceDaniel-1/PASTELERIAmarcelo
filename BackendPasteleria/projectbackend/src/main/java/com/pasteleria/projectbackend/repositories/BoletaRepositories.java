package com.pasteleria.projectbackend.repositories;

import com.pasteleria.projectbackend.entities.Boleta;
import com.pasteleria.projectbackend.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BoletaRepositories extends CrudRepository<Boleta, Long> {


    Optional<Boleta> findTopByOrderByNumeroBoletaDesc();

    List<Boleta> findByUsuario(Usuario usuario);
}