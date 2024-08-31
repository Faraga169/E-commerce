import { HttpInterceptorFn } from '@angular/common/http';

export const setheaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') {
    const userToken = localStorage.getItem('usertoken');
    if (userToken && (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist'))) {
      req = req.clone({
        setHeaders: {
          token:`${userToken}`
        }
      });
    }
  }
  return next(req);
}