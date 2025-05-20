import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthUser, LoginResponse } from '../../../shared/types/auth/authUser';
import { API_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(userData: AuthUser): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/Auth/login`, userData)
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Ошибка запроса:', error);
    return throwError(() => new Error(error.message || 'Ошибка сервера'));
  }

  refreshAuthToken() {
    this.refreshToken = this.refreshToken ?? this.cookieService.get('refreshToken');
    return this.http
      .post<LoginResponse>(`${API_URL}/Auth/refresh`, 
        {
          refreshToken: this.refreshToken,
        }
      )
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError(err => {
          this.logout()
          return throwError(err)
        })
      )
  }
  
  logout() {
    this.cookieService.deleteAll();
    this.token = null
    this.refreshToken = null
    this.router.navigate(['login'])
  }

  saveTokens(res: LoginResponse) {
    this.token = res.accessToken;
          this.refreshToken = res.refreshToken;

          this.cookieService.set('token', this.token);
          this.cookieService.set('refreshToken', this.refreshToken);
  }
}
