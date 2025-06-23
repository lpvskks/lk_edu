import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { API_URL } from '../../constants/api-url';
import { PublicEventsResponse } from '../../../shared/types/events/events';
import { EventsFilter } from '../../../pages/events-page/components/search-container/search-container.component';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cache = new Map<string, Observable<PublicEventsResponse>>();

  getPublicEvents(
    page: number,
    pageSize: number,
    filter?: EventsFilter
  ): Observable<PublicEventsResponse> {
      const path = this.authService.isAuth
      ? '/Events/public/auth'
      : '/Events/public';

      const url = `${API_URL}${path}`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter?.name) {
      params = params.set('name', filter.name.trim());
    }
    if (filter?.date) {
      params = params.set('date', filter.date.toISOString().substring(0, 10));
    }

    const key = `${path}|${page}|${pageSize}|${filter?.name||''}|${filter?.date?.toISOString()||''}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

     const req$ = this.http
      .get<PublicEventsResponse>(url, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));

    this.cache.set(key, req$);
    return req$;
  }
   getPictureUrl(pictureId: string): string {
    return `${API_URL}/Files/${pictureId}`;
  }
  
}
