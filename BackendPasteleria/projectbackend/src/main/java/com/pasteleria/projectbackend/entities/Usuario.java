package com.pasteleria.projectbackend.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonAlias;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;
    
    @Column(nullable = false)
    @JsonAlias({"activo"})
    private boolean enabled = true;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum Rol {
        ADMIN,
        CLIENTE
    }
    /* agregados recientemente */
    /*private Boolean activo = true;*/
    
    
    
}
