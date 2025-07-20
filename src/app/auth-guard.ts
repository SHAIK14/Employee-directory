import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};