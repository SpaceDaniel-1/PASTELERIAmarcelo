package com.pasteleria.projectbackend.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;
import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.repositories.UsuarioRepositories;

public class UsuarioServicesImplTest {

    @Mock
    private UsuarioRepositories usuarioRepositories;

    @InjectMocks
    private UsuarioServicesImpl usuarioServices;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        usuario = new Usuario(1L, "Daniel", "daniel@mail.com", "1234", "ADMIN", true, null);
    }

    @Test
    void testCrearUsuario() {
        when(usuarioRepositories.save(usuario)).thenReturn(usuario);

        Usuario creado = usuarioServices.crear(usuario);

        assertNotNull(creado);
        assertEquals("Daniel", creado.getNombre());
        verify(usuarioRepositories, times(1)).save(usuario);
    }

    @Test
    void testObtenerUsuarioPorId() {
        when(usuarioRepositories.findById(1L)).thenReturn(Optional.of(usuario));

        Usuario encontrado = usuarioServices.obtenerId(1L);

        assertEquals("daniel@mail.com", encontrado.getEmail());
        verify(usuarioRepositories, times(1)).findById(1L);
    }

    @Test
    void testListarUsuarios() {
        when(usuarioRepositories.findAll()).thenReturn(Arrays.asList(usuario));

        List<Usuario> lista = usuarioServices.listarTodos();

        assertEquals(1, lista.size());
        verify(usuarioRepositories, times(1)).findAll();
    }

    @Test
    void testEliminarUsuarioExistente() {
        when(usuarioRepositories.existsById(1L)).thenReturn(true);

        usuarioServices.eliminar(1L);

        verify(usuarioRepositories, times(1)).deleteById(1L);
    }

    @Test
    void testActualizarUsuario() {
        when(usuarioRepositories.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepositories.save(any(Usuario.class))).thenReturn(usuario);

        Usuario actualizado = usuarioServices.actualizar(1L, new Usuario(null, "Pedro", null, null, null, true, null));

        assertEquals("Pedro", actualizado.getNombre());
        verify(usuarioRepositories, times(1)).save(any(Usuario.class));
    }

    @Test
    void testObtenerUsuarioNoExistenteLanzaError() {
        when(usuarioRepositories.findById(2L)).thenReturn(Optional.empty());

        Exception ex = assertThrows(RuntimeException.class, () -> usuarioServices.obtenerId(2L));
        assertEquals("Usuario no encontrado", ex.getMessage());
    }
}
