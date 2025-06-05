import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { API_URL } from '../../constants/api-url';
import { Profile } from '../../../shared/types/profile/profile';
import { EducationRecord } from '../../../shared/types/profile/education';
import { WorkRecord } from '../../../shared/types/profile/work-info';
export interface FileDto {
  id: string;
  name: string;
  extension: string;
  size: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  
  private profileSubject$?: Observable<Profile>;

  private createProfileStream(): Observable<Profile> {
    return this.http.get<Profile>(`${API_URL}/Profile`).pipe(shareReplay(1));
  }

  getProfile(): Observable<Profile> {
    if (!this.profileSubject$) {
      this.profileSubject$ = this.createProfileStream();
    }
    return this.profileSubject$;
  }

  invalidateProfile(): void {
    this.profileSubject$ = undefined;
  }

  getUserEducation(): Observable<EducationRecord> {
    return this.http.get<EducationRecord>(`${API_URL}/Profile/student`);
  }

  getUserWork(): Observable<WorkRecord> {
    return this.http.get<WorkRecord>(`${API_URL}/Profile/employee`);
  }

  private avatarReloadTrigger$ = new BehaviorSubject<void>(undefined);

  get avatarUrl$(): Observable<SafeUrl> {
    return this.avatarReloadTrigger$.pipe(
      switchMap(() => this.getProfile()),
      switchMap((p) =>
        p.avatar?.id ? this.getAvatar(p.avatar.id) : of(null as unknown as Blob)
      ),
      map((blob) => {
        if (!blob) {
          return null as unknown as SafeUrl;
        }
        const url = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(url);
      }),
      shareReplay(1)
    );
  }

  getAvatar(id: string): Observable<Blob> {
    return this.http.get(`${API_URL}/Files/${id}`, { responseType: 'blob' });
  }

  uploadFile(file: File): Observable<FileDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDto>(`${API_URL}/Files`, formData);
  }

  updateAvatar(fileId: string): Observable<void> {
    return this.http.put<void>(`${API_URL}/Profile/avatar`, { fileId }).pipe(
      tap(() => {
        this.invalidateProfile();
        this.avatarReloadTrigger$.next();
      })
    );
  }
}
