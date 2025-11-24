package com.springboot.backend.paolo.userapp.user_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.paolo.userapp.user_backend.models.User;
import com.springboot.backend.paolo.userapp.user_backend.repositories.UserRepository;


@Service
public class UserServiceImplement implements UserService{

    private UserRepository repository;

    public UserServiceImplement(UserRepository repository){
        this.repository = repository;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
        this.repository.deleteById(id);
        
    }

    @Override
    @Transactional(readOnly = true )
    public Page<User> findAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

    @Override
    /* Debe ser Transactional por que es solo para lectura es decir consultas SELECT */
    @Transactional(readOnly = true )
    public List<User> findAll() {
        // TODO Auto-generated method stub
        return (List) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true )
    public Optional<User> findById(@NonNull Long id) {
        // TODO Auto-generated method stub
        return this.repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        // TODO Auto-generated method stub
        return this.repository.save(user);
    }



}
