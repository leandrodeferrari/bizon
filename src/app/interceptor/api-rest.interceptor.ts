import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const apiRestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  let request = req;

  const token: string = authService.getToken();

  if(token != ''){
    request = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
  }

  return next(request);
};