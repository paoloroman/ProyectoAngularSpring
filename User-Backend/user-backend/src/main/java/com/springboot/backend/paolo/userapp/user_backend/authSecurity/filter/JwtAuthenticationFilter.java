package com.springboot.backend.paolo.userapp.user_backend.authSecurity.filter;

import static com.springboot.backend.paolo.userapp.user_backend.authSecurity.TokenJwtConfig.CONTENT_TYPE;
//importamos de forma estatica 
import static com.springboot.backend.paolo.userapp.user_backend.authSecurity.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.springboot.backend.paolo.userapp.user_backend.authSecurity.TokenJwtConfig.PREFIX_TOKEN;
import static com.springboot.backend.paolo.userapp.user_backend.authSecurity.TokenJwtConfig.SECRET_KEY;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.paolo.userapp.user_backend.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {

        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = null;
        String pwd = null;

        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class); // Se coge los datos que se
                                                                                            // introducen en el request
                                                                                            // body que vienen en String
                                                                                            // a User
            username = user.getUsuario();
            pwd = user.getPwd();
        } catch (StreamReadException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (DatabindException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                pwd);

        return this.authenticationManager.authenticate(authenticationToken);
    }

    // Creacion de token
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult
                .getPrincipal();
        String usuario = user.getUsername();
        
        Collection<? extends GrantedAuthority> roles  = authResult.getAuthorities();
        
        boolean isAdmin = roles.stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        //Clame del token
        Claims claims = Jwts.claims()
                            .add("authorities", new ObjectMapper().writeValueAsString(roles))
                            .add("usuario",usuario)
                            .add("isAdmin",isAdmin)
                            .build();//Vamos a pasar a String para luego convertirlo a JSON 
        String jwt = Jwts.builder()
                .subject(usuario)
                .claims(claims)
                .signWith(SECRET_KEY)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000 )) // 1h de expiración en miliseguindos
                .compact();

        response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN + jwt);

        Map<String,String> body = new HashMap<>();
        body.put("token", jwt);
        body.put("usuario", usuario);
        body.put("mensaje", String.format("Hola %s has iniciado sesión con éxito", usuario));
        
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));//convertimos el Map a String 
        response.setContentType(CONTENT_TYPE); // y convertimos el String a JSON
        response.setStatus(200);
    
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

                Map<String, String> body = new HashMap<>();
                body.put("mensaje", "Error en la autentificación con usuario y password incorrecto!");
                body.put("error", failed.getMessage());

                response.getWriter().write(new ObjectMapper().writeValueAsString(body));
                response.setContentType(CONTENT_TYPE);
                response.setStatus(401);
    }

}
