import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const accountGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = window.localStorage.getItem('auth_token');

  if (isAuthenticated) {
    inject(Router).navigate(['/home']);
    return false;
  }
  return true;
};
