package com.pasteleria.projectbackend.repositories;


import org.springframework.data.repository.CrudRepository;


import com.pasteleria.projectbackend.entities.Usuario;

public interface  UsuarioRepositories extends CrudRepository <Usuario, Long>{

}

