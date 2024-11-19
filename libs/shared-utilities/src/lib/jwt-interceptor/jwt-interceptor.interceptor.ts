import { HttpInterceptorFn } from '@angular/common/http'

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { 
        Authorization: `Bearer ${token}` 
      }
    })
    return next(clonedRequest)
  }
  return next(req);
};
