import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../core/services/events/events.service';
import {
  EventDetailDto,
  RegistrationData,
} from '../../../../shared/types/events/event-details';
import { API_URL } from '../../../../core/constants/api-url';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RegisterModalComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(EventsService);
  public authService = inject(AuthService);

  event!: EventDetailDto;
  mapUrl = '';
  isParticipant = false;
  showLoginModal = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getEventById(id).subscribe((evt) => {
      this.event = evt;
      if (evt.format === 'Offline') {
        const lat = evt.latitude;
        const lng = evt.longitude;
        this.mapUrl =
          `https://static-maps.yandex.ru/1.x/` +
          `?ll=${lng},${lat}` +
          `&size=578,200` +
          `&z=15` +
          `&l=map` +
          `&pt=${lng},${lat},pm2rdm`;
      }
      if (evt.isRegistrationRequired && this.authService.isAuth) {
        this.service
          .isParticipant(id)
          .subscribe((res) => (this.isParticipant = res.isParticipating));
      }
    });
  }

onOuterRegister(data: RegistrationData) {
  console.log('Внешняя регистрация: отправляем данные', {
    eventId: this.event.id,
    ...data
  });

  this.service.registerExternal(this.event.id, data)
    .subscribe({
      next: () => {
        console.log('Внешняя регистрация: ответ 200 OK');
        this.showLoginModal = false;
      },
      error: err => {
        console.error('Внешняя регистрация: ошибка', err);
      }
    });
}
  get eventFinished(): boolean {
    return new Date(this.event.dateTimeTo).getTime() < Date.now();
  }

  onParticipateClick() {
    if (!this.authService.isAuth) {
      this.showLoginModal = true;
      return;
    }
    this.service.registerInner(this.event.id).subscribe({
      next: () => {
        this.isParticipant = true;
      },
      error: (err) => {
        console.error('Не удалось зарегистрироваться:', err);
      },
    });
  }

  closeModal() {
    this.showLoginModal = false;
  }
  get pictureUrl(): string {
    return `${API_URL}/Files/${this.event.picture.id}`;
  }

  get formatLabel(): string {
    switch (this.event.format) {
      case 'Online':
        return 'Онлайн';
      case 'Offline':
        return 'Офлайн';
      case 'Hybrid':
        return 'Гибридный';
      default:
        return this.event.format;
    }
  }
}
