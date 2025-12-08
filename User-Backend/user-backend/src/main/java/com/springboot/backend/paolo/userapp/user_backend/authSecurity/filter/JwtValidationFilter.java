package com.springboot.backend.paolo.userapp.user_backend.authSecurity.filter;

import static com.springboot.backend.paolo.userapp.user_backend.authSecurity.TokenJwtConfig.*;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.paolo.userapp.user_backend.authSecurity.SimpleGrantedAuthorityJsonCreator;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Arrays;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader(HEADER_AUTHORIZATION);

        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace(PREFIX_TOKEN, "");
        try {
            //Si falla la autentificación con la llave secreta para el token devolvemos en el catch un mensaje
            Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload(); // lo  que hago  es  leer  el  token firmado
            String usuario = claims.getSubject();
           // String usuario2 = (String) claims.get("usuario"); //Es otra forma de sacar el
            // usuario
            Object authoritiesClaims = claims.get("authorities");

            Collection<? extends GrantedAuthority> roles = Arrays.asList(new ObjectMapper()
            .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                    .readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(usuario,null, roles);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);// Con esto nos autentificamos
            chain.doFilter(request, response);

        } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("mensaje", "El token es inválido");

            //Convertimos a un JSON
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401);
            response.setContentType(CONTENT_TYPE);
        }
    }

}
