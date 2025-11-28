package com.pasteleria.projectbackend.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pasteleria.projectbackend.entities.Usuario;
import com.pasteleria.projectbackend.services.UsuarioServices;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

public class UsuarioRestControllersTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private UsuarioServices usuarioServices;

    @InjectMocks
    private UsuarioRestControllers usuarioRestControllers;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(usuarioRestControllers).build();
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
    void testCrearUsuario() throws Exception {
        when(usuarioServices.save(any(Usuario.class))).thenReturn(usuario);

        mockMvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Daniel"));
    }

    @Test
    void testListarUsuarios() throws Exception {
        when(usuarioServices.findAll()).thenReturn(List.of(usuario));

        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("daniel@mail.com"));
    }

    @Test
    void testObtenerUsuarioPorId() throws Exception {
        when(usuarioServices.findById(1L)).thenReturn(Optional.of(usuario));

        mockMvc.perform(get("/api/usuarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rol").value("ADMIN"));
    }
}
