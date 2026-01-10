import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.authenticated()){
    if(isTokenExpired()){// si ha expirado lo que hacemos es logout y redirigimos al login 
      authService.logOut();
      router.navigate(['/login']);
      return false;
    }

    if(!authService.isAdmin()){
      router.navigate(['/forbidden']);
      return false;
    }
    return true;

  }
    router.navigate(['/login']);
    return false;

  
};

const isTokenExpired = () => {

  const authService = inject(AuthService);
  const token = authService.token;
  const payLoad = authService.getPayLoad(token);
  const expired = payLoad.exp;
  const now = new Date().getTime()/1000; // en segundos 

  if(now > expired){
    return true;
  }
  return false;
}
