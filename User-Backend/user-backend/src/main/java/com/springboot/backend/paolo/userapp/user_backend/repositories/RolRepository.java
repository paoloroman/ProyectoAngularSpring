package com.springboot.backend.paolo.userapp.user_backend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.paolo.userapp.user_backend.models.Rol;

public interface RolRepository extends CrudRepository<Rol, Long> {

    Optional<Rol> findByNombre(String nombre);
    

}
