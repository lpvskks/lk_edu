import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { API_URL } from '../../constants/api-url';
import { Profile } from '../../../shared/types/profile/profile';
import { EducationRecord } from '../../../shared/types/profile/education';
import { WorkRecord } from '../../../shared/types/profile/work-info';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  private profile$ = this.http
    .get<Profile>(`${API_URL}/Profile`)
    .pipe(shareReplay(1));

  getProfile(): Observable<Profile> {
    return this.profile$;
  }

  getAvatar(id: string): Observable<Blob> {
    return this.http.get(`${API_URL}/Files/${id}`, { responseType: 'blob' });
  }

  getUserEducation(): Observable<EducationRecord> {
    return this.http.get<EducationRecord>(`${API_URL}/Profile/student`);
  }

  getUserWork(): Observable<WorkRecord> {
    return this.http.get<WorkRecord>(`${API_URL}/Profile/employee`);
  }

  get avatarUrl$(): Observable<SafeUrl> {
    return this.profile$.pipe(
      switchMap((p) => this.getAvatar(p.avatar.id)),
      map((blob) => {
        const url = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(url);
      }),
      shareReplay(1)
    );
  }
}
