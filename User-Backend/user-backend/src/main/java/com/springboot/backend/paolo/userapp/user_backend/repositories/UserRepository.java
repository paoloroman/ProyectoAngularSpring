package com.springboot.backend.paolo.userapp.user_backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.paolo.userapp.user_backend.models.User;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    Page<User> findAll(Pageable pageable);

}
