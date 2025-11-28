package com.pasteleria.projectbackend.services;

import java.util.List;
import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.entities.Boleta;

public interface BoletaServices {

    Boleta generarBoleta(Usuario usuario);

    // Historial de boletas de un usuario
    List<Boleta> historialUsuario(Usuario usuario);
    List<Boleta> listarTodas();

}

