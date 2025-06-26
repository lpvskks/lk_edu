import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, switchMap, throwError, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.cookieService.get('token');

  if (!token) {
    return next(req).pipe(handle404(router));
  }

  const authReq = addToken(req, token);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        return refreshAndProceed(authService, req, next, router);
      }
      return handleError(error, router);
    })
  );
};

function refreshAndProceed(
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  router: Router
): Observable<HttpEvent<any>> {
  isRefreshing = true;

  return authService.refreshAuthToken().pipe(
    switchMap((res) => {
      authService.saveTokens(res);
      const newReq = addToken(req, res.accessToken);
      isRefreshing = false;
      return next(newReq).pipe(handle404(router));
    }),
    catchError((err: HttpErrorResponse) => {
      isRefreshing = false;
      authService.logout();
      return handleError(err, router);
    })
  );
}

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handleError(
  err: HttpErrorResponse,
  router: Router
): Observable<HttpEvent<any>> {
  if (err.status === 400 || err.status === 404) {
    router.navigate(['/notFound']);
    return EMPTY; 
  }
  return throwError(() => err);
}

function handle404(
  router: Router
): import('rxjs').OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
  return catchError((err: HttpErrorResponse) => handleError(err, router));
}
