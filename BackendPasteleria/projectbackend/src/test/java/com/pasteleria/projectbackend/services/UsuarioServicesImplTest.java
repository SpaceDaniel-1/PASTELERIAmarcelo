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
        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setUsername("Daniel");
        usuario.setEmail("daniel@mail.com");
        usuario.setPassword("1234");
        usuario.setRol(Usuario.Rol.ADMIN);
        usuario.setEnabled(true);
        usuario.setCreatedAt(null);
        usuario.setUpdatedAt(null);
    }

    @Test
    void testCrearUsuario() {
        when(usuarioRepositories.save(usuario)).thenReturn(usuario);

        Usuario creado = usuarioServices.save(usuario);

        assertNotNull(creado);
        assertEquals("Daniel", creado.getUsername());
        verify(usuarioRepositories, times(1)).save(usuario);
    }

    @Test
    void testObtenerUsuarioPorId() {
        when(usuarioRepositories.findById(1L)).thenReturn(Optional.of(usuario));
        Optional<Usuario> encontradoOpt = usuarioServices.findById(1L);

        assertTrue(encontradoOpt.isPresent());
        assertEquals("daniel@mail.com", encontradoOpt.get().getEmail());
        verify(usuarioRepositories, times(1)).findById(1L);
    }

    @Test
    void testListarUsuarios() {
        when(usuarioRepositories.findAll()).thenReturn(Arrays.asList(usuario));
        List<Usuario> lista = usuarioServices.findAll();

        assertEquals(1, lista.size());
        verify(usuarioRepositories, times(1)).findAll();
    }

    @Test
    void testEliminarUsuarioExistente() {
        doNothing().when(usuarioRepositories).deleteById(1L);

        usuarioServices.deleteById(1L);

        verify(usuarioRepositories, times(1)).deleteById(1L);
    }

    @Test
    void testActualizarUsuario() {
        when(usuarioRepositories.findById(1L)).thenReturn(Optional.of(usuario));
        when(usuarioRepositories.save(any(Usuario.class))).thenReturn(usuario);

        when(usuarioRepositories.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Usuario actualizado = usuarioServices.findById(1L)
                .map(existing -> {
                    existing.setUsername("Pedro");
                    return usuarioServices.save(existing);
                }).orElse(null);

        assertNotNull(actualizado);
        assertEquals("Pedro", actualizado.getUsername());
        verify(usuarioRepositories, times(1)).save(any(Usuario.class));
    }

    @Test
    void testObtenerUsuarioNoExistenteLanzaError() {
        when(usuarioRepositories.findById(2L)).thenReturn(Optional.empty());
        Optional<Usuario> opt = usuarioServices.findById(2L);
        assertTrue(opt.isEmpty());
    }
}
