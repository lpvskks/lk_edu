import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants/constants';
import { Profile } from '../../../shared/types/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  getProfile() {
    return this.http.get<Profile>(`${API_URL}/Profile`)
  }
}
