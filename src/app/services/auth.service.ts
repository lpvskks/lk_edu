import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUser } from '../types/authUser';
import { API_URL } from '../constants/constants';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../types/loginRespose';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  login(userData: AuthUser): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(
      `${API_URL}/Auth/login`,
      userData
    ).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Ошибка запроса:', error);
    return throwError(() => new Error(error.message || 'Ошибка сервера'));
  }
}
