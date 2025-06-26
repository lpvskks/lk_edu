import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { API_URL } from '../../constants/api-url';
import { PublicEventsResponse } from '../../../shared/types/events/events';
import { EventsFilter } from '../../../pages/events-page/components/search-container/search-container.component';
import { AuthService } from '../auth/auth.service';
import {
  EventDetailDto,
  RegistrationData,
} from '../../../shared/types/events/event-details';

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
      params = params.set('eventDate', filter.date.toISOString());
    }
    const cacheKey = [
      path,
      page,
      pageSize,
      filter?.name ?? '',
      filter?.date ? filter.date.toDateString() : '',
    ].join('|');

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const req$ = this.http
      .get<PublicEventsResponse>(url, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));

    this.cache.set(cacheKey, req$);
    return req$;
  }

  getPictureUrl(pictureId: string): string {
    return `${API_URL}/Files/${pictureId}`;
  }

  getEventById(id: string): Observable<EventDetailDto> {
    const url = `${API_URL}/Events/public/${id}`;
    return this.http
      .get<EventDetailDto>(url)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  isParticipant(eventId: string): Observable<{ isParticipating: boolean }> {
    return this.http.get<{ isParticipating: boolean }>(
      `${API_URL}/Events/is_participant/${eventId}`
    );
  }

  registerInner(eventId: string): Observable<void> {
    const url = `${API_URL}/Events/register/inner`;
    return this.http.post<void>(url, { eventId });
  }
  registerExternal(eventId: string, data: RegistrationData): Observable<void> {
    const url = `${API_URL}/Events/register/external`;
    const body = { eventId, ...data };
    return this.http.post<void>(url, body);
  }
}
