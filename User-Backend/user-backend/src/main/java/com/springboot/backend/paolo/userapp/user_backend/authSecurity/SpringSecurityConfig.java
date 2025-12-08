package com.springboot.backend.paolo.userapp.user_backend.authSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.springboot.backend.paolo.userapp.user_backend.authSecurity.filter.JwtAuthenticationFilter;
import com.springboot.backend.paolo.userapp.user_backend.authSecurity.filter.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean //administra la autentificacion
    AuthenticationManager authenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    };

    //ahora la clave
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        return http.authorizeHttpRequests( auth -> auth
            .requestMatchers(HttpMethod.GET, "/api/users", "/api/users/page/{page}").permitAll()
            .requestMatchers(HttpMethod.GET,"/api/users/{id}").hasAnyRole("USER","ADMIN") // permito ver detalle a admin y usuario
            .requestMatchers(HttpMethod.POST,"/api/users").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/users/{id}").hasRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE,"/api/users/{id}").hasRole("ADMIN") // solo podemos realizar el post el admin
            .anyRequest().authenticated())
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            .addFilter(new JwtValidationFilter(authenticationManager()))
            .csrf(config -> config.disable()) //como tengo un api se tiene que deshabilitar ya qaue no es solo con Spring el fomrulario sino es con Angular
            .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .build();
            //Con esto protegemos todas las rutas menos las que hemos puesto publicas

    }

} 
