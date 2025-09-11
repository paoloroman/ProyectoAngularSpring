package com.springboot.backend.paolo.userapp.user_backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.paolo.userapp.user_backend.models.User;
import com.springboot.backend.paolo.userapp.user_backend.services.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id) {
        Optional<User> userOptional = service.findById(id);

        if (userOptional.isPresent()) { // comprueba si el usuario se ha encontrado en la BBDD
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.orElseThrow()); // devuelve el valor si es encontrado y si no tira una excepcion
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "El usuario no se encontro por el ID" + id +"en la BBDD"));
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        //TODO: process POST request
        
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        
        Optional<User> userOptional = service.findById(id);

        if(userOptional.isPresent()){
            User userBd = userOptional.get();
            userBd.setEmail(user.getEmail());
            userBd.setApellidos(user.getApellidos());
            userBd.setNombre(user.getNombre());
            userBd.setUsuario(user.getUsuario());
            userBd.setPwd(user.getPwd());

            return ResponseEntity.ok(service.save(user));
        }
        return ResponseEntity.notFound().build();
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<User> userOptional = service.findById(id);

        if (userOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
    

}
