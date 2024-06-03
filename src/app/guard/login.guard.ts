import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let isAuth = authService.isAuth();

  if(isAuth){
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
