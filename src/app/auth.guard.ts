import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { inject } from '@angular/core';

// factory function
export const authGuard: CanActivateFn = (route, state) => {
  let _Authservice:AuthService=inject(AuthService);
  let _Router:Router=inject(Router);
  if(_Authservice.userData()!=null){
         return true;
  }

  else{
    _Router.navigate(['/login'])
        return false;
  }
  
};
