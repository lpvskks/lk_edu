import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserListResponse } from '../../../shared/types/administration/user-list';
import { API_URL } from '../../constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
   private http = inject(HttpClient);

  getUserList(
    page: number = 1,
    pageSize: number = 9,
    name?: string,
    filterLastName?: string,
    email?: string
  ): Observable<UserListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (name) {
      params = params.set('name', name);
    }
    if (filterLastName) {
      params = params.set('filterLastName', filterLastName);
    }
    if (email) {
      params = params.set('email', email);
    }

    return this.http.get<UserListResponse> (`${API_URL}/User/list`, { params });
  }
}
