package com.springboot.backend.paolo.userapp.user_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.paolo.userapp.user_backend.models.IUser;
import com.springboot.backend.paolo.userapp.user_backend.models.Rol;
import com.springboot.backend.paolo.userapp.user_backend.models.User;
import com.springboot.backend.paolo.userapp.user_backend.models.UserRequest;
import com.springboot.backend.paolo.userapp.user_backend.repositories.RolRepository;
import com.springboot.backend.paolo.userapp.user_backend.repositories.UserRepository;

@Service
public class UserServiceImplement implements UserService {

    private UserRepository repository;

    private RolRepository rolRepository;

    private PasswordEncoder passwordEncoder;

    public UserServiceImplement(UserRepository repository, PasswordEncoder passwordEncoder,
            RolRepository rolRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
        this.repository.deleteById(id);

    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

    @Override
    /*
     * Debe ser Transactional por que es solo para lectura es decir consultas SELECT
     */
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(@NonNull Long id) {
        return this.repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        user.setRoles(getRoles(user));
        user.setPwd(passwordEncoder.encode(user.getPwd()));
        return this.repository.save(user);
    }

    
    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {
        Optional<User> userOptional = repository.findById(id);
        
        if (userOptional.isPresent()) {
            User userBd = userOptional.get();
            userBd.setEmail(user.getEmail());
            userBd.setApellidos(user.getApellidos());
            userBd.setNombre(user.getNombre());
            userBd.setUsuario(user.getUsuario());
            userBd.setRoles(getRoles(user));;
            return Optional.of(repository.save(userBd));
        }
        return Optional.empty();
    }
    
    private List<Rol> getRoles(IUser user) {
        List<Rol> roles = new ArrayList<>();
        Optional<Rol> optionalRolUser = rolRepository.findByNombre("ROLE_USER");
        optionalRolUser.ifPresent(rol -> roles.add(rol));
    
        if (user.isAdmin()) {
            Optional<Rol> optionalRolAdmin = rolRepository.findByNombre("ROLE_ADMIN");
            optionalRolAdmin.ifPresent(rol -> roles.add(rol));
        }
        return roles;
    }
}
