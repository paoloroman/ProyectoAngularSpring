package com.springboot.backend.paolo.userapp.user_backend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User implements IUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String nombre;

    @NotBlank
    private String apellidos;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4,max = 12)
    private String usuario;

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean admin;
    
    @NotBlank
    private String pwd;

    @JsonIgnoreProperties({"handler" , "hibernateLazyInitializer"})
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_roles",
        joinColumns = {@JoinColumn(name = "user_id")}, // Lo que hago aqui es que se haga automatico la relacion con la tabla de la BD que he creado con un FK
        inverseJoinColumns = {@JoinColumn(name = "rol_id")},
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "rol_id"} )}


    )
    private List<Rol> roles ;

    

    public User() {
        this.roles = new ArrayList<>();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String nombreUsuario) {
        this.usuario = nombreUsuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Rol> getRoles() {
        return roles;
    }

    public void setRoles(List<Rol> roles) {
        this.roles = roles;
    }

}
