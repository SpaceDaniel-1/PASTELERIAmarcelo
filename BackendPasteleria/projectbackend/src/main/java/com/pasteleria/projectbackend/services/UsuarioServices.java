package com.pasteleria.projectbackend.services;

import com.pasteleria.projectbackend.entities.Usuario;
import java.util.List;

public interface UsuarioServices {
  Usuario crear(Usuario usuario);
  Usuario obtenerId(Long id);
  List<Usuario> listarTodos();
  void eliminar(Long id);
  Usuario actualizar(Long id, Usuario usuarioActualizado);
 

}
