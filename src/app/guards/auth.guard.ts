import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = false;

  if (auth) {
    return true;
  }
  router.navigateByUrl('/auth/login');
  return false;
};
