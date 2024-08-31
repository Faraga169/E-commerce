import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';

export const logoutGuard: CanActivateFn = (route, state) => {
  let _Authservice:AuthService=inject(AuthService);
  let _Router:Router=inject(Router);
  if(_Authservice.userData.getValue()!=null){
    _Router.navigate(['/home'])
         return false;
  }

  else{
        return true;
  }
};
