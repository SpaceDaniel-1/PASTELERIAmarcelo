package com.pasteleria.projectbackend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.pasteleria.projectbackend.entities.Producto;

public interface  ProductoRepositories extends CrudRepository <Producto, Long>{

}
