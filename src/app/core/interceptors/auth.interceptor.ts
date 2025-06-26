import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = authService.cookieService.get('token'); 

  if (!token) {
    return next(req);
  }

  const authReq = addToken(req, token);

  return next(authReq).pipe(
    catchError((error) => {
      if ((error.status === 403 || error.status === 401) && !isRefreshing) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(() => error);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  isRefreshing = true;

  return authService.refreshAuthToken().pipe(
    switchMap((res) => {
      authService.saveTokens(res);
      const newReq = addToken(req, res.accessToken);
      isRefreshing = false;
      return next(newReq);
    }),
    catchError(err => {
      isRefreshing = false;
      authService.logout();
      return throwError(() => err);
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
};
