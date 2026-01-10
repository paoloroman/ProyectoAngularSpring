import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
//lo que hace el interceptor es cada vez que hacemos una petición http con el backend
// y lo metemos en el app.config.ts para que funcione el interceptor 
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).token;
  if(token != undefined){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(authRequest);
  }
  return next(req);
};
