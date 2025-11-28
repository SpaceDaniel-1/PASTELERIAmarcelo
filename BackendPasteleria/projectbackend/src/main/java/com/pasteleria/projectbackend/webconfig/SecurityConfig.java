package com.pasteleria.projectbackend.webconfig;

import com.pasteleria.projectbackend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    // BCrypt para contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS global
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Permitir frontend y swagger
        config.setAllowedOriginPatterns(Arrays.asList("*")); // Permite cualquier origen mientras desarrollas

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // SEGURIDAD PRINCIPAL
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                
                // 🔓 Login sin token
                .requestMatchers("/auth/**").permitAll()

                // 🔓 Swagger sin token
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                // 🔓 Documentación
                .requestMatchers("/api/documentado/**").permitAll()

                // 🔓 Permitir GET públicos para listar/consultar productos
                .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()
                // 🔒 ADMIN puede hacer CRUD (POST/PUT/DELETE) sobre productos
                .requestMatchers("/api/productos/**").hasRole("ADMIN")

                // 🔓 Carrito libre para desarrollo
                .requestMatchers("/api/carrito/**").permitAll()


                // 🔒 CLIENTE y ADMIN pueden ver/generar boletas
                .requestMatchers(HttpMethod.GET, "/api/boletas").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/boletas/**").permitAll()


                // 🔒 Todo lo demás requiere login
                .anyRequest().authenticated()
            )

            // Filtro JWT antes del UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
