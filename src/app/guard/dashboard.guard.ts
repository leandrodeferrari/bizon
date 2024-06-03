import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let isAuth = authService.isAuth();

  if(!isAuth){
    router.navigate(['login']);
    return false;
  }
  
  return true;
};
