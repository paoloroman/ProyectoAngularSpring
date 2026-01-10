package com.springboot.backend.paolo.userapp.user_backend.authSecurity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpleGrantedAuthorityJsonCreator {
    //Con esta clase abstracta lo que hacemos es intercambiar el role que viene por defecto en SimpleGranted para pasar el Authority que estamos pasando nosotros
    @JsonCreator
    public SimpleGrantedAuthorityJsonCreator(@JsonProperty("authority") String role){}

}
