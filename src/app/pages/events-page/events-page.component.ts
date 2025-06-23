import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, tap, shareReplay } from 'rxjs/operators';

import { EventsService } from '../../core/services/events/events.service';
import {
  EventsFilter,
  SearchContainerComponent,
} from './components/search-container/search-container.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PublicEventsResponse } from '../../shared/types/events/events';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [CommonModule, SearchContainerComponent, PaginationComponent],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent {
  private eventsService = inject(EventsService);
  private pageSize = 6;
  private page$ = new BehaviorSubject<number>(1);
  private filter$ = new BehaviorSubject<EventsFilter>({ name: '', date: null });

  events$: Observable<PublicEventsResponse> = combineLatest({
    page: this.page$,
    filter: this.filter$,
  }).pipe(
    switchMap(({ page, filter }) =>
      this.eventsService.getPublicEvents(page, this.pageSize, filter)
    ),
    tap((response) => console.log('Ответ с /api/Events/public:', response)),
    tap((res) => (this.currentPage = res.metaData.pageNumber)),
    tap((res) => (this.totalPages = res.metaData.pageCount)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  currentPage = 1;
  totalPages = 1;

  onSearch(filter: EventsFilter) {
    this.filter$.next(filter);
    this.page$.next(1);
  }
  onPageChange(page: number) {
    this.page$.next(page);
  }
}
