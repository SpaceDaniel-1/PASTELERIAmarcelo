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

import com.pasteleria.projectbackend.entities.Producto;
import com.pasteleria.projectbackend.repositories.ProductoRepositories;

public class ProductoServicesImplTest {

    @Mock
    private ProductoRepositories productoRepositories;

    @InjectMocks
    private ProductoServicesImpl productoServices;

    private Producto producto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        producto = new Producto(1L, "Torta", "Chocolate", 5000L, 10, "Dulce", "torta.jpg", true, null);
    }

    @Test
    void testCrearProducto() {
        when(productoRepositories.save(producto)).thenReturn(producto);

        Producto creado = productoServices.crear(producto);

        assertNotNull(creado);
        assertEquals("Torta", creado.getNombre());
        verify(productoRepositories, times(1)).save(producto);
    }

    @Test
    void testObtenerId() {
        when(productoRepositories.findById(1L)).thenReturn(Optional.of(producto));

        Producto encontrado = productoServices.obtenerId(1L);

        assertEquals("Chocolate", encontrado.getDescripcion());
        verify(productoRepositories, times(1)).findById(1L);
    }

    @Test
    void testListarTodas() {
        when(productoRepositories.findAll()).thenReturn(Arrays.asList(producto));

        List<Producto> lista = productoServices.listarTodas();

        assertEquals(1, lista.size());
        verify(productoRepositories, times(1)).findAll();
    }

    @Test
    void testEliminarProductoExistente() {
        when(productoRepositories.existsById(1L)).thenReturn(true);
        productoServices.eliminar(1L);
        verify(productoRepositories, times(1)).deleteById(1L);
    }

    @Test
    void testDesactivarProducto() {
        when(productoRepositories.findById(1L)).thenReturn(Optional.of(producto));
        when(productoRepositories.save(any(Producto.class))).thenReturn(producto);

        Producto desactivado = productoServices.desactivar(1L);

        assertFalse(desactivado.getActivo());
        verify(productoRepositories, times(1)).save(producto);
    }
}
