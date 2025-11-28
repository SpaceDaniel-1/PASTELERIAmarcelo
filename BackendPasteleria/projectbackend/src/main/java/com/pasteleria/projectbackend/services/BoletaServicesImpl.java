package com.pasteleria.projectbackend.services;

import com.pasteleria.projectbackend.entities.*;
import com.pasteleria.projectbackend.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoletaServicesImpl implements BoletaServices {

    @Autowired
    private BoletaRepositories boletaRepo;

    @Autowired
    private DetalleBoletaRepositories detalleBoletaRepo;

    @Autowired
    private CarritoRepositories carritoRepo;

    @Autowired
    private CarritoItemRepositories carritoItemRepo;

    // ========================================================
    // MÉTODO PRINCIPAL: GENERAR BOLETA
    // ========================================================
    @Override
    @Transactional
    public Boleta generarBoleta(Usuario usuario) {

        Carrito carrito = carritoRepo.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario"));

        Boleta boleta = new Boleta();
        boleta.setUsuario(usuario);
        boleta.setFechaEmision(LocalDateTime.now());

        Long ultimoNumero = boletaRepo.findTopByOrderByNumeroBoletaDesc()
                .map(Boleta::getNumeroBoleta)
                .orElse(0L);

        boleta.setNumeroBoleta(ultimoNumero + 1);

        Boleta boletaGuardada = boletaRepo.save(boleta);

        List<CarritoItem> items = carritoItemRepo.findByCarrito(carrito);

        for (CarritoItem item : items) {
            DetalleBoleta detalle = new DetalleBoleta();
            detalle.setBoleta(boletaGuardada);
            detalle.setProducto(item.getProducto());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(item.getProducto().getPrecio());
            detalleBoletaRepo.save(detalle);
        }

        carritoItemRepo.deleteAll(items);

        return boletaGuardada;
    }

    // ========================================================
    // MÉTODO QUE FALTABA: HISTORIAL DE BOLETAS DEL USUARIO
    // ========================================================
    @Override
    public List<Boleta> historialUsuario(Usuario usuario) {
        return boletaRepo.findByUsuario(usuario);
    }

    @Override
    public List<Boleta> listarTodas() {
    List<Boleta> lista = new ArrayList<>();
    boletaRepo.findAll().forEach(lista::add);
    return lista;
}




}

