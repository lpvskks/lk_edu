import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { EventDto } from '../../../../shared/types/events/events';
import { EventsService } from '../../../../core/services/events/events.service';

@Component({
  selector: 'app-event-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: EventDto;

  private eventsService = inject(EventsService);

  get pictureUrl(): string {
    return this.eventsService.getPictureUrl(this.event.picture.id);
  }

    get isFinished(): boolean {
    return new Date(this.event.dateTimeTo) < new Date();
  }

  private readonly formatLabels: Record<EventDto['format'], string> = {
    Online:  'Онлайн',
    Offline: 'Офлайн',
    Hybrid:  'Гибридный'
  };

  get formatLabel(): string {
    return this.formatLabels[this.event.format] ?? this.event.format;
  }
}
