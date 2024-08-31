import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let errormessage:ToastrService=inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    console.log('error from interceptor',err)

    // errormessage.error(err.error.message);
    return throwError(()=>{err})
  }))
};
